# Delta Business Hub

**Where ideas become businesses.**

Delta Business Hub (DBH) is an open, company-neutral community platform for entrepreneurs, professionals, founders, investors, and builders to discover ideas, find collaborators, and launch projects together.

> Connect. Share. Build. Grow.

## Live website

The site is deployed through GitHub Pages from the `main` branch using GitHub Actions:

`https://saskw2010.github.io/delta-business-hub/`

## Current release

The GitHub Pages foundation includes:

- Animated globe entry page with English and Arabic language selection
- Complete English and Arabic versions of the core public pages
- Centered language switch on every localized page
- Responsive RTL support for the Arabic experience
- Searchable and filterable ideas directories
- Browser-local idea submission with localized validation
- Community and project information pages
- Dark/light appearance controls
- Automated Pages deployment and recursive link validation
- Documentation for the future Google Sheets/Drive/Apps Script integration

The local submission demo stores data only in the visitor's browser. Public submissions will be activated in the next phase through Google Apps Script and the Delta Business Hub Google Sheet.

## Project structure

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
├── ar/
│   ├── index.html
│   ├── ideas.html
│   ├── submit.html
│   ├── community.html
│   └── about.html
├── en/
│   ├── index.html
│   ├── ideas.html
│   ├── submit.html
│   ├── community.html
│   └── about.html
├── assets/
│   ├── css/
│   ├── img/
│   └── js/
├── data/
├── docs/
├── index.html
├── ideas.html
├── submit.html
├── community.html
├── about.html
└── 404.html
```

## Local development

No build system is required. Serve the repository root with any static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Architecture

```text
Bilingual GitHub Pages UI
      │
      ├── English experience /en
      ├── Arabic experience /ar
      ├── Static JSON demonstration data
      ├── Local browser drafts
      │
      └── Next phase: Google Apps Script API
                        ├── Google Sheets
                        ├── Google Drive
                        └── Google Docs
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`docs/GOOGLE-INTEGRATION.md`](docs/GOOGLE-INTEGRATION.md).

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) and the [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) before opening an issue or pull request.

## License

MIT © Delta Business Hub contributors.
