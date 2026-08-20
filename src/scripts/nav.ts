// SILO — nav behavior (R7.5: the coherence round — persistent top bar).
// - drawer (hamburger) with correct hidden-state semantics; booking pill first
// - logo is always docked (back-to-top on Home, home link elsewhere) — the
//   GSAP center-hero choreography this file used to run was retired when the
//   hero got a persistent nav bar instead (owner ruling: the melt/dock system
//   read as "incoherent, PowerPoint 98").

type LenisLike = {
  scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void;
  stop: () => void;
  start: () => void;
};

const getLenis = (): LenisLike | undefined =>
  (window as unknown as { __lenis?: LenisLike }).__lenis;

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrollToTop(): void {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.1 });
  } else {
    // native fallback per contracts.md
    document.documentElement.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
  }
}

/* ---------------------------------------------------------------- drawer */

function initDrawer(root: HTMLElement): void {
  const burger = root.querySelector<HTMLButtonElement>('[data-burger]');
  const nav = root.querySelector<HTMLElement>('[data-nav]');
  const label = root.querySelector<HTMLElement>('[data-burger-label]');
  if (!burger || !nav) return;

  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a'));
  let open = false;

  const lockScroll = (): void => {
    document.body.style.overflow = 'hidden';
    getLenis()?.stop();
  };
  const unlockScroll = (): void => {
    document.body.style.overflow = '';
    getLenis()?.start();
  };

  // While the drawer is closed it must be fully inert:
  // aria-hidden + tabindex=-1 (pointer-events/visibility handled in CSS).
  const applyClosedAttrs = (): void => {
    nav.setAttribute('aria-hidden', 'true');
    links.forEach((a) => a.setAttribute('tabindex', '-1'));
  };
  const clearClosedAttrs = (): void => {
    nav.removeAttribute('aria-hidden');
    links.forEach((a) => a.removeAttribute('tabindex'));
  };

  const setOpen = (next: boolean, restoreFocus = false): void => {
    open = next;
    // Home's pre-scroll hero-choreo state keeps .nav-root translated off-screen
    // (translateY(-100%)), which becomes the containing block for the drawer's
    // position:fixed panel — opening the drawer from that state renders it
    // mispositioned (verified directly: hero content bled through at the
    // edges instead of a clean full-screen overlay). Docking the bar the
    // moment the drawer opens removes that transform before the fixed panel
    // paints. This also means opening the menu now permanently reveals the
    // bar for the rest of the visit, same as scrolling past the hero would.
    if (next) document.documentElement.classList.add('is-revealed');
    nav.classList.toggle('is-open', next);
    burger.setAttribute('aria-expanded', String(next));
    // Locale-correct labels already live on the element (R9 i18n) — read them
    // instead of hardcoding, so en/ru pages never get re-Hebrewed on toggle.
    if (label) {
      label.textContent = next
        ? (label.dataset.labelClose ?? label.textContent)
        : (label.dataset.labelOpen ?? label.textContent);
    }
    if (next) {
      clearClosedAttrs();
      lockScroll();
      requestAnimationFrame(() => links[0]?.focus());
    } else {
      applyClosedAttrs();
      unlockScroll();
      if (restoreFocus) burger.focus();
    }
  };

  burger.addEventListener('click', () => setOpen(!open));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) setOpen(false, true);
    // focus trap: while the drawer is open, Tab cycles burger → drawer links
    // (content behind the scrim is visually obscured — focus must not reach it)
    if (e.key === 'Tab' && open) {
      const cycle: HTMLElement[] = [burger, ...links];
      const first = cycle[0];
      const last = cycle[cycle.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!active || !cycle.includes(active)) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  // navigating (or dialing) from the drawer closes it
  nav.addEventListener('click', (e) => {
    if (open && (e.target as HTMLElement).closest('a')) setOpen(false);
  });
  // the drawer is the only nav at every width — start inert until opened
  applyClosedAttrs();
}

/* --------------------------------------------- home link: scroll, not reload */

function initHomeLink(root: HTMLElement): void {
  if (root.dataset.mode !== 'spy') return;
  const home = root.querySelector<HTMLAnchorElement>('a[data-key="home"]');
  home?.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToTop();
  });
}

/* -------------------------------------------------------------------- logo */

function initLogo(root: HTMLElement): void {
  const logo = root.querySelector<HTMLElement>('[data-logo]');
  if (!logo) return;

  if (logo.tagName === 'BUTTON') {
    logo.addEventListener('click', scrollToTop);
  }

  logo.classList.add('is-docked');
}

/* ------------------------------------------ hero burger proxy (Home only) */

// Hero's own pre-scroll floating row (<1024, before the real bar reveals)
// carries a burger button that isn't inside .nav-root, so initDrawer()'s
// scoped query can't find it. Rather than re-implement open/close/focus-trap/
// Escape a second time, this just forwards the click to the real button —
// one source of truth for drawer state.
function initHeroBurgerProxy(root: HTMLElement): void {
  const proxy = document.querySelector<HTMLButtonElement>('[data-hero-burger-proxy]');
  const real = root.querySelector<HTMLButtonElement>('[data-burger]');
  proxy?.addEventListener('click', () => real?.click());
}

/* ------------------------------------------------------------------ init */

export function initNav(): void {
  const root = document.querySelector<HTMLElement>('[data-nav-root]');
  if (!root || root.dataset.navBound === 'true') return;
  root.dataset.navBound = 'true';

  initDrawer(root);
  initHomeLink(root);
  initLogo(root);
  initHeroBurgerProxy(root);
}
