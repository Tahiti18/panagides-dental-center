import type { Lang } from '../data/site';
// Pages share one slug in both languages; Greek lives under /el/.
export const href = (lang: Lang, path = '') => {
  const p = path.replace(/^\/+/, '');
  return lang === 'el' ? `/el/${p}` : `/${p}`;
};
export const other = (lang: Lang): Lang => (lang === 'el' ? 'en' : 'el');
