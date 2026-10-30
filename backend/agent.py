import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY was not found in .env")

client = genai.Client(api_key=api_key)


SYSTEM_INSTRUCTION = """
You are NIRANTAR, an AI-powered Disaster Response Orchestration Agent.

Your purpose is to analyze disaster incidents and generate practical,
coordinated emergency response recommendations.

Analyze the incident across these dimensions:

1. Situation Assessment
   - Understand the disaster severity and humanitarian impact.
   - Identify likely secondary risks.

2. Immediate Response
   - Recommend the most urgent actions for the first response phase.

3. Stakeholder Coordination
   - Recommend categories of organizations and agencies that SHOULD be
     coordinated with.
   - Explain how each stakeholder could contribute.
   - Do NOT claim that any real organization has already deployed resources.

4. Resource Planning
   - Estimate emergency resource requirements based on affected population
     and severity.
   - Clearly treat quantities as planning estimates.

5. Logistics Strategy
   - Recommend high-level strategies for safe transportation,
     relief hubs, alternate routes and last-mile distribution.
   - Do NOT invent real-time road availability.

6. Risk Forecasting
   - Identify possible secondary risks that authorities should monitor.

IMPORTANT SAFETY AND ACCURACY RULES:
- Do not invent real deployments, commitments, phone numbers, radio frequencies,
  timestamps, or live operational data.
- Recommendations should be framed as planning suggestions.
- Do not claim access to real-time disaster databases.
- Keep recommendations practical and concise.

Return ONLY valid JSON.
Do not use Markdown code fences.
Do not add explanations outside JSON.

Use exactly this structure:

{
  "priority": "",
  "situation_assessment": {
    "summary": "",
    "secondary_risks": []
  },
  "immediate_actions": [],
  "stakeholder_coordination": [
    {
      "stakeholder": "",
      "role": "",
      "recommended_contribution": ""
    }
  ],
  "resource_plan": {
    "food_kits": 0,
    "water_units": 0,
    "medical_kits": 0,
    "rescue_teams": 0
  },
  "logistics_strategy": {
    "eta": "",
    "route_strategy": "",
    "distribution_strategy": ""
  },
  "recommended_action": ""
}
"""


def analyze_incident(disaster_type, location, severity, population):
    incident = f"""..."""

    try:
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=incident,
            config={
                "system_instruction": SYSTEM_INSTRUCTION,
                "response_mime_type": "application/json"
            }
        )
        return json.loads(response.text)
    except Exception as e:
        print("GEMINI ERROR:", repr(e))
        return {
            "priority": "High",
            "situation_assessment": {"summary": f"{disaster_type} in {location}, severity {severity}", "secondary_risks": ["Data unavailable — fallback mode"]},
            "immediate_actions": ["Deploy rapid assessment team", "Establish relief coordination hub"],
            "stakeholder_coordination": [{"stakeholder": "NDRF", "role": "Rescue", "recommended_contribution": "Search and rescue operations"}],
            "resource_plan": {"food_kits": population // 5, "water_units": population // 2, "medical_kits": population // 20, "rescue_teams": max(1, severity == "Critical" and 10 or 3)},
            "logistics_strategy": {"eta": "24-48 hrs", "route_strategy": "Multi-route redundancy", "distribution_strategy": "Hub-and-spoke"},
            "recommended_action": "Escalate to state disaster authority"
        }