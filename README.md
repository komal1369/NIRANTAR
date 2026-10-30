# NIRANTAR — AI-Powered Disaster Relief Coordination Platform

**NIRANTAR** is an AI-powered disaster response coordination platform designed to support emergency planning, resource estimation, stakeholder coordination, and last-mile relief distribution during natural disasters.

The platform aims to bridge the gap between disaster reporting and coordinated relief response by using AI-driven analysis and structured resource planning.

> Developed by Team CodeHers | SAP Hackfest — Northern Region Winner

---

## Problem Statement

During natural disasters, relief operations often face challenges such as:

- Delayed assessment of emergency situations.
- Inefficient allocation of essential resources.
- Lack of coordination between response stakeholders.
- Logistical difficulties in last-mile relief distribution.
- Limited visibility into emerging secondary risks.

These challenges can slow down emergency response and affect the timely delivery of essential supplies.

## Our Solution

NIRANTAR provides an AI-assisted disaster response planning system that analyzes reported incidents and generates structured response recommendations.

It is designed to help emergency response teams understand incident severity, prioritize immediate actions, estimate resource requirements, and plan coordinated relief operations.

## Key Features

- **AI-Powered Incident Analysis:** Uses Google's Gemini API to analyze disaster information and generate structured response recommendations.
- **Situation Assessment:** Identifies potential humanitarian impact and secondary risks.
- **Emergency Response Planning:** Recommends immediate actions based on disaster conditions.
- **Resource Estimation:** Estimates requirements for food kits, water, medical kits, and rescue teams.
- **Stakeholder Coordination:** Identifies relevant organizations and suggests their potential contributions.
- **Logistics Recommendations:** Provides high-level transportation and relief distribution strategies.
- **Disaster Reporting:** Accepts disaster reports and generates unique incident identification numbers.
- **Fallback Response Mechanism:** Provides rule-based recommendations when AI generation encounters an error.

## Technology Stack

Frontend  :	React.js, JavaScript, CSS |
Backend  : Python, FastAPI | 
AI / LLM  :	Google Gemini API |
API Architecture :	RESTful APIs |
Development Tooling :	Vite, npm |
Data Validation	 :  Pydantic |
Configuration	:  Python dotenv

## System Architecture

```text
       User / Relief Operator
                |
                v
        React Frontend
                |
                v
         FastAPI Backend
                |
         Incident Analysis
                |
          Gemini AI Agent
                |
       Structured Response
                |
                v
       Response Recommendations
       - Situation Assessment
       - Immediate Actions
       - Resource Planning
       - Stakeholder Coordination
       - Logistics Strategy
```

A separate rule-based resource estimation engine is also included in the backend.

## Project Structure

```text
NIRANTAR/
│
├── backend/
│   ├── agent.py
│   ├── engine.py
│   ├── main.py
│   ├── models.py
│   ├── reports.py
│   ├── supply_chain.py
│   ├── test_agent.py
│   └── test_gemini.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── ReportDisaster.jsx
│   ├── ReportDisaster.css
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js and npm
- Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/komal1369/NIRANTAR.git
cd NIRANTAR
```

### 2. Set up the backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn python-dotenv google-genai
```

Create a `.env` file inside the backend directory:

```env
GEMINI_API_KEY=your_api_key_here
```

Start the backend:

```bash
uvicorn main:app --reload
```

The backend runs at:

`http://127.0.0.1:8000`

API documentation:

`http://127.0.0.1:8000/docs`

### 3. Set up the frontend

Open another terminal:

```bash
cd NIRANTAR/frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

---

## Current Implementation Status

NIRANTAR is currently a working prototype with AI-assisted disaster analysis and response planning capabilities.

**Implemented:**
- React-based frontend.
- FastAPI backend.
- Gemini-powered incident analysis.
- Structured emergency response recommendations.
- Disaster reporting endpoint.
- Rule-based resource estimation engine.
- Fallback response generation.

**Under Development / Future Scope:**
- Integrated supply-chain intelligence and optimization.
- Real-time disaster monitoring and verified data integration.
- Geographic route optimization.
- Live coordination with emergency response organizations.
- Persistent incident tracking and resource allocation.
- Deployment-ready infrastructure and scalability.

*Resource quantities and logistics recommendations are planning estimates, not verified operational deployments or real-time availability data.*

## Team

**Team CodeHers**

Project: NIRANTAR  
Achievement: Winner — SAP Hackfest, Northern Region Hackathon

---

## Vision

To make disaster response more coordinated, data-informed, and efficient by connecting incident analysis, resource planning, and relief operations through intelligent technology.