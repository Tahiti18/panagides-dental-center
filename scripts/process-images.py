"""Web versions of the clinic's own photographs (public/img/), from assets/images/ and the two
larger originals published on panagidisdental.com (reception and office, 1600 px).

Nothing is retouched: images are only cropped where noted and resized. WebP at the widths the
site uses, plus a JPEG fallback at the largest width.
Run: python3 scripts/process-images.py
"""
import io, pathlib, urllib.request
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / 'assets' / 'images'
OUT = ROOT / 'public' / 'img'
OUT.mkdir(parents=True, exist_ok=True)
LIB = 'https://www.panagidisdental.com/storage/library/'

def load(name):
    if name.startswith('lib:'):
        req = urllib.request.Request(LIB + name[4:], headers={'User-Agent': 'Mozilla/5.0'})
        return Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=30).read())).convert('RGB')
    return Image.open(SRC / name).convert('RGB')

# key: (source, widths, crop box as fractions (l, t, r, b) or None)
JOBS = {
    'hero-model':        ('hero_slide6.jpg', (800, 1280, 1920), None),            # model engraved "Adonis Panagidis", seen through loupes
    'scanner':           ('hero_slide5.jpg', (800, 1280, 1920), None),            # 3Shape intraoral scanner and planning screen
    'instruments':       ('hero_slide4.jpg', (800, 1280, 1920), None),
    'cerec-unit':        ('hero_slide1.png', (640, 1100), (0.0, 0.08, 0.6, 1.0)),  # CEREC MC XL (product image, as published by the clinic)
    'restorations':      ('body_cerec_machine.png', (640, 1000, 1400), None),     # ceramic restorations milled in the clinic
    'reception':         ('lib:60151fec8283d.jpg', (640, 1000, 1600), None),
    'office':            ('lib:60152649a2d2e.jpg', (640, 1000, 1600), None),
    'room-1':            ('gallery1.jpg', (640,), None),
    'room-2':            ('gallery6.jpg', (640,), None),                          # second treatment room, operating microscope
    'unit':              ('gallery2.jpg', (640,), None),
    'portrait':          ('dr_adonis.jpg', (357,), None),
}
for key, (src, widths, crop) in JOBS.items():
    im = load(src)
    if crop:
        w, h = im.size
        im = im.crop((round(crop[0] * w), round(crop[1] * h), round(crop[2] * w), round(crop[3] * h)))
    for width in widths:
        out = im if width >= im.width else im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        out.save(OUT / f'{key}-{width}.webp', 'WEBP', quality=80, method=6)
    big = im if widths[-1] >= im.width else im.resize((widths[-1], round(im.height * widths[-1] / im.width)), Image.LANCZOS)
    big.save(OUT / f'{key}-{widths[-1]}.jpg', 'JPEG', quality=82, optimize=True, progressive=True)
    print(key, im.size, '->', widths)
