# Backend REST API Specification

**Project:** ResearchAI  
**Document Version:** 1.0.0  
**Base URL:** `/api`  
**Status:** Design Specification (Not Yet Implemented)  

---

## 1. Authentication & Common Standards

### 1.1 Headers
All protected endpoints require a valid JSON Web Token (JWT) passed in the `Authorization` HTTP header:
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### 1.2 Common Error Response Format
All error responses return a standardized JSON structure:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The research query must be at least 10 characters long.",
    "details": []
  }
}
```

---

## 2. API Endpoints

### 2.1 Authentication & Session (`/api/auth`)

#### `POST /api/auth/register`
- **Purpose**: Register a new user account.
- **Authentication**: None (Public)
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Responses**:
  - `201 Created`:
    ```json
    {
      "success": true,
      "data": {
        "user": {
          "_id": "6735e1...",
          "name": "Jane Doe",
          "email": "jane@example.com",
          "settings": {
            "defaultMode": "standard",
            "theme": "system"
          }
        },
        "token": "eyJhbGciOi..."
      }
    }
    ```
  - `400 Bad Request`: Validation failure (invalid email, weak password).
  - `409 Conflict`: Email address already registered.

---

#### `POST /api/auth/login`
- **Purpose**: Authenticate user and issue JWT token.
- **Authentication**: None (Public)
- **Request Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": {
        "user": {
          "_id": "6735e1...",
          "name": "Jane Doe",
          "email": "jane@example.com",
          "settings": {
            "defaultMode": "standard",
            "theme": "system"
          }
        },
        "token": "eyJhbGciOi..."
      }
    }
    ```
  - `401 Unauthorized`: Invalid credentials.

---

#### `GET /api/auth/me`
- **Purpose**: Validate active JWT session and return current user details.
- **Authentication**: Required (`Bearer <token>`)
- **Responses**:
  - `200 OK`: User payload as shown above.
  - `401 Unauthorized`: Missing, expired, or invalid token.

---

### 2.2 User Profile & Settings (`/api/users`)

#### `GET /api/users/profile`
- **Purpose**: Fetch user profile settings.
- **Authentication**: Required
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": {
        "_id": "6735e1...",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "settings": {
          "defaultMode": "standard",
          "theme": "dark"
        },
        "createdAt": "2026-11-14T09:00:00.000Z"
      }
    }
    ```

---

#### `PATCH /api/users/profile`
- **Purpose**: Update user display name or preferences.
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "name": "Jane Doe, Ph.D.",
    "settings": {
      "defaultMode": "deep",
      "theme": "dark"
    }
  }
  ```
- **Responses**:
  - `200 OK`: Updated user profile object.
  - `400 Bad Request`: Unsupported setting values.

---

### 2.3 Research Lifecycle (`/api/research`)

#### `POST /api/research`
- **Purpose**: Create a new research session and initiate the asynchronous agent execution pipeline.
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "query": "How do retrieval-augmented generation systems mitigate hallucinations in enterprise LLM workflows?",
    "mode": "standard"
  }
  ```
  *(Note: `mode` is optional; defaults to user's `settings.defaultMode` or `'standard'`)*.
- **Responses**:
  - `201 Created`:
    ```json
    {
      "success": true,
      "data": {
        "researchId": "6735e2...",
        "status": "queued",
        "query": "How do retrieval-augmented generation systems mitigate hallucinations in enterprise LLM workflows?",
        "mode": "standard",
        "createdAt": "2026-11-14T09:15:00.000Z"
      }
    }
    ```
  - `400 Bad Request`: Query too short (<10 chars) or invalid mode.
  - `429 Too Many Requests`: User exceeded active concurrent research limits.

---

#### `GET /api/research/:id/status`
- **Purpose**: Polling endpoint for real-time progress updates during pipeline execution.
- **Authentication**: Required
- **URL Parameters**: `id` (MongoDB ObjectId of the research session)
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": {
        "researchId": "6735e2...",
        "status": "retrieving",
        "progress": {
          "stage": "retrieving",
          "completedSubquestions": 2,
          "totalSubquestions": 4,
          "currentAction": "Querying Cala.ai for: What empirical methods detect LLM hallucinations?"
        },
        "updatedAt": "2026-11-14T09:15:18.000Z"
      }
    }
    ```
  - `404 Not Found`: Research session not found or unauthorized.

---

