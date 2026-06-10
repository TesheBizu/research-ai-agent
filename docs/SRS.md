# Software Requirements Specification (SRS)

**Project Name:** ResearchAI  
**Document Version:** 1.0.0  
**Phase:** Stage 2 — Architecture & Requirements  
**Status:** Approved for Design / Pending Implementation Review  

---

## 1. Project Overview

### 1.1 Problem Statement
Modern researchers, engineers, technical writers, and analysts spend excessive time manually searching across disjointed academic literature, official technical documentation, and web sources. Existing generic LLM chatbots frequently suffer from:
- **Hallucinations**: Inventing non-existent facts, papers, citations, and URLs.
- **Knowledge Cutoffs**: Relying on stale training sets without real-time or verified external retrieval.
- **Surface-Level Synthesis**: Failing to systematically break down complex research questions into targeted sub-investigations, reconcile conflicting claims, or identify research gaps.

### 1.2 Purpose & Mission
ResearchAI is an AI-powered research assistant engineered to automate the labor-intensive research lifecycle. Built on the MERN stack (MongoDB, Express, React, Node.js), it pairs external knowledge retrieval through **Cala.ai** with advanced reasoning and synthesis from modern **Large Language Models (LLMs)**. The platform guarantees strict citation traceability, distinguishes retrieved facts from analytical deductions, and highlights conflicting evidence and research gaps.

### 1.3 Project Scope
The project comprises:
- A responsive React client (Vite, Tailwind CSS) providing an interactive research dashboard, query input, live progress tracking, structured report exploration, and citation viewing.
- A robust Node.js/Express backend running native ES modules, coordinating authentication, persistent session management, research planning, retrieval, and report synthesis.
- A persistent MongoDB database storing user profiles, research sessions, normalized sources, and final reports.
- Integration adapters for Cala.ai knowledge retrieval and LLM inference providers.

### 1.4 Target Audience
- **Software Engineers & Architects**: Conducting comparative architectural reviews, evaluating frameworks, and analyzing technology tradeoffs.
- **Researchers & Academics**: Synthesizing literature, validating citations, and discovering discrepancies across publications.
- **Product Managers & Analysts**: Gathering domain context, market signals, and industry benchmarking.
- **Students & Educators**: Exploring complex concepts with traceable, verifiable citations.

### 1.5 Expected Outcomes & Business Value
- Reduction of preliminary research and literature review turnaround times by up to 70%.
- Elimination of hallucinated source citations by strictly tying every claim to an externally retrieved evidence snippet.
- Transparent auditability into the research agent's reasoning trajectory and subquestion formulation.

---

## 2. Core Features

1. **User Registration, Login, and JWT Authentication**: Secure user management, hashed credentials, and role-agnostic tokenized access.
2. **Research Dashboard**: Centralized workspace displaying active tasks, recent research sessions, token usage metrics, and quick action prompts.
3. **Natural-Language Research Query Formulation**: Free-form input accepting open-ended inquiries, problem statements, or comparative research topics.
4. **Multi-Tier Research Modes (Quick, Standard, Deep)**: Configurable execution depths balancing speed, retrieval breadth, and analytical depth.
5. **Automatic Research Planning & Subquestion Decomposition**: Autonomous decomposition of broad topics into targeted, factual questions compatible with external search engines.
6. **External Knowledge Retrieval via Cala.ai**: Targeted retrieval of verified web and domain sources, preserving raw snippets and metadata.
7. **LLM-Powered Evidence Analysis**: Critical synthesis evaluating evidence credibility, topical relevance, and thematic alignment.
8. **Discrepancy, Conflict, and Research Gap Detection**: Explicit identification of conflicting data points between sources and unaddressed subtopics.
9. **Structured Research Report Generation**: Formatting comprehensive reports with executive summaries, findings, comparative tables, and conclusions.
10. **Traceable Source References & Citations**: Direct mapping of in-text citation markers (e.g., `[1]`, `[2]`) to persistent source entities with verifiable titles, snippets, and URLs.
11. **Research History & Saved Reports Archive**: Searchable and filterable archive of past research sessions, query logs, and final reports.
12. **User Settings & Account Management**: Profile preferences, default research mode selection, and credential updates.

---

## 3. Functional Requirements

### 3.1 Authentication & Account Management (AUTH)
- **FR-001**: The system shall allow new users to register using an email address, password, and full name.
- **FR-002**: The system shall hash user passwords using `bcrypt` (minimum 10 salt rounds) before persistence.
- **FR-003**: The system shall authenticate users against stored credentials and issue a JSON Web Token (JWT) containing the user ID and expiration timestamp.
- **FR-004**: The system shall validate the JWT on every protected API endpoint and reject expired or altered tokens with HTTP 401 Unauthorized.
- **FR-005**: The system shall allow users to retrieve and update their profile details (e.g., display name, default research mode).

