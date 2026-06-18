---
description: Index of published articles and videos. Keep current — used by ideation and introspection skills to track coverage and suggest derivatives. Run maintenance/update-references/ at the start of any session that reads this file.
---

## Articles (Substack)

**Agent Harnesses — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/agent-harnesses-intuitively-and-exhaustively
Introduces Agent Harnesses, a standardized framework for organizing AI agent development that builds on the Agent Skills standard. The harness structure consists of a HARNESS.md metadata file, a skills directory, and reference documents. The framework uses progressive disclosure so agents load only the resources relevant to each task.

**Agent Skills — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/agent-skills-intuitively-and-exhaustively
Explains Agent Skills, an emerging open standard for defining reusable instructions and resources for AI agents across platforms. A skill is a folder structure built around a SKILL.md file that guides agents through specific tasks. Covers the anatomy of skills, practical implementation in Claude Code, and how skills bridge constrained and unconstrained agent architectures.

**Developing Native Android Applications in Kotlin — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/developing-native-android-applications
A comprehensive guide to native Android development in Kotlin, covering activities, views, fragments, and XML layouts through a hands-on example app. Explains why Kotlin is preferred over Java for Android and demonstrates practical UI work including styling and animations, with a look at modern approaches like Jetpack Compose.

**Agile Project Management — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/agile-project-management-intuitively
Explores agile project management for software teams, contrasting it with waterfall approaches. Covers core philosophies, Kanban and Scrum methodologies, practical ticket templates, sprint ceremonies, and a hybrid approach suitable for both new and established products.

**Combinatorics in Probability — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/combinatorics-in-probability-intuitively
Introduces combinatorics as the foundation for understanding probability, teaching how to count outcomes in complex situations. Covers sampling with and without replacement, n-choose-k, permutations, derangements, and counting-by-category strategies through real-world probability problems.

**Don't Be Distracted In 2026**
https://iaee.substack.com/p/dont-be-distracted-in-2026
Practical strategies for managing digital distractions and reclaiming personal time. Recommends specific tools like Minimalist Phone, Unhook, and News Feed Eradicator, suggests productive alternatives for leisure, and advocates simple task management to align daily actions with longer-term goals.

**Docker, Kubernetes, and Helm — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/docker-kubernetes-and-helm-intuitively
Explains how Docker, Kubernetes, and Helm work together to build scalable backend infrastructure. Covers containerization, multi-machine orchestration, and Helm templating through two practical examples: a distributed Pi estimation system and a chess application.

**Apache Spark — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/apache-spark-intuitively-and-exhaustively
Explains Apache Spark, a distributed computing system for large-scale data processing. Covers Spark's origins as an improvement over Hadoop, core concepts like RDDs and lazy evaluation, and practical implementation with code examples. Also explores how DataFrames and SQL integrate with Spark's parallelization architecture.

**AI Generated In-Text Citations — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/ai-generated-in-text-citations-intuitively
Demonstrates how to implement in-text citations in LLM-powered applications using RAG. By assigning unique identifiers to retrieved source chunks and instructing the model to reference them, developers can link AI-generated responses directly to supporting evidence. Includes code examples using GroundX and shows how citations can render as clickable UI elements.

**Transformer XL Positional Encoding — By Hand**
https://iaee.substack.com/p/transformer-xl-positional-encoding
A step-by-step walkthrough of Transformer XL's relative positional encoding mechanism. Explains how the model calculates positional information relative to the current token through four attention terms — content-based, content-position-based, and two global bias terms — enabling better generalization to longer sequences than absolute positional encoding.

**Positional Encoding — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/positional-encoding-intuitively-and
Explains how transformer-based models understand sequence order through positional encoding. Progressively covers five approaches: additive sinusoidal encoding from the original transformer, learned embeddings from GPT, relative position schemes from Transformer-XL, bucketed relative bias from T5, and rotary positional encoding (RoPE) used in contemporary systems.

**UV — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/uv-intuitively-and-exhaustively-explained
Introduces UV, a Python project and package manager written in Rust. Covers core commands (uv init, uv add, uv run) and how it manages dependencies and Python versions, positioning it as a fast, intuitive alternative to pip and virtualenv for managing multiple projects.

