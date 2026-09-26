(() => {
  window.aifExamData = window.aifExamData || {};
  const guide = 'https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html';
  const letters = i => String.fromCharCode(65 + i);
  function question([q, opts, ans, why, clue, tip, wrong, domain, reference = guide]) {
    const incorrectReasons = {};
    opts.forEach((_, i) => { if (!ans.includes(i)) incorrectReasons[i] = wrong[i]; });
    return {
      q, opts, ans, selectCount: ans.length, why,
      explanation: {
        correctAnswer: ans.map(i => `${letters(i)}. ${opts[i]}`).join(' / '),
        correctReason: why, incorrectReasons, examClue: clue, examTip: tip,
        transferCheck: '', rememberThis: tip,
        takeaway: { signal: clue, think: tip, contrast: '' }
      },
      status: 'user-supplied practice question, reviewed and adapted',
      task: `Domain ${domain}`, taskName: 'AIF-C01 mixed-domain practice',
      source: 'User-provided ExamPrepper practice set, adapted; not an AWS certification question',
      reference
    };
  }
  function matching({q, rows, choices, ans, why, clue, tip, domain, reference = guide}) {
    return {
      type: 'matching', q, rows, choices, ans, why,
      explanation: {
        correctAnswer: rows.map((r, i) => `${r} → ${choices[ans[i]]}`).join(' | '),
        correctReason: why, incorrectReasons: {}, examClue: clue, examTip: tip,
        transferCheck: '', rememberThis: tip,
        takeaway: { signal: clue, think: tip, contrast: '' }
      },
      status: 'user-supplied hotspot, reviewed and adapted',
      task: `Domain ${domain}`, taskName: 'AIF-C01 mixed-domain practice',
      source: 'User-provided ExamPrepper practice set, adapted; not an AWS certification question',
      reference
    };
  }
  // Source questions 131–195 are displayed as questions 1–65 in this exam.
  const raw = [
    // 1 — source 131
    ['A company wants an LLM to generate product descriptions. It supplies several example descriptions in the desired format. Which prompt engineering technique should it use?',
      ['Zero-shot prompting','Chain-of-thought prompting','One-shot prompting','Few-shot prompting'],[3],
      'Few-shot prompting includes multiple input/output examples in the prompt so the model can infer the desired description structure. This guides the current response without updating model weights.',
      'several example descriptions in the desired format','Multiple examples → few-shot; exactly one → one-shot.',
      ['Zero-shot supplies instructions without examples.','Chain-of-thought elicits intermediate reasoning, not primarily a format learned from examples.','One-shot uses a single example.'],3],
    // 2 — source 132; narrowed to training-data exposure
    ['A bank is fine-tuning an LLM on Amazon Bedrock to answer loan questions. It must prevent the model from learning private customer identifiers from the fine-tuning dataset. Which action best meets this training-data requirement?',
      ['Use Amazon Bedrock Guardrails only after training.','Remove personally identifiable information (PII) from customer records before fine-tuning.','Increase the model Top K parameter.','Encrypt customer data in Amazon S3 before fine-tuning.'],[1],
      'Removing PII before fine-tuning minimizes exposure in the training data and prevents the model from learning those identifiers. Runtime sensitive-information filters are useful defense in depth, but cannot undo private data already learned.',
      'prevent learning identifiers from the fine-tuning dataset','Data minimization before training prevents memorization; output filters protect responses.',
      ['Guardrails can filter PII at runtime, but do not remove PII from training examples.','', 'Top K changes token sampling, not privacy of training data.','Encryption protects stored data but the model still sees plaintext during training.'],5,
      'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html'],
    // 3 — source 133
    ['A grocery store chatbot must check live inventory and then give customers the current aisle location. Which prompting pattern combines reasoning with an external lookup action?',
      ['Zero-shot prompting','Few-shot prompting','Least-to-most prompting','Reasoning and acting (ReAct) prompting'],[3],
      'ReAct interleaves reasoning with actions such as querying an inventory tool and then uses the returned observation to answer. The external lookup supplies the current facts.',
      'check live inventory and use the result','Live external facts → tool action; ReAct connects reasoning, action, and observation.',
      ['Zero-shot means no demonstrations; it does not itself provide an inventory lookup.','Few-shot examples teach a pattern but cannot retrieve current stock.','Least-to-most breaks a complex problem into simpler subproblems, not necessarily tool calls.'],3],
    // 4 — source 134
    ['A company uses a third-party foundation model through Amazon Bedrock to analyze confidential documents. How does Bedrock handle the company’s inputs and outputs with respect to the third-party model provider?',
      ['They are anonymized and shared with the provider.','They are not shared with the third-party model provider.','Only outputs are shared with the provider.','They are redacted and then shared with the provider.'],[1],
      'Bedrock processes customer prompts and responses within the AWS boundary and does not share them with the third-party model provider. This is distinct from the company’s own duty to manage access and retention.',
      'third-party model provider + confidential input/output','Bedrock customer content is not shared with model providers.',
      ['Anonymization is not a prerequisite to provider sharing because sharing does not occur.','', 'Outputs are not sent to the provider.','Bedrock does not rely on redacting content before sharing it with the provider.'],5,
      'https://docs.aws.amazon.com/bedrock/latest/userguide/data-retention.html'],
    // 5 — source 135
    ['Which use case is an example of generative AI?',
      ['Detecting network intrusions','Creating photorealistic marketing images from text descriptions','Optimizing database indexes','Forecasting stock prices from historical data'],[1],
      'A text-to-image model creates new visual content from a description, which is generative AI. The other choices analyze, optimize, or predict existing signals.',
      'create new images from text','Generative AI creates new text, images, audio, video, or code.',
      ['Intrusion detection identifies suspicious patterns.','', 'Index tuning is a database optimization task.','Forecasting predicts future numerical values.'],2],
    // 6 — source 136
    ['An animation company needs subtitles for spoken dialogue in its videos. Which AWS service transcribes the speech into text?',
      ['Amazon Comprehend','Amazon Polly','Amazon Transcribe','Amazon Translate'],[2],
      'Amazon Transcribe converts spoken audio to written text, which can be timed and formatted as captions or subtitles. Translating those captions into another language would be a separate step.',
      'spoken dialogue → written subtitles','Transcribe = speech to text; Polly = text to speech; Translate = language to language.',
      ['Comprehend extracts insights from text.','Polly produces speech from text.','', 'Translate changes the language of text rather than transcribing speech.'],1],
    // 7 — source 137
    ['An ecommerce company wants to group customers with similar purchasing histories and preferences without predefined segment labels. Which ML technique should it use?',
      ['Classification','Clustering','Regression','Content generation'],[1],
      'Clustering is unsupervised learning that groups similar records, such as customers with similar buying behavior, when no category labels were supplied.',
      'group similar customers + no predefined labels','Unlabeled groups → clustering; known categories → classification.',
      ['Classification predicts predefined categories using labeled examples.','', 'Regression predicts a continuous numerical target.','Content generation creates new material rather than segmenting customers.'],1],
    // 8 — source 138
    ['A company wants administrators to control which publicly available foundation models employees can discover and use through Amazon SageMaker JumpStart. Which solution meets this requirement?',
      ['Analyze usage in AWS Cost Explorer.','Download reports from AWS Artifact.','Configure a private curated model hub in SageMaker JumpStart.','Build hybrid search with Amazon OpenSearch Service.'],[2],
      'A private curated JumpStart hub gives administrators a selected set of models for users to browse and deploy, with access controls. It directly addresses model discoverability and availability.',
      'control discoverable JumpStart foundation models','JumpStart private curated hubs allow approved model catalogs.',
      ['Cost Explorer reports expenditure, not model access.','Artifact supplies compliance documentation.','', 'OpenSearch performs search and indexing, not FM catalog governance.'],5,
      'https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-curated-hubs.html'],
    // 9 — source 139
    ['A company compares machine translations with human reference translations for the same documents. It wants a metric for relative performance against those references. Which approach is appropriate?',
      ['Use BLEU as a measure of absolute translation quality.','Use BLEU to compare relative translation quality.','Use BERTScore as a measure of absolute translation quality.','Use BERTScore to certify absolute translation quality.'],[1],
      'BLEU compares n-gram overlap between candidate translations and human references. Its scores are most useful for relative comparisons on a consistent dataset and setup; they do not establish absolute human-perceived quality.',
      'machine translation + human references + relative comparison','BLEU is a classic reference-based translation comparison, not a universal quality guarantee.',
      ['BLEU does not provide an absolute quality judgment.','', 'BERTScore measures embedding-based semantic similarity but is not the requested classic translation overlap comparison.','Neither BERTScore nor any single metric certifies absolute translation quality.'],3],
    // 10 — source 140
    ['An AI practitioner wants more diverse and creative LLM outputs. Which inference setting should the practitioner change?',
      ['Increase temperature.','Decrease Top K.','Increase maximum response length.','Decrease prompt length.'],[0],
      'A higher temperature flattens the token probability distribution and makes less likely choices more probable, increasing randomness and diversity. It can also reduce consistency.',
      'more diverse and creative output','Higher temperature → more sampling variety; lower → more predictable.',
      ['', 'Lower Top K narrows the candidate tokens and usually reduces diversity.','Longer output permits more tokens but does not directly increase sampling creativity.','Shorter input does not set randomness.'],3],
    // 11 — source 141
    ['A company needs a user-friendly interface for humans to label images used to train its custom computer vision models. Which AWS service fits?',
      ['Amazon SageMaker Ground Truth','Amazon SageMaker Canvas','Amazon Bedrock playground','Amazon Bedrock Agents'],[0],
      'SageMaker Ground Truth manages labeling jobs and human annotations for training datasets, including images. Better labels can improve model training and evaluation.',
      'human labeling of training images','Ground Truth = data labels; Canvas = no-code model building.',
      ['', 'Canvas focuses on no-code ML development and prediction, not managed annotation jobs.','The playground experiments with foundation-model prompts.','Agents orchestrate model steps and actions, not labeling workforces.'],1],
    // 12 — source 142
    ['A company uses AI in recruitment and wants to reduce discriminatory outcomes and explain hiring decisions. Which responsible-AI dimensions are most relevant? (Choose two.)',
      ['Fairness','Tolerance','Flexibility','Open source','Transparency'],[0,4],
      'Fairness addresses inequitable outcomes across groups. Transparency makes the model’s use and decision process understandable to stakeholders; explainability is related but is not an offered choice.',
      'equitable hiring + explain decisions','Fairness = equitable outcomes; transparency = understandable process and disclosure.',
      ['', 'Tolerance is not the targeted responsible-AI dimension.','Flexibility describes adaptability, not equitable hiring or disclosure.','Open-source status alone does not assure fairness or transparency.',''],4],
    // 13 — source 143
    ['A deployed model predicts whether each customer will churn. The company has actual churn labels and wants one metric that balances precision and recall for this classification task. Which metric fits?',
      ['Root mean squared error (RMSE)','Return on investment (ROI)','F1 score','BLEU score'],[2],
      'F1 is the harmonic mean of precision and recall, appropriate for a binary classification outcome when both missed churners and false alerts matter. Compare predictions with actual churn labels.',
      'classification + balance precision and recall','F1 balances precision and recall; RMSE measures numeric prediction error.',
      ['RMSE measures errors for continuous numeric predictions.','ROI is a business financial measure, not classification accuracy.','', 'BLEU compares candidate text with reference text, commonly translation.'],1],
    // 14 — source 144
    ['A company’s Bedrock FM must answer using additional, frequently updated company information. Which option avoids retraining and is the most appropriate of those listed?',
      ['Use Amazon Bedrock Knowledge Bases.','Choose another general-purpose FM.','Use Amazon Bedrock Agents alone.','Train and deploy a custom model.'],[0],
      'Knowledge Bases for Bedrock retrieves relevant company content at request time and supplies it as context for grounded generation. It avoids repeatedly retraining on changing facts.',
      'company information + current context + no retraining','Changing private knowledge → RAG/Knowledge Bases.',
      ['', 'A different base model still lacks the private company data.','Agents can orchestrate actions, but an agent alone does not provide the document retrieval store.','Custom training is more operationally involved for changing factual context.'],3],
    // 15 — source 145 (attached hotspot image)
    { q: 'Match each SageMaker AI lifecycle task to the most suitable feature. Use each feature once or not at all.',
      rows: ['Managing different versions of the model','Using the current model to make predictions'],
      choices: ['SageMaker Clarify','SageMaker Model Registry','SageMaker Serverless Inference'], ans: [1,2],
      why: 'Model Registry stores and tracks registered model versions. Serverless Inference hosts a deployed model to serve predictions without managing instances. Clarify concerns bias and explainability for existing customers.',
      clue: 'versions → registry; predictions → inference', tip: 'Registry versions models; an inference endpoint serves predictions.', domain: 3,
      reference: 'https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html' },
    // 16 — source 146
    ['A company selecting a Bedrock foundation model needs to know how much information can fit in one request. Which model characteristic matters?',
      ['Temperature','Context window','Batch size','Model size'],[1],
      'The context window limits how many input and generated tokens a model can handle in a request, subject to the model’s specific limits. Check prompt, retrieved context, and expected output together.',
      'how much information fits in one prompt','Context window = token capacity available for the conversation/request.',
      ['Temperature affects randomness.','', 'Batch size is a training or processing configuration, not prompt capacity.','Parameter count does not directly specify the token context limit.'],2],
    // 17 — source 147
    ['A food company wants its preference dataset to represent customers across all demographic groups. Which data characteristic is it emphasizing?',
      ['Accuracy','Diversity','Recency bias','Reliability'],[1],
      'Diversity means the dataset includes varied population groups and experiences, helping avoid a model that reflects only a narrow subset of customers.',
      'all demographics represented','Representative coverage across groups → data diversity.',
      ['Accuracy concerns whether recorded values are correct.','', 'Recency bias overweights recent observations and is not a desired characteristic here.','Reliability concerns consistency and dependability, not breadth of representation.'],4],
    // 18 — source 148
    ['An HR chatbot must answer from a large collection of company policy documents. Which technique best grounds its responses in those documents?',
      ['Retrieval Augmented Generation (RAG)','Few-shot prompting','Set temperature to 1','Decrease token size'],[0],
      'RAG retrieves relevant policy passages and gives them to the LLM as context when it answers. It supports current, proprietary documents without training the model on each update.',
      'large private policy documentation base','Private/current document answers → retrieve relevant passages with RAG.',
      ['', 'Few-shot examples teach response style or task patterns but do not search the policy corpus.','High temperature increases randomness rather than factual grounding.','Reducing tokens may omit essential policy context.'],3],
    // 19 — source 149; clarified semantic evaluation
    ['A chatbot writes in teenagers’ informal style, including creative spelling and abbreviations. The evaluator wants to compare response meaning with reference responses despite wording differences. Which metric is most appropriate?',
      ['F1 score','BERTScore','ROUGE','BLEU score'],[1],
      'BERTScore compares contextual embedding representations of candidate and reference text, making it more tolerant of lexical variation than strict n-gram overlap. It measures semantic similarity, not whether the style itself appeals to teenagers.',
      'compare meaning despite different wording','BERTScore → semantic similarity; BLEU/ROUGE → surface overlap.',
      ['F1 alone normally evaluates classification precision and recall, not semantic closeness of generated sentences.','', 'ROUGE emphasizes lexical overlap, often for summarization, and may penalize creative variants.','BLEU emphasizes n-gram overlap, commonly for translation, and can penalize creative variants.'],3],
    // 20 — source 150
    ['An application analyzes written customer feedback and categorizes it as product quality, customer service, or delivery. Which AI field does this use?',
      ['Computer vision','Natural language processing (NLP)','Recommendation systems','Fraud detection'],[1],
      'NLP processes human language. Classifying written reviews into categories is a text-classification application of NLP.',
      'classify written feedback','Text meaning and categories → NLP.',
      ['Computer vision works with image/video content.','', 'Recommendation systems suggest relevant items.','Fraud detection flags suspicious activity rather than classifying review topics.'],1],
    // 21 — source 151
    ['A customer-support chatbot uses an FM and must respond in the company’s tone. Which approach best guides that tone at inference time?',
      ['Limit the output to very few tokens.','Use batch inference for detailed responses.','Iteratively refine the prompt with tone instructions and examples.','Raise the temperature.'],[2],
      'Explicit tone instructions and representative examples in a refined prompt guide the FM’s response style. Test the resulting prompts against varied support cases.',
      'adhere to company tone at inference time','Style requirement → clear prompt instructions and examples.',
      ['A token cap controls length, not brand voice.','Batch inference changes processing mode, not style.','', 'Higher temperature increases variation and may weaken tone consistency.'],3],
    // 22 — source 152
    ['A company wants an LLM to classify sentiment as positive or negative. Which prompt is most suitable?',
      ['Show labeled positive and negative examples, then the new passage to classify.','Explain in detail how sentiment analysis and LLMs work.','Give only the passage, without a label instruction.','Give examples of unrelated summarization and question-answering tasks.'],[0],
      'Labeled examples demonstrate the desired two-class mapping and output format before the new text. This is few-shot prompting applied to a classification task.',
      'labeled examples + new passage','Few-shot classification = example input/label pairs followed by the new input.',
      ['', 'A theoretical description does not demonstrate the required label mapping as directly.','A bare passage gives no clear classification instruction.','Unrelated examples do not teach the positive/negative task.'],3],
    // 23 — source 153
    ['A security team needs to investigate who attempted Amazon Bedrock API operations, including denied calls, so it can adjust IAM policies. Which service provides the API activity record?',
      ['AWS Audit Manager','AWS CloudTrail','Amazon Fraud Detector','AWS Trusted Advisor'],[1],
      'CloudTrail records AWS API activity, including the calling principal, action, time, and error for recorded events. Analyze the relevant Bedrock events and denial details to investigate access attempts.',
      'who called an AWS API + access denied','CloudTrail = AWS API history; IAM = access policy.',
      ['Audit Manager collects and organizes audit evidence, not the primary API call history.','', 'Fraud Detector assesses fraud risk, not Bedrock API principals.','Trusted Advisor recommends account improvements, not detailed API activity.'],5,
      'https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html'],
    // 24 — source 154
    ['A web application needs to invoke an image-classification model without its team managing inference servers. Which hosting option fits?',
      ['Amazon SageMaker Serverless Inference','Amazon CloudFront','Amazon API Gateway alone','AWS Batch'],[0],
      'SageMaker Serverless Inference hosts a model endpoint and scales compute for on-demand predictions while abstracting infrastructure management. Suitability still depends on payload size and latency requirements.',
      'host model + predictions + no managed servers','Serverless Inference = managed endpoint without provisioning instances.',
      ['', 'CloudFront is a content-delivery network, not a model host.','API Gateway can front a model endpoint but does not host the model itself.','AWS Batch runs jobs and is not an interactive model-serving endpoint.'],3],
    // 25 — source 155
    ['A company needs email notices when new independent software vendor (ISV) compliance reports appear in its AWS Artifact report catalog. Which AWS service should it configure?',
      ['AWS Audit Manager','AWS Artifact','AWS Trusted Advisor','AWS Data Exchange'],[1],
      'AWS Artifact gives access to AWS and eligible third-party compliance reports. Artifact notification settings, delivered through AWS User Notifications, can send email about report updates.',
      'ISV compliance reports + email updates','Artifact = compliance reports; configure Artifact notifications for changes.',
      ['Audit Manager automates audit evidence collection.','', 'Trusted Advisor checks infrastructure best practices.','Data Exchange distributes third-party datasets rather than these compliance reports.'],5,
      'https://docs.aws.amazon.com/artifact/latest/ug/managing-notifications.html'],
    // 26 — source 156; replaces insufficient template option
    ['A company uses an LLM in a conversational agent and wants to detect and block prompt-injection attempts that try to override instructions or reveal secrets. Which action most directly reduces this risk?',
      ['Configure the prompt-attack filter in Amazon Bedrock Guardrails for user input.','Increase temperature for invocation requests.','Only use models listed in SageMaker.','Reduce the maximum number of input tokens.'],[0],
      'The Bedrock Guardrails prompt-attack filter is designed to detect malicious instructions such as prompt injection and jailbreak attempts. It is a safeguard, not a guarantee; retain IAM, tool authorization, and application checks.',
      'prompt injection trying to override developer instructions','Prompt attack → guardrail filter and least-privilege tool access.',
      ['', 'Temperature changes sampling randomness rather than filtering attacks.','Catalog membership does not establish prompt-injection resistance.','Shorter inputs can still contain attacks and may discard useful context.'],5,
      'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html'],
    // 27 — source 157
    ['A company must categorize gene records into 20 groups and explain how input attributes lead to each category. Which algorithm is the most interpretable of the options?',
      ['Decision trees','Linear regression','Logistic regression','Neural networks'],[0],
      'A decision tree follows explicit feature-based splits to a class, so its path can be inspected for a particular prediction. A shallow tree is especially interpretable; a very large tree can still be hard to explain.',
      '20 categories + inspect decision path','Explainable classification path → decision tree.',
      ['', 'Linear regression predicts a continuous value rather than a class.','Logistic regression can classify and be interpretable, but a standard setup and coefficients are less direct than a tree path for the stated 20-category rule trace.','Neural networks can classify but their internal decision process is usually less transparent.'],1],
    // 28 — source 158
    ['In the Generative AI Security Scoping Matrix, which approach gives a company the most ownership of security responsibilities?',
      ['Use a third-party enterprise application with embedded GenAI.','Build an app on a third-party FM.','Fine-tune a third-party FM on business data.','Build and train a GenAI model from scratch on company-owned data.'],[3],
      'Training a model from scratch requires the company to control the largest portion of the model, data, training, deployment, and operational security stack. Greater control entails greater responsibility.',
      'most ownership of model and training stack','Build from scratch → broadest security responsibility.',
      ['A packaged SaaS GenAI feature leaves more underlying controls with its provider.','A third-party FM provider remains responsible for substantial model infrastructure.','Fine-tuning adds data and customization duties, but the base model/provider still owns part of the stack.'],5],
    // 29 — source 159; clarified visual localization
    ['A photo system needs to find and label each animal visible in an image, including where it appears. Which computer vision task fits?',
      ['Object detection','Anomaly detection','Named entity recognition','Inpainting'],[0],
      'Object detection locates objects in an image and assigns category labels, often with bounding boxes. If only a single whole-image label were required, image classification could suffice, but it is not offered.',
      'find and label each animal + location','Object detection = what objects and where.',
      ['', 'Anomaly detection identifies unusual observations.','Named entity recognition extracts entities from text.','Inpainting fills or repairs missing image regions.'],1],
    // 30 — source 160
    ['A team is prototyping with Amazon Bedrock on a limited budget and wants usage-based pricing without a long-term capacity commitment. Which model is appropriate?',
      ['On-Demand','Model customization','Provisioned Throughput','Spot Instance'],[0],
      'Bedrock On-Demand inference charges for actual usage under the applicable model pricing, avoiding a dedicated capacity commitment. Confirm that the selected model supports the chosen inference mode.',
      'pay for use + no capacity commitment','On-Demand = flexible usage; Provisioned Throughput = reserved capacity.',
      ['', 'Customization is a model adaptation capability, not the requested flexible inference pricing choice.','Provisioned Throughput reserves capacity and has a different cost profile.','EC2 Spot is not an Amazon Bedrock inference pricing mode.'],3],
    // 31 — source 161
    ['An AI team wants a catalog of pretrained foundation models it can quickly deploy to a SageMaker endpoint in its AWS environment. Which feature helps?',
      ['Amazon Personalize','Amazon SageMaker JumpStart','PartyRock','Amazon SageMaker endpoints alone'],[1],
      'SageMaker JumpStart supplies discoverable pretrained models and deployment workflows. The resulting SageMaker endpoint can be configured for private networking as appropriate.',
      'discover and deploy pretrained FMs in SageMaker','JumpStart = model catalog and quick start; endpoint = deployed serving resource.',
      ['Personalize provides recommendation capabilities.','', 'PartyRock is a Bedrock-based experimentation tool, not a VPC deployment catalog.','An endpoint hosts a model but does not itself supply a pretrained model catalog.'],3],
    // 32 — source 162
    ['Which combination improves security when a company uses an LLM through Amazon Bedrock?',
      ['Write clear prompts and apply least-privilege IAM roles and policies.','Enable AWS Audit Manager to run model evaluations automatically.','Enable model evaluation jobs as the sole security measure.','Use CloudWatch Logs to make the model explainable and detect bias automatically.'],[0],
      'Least-privilege IAM restricts who can invoke models and access data; clear instructions can reduce unintended behavior. Also consider guardrails, data controls, and logging for a complete design.',
      'secure model use + permissions','IAM controls access; clear prompts shape behavior; neither replaces guardrails.',
      ['', 'Audit Manager collects audit evidence and does not automatically evaluate model quality.','Evaluation measures performance, not authorization or all runtime security controls.','CloudWatch Logs records/observes events; logs alone do not produce model explainability or fairness analysis.'],5],
    // 33 — source 163
    ['Employees type plain-English questions and need an AI application to generate SQL queries for business analysis. Which model family is most suited to text-to-SQL generation?',
      ['Generative pre-trained transformers (GPT)','Residual neural network','Support vector machine','WaveNet'],[0],
      'A language model based on transformer architectures can generate SQL from natural-language intent when prompted with the database schema and constrained and validated by the application. Query permissions and validation remain essential.',
      'natural-language input → generated SQL','Text-to-SQL is language generation, suited to a transformer LLM.',
      ['', 'Residual networks are commonly associated with visual feature extraction.','SVMs are traditional supervised classifiers/regressors, not natural-language code generators.','WaveNet is associated with audio generation, not SQL queries.'],2],
    // 34 — source 164
    ['A deployed object-detection model analyzes a new image and identifies objects. What is this process called?',
      ['Training','Inference','Model deployment','Bias correction'],[1],
      'Inference applies a trained model to a new input and produces a prediction. Training is the earlier process that adjusts model parameters.',
      'new image → prediction from existing model','Training learns; inference predicts.',
      ['Training changes model weights from examples.','', 'Deployment makes the trained model available to serve requests.','Bias correction is an assessment or mitigation activity.'],1],
    // 35 — source 165
    ['A model generating portraits by profession underrepresents certain demographic/profession combinations in its training images. Which action directly addresses that imbalance?',
      ['Augment or rebalance underrepresented training examples.','Only monitor class distributions after deployment.','Add Retrieval Augmented Generation (RAG).','Detect image watermarks.'],[0],
      'Carefully collecting, augmenting, and balancing examples of underrepresented combinations can improve representation during training. Evaluate generated outputs for residual bias afterward; augmentation alone is not a guarantee.',
      'underrepresented groups in training data','Training-data imbalance → improve representation, then evaluate fairness.',
      ['', 'Monitoring can reveal a disparity but does not itself fix the training data.','RAG supplies retrieved context and is not the primary fix for image-data demographic imbalance.','Watermark detection addresses image provenance, not representation.'],4],
    // 36 — source 166
    ['A company uses an Amazon Titan model through Bedrock and needs answers grounded in its private information. Which feature should it set up?',
      ['Switch to a different base FM.','Lower temperature.','Create a Bedrock knowledge base.','Enable model invocation logging.'],[2],
      'A Bedrock knowledge base retrieves relevant private source material and provides context to the model at query time. This is a managed RAG pattern.',
      'private source data + grounded answers','Knowledge Bases = retrieve private context for Bedrock models.',
      ['Another base model still lacks the private data.','Lower temperature affects randomness but does not supply private facts.','', 'Invocation logging records inputs and outputs rather than retrieving source information.'],3],
    // 37 — source 167; existing Clarify users
    ['A medical organization already uses SageMaker Clarify for its existing ML workflow. It needs feature-attribution reports to help explain model predictions. Which offered capability fits?',
      ['Amazon Inspector vulnerability scans','SageMaker Clarify explainability reports','Amazon Macie encryption of training data','Amazon Rekognition Custom Labels'],[1],
      'For existing customers, SageMaker Clarify can compute feature attribution and explainability reports. AWS now says Clarify is closed to new customers; new projects should consult its documented replacement guidance, including SHAP-based approaches.',
      'existing Clarify workflow + explain model predictions','Clarify historically = bias/explainability; verify current availability for new projects.',
      ['Inspector scans workloads for vulnerabilities, not model explanations.','', 'Macie discovers sensitive data in S3; it is not a training-data encryption service.','Rekognition Custom Labels builds custom image-recognition models, not explanations of another model.'],4,
      'https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-availability-change.html'],
    // 38 — source 168
    ['A plant-disease image classifier has ground-truth labels. The company wants the fraction of images it classified correctly. Which metric should it calculate?',
      ['R-squared','Accuracy','Root mean squared error (RMSE)','Learning rate'],[1],
      'Accuracy is the number of correct classifications divided by all evaluated classifications. For imbalanced classes, also examine per-class precision and recall.',
      'fraction of correctly classified images','Correct classifications / total → accuracy.',
      ['R-squared assesses regression fit.','', 'RMSE measures numeric prediction error.','Learning rate is a training hyperparameter, not an evaluation metric.'],1],
    // 39 — source 169; clarified control areas
    ['A company uses a fine-tuned JumpStart model for a regulated chatbot. Which two security and compliance control areas should it document? (Choose two.)',
      ['Auto scaling of inference endpoints','Threat detection','Data protection','Cost optimization','Loosely coupled microservices'],[1,2],
      'Threat detection helps identify malicious activity; data protection covers access, encryption, and handling of sensitive information. These are control areas relevant to demonstrating compliance, though the required evidence depends on the applicable framework.',
      'regulated chatbot + security/compliance control areas','Compliance evidence often covers threats and protection of data.',
      ['Auto scaling is an availability/performance capability, not directly the requested control area.','','','Cost optimization is financial efficiency rather than these security controls.','Microservice coupling is an architecture concern, not direct compliance evidence.'],5],
    // 40 — source 170; avoids a false guarantee
    ['During FM training, validation performance indicates underfitting and the loss is still improving at the end of the planned training run. Which change could help the model reach a target quality level while it monitors validation results?',
      ['Decrease batch size as a guaranteed fix.','Increase the number of training epochs.','Decrease the number of training epochs.','Increase inference temperature.'],[1],
      'More epochs give an undertrained model additional passes over the dataset and may improve performance while validation quality continues to rise. Stop or regularize if validation quality worsens; more epochs never guarantee accuracy.',
      'underfitting + validation still improving at final epoch','More epochs can help undertraining; watch for overfitting.',
      ['Batch-size changes affect optimization but do not guarantee target quality.','', 'Fewer epochs would cut short an already undertrained run.','Temperature changes inference sampling, not learned weights or validation accuracy.'],3],
    // 41 — source 171
    ['An LLM assistant aims to reduce the work call-center agents perform while answering customers. Which listed business measure is closest to that operational objective?',
      ['Website engagement rate','Average call duration','Corporate social responsibility','Regulatory compliance'],[1],
      'Average call duration can indicate whether agents resolve interactions more efficiently. Measure quality and customer outcomes alongside duration, because shorter calls alone do not prove better service.',
      'reduce agent effort during calls','Choose a workflow metric tied to the work, and pair it with quality.',
      ['Website engagement is unrelated to call-center handling effort.','', 'Corporate social responsibility is too broad for the operational goal.','Compliance matters but does not directly measure agent actions per call.'],2],
    // 42 — source 172; existing customers
    ['An organization that already uses SageMaker Clarify wants to know which task that feature historically supports. Which answer is correct?',
      ['Build a RAG workflow','Monitor overall production model quality','Document model details in a model card','Identify potential bias in data during preparation'],[3],
      'SageMaker Clarify supports analysis of potential data bias during preparation for existing customers. AWS states that it is no longer available to new customers; consult replacement guidance for a new implementation.',
      'potential bias before model training','Clarify = bias and explanations for existing users; Model Monitor = production quality.',
      ['RAG retrieves source information for generation.','Model Monitor historically tracked production data and model quality; Clarify had specific bias-monitoring integrations.','Model Cards document model details and governance.'],4,
      'https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-availability-change.html'],
    // 43 — source 173; clarified overfitting
    ['An ML model scores very well on its training data but much worse on independent production-like data. The team suspects overfitting due partly to a small training sample. Which listed action is most likely to help?',
      ['Reduce the training dataset.','Add unspecified hyperparameters.','Increase representative training data.','Increase training time without changing data or regularization.'],[2],
      'More representative training examples can improve generalization and reduce overfitting from a small sample. Also consider validation, regularization, and distribution shift before assuming data volume alone solves it.',
      'strong training score + weak unseen score + small sample','Overfitting → improve generalization, often with more representative data.',
      ['Less data commonly worsens overfitting.','Hyperparameters must be tuned deliberately; merely adding them is not a remedy.','', 'Longer training can intensify overfitting.'],1],
    // 44 — source 174
    ['An ecommerce company wants sentiment analysis of written product reviews. Which two AWS services can analyze the text for sentiment? (Choose two.)',
      ['Amazon Lex','Amazon Comprehend','Amazon Polly','Amazon Bedrock','Amazon Rekognition'],[1,3],
      'Amazon Comprehend has a built-in sentiment detection capability. A suitable foundation model in Amazon Bedrock can also be prompted to classify review sentiment, with the application validating output format and quality.',
      'sentiment of written reviews','Comprehend = managed NLP sentiment; Bedrock FM can classify text with a prompt.',
      ['Lex builds conversational interfaces; it is not the direct sentiment-analysis choice here.','','Polly synthesizes speech from text.','','Rekognition analyzes visual media, not written-review sentiment.'],1],
    // 45 — source 175
    ['A Bedrock chatbot must answer questions using a collection of product-manual PDFs. Which approach supplies only relevant manual content at question time without fine-tuning?',
      ['Attach a single fixed PDF to every prompt.','Attach every PDF to every prompt.','Fine-tune a model on all PDFs.','Ingest the PDFs into a Bedrock knowledge base and retrieve relevant passages.'],[3],
      'Knowledge Bases for Bedrock can ingest supported documents, retrieve relevant passages, and provide them as context for generation. Retrieval avoids sending the whole corpus with every request and is appropriate when manuals change.',
      'many PDFs + relevant passages at query time','RAG retrieves what is relevant; do not stuff every document into every prompt.',
      ['One fixed PDF may not contain the answer and wastes context on unrelated questions.','All PDFs may exceed context limits and add recurring input-token cost.','Fine-tuning changes model behavior and is usually a poor fit for serving changing factual manuals.'],3,
      'https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html'],
    // 46 — source 176
    ['A content-moderation team wants a ready-made, consistently labeled dataset to compare LLM bias outcomes across demographic groups with little collection effort. Which source best fits?',
      ['Raw user-generated content','Unlabeled moderation logs','Content moderation guidelines alone','Benchmark datasets'],[3],
      'A relevant benchmark dataset offers predefined examples and evaluation labels or criteria, reducing the effort of assembling comparable cases. Check that it reflects the actual groups and content in production.',
      'ready-made labeled comparison + least collection effort','Benchmark = standardized evaluation starting point; validate relevance.',
      ['Raw content requires collection, annotation, and representativeness review.','Logs can inform real-world evaluation but usually need cleaning and labels.','Guidelines define policy, not a ready-made test sample.'],4],
    // 47 — source 177
    ['A company uses a pretrained GenAI model for marketing copy and needs outputs consistent with brand voice. Which first step best guides generation?',
      ['Redesign architecture and hyperparameters.','Add layers to the model.','Write clear prompts with brand instructions, context, and examples.','Pretrain a new generative model.'],[2],
      'Specific instructions, constraints, and brand examples in the prompt can guide a pretrained model without the cost of training. Evaluate consistency; persistent complex behavior may later warrant customization.',
      'pretrained model + brand voice','Start with prompt guidance for tone and format.',
      ['Changing architecture is disproportionate for a prompting need.','Adding layers is not how a managed pretrained model’s output is steered.','','Pretraining from scratch is far more expensive than prompting for brand tone.'],3],
    // 48 — source 178
    ['A lender uses AI to offer discounts and wants to minimize bias and make decisions understandable to stakeholders. Which two actions help? (Choose two.)',
      ['Detect imbalances and disparities in the data.','Run inference more frequently.','Evaluate model behavior and explain decisions to stakeholders.','Use ROUGE to guarantee 100% accuracy.','Keep inference under a latency limit.'],[0,2],
      'Detecting representation and outcome disparities supports fairness checks. Evaluating behavior and communicating how decisions are made supports explainability and transparency. Loan decisions need careful governance beyond these two steps.',
      'bias + stakeholder transparency','Check disparities and explain decision behavior.',
      ['', 'Invocation frequency does not address fairness.','', 'ROUGE is a text-overlap metric and cannot guarantee accuracy or fairness.','Latency is operational performance, not a bias mitigation.'],4],
    // 49 — source 179
    ['A pre-trained product-recommendation chatbot must reply briefly in a specified language. What should the team change first?',
      ['Adjust the prompt with language and length constraints.','Choose a differently sized LLM.','Increase temperature.','Increase Top K.'],[0],
      'A direct instruction such as the language, maximum length, and desired format is the simplest way to guide output. Test against representative inputs and enforce application-side length checks if necessary.',
      'short response + specific language','Explicit output constraints → prompt instructions.',
      ['', 'Model size does not directly impose these response constraints.','Temperature adjusts randomness rather than the requested language or length.','Top K controls token sampling candidates, not output requirements.'],3],
    // 50 — source 180; date-scoped because new custom models support on-demand
    ['A company customized a Bedrock base model before July 16, 2025. The custom model is not eligible for on-demand deployment. What must it purchase to invoke that model through Bedrock?',
      ['Provisioned Throughput for the custom model.','A SageMaker real-time endpoint.','SageMaker Model Registry registration.','Access to the original base model only.'],[0],
      'For a custom model that cannot use on-demand deployment, Bedrock Provisioned Throughput supplies the inference capacity and ARN used to invoke it. Eligible models customized on or after July 16, 2025 may instead support on-demand deployment, so the old blanket rule is outdated.',
      'custom model before July 16, 2025 + not eligible for on-demand','Custom Bedrock inference: choose eligible on-demand deployment or Provisioned Throughput.',
      ['', 'A SageMaker endpoint is a different deployment route, not required for this Bedrock custom model.','Model Registry is for SageMaker model version management.','Base-model access does not make customized weights invocable.'],3,
      'https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-use.html'],
    // 51 — source 181
    ['A company must select a Bedrock model whose response style employees prefer. What evaluation approach best captures that subjective preference?',
      ['Automatic scoring on a built-in prompt dataset only.','Human evaluators on company-specific prompt examples.','A public leaderboard only.','CloudWatch InvocationLatency metrics.'],[1],
      'Employees or a representative human workforce can judge style on prompts that resemble the company’s work. Automatic metrics or external rankings do not reliably capture internal subjective preferences.',
      'employees prefer a particular response style','Subjective style → human evaluation with representative prompts.',
      ['Generic datasets and automated metrics may miss company-specific style.','', 'Public leaderboards measure different tasks and audiences.','Latency measures speed, not preference for tone.'],3],
    // 52 — source 182
    ['A student copies AI-generated prose into an essay and presents it as original work. Which responsible-AI concern does this illustrate?',
      ['Toxicity','Hallucination','Plagiarism','Privacy'],[2],
      'Presenting copied or generated work without appropriate attribution can violate academic-integrity rules and raises plagiarism concerns. Whether a particular school permits AI assistance depends on its policy.',
      'copies generated content and claims authorship','Unattributed copied work → plagiarism/integrity issue.',
      ['Toxicity concerns harmful or abusive output.','A hallucination is a generated false or unsupported claim.','', 'Privacy concerns exposure or misuse of personal information.'],4],
    // 53 — source 183; avoid unqualified environmental guarantee
    ['A team must train a large language model on EC2 and wants purpose-built AWS accelerator hardware designed for efficient model training. Which instance family should it investigate?',
      ['EC2 C series','EC2 G series','EC2 P series','EC2 Trn series'],[3],
      'EC2 Trn instances use AWS Trainium accelerators built for ML training, with performance and energy-efficiency goals. Total environmental impact depends on model, utilization, runtime, and region; an instance letter alone cannot prove the lowest footprint for every workload.',
      'purpose-built training accelerators + efficiency','Trn = Trainium for training; measure whole-job energy, not just instance name.',
      ['C series is compute-optimized CPU capacity, not the dedicated LLM training accelerator family.','G series is GPU-based and often used for graphics/ML, but not Trainium.','P series is powerful GPU-based training capacity; no blanket claim makes it lowest impact.'],2,
      'https://aws.amazon.com/ec2/instance-types/trn2/'],
    // 54 — source 184
    ['A children’s story application uses Bedrock and must filter inappropriate generated topics and content. Which feature fits?',
      ['Amazon Rekognition','Bedrock playgrounds','Guardrails for Amazon Bedrock','Agents for Amazon Bedrock'],[2],
      'Bedrock Guardrails can configure denied topics and harmful-content filters for prompts and responses. Apply the policy to the application and test against age-inappropriate edge cases.',
      'restrict topics and unsafe generated content','Guardrails = content filters and denied topics.',
      ['Rekognition analyzes images and videos; it is not the text-generation policy control.','Playgrounds are for interactive experimentation.','', 'Agents orchestrate tasks and tools rather than directly defining content safety filters.'],4,
      'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html'],
    // 55 — source 185
    ['A company needs to synthesize new records resembling a training dataset. Which model family explicitly learns to generate such examples?',
      ['Generative adversarial network (GAN)','XGBoost','Residual neural network','WaveNet'],[0],
      'A GAN trains a generator and discriminator in opposition so the generator can produce synthetic examples resembling the training distribution. Validate quality, privacy, and representativeness before using synthetic data.',
      'synthetic examples like existing data','GAN = generator versus discriminator for synthetic data.',
      ['', 'XGBoost is commonly used for supervised prediction on structured data.','A residual network is an architecture often used in vision tasks, not the named adversarial synthesis approach.','WaveNet generates audio; it is not the general synthetic tabular/image method being contrasted here.'],2],
    // 56 — source 186
    ['A no-code business team wants to combine internal and external tabular data to build a demand-forecast model. Which SageMaker capability is the best fit?',
      ['Store data in S3 and program a built-in SageMaker algorithm.','Use Data Wrangler, then program a built-in algorithm.','Use Data Wrangler with a Personalize Trending-Now recipe.','Use SageMaker Canvas to import data and build a prediction model visually.'],[3],
      'SageMaker Canvas provides a visual no-code workflow to import data and create predictive models. The team should choose the target demand value and evaluate forecasts on held-out data.',
      'no coding experience + build predictive model visually','Canvas = no-code ML; Data Wrangler = visual data preparation.',
      ['The built-in-algorithm path still requires more ML setup and coding.','Data Wrangler prepares features but is not itself the no-code model-building answer.','Personalize Trending-Now is for recommendations of trending items, not general demand forecasting.'],1],
    // 57 — source 187; training imbalance made explicit
    ['A security-camera theft detector disproportionately flags people from one ethnic group. Investigation finds that this group was underrepresented in the training sample. Which bias source is illustrated?',
      ['Measurement bias','Sampling bias','Observer bias','Confirmation bias'],[1],
      'Sampling bias arises when the selected training examples inadequately represent the target population. Underrepresentation can cause poorer generalization for a group and unfair false-positive rates; audit labels and measurement too.',
      'underrepresented group in selected training sample','Sampling bias = the sample does not represent the population.',
      ['Measurement bias would come from systematically flawed collection or labeling, which is not the stated cause.','', 'Observer bias involves human interpretation influencing observations.','Confirmation bias involves favoring evidence that supports prior beliefs.'],4],
    // 58 — source 188; scoped to actual feedback-based training
    ['A service chatbot is periodically retrained using rewards derived from positive customer feedback on its responses. Which learning strategy describes that feedback signal?',
      ['Supervised learning from manually labeled good/bad responses','Reinforcement learning with rewards for positive feedback','Unsupervised clustering of inquiries','Supervised learning from a changing FAQ document'],[1],
      'Reinforcement learning uses reward signals to optimize behavior over training iterations. A deployed LLM does not automatically update weights from every conversation; the team must design a feedback and training pipeline.',
      'reward signal from customer feedback + retraining','Rewards guide reinforcement learning; a changing FAQ is knowledge retrieval.',
      ['Manually labeled target responses describe supervised learning rather than reward optimization.','', 'Clustering groups similar inquiries without response-quality rewards.','An FAQ is a knowledge source, not automatic learning from feedback.'],1],
    // 59 — source 189
    ['A model predicts material categories from images. Which offered tool summarizes counts of correct and incorrect predictions by class?',
      ['Confusion matrix','Correlation matrix','R-squared score','Mean squared error (MSE)'],[0],
      'A confusion matrix compares predicted versus actual classes and displays true positives, false positives, and false negatives by category. It exposes which material types the classifier confuses.',
      'classification errors by class','Confusion matrix = actual classes versus predicted classes.',
      ['', 'A correlation matrix describes relationships among numeric variables.','R-squared measures regression fit.','MSE is a numeric error measure most commonly used for regression.'],1],
    // 60 — source 190
    ['A SageMaker inference workload has requests up to 1 GB and processing up to one hour, while still needing a response after each submitted request rather than an overnight batch. Which option fits?',
      ['Real-time inference','Serverless inference','Asynchronous inference','Batch transform'],[2],
      'SageMaker Asynchronous Inference accepts large payloads up to 1 GB and can process a request for up to an hour, returning results asynchronously. It fits long-running, near-real-time requests rather than subsecond synchronous serving.',
      '1 GB + one hour + per-request result','Large, long-running individual requests → asynchronous inference.',
      ['Real-time endpoints have much smaller request/time limits.','Serverless inference does not support this 1 GB, hour-long request shape.','', 'Batch transform is for offline datasets without a per-request near-real-time workflow.'],3,
      'https://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html'],
    // 61 — source 191; replaces generic moderation wording
    ['A Bedrock chatbot can return images. The company wants to block inappropriate image outputs before users see them. Which solution directly addresses the content?',
      ['Configure Bedrock Guardrails image content filters on responses.','Retrain with an unrestricted public image dataset.','Only check aggregate model accuracy.','Automatically apply all user feedback without review.'],[0],
      'Bedrock Guardrails supports image content filters to detect and block harmful image responses for supported flows. Test the configured policy and check the model and API support for the application.',
      'inappropriate generated images + block before display','Image moderation requires a content filter on image outputs.',
      ['', 'Unrestricted training data offers no reliable safety control.','Aggregate validation does not screen each returned image.','Unreviewed feedback can introduce unsafe behavior rather than prevent it.'],4,
      'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-mmfilter.html'],
    // 62 — source 192
    ['An AI practitioner wants to capture Bedrock model inputs and outputs for monitoring. Which capability should be enabled?',
      ['Use CloudTrail as the content-log destination.','Enable Bedrock model invocation logging.','Use Audit Manager as the content-log destination.','Configure EventBridge as a model invocation log sink.'],[1],
      'Bedrock model invocation logging can capture model invocation inputs, outputs, and metadata to configured destinations such as CloudWatch Logs or S3, subject to supported APIs and data-protection settings.',
      'record model input and output content','Invocation logging = prompt/response content; CloudTrail = API activity metadata.',
      ['CloudTrail audits API calls, not the configured repository for full prompt/response content.','', 'Audit Manager gathers audit evidence rather than being an invocation log destination.','EventBridge is an event bus, not the listed Bedrock invocation logging destination.'],5,
      'https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html'],
    // 63 — source 193
    ['A company must run inference across an archived dataset of many gigabytes and does not need predictions immediately. Which SageMaker option fits?',
      ['Batch transform','Real-time inference','Serverless inference','Asynchronous inference'],[0],
      'SageMaker Batch Transform performs offline inference on stored datasets and writes results for later use. It is suited to bulk jobs without an immediate response requirement.',
      'large archive + no immediate result','Whole stored dataset offline → Batch Transform.',
      ['', 'Real-time inference serves immediate request/response traffic.','Serverless endpoints serve individual on-demand requests, not this offline bulk dataset.','Asynchronous inference handles long-running individual requests, rather than a many-GB offline job.'],3],
    // 64 — source 194
    ['What are numerical vector representations of text or other concepts that capture relationships for AI search and NLP?',
      ['Embeddings','Tokens','Models','Binaries'],[0],
      'Embeddings map items into vectors so similar meanings can be near each other in vector space. They power semantic search and retrieval.',
      'numerical vectors representing meaning','Embeddings = semantic vectors; tokens = units of text.',
      ['', 'Tokens are chunks of input/output text, not the learned semantic vectors themselves.','A model is the learned system that may create embeddings.','Binary data encoding does not by itself capture semantic similarity.'],2],
    // 65 — source 195; isolates terminology rather than missing retrieval
    ['A Bedrock chatbot already retrieves relevant research papers, but the FM repeatedly misinterprets specialized scientific terminology. Which customization is most directly aimed at learning that domain language?',
      ['Add a few response-format examples only.','Use domain-adaptation fine-tuning on appropriate scientific data.','Only change inference sampling parameters.','Remove the scientific terms from the papers.'],[1],
      'Domain adaptation trains on relevant specialized material so a model can handle the terminology better. Depending on the available data and supported model, continued pre-training on unlabeled domain text can also be appropriate; evaluate the resulting model rather than assuming adaptation always succeeds.',
      'retrieval already works + persistent domain-terminology weakness','Current facts → RAG; persistent domain language → domain adaptation.',
      ['Few-shot examples may help individual prompts but do not persistently adapt the model to broad terminology.','', 'Sampling settings do not teach scientific vocabulary or concepts.','Removing technical terms destroys the content the researchers need.'],3]
  ];
  const questions = raw.map(o => Array.isArray(o) ? question(o) : matching(o));
  window.aifExamData.mockExam4 = {
    id: 'mock-exam-4', kind: 'mock', title: 'Mock Exam 4',
    subtitle: 'Full AIF-C01 Practice Exam', weight: 'Full Mock',
    durationSeconds: 5400, passPercent: 72, questions
  };
})();
