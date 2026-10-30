import json
from agent import analyze_incident

result = analyze_incident(
    disaster_type="Flood",
    location="Guwahati, Assam",
    severity="Critical",
    population=50000
)

print("\n===== NIRANTAR AI AGENT RESPONSE =====\n")

print(json.dumps(result, indent=4))