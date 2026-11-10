// Header, menu, mobile contact bar, scroll motion, reviews rail, CEREC steps and the form.
//
// Progressive enhancement: every section is visible without this script. The inline script in
// Layout.astro adds `js` (which lets reveals start hidden) only where this script can run, and
// takes it away again unless this script marks the page `js-ready`. Each feature below runs in its
// own try/catch, so one unsupported API in an older browser cannot stop the others, and the
// reveals run first.
const html = document.documentElement;
html.classList.add('js-ready');

const safe = (name: string, fn: () => void) => {
  try { fn(); } catch (err) { console.error(`[site] ${name}`, err); }
};

// matchMedia, with the older addListener API (Safari < 14) when addEventListener is missing
const media = (query: string): MediaQueryList | null => {
  try { return typeof window.matchMedia === 'function' ? window.matchMedia(query) : null; } catch { return null; }
};
const onMediaChange = (mql: MediaQueryList | null, fn: (e: MediaQueryListEvent) => void) => {
  if (!mql) return;
  if (typeof mql.addEventListener === 'function') mql.addEventListener('change', fn);
  else if (typeof mql.addListener === 'function') mql.addListener(fn);
};

const reduce = !!media('(prefers-reduced-motion: reduce)')?.matches;
const hasIO = 'IntersectionObserver' in window;
const io = (cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) => new IntersectionObserver(cb, opts);
// Some early IntersectionObserver versions lack isIntersecting
const inView = (e: IntersectionObserverEntry) => (typeof e.isIntersecting === 'boolean' ? e.isIntersecting : e.intersectionRatio > 0);
const raf = (fn: () => void) => (window.requestAnimationFrame ? window.requestAnimationFrame(fn) : window.setTimeout(fn, 16));

// ---------- Settling reveals and one-time effects (first, so content always appears) ----------
const once = (selector: string, cls: string, opts: IntersectionObserverInit = { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }) => {
  const els = document.querySelectorAll<HTMLElement>(selector);
  const showAll = () => els.forEach((el) => el.classList.add(cls));
  if (reduce || !hasIO) { showAll(); return; }
  try {
    const obs = io((entries) => entries.forEach((e) => { if (inView(e)) { e.target.classList.add(cls); obs.unobserve(e.target); } }), opts);
    els.forEach((el) => obs.observe(el));
  } catch (err) {
    showAll();
    throw err;
  }
};
safe('reveals', () => {
  try {
    once('.rv, .zoom', 'is-in');
    once('[data-stars]', 'is-lit', { threshold: 0.5 });
  } catch (err) {
    html.classList.remove('js'); // last resort: drop the hidden starting state altogether
    throw err;
  }
});

// ---------- Header state ----------
safe('header', () => {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

// ---------- Mobile menu ----------
safe('menu', () => {
  const menuBtn = document.querySelector<HTMLButtonElement>('[data-menu]');
  const drawer = document.querySelector<HTMLElement>('[data-drawer]');
  const menuLabel = document.querySelector<HTMLElement>('[data-menu-label]');
  const setMenu = (open: boolean) => {
    if (!menuBtn || !drawer) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    drawer.hidden = !open;
    document.body.classList.toggle('no-scroll', open);
    if (menuLabel) menuLabel.textContent = (open ? menuLabel.dataset.close : menuLabel.dataset.open) ?? '';
    if (open) drawer.querySelector<HTMLElement>('a')?.focus();
  };
  menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
  });
  onMediaChange(media('(min-width: 1180px)'), (m) => { if (m.matches) setMenu(false); });
});

// ---------- Mobile contact bar: steps aside while the hero buttons, a form or the footer are on screen ----------
safe('contact bar', () => {
  const bar = document.querySelector<HTMLElement>('[data-mbar]');
  if (!bar || !hasIO) return;
  const seen = new Set<Element>();
  const watch = io((entries) => {
    entries.forEach((e) => (inView(e) ? seen.add(e.target) : seen.delete(e.target)));
    bar.classList.toggle('is-hidden', seen.size > 0);
  });
  document.querySelectorAll('[data-hero-cta], form, .site-footer .foot-bottom').forEach((el) => watch.observe(el));
});

