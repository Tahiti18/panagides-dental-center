// Header, menu, mobile contact bar, scroll motion, reviews rail, CEREC steps and the form.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = (cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) => new IntersectionObserver(cb, opts);

// ---------- Header state ----------
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---------- Mobile menu ----------
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
window.matchMedia('(min-width: 1180px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });

// ---------- Mobile contact bar: steps aside while the hero buttons, a form or the footer are on screen ----------
const bar = document.querySelector<HTMLElement>('[data-mbar]');
if (bar && 'IntersectionObserver' in window) {
  const seen = new Set<Element>();
  const watch = io((entries) => {
    entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
    bar.classList.toggle('is-hidden', seen.size > 0);
  });
  document.querySelectorAll('[data-hero-cta], form, .site-footer .foot-bottom').forEach((el) => watch.observe(el));
}

// ---------- Settling reveals and one-time effects ----------
const once = (selector: string, cls: string, opts: IntersectionObserverInit = { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }) => {
  const els = document.querySelectorAll<HTMLElement>(selector);
  if (reduce || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add(cls)); return; }
  const obs = io((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add(cls); obs.unobserve(e.target); } }), opts);
  els.forEach((el) => obs.observe(el));
};
once('.rv, .zoom', 'is-in');
once('[data-stars]', 'is-lit', { threshold: 0.5 });

