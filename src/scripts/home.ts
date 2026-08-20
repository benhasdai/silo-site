/* SILO home — motion & behavior (R7.5.2: kill Moment + Ticker, bar-on-scroll
   cinema; R8.1: structure-lock adds two CinemaBand slots; R8.2: Teasers
   retired; R14-T9/T10: editorial beats + closing CTA + cinema captions added,
   all riding the shared [data-reveal] contract below). Home is now Hero →
   EditorialBeat → CinemaBand → EditorialBeat → CinemaBand → ClosingCta. What
   remains: lazy videos (poster = LCP; mp4 attached near the viewport),
   magnetic down-arrow (→ #cinema-1), quiet hero entrance (incl. the title
   beat), the hero-footage recede, the cinema-band scale-settle, and the
   generic scroll-reveal for prose/CTA sections — all riding the shared Lenis
   singleton (contracts.md — never a 2nd Lenis). prefers-reduced-motion →
   zero motion, posters only, everything visible. */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type LenisLike = {
  scrollTo(target: string | number | HTMLElement, opts?: Record<string, unknown>): void;
  on?(event: 'scroll', handler: () => void): void;
};

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getLenis = (): LenisLike | undefined =>
  (window as Window & { __lenis?: LenisLike }).__lenis;

/* ---------- 1. Lazy videos (restored R2 helper) ---------- */
function initVideos(): void {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return; // posters remain; skip video src + autoplay on data-saver

  const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video[data-video]'));
  if (!videos.length || reduced) return; // reduced motion: posters only, never autoplay

  const attach = (video: HTMLVideoElement): void => {
    if (video.dataset.loaded) return;
    video.dataset.loaded = 'true';
    video.querySelectorAll<HTMLSourceElement>('source[data-src]').forEach((source) => {
      source.src = source.dataset.src ?? '';
    });
    video.muted = true; // belt & braces for autoplay policies
    video.load();
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          attach(video);
          void video.play().catch(() => {
            /* autoplay refused — the poster stands on its own */
          });
        } else {
          video.pause();
        }
      }
    },
    { rootMargin: '25% 0px' },
  );
  videos.forEach((video) => io.observe(video));
}

/* ---------- 1.5 Scroll-reveal — shared [data-reveal] contract (R14-T9/T10) ----------
   Used by EditorialBeat, ClosingCta, and CinemaBand's caption. Progressive
   enhancement: elements start at their CSS default (fully visible, no
   transform) until this arms them with `.is-pre` (opacity:0 + translateY),
   then IntersectionObserver flips `.is-in` on first entry. If this never
   runs (JS error, reduced motion), the CSS default stands — content is never
   gated on the tween. transform+opacity only, one-shot (unobserve on entry). */
function initReveals(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!els.length || reduced) return;

  els.forEach((el) => el.classList.add('is-pre'));

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.remove('is-pre');
        el.classList.add('is-in');
        io.unobserve(el);
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- 2. Scroll choreography — parallax depth, whispered ---------- */
function initMotion(): void {
  if (reduced) return; // CSS defaults: everything visible

  gsap.registerPlugin(ScrollTrigger);
  getLenis()?.on?.('scroll', ScrollTrigger.update);

  /* hero footage recedes gently over the section's natural exit (no pin) */
  const frame = document.querySelector('[data-hero-frame]');
  if (frame) {
    gsap.to(frame, {
      scale: 1.06,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  /* cinema bands (R8.1) — gentle scale-settle as each band enters, re-scoping
     the retired Moment tween pattern. initVideos() already no-ops on
     placeholders (no data-video), so this runs identically for both states. */
  gsap.utils.toArray<HTMLElement>('[data-cinema-band]').forEach((band) => {
    gsap.fromTo(
      band,
      { scale: 1.08 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: band, start: 'top bottom', end: 'top top', scrub: true },
      },
    );
  });

  /* hero entrance — quiet rise, a brief beat after paint (no intro to wait out) */
  const heroRise = gsap.utils.toArray<HTMLElement>('[data-hero-rise]');
  const heroFade = gsap.utils.toArray<HTMLElement>('[data-hero-fade]');
  // The hero entrance must ENHANCE an already-visible default — never gate the
  // primary booking CTA's visibility on a tween. gsap.from() sets opacity:0
  // synchronously, so on a tab that loads hidden (background/new-tab, common
  // when diners comparison-shop) rAF is suspended and the hero would sit blank.
  // Deferring the call until the tab is visible keeps every element at its CSS
  // default (opacity 1) until first view, then plays the entrance once.
  // the cinematic opening title: fades in, holds a beat, then lifts away —
  // leaving the calm hero (tagline + arrow). Decorative; identity also lives in
  // the h1 + tagline, and reduced-motion drops it entirely (CSS), so gating this
  // flourish on the tween is safe.
  const heroTitle = document.querySelector<HTMLElement>('[data-hero-title]');
  const playHeroEntrance = (): void => {
    if (heroTitle) {
      gsap
        .timeline()
        .from(heroTitle, { autoAlpha: 0, y: 22, duration: 0.9, ease: 'power3.out' }, 0.2)
        .to(heroTitle, { autoAlpha: 0, y: -18, duration: 0.7, ease: 'power2.in' }, '+=1.3');
    }
    if (heroRise.length) {
      gsap.from(heroRise, {
        y: 18,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.09,
        delay: 0.2,
        clearProps: 'transform,opacity',
      });
    }
    if (heroFade.length) {
      // opacity only — the magnetic wrapper owns this element's transform
      gsap.from(heroFade, { opacity: 0, duration: 1, delay: 0.5, ease: 'power2.out', clearProps: 'opacity' });
    }
  };
  if (document.visibilityState === 'visible') {
    playHeroEntrance();
  } else {
    const onVisible = (): void => {
      if (document.visibilityState !== 'visible') return;
      document.removeEventListener('visibilitychange', onVisible);
      playHeroEntrance();
    };
    document.addEventListener('visibilitychange', onVisible);
  }
}

initVideos();
initMotion();
initReveals();