### 3.2 Research Dashboard & Management (DASH)
- **FR-006**: The system shall display a dashboard listing the user's past research sessions sorted by creation date descending.
- **FR-007**: The system shall display the status of each research session (`queued`, `planning`, `retrieving`, `analyzing`, `generating`, `completed`, `failed`).
- **FR-008**: The system shall provide research search and filter capabilities based on query title, mode, and date range.
- **FR-009**: The system shall allow users to delete research sessions, cascading deletion or disassociation of linked reports and sources.

### 3.3 Query Submission & Mode Selection (REQ)
- **FR-010**: The system shall accept a natural-language research question with a character limit of 10 to 1,000 characters.
- **FR-011**: The system shall require the user to select one of three research modes: `quick`, `standard`, or `deep`.
- **FR-012**: The system shall reject empty or whitespace-only research queries with HTTP 400 Bad Request.

### 3.4 Research Planning & Query Decomposition (PLAN)
- **FR-013**: The system shall trigger the `researchPlanner` module upon session creation.
- **FR-014**: The planner shall formulate an overarching research plan defining the scope and investigation objectives.
- **FR-015**: The planner shall decompose broad user queries into specific, factual, non-overlapping subquestions.
- **FR-016**: The planner shall enforce mode-specific subquestion bounds:
  - `quick`: 1 to 2 targeted factual queries.
  - `standard`: 3 to 5 comprehensive factual queries.
  - `deep`: 6 to 10 multi-angle factual queries.
- **FR-017**: The planner shall convert broad topic labels into targeted factual queries, applying duplicate and semantic-similarity filtering to eliminate redundant questions while preserving distinct questions investigating genuinely different aspects of the topic.

### 3.5 Knowledge Retrieval via Cala.ai (RETR)
- **FR-018**: The system shall dispatch deduplicated factual subquestions to the `cala.service` through an abstract provider interface (`ICalaKnowledgeProvider`), decoupling the application from the underlying transport protocol.
- **FR-019**: The retrieval service shall enforce mode-specific result retrieval caps per subquestion.
- **FR-020**: The retrieval service shall preserve raw source metadata, including title, source URL, author/publisher (if available), publication timestamp (if available), and raw text snippet.
- **FR-021**: The system shall normalize and deduplicate retrieved findings based on canonical URL and text similarity before passing to the analyzer.
- **FR-022**: The system shall handle empty retrieval responses gracefully without failing the entire research pipeline.

### 3.6 Evidence Analysis & Gap Detection (ANAL)
- **FR-023**: The `researchAnalyzer` module shall ingest deduplicated evidence and evaluate source credibility and thematic relevance.
- **FR-024**: The analyzer shall cross-reference statements across sources to identify conflicting claims, discrepancies, or disputed data points.
- **FR-025**: The analyzer shall identify research gaps where the retrieved evidence is insufficient to answer a planned subquestion.
- **FR-026**: The analyzer shall produce a structured synthesis object containing verified facts, detected conflicts, and highlighted gaps.

### 3.7 Report Generation & Citations (REPO)
- **FR-027**: The `reportGenerator` module shall transform the analyzer's synthesis object into a structured Markdown research report.
- **FR-028**: The report structure must include:
  1. Executive Summary
  2. Research Methodology & Scope
  3. Key Findings (categorized by subtopics)
  4. Comparative Analysis & Tradeoffs
  5. Contradictions & Evidence Conflicts
  6. Research Limitations & Knowledge Gaps
  7. Conclusion & Actionable Recommendations
  8. References & Source Index
- **FR-029**: The generator shall embed verifiable citation tags (`[1]`, `[2]`, etc.) directly referencing stored `ResearchSource` IDs.
- **FR-030**: The system shall enforce a two-tier validation process:
  - **Tier 1 (Source Existence Validation)**: Every citation marker in the text must resolve to a valid, stored `ResearchSource` ID.
  - **Tier 2 (Claim-to-Evidence Support Validation)**: Every major factual claim must be substantively supported by the cited evidence snippet. Unsupported claims must be flagged, prevented from being presented as established facts, and qualified or routed to the limitations section.
- **FR-031**: Where evidence is inconclusive, absent, or conflicting, the report generator must explicitly declare uncertainty and generate the bibliography deterministically from stored `ResearchSource` records.

### 3.8 Persistence & Export (PERS)
- **FR-032**: The system shall persist research metadata, generated plans, normalized sources, and the final report in MongoDB.
- **FR-033**: The system shall allow users to view, copy, and export completed reports in Markdown format.

