
# Meeting Outcome Executor Agent

An AI-powered meeting productivity application that transforms meeting transcripts into structured summaries and actionable tasks using Google Gemini.

## Features

- Meeting summary generation
- Task, owner, deadline, and priority extraction
- Dashboard with live task statistics
- Search and filter tasks
- Update task status and delete tasks
- Browser localStorage persistence
- Responsive React interface

## Technology Stack

Frontend: React, Vite, React Router, Axios  
Backend: Python, FastAPI, Pydantic  
AI: Google Gemini API

## Prerequisites

- Python 3.10 or newer
- Node.js 20 or newer
- A valid Gemini API key

## Start the Backend

Open a terminal in the project root:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Create `backend/.env` and add:

```text
GEMINI_API_KEY=YOUR_REAL_GEMINI_API_KEY
```

Start FastAPI:

```powershell
python -m uvicorn main:app --reload --port 8001
```

Verify the API:

- http://127.0.0.1:8001/health
- http://127.0.0.1:8001/docs

## Start the Frontend

Open a second terminal in the project root:

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:5173.

## Test the Application

1. Open Extract Meeting.
2. Click Load sample or paste a real meeting transcript.
3. Click Extract action items.
4. Review the summary and extracted tasks.
5. Click Save tasks to workspace.
6. Open Tasks and update task statuses.
7. Return to Overview and verify the statistics.

## Notes

- Tasks are stored in the current browser's localStorage.
- This version does not use a database or user authentication.
- Keep your API key private and never commit `.env`.