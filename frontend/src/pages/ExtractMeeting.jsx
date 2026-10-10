
import { useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  LoaderCircle,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { extractMeetingData, getApiError } from "../api";
import { useTasks } from "../context/TaskContext";

const sampleTranscript = `Project planning meeting:
Priya will prepare the updated project timeline by Friday.
Rahul will review the API integration and share feedback by Monday.
Amit will schedule the client review meeting next Wednesday.
The team agreed to complete testing before the next release.`;

export default function ExtractMeeting() {
  const [transcript, setTranscript] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const fileRef = useRef(null);
  const { addTasks } = useTasks();

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");

    if (!file.name.toLowerCase().endsWith(".txt")) {
      setError("Please choose a plain text (.txt) file.");
      event.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      setError("The file is too large. Please use a file under 1 MB.");
      event.target.value = "";
      return;
    }

    try {
      const content = await file.text();
      setTranscript(content);
      setFileName(file.name);
      setResult(null);
    } catch {
      setError("Could not read this file. Please try another .txt file.");
    }
  }

  async function handleExtract() {
    if (!transcript.trim()) {
      setError("Paste a meeting transcript or upload a .txt file first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await extractMeetingData(transcript.trim());

      if (!data || !Array.isArray(data.tasks)) {
        throw new Error("The backend returned an unexpected response.");
      }

      setResult({
        summary: data.summary || "No summary was returned.",
        tasks: data.tasks,
      });
    } catch (err) {
      setError(
        err.message?.includes("unexpected response")
          ? err.message
          : getApiError(err)
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSaveTasks() {
    if (!result?.tasks?.length) return;
    addTasks(result.tasks);
    setResult({ ...result, saved: true });
  }

  function loadSample() {
    setTranscript(sampleTranscript);
    setFileName("");
    setResult(null);
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function clearTranscript() {
    setTranscript("");
    setFileName("");
    setResult(null);
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="page fade-in">
      <section className="page-heading">
        <div className="eyebrow"><Sparkles size={14} /> AI EXTRACTION</div>
        <h1>Extract meeting outcomes</h1>
        <p className="page-subtitle">
          Turn unstructured conversations into organized, actionable work.
        </p>
      </section>

      <div className="extract-layout">
        <section className="panel transcript-panel">
          <div className="panel-heading">
            <div>
              <h2><FileText size={18} /> Meeting transcript</h2>
              <p>Paste your meeting notes or upload a text file.</p>
            </div>
            <span className="required-label">REQUIRED</span>
          </div>

          <div className="upload-zone">
            <input
              ref={fileRef}
              type="file"
              accept=".txt,text/plain"
              onChange={handleFileChange}
              hidden
            />
            <span className="upload-icon"><Upload size={21} /></span>
            <div className="upload-copy">
              <strong>{fileName || "Upload a transcript"}</strong>
              <span>Plain text files (.txt), up to 1 MB</span>
            </div>
            <button
              type="button"
              className="button button-secondary button-small"
              onClick={() => fileRef.current?.click()}
            >
              Browse files
            </button>
          </div>

          <div className="input-divider"><span>OR PASTE TEXT</span></div>

          <textarea
            className="transcript-input"
            value={transcript}
            onChange={(event) => {
              setTranscript(event.target.value);
              setFileName("");
              setResult(null);
              setError("");
            }}
            placeholder="Paste your meeting transcript here...

Example:
Sarah will prepare the Q3 report by Friday.
James will review the new design next Monday.
The team will test the release before deployment."
            maxLength={100000}
            spellCheck="true"
          />

          <div className="input-footer">
            <span>{transcript.length.toLocaleString()} / 100,000 characters</span>
            <div className="input-actions">
              <button
                type="button"
                className="button button-ghost button-small"
                onClick={loadSample}
              >
                Load sample
              </button>
              <button
                type="button"
                className="button button-ghost button-small"
                onClick={clearTranscript}
                disabled={!transcript}
              >
                <X size={14} /> Clear
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message" role="alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="button"
            className="button button-primary extract-submit"
            onClick={handleExtract}
            disabled={loading || !transcript.trim()}
          >
            {loading ? (
              <>
                <LoaderCircle className="spin" size={18} />
                Analyzing transcript...
              </>
            ) : (
              <>
                <Sparkles size={17} />
                Extract action items
                <ArrowRight size={17} />
              </>
            )}
          </button>

          <p className="privacy-note">
            <AlertCircle size={14} />
            Your transcript is sent to the configured AI service for analysis.
          </p>
        </section>

        <aside className="panel extraction-info">
          <div className="info-icon"><Sparkles size={20} /></div>
          <h2>What you'll get</h2>
          <p className="info-intro">
            The AI analyzes your transcript and structures the meeting outcomes.
          </p>

          <div className="info-feature">
            <span className="feature-check"><CheckCircle2 size={16} /></span>
            <div><strong>Meeting summary</strong><p>A concise overview of the discussion.</p></div>
          </div>
          <div className="info-feature">
            <span className="feature-check"><CheckCircle2 size={16} /></span>
            <div><strong>Actionable tasks</strong><p>Specific actions mentioned in the transcript.</p></div>
          </div>
          <div className="info-feature">
            <span className="feature-check"><CheckCircle2 size={16} /></span>
            <div><strong>Owners and deadlines</strong><p>Assigned people and stated due dates.</p></div>
          </div>
          <div className="info-feature">
            <span className="feature-check"><CheckCircle2 size={16} /></span>
            <div><strong>Priority levels</strong><p>High, medium, or low priority labels.</p></div>
          </div>

          <div className="info-bottom">
            <span className="status-dot" />
            Powered by Gemini AI
          </div>
        </aside>
      </div>

      {result && (
        <section className="panel extraction-results fade-in">
          <div className="results-heading">
            <div>
              <div className="eyebrow"><CheckCircle2 size={14} /> EXTRACTION COMPLETE</div>
              <h2>Meeting outcomes</h2>
              <p className="muted">Review the results before saving them to your workspace.</p>
            </div>
            <span className="result-count">{result.tasks.length} task{result.tasks.length === 1 ? "" : "s"} found</span>
          </div>

          <div className="summary-card">
            <span className="summary-icon"><FileText size={18} /></span>
            <div>
              <strong>Meeting summary</strong>
              <p>{result.summary}</p>
            </div>
          </div>

          {result.tasks.length ? (
            <div className="extracted-task-list">
              {result.tasks.map((task, index) => (
                <article className="extracted-task" key={task.id || index}>
                  <span className="extracted-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="extracted-task-content">
                    <strong>{task.task}</strong>
                    <div className="extracted-meta">
                      <span>Owner: {task.owner || "Not specified"}</span>
                      <span>Deadline: {task.deadline || "Not specified"}</span>
                    </div>
                  </div>
                  <span className={`priority-badge ${(task.priority || "Medium").toLowerCase()}`}>
                    {task.priority || "Medium"}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state compact-empty">
              <h3>No actionable tasks found</h3>
              <p>Try including clearer decisions, actions, owners, or deadlines.</p>
            </div>
          )}

          <div className="results-actions">
            {result.tasks.length > 0 && !result.saved && (
              <button className="button button-primary" onClick={handleSaveTasks}>
                <CheckCircle2 size={17} /> Save tasks to workspace
              </button>
            )}

            {result.saved && (
              <span className="saved-confirmation">
                <CheckCircle2 size={17} /> Tasks saved successfully
              </span>
            )}

            <Link to="/tasks" className="button button-secondary">
              Open task manager <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}