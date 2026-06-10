# ResearchAI Technical Documentation

This directory contains the complete technical specifications, architectural blueprints, database designs, API contracts, and integration requirements for the **ResearchAI** platform.

---

## 📚 Documentation Index

1. **[Software Requirements Specification (SRS)](file:///home/teshe/My_files/research_AI/research-ai-agent/docs/SRS.md)**
   - Problem statement, purpose, target audience, and expected outcomes.
   - Comprehensive breakdown of all 12 core features.
   - Functional requirements with unique IDs (`FR-001` through `FR-033`).
   - Non-functional requirements (`NFR-SEC`, `NFR-PERF`, `NFR-REL`, `NFR-SCA`, `NFR-USA`, `NFR-MNT`, `NFR-DAT`).
   - End-to-end user workflows and sequence diagram.

2. **[System Architecture](file:///home/teshe/My_files/research_AI/research-ai-agent/docs/SYSTEM_ARCHITECTURE.md)**
   - Complete multi-tier system topology (React/Vite, Express/Node.js ES Modules, MongoDB, Cala.ai, LLM).
   - Component responsibilities, communication protocols, and full-system Mermaid architecture diagram.
   - Research agent modular structure (`researchPlanner.js`, `researchExecutor.js`, `researchAnalyzer.js`, `reportGenerator.js`, `cala.service.js`, `llm.service.js`).
   - Research modes breakdown (`Quick`, `Standard`, `Deep`).
   - Security, error resilience, and citation integrity architecture.

3. **[MongoDB Database Design](file:///home/teshe/My_files/research_AI/research-ai-agent/docs/DATABASE_DESIGN.md)**
   - Entity-Relationship Diagram (ERD).
   - Detailed schema specifications for `User`, `Research`, `ResearchReport`, and `ResearchSource`.
   - Field types, relational references, indexes, and cascading deletion rules.

4. **[Backend REST API Specification](file:///home/teshe/My_files/research_AI/research-ai-agent/docs/API_SPECIFICATION.md)**
   - Standards for headers, JWT authentication, and uniform JSON error envelopes.
   - Detailed endpoint definitions for Authentication, User Profiles, Research Management, Status Polling, Reports, and Sources.
   - Exact HTTP methods, URLs, request payloads, and status codes.

5. **[Research Pipeline & Processing Logic](file:///home/teshe/My_files/research_AI/research-ai-agent/docs/RESEARCH_PIPELINE.md)**
   - Detailed 10-step execution lifecycle from query ingestion to final report delivery.
   - Transformation of broad research topics into targeted factual questions with duplicate and semantic-similarity filtering.
   - Two-tier citation validation framework: Tier 1 source existence check + Tier 2 claim-to-evidence support check.
   - Explicit flagging of unsupported claims and deterministic bibliography generation from stored `ResearchSource` records.
   - Configurable mode thresholds and module interface contracts.

6. **[Cala.ai Integration Requirements & Verification Checklist](file:///home/teshe/My_files/research_AI/research-ai-agent/docs/CALA_INTEGRATION.md)**
   - Critical integration rules: factual subquestions, query limits, zero-fabrication of citations.
   - Clarification of proposed environment variable names (`CALA_API_KEY`, `CALA_BASE_URL`) and non-assumption of standalone REST API.
   - Provider abstraction architecture (`ICalaKnowledgeProvider`) decoupling backend core from underlying protocol.
   - Clear architectural boundary between dev-time MCP and production runtime connection.
   - 8-point engineering verification matrix marking unverified runtime endpoints as pending verification.
