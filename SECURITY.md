# Security Policy

## Reporting a vulnerability

Do not publish security vulnerabilities, credentials, personal information, or confidential records in a public issue.

Use GitHub's private vulnerability reporting feature for this repository when available. Include the affected page or component, reproduction steps, expected impact, and a safe contact method.

## Current data model

The Phase 1 website is static. Demonstration form records are stored only in the visitor's browser through `localStorage`; they are not transmitted by the website.

## Future Google integration

The Google Apps Script phase must apply server-side validation, least-privilege permissions, mutation logging, script locks for identifier creation, administrative authorization, and safe output encoding.