#### `GET /api/research/:id`
- **Purpose**: Retrieve full details of a research session, including plan, execution stats, report summary, and linked source IDs.
- **Authentication**: Required
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": {
        "_id": "6735e2...",
        "query": "How do retrieval-augmented generation systems mitigate hallucinations...",
        "mode": "standard",
        "status": "completed",
        "plan": {
          "scope": "Comprehensive technical evaluation of RAG architecture",
          "subquestions": [
            "What are the core components of a Retrieval-Augmented Generation pipeline?",
            "What empirical methods detect LLM hallucinations?"
          ]
        },
        "reportId": "6735e4...",
        "sourceCount": 8,
        "stats": {
          "durationMs": 14200,
          "sourcesRetrieved": 8
        },
        "createdAt": "2026-11-14T09:15:00.000Z",
        "updatedAt": "2026-11-14T09:15:15.000Z"
      }
    }
    ```

---

#### `GET /api/research`
- **Purpose**: List past research sessions for the authenticated user with pagination and filtering.
- **Authentication**: Required
- **Query Parameters**:
  - `page` (default: 1)
  - `limit` (default: 10, max: 50)
  - `mode` (optional: `quick`, `standard`, `deep`)
  - `status` (optional: `completed`, `failed`, `in_progress`)
  - `search` (optional text search against query string)
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": {
        "items": [
          {
            "_id": "6735e2...",
            "query": "How do retrieval-augmented generation systems mitigate hallucinations...",
            "mode": "standard",
            "status": "completed",
            "reportId": "6735e4...",
            "createdAt": "2026-11-14T09:15:00.000Z"
          }
        ],
        "pagination": {
          "total": 42,
          "page": 1,
          "limit": 10,
          "totalPages": 5
        }
      }
    }
    ```

---

#### `DELETE /api/research/:id`
- **Purpose**: Delete a research session and cascade removal of its associated report and source records.
- **Authentication**: Required
- **Responses**:
  - `200 OK`: `{"success": true, "message": "Research session and associated records successfully deleted."}`
  - `404 Not Found`: Session does not exist or user lacks ownership.

---

### 2.4 Reports (`/api/research/:id/report` & `/api/reports`)

#### `GET /api/research/:id/report`
- **Purpose**: Retrieve the synthesized final research report for a completed session.
- **Authentication**: Required
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": {
        "_id": "6735e4...",
        "researchId": "6735e2...",
        "title": "Mitigating Hallucinations with Retrieval-Augmented Generation",
        "summary": "This report examines how modern RAG pipelines reduce hallucination rates...",
        "content": "# Mitigating Hallucinations...\n\n## 1. Executive Summary\nRetrieval-Augmented Generation (RAG) binds generative models to verifiable knowledge bases [1]...",
        "conflicts": [
          {
            "topic": "Hybrid Search Latency Overhead",
            "claimA": "Negligible (<5ms)",
            "claimB": "30-40% overhead on dense vector indexes",
            "resolution": "Dependent on underlying ANN algorithm."
          }
        ],
        "gaps": [
          "Limited empirical data on real-time sub-millisecond retrieval benchmarks."
        ],
        "citations": [
          { "marker": 1, "sourceId": "6735e301..." }
        ],
        "wordCount": 1850,
        "createdAt": "2026-11-14T09:15:14.000Z"
      }
    }
    ```
  - `404 Not Found`: Report not ready or session incomplete.

---

#### `GET /api/reports/:id/export`
- **Purpose**: Export the report as a downloadable raw Markdown file with frontmatter and bibliography.
- **Authentication**: Required
- **Query Parameters**: `format` (default: `markdown`)
- **Responses**:
  - `200 OK`: Raw text file attachment (`Content-Type: text/markdown`, `Content-Disposition: attachment; filename="report-6735e4.md"`).

---

### 2.5 Evidence Sources (`/api/research/:id/sources`)

#### `GET /api/research/:id/sources`
- **Purpose**: Retrieve all verified evidence source records retrieved via Cala.ai for a given research session.
- **Authentication**: Required
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": [
        {
          "_id": "6735e301...",
          "index": 1,
          "query": "What are the core components of a Retrieval-Augmented Generation pipeline?",
          "title": "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
          "url": "https://arxiv.org/abs/2005.11401",
          "snippet": "We explore fine-tuning recipes for RAG models consisting of a retriever and a generator...",
          "author": "Lewis et al.",
          "publishedDate": "2020-05-22",
          "relevanceScore": 0.95
        }
      ]
    }
    ```

---

#### `GET /api/sources/:id`
- **Purpose**: Retrieve complete details and extended snippet text for a specific source record (useful for the UI citation inspection drawer).
- **Authentication**: Required
- **Responses**:
  - `200 OK`: Single source object.
  - `404 Not Found`: Source not found.

