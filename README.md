# AIF-C01: Exam Reviewer

A mobile-friendly AWS Certified AI Practitioner (AIF-C01) practice reviewer.

## GitHub Pages

After creating this repository on GitHub:

1. Upload these files to the repository root.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select **main** and **/(root)**.
5. Save.

Your site will then be available at:

`https://<github-username>.github.io/aif-c01-exam-reviewer/`

## Included

- `index.html` — the reviewer
- `manifest.webmanifest` — installable web-app metadata
- `sw.js` — basic offline caching
- `.nojekyll` — disables Jekyll processing

The reviewer stores local preferences in the browser using localStorage.

## Answer-key audit

The current 255-question reviewer was audited on **2026-09-25** against the current AWS Certified AI Practitioner (AIF-C01) exam guide and relevant official AWS documentation. See [ANSWER-KEY-AUDIT.md](./ANSWER-KEY-AUDIT.md) for scope, corrections, and source notes.
