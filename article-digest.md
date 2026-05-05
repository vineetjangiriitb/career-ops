# Article Digest — Proof Points

Compact proof points from portfolio projects. Read by career-ops at evaluation time.

**How to use this file:** Fill in the `<!-- TODO -->` items with real numbers when you have them. The more specific the metrics, the stronger the evaluations and CV bullets will be.

---

## Unhook — Behaviour-Aware AI App Blocker

**Status:** In development (April 2026 – Present)

**Hero metrics:** <!-- TODO: add any early metrics — e.g. classification accuracy on test cases, number of behaviour rules implemented, test users if any -->

**Stack:** Fastify · TypeScript · Prisma ORM · PostgreSQL · Gemini API · Google APIs · Vercel

**Architecture:** Device-usage data ingestion (browsing history + app stats via Google APIs) → structured prompt pipeline (Gemini API) for productive vs. wasteful behaviour classification → PostgreSQL persistence of usage logs, classification results, and intervention rules via Prisma → rule engine targeting specific in-app behaviours (Reels, doom-scrolling) rather than app-level blocks → Fastify REST API layer with clean separation of ingestion, inference, and rule-trigger concerns.

**Key decisions:**
- Behaviour-level blocking, not app-level: solves the real gap left by existing tools like Screen Time
- Context-scoped prompts to constrain LLM actions to specific behaviour domains — prevents hallucination-driven false positives
- Modular TypeScript architecture (ingestion / AI inference / rule engine separated) designed to scale and deploy on Vercel from day one

**Proof points:**
- End-to-end agentic AI pipeline: data ingestion → LLM classification → rule generation → real-time decisioning
- Demonstrates production-grade system design: schema migrations, structured logging, observability
- GitHub: https://github.com/vineetjangiriitb/unhook
- <!-- TODO: any test accuracy / classification precision numbers -->

---

## Brainon — AI-Powered Adaptive Learning Platform

**Status:** Shipped (2025)

**Hero metrics:** <!-- TODO: add any usage numbers — e.g. sessions tested, MCQ generation accuracy, engagement detection accuracy, any user feedback -->

**Stack:** Next.js · TypeScript · Firebase · Gemini API · face-api.js · YouTube IFrame API · KaTeX

**Architecture:** YouTube IFrame API embeds video → transcript ingested as knowledge base → Gemini API generates context-grounded MCQs at computed timestamps → playback interrupted for real-time comprehension tests → face-api.js (CNN-based) runs webcam inference to infer engagement level continuously → AI feedback engine evaluates submitted answers per-question → KaTeX-rendered chat panel for math-aware doubt resolution grounded in video context.

**Key decisions:**
- RAG-style context injection: MCQs grounded in exact video segment, not generic topic — higher relevance
- Real-time CV (face-api.js) instead of self-reported engagement — more honest signal, no extra user action
- KaTeX chat panel makes the platform viable for STEM learners — not bolted on, integrated into the doubt-resolution loop

**Proof points:**
- Full production deployment built solo end-to-end: frontend (Next.js) + backend (Firebase) + 3 integrated APIs (Gemini, YouTube, face-api.js)
- Multimodal pipeline: video + real-time CV + LLM generation + structured feedback in a single session loop
- GitHub: no public repo yet — add when published
- <!-- TODO: deployed URL if live -->
- <!-- TODO: any users / sessions / feedback -->

---

## Stock Market Time Series Analysis

**Status:** Completed academic project (2024) — Prof. Sangram Krishna Nirmale, IIT Bombay

**Hero metrics:** <!-- TODO: final RMSE and directional accuracy numbers from the project -->

**Stack:** Python · LSTM · TensorFlow · Keras · NumPy · Pandas · Matplotlib

**Architecture:** Yahoo Finance data collection (interest rates, price, volume) → Pandas preprocessing and min-max normalisation → sequential LSTM + Dense network (ReLU activation, MSE loss, Adam optimiser) → systematic hyperparameter tuning across learning rate, sequence length, and layer depth → evaluation on MAE, RMSE, and directional accuracy.

**Key decisions:**
- Multi-feature inputs (not just price): interest rate indicators + volume to model macro-driven price movements
- Systematic grid search across 3 hyperparameters — documented findings, not just a single run
- Evaluated directional accuracy (not just RMSE) — captures whether the model gets the trend right, not just the magnitude

**Proof points:**
- Academic project under IIT Bombay professor — structured research workflow with formal evaluation
- Demonstrates full ML pipeline: data engineering → modelling → hyperparameter tuning → evaluation
- <!-- TODO: best model RMSE / directional accuracy % -->
- GitHub: https://github.com/vineetjangiriitb/regime-forecasting

---

## Computer Vision — Object Detection & Segmentation Suite

**Status:** Completed (2024)

**Hero metrics:** <!-- TODO: F1, Precision, Recall numbers from YOLO evaluation; segmentation accuracy from ViT -->

**Projects in this suite:**
1. **YOLOv8 Humanoid Robot Detector** — custom annotated dataset (Roboflow), fine-tuned YOLOv8, evaluated on Confusion Matrix, F1, Precision, Recall
2. **ViT Image Segmentation — Robot Parts** — pixel-level segmentation masks, Vision Transformer transfer learning, multi-class segmentation
3. **U-Net Segmentation — Self-Driving Car Imagery** — pixel-level classification, multi-class scene understanding
4. **ResNet Object Detection — Summer of Coding** — COCO pre-trained, transfer learning, bounding box predictions, F1/Precision/Recall
5. **FaceNet Face Recognition** — 128-d embeddings, one-shot learning, triplet loss