// ---------- Light parallax on a few large photos (desktop, motion allowed) ----------
safe('parallax', () => {
  const parallax = Array.prototype.slice.call(document.querySelectorAll<HTMLElement>('[data-parallax]')) as HTMLElement[];
  if (!parallax.length || reduce || !media('(min-width: 900px)')?.matches) return;
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    for (const el of parallax) {
      if (!el.parentElement) continue;
      const box = el.parentElement.getBoundingClientRect();
      if (box.bottom < -100 || box.top > vh + 100) continue;
      const speed = Number(el.dataset.parallax) || 0.06;
      const offset = (box.top + box.height / 2 - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.12)`;
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; raf(update); } }, { passive: true });
  update();
});

// ---------- Timeline line grows with the reader ----------
safe('timeline', () => {
  if (reduce) return;
  document.querySelectorAll<HTMLElement>('.tl').forEach((tl) => {
    const update = () => {
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.75 - r.top) / r.height));
      tl.style.setProperty('--p', p.toFixed(3));
    };
    window.addEventListener('scroll', () => raf(update), { passive: true });
    update();
  });
});

// ---------- CEREC flow: the step in view lights up, and its photo shows ----------
safe('cerec flow', () => {
  const flow = document.querySelector<HTMLElement>('[data-flow]');
  if (!flow) return;
  const steps = Array.prototype.slice.call(flow.querySelectorAll<HTMLElement>('.flow-step')) as HTMLElement[];
  const imgs = Array.prototype.slice.call(flow.querySelectorAll<HTMLElement>('.flow-media img')) as HTMLElement[];
  const activate = (i: number) => {
    steps.forEach((s, j) => s.classList.toggle('is-on', j === i));
    imgs.forEach((im, j) => im.classList.toggle('is-on', j === i));
  };
  activate(0);
  if (hasIO) {
    const obs = io((entries) => entries.forEach((e) => { if (inView(e)) activate(steps.indexOf(e.target as HTMLElement)); }), { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach((s) => obs.observe(s));
  }
});

// ---------- Implant plan: walks 01 → 04 on a loop as soon as it scrolls into view; the Pause button stops it ----------
document.querySelectorAll<HTMLElement>('[data-plan]').forEach((root) => safe('implant plan', () => {
  if (reduce || !hasIO) return;
  const items = Array.prototype.slice.call(root.querySelectorAll<HTMLElement>('.plan li')) as HTMLElement[];
  const line = root.querySelector<HTMLElement>('.plan-line');
  if (!line || !items.length) return;
  const ctrl = root.querySelector<HTMLElement>('.plan-ctrl');
  const toggle = root.querySelector<HTMLButtonElement>('[data-toggle]');
  const wide = media('(min-width: 900px)');
  const isWide = () => !!wide?.matches;
  // Centre of the 15px dot from the item's top-left, and where the line starts (see .plan-line)
  const dot = () => (isWide() ? 14.5 : 7.5);
  const top = () => (isWide() ? 14 : 7);
  const STEP = 1500; // time on each step, 01 → 04
  const CLEAR = 500; // pause with nothing lit before 01 again
  let i = -1;
  let timer = 0;
  let userPaused = false;
  let visible = false;

  // Fraction of the line that reaches step k's dot (the last step fills it to the end)
  const fill = (k: number) => {
    if (k < 0) return 0;
    if (isWide()) return k === items.length - 1 ? 1 : (items[k].offsetLeft + 7.5 - 7) / (root.clientWidth - 7);
    const last = items[items.length - 1].offsetTop + dot() - top();
    return (items[k].offsetTop + dot() - top()) / last;
  };
  const size = () => { line.style.height = isWide() ? '' : `${items[items.length - 1].offsetTop + dot() - top()}px`; };
  const show = (k: number) => {
    i = k;
    items.forEach((li, j) => {
      li.classList.toggle('is-on', j === k);
      li.classList.toggle('is-done', j < k);
      if (j === k) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
    root.style.setProperty('--f', fill(k).toFixed(4));
  };
  const tick = () => {
    const next = i >= items.length - 1 ? -1 : i + 1; // after 04, clear and start again
    show(next);
    timer = window.setTimeout(tick, next === -1 ? CLEAR : STEP);
  };
  const running = () => !userPaused && visible && !document.hidden;
  const sync = () => {
    window.clearTimeout(timer); timer = 0;
    if (running()) timer = window.setTimeout(tick, i < 0 ? 0 : STEP);
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(userPaused));
      const label = toggle.querySelector('[data-label]');
      if (label) label.textContent = (userPaused ? toggle.dataset.play : toggle.dataset.pause) ?? '';
      toggle.classList.toggle('is-paused', userPaused);
    }
  };

  root.classList.add('is-looping');
  if (ctrl) ctrl.hidden = false;
  size();
  show(-1);
  toggle?.addEventListener('click', () => { userPaused = !userPaused; sync(); });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('resize', () => { size(); root.style.setProperty('--f', fill(i).toFixed(4)); }, { passive: true });
  // Starts as soon as the top of the plan is a little way onto the screen
  io(([e]) => { visible = inView(e); sync(); }, { rootMargin: '0px 0px -10% 0px' }).observe(root);
}));

// ---------- Reviews rail: four at a time, drifts on by itself, stops when touched ----------
document.querySelectorAll<HTMLElement>('[data-rail]').forEach((root) => safe('reviews rail', () => {
  const track = root.querySelector<HTMLElement>('.rail');
  if (!track || !track.firstElementChild) return;
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const toggle = root.querySelector<HTMLButtonElement>('[data-toggle]');
  const step = () => (track.firstElementChild as HTMLElement).getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 20);
  const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  // Element.scrollTo/scrollBy with options arrived in Safari 14; set scrollLeft where they are missing
  const scrollToX = (left: number) => {
    if (typeof track.scrollTo === 'function') track.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
    else track.scrollLeft = left;
  };
  const go = (dir: 1 | -1) => {
    if (dir === 1 && atEnd()) scrollToX(0);
    else scrollToX(track.scrollLeft + dir * step());
  };
  prev?.addEventListener('click', () => { stop(true); go(-1); });
  next?.addEventListener('click', () => { stop(true); go(1); });

  let timer = 0;
  let userPaused = reduce;
  let hover = false;
  let visible = !hasIO; // without IntersectionObserver, treat the rail as on screen
  const run = () => { if (!timer && !userPaused && !hover && visible && !document.hidden) timer = window.setInterval(() => go(1), 4500); };
  const halt = () => { window.clearInterval(timer); timer = 0; };
  const sync = () => {
    halt(); run();
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(userPaused));
      const label = toggle.querySelector('[data-label]');
      if (label) label.textContent = (userPaused ? toggle.dataset.play : toggle.dataset.pause) ?? '';
      toggle.classList.toggle('is-paused', userPaused);
    }
  };
  const stop = (byUser = false) => { if (byUser) userPaused = true; sync(); };
  toggle?.addEventListener('click', () => { userPaused = !userPaused; sync(); });
  root.addEventListener('mouseenter', () => { hover = true; sync(); });
  root.addEventListener('mouseleave', () => { hover = false; sync(); });
  root.addEventListener('focusin', () => { hover = true; sync(); });
  root.addEventListener('focusout', () => { hover = false; sync(); });
  track.addEventListener(window.PointerEvent ? 'pointerdown' : 'touchstart', () => stop(true), { passive: true });
  track.addEventListener('wheel', (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stop(true); }, { passive: true });
  document.addEventListener('visibilitychange', sync);
  if (hasIO) io(([e]) => { visible = inView(e); sync(); }, { threshold: 0.4 }).observe(root);
  sync();
}));

// ---------- Before / after sliders ----------
document.querySelectorAll<HTMLElement>('[data-ba]').forEach((el) => safe('before/after', () => {
  const r = el.querySelector<HTMLInputElement>('input[type=range]');
  if (!r) return;
  const set = () => el.style.setProperty('--pos', `${r.value}%`);
  r.addEventListener('input', set);
  r.addEventListener('change', set);
  set();
}));

// ---------- Appointment form (Netlify Forms) ----------
// Sends in the background where fetch and FormData iteration exist; anywhere else the form
// submits the ordinary way (POST to Netlify, which redirects to the thank-you page).
const canAjax = typeof window.fetch === 'function' && typeof window.URLSearchParams === 'function'
  && typeof FormData === 'function' && typeof FormData.prototype.forEach === 'function';
document.querySelectorAll<HTMLFormElement>('[data-form]').forEach((form) => safe('form', () => {
  const fail = form.querySelector<HTMLElement>('[data-fail]');
  const submit = form.querySelector<HTMLButtonElement>('[type=submit]');
  const rules: [string, (v: string) => boolean][] = [
    ['first', (v) => v.trim().length > 0],
    ['last', (v) => v.trim().length > 0],
    ['tel', (v) => v.replace(/\D/g, '').length >= 8],
  ];
  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | null;
  const check = (name: string) => {
    const input = field(name);
    const rule = rules.find((r) => r[0] === name);
    if (!input || !rule) return true;
    const ok = rule[1](input.value);
    input.setAttribute('aria-invalid', String(!ok));
    const err = document.getElementById(`${input.id}-err`);
    if (err) err.textContent = ok ? '' : err.dataset.msg ?? '';
    return ok;
  };
  rules.forEach(([n]) => field(n)?.addEventListener('blur', (e) => { if ((e.target as HTMLInputElement).value) check(n); }));
  form.addEventListener('submit', async (e) => {
    fail?.classList.add('hidden');
    const results = rules.map(([n]) => check(n));
    if (results.includes(false)) {
      e.preventDefault();
      field(rules[results.indexOf(false)][0])?.focus();
      return;
    }
    if (!canAjax || !submit) return; // ordinary form post
    e.preventDefault();
    const label = submit.textContent;
    submit.disabled = true; submit.textContent = form.dataset.sending ?? label;
    try {
      const params = new URLSearchParams();
      new FormData(form).forEach((value, key) => { if (typeof value === 'string') params.append(key, value); });
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() });
      if (!res.ok) throw new Error(String(res.status));
      window.location.href = form.getAttribute('action') ?? '/thanks/';
    } catch {
      fail?.classList.remove('hidden');
      submit.disabled = false; submit.textContent = label;
    }
  });
}));
