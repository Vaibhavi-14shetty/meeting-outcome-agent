# Meeting Outcome Executor Agent

An AI-powered meeting productivity application that transforms meeting transcripts into concise summaries and structured action items using Google Gemini. It helps users identify tasks, responsible owners, deadlines, and priorities, then track task progress through a dashboard.

## Features

- **AI-Powered Meeting Summaries:** Generate concise summaries from meeting transcripts.
- **Action Item Extraction:** Identify actionable tasks from meeting discussions.
- **Owner and Deadline Identification:** Extract assigned owners and deadlines when mentioned.
- **Priority Classification:** Categorize tasks as High, Medium, or Low priority.
- **Task Management:** View tasks and update their status to Pending, In Progress, or Completed.
- **Search and Filtering:** Search tasks by their details and filter them by status.
- **Dashboard:** View task statistics, completion progress, and recent action items.
- **Task Deletion:** Remove tasks that are no longer needed.
- **Local Persistence:** Save tasks in the browser's localStorage.
- **Responsive Interface:** Navigate between the overview dashboard, meeting extraction, and task management pages.

## Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Routing | React Router |
| HTTP Requests | Axios |
| Icons | Lucide React |
| Backend | Python, FastAPI, Uvicorn |
| Data Validation | Pydantic |
| AI Integration | Google Gemini API |
| Configuration | python-dotenv |
| Task Persistence | Browser localStorage |

## Project Structure

```text
meeting-outcome-agent/
├── backend/
│   ├── .env.example
│   ├── extraction_agent.py
│   ├── main.py
│   ├── requirements.txt
│   └── routes.py
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── TaskContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ExtractMeeting.jsx
│   │   │   └── Tasks.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── .gitignore
└── Readme.md
```

## Prerequisites

Install the following before running the application:

- Python 3.10 or newer
- Node.js and npm
- A valid Google Gemini API key
- Git (optional, for version control)

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Vaibhavi-14shetty/meeting-outcome-agent.git
cd meeting-outcome-agent
```

If you already have the project locally, open its existing folder instead.

### 2. Configure the Backend

Open a terminal in the project root and run:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Create a file named `.env` inside the `backend` directory.

Add your Gemini API key:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

Replace the placeholder with your own valid API key. Keep this file private and never commit it to GitHub.

### 3. Start the Backend Server

From the `backend` directory, run:

```powershell
python -m uvicorn main:app --reload --port 8001
```

The backend should now be available at:

- API base URL: `http://127.0.0.1:8001`
- Health check: `http://127.0.0.1:8001/health`
- Interactive API documentation: `http://127.0.0.1:8001/docs`

Keep this terminal running.

### 4. Configure and Start the Frontend

Open a second terminal in the project root and run:

```powershell
cd frontend
npm install
npm run dev
```

Open the local development URL printed by Vite, normally:

`http://localhost:5173`

Keep the frontend and backend terminals running while using the application.

## How to Use the Application

1. Open the application in your browser.
2. Navigate to **Extract Meeting**.
3. Paste a meeting transcript or upload a plain-text `.txt` file.
4. Alternatively, load the built-in sample transcript to test the workflow.
5. Select **Extract action items** to send the transcript to the backend for Gemini processing.
6. Review the generated summary and extracted tasks, including their owners, deadlines, and priorities.
7. Select **Save tasks to workspace** to save the extracted tasks.
8. Open **Tasks** to search, filter, update statuses, or delete tasks.
9. Return to **Overview** to review task statistics and completion progress.

## API Endpoint

### Extract Meeting Tasks

**Endpoint:** `POST /extract/tasks`

**Full local URL:** `http://127.0.0.1:8001/extract/tasks`

Request body:

```json
{
  "transcript": "Priya will prepare the project timeline by Friday."
}
```

The backend sends the transcript to Google Gemini and returns a structured response containing a summary and extracted tasks.

Example response structure:

```json
{
  "status": "success",
  "summary": "The team discussed project responsibilities and deadlines.",
  "tasks": [
    {
      "id": "task-1",
      "task": "Prepare the project timeline",
      "owner": "Priya",
      "deadline": "Friday",
      "priority": "Medium",
      "status": "Pending"
    }
  ]
}
```

The response above is illustrative; actual results depend on the supplied transcript.

## Configuration and Security

- Store your API key in `backend/.env`.
- Use `backend/.env.example` as a template if needed.
- Never commit API keys, passwords, or other secrets.
- Keep `.env` files excluded through `.gitignore`.
- Meeting transcripts are sent to the configured Google Gemini service for analysis. Do not submit confidential meeting information unless you are authorized to do so.

## Current Limitations

- Tasks are stored in browser localStorage rather than a database.
- Task data is local to the browser and is not synchronized across devices.
- User authentication and multi-user collaboration are not implemented.
- AI-generated summaries, deadlines, owners, and priorities should be reviewed for accuracy.
- The backend requires a valid Gemini API key and an available connection to the AI service.
- The application is currently configured for local development; production deployment requires additional configuration.

## Future Improvements

- Database-backed task persistence.
- User authentication and personalized workspaces.
- Exporting tasks to CSV or other formats.
- Calendar and project management integrations.
- Automated testing and production deployment.

## Author

**Vaibhavi Shetty**

- GitHub: [Vaibhavi-14shetty](https://github.com/Vaibhavi-14shetty)
- Repository: [Meeting Outcome Executor Agent](https://github.com/Vaibhavi-14shetty/meeting-outcome-agent)

---

*Built to turn meeting conversations into clear, organized, and actionable work.*