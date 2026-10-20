// Clinical cases published by the clinic on Facebook. The owner has approval to use them on the
// site (20 Oct 2026). Images go in public/img/cases/ as <key>-before.webp / <key>-after.webp.
// The results section on the homepage appears as soon as this list has an entry.
import type { L } from './site';
export const cases: { key: string; title: L; text: L; w: number; h: number }[] = [];