**Key decisions:**
- Custom dataset creation and annotation (not off-the-shelf): builds the full pipeline skill from raw data to deployment
- Covered the full CV architecture spectrum in one project cluster: YOLO (detection), ViT (segmentation), U-Net (segmentation), FaceNet (recognition), ResNet (detection)
- Chose YOLOv8 for robot components because real-time inference speed matters for robotics deployment

**Proof points:**
- 5 distinct CV architectures implemented and evaluated — YOLO, ResNet, ViT, U-Net, FaceNet
- Full pipeline ownership: dataset creation → annotation → training → evaluation → iteration
- Roboflow used for annotation workflow — production-grade data pipeline practice
- <!-- TODO: YOLO F1 score on test set -->
- <!-- TODO: ViT segmentation accuracy on test set -->
- GitHub (Object Detection): https://github.com/vineetjangiriitb/Object-Detection-Model

---

## Tensile Testing Machine — Makerspace (2023)

**Status:** Completed hardware project — Prof. Krishna Jonnalagadda & Prof. PC Pandey, IIT Bombay

**Stack:** Arduino · C++ · Embedded C · Motor Control · Sensor Interfacing

**Architecture:** Arduino microcontroller → motor control logic (gear-driven force application at variable rotation speeds) → real-time stress/strain data acquisition → serial data logging — no manual intervention per test cycle.

**Key decisions:**
- Chose Arduino for rapid prototyping + direct motor I/O access — right tool for a physical lab instrument
- Automated the entire test cycle to remove human error from force application timing

**Proof points:**
- End-to-end hardware-software co-design: firmware, motor control, sensor interfacing, data acquisition
- Built under two IIT Bombay professors (Mechanical + Electrical) — cross-disciplinary engineering context
- <!-- TODO: any measured accuracy or repeatability specs from the project -->

---

## emotionRecognize — Real-Time Multi-Person Emotion Recognition

**Status:** Shipped

**Hero metrics:** <!-- TODO: any accuracy numbers, inference speed, number of people it can track simultaneously -->

**Stack:** face-api.js · CNN · JavaScript · Browser-native

**Architecture:** Webcam stream → browser-native CNN inference (face-api.js) → real-time multi-face detection → per-face emotion classification → live overlay rendering — entirely client-side, no server round-trip.

**Key decisions:**
- Browser-native inference: no server dependency, works offline, zero latency from network
- Multi-person: scales to multiple faces in frame simultaneously

**Proof points:**
- GitHub: https://github.com/vineetjangiriitb/emotionRecognize
- <!-- TODO: emotions classified (angry, happy, sad, surprised, neutral…?) -->
- <!-- TODO: FPS / inference speed on standard hardware -->

---

## sleepyDetect — AI-Powered Drowsiness Detection

**Status:** Shipped

**Hero metrics:** <!-- TODO: detection accuracy, false positive rate, response latency -->

**Stack:** Computer Vision · Python · Real-time Inference

**Architecture:** Webcam feed → real-time facial landmark / eye-state analysis → drowsiness signal classification → alert trigger.

**Key decisions:**
- Study-session context: designed for the real-world scenario of fatigue during long study blocks

**Proof points:**
- GitHub: https://github.com/vineetjangiriitb/sleepyDetect
- <!-- TODO: model used (MediaPipe? dlib? OpenCV?) -->
- <!-- TODO: accuracy / false positive rate -->

---

## Scholastic Signal

Use these whenever the JD favours academic pedigree or fast learners.

- **JEE Main 2023:** 99.66 percentile — top 0.34% among 1.11 million candidates
- **JEE Advanced 2023:** 97.73 percentile among 0.18 million candidates
- **IIT Bombay:** one of India's two most selective engineering institutions (~1 in 500 JEE applicants admitted)
- **Deep Learning Specialization (Andrew Ng / DeepLearning.AI, 2024):** 5-course specialization — Neural Networks, CNNs, Sequence Models (LSTM, GRU, Attention), Hyperparameter Tuning, Structuring ML Projects
- **Womanium & WISER Quantum Program (June 2025–Present):** sessions with IBM, Xanadu, Quantinuum — signals intellectual range beyond standard ML track
- **IIT Bombay coursework:** Optimization (Prof. Manas Nitin Rachh), Intro to Quantum Mechanics, General Theory of Relativity — depth in mathematical foundations

---

## Cross-Cutting Positioning

Use this framing in summaries and cover letters across all archetypes:

> "IIT Bombay student with strong theoretical ML foundations and a builder's bias — two production AI apps shipped independently (Brainon, Unhook), a full computer vision project suite, and an LSTM research project under an IIT Bombay professor. I learn fast, build end-to-end, and ship without a team."

**What makes this profile unusual for an intern:**
- Full-stack AI app development (not just Colab notebooks) — shipped to deployment
- Multimodal systems (vision + LLM + backend) in a single project
- Self-driven: custom dataset annotation, independent paper implementation, no team
- Breadth across CV, NLP/LLMs, backend, and embedded — can contribute across a small AI team's surface area