**Agent To Agent Protocol — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/agent-to-agent-protocol-intuitively
Explores A2A (Agent to Agent Protocol), a new communication standard enabling LLM agents to interact with one another. Provides foundational context on related technologies like LLMs, chain-of-thought prompting, RAG, and MCP, then demonstrates practical implementation through progressively complex examples — from basic A2A servers to a multi-agent travel booking system where travel, airline, and car rental agents collaborate using both A2A and MCP protocols.

**Disentangled Variational Autoencoders — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/disentangled-variational-autoencoders
Explores how autoencoders compress complex data into essential components, progressing from traditional autoencoders to variational autoencoders (VAEs) and finally to disentangled variants (β-VAEs). Explains the mathematical foundations of VAEs including the reparameterization trick and KL divergence, with practical PyTorch implementations demonstrating how these models create smooth, interpretable latent representations.

**Predicting The Pope — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/predicting-the-pope-intuitively-and
Explains how researchers from Bocconi University successfully predicted Robert Prevost's papal election by analyzing the social network of cardinals as a graph structure. The team calculated various centrality metrics — measuring status, information control, and coalition-building capacity — to identify which cardinal would emerge as pope. Demonstrates how graph analysis combined with relationship data can reveal hidden patterns in complex human systems.

**KV Caching — By Hand**
https://iaee.substack.com/p/kv-caching-by-hand
A detailed walkthrough of key-value caching, a technique that saves generated results from previous LLM generation steps to more efficiently generate new output. Demonstrates how caching keys and values during autoregressive text generation eliminates redundant computations across multiple iterations, using a simplified transformer model with concrete mathematical examples to illustrate the efficiency gains.

**Cache Augmented Generation — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/cache-augmented-generation-intuitively
Introduces Cache Augmented Generation (CAG), a method for efficiently injecting large contextual information into language models by leveraging key-value caching rather than traditional retrieval. Explains how CAG pre-computes a model's internal representations of context and stores them, then reuses those cached computations across multiple queries, avoiding the retrieval errors and latency issues present in RAG systems. Includes practical Python implementation details and discusses CAG's role as a complementary tool to retrieval-augmented generation.

**Graph Convolution — By Hand**
https://iaee.substack.com/p/graph-convolution-by-hand
A detailed mathematical walkthrough of Graph Convolutional Networks (GCNs), demonstrating how to compute graph convolution step-by-step. Covers key concepts including adjacency matrices, degree normalization, and message passing between nodes, explaining how neural networks process information across graph structures to update node representations.

**Genetic Algorithms — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/genetic-algorithms-intuitively-and
Explores how evolution's mechanisms — natural selection, crossover, and mutation — can be adapted to solve complex computational problems. Through two practical examples (university scheduling and traveling salesman with traffic patterns), demonstrates how to represent problems as "DNA," apply fitness functions to evaluate solutions, and iteratively evolve populations toward optimal answers. Emphasizes that genetic algorithms excel when "good enough" solutions suffice, offering a pragmatic alternative to exhaustive searching.

**Structured Query Language — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/structured-query-language-intuitively
A comprehensive guide to SQL from foundational concepts through advanced patterns, designed for both beginners and experienced developers. Covers essential topics including database schema design, CRUD operations, joins, aggregation functions, Common Table Expressions, and window functions. Uses SQLite and Google Colab as teaching tools to demonstrate how complex SQL queries can perform substantial data manipulation and analysis work.

**Testing Document Contextualized AI — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/testing-document-contextualized-ai
Examines how to effectively test RAG and agentic AI systems that rely on document context. Breaks down four major failure points in document-contextualized pipelines — parsing, chunking, search, and prompting — and surveys academic datasets like DocVQA and MPMQA. Provides practical guidance on leveraging existing benchmarks and constructing custom test datasets to validate product performance before deployment.

**Graph Convolutional Networks — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/graph-convolutional-networks-intuitively
Explains how artificial intelligence can be applied to graphs — interconnected data structures like social networks and citation systems. Builds intuition by comparing simple approaches (majority voting, basic neural networks) before introducing Graph Convolutional Networks, which use message passing between connected nodes to make predictions. Uses the Cora dataset of academic papers to demonstrate how GCNs achieve over 80% accuracy at classifying papers by topic.

**Model Context Protocol — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/model-context-protocol-intuitively
Explains Anthropic's Model Context Protocol (MCP), a standardized framework for connecting AI systems to external applications and data sources. Traces MCP's design inspiration from Language Server Protocol, demonstrates practical implementation through Python code examples, and critically examines the gap between MCP's actual capabilities and the ambitious claims surrounding its adoption.

