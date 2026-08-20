// SILO home — cinema pool (R8.1 "structure lock"). Three slots (hero, band2,
// band3), each an array for the future random-video rules engine (§Flags 4 —
// render picks [0] for now). One shape drives both states: src === null
// renders a labeled placeholder block; src set renders the real <video>
// (Hero.astro / CinemaBand.astro, home.ts initVideos()) — dropping real
// footage later is a pool edit only, zero structural change.
//
// R8.6 (owner, 2026-07-13): real footage wired for all three slots — the
// owner's own kitchen/bar clips, already cut to length; cocktail-pour.mp4 was
// additionally encoded down from the owner-supplied raw source (a complete 11s
// take, no trim needed) matching the project's established
// recipe (-an -r 25 -vf scale -c:v libx264 -preset slow -crf 26 -movflags
// +faststart). Placeholder shape kept for any future slot still empty.
//
// R15 (owner, 2026-07-23): a 4th band (kitchen-crew.mp4, people-forward) was
// tried and reverted same day — the owner watched it loop live and rejected
// it (an eyes-closed moment reads badly on repeat). See
// claude-memory/log/2026-07-23__silo-site-band4-reverted.md.

export type Clip = {
  src: string | null;
  poster: string | null;
  label: string;
  tint: string;
};

export const homeVideos: { hero: Clip[]; band2: Clip[]; band3: Clip[] } = {
  hero: [
    {
      src: '/media/hero-c0013.mp4',
      poster: '/media/hero-c0013-poster.jpg',
      label: 'סרטון פתיחה',
      tint: 'var(--color-ground-sunk)',
    },
  ],
  band2: [
    {
      src: '/media/moment-dough.mp4',
      poster: '/media/moment-dough-poster.jpg',
      label: 'סרטון 2',
      tint: 'var(--color-ground-raised)',
    },
  ],
  band3: [
    {
      src: '/media/cocktail-pour.mp4',
      poster: '/media/cocktail-pour-poster.jpg',
      label: 'סרטון 3',
      tint: 'color-mix(in srgb, var(--color-warm-surface) 22%, var(--color-ground))',
    },
  ],
};
