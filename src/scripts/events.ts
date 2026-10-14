// R3 — Events page behavior.
// 1) Package jump bar: every package menu is always open (owner ruling
//    2026-10-14); the sticky bar above them scrolls to a package with Lenis,
//    keeps deep links (/events#brunch) landing below both sticky bars, and
//    highlights the package currently in view. No-JS: plain anchor links.
// 2) Whispered motion (GSAP): hero intro + photo drift inside the cards.
//    Fully skipped under prefers-reduced-motion — nothing is hidden by CSS.
// Uses the shared Lenis singleton (window.__lenis) per contracts.md.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type LenisLike = { scrollTo: (target: Element | string | number, options?: object) => void };

function getLenis(): LenisLike | undefined {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

/* ---------------------------------------------------------- package nav */

/** Where a package lands under the two sticky bars: its CSS scroll-margin,
 *  the one source for both native anchors and Lenis (which subtracts it). */
function landingLine(el: HTMLElement): number {
  return Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
}

function scrollToPackage(el: HTMLElement, immediate = false): void {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { immediate });
  else el.scrollIntoView({ behavior: immediate || reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

function initPackageNav(): void {
  const nav = document.querySelector<HTMLElement>('[data-package-nav]');
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('[data-package-link]'));
  const packages = links
    .map((link) => document.getElementById(link.dataset.packageLink ?? ''))
    .filter((el): el is HTMLElement => el !== null);
  if (!packages.length) return;

  const setActive = (id: string): void => {
    for (const link of links) {
      const on = link.dataset.packageLink === id;
      link.classList.toggle('is-active', on);
      if (on) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };

  for (const link of links) {
    link.addEventListener('click', (event) => {
      const target = document.getElementById(link.dataset.packageLink ?? '');
      if (!target) return;
      event.preventDefault();
      history.replaceState(null, '', `#${target.id}`);
      setActive(target.id);
      scrollToPackage(target);
    });
  }

  // highlight: the last package whose top has reached its landing line
  const update = (): void => {
    let current = packages[0];
    for (const pkg of packages) {
      if (pkg.getBoundingClientRect().top <= landingLine(pkg) + 1) current = pkg;
    }
    setActive(current.id);
  };
  let queued = false;
  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    },
    { passive: true },
  );
  update();

  // deep link: /events#<package-id> lands on that package below the bars.
  // On arrival, wait for `load` so the layout's Lenis exists and the page is
  // laid out (the last package sits ~7000px down), then jump without animation.
  const route = (immediate: boolean): void => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ''));
    const target = packages.find((pkg) => pkg.id === id);
    if (!target) return;
    setActive(target.id);
    requestAnimationFrame(() => scrollToPackage(target, immediate));
  };
  if (document.readyState === 'complete') route(true);
  else window.addEventListener('load', () => route(true), { once: true });
  window.addEventListener('hashchange', () => route(false));
}

/* ---------------------------------------------------------------- motion */

function initMotion(): void {
  if (reducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  // quiet opening: the headline settles into place
  gsap.from('[data-intro]', {
    y: 28,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.09,
    clearProps: 'all',
  });

  // package photos drift slowly inside their frames while scrolling
  document.querySelectorAll<HTMLElement>('.show-media').forEach((frame) => {
    const img = frame.querySelector('img');
    if (!img) return;
    gsap.fromTo(
      img,
      { yPercent: -7, scale: 1.15 },
      {
        yPercent: 7,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: frame,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}

initPackageNav();
initMotion();