**Graphs — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/graphs-intuitively-and-exhaustively
A comprehensive guide to graph theory, covering nodes and edges, various graph types (directed, undirected, weighted, multigraphs), and practical operations like pathfinding and centrality analysis. Demonstrates real-world applications including traveling salesman problems, exam scheduling through graph coloring, PageRank algorithms, and social network influence maximization using Python and the NetworkX library.

**Dropout — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/dropout-intuitively-and-exhaustively
Explores dropout, a fundamental technique for training AI models that randomly deactivates neurons during training to improve generalization. Explains how overfitting causes models to memorize training data rather than learn underlying patterns, then demonstrates three mechanisms through which dropout mitigates this: reducing co-adaptation of neurons, encouraging redundant representations, and introducing beneficial noise. Concludes with practical PyTorch implementation examples.

**Temperature — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/temperature-intuitively-and-exhaustively
Explores temperature as a fundamental concept in artificial intelligence, drawing parallels to metallurgical principles. Explains how temperature controls randomness in AI model outputs by adjusting probability distributions through the softmax function, allowing developers to balance between deterministic and creative responses. Provides mathematical foundations and practical applications including examples using language models and custom neural networks.

**DeepSeek-R1 — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/deepseek-r1-intuitively-and-exhaustively
Examines DeepSeek-R1, an open-source language model that achieves performance comparable to proprietary systems like OpenAI's o1. Explains the model's training pipeline with particular focus on Group Relative Policy Optimization (GRPO), a reinforcement learning technique that enables enhanced reasoning capabilities. Breaks down foundational concepts like transformers and chain-of-thought reasoning before diving into the mathematical details of GRPO, then concludes with practical examples of running distilled versions locally.

**Neural Networks — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/neural-networks-intuitively-and-exhaustively
A comprehensive guide to neural networks from first principles, beginning with biological neuron inspiration and progressing through perceptrons, activation functions, and the backpropagation training algorithm. Implements a complete neural network from scratch using NumPy, then trains it on a synthetic function to demonstrate how these systems learn and improve through iterative weight adjustments.

**Multi-Headed Cross Attention — By Hand**
https://iaee.substack.com/p/multi-headed-cross-attention-by-hand
A detailed mathematical walkthrough of multi-headed cross attention, a fundamental mechanism enabling AI models to process multiple data types simultaneously. Breaks down nine sequential computational steps — from defining inputs through concatenating outputs — using a concrete example of image and text data interacting, demonstrating how attention mechanisms enable models like ChatGPT and Sora to understand multimodal information.

**A Practical Exploration of Sora — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/a-practical-exploration-of-sora-intuitively
A comprehensive guide to OpenAI's Sora video generation model covering both practical functionality and theoretical foundations. Walks through Sora's UI features — including text-to-video generation, image uploads, storyboarding, and editing tools like remixing and blending — before explaining the underlying diffusion model technology. Explores technical mechanisms like frame injection and gated cross-attention that likely enable sophisticated features such as timeline-based video control and seamless looping.

**Solving a Rubik's Cube with Supervised Learning — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/solving-a-rubiks-cube-with-supervised
Demonstrates how to build an AI model that solves Rubik's Cubes using supervised learning and transformer architecture. Generates a synthetic dataset by randomly scrambling cubes and reversing the move sequences, then trains a transformer-based encoder-decoder model to predict solution moves. Explores practical machine learning concepts including data representation, embedding strategies, positional encoding, and the challenges of training complex neural networks on specialized tasks.

**LLM Routing — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/llm-routing-intuitively-and-exhaustively
Explores LLM routing, a technique for automatically selecting the optimal language model from multiple options to answer user queries. Examines four distinct approaches — AutoMix, RouteLLM's similarity ranking, matrix factorization, and BERT classification — explaining how systems can balance cost and performance by intelligently routing queries to appropriately-sized models rather than defaulting to expensive large models for every request.

**Claude's Computer Use — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/claudes-computer-use-intuitively
Examines Anthropic's computer use capability, which allows Claude to interact with computers by taking screenshots, moving cursors, and clicking. Breaks down how the demo works, explaining the underlying technologies of agents (specifically ReAct-style frameworks) and multimodal AI models that enable Claude to understand both visual and textual information to autonomously complete complex tasks.

