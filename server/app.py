import os
import json
from typing import Optional, Dict, Any, List
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

app = FastAPI(
    title="The AI Apprentice Backend (ElevenLabs)",
    description="Backend services for tacit knowledge extraction, guardrails validation, and ElevenLabs voice streaming.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Read API key from environment or local .env file
ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY", "")
if not ELEVENLABS_API_KEY and os.path.exists(".env"):
    with open(".env", "r") as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                ELEVENLABS_API_KEY = line.strip().split("=", 1)[1]

if not ELEVENLABS_API_KEY:
    ELEVENLABS_API_KEY = "sk_f8d3096df9e9811f60e905813f3e249ff9d3fc9fd465f0e6"

class InvoiceValidationRequest(BaseModel):
    invoice_id: str
    vendor: str
    amount: float
    cost_center: str
    asset_number: Optional[str] = None
    is_hold: bool = False
    approval_level: str = "Tier-1"

class ScreenEvent(BaseModel):
    timestamp: str
    source_zone: str
    action: str
    field_changed: str
    old_value: Optional[str] = None
    new_value: Optional[str] = None

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AI Apprentice Core",
        "elevenlabs_configured": bool(ELEVENLABS_API_KEY),
        "version": "1.0.0"
    }

@app.get("/api/workmap")
def get_work_map():
    work_map_path = os.path.join(os.path.dirname(__file__), "..", "src", "data", "agentGuardrailsExport.json")
    if os.path.exists(work_map_path):
        with open(work_map_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"message": "Work map loaded from static assets."}

@app.post("/api/validate-guardrails")
def validate_guardrails(req: InvoiceValidationRequest):
    violations = []
    
    # Guardrail 1: Capex Threshold €5,000
    if req.amount >= 5000.00 and req.cost_center != "0400":
        violations.append({
            "guardrail_id": "GR-001-CAPEX-THRESHOLD",
            "severity": "CRITICAL_BLOCKER",
            "message": f"Invoice amount €{req.amount:,.2f} exceeds €5,000. Under Sabine's rule, machinery must be coded to Capex 0400, not {req.cost_center}."
        })

    # Guardrail 2: Asset tag required for Capex
    if req.cost_center == "0400" and not req.asset_number:
        violations.append({
            "guardrail_id": "GR-002-ASSET-TAG-REQUIREMENT",
            "severity": "BLOCKING",
            "message": "No asset number, no capex booking. Sabine's mandatory guardrail."
        })

    # Guardrail 3: December carrier hold
    if "bauer" in req.vendor.lower() and not req.is_hold:
        violations.append({
            "guardrail_id": "GR-003-DECEMBER-VENDOR-FREEZE",
            "severity": "HIGH_RISK",
            "message": "Bauer Logistik double-bills every December. Hold required until paper delivery slip is verified."
        })

    return {
        "valid": len(violations) == 0,
        "violations_count": len(violations),
        "violations": violations
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
