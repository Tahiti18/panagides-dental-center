"""Imports the clinic's own blog posts from panagidisdental.com into src/data/blog.json.

Text is kept as the clinic wrote it (only markup is cleaned: inline styles, empty
paragraphs and stray <br>s removed). Each post's header image and inline images are
downloaded and converted to WebP in public/img/blog/.

Run: python3 scripts/import-blog.py   (needs network access)
"""
import html, io, json, pathlib, re, urllib.request
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[1]
BASE = 'https://www.panagidisdental.com'
OUT_IMG = ROOT / 'public' / 'img' / 'blog'
OUT_IMG.mkdir(parents=True, exist_ok=True)

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req, timeout=30).read()

def save_img(url, name, width):
    try:
        im = Image.open(io.BytesIO(get(url))).convert('RGB')
    except Exception as e:
        print('  image failed', url, e); return None
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(OUT_IMG / f'{name}.webp', 'WEBP', quality=80, method=6)
    return {'src': f'/img/blog/{name}.webp', 'w': im.width, 'h': im.height}

slugs = []
for page in range(1, 6):
    s = get(f'{BASE}/en/blog?page={page}').decode('utf-8', 'ignore')
    for m in re.findall(r'href="(?:https://www\.panagidisdental\.com)?/en/blog/([^"?#/]+)"', s):
        if m not in slugs: slugs.append(m)

posts = []
for slug in slugs:
    s = get(f'{BASE}/en/blog/{slug}').decode('utf-8', 'ignore')
    title = html.unescape(re.search(r'max_750">\s*<h2 class="section_ttl">(.*?)</h2>', s, re.S).group(1)).strip()
    body = re.search(r'<div class="section_text">(.*?)</div>\s*\n\s*\n?\s*\t*\s*</div>', s, re.S)
    body = body.group(1) if body else re.search(r'<div class="section_text">(.*?)</div>', s, re.S).group(1)
    hero = re.search(r'<img src="(/storage/cache/1920x918/[^"]+)"[^>]*class="blog_image"', s)
    key = re.sub(r'[^a-z0-9]+', '-', slug.lower()).strip('-')
    hero_img = save_img(BASE + hero.group(1), key, 1200) if hero else None
    # inline images
    n = 0
    def inline(m):
        global n
        n += 1
        img = save_img(BASE + m.group(1), f'{key}-{n}', 900)
        return f'<img src="{img["src"]}" width="{img["w"]}" height="{img["h"]}" alt="" loading="lazy" />' if img else ''
    n = 0
    body = re.sub(r'<img[^>]*src="(/library/download/[^"]+)"[^>]*>', inline, body)
    body = re.sub(r'\sstyle="[^"]*"', '', body)
    body = re.sub(r'(<br\s*/?>\s*)+</p>', '</p>', body)
    body = re.sub(r'<p>\s*(<br\s*/?>\s*)+', '<p>', body)
    body = re.sub(r'<p>(\s|&nbsp;)*</p>', '', body)
    body = re.sub(r'\n\s*\n+', '\n', body).strip()
    text = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', body))).strip()
    lang = 'el' if re.search(r'[α-ωΑ-Ω]', title) else 'en'
    posts.append({'slug': key, 'title': title, 'lang': lang, 'image': hero_img,
                  'summary': text[:220].rsplit(' ', 1)[0] + '…', 'html': body,
                  'source': f'{BASE}/en/blog/{slug}'})
    print(f'{key} [{lang}] {len(text)} chars, hero={bool(hero_img)}, inline={n}')

(ROOT / 'src' / 'data').mkdir(parents=True, exist_ok=True)
(ROOT / 'src' / 'data' / 'blog.json').write_text(json.dumps(posts, ensure_ascii=False, indent=1), encoding='utf-8')
print(len(posts), 'posts')
