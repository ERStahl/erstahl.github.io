#!/usr/bin/env python3
"""Standalone preview builder: inlines fonts, CSS and ES modules into one HTML."""
import base64, pathlib, re, sys

root = pathlib.Path(__file__).parent

def b64(p): return base64.b64encode((root/p).read_bytes()).decode()

def inline_fonts():
    css = (root/'css/fonts.css').read_text()
    return re.sub(r'url\("\.\./(assets/fonts/[^"]+)"\) format\("woff2"\)',
                  lambda m: f'url("data:font/woff2;base64,{b64(m.group(1))}") format("woff2")', css)

def strip_module(src, drop_imports=True):
    if drop_imports:
        src = re.sub(r'^import .*?;\s*$', '', src, flags=re.M)
    return re.sub(r'export (const|function|let)', r'\1', src)

def build(out_name, title):
    fonts = inline_fonts()
    css = "\n".join((root/f'css/{n}.css').read_text() for n in ('tokens','base','sections'))

    # modules, order matters: data -> helpers -> renderers -> main calls
    books = strip_module((root/'data/books.js').read_text())
    cfg = strip_module((root/'data/config.js').read_text())
    ledger = strip_module((root/'js/ledger.js').read_text())
    render = strip_module((root/'js/render.js').read_text())
    detail = strip_module((root/'js/detail.js').read_text())
    prequel = strip_module((root/'js/prequel.js').read_text())
    reviews_data = strip_module((root/'data/reviews.js').read_text())
    reviews_js = strip_module((root/'js/reviews.js').read_text())

    # Optional demo mode: inject sample reviews to preview the layout only.
    if len(sys.argv) > 3 and sys.argv[3] == "demo":
        reviews_data = reviews_data.replace(
            "const reviews = [",
            'const reviews = [\n'
            '  { quote: "The way time is spent as money kept me up until 3 a.m. A concept I had not seen done this cleanly.", name: "Sample Reader", source: "ARC reader", stars: 5 },\n'
            '  { quote: "Razor-sharp lore. A terrifying, plausible look at what happens when a life gets quantified.", name: "Sample Reader", source: "Goodreads", stars: 5 },\n'
            '  { quote: "Cold, precise, cinematic. Characters who move through a world without mercy.", name: "Sample Reader", source: "Verified Purchase", stars: 4 },'
        )

    html = (root/'index.html').read_text()
    body = re.search(r'<body>(.*)</body>', html, re.S).group(1)
    body = re.sub(r'<script type="module".*?</script>', '', body, flags=re.S)

    page = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<style>
{fonts}
{css}
</style>
</head>
<body>
{body}
<script>
{books}
{cfg}
{reviews_data}
{ledger}
{render}
{detail}
{prequel}
{reviews_js}
mountYearsCounter();
renderShelf("#shelf-grid");
renderDetail("#detail-grid");
mountPrequel("#prequel-funnel");
mountReviews("#reviews", "#reviews-grid");
</script>
</body>
</html>"""
    out = pathlib.Path('/mnt/user-data/outputs')/out_name
    out.write_text(page)
    print(out, out.stat().st_size, 'bytes')

if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv)>1 else 'anteprima.html',
          sys.argv[2] if len(sys.argv)>2 else 'E. R. Stahl')
