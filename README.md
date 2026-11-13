# ResearchAI

ResearchAI is an intelligent, agent-driven research assistant designed to automate literature search, information extraction, synthesis, and hypothesis generation using the MERN stack, Cala.ai, and modern Large Language Models (LLMs).

---

## 📌 Project Purpose

Conducting thorough, methodical research requires aggregating academic literature, technical documentation, and domain knowledge, followed by deep critical synthesis. ResearchAI aims to streamline this workflow by:
- Querying structured and unstructured knowledge bases via intelligent agent integrations (including Cala.ai).
- Synthesizing complex research documents into actionable summaries and comparative matrices.
- Providing an intuitive, reactive user interface for formulating queries, managing research projects, and inspecting agent reasoning trajectories.

---

## 🛠️ Planned Technology Stack

### Monorepo Architecture
- **Frontend (`frontend/`)**: React (Vite, ES Modules) for a responsive, modern UI.
- **Backend (`backend/`)**: Node.js & Express (ES Modules) providing RESTful and streaming endpoints.
- **Database**: MongoDB for storing research projects, session histories, references, and user preferences.
- **Agentic & Knowledge Platform**: Cala.ai for knowledge search, entity retrieval, and introspection.
- **LLM Integrations**: Modern Large Language Models for summarization, reasoning, and synthesis.

---

## 📁 Repository Structure

```text
research-ai-agent/
├── frontend/          # React client application (Vite, ES Modules)
│   ├── package.json   # Frontend dependencies and scripts
│   └── .env.example   # Frontend environment variable template
├── backend/           # Express server and agent orchestrator (Node.js, ES Modules)
│   ├── package.json   # Backend dependencies and scripts
│   └── .env.example   # Backend environment variable template
├── docs/              # System architecture, API documentation, and research notes
│   └── README.md      # Documentation overview
├── .gitignore         # Monorepo git ignore rules
├── package.json       # Root monorepo workspace configuration
└── README.md          # Project overview and setup documentation
```

---

## 🚦 Development Status

- **Current Phase**: Phase 0 — Foundation & Repository Initialization.
- **Active State**: Monorepo scaffolding, ES module configuration, package manifests, and repository rules established. No application features or unnecessary dependencies have been loaded yet.

---

## 🚀 Getting Started

Detailed installation, environment configuration, and service startup instructions will be documented as dependencies and application modules are introduced.

