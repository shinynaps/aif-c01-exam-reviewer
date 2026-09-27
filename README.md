# AIF-C01 Exam Reviewer

An interactive, browser-based study environment for the **AWS Certified AI Practitioner (AIF-C01)** certification. Practice by domain, take full-length mock exams, and learn from explanations of the correct choice, distractors, exam clues, and review tips.

**[Open the live reviewer](https://shinynaps.github.io/aif-c01-exam-reviewer/)** — no installation required.

## Features

- Five domain-specific practice sets and five 65-question mixed-domain mock exams
- 90-minute timer and a 72% **practice** threshold for each full mock
- Single-answer, multiple-response, and matching questions where included in a set
- Question palette, Previous/Next navigation, flag for review, and submission review
- Optional instant answer feedback after a completed question; the preference persists in your browser
- Correct-answer explanations, reasons for the other options, decisive clues, exam tips, final score, and full answer review
- Responsive layout, PWA manifest, and service-worker caching for previously loaded assets
- Orbital science-inspired visual system with restrained ambient motion and reduced-motion support
- Visual answer states, answered-question progress, and a focused results summary

## Question library

| Question set | Questions |
|---|---:|
| Domain 1 Practice | 25 |
| Domain 2 Practice | 25 |
| Domain 3 Practice | 25 |
| Domain 4 Practice | 25 |
| Domain 5 Practice | 25 |
| Mock Exam 1 | 65 |
| Mock Exam 2 | 65 |
| Mock Exam 3 | 65 |
| Mock Exam 4 | 65 |
| Mock Exam 5 | 65 |
| **Total** | **450** |

These counts were checked against the loaded JavaScript question arrays. Each mock displays questions **1–65** within its own exam. Mock Exam 5 adapts 22 of the supplied questions numbered 196–233 and adds 43 original questions to strengthen LLM-as-a-judge, responsible AI, and governance coverage. Source numbers are tracked in each question record; they are not displayed as exam question numbers.

## Exam domains

The practice sets follow the [current AIF-C01 exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html):

| Domain | Exam weight | Focus |
|---|---:|---|
| Fundamentals of AI and ML | 20% | Learning types, data, model lifecycle, and evaluation |
| Fundamentals of generative AI | 24% | Foundation models, use cases, and core concepts |
| Applications of foundation models | 28% | Prompting, RAG, customization, selection, and evaluation |
| Guidelines for responsible AI | 14% | Fairness, explainability, transparency, and safety |
| Security, compliance, and governance | 14% | Access, protection, auditing, and controls |

## How to study

1. Start with the domain practice sets to learn concepts in smaller groups.
2. Keep **Show answers after each question** enabled while learning. Read the explanation and the reasons the other options do not fit.
3. Note the decisive clue and exam tip; use them to solve a new scenario rather than memorize a letter.
4. Move to the full mock exams. Turn immediate feedback off when simulating exam conditions.
5. Submit, inspect your score and answer review, then revisit weak concepts in the domain sets.

The toggle controls when feedback appears. It does not change the answer key or final scoring.

## Run locally

```bash
git clone https://github.com/shinynaps/aif-c01-exam-reviewer.git
cd aif-c01-exam-reviewer
python3 -m http.server 8000
```

Open <http://localhost:8000>. A local HTTP server is preferable to opening `index.html` directly because the app registers a service worker. Stop the server with `Ctrl+C`.

## Project structure

```text
aif-c01-exam-reviewer/
├── index.html                 # UI and reviewer logic
├── styles.css                 # Design tokens, layout, states, and motion
├── exams/
│   ├── domain-1.js ... domain-5.js
│   └── mock-exam-1.js ... mock-exam-5.js
├── sw.js                      # Cache version, precache list, and fetch handling
├── manifest.webmanifest       # PWA metadata
├── ANSWER-KEY-AUDIT.md        # Validation history and corrections
├── README.md
└── .nojekyll                  # GitHub Pages serves files without Jekyll
```

The implementation uses **HTML, CSS, and vanilla JavaScript**. It has no build step or framework. The service worker and manifest support installation and caching; `localStorage` saves the immediate-feedback preference. Decorative motion pauses while the document is hidden, and the layout respects the user's reduced-motion setting.

### Add a mock exam

1. Create the next `exams/mock-exam-N.js` with a `window.aifExamData.mockExamN` object. Follow an existing file's question schema, zero-based `ans` indexes, and `type: 'matching'` mapping for hotspots.
2. Add its script after the other mock scripts in `index.html`, register the object in `domains`, and add `domainDescriptions` and `domainIcons` entries.
3. Add the script to `ASSETS` in `sw.js` and bump the cache name so existing clients get the update.
4. Update this inventory and [the answer-key audit](./ANSWER-KEY-AUDIT.md). Validate every answer index, selection count, matching row, rationale, clue, tip, question total, and UI flow before publishing.

Question records contain the prompt and options, correct answer index or indexes, and an `explanation` object. That object supplies the correct rationale, distractor rationales, decisive clue, exam tip, and takeaway. The aim is to teach how to choose an answer, beyond marking it right or wrong.

## Scoring and content notes

The **72% threshold is a practice setting**, not an estimate of AWS's scaled certification score or a guarantee of passing. AWS uses its own scoring methodology; consult the [official certification page](https://aws.amazon.com/certification/certified-ai-practitioner/) and exam guide for current details.

This independent study project is not affiliated with, endorsed by, or sponsored by AWS. The questions are practice material and are **not claimed to be actual AWS certification questions**. AWS services and exam objectives change; use current official documentation to verify important details. [ANSWER-KEY-AUDIT.md](./ANSWER-KEY-AUDIT.md) records the original audit, later validation, wording corrections, and source notes.

## Deployment

The site is served from the repository's `main` branch via GitHub Pages: [shinynaps.github.io/aif-c01-exam-reviewer](https://shinynaps.github.io/aif-c01-exam-reviewer/). After updates are pushed, GitHub Pages may take time to publish and existing PWA clients may need a reload to activate the new cache.
