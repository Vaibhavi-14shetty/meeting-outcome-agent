
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8001",
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function extractMeetingData(transcript) {
  const response = await API.post("/extract/tasks", {
    transcript,
  });

  return response.data;
}

export function getApiError(error) {
  if (error?.response) {
    const detail = error.response.data?.detail;

    if (typeof detail === "string" && detail.trim()) {
      return detail;
    }

    return `Request failed with status ${error.response.status}.`;
  }

  if (error?.code === "ECONNABORTED") {
    return "The request timed out. Try a shorter transcript or check the backend.";
  }

  return (
    "Cannot connect to the backend at 127.0.0.1:8001. " +
    "Check that FastAPI is running."
  );
}