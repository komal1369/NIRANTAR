from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import uuid
from datetime import datetime

from models import DisasterRequest, DisasterReport
from agent import analyze_incident


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "NIRANTAR AI Intelligence Backend is Running"
    }


@app.post("/simulate")
def simulate_disaster(request: DisasterRequest):

    response_plan = analyze_incident(
        request.disaster_type,
        request.location,
        request.severity,
        request.population
    )

    return {
        "status": "success",
        "incident": {
            "disaster_type": request.disaster_type,
            "location": request.location,
            "severity": request.severity,
            "population": request.population
        },
        "response_plan": response_plan
    }


@app.post("/report-disaster")
async def report_disaster(report: DisasterReport):

    incident_id = f"NIR-{uuid.uuid4().hex[:8].upper()}"

    return {
        "status": "success",
        "message": "Disaster report successfully received by NIRANTAR.",
        "incident_id": incident_id,
        "reported_at": datetime.now().strftime("%d %B %Y, %I:%M %p"),
        "report": {
            "disaster_type": report.disaster_type,
            "location": report.location,
            "severity": report.severity,
            "description": report.description
        }
    }

# @app.post("/simulate")
# async def simulate_disaster(request: DisasterRequest):

#     # Existing AI agent response
#     response = run_agent(
#         request.disaster_type,
#         request.location,
#         request.severity,
#         request.population
#     )

#     # New Supply Chain Intelligence Layer
#     supply_chain_plan = generate_supply_chain_plan(
#         disaster_type=request.disaster_type,
#         location=request.location,
#         severity=request.severity,
#         population=request.population,
#         resource_plan=response["response_plan"]["resource_plan"]
#     )

#     # Attach separately
#     response["supply_chain_intelligence"] = supply_chain_plan

#     return response