---

## 4. Non-Functional Requirements

### 4.1 Security
- **NFR-SEC-001 (Credential Storage)**: User passwords must be salted and hashed using `bcrypt` before storage. Plaintext passwords must never be logged or persisted.
- **NFR-SEC-002 (Token Security)**: JWTs must have a defined expiration (e.g., 24 hours), be signed using a cryptographically secure secret (`JWT_SECRET`), and be verified on all protected routes.
- **NFR-SEC-003 (Secret Protection)**: All external API keys (`CALA_API_KEY`, `LLM_API_KEY`, `MONGODB_URI`) must be loaded strictly from system environment variables and must never be exposed to the client bundle or public repositories.
- **NFR-SEC-004 (Input Sanitization)**: All user inputs must be validated and sanitized against cross-site scripting (XSS), NoSQL injection, and control character exploits.
- **NFR-SEC-005 (CORS)**: The backend Express API must restrict Cross-Origin Resource Sharing (CORS) to the explicit frontend origin URL.

### 4.2 Performance & Responsiveness
- **NFR-PERF-001 (API Response Times)**: Standard CRUD operations (user login, fetching research history, reading saved reports) must respond within 200 milliseconds under normal load.
- **NFR-PERF-002 (Progressive Status Updates)**: Because deep research operations may take between 15 and 90 seconds, the backend must maintain granular pipeline status (`planning`, `retrieving`, `analyzing`, `generating`) so the client can poll or stream real-time progress.
- **NFR-PERF-003 (Database Indexing)**: High-frequency queries (e.g., lookup by `userId`, `researchId`, and sorting by `createdAt`) must be supported by compound indexes in MongoDB.

### 4.3 Reliability & Resilience
- **NFR-REL-001 (External Service Failure Handling)**: Failures or timeouts from Cala.ai or the LLM provider must not crash the Node.js process. They must be caught, logged with contextual error codes, and handled with retry strategies (up to 2 retries with exponential backoff).
- **NFR-REL-002 (Partial Retrieval Gracefulness)**: If a subset of subquestions fails during retrieval, the system must continue processing with the successfully retrieved evidence while logging the partial failure.
- **NFR-REL-003 (Database Reconnection)**: The Mongoose connection manager must automatically attempt reconnection upon intermittent network partitions.

### 4.4 Scalability
- **NFR-SCA-001 (Stateless Architecture)**: The backend API service must remain completely stateless, relying on JWTs for session state and MongoDB for persistence, allowing horizontal scaling behind a reverse proxy.
- **NFR-SCA-002 (Asynchronous Worker Readiness)**: The architecture of `researchExecutor` must separate route handling from pipeline orchestration to facilitate seamless transition to background job queues (e.g., BullMQ / Redis) as query volumes scale.

### 4.5 Usability & Accessibility
- **NFR-USA-001 (Intuitive UI)**: The user interface must provide clear visual indicators for research modes, execution stages, and error states.
- **NFR-USA-002 (Citation Inspection)**: Clicking or hovering over any in-text citation marker (`[n]`) must reveal the corresponding source title, URL, and matched evidence snippet in an inspection drawer or tooltip.
- **NFR-USA-003 (Responsive Design)**: The frontend layout must function seamlessly across modern desktop and tablet viewports.

### 4.6 Maintainability & Code Quality
- **NFR-MNT-001 (Native ES Modules)**: All backend and frontend code must strictly adhere to modern ECMAScript standard modules (`import`/`export`), using explicit file extensions where required by Node.js.
- **NFR-MNT-002 (Separation of Concerns)**: Distinct layers must be maintained: Routes -> Controllers -> Agent Orchestration -> External Services -> Data Access Models.
- **NFR-MNT-003 (Clean Configuration)**: Configuration parameters (timeouts, limits, model names) must reside in centralized configuration files rather than hardcoded magic strings.

### 4.7 Data Integrity & Research Quality
- **NFR-DAT-001 (Hallucination Prevention & Claim Verification)**: The system must enforce two-tier validation: validating that cited source IDs exist in the database (Tier 1) and that empirical assertions are substantively corroborated by retrieved evidence snippets (Tier 2). Unsupported claims must not be presented as established facts.
- **NFR-DAT-002 (Deterministic Bibliography & Traceability)**: Every `ResearchReport` must generate its bibliography deterministically from the snapshot of `ResearchSource` records stored in MongoDB, ensuring zero hallucinated citations or external links.
- **NFR-DAT-003 (Epistemic Transparency)**: The system must mandate sections on research limitations, data gaps, and contradictory claims whenever evidence is conflicting or incomplete.

