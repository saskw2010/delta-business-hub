# Contributing to Delta Business Hub

Thank you for helping improve the public foundation.

## Before contributing

- Keep contributions aligned with a company-neutral community identity.
- Do not commit secrets, credentials, personal data, or confidential business information.
- Use clear, accessible language and preserve mobile responsiveness.
- Test local links and JSON syntax before opening a pull request.

## Development

Serve the repository root with a static server:

```bash
python -m http.server 8000
```

Run the repository quality check:

```bash
python scripts/quality_check.py
python -m json.tool data/ideas.json > /dev/null
```

## Pull requests

Describe the user problem, implementation, testing performed, and any follow-up work. Keep unrelated changes in separate pull requests.

## Idea content

Demonstration ideas must be fictionalized or explicitly approved for public presentation. Do not imply investment, endorsement, legal partnership, or guaranteed outcomes.
