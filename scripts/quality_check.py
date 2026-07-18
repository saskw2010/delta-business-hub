#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.rglob('*.html'))
REQUIRED = {
    'index.html','ideas.html','submit.html','community.html','about.html','404.html',
    'en/index.html','en/ideas.html','en/submit.html','en/community.html','en/about.html',
    'ar/index.html','ar/ideas.html','ar/submit.html','ar/community.html','ar/about.html',
    'assets/css/styles.css','assets/css/portal.css','assets/js/app.js','assets/js/portal.js','data/ideas.json'
}
IGNORED_PREFIXES = ('http://','https://','mailto:','tel:','#','javascript:')

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]
    def handle_starttag(self, tag, attrs):
        values=dict(attrs)
        if tag in {'a','link','script','img'}:
            key='href' if tag in {'a','link'} else 'src'
            if values.get(key): self.links.append(values[key])

errors=[]
for relative in REQUIRED:
    if not (ROOT/relative).exists(): errors.append(f'Missing required file: {relative}')
for page in HTML_FILES:
    parser=LinkParser(); parser.feed(page.read_text(encoding='utf-8'))
    for link in parser.links:
        clean=link.split('#',1)[0].split('?',1)[0]
        if not clean or clean.startswith(IGNORED_PREFIXES): continue
        target=(page.parent/clean).resolve()
        try: target.relative_to(ROOT)
        except ValueError: errors.append(f'{page.relative_to(ROOT)}: unsafe path {link}'); continue
        if not target.exists(): errors.append(f'{page.relative_to(ROOT)}: broken local reference {link}')

if errors:
    print('\n'.join(f'ERROR: {item}' for item in errors)); sys.exit(1)
print(f'Validated {len(HTML_FILES)} HTML pages and required project files.')