**GPU Accelerated Polars — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/gpu-accelerated-polars-intuitively
Introduces GPU-accelerated Polars, a new execution engine enabling GPU computation on dataframes up to 100GB+. Explains foundational concepts like lazy evaluation and query optimization, then demonstrates performance benchmarks showing roughly 75% speed improvements with GPU acceleration compared to CPU processing.

**LangGraph — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/langgraph-intuitively-and-exhaustively
Explores LangGraph, a framework for building reliable LLM agents using graph-based architectures instead of fragile prompt-based approaches. Contrasts traditional ReAct agents with state graphs, which organize agent workflows into interconnected nodes with defined transitions, enabling better control, testability, and iterability. Through practical examples culminating in a complete lead qualification system, demonstrates how developers can combine natural language generation with deterministic logic and validation rules.

**BERT — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/bert-intuitively-and-exhaustively
A comprehensive guide to BERT (Bidirectional Encoder Representations from Transformers), a foundational AI model designed for language understanding rather than generation. Covers transformer architecture fundamentals, explores how BERT differs from decoder-only models like GPT, details its two-stage training approach (pre-training and fine-tuning), and walks through implementing a complete BERT model from scratch using PyTorch for sentiment analysis.

**AI for the Absolute Novice — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/ai-for-the-absolute-novice-intuitively
A comprehensive tutorial guiding complete beginners through building their first AI model from scratch. Covers Python fundamentals, PyTorch library essentials, and neural network theory before walking readers through implementing and training a digit-recognition model on the MNIST dataset, achieving 96% accuracy on test data.

**Multimodal RAG — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/multimodal-rag-intuitively-and-exhaustively
Explores how retrieval-augmented generation (RAG) systems can work with multiple types of data simultaneously. Explains foundational concepts like embeddings and multimodality, then presents three architectural approaches — shared vector spaces, grounded modalities, and separate retrieval — before demonstrating a practical implementation using Google Gemini, a speech-to-text model, and CLIP-style encoders to retrieve relevant information across text, images, and audio.

**Multi-Headed Self Attention — By Hand**
https://iaee.substack.com/p/multi-headed-self-attention-by-hand
A step-by-step mathematical walkthrough of multi-headed self attention, breaking down the cornerstone of modern AI into nine computational stages. Covers input definition, learnable parameter matrices, query/key/value construction, head division, attention matrix calculation via softmax, masking techniques, and output concatenation, enabling readers to understand the mechanism's inner workings at a fundamental level.

**CRAG — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/crag-intuitively-and-exhaustively
Explores Meta's Comprehensive RAG Benchmark (CRAG), an evaluation framework designed to address fundamental limitations in Retrieval Augmented Generation systems. Examines how language models struggle with questions about time-sensitive facts and less popular topics, explaining why tools like knowledge graphs remain essential complements to LLMs. By establishing a benchmark of 4,409 human-annotated questions, CRAG aims to advance more robust and reliable AI systems.

**CUDA for Machine Learning — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/cuda-for-machine-learning-intuitively
A comprehensive guide to building and training neural networks directly on GPUs using CUDA, starting from fundamental computer architecture concepts. Progresses from explaining CPU and GPU hardware differences through implementing custom machine learning components like linear layers, activation functions, and loss calculations entirely in CUDA code, culminating in training a classifier on a binary decision problem.

**YOLO — By Hand**
https://iaee.substack.com/p/yolo-by-hand
A mathematical breakdown of the YOLO object detection model, walking through each computational step from input normalization through final inference. Covers eight core operations: input preparation, layer normalization, convolution, max pooling, activation functions, flattening, dense projection, and output interpretation, using simplified examples to illustrate how the model detects and localizes objects within images.

**YOLO — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/yolo-intuitively-and-exhaustively
A comprehensive examination of YOLO (You Only Look Once), a landmark object detection model that revolutionized computer vision. Traces the evolution from earlier detection methods like sliding windows and R-CNN, then breaks down YOLO's dual approach of simultaneous regionalized classification and bounding box prediction, explaining how a single neural network pass accomplishes what previously required multiple inference cycles.

**My Thoughts on Google I/O**
https://iaee.substack.com/p/my-thoughts-on-google-i-o-9abae7bc0281
Analyzes Google's I/O keynote presentation, highlighting advances in their Gemini multimodal models and the strategic push toward agentic systems. Explores how Google plans to integrate AI agents across all product offerings to automate tasks and improve productivity, while also addressing safety considerations like red teaming and AI watermarking. Argues these developments represent a fundamental shift in the way people use technology.

