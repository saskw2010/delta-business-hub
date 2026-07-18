# Google Workspace Integration Contract

This document defines the next implementation phase without embedding credentials or account-specific identifiers in the public repository.

## Target Drive structure

```text
Delta Business Hub/
├── 00_Index/
├── 01_Ideas/
├── 02_Members/
├── 03_Projects/
├── 04_Documents/
├── 05_AI_Reports/
├── 06_Attachments/
├── 07_Templates/
├── 08_Exports/
└── 99_Archive/
```

## Master spreadsheet

`Delta Business Hub - Ideas Database`

Recommended tabs:

- `Dashboard`
- `Ideas`
- `Members`
- `Projects`
- `Activity_Log`
- `Settings`
- `Lists`

## Idea record fields

| Field | Purpose |
|---|---|
| ID | Stable `DBH-0001` identifier |
| Title | Public title |
| Summary | Public opportunity summary |
| Owner | Submitter or display identity |
| Category | Controlled category |
| Stage | Concept, Validation, MVP, or Growth |
| Looking For | Requested contributors or assets |
| Skills | Searchable capability tags |
| Market | Location or target market |
| Status | Draft, Review, Published, Paused, or Archived |
| Drive Folder | Canonical folder link |
| Google Doc | Canonical idea document link |
| GitHub Issue | Optional public discussion link |
| Created At | Server timestamp |
| Updated At | Server timestamp |

## Web API contract

Suggested endpoints through one Apps Script Web App URL:

- `GET ?action=listIdeas`
- `GET ?action=getIdea&id=DBH-0001`
- `POST action=submitIdea`
- `POST action=updateIdeaStatus` (authorized operations only)

Every response should use a predictable envelope:

```json
{
  "ok": true,
  "data": {},
  "error": null,
  "requestId": "..."
}
```

## Security baseline

- Never put Drive IDs, API secrets, or privileged tokens in client-side JavaScript unless the value is intentionally public.
- Validate and normalize every field on the Apps Script server.
- Rate-limit public submissions and include a honeypot field.
- Store administrative configuration in Script Properties.
- Log every mutation in `Activity_Log`.
- Generate IDs under a script lock to prevent duplicates.
- Publish only explicitly approved records.