---

## 5. Complete User Workflows

```mermaid
sequenceDiagram
    autonumber
    actor User as Researcher / User
    participant Web as React Frontend
    participant API as Express API
    participant DB as MongoDB
    participant Agent as Research Agent
    participant Cala as Cala.ai
    participant LLM as LLM Provider

    Note over User, DB: Authentication & Setup
    User->>Web: Navigate to Register / Login
    Web->>API: POST /api/auth/login (credentials)
    API->>DB: Find & verify user password (bcrypt)
    API-->>Web: Return JWT token & user profile
    Web->>Web: Store JWT (Auth Context)

    Note over User, Agent: Research Query Formulation
    User->>Web: Enter research query & select mode (Quick/Standard/Deep)
    User->>Web: Click "Start Research"
    Web->>API: POST /api/research (query, mode) [Auth: Bearer]
    API->>DB: Create Research session (status: 'queued')
    API-->>Web: Return Research Session ID (201 Created)
    API->>Agent: Trigger research execution asynchronously

    Note over Agent, LLM: Step 1: Research Planning
    Agent->>DB: Update status -> 'planning'
    Agent->>LLM: Generate plan & decompose into factual subquestions
    LLM-->>Agent: Return structured subquestions & focus areas
    Agent->>DB: Save research plan & subquestions

    Note over Agent, Cala: Step 2: External Knowledge Retrieval
    Agent->>DB: Update status -> 'retrieving'
    loop For each factual subquestion
        Agent->>Cala: Search factual query (Cala API / MCP)
        Cala-->>Agent: Return source titles, URLs, text snippets
    end
    Agent->>Agent: Deduplicate, normalize & filter raw sources
    Agent->>DB: Save normalized ResearchSource records

    Note over Agent, LLM: Step 3: Evidence Analysis & Synthesis
    Agent->>DB: Update status -> 'analyzing'
    Agent->>LLM: Ingest normalized sources; evaluate credibility, conflicts, gaps
    LLM-->>Agent: Return structured synthesis & conflict matrix

    Note over Agent, LLM: Step 4: Report Generation & Verification
    Agent->>DB: Update status -> 'generating'
    Agent->>LLM: Generate full Markdown report with citation markers [n]
    LLM-->>Agent: Return formatted report
    Agent->>Agent: Audit citation IDs against persistent ResearchSource records
    Agent->>DB: Save ResearchReport & update Research status -> 'completed'

    Note over User, DB: Review & Exploration
    Web->>API: GET /api/research/:id (polling or on-demand)
    API->>DB: Query Research, Report, and linked Sources
    API-->>Web: Return completed report and source references
    Web->>User: Render interactive report with clickable citations & conflict matrix
```

### 5.1 Step-by-Step User Journey

1. **Onboarding & Authentication**:
   - The user navigates to the application and registers with an email, name, and password.
   - Upon successful login, the client receives a JWT and redirects to the **Research Dashboard**.
2. **Dashboard Review**:
   - The user views their research history, inspecting previous research sessions, active jobs, and completion statuses.
3. **Initiating Research**:
   - The user clicks "New Research".
   - The user enters a research prompt (e.g., *"How do retrieval-augmented generation systems mitigate hallucinations in enterprise LLM workflows?"*).
   - The user selects an investigation depth:
     - **Quick**: High-level overview, 1–2 factual queries.
     - **Standard**: Balanced investigation, 3–5 factual queries.
     - **Deep**: In-depth analysis, 6–10 queries covering trade-offs, benchmarks, and contradictory views.
   - The user clicks **Start Research**.
4. **Execution & Real-Time Monitoring**:
   - The client submits the request to `POST /api/research`.
   - The backend creates the research record and asynchronously orchestrates the agent pipeline.
   - The frontend enters a live tracking view, periodically polling `GET /api/research/:id/status` to show the active stage (`Planning` -> `Retrieving from Cala.ai` -> `Analyzing Evidence` -> `Synthesizing Report`).
5. **Report Exploration**:
   - Once the status reaches `completed`, the client fetches `GET /api/research/:id` and renders the structured Markdown report.
   - The user reads the Executive Summary, Key Findings, and Conclusions.
   - The user interacts with in-text citation badges (`[1]`, `[2]`), opening a sidebar that highlights the exact external evidence snippet, source URL, and retrieval timestamp.
   - The user inspects the **Contradictions & Gaps** section to review conflicting findings identified by the analyzer.
6. **Report Management & Re-use**:
   - The user exports the report to Markdown for inclusion in team documents or wikis.
   - The research remains stored in the user's permanent history, accessible at any time from the dashboard.

