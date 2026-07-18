# Delta Business Hub Architecture

## Phase 1: GitHub foundation

```text
Browser
  └── GitHub Pages
      ├── HTML pages
      ├── CSS design system
      ├── JavaScript interactions
      ├── JSON showcase data
      └── Browser-local idea demonstrations
```

The site intentionally uses standard HTML, CSS, and JavaScript. It requires no package manager, build pipeline, runtime server, database, or framework. This minimizes operating cost and makes the public foundation easy to audit and maintain.

## Phase 2: Google workspace backend

```text
GitHub Pages
      │ HTTPS
      ▼
Google Apps Script Web App
      ├── Validation and rate controls
      ├── DBH identifier assignment
      ├── Google Sheets master index
      ├── Google Drive folder creation
      └── Google Docs idea records and AI reports
```

## Data boundaries

- Public showcase data may be distributed with the website.
- Browser-local demonstration submissions remain on the visitor's device.
- Future operational records will be stored in the dedicated Delta Business Hub Google Drive workspace.
- Confidential information must not be submitted through public GitHub issues or the public website.

## Design decisions

1. **Company-neutral identity:** DBH is not branded as the property of a single operating company.
2. **Static-first:** GitHub Pages is the public presentation layer.
3. **Google workspace operations:** Sheets, Drive, Docs, and Apps Script will provide the initial operational backend.
4. **Stable identifiers:** future public ideas use `DBH-0001` style IDs assigned by the backend.
5. **Auditability:** source, workflows, and documentation remain versioned in GitHub.
6. **Progressive enhancement:** the core content remains readable even when optional JavaScript functionality fails.