// ---------- Light parallax on a few large photos (desktop, motion allowed) ----------
const parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
if (parallax.length && !reduce && window.matchMedia('(min-width: 900px)').matches) {
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    for (const el of parallax) {
      const box = el.parentElement!.getBoundingClientRect();
      if (box.bottom < -100 || box.top > vh + 100) continue;
      const speed = Number(el.dataset.parallax) || 0.06;
      const offset = (box.top + box.height / 2 - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.12)`;
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

// ---------- Timeline line grows with the reader ----------
document.querySelectorAll<HTMLElement>('.tl').forEach((tl) => {
  const line = tl;
  if (reduce) return;
  const update = () => {
    const r = tl.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (window.innerHeight * 0.75 - r.top) / r.height));
    line.style.setProperty('--p', p.toFixed(3));
  };
  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
});

// ---------- CEREC flow: the step in view lights up, and its photo shows ----------
const flow = document.querySelector<HTMLElement>('[data-flow]');
if (flow) {
  const steps = [...flow.querySelectorAll<HTMLElement>('.flow-step')];
  const imgs = [...flow.querySelectorAll<HTMLElement>('.flow-media img')];
  const activate = (i: number) => {
    steps.forEach((s, j) => s.classList.toggle('is-on', j === i));
    imgs.forEach((im, j) => im.classList.toggle('is-on', j === i));
  };
  activate(0);
  if ('IntersectionObserver' in window) {
    const obs = io((entries) => entries.forEach((e) => { if (e.isIntersecting) activate(steps.indexOf(e.target as HTMLElement)); }), { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach((s) => obs.observe(s));
  }
}

// ---------- Implant plan: walks 01 → 04 on a loop while in view, stops on hover, focus or Pause ----------
document.querySelectorAll<HTMLElement>('[data-plan]').forEach((root) => {
  if (reduce || !('IntersectionObserver' in window)) return;
  const items = [...root.querySelectorAll<HTMLElement>('.plan li')];
  const line = root.querySelector<HTMLElement>('.plan-line')!;
  const ctrl = root.querySelector<HTMLElement>('.plan-ctrl');
  const toggle = root.querySelector<HTMLButtonElement>('[data-toggle]');
  const wide = window.matchMedia('(min-width: 900px)');
  // Centre of the 15px dot from the item's top-left, and where the line starts (see .plan-line)
  const dot = () => (wide.matches ? 14.5 : 7.5);
  const top = () => (wide.matches ? 14 : 7);
  let i = -1;
  let timer = 0;
  let userPaused = false;
  let hover = false;
  let visible = false;

  // Fraction of the line that reaches step k's dot (the last step fills it to the end)
  const fill = (k: number) => {
    if (k < 0) return 0;
    if (wide.matches) return k === items.length - 1 ? 1 : (items[k].offsetLeft + 7.5 - 7) / (root.clientWidth - 7);
    const last = items[items.length - 1].offsetTop + dot() - top();
    return (items[k].offsetTop + dot() - top()) / last;
  };
  const size = () => { line.style.height = wide.matches ? '' : `${items[items.length - 1].offsetTop + dot() - top()}px`; };
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
    timer = window.setTimeout(tick, next === -1 ? 900 : next === items.length - 1 ? 2800 : 2000);
  };
  const running = () => !userPaused && !hover && visible && !document.hidden;
  const sync = () => {
    window.clearTimeout(timer); timer = 0;
    if (running()) timer = window.setTimeout(tick, i < 0 ? 300 : 2000);
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(userPaused));
      toggle.querySelector('[data-label]')!.textContent = userPaused ? toggle.dataset.play! : toggle.dataset.pause!;
      toggle.classList.toggle('is-paused', userPaused);
    }
  };

  root.classList.add('is-looping');
  if (ctrl) ctrl.hidden = false;
  size();
  show(-1);
  toggle?.addEventListener('click', () => { userPaused = !userPaused; sync(); });
  root.addEventListener('mouseenter', () => { hover = true; sync(); });
  root.addEventListener('mouseleave', () => { hover = false; sync(); });
  root.addEventListener('focusin', () => { hover = true; sync(); });
  root.addEventListener('focusout', () => { hover = false; sync(); });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('resize', () => { size(); root.style.setProperty('--f', fill(i).toFixed(4)); }, { passive: true });
  io(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.35 }).observe(root);
});

// ---------- Reviews rail: four at a time, drifts on by itself, stops when touched ----------
document.querySelectorAll<HTMLElement>('[data-rail]').forEach((root) => {
  const track = root.querySelector<HTMLElement>('.rail')!;
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const toggle = root.querySelector<HTMLButtonElement>('[data-toggle]');
  const step = () => (track.firstElementChild as HTMLElement).getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || '20');
  const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  const go = (dir: 1 | -1) => {
    if (dir === 1 && atEnd()) track.scrollTo({ left: 0, behavior: reduce ? 'auto' : 'smooth' });
    else track.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' });
  };
  prev?.addEventListener('click', () => { stop(true); go(-1); });
  next?.addEventListener('click', () => { stop(true); go(1); });

  let timer = 0;
  let userPaused = reduce;
  let hover = false;
  let visible = false;
  const run = () => { if (!timer && !userPaused && !hover && visible && !document.hidden) timer = window.setInterval(() => go(1), 4500); };
  const halt = () => { window.clearInterval(timer); timer = 0; };
  const sync = () => { halt(); run(); if (toggle) { toggle.setAttribute('aria-pressed', String(userPaused)); toggle.querySelector('[data-label]')!.textContent = userPaused ? toggle.dataset.play! : toggle.dataset.pause!; toggle.classList.toggle('is-paused', userPaused); } };
  const stop = (byUser = false) => { if (byUser) userPaused = true; sync(); };
  toggle?.addEventListener('click', () => { userPaused = !userPaused; sync(); });
  root.addEventListener('mouseenter', () => { hover = true; sync(); });
  root.addEventListener('mouseleave', () => { hover = false; sync(); });
  root.addEventListener('focusin', () => { hover = true; sync(); });
  root.addEventListener('focusout', () => { hover = false; sync(); });
  track.addEventListener('pointerdown', () => stop(true), { passive: true });
  track.addEventListener('wheel', (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stop(true); }, { passive: true });
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) io(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.4 }).observe(root);
  sync();
});

// ---------- Before / after sliders ----------
document.querySelectorAll<HTMLElement>('[data-ba]').forEach((el) => {
  const r = el.querySelector<HTMLInputElement>('input[type=range]')!;
  const set = () => el.style.setProperty('--pos', `${r.value}%`);
  r.addEventListener('input', set);
  set();
});

// ---------- Appointment form (Netlify Forms) ----------
document.querySelectorAll<HTMLFormElement>('[data-form]').forEach((form) => {
  const fail = form.querySelector<HTMLElement>('[data-fail]');
  const submit = form.querySelector<HTMLButtonElement>('[type=submit]');
  const rules: [string, (v: string) => boolean][] = [
    ['first', (v) => v.trim().length > 0],
    ['last', (v) => v.trim().length > 0],
    ['tel', (v) => v.replace(/\D/g, '').length >= 8],
  ];
  const check = (name: string) => {
    const input = form.elements.namedItem(name) as HTMLInputElement;
    const ok = rules.find((r) => r[0] === name)![1](input.value);
    input.setAttribute('aria-invalid', String(!ok));
    const err = document.getElementById(`${input.id}-err`);
    if (err) err.textContent = ok ? '' : err.dataset.msg ?? '';
    return ok;
  };
  rules.forEach(([n]) => (form.elements.namedItem(n) as HTMLInputElement).addEventListener('blur', (e) => { if ((e.target as HTMLInputElement).value) check(n); }));
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    fail?.classList.add('hidden');
    const results = rules.map(([n]) => check(n));
    if (results.includes(false)) { (form.elements.namedItem(rules[results.indexOf(false)][0]) as HTMLInputElement).focus(); return; }
    const label = submit!.textContent;
    submit!.disabled = true; submit!.textContent = form.dataset.sending ?? label;
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!res.ok) throw new Error(String(res.status));
      window.location.href = form.getAttribute('action') ?? '/thanks/';
    } catch {
      fail?.classList.remove('hidden');
      submit!.disabled = false; submit!.textContent = label;
    }
  });
});
