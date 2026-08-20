/**
 * SILO — menu page enhancement (task 11).
 *
 * Baseline (no JS): all four sections render stacked; the tab bar and category
 * chips are plain in-page anchor links. This module upgrades, never replaces:
 *   - tab bar        → ARIA tablist (roles, aria-selected, RTL arrow keys)
 *   - category chips → filter buttons (aria-pressed)
 *   - dietary toggles (vegan / gluten-free) → revealed + wired
 *   - deep links     → #panel-<tab> and #cat-<category> keep working
 *
 * Scrolling goes through the shared Lenis singleton (contracts.md) with a
 * native scrollIntoView fallback; sticky offsets come from each target's
 * scroll-margin-block-start so CSS stays the single source of truth.
 */

type LenisLike = { scrollTo: (target: Element, opts?: Record<string, unknown>) => void };

const root = document.querySelector<HTMLElement>('[data-menu-root]');
if (root) enhance(root);

function enhance(page: HTMLElement): void {
  const tabs = Array.from(page.querySelectorAll<HTMLAnchorElement>('[data-menu-tab]'));
  const panels = Array.from(page.querySelectorAll<HTMLElement>('[data-menu-panel]'));
  if (!tabs.length || !panels.length) return;

  document.documentElement.classList.add('js-menu');

  const tablist = page.querySelector<HTMLElement>('[data-menu-tablist]');
  const filters = page.querySelector<HTMLElement>('[data-menu-filters]');
  const dietaryGroup = page.querySelector<HTMLElement>('[data-dietary]');
  const dietaryToggles = Array.from(page.querySelectorAll<HTMLButtonElement>('[data-diet]'));
  const catChips = Array.from(page.querySelectorAll<HTMLAnchorElement>('[data-cat]'));
  const resets = Array.from(page.querySelectorAll<HTMLButtonElement>('[data-menu-reset]'));
  const filtersSep = page.querySelector<HTMLElement>('[data-filters-sep]');
  const panelsWrap = page.querySelector<HTMLElement>('[data-menu-panels]') ?? page;

  let activeCat = 'all';
  const diet = { vegan: false, gf: false };

  /* ---------- ARIA wiring (progressive upgrade) ---------- */

  if (tablist) {
    tablist.setAttribute('role', 'tablist');
    // Locale-correct label already lives on the wrapping <nav> (R9 i18n) —
    // read it instead of hardcoding, so en/ru pages never get re-Hebrewed.
    const navLabel = tablist.closest('nav')?.getAttribute('aria-label');
    if (navLabel) tablist.setAttribute('aria-label', navLabel);
    for (const li of Array.from(tablist.children)) li.setAttribute('role', 'presentation');
  }
  for (const tab of tabs) {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `panel-${tab.dataset.menuTab ?? ''}`);
  }
  for (const panel of panels) {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '-1');
    panel.setAttribute('aria-labelledby', `tab-${panel.dataset.menuPanel ?? ''}`);
  }

  dietaryGroup?.removeAttribute('hidden');
  filtersSep?.removeAttribute('hidden');
  for (const b of dietaryToggles) b.setAttribute('aria-pressed', 'false');
  for (const chip of catChips) {
    chip.setAttribute('role', 'button');
    chip.setAttribute('aria-pressed', chip.dataset.cat === 'all' ? 'true' : 'false');
  }

  /* ---------- helpers ---------- */

  function tabById(id: string): HTMLAnchorElement | undefined {
    return tabs.find((t) => t.dataset.menuTab === id);
  }

  function scrollToEl(el: HTMLElement): void {
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    const offset = Number.parseFloat(getComputedStyle(el).scrollMarginBlockStart || '0') || 0;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(el, { offset: -offset });
    } else {
      el.scrollIntoView({ block: 'start' });
    }
  }

  /** Bring the list back into view after a tab/category change, but only if the
      guest has already scrolled past the header (avoid jumping the page top). */
  function scrollToPanels(): void {
    if (panelsWrap.getBoundingClientRect().top < 0) scrollToEl(panelsWrap);
  }

  function setHash(hash: string): void {
    try {
      history.replaceState(null, '', `#${hash}`);
    } catch {
      /* translate-proxy or privacy contexts — hash is a nicety, never critical */
    }
  }

  /* ---------- tabs ---------- */

  function selectTab(id: string, opts: { hash?: boolean; scroll?: boolean; focus?: boolean } = {}): void {
    const tab = tabById(id);
    if (!tab) return;
    for (const t of tabs) {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
    }
    for (const p of panels) p.hidden = p.dataset.menuPanel !== id;
    filters?.setAttribute('data-active-tab', id);
    if (opts.hash !== false) setHash(`panel-${id}`);
    if (opts.focus) tab.focus();
    if (opts.scroll) scrollToPanels();
  }

  for (const tab of tabs) {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      selectTab(tab.dataset.menuTab ?? '', { scroll: true });
    });
  }

  // Keyboard per WAI-ARIA tabs pattern — arrows reversed for RTL.
  tablist?.addEventListener('keydown', (e) => {
    const current = tabs.indexOf(document.activeElement as HTMLAnchorElement);
    if (current === -1) return;
    let next = -1;
    if (e.key === 'ArrowLeft') next = (current + 1) % tabs.length;
    else if (e.key === 'ArrowRight') next = (current - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next === -1) return;
    e.preventDefault();
    selectTab(tabs[next].dataset.menuTab ?? '', { focus: true });
  });

  /* ---------- filtering (category chips + dietary toggles) ---------- */

  function itemMatchesDiet(el: HTMLElement): boolean {
    if (diet.vegan && el.dataset.vegan !== '1') return false;
    if (diet.gf && el.dataset.gf !== '1') return false;
    return true;
  }

  function setItemHidden(item: HTMLElement, hidden: boolean): void {
    const row = (item.closest('li') as HTMLElement | null) ?? item;
    row.hidden = hidden;
  }

  function applyFilters(): void {
    for (const panel of panels) {
      let anyVisible = false;
      const groups = Array.from(panel.querySelectorAll<HTMLElement>('[data-category]'));

      if (groups.length) {
        for (const group of groups) {
          const inCat = activeCat === 'all' || group.dataset.category === activeCat;
          let groupHasVisible = false;
          for (const item of Array.from(group.querySelectorAll<HTMLElement>('[data-item-id]'))) {
            const show = inCat && itemMatchesDiet(item);
            setItemHidden(item, !show);
            if (show) groupHasVisible = true;
          }
          group.hidden = !groupHasVisible;
          if (groupHasVisible) anyVisible = true;
        }
      } else {
        for (const item of Array.from(panel.querySelectorAll<HTMLElement>('[data-item-id]'))) {
          const show = itemMatchesDiet(item);
          setItemHidden(item, !show);
          if (show) anyVisible = true;
        }
      }

      // A single category strands the printed-menu 2-column flow with an empty
      // half (user R5 #9/#10). When a category chip is active, collapse the
      // grouped panel to one centered column; 'all' + dietary-only keep 2-col.
      const groupsWrap = panel.querySelector<HTMLElement>('.panel-groups');
      if (groupsWrap) groupsWrap.toggleAttribute('data-filtered', activeCat !== 'all');

      const empty = panel.querySelector<HTMLElement>('[data-menu-empty]');
      if (empty) empty.hidden = anyVisible;
    }
  }

  /** Soft whisper on the visible groups so the collapse-to-centre reads as one
      motion, not a jump. Resting state stays the natural render (fill:'none'). */
  function whisperGroups(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof Element.prototype.animate !== 'function') return;
    const grouped = panels.find((p) => p.querySelector('.panel-groups'));
    if (!grouped) return;
    const visible = Array.from(grouped.querySelectorAll<HTMLElement>('.menu-group')).filter(
      (g) => !g.hidden,
    );
    visible.forEach((g, i) => {
      g.animate(
        [
          { opacity: 0, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 420, delay: i * 45, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'none' },
      );
    });
  }

  function selectCat(cat: string): void {
    activeCat = cat;
    for (const chip of catChips) {
      const on = chip.dataset.cat === cat;
      chip.classList.toggle('is-active', on);
      chip.setAttribute('aria-pressed', String(on));
    }
    applyFilters();
    whisperGroups();
  }

  for (const chip of catChips) {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      selectCat(chip.dataset.cat ?? 'all');
      scrollToPanels();
    });
    // anchors upgraded to role="button" must also respond to Space
    chip.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        chip.click();
      }
    });
  }

  for (const btn of dietaryToggles) {
    btn.addEventListener('click', () => {
      const key = btn.dataset.diet === 'vegan' ? 'vegan' : 'gf';
      diet[key] = !diet[key];
      btn.classList.toggle('is-active', diet[key]);
      btn.setAttribute('aria-pressed', String(diet[key]));
      applyFilters();
    });
  }

  for (const btn of resets) {
    btn.addEventListener('click', () => {
      diet.vegan = false;
      diet.gf = false;
      for (const b of dietaryToggles) {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      }
      selectCat('all');
    });
  }

  /* ---------- deep links: #panel-<tab> / #cat-<category> ---------- */

  function route(rawHash: string): void {
    let hash = '';
    try {
      hash = decodeURIComponent(rawHash.replace(/^#/, ''));
    } catch {
      return;
    }
    if (!hash) return;
    if (hash.startsWith('panel-')) {
      const id = hash.slice('panel-'.length);
      if (tabById(id)) selectTab(id, { hash: false });
    } else if (hash.startsWith('cat-')) {
      const target = document.getElementById(hash);
      if (target) {
        selectTab('restaurant', { hash: false });
        requestAnimationFrame(() => scrollToEl(target));
      }
    }
  }

  /* ---------- initial state ---------- */

  selectTab(tabs[0]?.dataset.menuTab ?? 'restaurant', { hash: false });
  route(location.hash);
  window.addEventListener('hashchange', () => route(location.hash));

  initGroupReveal(page);
}

/**
 * Whispered per-group reveal: each category/list rises once as it enters view.
 * Uses the Web Animations API with `fill: 'none'`, so the element's RESTING
 * state is its natural (visible) render — nothing is gated on a class. No-JS,
 * reduced-motion, and headless renders all show the content by default.
 */
function initGroupReveal(page: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window) || typeof Element.prototype.animate !== 'function') return;

  const targets = Array.from(page.querySelectorAll<HTMLElement>('.menu-group, .panel-items'));
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        obs.unobserve(entry.target);
        (entry.target as HTMLElement).animate(
          [
            { opacity: 0, transform: 'translateY(14px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'none' },
        );
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
  );
  targets.forEach((t) => io.observe(t));
}