**The Futility of AI Failsafes**
https://iaee.substack.com/p/the-futility-of-ai-failsafes-bb1d09014746
Examines how large language models like GPT-4 infringe on copyrighted material during training and deployment, despite OpenAI's attempts to implement safeguards. Argues that current technological solutions — including "unlearning" research — cannot reliably remove copyrighted content from trained models, prompting AI companies to explore alternative legal strategies such as platform models and Section 230 immunity.

**Responsibility in Artificial Intelligence**
https://iaee.substack.com/p/responsibility-in-artificial-intelligence-bd276e751946
An opinion piece examining who bears responsibility for ensuring AI benefits society rather than causes harm. Drawing on historical examples like the Haber Process and the YOLO computer vision algorithm, argues that creators cannot control how their technologies are ultimately used. Concludes that addressing AI's impact requires collective effort: everyone must develop both technological literacy and humanistic understanding to navigate progress responsibly.

**The Future is Agentic**
https://iaee.substack.com/p/the-future-is-agentic-5c644f6b8f5b
Argues that while large language models are powerful, they fall short as standalone solutions because they can only predict text sequentially and lack access to real-time information. Introduces agentic systems as the answer — frameworks that enable AI models to reason about problems, use external tools, and iterate on solutions rather than generating output in a single pass. Demonstrates how agents could transform LLMs into genuinely useful applications by addressing their fundamental limitations.

**AGI is Not Possible**
https://iaee.substack.com/p/agi-is-not-possible-8647257fb65d
Argues that achieving Artificial General Intelligence is unlikely in the foreseeable future. Contends that current AI systems are fundamentally pattern-matching tools that lack genuine intelligence, comparing them to useful but "dumb" technologies like glass or duct tape. Challenges the hype surrounding AI capabilities by explaining how these systems work and highlighting their significant limitations.

**Groq, and the Hardware of AI — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/groq-intuitively-and-exhaustively-explained-01e3fcd727ab
Traces the evolution of computer hardware used for AI computation, starting with foundational CPU architecture from the Z80 era and progressing through GPUs. Explains how CPUs prioritize low-latency sequential processing while GPUs excel at parallel computation, then explores how Groq represents a novel approach to AI hardware optimization.

**How Burnout Almost Ended The World**
https://iaee.substack.com/p/how-burnout-almost-ended-the-world-bb8fb5bb1c57
Examines the XZ Utils security breach — where a backdoor was injected into critical compression software relied upon by major internet infrastructure — through a human lens rather than a technical one. Reveals how attackers deliberately engineered the project's maintainer's burnout over two years through relentless criticism and feature requests, then exploited his exhaustion by positioning a malicious accomplice as a helpful collaborator. Critiques open source culture's expectation that developers maintain essential software without compensation while facing public pressure and harassment.

**Sora — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/sora-intuitively-and-exhaustively-explained-a54f83ea9c21
A technical deep-dive explaining OpenAI's Sora video generation model by building foundational knowledge of diffusion models, transformers, and vision transformers before analyzing how these components likely combine in Sora's architecture. Traces the evolution from GPT's decoder-only transformers through diffusion transformers to speculate on Sora's text-to-video capabilities and conditioning mechanisms.

**Flamingo — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/flamingo-intuitively-and-exhaustively-explained-bf745611238b
Explains Flamingo, a landmark multimodal AI architecture that combines image and text understanding. Traces how Flamingo integrates CLIP-style vision encoding with decoder-only language models through components like the Perceiver Resampler and gated cross-attention, enabling systems like GPT-4 and Google Gemini to process interleaved images and text in coherent conversations.

**LLM Agents — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/llm-agents-intuitively-and-exhaustively-explained-8905858e18e2
Explores how language models can be empowered to reason and take action through agent frameworks. Covers foundational concepts like chain-of-thought prompting, examines architectures such as SayCan and WebGPT that enable models to interact with external tools, and provides practical implementations of ReAct agents using both LangChain and custom Python code.

**Speculative Sampling — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/speculative-sampling-intuitively-and-exhaustively-explained-2daca347dbb9
Explains speculative sampling, a technique that accelerates language model text generation by approximately 3x without compromising output quality. A smaller, faster draft model predicts multiple tokens, which a larger target model then validates in a single pass by leveraging the parallel prediction capability built into transformer architecture through masked attention. Combines theoretical foundations with a practical PyTorch implementation demonstrating how disagreements between models are handled.

