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

- **Current Phase**: Phase 1 — Backend & Frontend Foundations Scaffolding.
- **Active State**:
  - Express API gateway configured with security headers (Helmet), CORS, JSON parsers, Morgan logging, and Mongoose connection lifecycle manager.
  - Liveness (`GET /api/health`) and Readiness (`GET /api/health/ready`) checks active.
  - React 18 + Vite frontend foundation established with Tailwind CSS v4, React Router, responsive SaaS workspace layout, and New Research interface.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20.0.0 or higher (tested on Node v24.20.0)
- **npm**: v10.0.0 or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas cluster URI

---

### Backend Setup

1. **Install Dependencies**:
   ```bash
   cd backend && npm install
   ```
   *(Or run `npm install --prefix backend` from the root)*.

2. **Configure Environment Variables**:
   ```bash
   cp backend/.env.example backend/.env
   ```
   Configure your MongoDB connection string and authentication variables in `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://127.0.0.1:27017/researchai
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=replace_with_a_strong_random_jwt_secret
   JWT_EXPIRES_IN=7d
   AUTH_COOKIE_NAME=researchai_token
   COOKIE_SAME_SITE=lax
   COOKIE_SECURE=false
   ```

   > **Deployment & CSRF Note**: Browser authentication uses `HttpOnly` cookies with `SameSite=lax` and CORS `credentials: true` restricted to `CLIENT_URL`. In production over HTTPS, set `NODE_ENV=production` (which enables `Secure` cookies). If frontend and backend are hosted on different registrable domains, set `COOKIE_SAME_SITE=none` with `COOKIE_SECURE=true` and add explicit CSRF protection (such as Origin header verification or CSRF tokens) before opening public traffic.

3. **Start Development Server**:
   ```bash
   npm run backend
   ```
   *(Or run `npm run dev --prefix backend`)*.

4. **Health Check Endpoints**:
   - **Liveness**: `GET http://localhost:5000/api/health` (Reports application name, server status, environment, timestamp).
   - **Readiness**: `GET http://localhost:5000/api/health/ready` (Reports HTTP 200 when MongoDB is connected; HTTP 503 when disconnected).

---

### Frontend Setup

1. **Install Dependencies**:
   ```bash
   cd frontend && npm install
   ```
   *(Or run `npm install --prefix frontend` from the root)*.

2. **Configure Environment Variables**:
   ```bash
   cp frontend/.env.example frontend/.env
   ```
   Set `VITE_API_BASE_URL` to your backend API address:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. **Start Development Server**:
   ```bash
   npm run frontend
   ```
   *(Or run `npm run dev --prefix frontend`)*. Access the application at `http://localhost:5173`.

4. **Production Build**:
   ```bash
   npm run build --prefix frontend
   ```

