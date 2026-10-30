def generate_response_plan(
    disaster_type,
    location,
    severity,
    population
):

    severity_multiplier = {
        "Low": 0.5,
        "Medium": 0.8,
        "High": 1.0,
        "Critical": 1.3
    }

    multiplier = severity_multiplier.get(severity, 1.0)

    # Resource estimation
    food_kits = int(population * 0.7 * multiplier)
    water_units = int(population * 0.5 * multiplier)
    medical_kits = int(population * 0.15 * multiplier)

    # Rescue team allocation
    if severity == "Critical":
        rescue_teams = 5
        eta = "1–2 HOURS"
        priority = "CRITICAL PRIORITY"
    elif severity == "High":
        rescue_teams = 3
        eta = "2–4 HOURS"
        priority = "HIGH PRIORITY"
    elif severity == "Medium":
        rescue_teams = 2
        eta = "4–6 HOURS"
        priority = "MEDIUM PRIORITY"
    else:
        rescue_teams = 1
        eta = "6–10 HOURS"
        priority = "STANDARD PRIORITY"

    # Disaster-specific response strategy
    strategies = {
        "Flood": {
            "route": "Fastest safe emergency route avoiding flooded zones",
            "action": "Deploy rescue boats and establish temporary relief hubs"
        },
        "Earthquake": {
            "route": "Route avoiding structurally damaged roads and bridges",
            "action": "Deploy search-and-rescue teams and emergency medical units"
        },
        "Cyclone": {
            "route": "Route avoiding high-wind zones and coastal danger areas",
            "action": "Coordinate evacuation and deploy emergency shelter supplies"
        },
        "Landslide": {
            "route": "Route avoiding blocked roads and unstable terrain",
            "action": "Deploy clearance equipment and emergency rescue teams"
        }
    }

    strategy = strategies.get(
        disaster_type,
        {
            "route": "Fastest available emergency route",
            "action": "Deploy emergency response resources"
        }
    )

    return {
        "priority": priority,
        "eta": eta,
        "route": strategy["route"],
        "recommended_action": strategy["action"],
        "resources": {
            "food_kits": food_kits,
            "water_units": water_units,
            "medical_kits": medical_kits,
            "rescue_teams": rescue_teams
        }
    }