**GPT — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/gpt-intuitively-and-exhaustively-explained-c70c38e87491
Traces the evolution of OpenAI's GPT models from their inception through GPT-4. Explains fundamental concepts like transformer architecture, decoder-only models, and language modeling objectives, then details how each generation built upon previous work through scaling and architectural refinements. Covers GPT-1's introduction of self-supervised pre-training, GPT-2's discovery that scale enables multitask learning, GPT-3's few-shot capabilities, and GPT-4's advances including multimodality and mixture-of-experts routing.

**LoRA — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/lora-intuitively-and-exhaustively-explained-e944a6bff46b
A comprehensive guide to Low-Rank Adaptation (LoRA), a parameter-efficient fine-tuning technique for large language models. Explains how LoRA reduces computational costs and storage requirements by learning factorized changes to model weights rather than updating parameters directly. Covers the mathematical foundations involving matrix decomposition and demonstrates practical implementation using Python.

**Convolutional Networks — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/convolutional-networks-intuitively-and-exhaustively-explained-ab08f6353f96
A comprehensive guide to convolutional neural networks (CNNs) from foundational principles through practical applications. Explains why CNNs outperform dense networks for image processing, detailing core operations like convolution and max pooling, and demonstrates how these techniques extend across one-, two-, and three-dimensional data. Covers essential parameters including kernel size, stride, and padding.

**Image Search in 5 Minutes**
https://iaee.substack.com/p/image-search-in-5-minutes-9bc4f903b22a
A tutorial demonstrating how to build both text-to-image and image-to-image search systems using the uform model, a CLIP-inspired neural network. Explains how encoders convert images and text into vector embeddings, then uses cosine similarity to rank and retrieve the most relevant matches from an image database. Provides practical code implementations that accomplish sophisticated image retrieval in just a few lines of Python.

**CLIP — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/clip-intuitively-and-exhaustively-explained-1d02c07dbf40
Explains CLIP (Contrastive Language-Image Pre-training), a machine learning approach that learns associations between images and text through contrastive learning. Breaks down CLIP's architecture — including image and text encoders — and demonstrates how the model creates a shared embedding space where matching image-text pairs are positioned close together, enabling zero-shot classification and other multimodal tasks without requiring task-specific training data.

**Retrieval Augmented Generation — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/retrieval-augmented-generation-intuitively-and-exhaustively-explain-6a39d6fe6fc9
Explains Retrieval Augmented Generation (RAG), a technique that enables language models to access up-to-date information without expensive retraining. Addresses two key problems with traditional LLMs — high training cost and hallucination — by retrieving relevant documents from a knowledge base and incorporating them into prompts before generation. Demonstrated through a practical restaurant chatbot example that helps customers query menus and events.

**What Are Gradients, and Why Do They Explode?**
https://iaee.substack.com/p/what-are-gradients-and-why-do-they
Provides an intuitive explanation of gradients — a fundamental concept in machine learning — using visual analogies of hills and valleys. Explains how gradients guide optimization, then explores why they can become problematically large (exploding) or small (vanishing) in deep neural networks, and details eight practical strategies for mitigation including batch normalization, gradient clipping, and architecture modifications.

**Visual Question Answering with Frozen Large Language Models**
https://iaee.substack.com/p/visual-question-answering-with-frozen-large-language-models-353d42791054
Explains how to enable large language models to understand and discuss images without retraining them, using a technique called the Q-Former. Covers the theoretical foundations of the BLIP-2 architecture, detailing how the Q-Former bridges computer vision and natural language processing through specialized training phases, then demonstrates practical implementations including image captioning, visual question answering, and image-grounded conversations using pre-trained models from Hugging Face.

**Conversations as Directed Graphs with LangChain**
https://iaee.substack.com/p/conversations-as-directed-graphs-with-lang-chain-46d70e1a846c
Demonstrates how to build a structured chatbot for lead qualification in real estate using LangChain and directed graphs. Explains how framing conversations as graph-based state transitions creates a more robust system than naive prompting approaches, then walks through implementing nodes and edges that validate user input and parse key information like names, contact details, budgets, and availability.

**Transformers — Intuitively and Exhaustively Explained**
https://iaee.substack.com/p/transformers-intuitively-and-exhaustively-explained-58a5c5df8dbb
A comprehensive guide breaking down the transformer architecture that powers modern large language models. Beginning with foundational NLP concepts like word embeddings and recurrent networks, the article methodically explains each transformer component with particular emphasis on multi-headed self-attention — the mechanism that allows words to interact with other words to transform input into a highly contextualized representation.

