(() => {
  window.aifExamData = window.aifExamData || {};
  const letters = i => String.fromCharCode(65 + i);

  function q(o) {
    const correct = o.ans.map(i => `${letters(i)}. ${o.opts[i]}`).join(" / ");
    const incorrectReasons = {};
    o.opts.forEach((opt, i) => {
      if (!o.ans.includes(i)) incorrectReasons[i] = o.incorrect?.[i] || `${opt} does not best satisfy the decisive requirement: ${o.clue}.`;
    });
    return {
      q: o.q,
      opts: o.opts,
      ans: o.ans,
      selectCount: o.ans.length > 1 ? o.ans.length : 1,
      why: o.why,
      explanation: {
        correctAnswer: correct,
        correctReason: o.why + ` The decisive clue is **${o.clue}**.`,
        incorrectReasons,
        examClue: o.clue,
        examTip: o.tip,
        transferCheck: "",
        rememberThis: o.tip,
        takeaway: { signal: o.clue, think: o.tip, contrast: "" }
      },
      status: "generated mock question",
      task: `Domain ${o.domain}`,
      taskName: "AIF-C01 mixed-domain practice",
      difficulty: o.difficulty,
      source: "Tutorials Dojo",
      reference: o.reference
    };
  }

  function match(o) {
    return {
      type: "matching",
      q: o.q,
      rows: o.rows,
      choices: o.choices,
      ans: o.ans,
      why: o.why,
      explanation: {
        correctAnswer: o.rows.map((r, i) => `${r} → ${o.choices[o.ans[i]]}`).join(" | "),
        correctReason: o.why + ` The decisive clue is **${o.clue}**.`,
        incorrectReasons: {},
        examClue: o.clue,
        examTip: o.tip,
        transferCheck: "",
        rememberThis: o.tip,
        takeaway: { signal: o.clue, think: o.tip, contrast: "" }
      },
      status: "generated hotspot/matching question",
      task: `Domain ${o.domain}`,
      taskName: "AIF-C01 mixed-domain practice",
      difficulty: o.difficulty,
      source: "Tutorials Dojo",
      reference: o.reference
    };
  }

  const raw = [
  {
    "domain": 1,
    "difficulty": "easy",
    "q": "A forecasting model has poor accuracy on both the training dataset and the validation dataset. The team believes the current model is too simple to capture the relationships in the data. Which issue BEST describes the model?",
    "opts": [
      "Underfitting",
      "Overfitting",
      "Data leakage",
      "Concept drift"
    ],
    "ans": [
      0
    ],
    "why": "Underfitting occurs when a model is too simple to learn the important patterns in the data, so it performs poorly on both training and validation data. The clue is that performance is weak even on the data used for learning, not only on new data.",
    "clue": "poor on training and validation + model too simple",
    "tip": "Poor on both train and validation -> underfitting. Great on train but poor on validation -> overfitting.",
    "reference": "Tutorials Dojo – Domain 1 > Model Fit: Overfitting and Underfitting",
    "incorrect": {
      "1": "Overfitting normally shows strong training performance but poor performance on unseen data.",
      "2": "Data leakage means information from validation/test data improperly influences training; it does not inherently describe a model that is too simple.",
      "3": "Concept drift happens after deployment when real-world relationships change over time, not during initial training because the model lacks capacity."
    }
  },
  {
    "domain": 1,
    "difficulty": "easy",
    "q": "A team is building a supervised model to predict whether a shipment will arrive late. The training table contains distance, carrier, package weight, weather category, and a late-or-not-late outcome. Which column is the label?",
    "opts": [
      "Distance",
      "Carrier",
      "Late-or-not-late outcome",
      "Package weight"
    ],
    "ans": [
      2
    ],
    "why": "In supervised learning, features are the input variables and the label is the known target the model is trained to predict. Here, the late-or-not-late outcome is the target.",
    "clue": "known outcome the model should predict",
    "tip": "Inputs are features; the known target is the label.",
    "reference": "Tutorials Dojo – Domain 1 > Data in AI Models > Features and Labels",
    "incorrect": {
      "0": "Distance is an input feature used to help make the prediction.",
      "1": "Carrier is an input feature, not the prediction target.",
      "3": "Package weight is another input feature rather than the label."
    }
  },
  {
    "domain": 1,
    "difficulty": "medium",
    "q": "A data scientist has separated a dataset into training, validation, and test sets. The scientist is choosing between several hyperparameter configurations before finalizing the model. Which dataset should be used for this choice?",
    "opts": [
      "Training set",
      "Production inference data",
      "Test set",
      "Validation set"
    ],
    "ans": [
      3
    ],
    "why": "The validation set is used during development to compare model configurations and tune hyperparameters. The test set should remain held out until the end to provide an unbiased final evaluation.",
    "clue": "choose hyperparameters before final evaluation",
    "tip": "Tune with validation; final unbiased check with test.",
    "reference": "Tutorials Dojo – Domain 1 > ML Development Lifecycle > Model Validation and Evaluation",
    "incorrect": {
      "0": "The training set is used to fit model parameters, not to independently choose the best hyperparameter configuration.",
      "2": "The test set should be reserved for the final evaluation after tuning decisions are complete.",
      "1": "Production inference data is not the standard held-out development dataset for hyperparameter selection."
    }
  },
  {
    "domain": 1,
    "difficulty": "easy",
    "q": "A company stores product photos, customer call recordings, and free-form support emails. What type of data BEST describes these assets?",
    "opts": [
      "Unstructured data",
      "Structured data",
      "Tabular data only",
      "Labeled data"
    ],
    "ans": [
      0
    ],
    "why": "Images, audio, and free-form text do not naturally fit a fixed row-and-column schema, so they are unstructured data. Whether data is labeled is a separate property from whether it is structured.",
    "clue": "images + audio + free-form text",
    "tip": "Rows/columns -> structured. Text/images/audio/video -> unstructured.",
    "reference": "Tutorials Dojo – Domain 1 > Data in AI Models > Data Format",
    "incorrect": {
      "1": "Structured data follows a predefined schema such as rows and columns.",
      "2": "These assets are not limited to tabular data; they include media and free-form text.",
      "3": "Labeled describes whether examples have known target values, not their structural format."
    }
  },
  {
    "domain": 1,
    "difficulty": "hard",
    "q": "A company pre-trains a language model on a large corpus of raw text without manually creating labels. The training objective is derived from the text itself, such as predicting missing or next tokens. Which learning approach does this describe?",
    "opts": [
      "Self-supervised learning",
      "Reinforcement learning",
      "Supervised learning",
      "Clustering"
    ],
    "ans": [
      0
    ],
    "why": "Self-supervised learning creates training signals from the input data itself rather than relying on human-provided labels. Language-model pre-training can use raw text to create its own prediction targets.",
    "clue": "raw text + labels derived from the data itself",
    "tip": "Model creates its own training signal from raw data -> self-supervised.",
    "reference": "Tutorials Dojo – Domain 1 > Machine Learning Paradigms > Self-Supervised Learning",
    "incorrect": {
      "2": "Supervised learning depends on externally labeled input-output examples.",
      "1": "Reinforcement learning learns from rewards and penalties after actions.",
      "3": "Clustering groups similar unlabeled examples but is not the token-prediction training objective described."
    }
  },
  {
    "domain": 1,
    "difficulty": "medium",
    "q": "A warehouse robot learns which route reaches a packing station fastest. After each attempt, it receives a positive reward for faster routes and a penalty for collisions. Which type of machine learning is being used?",
    "opts": [
      "Regression",
      "Supervised learning",
      "Unsupervised learning",
      "Reinforcement learning"
    ],
    "ans": [
      3
    ],
    "why": "Reinforcement learning trains an agent by letting it take actions in an environment and learn from rewards or penalties. The robot is improving its policy through trial-and-error feedback.",
    "clue": "agent takes actions + rewards and penalties",
    "tip": "Agent + environment + reward/penalty -> reinforcement learning.",
    "reference": "Tutorials Dojo – Domain 1 > Machine Learning Paradigms > Reinforcement Learning",
    "incorrect": {
      "1": "Supervised learning uses labeled examples with known correct outputs rather than action rewards.",
      "2": "Unsupervised learning finds structure in unlabeled data without a reward signal.",
      "0": "Regression is a prediction task for continuous numeric values, not a learning paradigm based on rewards."
    }
  },
  {
    "domain": 1,
    "difficulty": "medium",
    "q": "A utilities company wants to predict the exact number of megawatt-hours that a facility will consume tomorrow. Which ML task is MOST appropriate?",
    "opts": [
      "Classification",
      "Clustering",
      "Regression",
      "Anomaly detection"
    ],
    "ans": [
      2
    ],
    "why": "Regression is used when the target is a continuous numeric value. The required output is an exact quantity of energy consumption rather than a category.",
    "clue": "predict an exact numeric value",
    "tip": "Number -> regression. Category -> classification.",
    "reference": "Tutorials Dojo – Domain 1 > Models and Algorithms",
    "incorrect": {
      "0": "Classification predicts discrete labels or categories.",
      "1": "Clustering groups similar records without a target label.",
      "3": "Anomaly detection identifies unusual observations rather than predicting the requested numeric amount."
    }
  },
  {
    "domain": 1,
    "difficulty": "medium",
    "q": "A retailer has 200,000 product images that must be annotated with the correct product category before a supervised image model can be trained. Which SageMaker capability is designed for this task?",
    "opts": [
      "Amazon SageMaker Data Wrangler",
      "Amazon SageMaker Feature Store",
      "Amazon SageMaker Ground Truth",
      "Amazon SageMaker Model Monitor"
    ],
    "ans": [
      2
    ],
    "why": "SageMaker Ground Truth is used to create labeled training datasets by coordinating human labeling workflows and related automation. The requirement is annotation of training examples, not transformation or monitoring.",
    "clue": "annotate training data with correct categories",
    "tip": "Need humans to label training data -> Ground Truth. Need to clean/transform data -> Data Wrangler.",
    "reference": "Tutorials Dojo – Domain 1 > AWS Services for Each Stage of the ML Pipeline",
    "incorrect": {
      "0": "Data Wrangler focuses on preparing, cleaning, and transforming data before model building.",
      "1": "Feature Store stores and reuses ML features across teams and workloads.",
      "3": "Model Monitor is used after deployment to detect changes in production model/data quality."
    }
  },
  {
    "domain": 1,
    "difficulty": "medium",
    "q": "A support organization already has thousands of digital text messages. It needs to identify sentiment, entities, and key phrases without building a custom NLP model. Which AWS service BEST fits?",
    "opts": [
      "Amazon Comprehend",
      "Amazon Textract",
      "Amazon Rekognition",
      "Amazon Polly"
    ],
    "ans": [
      0
    ],
    "why": "Amazon Comprehend is a managed natural language processing service that can analyze text for sentiment, entities, and other linguistic information. The source is already digital text, so document OCR is not the primary requirement.",
    "clue": "sentiment + entities + key phrases in text",
    "tip": "Understand existing text -> Comprehend. Extract text from scanned documents -> Textract.",
    "reference": "Tutorials Dojo – Domain 1 > Capabilities of AWS Managed AI Services > Amazon Comprehend",
    "incorrect": {
      "1": "Textract extracts text and structured information from scanned documents and forms.",
      "2": "Rekognition analyzes images and video rather than free-form text.",
      "3": "Polly converts text into speech instead of analyzing text."
    }
  },
  {
    "domain": 1,
    "difficulty": "easy",
    "q": "An online store wants a managed AWS service that can generate individualized product recommendations from user behavior and item interactions. The company does not want to build its own recommendation algorithm. Which service should it use?",
    "opts": [
      "Amazon Kendra",
      "Amazon Personalize",
      "Amazon Translate",
      "Amazon Lex"
    ],
    "ans": [
      1
    ],
    "why": "Amazon Personalize is designed to create personalized recommendations and user experiences from interaction data. The scenario is recommendation-oriented rather than enterprise search or conversational interface building.",
    "clue": "individualized recommendations from user behavior",
    "tip": "Personalized recommendations -> Amazon Personalize. Enterprise search -> Kendra.",
    "reference": "Tutorials Dojo – Domain 1 > Capabilities of AWS Managed AI Services > Amazon Personalize",
    "incorrect": {
      "0": "Kendra is an intelligent enterprise search service for retrieving information.",
      "2": "Translate converts text from one language to another.",
      "3": "Lex builds conversational interfaces and chatbots rather than recommendation engines."
    }
  },
  {
    "domain": 1,
    "difficulty": "easy",
    "q": "A media moderation workflow must identify objects and visual content inside user-uploaded photos and videos. Which AWS managed AI service is designed for this use case?",
    "opts": [
      "Amazon Comprehend",
      "Amazon Transcribe",
      "Amazon Rekognition",
      "Amazon Kendra"
    ],
    "ans": [
      2
    ],
    "why": "Amazon Rekognition analyzes images and video for visual content such as objects, scenes, faces, and moderation-related signals. The inputs are visual media, not audio or text.",
    "clue": "analyze photos and videos",
    "tip": "Images/video -> Rekognition. Audio -> Transcribe. Text -> Comprehend.",
    "reference": "Tutorials Dojo – Domain 1 > Capabilities of AWS Managed AI Services > Amazon Rekognition",
    "incorrect": {
      "1": "Transcribe converts spoken audio into text.",
      "0": "Comprehend performs NLP analysis on text.",
      "3": "Kendra provides intelligent enterprise search and retrieval."
    }
  },
  {
    "domain": 1,
    "difficulty": "hard",
    "q": "A company is choosing how to run inference for two workloads. Which TWO statements are correct? (Select TWO.)",
    "opts": [
      "Batch inference requires a persistent low-latency endpoint for every request.",
      "Real-time inference is intended only for offline monthly processing.",
      "Batch inference is appropriate when a large accumulated dataset can be processed without an immediate response.",
      "Both batch and real-time inference require the model to be retrained before every prediction.",
      "Real-time inference is appropriate when an application needs an immediate prediction for each request."
    ],
    "ans": [
      2,
      4
    ],
    "why": "Batch inference is suitable for high-volume offline processing when immediate responses are unnecessary, while real-time inference supports low-latency predictions for individual requests. These are inference patterns and do not imply retraining for each request.",
    "clue": "offline bulk processing versus immediate per-request prediction",
    "tip": "No urgency + lots of records -> batch. Immediate response -> real-time.",
    "reference": "Tutorials Dojo – Domain 1 > Inferencing in AI > Batch inference and Real-time inferencing",
    "incorrect": {
      "0": "A persistent low-latency endpoint is associated with real-time inference, not batch processing.",
      "1": "Monthly or other offline bulk processing is the opposite of the real-time pattern.",
      "3": "Inference uses a trained model; it does not require retraining before each prediction."
    }
  },
  {
    "type": "matching",
    "domain": 1,
    "difficulty": "hard",
    "q": "Match each business requirement to the AWS managed AI service that BEST fits it.",
    "rows": [
      "Convert a recorded interview from speech to text",
      "Convert an article into natural-sounding speech",
      "Translate a product description into another language",
      "Extract fields and tables from a scanned form"
    ],
    "choices": [
      "Amazon Polly",
      "Amazon Textract",
      "Amazon Translate",
      "Amazon Transcribe"
    ],
    "ans": [
      3,
      0,
      2,
      1
    ],
    "why": "Transcribe performs speech-to-text, Polly performs text-to-speech, Translate converts text between languages, and Textract extracts text and structured data from documents. The question tests directionality and input type rather than generic AI capability.",
    "clue": "speech/text/document directionality",
    "tip": "Transcribe = speech->text; Polly = text->speech; Translate = language; Textract = documents.",
    "reference": "Tutorials Dojo – Domain 1 > Capabilities of AWS Managed AI Services"
  },
  {
    "domain": 2,
    "difficulty": "easy",
    "q": "A generative AI application has a maximum context window. What does this limit primarily control?",
    "opts": [
      "How many model weights can be updated during fine-tuning",
      "How many tokens the model can consider within a request or conversation",
      "How many AWS Regions can host the application",
      "How many users can authenticate with IAM"
    ],
    "ans": [
      1
    ],
    "why": "A context window defines the amount of tokenized input and conversation context a model can consider at one time. Longer documents may exceed this limit and require strategies such as chunking.",
    "clue": "maximum context window",
    "tip": "Context window = token budget the model can see at once.",
    "reference": "Tutorials Dojo – Domain 2 > Foundational Concepts of Generative AI > Tokens",
    "incorrect": {
      "0": "Fine-tuning weight updates are a training concern, not what the context window measures.",
      "2": "Regional availability is an infrastructure consideration, not a token limit.",
      "3": "IAM authentication limits are unrelated to model context size."
    }
  },
  {
    "domain": 2,
    "difficulty": "medium",
    "q": "A RAG application indexes 600-page policy manuals. Retrieval quality is poor because entire manuals are embedded as single units. Which preprocessing technique should the team apply?",
    "opts": [
      "Convert every document to an image",
      "Increase the temperature",
      "Fine-tune the model on every manual",
      "Chunk the manuals into smaller meaningful sections"
    ],
    "ans": [
      3
    ],
    "why": "Chunking divides long documents into smaller units that can be embedded and retrieved more precisely. This makes it easier for retrieval to return the most relevant passages instead of an entire oversized document.",
    "clue": "long documents embedded as single units",
    "tip": "RAG retrieval works better when documents are split into meaningful chunks before embedding.",
    "reference": "Tutorials Dojo – Domain 2 > Foundational Concepts of Generative AI > Chunking",
    "incorrect": {
      "1": "Temperature controls generation randomness and does not improve document segmentation for retrieval.",
      "2": "Fine-tuning changes model behavior/weights and is unnecessary for splitting source documents.",
      "0": "Changing documents to images would not solve the oversized retrieval unit problem."
    }
  },
  {
    "domain": 2,
    "difficulty": "easy",
    "q": "A virtual assistant must accept a photo, a spoken question, or typed text and combine those inputs when producing a response. What type of model is MOST appropriate?",
    "opts": [
      "A multimodal model",
      "A regression model",
      "A clustering model",
      "A text-only embedding model"
    ],
    "ans": [
      0
    ],
    "why": "A multimodal model can process information from multiple modalities such as text, images, and audio. The requirement explicitly combines several input types in one assistant.",
    "clue": "text + image + audio inputs",
    "tip": "Multiple modalities -> multimodal model.",
    "reference": "Tutorials Dojo – Domain 2 > Foundational Concepts of Generative AI > Multi-Modal Models",
    "incorrect": {
      "1": "Regression predicts continuous numeric values.",
      "2": "Clustering groups similar data and does not inherently process multiple media types for generation.",
      "3": "A text-only embedding model represents text as vectors and cannot directly satisfy image and audio input requirements."
    }
  },
  {
    "domain": 2,
    "difficulty": "easy",
    "q": "A chatbot confidently invents a return policy that does not exist in the company documentation. Which generative AI limitation does this illustrate?",
    "opts": [
      "Tokenization",
      "Hallucination",
      "Embedding",
      "Normalization"
    ],
    "ans": [
      1
    ],
    "why": "Hallucination occurs when a generative model produces plausible-sounding but incorrect or fabricated information. The output sounds confident even though the policy is not real.",
    "clue": "plausible but fabricated answer",
    "tip": "Confidently made-up facts -> hallucination.",
    "reference": "Tutorials Dojo – Domain 2 > Capabilities and Limitations of Generative AI > Hallucinations",
    "incorrect": {
      "0": "Tokenization splits input into model-processing units; it is not a factuality failure.",
      "2": "Embeddings are vector representations of meaning.",
      "3": "Normalization is a data-preparation concept and does not describe fabricated model output."
    }
  },
  {
    "domain": 2,
    "difficulty": "medium",
    "q": "A marketing team uses one generative AI system to draft product copy, rewrite support articles, and create campaign ideas for several industries. Which generative AI advantage is MOST directly demonstrated?",
    "opts": [
      "Perfect explainability",
      "Guaranteed determinism",
      "Adaptability",
      "Zero computational cost"
    ],
    "ans": [
      2
    ],
    "why": "Generative AI can adapt to many tasks and domains by using different prompts and context. The same general-purpose capability is being reused across several business activities.",
    "clue": "same model used across many tasks and domains",
    "tip": "One model, many tasks/domains -> adaptability.",
    "reference": "Tutorials Dojo – Domain 2 > Advantages and Capabilities of Generative AI",
    "incorrect": {
      "1": "Generative AI outputs can be nondeterministic, so determinism is not guaranteed.",
      "0": "Complex generative models can be difficult to fully explain.",
      "3": "Generative AI still incurs compute and service costs."
    }
  },
  {
    "domain": 2,
    "difficulty": "medium",
    "q": "Which statement BEST distinguishes a large language model (LLM) from the broader concept of a foundation model (FM)?",
    "opts": [
      "Every FM is limited to text, while an LLM can process any modality.",
      "An LLM is always trained from scratch for one company, while an FM is never customized.",
      "An LLM is a foundation model focused on language tasks, while foundation models can cover broader modalities and tasks.",
      "An FM is only a database used to store embeddings."
    ],
    "ans": [
      2
    ],
    "why": "An LLM is a type of foundation model specialized in understanding and generating language. Foundation models are a broader class that can support many downstream tasks and modalities.",
    "clue": "LLM versus broader foundation model",
    "tip": "LLM = language-focused FM. FM = broader general-purpose pretrained model class.",
    "reference": "Tutorials Dojo – Domain 2 > Foundational Concepts of Generative AI",
    "incorrect": {
      "0": "Foundation models are not limited to text; some are multimodal or image-focused.",
      "1": "Both LLMs and other FMs can be pretrained broadly and later customized; neither definition requires one-company training from scratch.",
      "3": "A foundation model is a pretrained AI model, not a vector database."
    }
  },
  {
    "domain": 2,
    "difficulty": "hard",
    "q": "An image generator starts from random noise and repeatedly denoises it until a coherent image appears. Which generative model family does this describe?",
    "opts": [
      "Diffusion model",
      "Generative adversarial network (GAN)",
      "Regression model",
      "K-means model"
    ],
    "ans": [
      0
    ],
    "why": "Diffusion models generate images by progressively reversing a noise process and denoising toward a coherent output. This differs from GANs, which use competing generator and discriminator networks.",
    "clue": "random noise gradually denoised into an image",
    "tip": "Noise -> iterative denoising -> diffusion.",
    "reference": "Tutorials Dojo – Domain 2 > Foundational Concepts of Generative AI > Diffusion Models",
    "incorrect": {
      "1": "GANs use a generator and discriminator that compete during training rather than iterative denoising from noise at generation time.",
      "2": "Regression predicts continuous numeric targets.",
      "3": "K-means is an unsupervised clustering algorithm."
    }
  },
  {
    "domain": 2,
    "difficulty": "medium",
    "q": "A company changes the wording, examples, and constraints in a prompt to improve responses but does not retrain the model. What technique is the company using?",
    "opts": [
      "Fine-tuning",
      "Prompt engineering",
      "Continuous pre-training",
      "Model distillation"
    ],
    "ans": [
      1
    ],
    "why": "Prompt engineering changes the instructions and context presented to a model without changing model weights. It is the fastest customization approach when retraining is not required.",
    "clue": "change instructions without retraining",
    "tip": "Prompt changes behavior at inference time without changing weights.",
    "reference": "Tutorials Dojo – Domain 2 > Prompt Engineering",
    "incorrect": {
      "0": "Fine-tuning updates model weights using task-specific training data.",
      "2": "Continuous pre-training performs additional training on domain data.",
      "3": "Model distillation transfers capabilities into a smaller model and is not simply prompt editing."
    }
  },
  {
    "domain": 2,
    "difficulty": "medium",
    "q": "A prompt says: “Classify each request as Billing, Technical, or Account.” It includes three example requests with their correct categories before asking the model to classify a new request. Which prompting approach is being used?",
    "opts": [
      "Zero-shot prompting",
      "Negative prompting",
      "Few-shot prompting",
      "Self-refine prompting"
    ],
    "ans": [
      2
    ],
    "why": "Few-shot prompting provides a small number of examples in the prompt so the model can infer the desired behavior or format. The examples are part of the prompt and do not retrain the model.",
    "clue": "several examples included in the prompt",
    "tip": "No examples -> zero-shot. A few examples -> few-shot.",
    "reference": "Tutorials Dojo – Domain 2 > Prompting Types > Few-shot prompting",
    "incorrect": {
      "0": "Zero-shot prompting provides instructions without examples.",
      "1": "Negative prompting tells the model what to avoid rather than demonstrating labeled examples.",
      "3": "Self-refine prompting has the model review and improve its own initial response."
    }
  },
  {
    "domain": 2,
    "difficulty": "easy",
    "q": "A business user wants a simple Amazon Bedrock playground experience for experimenting with generative AI applications without building the underlying infrastructure. Which service is described in the study guide?",
    "opts": [
      "Amazon Kendra",
      "PartyRock",
      "Amazon Textract",
      "AWS Config"
    ],
    "ans": [
      1
    ],
    "why": "PartyRock is described as an Amazon Bedrock playground that lets users build and experiment with generative AI applications in an intuitive environment. The requirement is experimentation rather than enterprise search, OCR, or governance.",
    "clue": "Bedrock playground for easy GenAI experimentation",
    "tip": "PartyRock = hands-on Bedrock playground.",
    "reference": "Tutorials Dojo – Domain 2 > AWS Services and Features for Developing Generative AI Applications > PartyRock",
    "incorrect": {
      "0": "Kendra is enterprise search.",
      "2": "Textract extracts text and structured data from documents.",
      "3": "AWS Config records and evaluates resource configurations."
    }
  },
  {
    "domain": 2,
    "difficulty": "medium",
    "q": "A startup wants access to high-performing foundation models from AWS and other model providers through a managed service and common API, with minimal infrastructure management. Which AWS service BEST fits?",
    "opts": [
      "Amazon Bedrock",
      "Amazon SageMaker Data Wrangler",
      "Amazon Rekognition",
      "Amazon EMR"
    ],
    "ans": [
      0
    ],
    "why": "Amazon Bedrock provides managed access to foundation models from Amazon and other providers through a common service interface. It is designed for building generative AI applications without managing model-serving infrastructure.",
    "clue": "managed access to multiple foundation models through a common API",
    "tip": "Managed multi-provider FMs -> Amazon Bedrock.",
    "reference": "Tutorials Dojo – Domain 2 > AWS Services and Features for Developing Generative AI Applications > Amazon Bedrock",
    "incorrect": {
      "1": "Data Wrangler is for preparing and transforming ML data.",
      "2": "Rekognition is a managed computer-vision service.",
      "3": "EMR is a big-data processing platform, not the managed FM service described."
    }
  },
  {
    "domain": 2,
    "difficulty": "hard",
    "q": "A data science team wants to start from a prebuilt model or solution template inside the SageMaker environment and then deploy or customize it. Which SageMaker capability should the team use?",
    "opts": [
      "Amazon SageMaker Model Monitor",
      "Amazon SageMaker JumpStart",
      "Amazon SageMaker Ground Truth",
      "Amazon SageMaker Feature Store"
    ],
    "ans": [
      1
    ],
    "why": "SageMaker JumpStart provides pretrained models and solution templates that can accelerate model development and deployment. It is the SageMaker feature focused on quickly starting from existing models rather than building everything from scratch.",
    "clue": "prebuilt models and solution templates inside SageMaker",
    "tip": "Pretrained model catalog/solution templates in SageMaker -> JumpStart.",
    "reference": "Tutorials Dojo – Domain 2 > AWS Infrastructure and Technologies for Generative AI > Amazon SageMaker JumpStart",
    "incorrect": {
      "0": "Model Monitor checks deployed models for quality changes and drift.",
      "2": "Ground Truth creates labeled training datasets.",
      "3": "Feature Store centrally stores reusable ML features."
    }
  },
  {
    "domain": 2,
    "difficulty": "hard",
    "q": "A company is selecting a foundation model for a customer-facing application. Which TWO factors are directly relevant to whether the model can accept the company’s inputs and return answers quickly enough? (Select TWO.)",
    "opts": [
      "Supported modality",
      "Inference latency",
      "The color of the AWS console theme",
      "Number of IAM groups in the account",
      "Office location of the development team"
    ],
    "ans": [
      0,
      1
    ],
    "why": "Model modality determines whether the FM can handle the required input and output types, while latency determines whether responses are fast enough for the application. The other options are unrelated to FM capability selection.",
    "clue": "input type support + response speed",
    "tip": "Model selection: modality answers “can it handle this data?”; latency answers “is it fast enough?”",
    "reference": "Tutorials Dojo – Domain 2 > Factors for Selecting Appropriate Generative AI Models",
    "incorrect": {
      "2": "Console appearance has no effect on model capabilities.",
      "3": "IAM group count is an account administration detail, not a model selection characteristic.",
      "4": "Developer office location does not determine FM modality or inference performance."
    }
  },
  {
    "domain": 2,
    "difficulty": "medium",
    "q": "A company expects a low and highly variable volume of generative AI requests during a pilot. Which TWO statements support using a pay-per-use approach rather than reserving fixed model capacity? (Select TWO.)",
    "opts": [
      "The application requires guaranteed reserved throughput at a constant high volume.",
      "The company needs to reserve capacity in advance regardless of usage.",
      "Usage is uncertain and may be low for long periods.",
      "The company wants to avoid paying for reserved capacity that may sit unused.",
      "The company wants a fixed commitment even if requests stop."
    ],
    "ans": [
      2,
      3
    ],
    "why": "Token-based or on-demand usage aligns well with uncertain or low traffic because the company pays for actual use instead of reserving capacity. Provisioned throughput is more appropriate when predictable reserved capacity is required.",
    "clue": "low, uncertain traffic + avoid idle reserved capacity",
    "tip": "Variable/unknown demand -> pay per use. Predictable high demand -> provisioned capacity.",
    "reference": "Tutorials Dojo – Domain 2 > Cost Tradeoffs of AWS Generative AI Services",
    "incorrect": {
      "0": "Guaranteed reserved throughput is a reason to consider provisioned capacity instead.",
      "1": "Reserving capacity in advance contradicts the goal of avoiding unused commitment.",
      "4": "A fixed commitment is not the advantage of a pay-per-use approach."
    }
  },
  {
    "domain": 2,
    "difficulty": "medium",
    "q": "Which TWO items are recognized limitations or risks of generative AI in the study guide? (Select TWO.)",
    "opts": [
      "Guaranteed factual correctness",
      "Hallucinations",
      "Guaranteed deterministic outputs",
      "Intellectual property concerns",
      "Zero need for governance"
    ],
    "ans": [
      1,
      3
    ],
    "why": "Generative AI can produce hallucinations and can create intellectual-property concerns related to training data and generated content. These systems do not guarantee correctness, determinism, or freedom from governance requirements.",
    "clue": "GenAI risks and limitations",
    "tip": "Hallucination and IP are classic GenAI risk clues.",
    "reference": "Tutorials Dojo – Domain 2 > Capabilities and Limitations of Generative AI",
    "incorrect": {
      "0": "Factual correctness is not guaranteed; hallucinations are a known limitation.",
      "2": "Generative outputs can be nondeterministic.",
      "4": "Governance remains important for responsible and compliant AI use."
    }
  },
  {
    "type": "matching",
    "domain": 2,
    "difficulty": "hard",
    "q": "Match each requirement to the MOST appropriate model type.",
    "rows": [
      "Generate and understand long-form natural-language text",
      "Create photorealistic images from text prompts",
      "Process text, image, and audio together",
      "Serve as a broad pretrained base that can be adapted to many downstream tasks"
    ],
    "choices": [
      "Foundation model",
      "Diffusion model",
      "Large language model",
      "Multimodal model"
    ],
    "ans": [
      2,
      1,
      3,
      0
    ],
    "why": "LLMs focus on language, diffusion models are associated with image generation from noise, multimodal models combine multiple data types, and foundation models are broad pretrained bases that can be adapted to downstream tasks. The matching tests the scope of each model type.",
    "clue": "language vs image generation vs multiple modalities vs broad pretrained base",
    "tip": "LLM = language; diffusion = image generation; multimodal = multiple data types; FM = adaptable pretrained base.",
    "reference": "Tutorials Dojo – Domain 2 > Foundational Concepts of Generative AI"
  },
  {
    "domain": 3,
    "difficulty": "easy",
    "q": "A legal assistant must answer questions using the firm’s internal policies, which change every week. The firm wants to avoid retraining the foundation model whenever a policy changes. Which approach is MOST appropriate?",
    "opts": [
      "Train a new foundation model from scratch",
      "Retrieval Augmented Generation (RAG)",
      "Increase model temperature",
      "Use only a longer system prompt with no retrieval source"
    ],
    "ans": [
      1
    ],
    "why": "RAG retrieves current external information at inference time and supplies it to the model as context without changing model weights. It is well suited to proprietary or frequently changing documents.",
    "clue": "frequently changing private documents + no retraining",
    "tip": "Current/proprietary facts without retraining -> RAG.",
    "reference": "Tutorials Dojo – Domain 3 > Retrieval Augmented Generation (RAG)",
    "incorrect": {
      "0": "Training a new FM from scratch would be far more expensive and unnecessary for changing policy content.",
      "2": "Temperature changes randomness, not the model’s access to current policies.",
      "3": "A static prompt without retrieval will not reliably supply changing policy content."
    }
  },
  {
    "domain": 3,
    "difficulty": "easy",
    "q": "A company has thousands of labeled examples showing exactly how support replies should be formatted and written. It wants the model to consistently adopt that behavior across future conversations. Which customization technique BEST fits?",
    "opts": [
      "Vector search only",
      "RAG",
      "Zero-shot prompting",
      "Fine-tuning"
    ],
    "ans": [
      3
    ],
    "why": "Fine-tuning further trains a pretrained model on labeled examples so the model learns task-specific behavior such as style or response format. The requirement is persistent behavior change rather than retrieval of changing facts.",
    "clue": "labeled examples + persistent style/format behavior",
    "tip": "Facts -> RAG. Persistent behavior/style from labeled examples -> fine-tuning.",
    "reference": "Tutorials Dojo – Domain 3 > Training and Fine-Tuning > Fine-Tuning",
    "incorrect": {
      "1": "RAG injects retrieved knowledge at inference time but does not train the model to permanently adopt a response style.",
      "2": "Zero-shot prompting uses no examples and only affects the current prompt.",
      "0": "Vector search retrieves similar items but does not update model behavior."
    }
  },
  {
    "domain": 3,
    "difficulty": "medium",
    "q": "A biomedical organization has a very large collection of unlabeled domain text. It wants a base model to become more familiar with biomedical language before later task-specific tuning. Which method is MOST appropriate?",
    "opts": [
      "Model monitoring",
      "Few-shot prompting",
      "Batch inference",
      "Continuous pre-training"
    ],
    "ans": [
      3
    ],
    "why": "Continuous pre-training continues training a pretrained model on additional domain-specific data to adapt its underlying knowledge and vocabulary. The source data can be unlabeled domain text.",
    "clue": "large unlabeled domain corpus + adapt base knowledge",
    "tip": "Unlabeled domain corpus to deepen domain knowledge -> continuous pre-training.",
    "reference": "Tutorials Dojo – Domain 3 > Training and Fine-Tuning > Continuous Pre-Training",
    "incorrect": {
      "1": "Few-shot prompting supplies a small number of examples at inference time and does not adapt base model weights.",
      "2": "Batch inference is a deployment pattern, not a training method.",
      "0": "Model monitoring observes deployed model behavior and does not teach domain knowledge."
    }
  },
  {
    "domain": 3,
    "difficulty": "medium",
    "q": "A prompt gives exactly one worked example of the desired input and output format before presenting a new task. Which prompting technique is this?",
    "opts": [
      "Zero-shot learning",
      "Negative prompting",
      "Few-shot learning",
      "One-shot learning"
    ],
    "ans": [
      3
    ],
    "why": "One-shot prompting gives the model a single example to demonstrate the desired task or format. It sits between zero-shot, which provides no examples, and few-shot, which provides several.",
    "clue": "exactly one example",
    "tip": "0 examples = zero-shot; 1 = one-shot; a few = few-shot.",
    "reference": "Tutorials Dojo – Domain 3 > Prompt Engineering > One-Shot Learning",
    "incorrect": {
      "0": "Zero-shot prompting provides no examples.",
      "2": "Few-shot prompting provides multiple examples rather than exactly one.",
      "1": "Negative prompting specifies what to avoid rather than demonstrating one example."
    }
  },
  {
    "domain": 3,
    "difficulty": "easy",
    "q": "A creative-writing application needs more varied and imaginative responses from the same prompt. Which inference setting should the team adjust upward?",
    "opts": [
      "Temperature",
      "Maximum input length",
      "Embedding dimension",
      "Number of training labels"
    ],
    "ans": [
      0
    ],
    "why": "Temperature controls randomness in generation. Increasing temperature generally produces more varied and creative outputs, while lowering it produces more focused and predictable responses.",
    "clue": "more varied and imaginative generation",
    "tip": "Higher temperature -> more randomness/creativity. Lower temperature -> more focused output.",
    "reference": "Tutorials Dojo – Domain 3 > Effect of Inference Parameters > Temperature",
    "incorrect": {
      "1": "Input length controls how much prompt content can be accepted, not generation randomness.",
      "2": "Embedding dimension concerns vector representations rather than sampling creativity.",
      "3": "Training labels are part of model training and are not an inference parameter."
    }
  },
  {
    "domain": 3,
    "difficulty": "medium",
    "q": "A company is comparing foundation models for a global application. The application must answer in several customer languages without adding a separate translation workflow. Which model-selection criterion is MOST important?",
    "opts": [
      "Whether the model was evaluated on only English prompts",
      "Training job duration",
      "Number of S3 buckets",
      "Multilingual support"
    ],
    "ans": [
      3
    ],
    "why": "Multilingual support determines whether the model can directly handle the required languages. The application requirement is language coverage, not infrastructure inventory or training duration.",
    "clue": "serve users in several languages directly",
    "tip": "Global multilingual use case -> check multilingual support.",
    "reference": "Tutorials Dojo – Domain 3 > Selection Criteria to Choose Pre-Trained Model > Multilingual Support",
    "incorrect": {
      "1": "Training duration does not determine whether the deployed model supports the needed languages.",
      "2": "S3 bucket count is unrelated to FM language capability.",
      "0": "English-only evaluation would not establish the required multilingual capability."
    }
  },
  {
    "domain": 3,
    "difficulty": "medium",
    "q": "A semantic-search application needs to store text embeddings and perform similarity searches. Which AWS service is identified in the study guide as an option for vector search?",
    "opts": [
      "Amazon Polly",
      "Amazon OpenSearch Service",
      "AWS Artifact",
      "Amazon Transcribe"
    ],
    "ans": [
      1
    ],
    "why": "Amazon OpenSearch Service can store and search vector embeddings for similarity-based retrieval use cases. It is a vector-store option for semantic search and RAG architectures.",
    "clue": "store embeddings + similarity search",
    "tip": "Vector similarity search on AWS -> OpenSearch Service is a key option.",
    "reference": "Tutorials Dojo – Domain 3 > AWS Services That Help Store Embeddings Within Vector Databases > Amazon OpenSearch Service",
    "incorrect": {
      "0": "Polly converts text to speech.",
      "2": "Artifact provides AWS compliance reports and agreements.",
      "3": "Transcribe converts audio to text."
    }
  },
  {
    "domain": 3,
    "difficulty": "medium",
    "q": "A product team has no labeled training dataset. It wants the lowest-cost way to improve an FM response format for a temporary campaign that lasts two weeks. Which approach is MOST appropriate?",
    "opts": [
      "Pre-training a new foundation model",
      "Fine-tuning",
      "Prompt engineering",
      "Continuous pre-training"
    ],
    "ans": [
      2
    ],
    "why": "Prompt engineering is the least expensive and fastest option when a team wants a temporary behavior change and has no training dataset. Fine-tuning and additional pre-training require data and training effort.",
    "clue": "temporary behavior change + no training data + lowest cost",
    "tip": "Quick behavior tweak with no training data -> prompt engineering.",
    "reference": "Tutorials Dojo – Domain 3 > Cost Tradeoffs of Foundation Model Customization",
    "incorrect": {
      "1": "Fine-tuning requires task-specific training data and more training cost.",
      "0": "Pre-training a new FM is far more expensive and unnecessary for a temporary formatting need.",
      "3": "Continuous pre-training requires additional domain data and training to adapt model knowledge."
    }
  },
  {
    "domain": 3,
    "difficulty": "medium",
    "q": "A company is preparing data for foundation-model fine-tuning. It discovers that one customer group appears only rarely in the training examples. Which data-preparation concern should the team address?",
    "opts": [
      "Inference latency",
      "Representativeness",
      "Provisioned throughput",
      "Output token limit"
    ],
    "ans": [
      1
    ],
    "why": "Representativeness means the fine-tuning data should adequately cover the populations and cases the model is expected to handle. Underrepresented groups can lead to uneven model behavior.",
    "clue": "one group is poorly represented in training examples",
    "tip": "Fine-tuning data should reflect the real population and use cases -> representativeness.",
    "reference": "Tutorials Dojo – Domain 3 > Prepare Data to Fine-Tune a Foundation Model > Representativeness",
    "incorrect": {
      "0": "Inference latency is a runtime performance concern, not a dataset composition issue.",
      "2": "Provisioned throughput concerns serving capacity, not training-data balance.",
      "3": "Output length controls generation size rather than representation in the training set."
    }
  },
  {
    "domain": 3,
    "difficulty": "hard",
    "q": "A model is being aligned to human preferences. Reviewers compare candidate responses and provide feedback indicating which responses are better. Which method does this describe?",
    "opts": [
      "Reinforcement Learning from Human Feedback (RLHF)",
      "Unsupervised clustering",
      "Batch transform",
      "Semantic chunking"
    ],
    "ans": [
      0
    ],
    "why": "RLHF uses human feedback or preference judgments to guide reinforcement learning and align model behavior with desired responses. The key clue is humans evaluating which model outputs are preferred.",
    "clue": "humans express preferences over model responses",
    "tip": "Human preference feedback used to align an LLM -> RLHF.",
    "reference": "Tutorials Dojo – Domain 3 > Prepare Data to Fine-Tune a Foundation Model > RLHF",
    "incorrect": {
      "1": "Clustering groups unlabeled data and does not use preference feedback to align model behavior.",
      "2": "Batch transform is an inference/deployment pattern.",
      "3": "Chunking divides content into retrieval units and is unrelated to human preference alignment."
    }
  },
  {
    "domain": 3,
    "difficulty": "easy",
    "q": "A company evaluates machine-translated sentences by measuring n-gram overlap with trusted reference translations. Which metric is MOST appropriate?",
    "opts": [
      "BLEU",
      "ROUGE",
      "BERTScore only because wording must be identical",
      "Mean squared error"
    ],
    "ans": [
      0
    ],
    "why": "BLEU is commonly used to evaluate machine translation by comparing n-gram overlap between generated and reference text. ROUGE is more strongly associated with summarization.",
    "clue": "machine translation + reference text + n-gram overlap",
    "tip": "Translation overlap -> BLEU. Summary coverage -> ROUGE.",
    "reference": "Tutorials Dojo – Domain 3 > Relevant Metrics to Assess Foundation Model Performance > BLEU",
    "incorrect": {
      "1": "ROUGE is primarily associated with summarization and recall-oriented overlap.",
      "2": "BERTScore evaluates semantic similarity and does not require identical wording; the question specifically asks for the translation n-gram metric.",
      "3": "Mean squared error is a numeric regression metric."
    }
  },
  {
    "domain": 3,
    "difficulty": "hard",
    "q": "Two generated answers use different wording from the reference answer but preserve nearly the same meaning. The team wants an evaluation metric that is sensitive to semantic similarity rather than only exact word overlap. Which metric should it use?",
    "opts": [
      "BLEU",
      "BERTScore",
      "ROUGE",
      "Accuracy"
    ],
    "ans": [
      1
    ],
    "why": "BERTScore uses contextual embeddings to compare semantic similarity between generated and reference text. It can give credit when wording differs but meaning remains similar.",
    "clue": "same meaning with different wording",
    "tip": "Meaning/semantic similarity despite paraphrasing -> BERTScore.",
    "reference": "Tutorials Dojo – Domain 3 > Relevant Metrics to Assess Foundation Model Performance > BERTScore",
    "incorrect": {
      "0": "BLEU primarily measures n-gram overlap and may penalize valid paraphrases.",
      "2": "ROUGE also focuses on overlap and is commonly used for summarization coverage.",
      "3": "Accuracy is a classification-style metric and does not directly score semantic similarity between generated texts."
    }
  },
  {
    "domain": 3,
    "difficulty": "medium",
    "q": "A company is deciding between two foundation models for a customer-support assistant. It wants employees to directly rate helpfulness, tone, and correctness of sample answers. Which evaluation approach BEST fits?",
    "opts": [
      "Only model size comparison",
      "Only training loss",
      "Human evaluation",
      "Only inference cost comparison"
    ],
    "ans": [
      2
    ],
    "why": "Human evaluation is appropriate when people need to judge qualities such as helpfulness, tone, coherence, and correctness that may not be fully captured by automatic metrics. The reviewers directly assess model outputs.",
    "clue": "people directly rate output quality",
    "tip": "Subjective qualities such as helpfulness/tone -> human evaluation.",
    "reference": "Tutorials Dojo – Domain 3 > Approaches to Evaluate Foundation Model Performance > Human Evaluation",
    "incorrect": {
      "1": "Training loss measures optimization during training and does not directly capture employee judgments of helpfulness or tone.",
      "0": "Model size is a deployment/complexity characteristic, not an output-quality judgment.",
      "3": "Inference cost is a business/performance metric, not a direct assessment of response quality."
    }
  },
  {
    "domain": 3,
    "difficulty": "medium",
    "q": "A company deploys a generative AI assistant and wants to determine whether it is improving the business outcome it was designed for. Which metric is MOST aligned with that goal?",
    "opts": [
      "Task completion or user engagement for the target workflow",
      "Number of parameters in the foundation model",
      "Number of tokens in the training corpus",
      "Count of AWS Regions in the account"
    ],
    "ans": [
      0
    ],
    "why": "Business-objective evaluation should measure whether users successfully complete the intended task or become more engaged with the application. Model size and training corpus size do not directly show business value.",
    "clue": "does the model improve the intended business outcome?",
    "tip": "Business success -> measure task completion, productivity, engagement, or another target KPI.",
    "reference": "Tutorials Dojo – Domain 3 > Determine Whether a Foundation Model Effectively Meets Business Objectives",
    "incorrect": {
      "1": "Parameter count is a model characteristic, not a business outcome.",
      "2": "Training-corpus size does not show whether the deployed solution is meeting its business objective.",
      "3": "AWS Region count is unrelated to model business effectiveness."
    }
  },
  {
    "domain": 3,
    "difficulty": "hard",
    "q": "A company is selecting a pre-trained FM for an application. Which TWO requirements should be treated as direct model-selection criteria? (Select TWO.)",
    "opts": [
      "The model must accept image input in addition to text.",
      "The development team prefers a blue dashboard theme.",
      "The office network uses a particular Wi-Fi vendor.",
      "The company has three Git repositories.",
      "The model must return responses within the application’s latency target."
    ],
    "ans": [
      0,
      4
    ],
    "why": "Modality and latency are explicit FM-selection criteria because they determine whether the model can process the required data types and meet responsiveness goals. The remaining options are unrelated implementation details.",
    "clue": "required input modality + latency target",
    "tip": "FM selection clues: modality, latency, size, complexity, customization, language support, input/output length, and cost.",
    "reference": "Tutorials Dojo – Domain 3 > Selection Criteria to Choose Pre-Trained Model",
    "incorrect": {
      "1": "Dashboard appearance does not affect model suitability.",
      "2": "Wi-Fi vendor is unrelated to foundation-model capabilities.",
      "3": "Repository count is not a model-selection criterion."
    }
  },
  {
    "domain": 3,
    "difficulty": "medium",
    "q": "Which TWO data characteristics are important when preparing a dataset for fine-tuning a foundation model? (Select TWO.)",
    "opts": [
      "The dataset should intentionally exclude difficult cases.",
      "The examples should be representative of the expected users and tasks.",
      "Every example must come from a single demographic group.",
      "The dataset should be selected only by file size, regardless of content quality.",
      "Labels should accurately reflect the desired outputs when labeled training data is required."
    ],
    "ans": [
      1,
      4
    ],
    "why": "Fine-tuning data should be representative of the target use case and, when supervised examples are used, should have accurate labels. Poor representation or labeling quality can teach the model the wrong behavior.",
    "clue": "representative examples + accurate labels",
    "tip": "Fine-tuning quality depends on curation, labeling, size, governance, and representativeness.",
    "reference": "Tutorials Dojo – Domain 3 > Prepare Data to Fine-Tune a Foundation Model",
    "incorrect": {
      "0": "Excluding difficult cases can make the dataset less representative of real use.",
      "2": "Using only one demographic group can create representation gaps and bias.",
      "3": "File size alone does not establish data quality or suitability."
    }
  },
  {
    "domain": 3,
    "difficulty": "medium",
    "q": "Which TWO statements correctly describe Retrieval Augmented Generation (RAG)? (Select TWO.)",
    "opts": [
      "It always requires training a new foundation model from scratch.",
      "It is primarily a method for increasing image resolution.",
      "It removes the need to retrieve documents at query time.",
      "It can provide a model with current or proprietary knowledge at inference time.",
      "It can improve grounding without requiring the foundation model weights to be retrained."
    ],
    "ans": [
      3,
      4
    ],
    "why": "RAG retrieves relevant external information and inserts that information into the model context at inference time. This allows current or private knowledge to be used without retraining the FM weights.",
    "clue": "external current knowledge + no weight update",
    "tip": "RAG retrieves facts at query time; it does not retrain the base model.",
    "reference": "Tutorials Dojo – Domain 3 > Retrieval Augmented Generation (RAG)",
    "incorrect": {
      "0": "RAG specifically avoids the need to train a new FM from scratch.",
      "1": "RAG is a knowledge-retrieval and grounding technique, not an image-resolution method.",
      "2": "Document retrieval is the defining step that provides external context in RAG."
    }
  },
  {
    "domain": 3,
    "difficulty": "hard",
    "q": "A team wants to evaluate two foundation models before selection. Which TWO approaches are identified in the study guide for evaluating FM performance? (Select TWO.)",
    "opts": [
      "Human evaluation",
      "Changing IAM policies",
      "Increasing the temperature until outputs look diverse",
      "Moving data to another AWS Region",
      "Benchmark datasets"
    ],
    "ans": [
      0,
      4
    ],
    "why": "Foundation models can be evaluated with human reviewers and benchmark datasets. These approaches assess output quality or model performance, while IAM, temperature experimentation, and data location are not evaluation methodologies by themselves.",
    "clue": "evaluate FM quality before model selection",
    "tip": "FM evaluation approaches include human evaluation and benchmark datasets.",
    "reference": "Tutorials Dojo – Domain 3 > Approaches to Evaluate Foundation Model Performance",
    "incorrect": {
      "1": "IAM policies control permissions rather than model quality.",
      "2": "Temperature affects sampling behavior but is not, by itself, an evaluation approach.",
      "3": "Changing Regions concerns deployment/governance rather than performance evaluation."
    }
  },
  {
    "domain": 4,
    "difficulty": "easy",
    "q": "A recruiting model is trained on data that underrepresents several demographic groups. The company wants the model to perform equitably across those groups. Which responsible AI principle is MOST directly involved?",
    "opts": [
      "Fairness",
      "Latency",
      "Availability",
      "Token efficiency"
    ],
    "ans": [
      0
    ],
    "why": "Fairness concerns whether AI systems treat relevant groups equitably and avoid systematic disadvantage. Representation in training data is a key factor in reducing biased outcomes.",
    "clue": "equitable performance across demographic groups",
    "tip": "Group equity and bias -> fairness.",
    "reference": "Tutorials Dojo – Domain 4 > Features of Responsible AI > Fairness",
    "incorrect": {
      "1": "Latency is a performance characteristic, not an ethical equity principle.",
      "2": "Availability concerns service uptime.",
      "3": "Token efficiency concerns resource usage rather than demographic equity."
    }
  },
  {
    "domain": 4,
    "difficulty": "medium",
    "q": "A medical prediction system sends low-confidence decisions to a clinician for review before any action is taken. Which AWS service supports this human-review workflow?",
    "opts": [
      "AWS Artifact",
      "Amazon SageMaker Model Monitor",
      "Amazon Augmented AI (Amazon A2I)",
      "Amazon Kendra"
    ],
    "ans": [
      2
    ],
    "why": "Amazon A2I supports human-in-the-loop review of machine-learning predictions. The key requirement is routing uncertain results to people for review rather than merely monitoring drift or documenting compliance.",
    "clue": "low-confidence predictions require human review",
    "tip": "Human review loop -> A2I.",
    "reference": "Tutorials Dojo – Domain 4 > Tools for Detecting and Monitoring Bias, Trustworthiness, and Truthfulness > Amazon Augmented AI",
    "incorrect": {
      "1": "Model Monitor observes deployed model/data quality changes over time.",
      "0": "Artifact provides compliance reports and agreements.",
      "3": "Kendra is enterprise search."
    }
  },
  {
    "domain": 4,
    "difficulty": "medium",
    "q": "A model passed bias analysis before launch. Six months later, the team wants to detect whether production data quality and model behavior have changed from the original baseline. Which SageMaker capability should the team use?",
    "opts": [
      "Amazon SageMaker Canvas",
      "Amazon SageMaker Ground Truth",
      "Amazon SageMaker JumpStart",
      "Amazon SageMaker Model Monitor"
    ],
    "ans": [
      3
    ],
    "why": "SageMaker Model Monitor is designed to monitor deployed models for production changes such as data or model quality drift. The scenario is about ongoing post-deployment change rather than pre-training analysis or data labeling.",
    "clue": "six months after deployment + detect change from baseline",
    "tip": "Production drift over time -> Model Monitor.",
    "reference": "Tutorials Dojo – Domain 4 > Tools for Detecting and Monitoring Bias, Trustworthiness, and Truthfulness > SageMaker Model Monitor",
    "incorrect": {
      "1": "Ground Truth labels datasets for training.",
      "2": "JumpStart provides pretrained models and solution templates.",
      "0": "Canvas provides a no-code ML experience rather than ongoing drift monitoring."
    }
  },
  {
    "domain": 4,
    "difficulty": "easy",
    "q": "A governance team wants AWS-published documentation describing the intended uses, limitations, and responsible-AI considerations of AWS AI services. Which resource should it consult?",
    "opts": [
      "AWS AI Service Cards",
      "Amazon SageMaker Feature Store",
      "AWS Cost Explorer",
      "Amazon Route 53"
    ],
    "ans": [
      0
    ],
    "why": "AWS AI Service Cards provide information about AWS AI services, including intended use, limitations, and responsible-AI considerations. They help customers understand how to use those services responsibly.",
    "clue": "AWS-published responsible-AI documentation for AWS AI services",
    "tip": "AWS service transparency docs -> AWS AI Service Cards. Your own model documentation -> SageMaker Model Cards.",
    "reference": "Tutorials Dojo – Domain 4 > Transparent and Explainable AI Models > AWS AI Service Cards",
    "incorrect": {
      "1": "Feature Store manages reusable ML features.",
      "2": "Cost Explorer analyzes AWS spending and usage.",
      "3": "Route 53 is a DNS service."
    }
  },
  {
    "domain": 4,
    "difficulty": "medium",
    "q": "A design team repeatedly interviews end users, tests whether explanations are understandable, and changes the interface based on user feedback. Which responsible-AI design approach does this demonstrate?",
    "opts": [
      "Model distillation",
      "Human-centered design",
      "Unsupervised learning",
      "Batch inference"
    ],
    "ans": [
      1
    ],
    "why": "Human-centered design involves end users throughout the design process and incorporates their feedback so AI explanations and interfaces are useful and understandable. The emphasis is on the people affected by the system.",
    "clue": "involve users + test explanations + incorporate feedback",
    "tip": "Design with users, not just for users -> human-centered design.",
    "reference": "Tutorials Dojo – Domain 4 > Principles of Human-Centered Design for Explainable AI",
    "incorrect": {
      "0": "Model distillation is a model-compression/training concept.",
      "2": "Unsupervised learning finds patterns in unlabeled data.",
      "3": "Batch inference is an offline prediction pattern."
    }
  },
  {
    "domain": 4,
    "difficulty": "hard",
    "q": "A regulated decision system must provide explanations that auditors can readily understand. A highly complex model is slightly more accurate, but a simpler model is much easier to interpret. Which tradeoff is the organization evaluating?",
    "opts": [
      "Encryption versus compression",
      "Availability versus durability",
      "Tokenization versus chunking",
      "Interpretability versus performance"
    ],
    "ans": [
      3
    ],
    "why": "Responsible model selection may require balancing predictive performance against interpretability. In regulated contexts, an organization may deliberately choose a simpler model when explainability is more important than a small accuracy gain.",
    "clue": "slightly higher accuracy versus much easier explanation",
    "tip": "Audit-grade explainability can justify choosing a simpler, more interpretable model.",
    "reference": "Tutorials Dojo – Domain 4 > Tradeoffs Between Model Safety and Transparency > Balancing Interpretability and Performance",
    "incorrect": {
      "1": "Availability and durability are infrastructure properties, not the stated model-selection tradeoff.",
      "2": "Tokenization and chunking are text-processing concepts.",
      "0": "Encryption and compression concern data protection/storage rather than explainability."
    }
  },
  {
    "domain": 4,
    "difficulty": "hard",
    "q": "A publisher plans to train a generative AI model using a large collection of third-party books and articles. Which responsible-AI risk should be reviewed BEFORE using the material?",
    "opts": [
      "Whether the S3 bucket name is short",
      "Whether the model can run only in one Availability Zone",
      "Whether the prompts contain exactly 100 tokens",
      "Whether the organization has appropriate rights or licenses to use the content"
    ],
    "ans": [
      3
    ],
    "why": "Training data can create intellectual-property and licensing risks if the organization does not have appropriate rights to use copyrighted material. Responsible AI includes understanding data provenance and legal use constraints.",
    "clue": "third-party copyrighted training material",
    "tip": "Training data provenance and licensing matter for IP risk.",
    "reference": "Tutorials Dojo – Domain 4 > Legal Risks and Challenges in Working with Generative AI > Intellectual Property Infringement Claims",
    "incorrect": {
      "1": "Availability-Zone placement is not the intellectual-property issue described.",
      "2": "Prompt token count does not determine whether training content is legally usable.",
      "0": "Bucket-name length is unrelated to licensing rights."
    }
  },
  {
    "domain": 4,
    "difficulty": "medium",
    "q": "Which TWO dataset practices support responsible AI? (Select TWO.)",
    "opts": [
      "Use a single narrow group even when the model will serve a broad population.",
      "Prefer more data regardless of quality or provenance.",
      "Use balanced data that avoids systematically excluding relevant groups.",
      "Use curated data sources appropriate for the intended purpose.",
      "Ignore labeling quality if the dataset is large enough."
    ],
    "ans": [
      2,
      3
    ],
    "why": "Balanced datasets and carefully curated sources help reduce bias and improve the suitability of training data for responsible AI systems. Dataset size alone does not compensate for poor representation, quality, or provenance.",
    "clue": "balanced + curated training data",
    "tip": "Responsible datasets should be inclusive, diverse, balanced, and curated.",
    "reference": "Tutorials Dojo – Domain 4 > Characteristics of Datasets for Responsible AI",
    "incorrect": {
      "0": "A narrow group can underrepresent the population the model will serve.",
      "1": "More data is not automatically responsible if the data is low quality, biased, or improperly sourced.",
      "4": "Poor labels can directly reduce model quality and trustworthiness."
    }
  },
  {
    "type": "matching",
    "domain": 4,
    "difficulty": "easy",
    "q": "Match each responsible-AI requirement to the AWS capability that BEST addresses it.",
    "rows": [
      "Analyze bias and explain feature influence",
      "Route uncertain predictions to people for review",
      "Document a model’s intended use and limitations",
      "Apply runtime controls to harmful or disallowed generative-AI content"
    ],
    "choices": [
      "Amazon SageMaker Model Cards",
      "Amazon Augmented AI (Amazon A2I)",
      "Amazon SageMaker Clarify",
      "Guardrails for Amazon Bedrock"
    ],
    "ans": [
      2,
      1,
      0,
      3
    ],
    "why": "Clarify addresses bias and explainability, A2I supports human review, Model Cards document model information for governance, and Bedrock Guardrails apply runtime safety controls to generative AI inputs and outputs. The key is to keep analysis, human review, documentation, and runtime filtering distinct.",
    "clue": "bias/explainability vs human review vs documentation vs runtime filtering",
    "tip": "Clarify = bias/why; A2I = human review; Model Cards = documentation; Guardrails = runtime controls.",
    "reference": "Tutorials Dojo – Domain 4 > Tools and Practices for Implementing Responsible AI"
  },
  {
    "domain": 5,
    "difficulty": "easy",
    "q": "An application should be allowed to invoke only the specific SageMaker and Bedrock actions it needs. Which AWS service should administrators use to enforce these permissions?",
    "opts": [
      "Amazon Macie",
      "AWS Identity and Access Management (IAM)",
      "Amazon Polly",
      "AWS Cost Explorer"
    ],
    "ans": [
      1
    ],
    "why": "IAM controls authentication and authorization to AWS resources through users, roles, and policies. Applying least privilege means granting only the actions and resources required by the application.",
    "clue": "grant only required AWS actions and resources",
    "tip": "Permissions/least privilege -> IAM.",
    "reference": "Tutorials Dojo – Domain 5 > Methods to Secure AI Systems > AWS Identity and Access Management",
    "incorrect": {
      "0": "Macie discovers and classifies sensitive data in Amazon S3.",
      "2": "Polly converts text to speech.",
      "3": "Cost Explorer analyzes AWS cost and usage."
    }
  },
  {
    "domain": 5,
    "difficulty": "medium",
    "q": "A company runs an AI application inside a VPC and does not want traffic to a supported AWS service to traverse the public internet. Which AWS networking feature is designed for private service connectivity?",
    "opts": [
      "AWS Budgets",
      "Amazon CloudFront",
      "Amazon Route 53 public hosted zones",
      "AWS PrivateLink"
    ],
    "ans": [
      3
    ],
    "why": "AWS PrivateLink provides private connectivity to supported AWS services through VPC endpoints without requiring traffic to traverse the public internet. This supports network isolation requirements for sensitive workloads.",
    "clue": "private connectivity from a VPC to AWS services",
    "tip": "Keep service traffic private -> PrivateLink/VPC endpoint.",
    "reference": "Tutorials Dojo – Domain 5 > Methods to Secure AI Systems > AWS PrivateLink",
    "incorrect": {
      "1": "CloudFront is a content-delivery service and does not provide the private service endpoint described.",
      "2": "A public hosted zone is for public DNS resolution, not private service connectivity.",
      "0": "Budgets tracks and alerts on AWS spending."
    }
  },
  {
    "domain": 5,
    "difficulty": "easy",
    "q": "An auditor asks who called an AWS API, which action was requested, and when the call occurred. Which service provides this activity history?",
    "opts": [
      "Amazon Inspector",
      "AWS Config",
      "AWS CloudTrail",
      "Amazon Macie"
    ],
    "ans": [
      2
    ],
    "why": "AWS CloudTrail records AWS API activity and events, providing an audit trail of who performed which actions and when. It is the primary service for API-level activity auditing.",
    "clue": "who called which AWS API and when",
    "tip": "API activity audit trail -> CloudTrail.",
    "reference": "Tutorials Dojo – Domain 5 > Governance and Regulation Compliance > AWS CloudTrail",
    "incorrect": {
      "1": "AWS Config tracks resource configuration state and evaluates configuration compliance.",
      "0": "Inspector identifies software vulnerabilities and unintended network exposure in supported workloads.",
      "3": "Macie discovers sensitive data in Amazon S3."
    }
  },
  {
    "domain": 5,
    "difficulty": "medium",
    "q": "A governance team wants to continuously evaluate whether AWS resource configurations comply with required rules. Which service should it use?",
    "opts": [
      "Amazon Transcribe",
      "AWS Artifact",
      "AWS Config",
      "Amazon Personalize"
    ],
    "ans": [
      2
    ],
    "why": "AWS Config records resource configuration changes and can evaluate resources against configuration rules for compliance. The requirement is configuration-state compliance rather than downloading audit reports.",
    "clue": "evaluate resource configurations against rules",
    "tip": "Configuration compliance -> AWS Config. Compliance documents -> AWS Artifact.",
    "reference": "Tutorials Dojo – Domain 5 > Governance and Regulation Compliance > AWS Config",
    "incorrect": {
      "1": "Artifact provides AWS compliance documentation and agreements, not continuous configuration evaluation.",
      "0": "Transcribe converts speech to text.",
      "3": "Personalize provides recommendations."
    }
  },
  {
    "domain": 5,
    "difficulty": "medium",
    "q": "A security team needs a managed service that scans supported AWS workloads for software vulnerabilities and unintended network exposure. Which service is MOST appropriate?",
    "opts": [
      "Amazon Kendra",
      "AWS Audit Manager",
      "Amazon Inspector",
      "Amazon Translate"
    ],
    "ans": [
      2
    ],
    "why": "Amazon Inspector is used for vulnerability management and helps identify software vulnerabilities and unintended network exposure in supported AWS workloads. This is distinct from evidence collection or enterprise search.",
    "clue": "software vulnerabilities + unintended network exposure",
    "tip": "Vulnerability management -> Amazon Inspector.",
    "reference": "Tutorials Dojo – Domain 5 > Governance and Regulation Compliance > Amazon Inspector",
    "incorrect": {
      "1": "Audit Manager helps collect evidence for audits and compliance assessments.",
      "0": "Kendra is enterprise search.",
      "3": "Translate converts text between languages."
    }
  },
  {
    "domain": 5,
    "difficulty": "easy",
    "q": "A compliance team wants to automate collection of evidence from AWS resources so it can assess controls against a compliance framework. Which AWS service BEST fits?",
    "opts": [
      "Amazon Rekognition",
      "AWS Artifact",
      "AWS CloudTrail only",
      "AWS Audit Manager"
    ],
    "ans": [
      3
    ],
    "why": "AWS Audit Manager helps automate evidence collection and organize evidence for assessing controls against compliance frameworks. Artifact provides AWS reports, while CloudTrail supplies activity logs rather than the complete assessment workflow.",
    "clue": "automate evidence collection for control assessments",
    "tip": "Audit evidence collection/assessment -> Audit Manager. AWS compliance reports -> Artifact.",
    "reference": "Tutorials Dojo – Domain 5 > Governance and Regulation Compliance > AWS Audit Manager",
    "incorrect": {
      "1": "Artifact is the portal for AWS compliance reports and agreements, not the service for automating your control evidence collection.",
      "2": "CloudTrail records API activity but does not by itself manage a full compliance assessment framework.",
      "0": "Rekognition is a computer-vision service."
    }
  },
  {
    "domain": 5,
    "difficulty": "easy",
    "q": "A security team needs to discover and classify personally identifiable information stored in Amazon S3. Which AWS service is designed for this task?",
    "opts": [
      "AWS KMS",
      "Amazon Macie",
      "AWS CloudTrail",
      "Amazon Polly"
    ],
    "ans": [
      1
    ],
    "why": "Amazon Macie uses machine learning and pattern matching to discover and help protect sensitive data in Amazon S3. It is the service associated with identifying PII and other sensitive information in S3 data.",
    "clue": "discover sensitive/PII data in S3",
    "tip": "Sensitive data discovery in S3 -> Macie.",
    "reference": "Tutorials Dojo – Domain 5 > Methods to Secure AI Systems > Amazon Macie",
    "incorrect": {
      "0": "KMS manages encryption keys; it does not discover which objects contain PII.",
      "2": "CloudTrail records AWS API activity.",
      "3": "Polly converts text to speech."
    }
  },
  {
    "domain": 5,
    "difficulty": "medium",
    "q": "Which TWO controls directly protect the confidentiality of AI training data while it is stored and while it is moving across a network? (Select TWO.)",
    "opts": [
      "Encrypt data at rest with AWS KMS-managed keys.",
      "Increase model temperature.",
      "Store the data without encryption but restrict prompt length.",
      "Disable logging to avoid creating audit records.",
      "Use TLS/SSL to protect data in transit."
    ],
    "ans": [
      0,
      4
    ],
    "why": "Encryption at rest protects stored data, and TLS/SSL protects data in transit. These controls address confidentiality during storage and transmission, while model sampling settings and logging choices do not replace encryption.",
    "clue": "protect stored data + protect data while moving",
    "tip": "At rest -> encryption/KMS. In transit -> TLS/SSL.",
    "reference": "Tutorials Dojo – Domain 5 > Secure Data Engineering > Encryption at Rest and in Transit",
    "incorrect": {
      "1": "Temperature controls model generation randomness, not data confidentiality.",
      "2": "Prompt length does not encrypt stored data.",
      "3": "Disabling logging reduces auditability and does not protect data in transit or at rest."
    }
  },
  {
    "domain": 5,
    "difficulty": "medium",
    "q": "Which TWO governance practices help an organization keep its AI controls effective over time? (Select TWO.)",
    "opts": [
      "Assume controls never need revision after launch.",
      "Establish a regular review cadence for policies and controls.",
      "Avoid documenting policies so teams can act independently.",
      "Remove audit trails after every release.",
      "Train teams on governance requirements and responsibilities."
    ],
    "ans": [
      1,
      4
    ],
    "why": "Governance is an ongoing process that includes periodic review and ensuring teams understand required policies and responsibilities. Static, undocumented, or unauditable practices weaken governance over time.",
    "clue": "ongoing review + team understanding",
    "tip": "Governance is continuous: review policies regularly and train the people who apply them.",
    "reference": "Tutorials Dojo – Domain 5 > Processes to Follow Governance Protocols",
    "incorrect": {
      "0": "AI systems, risks, and regulations can change, so controls require periodic review.",
      "2": "Documented policies are important for consistent governance and accountability.",
      "3": "Audit trails support oversight and should not be discarded as a routine governance practice."
    }
  }
];

  const questions = raw.map(o => o.type === "matching" ? match(o) : q(o));
  window.aifExamData.mockExam3 = {
    id: "mock-exam-3",
    kind: "mock",
    title: "Mock Exam 3",
    subtitle: "Full AIF-C01 Practice Exam",
    weight: "Full Mock",
    durationSeconds: 5400,
    passPercent: 72,
    questions
  };
})();
