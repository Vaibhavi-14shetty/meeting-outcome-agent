from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from extraction_agent import ExtractionAgent

router = APIRouter(
    prefix="/extract",
    tags=["Meeting Extraction"],
)


class TranscriptInput(BaseModel):
    transcript: str = Field(min_length=1, max_length=100000)


@router.post("/tasks")
def extract_tasks(body: TranscriptInput):
    transcript = body.transcript.strip()

    if not transcript:
        raise HTTPException(
            status_code=400,
            detail="Please provide a meeting transcript.",
        )

    try:
        result = ExtractionAgent().extract(transcript)

        return {
            "status": "success",
            "summary": result["summary"],
            "tasks": result["tasks"],
        }

    except ValueError as exc:
        message = str(exc)
        status_code = 503 if "GEMINI_API_KEY" in message else 502

        raise HTTPException(
            status_code=status_code,
            detail=message,
        ) from exc

    except Exception as exc:
        print(f"Extraction failure: {type(exc).__name__}: {exc}")

        raise HTTPException(
            status_code=502,
            detail=(
                "Gemini could not process this transcript. "
                "Check the backend terminal for the underlying error."
            ),
        ) from exc
