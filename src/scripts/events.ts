// R3 — Events page behavior.
// 1) Package folds: native <details> enhanced with a smooth WAAPI height
//    animation (transform-free content, no layout dependence for visibility),
//    deep links (/events#private-room opens its fold), Lenis scroll into view.
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

/* ---------------------------------------------------------------- folds */

function scrollToEl(el: HTMLElement): void {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: -24 });
  else el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

function initFolds(): void {
  const folds = Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-event-fold]'));
  if (!folds.length) return;

  for (const fold of folds) {
    const panel = fold.querySelector<HTMLElement>('[data-fold-panel]');
    const summary = fold.querySelector<HTMLElement>('summary');
    if (!panel || !summary) continue;

    summary.addEventListener('click', (event) => {
      if (reducedMotion || typeof panel.animate !== 'function') return; // native toggle
      event.preventDefault();

      if (fold.open) {
        // closing: animate shut, THEN remove [open] (native removal is instant)
        const h = panel.offsetHeight;
        const anim = panel.animate(
          [{ height: `${h}px`, opacity: 1 }, { height: '0px', opacity: 0 }],
          { duration: 320, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
        );
        anim.onfinish = () => {
          fold.open = false;
        };
      } else {
        fold.open = true; // native open is instant — then animate the reveal
        const h = panel.offsetHeight;
        panel.animate(
          [{ height: '0px', opacity: 0 }, { height: `${h}px`, opacity: 1 }],
          { duration: 420, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
        );
      }
    });
  }

  // deep link: /events#<package-id> opens that fold and scrolls to it
  const route = (): void => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!id) return;
    const fold = document.getElementById(id) as HTMLDetailsElement | null;
    if (!fold || !fold.hasAttribute('data-event-fold')) return;
    fold.open = true;
    requestAnimationFrame(() => scrollToEl(fold));
  };
  route();
  window.addEventListener('hashchange', route);
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

initFolds();
initMotion();