**Building a Cluster Using Google Colab in 5 Minutes**
https://iaee.substack.com/p/building-a-cluster-using-google-colab-in-5-minutes-3c77c1b1fc32
Demonstrates how to leverage multiple Google Colab notebooks as a distributed computing cluster for parallel experiment execution. Outlines a four-step approach: defining an experiment with an orchestrator like Weights and Biases, writing code that communicates with the orchestrator, creating a worker notebook, and duplicating workers across multiple Colab instances. The technique enables researchers to run up to six simultaneous sessions for hyperparameter sweeps without setting up traditional infrastructure.

**Experiment Orchestration From Scratch**
https://iaee.substack.com/p/experiment-orchestration-from-scratch-4a9e460944d8
Explains how to build a custom experiment orchestrator using MongoDB to manage complex machine learning experiments. Rather than relying on existing solutions like Weights and Biases, describes a lightweight system for coordinating multiple models across numerous datasets, breaking down the architecture into "Experiments" and "Runs" that workers can execute in parallel while logging results to a central database.

**Attention from Alignment, Practically Explained**
https://iaee.substack.com/p/attention-from-alignment-practically-explained-548ef6588aa4
Explores the attention mechanism in machine learning, particularly the approach from the 2014 "Neural Machine Translation by Jointly Learning to Align and Translate" paper. Explains how attention solves the problem of models forgetting long input sequences by allowing them to focus on relevant portions of data, then provides a practical PyTorch implementation using a toy problem that mirrors the alignment challenges in language translation.

**MLOps For The Cowboy**
https://iaee.substack.com/p/mlops-for-the-cowboy-61a804e5f9b1
Presents a lean approach to machine learning operations designed for resource-constrained environments. Outlines three core phases — Design (defining problems and prioritizing ruthlessly), Develop (discovering feasibility and experimenting), and Deploy (releasing models for real-world testing) — emphasizing practical solutions like CSV-based data versioning and simple Docker deployments over complex enterprise infrastructure.

**Why is Temperature All Over Data Science?**
https://iaee.substack.com/p/why-is-temperature-all-over-data-science-65b9032f8a35
Explores how concepts from metallurgy influenced modern artificial intelligence. Explains how the metallurgical process of annealing — heating and cooling metal to optimize its properties — inspired the 1983 landmark paper "Optimization by Simulated Annealing," which introduced the fundamental concept of learning rate schedulers used widely in machine learning today.

**Self-Supervised Learning Using Projection Heads**
https://iaee.substack.com/p/self-supervised-learning-using-projection
Explains self-supervised learning (SSL), a training approach that generates labels programmatically from unlabeled data using augmentations rather than human annotation. Covers how projection heads — dense neural network layers that transform features for task-specific outputs — are crucial in SSL, as they learn general image features while being discarded and replaced during downstream supervised fine-tuning. Provides a PyTorch implementation demonstrating SSL on MNIST, showing how training on unlabeled images with contrastive loss significantly outperforms supervised-only training with limited labeled samples.

**How to Deal With Units as a Data Scientist**
https://iaee.substack.com/p/how-to-deal-with-units-as-a-data-scientist-7d59fc0c6506
Explores unit management as a critical but often overlooked skill in data science. Covers foundational concepts like base units, unit systems (SI and imperial), and dimensional analysis techniques for converting between measurements. Provides practical coding strategies for handling units in real projects, including variable naming conventions, data frames, and single unit system approaches.

**Use Frequency More Frequently**
https://iaee.substack.com/p/use-frequency-more-frequently
A comprehensive handbook exploring frequency analysis and the frequency domain — a powerful but underutilized tool in data science. Progresses from foundational concepts (how the Fourier Transform converts time-domain signals into frequency representations) through practical applications like signal filtering and vibration analysis, concluding with advanced techniques such as data augmentation for audio and time-series data.

## Videos (YouTube)

**The Transformer — Intuitively and Exhaustively Explained**
https://www.youtube.com/watch?v=lKhtFHL9d80
A video deep-dive into the transformer architecture, the foundational model behind modern LLMs. Covers the full architecture — self-attention, multi-head attention, positional encoding, and feed-forward layers — with an intuitive yet thorough treatment aimed at building a genuine mental model of how transformers work.
