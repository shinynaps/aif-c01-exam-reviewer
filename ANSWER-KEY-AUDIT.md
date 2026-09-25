# AIF-C01 Answer-Key Audit

**Audit date:** 2026-09-25  
**Exam guide baseline:** AWS Certified AI Practitioner (AIF-C01), Exam Guide version 1.1 (published 2026-04-30)

## Scope

This audit covers every question currently shipped by the reviewer:

| Question set | Questions |
|---|---:|
| Domain 1 practice | 25 |
| Domain 2 practice | 25 |
| Domain 3 practice | 25 |
| Domain 4 practice | 25 |
| Domain 5 practice | 25 |
| Mock Exam 1 | 65 |
| Mock Exam 2 | 65 |
| **Total** | **255** |

The audit checked:

- keyed answers against the current AIF-C01 objectives
- AWS service behavior against current official AWS documentation where service behavior is material
- single-answer vs multi-select behavior
- matching/hotspot answer mappings
- explanation completeness
- third-party imported questions for ambiguous, obsolete, or misleading wording
- current exam format and scoring assumptions

## Current AWS exam baseline

AWS currently lists AIF-C01 as a 65-question, 90-minute foundational exam. The current exam guide states that 50 questions affect the score and 15 are unscored. Results use a scaled score of 100–1,000, with 700 as the minimum passing score.

The reviewer therefore uses its percentage threshold only as a **practice threshold**. It is not intended to reproduce AWS's scaled-score calculation.

Official references:

- Exam overview: https://aws.amazon.com/certification/certified-ai-practitioner/
- Current exam guide: https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html
- Exam guide revisions: https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-revisions.html

## Audit result

All 255 questions pass structural validation after the audit.

- 255 question records load successfully.
- 11 multiple-response questions enforce the correct number of selections.
- 9 matching/hotspot questions have valid complete answer mappings.
- Every question has an answer explanation, decisive clue, and exam tip.
- No answer-key corrections were required in the 125 domain-practice questions.
- Imported mock questions were reviewed individually and ambiguous source items were corrected as described below.

## Corrections made

### Mock Exam 1

**Question 8 — text completion vs broader text generation**

The source wording made both "text generation" and "text completion" defensible. The audited wording now explicitly describes continuing an input prefix, making **text completion** the single best answer.

**Question 11 — prompt specificity**

Two source choices described reasonable forms of specific prompting. The distractors were tightened so the keyed answer uniquely reflects the AWS prompt-engineering best practices of specificity, relevant context, and explicit output constraints.

**Question 38 — voice assistant**

The original source asked for both spoken input and spoken output but keyed only a generic speech-recognition choice. The audited version now uses:

- Amazon Transcribe for speech-to-text
- Amazon Polly for text-to-speech

**Question 45 — hallucination/inference parameter**

The keyed answer remains **lower temperature** because the question now explicitly asks for an inference-parameter mitigation. The explanation also distinguishes this from **RAG**, which is generally the stronger answer when the requirement is factual grounding against trusted or current data.

**Question 61 — model-output explainability**

The source offered SageMaker Model Cards for a requirement to explain individual model outputs. That is not the direct AWS feature for this requirement. The audited version now uses **Amazon SageMaker Clarify**, which provides feature attribution and explanation capabilities such as SHAP.

Official reference:
https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-explainability.html

**Question 62 — Amazon Translate**

The source wording said the company wanted to *create* product descriptions in multiple languages while keying Amazon Translate. The audited wording now explicitly states that descriptions already exist and need to be **translated**, making Amazon Translate the unambiguous answer.

**Question 64 — SageMaker Model Cards**

The source phrase "ML instance data" was misleading. It has been corrected to **ML model details for governance and reporting**.

### Mock Exam 2

**Question 1 — medical NLP wording**

The source referred to "structured patient records" while keying Amazon Comprehend Medical, which is a clinical-text NLP service. The audited wording now specifies patient records containing clinical text.

**Question 2 — embeddings**

The source described embeddings as a representation in a "reduced dimensionality space." That wording is misleading because embeddings are often high-dimensional. The audited choice now states that embeddings are **numerical vector representations that capture semantic relationships**.

**Question 10 — prompt-engineering security risk**

The source mixed a prompt-specific security risk with broader model limitations, leaving more than one defensible statement. The audited version now explicitly asks for a **security risk introduced through the prompt interface**, making **prompt injection** unambiguous.

**Question 30 — federated learning wording**

The source said federated learning "ensures" compliance and privacy. That is too absolute. The audited wording now asks which technique **helps preserve privacy by avoiding centralization of raw training data**, which accurately describes federated learning.

**Question 31 — continued pre-training hotspot**

The "specific documents" row was clarified to state that the company uses additional **unlabeled domain documents as training data**, avoiding confusion with RAG.

**Question 43 — summarization metric**

The original third-party question asked for a summarization metric but omitted ROUGE and keyed BLEU. That teaches a poor exam heuristic. The audited version now asks about reference-overlap evaluation for summaries and uses **ROUGE**.

Important distinction for study:

- **ROUGE** → summarization/reference overlap
- **BLEU** → most strongly associated with machine translation
- **BERTScore** → semantic similarity using contextual embeddings
- Amazon Bedrock's built-in text-summarization **Accuracy** evaluation currently computes **BERTScore**

Official Bedrock reference:
https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-tasks-text-summary.html

**Question 41 — AWS Artifact wording**

The source asked about a company "generating reports to show adherence," which could imply AWS Audit Manager. Because the offered answer is AWS Artifact, the audited wording now correctly asks for **AWS compliance reports and certifications**.

**Question 49 — discriminatory/hateful content**

The source used vague "predefined topics" wording, which implies denied topics. Discriminatory/hateful content maps directly to the **Hate** category in Amazon Bedrock Guardrails content filters. The audited version now names the correct control.

Official reference:
https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-content-filters.html

## High-value distinctions confirmed during the audit

- labeled data + category → supervised classification
- labeled data + numeric target → regression
- unlabeled grouping → clustering / unsupervised learning
- frequently changing or private factual data → RAG
- persistent style/format/task behavior from labeled examples → fine-tuning
- unlabeled domain corpus → continued pre-training
- semantic similarity → embeddings
- summarization overlap → ROUGE
- translation overlap → BLEU
- semantic generated/reference similarity → BERTScore
- false positives are costly → precision
- false negatives are costly → recall
- bias/explainability → SageMaker Clarify
- production drift → SageMaker Model Monitor
- human review → Amazon Augmented AI (A2I)
- harmful content / denied topics / PII controls → Amazon Bedrock Guardrails
- permissions / least privilege → IAM
- encryption keys → AWS KMS
- sensitive-data discovery in S3 → Amazon Macie
- AWS API activity auditing → AWS CloudTrail
- configuration compliance → AWS Config
- AWS compliance reports → AWS Artifact
- audit-evidence automation → AWS Audit Manager

## Current-guide coverage

The reviewer was checked against the current v1.1 guide rather than an older AIF-C01 outline. The present guide includes newer topics represented in the reviewer, including agentic AI, asynchronous/serverless inference, Amazon Quick, Kiro, Strands Agents, Amazon Bedrock AgentCore, model distillation, and Amazon Bedrock Prompt Management.

Official revisions:
https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-revisions.html

## Third-party question note

Mock Exam 1 and Mock Exam 2 contain questions imported from a third-party source supplied by the reviewer owner. They are **not presented as official AWS certification questions**. Where the source wording or answer set conflicted with current AWS terminology or could teach an incorrect exam rule, the reviewer was normalized to the current official AWS documentation instead of preserving the defect verbatim.
