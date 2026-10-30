import { useState } from 'react'
import './App.css'



function App() {

  const [disasterType, setDisasterType] = useState('')
  const [location, setLocation] = useState('')
  const [severity, setSeverity] = useState('Medium')
  const [population, setPopulation] = useState('')

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [responsePlan, setResponsePlan] = useState(null)

  const [supplyChainData, setSupplyChainData] = useState(null)


  const [reportForm, setReportForm] = useState({
  disasterType: '',
  location: '',
  severity: 'Medium',
  population: '',
  description: '',
  reporterName: '',
  contact: '',
})
const [reportSubmitted, setReportSubmitted] = useState(false)

const handleReportChange = (field, value) => {
  setReportForm((prev) => ({ ...prev, [field]: value }))
}

const submitReport = (e) => {
  e.preventDefault()
  if (!reportForm.disasterType || !reportForm.location || !reportForm.description) {
    alert('Please fill in disaster type, location and description.')
    return
  }
  setReportSubmitted(true)
}


  const runAnalysis = async () => {
  if (!disasterType || !location || !population) {
    alert('Please complete all incident parameters.')
    return
  }

  setIsAnalyzing(true)
setResponsePlan(null)
setSupplyChainData(null)

  try {
    const response = await fetch('http://127.0.0.1:8000/simulate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        disaster_type: disasterType,
        location: location,
        severity: severity,
        population: Number(population),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate response plan')
    }

    const data = await response.json()


    setSupplyChainData(data.supply_chain_intelligence)

    setResponsePlan({
  disaster: data.incident.disaster_type,
  location: data.incident.location,
  severity: data.incident.severity,
  affectedPopulation: data.incident.population.toLocaleString(),

  priority: data.response_plan.priority,

  situation: data.response_plan.situation_assessment,

  actions: data.response_plan.immediate_actions,

  stakeholders: data.response_plan.stakeholder_coordination,

  eta: data.response_plan.logistics_strategy?.eta,

  route: data.response_plan.logistics_strategy?.route_strategy,

  resources: [
    {
      name: 'Emergency Food Kits',
      quantity: data.response_plan.resource_plan.food_kits,
      icon: '◫',
    },
    {
      name: 'Clean Water Units',
      quantity: data.response_plan.resource_plan.water_units,
      icon: '◉',
    },
    {
      name: 'Medical Supply Kits',
      quantity: data.response_plan.resource_plan.medical_kits,
      icon: '✚',
    },
    {
      name: 'Rescue Teams',
      quantity: data.response_plan.resource_plan.rescue_teams,
      icon: '◈',
    },
  ],

  logistics: {
    eta: data.response_plan.logistics_strategy.eta,
    route: data.response_plan.logistics_strategy.route_strategy,
    distribution:
      data.response_plan.logistics_strategy.distribution_strategy,
  },

  recommendation: data.response_plan.recommended_action,
})

setSupplyChainData(data.supply_chain_intelligence)


  } catch (error) {
    console.error(error)
    alert('Unable to connect to NIRANTAR Intelligence Backend.')
  } finally {
    setIsAnalyzing(false)
  }
}




// ==========================================
// NIRANTAR ANALYTICS ENGINE
// ==========================================

const getAnalytics = () => {
  if (!responsePlan) return null

  const populationNumber = Number(
    String(responsePlan.affectedPopulation || population)
      .replace(/,/g, '')
  )

  // Base risk based on severity
  const severityRisk = {
    Low: 35,
    Medium: 55,
    High: 75,
    Critical: 92
  }

  let riskScore = severityRisk[severity] || 50

  // Population impact
  if (populationNumber > 100000) riskScore += 5
  else if (populationNumber > 50000) riskScore += 3

  riskScore = Math.min(riskScore, 99)

  // Impact dimensions
  const humanitarianImpact = Math.min(
    95,
    Math.round(riskScore * 0.95)
  )

  const infrastructureImpact =
    disasterType.toLowerCase().includes('earthquake')
      ? Math.min(98, riskScore + 8)
      : disasterType.toLowerCase().includes('flood')
      ? Math.min(95, riskScore + 4)
      : Math.min(90, riskScore)

  const supplyChainImpact =
    severity === 'Critical'
      ? 94
      : severity === 'High'
      ? 78
      : severity === 'Medium'
      ? 58
      : 35

  const responseUrgency =
    severity === 'Critical'
      ? 98
      : severity === 'High'
      ? 82
      : severity === 'Medium'
      ? 62
      : 38

  return {
    riskScore,
    humanitarianImpact,
    infrastructureImpact,
    supplyChainImpact,
    responseUrgency,
    populationNumber
  }
}

const analytics = getAnalytics()

  return (
    <div className="app">

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">✦</div>
          <div>
            <h2>NIRANTAR</h2>
            <span>Resilient Together</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#simulation">Simulation</a>
          <a href="#resources">Resources</a>
          <a href="#analytics">Analytics</a>
        </div>

        <button
  className="report-btn"
  onClick={() =>
    document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' })
  }
>
  ⚠ Report Disaster
</button>
      </nav>

      {/* Hero */}
      <main className="hero-section" id="home">

        <div className="hero-content">
          <p className="tagline">
            ✦ INTELLIGENT • AUTONOMOUS • RESILIENT
          </p>

          <h1>NIRANTAR</h1>

          <h2>
            AI-Powered Disaster Response &
            <br />
            Supply Chain Command Center
          </h2>

          <p className="hero-description">
            Detect disruptions. Understand cascading impact.
            Deploy the right resources through the safest routes —
            continuously.
          </p>

          <div className="hero-buttons">
            <button
  className="primary-btn"
  onClick={() =>
    document
      .getElementById('simulation')
      ?.scrollIntoView({ behavior: 'smooth' })
  }
>
  ⚡ Simulate Disaster →
</button>

            <button
  className="secondary-btn"
  onClick={() =>
    document
      .getElementById('dashboard')
      ?.scrollIntoView({ behavior: 'smooth' })
  }
>
  Explore Dashboard →
</button>
          </div>
        </div>

        {/* Decorative disaster intelligence area */}
        <div className="hero-visual">

          <div className="radar-circle circle-1"></div>
          <div className="radar-circle circle-2"></div>
          <div className="radar-circle circle-3"></div>

          <div className="pulse-point point-1"></div>
          <div className="pulse-point point-2"></div>
          <div className="pulse-point danger point-3"></div>

          <div className="alert-card">
            <span className="alert-label">ACTIVE ALERT</span>
            <h3>Assam Floods</h3>
            <p>Severity: <b>CRITICAL</b></p>
            <p>Affected: <b>50,000+</b></p>
          </div>

        </div>

      </main>


      {/* Live Situation Overview */}
<section className="situation-section" id="dashboard">

  <div className="section-heading">
    <div>
      <p className="section-tag">● LIVE INTELLIGENCE</p>
      <h2>Situation Overview</h2>
      <p className="section-description">
        Real-time visibility into disasters, affected regions,
        and response operations across the country.
      </p>
    </div>

    <div className="live-indicator">
      <span className="live-dot"></span>
      SYSTEM MONITORING ACTIVE
    </div>
  </div>

  {/* Stats */}
  <div className="stats-grid">

    <div className="stat-card">
      <span className="stat-icon">⚠</span>
      <div>
        <p>Active Incidents</p>
        <h3>12</h3>
        <span className="trend danger-text">↑ 3 critical</span>
      </div>
    </div>

    <div className="stat-card">
      <span className="stat-icon">◎</span>
      <div>
        <p>Critical Zones</p>
        <h3>04</h3>
        <span className="trend warning-text">Requires attention</span>
      </div>
    </div>

    <div className="stat-card">
      <span className="stat-icon">◈</span>
      <div>
        <p>Resources Deployed</p>
        <h3>1,248</h3>
        <span className="trend success-text">Operational</span>
      </div>
    </div>

    <div className="stat-card">
      <span className="stat-icon">◉</span>
      <div>
        <p>Response Efficiency</p>
        <h3>87%</h3>
        <span className="trend success-text">↑ Optimized</span>
      </div>
    </div>

  </div>


  {/* Main Command Grid */}
  <div className="command-grid">

    {/* Active Alerts */}
    <div className="alerts-panel">

      <div className="panel-header">
        <div>
          <p className="panel-label">PRIORITY QUEUE</p>
          <h3>Active Disaster Alerts</h3>
        </div>
        <span className="panel-count">12 ACTIVE</span>
      </div>

      <div className="alert-list">

        <div className="disaster-alert critical-alert">
          <div className="alert-status"></div>
          <div className="alert-info">
            <h4>Assam Floods</h4>
            <p>Guwahati & surrounding districts</p>
          </div>
          <div className="severity">
            <span>CRITICAL</span>
            <small>50,000 affected</small>
          </div>
        </div>

        <div className="disaster-alert high-alert">
          <div className="alert-status"></div>
          <div className="alert-info">
            <h4>Himachal Landslide</h4>
            <p>Mandi & Kullu corridor</p>
          </div>
          <div className="severity">
            <span>HIGH</span>
            <small>12,500 affected</small>
          </div>
        </div>

        <div className="disaster-alert medium-alert">
          <div className="alert-status"></div>
          <div className="alert-info">
            <h4>Odisha Cyclonic Alert</h4>
            <p>Coastal evacuation monitoring</p>
          </div>
          <div className="severity">
            <span>MEDIUM</span>
            <small>8,200 at risk</small>
          </div>
        </div>

      </div>

      <button className="view-alerts-btn">
        View All Incidents →
      </button>

    </div>


    {/* India Command Visualization */}
    <div className="india-panel">

      <div className="panel-header">
        <div>
          <p className="panel-label">NATIONAL VIEW</p>
          <h3>Operational Coverage</h3>
        </div>

        <span className="coverage-label">INDIA</span>
      </div>

      <div className="map-placeholder">

        <div className="map-glow"></div>

        <div className="map-center">
          <span className="map-title">NIRANTAR</span>
          <small>COMMAND NETWORK</small>
        </div>

        <div className="network-line line-1"></div>
        <div className="network-line line-2"></div>
        <div className="network-line line-3"></div>

        <div className="network-node node-1"></div>
        <div className="network-node node-2"></div>
        <div className="network-node node-3 danger-node"></div>
        <div className="network-node node-4"></div>
        <div className="network-node node-5"></div>

      </div>

    </div>

  </div>
</section>


{/* NIRANTAR Intelligence Workflow */}
<section className="workflow-section" id="workflow">

  <div className="workflow-heading">
    <p className="section-tag">◈ AUTONOMOUS RESPONSE ENGINE</p>
    <h2>How NIRANTAR Thinks</h2>
    <p>
      A continuous intelligence loop that transforms disaster signals
      into coordinated, data-driven response decisions.
    </p>
  </div>

  <div className="workflow-container">

    <div className="workflow-step">
      <div className="step-number">01</div>
      <div className="step-icon">◉</div>
      <h3>Detect</h3>
      <p>
        Identifies disruptions through incoming disaster signals
        and ground-level reports.
      </p>
    </div>

    <div className="workflow-arrow">→</div>

    <div className="workflow-step">
      <div className="step-number">02</div>
      <div className="step-icon">⌘</div>
      <h3>Analyze</h3>
      <p>
        Assesses severity, affected population, urgency,
        and cascading supply-chain impact.
      </p>
    </div>

    <div className="workflow-arrow">→</div>

    <div className="workflow-step">
      <div className="step-number">03</div>
      <div className="step-icon">◈</div>
      <h3>Allocate</h3>
      <p>
        Matches available resources with priority requirements
        across affected regions.
      </p>
    </div>

    <div className="workflow-arrow">→</div>

    <div className="workflow-step">
      <div className="step-number">04</div>
      <div className="step-icon">⌁</div>
      <h3>Optimize</h3>
      <p>
        Evaluates routes, constraints and alternatives
        to minimize response delays.
      </p>
    </div>

    <div className="workflow-arrow">→</div>

    <div className="workflow-step">
      <div className="step-number">05</div>
      <div className="step-icon">➤</div>
      <h3>Deliver</h3>
      <p>
        Coordinates execution while continuously adapting
        to changing conditions.
      </p>
    </div>

  </div>

  <div className="continuous-loop">
    <span className="loop-dot"></span>
    CONTINUOUSLY LEARNING & ADAPTING
    <span className="loop-dot"></span>
  </div>

</section>


{/* DISASTER SIMULATION ENGINE */}
<section className="simulation-section" id="simulation">

  <div className="simulation-heading">
    <p className="section-tag">⚡ INTERACTIVE RESPONSE ENGINE</p>
    <h2>Simulate a Disaster</h2>
    <p>
      Provide a disaster scenario and let NIRANTAR generate
      an intelligent response strategy.
    </p>
  </div>

  <div className="simulation-container">

    {/* INPUT PANEL */}
    <div className="simulation-form">

      <div className="form-header">
        <div>
          <span className="form-step">STEP 01</span>
          <h3>Incident Parameters</h3>
        </div>

        <span className="system-status">
          <span></span>
          READY
        </span>
      </div>


      <div className="form-grid">

        <div className="input-group">
          <label>Disaster Type</label>

          <select
            value={disasterType}
            onChange={(e) => setDisasterType(e.target.value)}
          >
            <option value="">Select disaster</option>
            <option>Flood</option>
            <option>Landslide</option>
            <option>Cyclone</option>
            <option>Earthquake</option>
            <option>Wildfire</option>
          </select>
        </div>


        <div className="input-group">
          <label>Location</label>

          <input
            type="text"
            placeholder="e.g. Guwahati, Assam"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>


        <div className="input-group">
          <label>Severity Level</label>

          <div className="severity-options">

            {['Low', 'Medium', 'High', 'Critical'].map((level) => (
              <button
                key={level}
                type="button"
                className={severity === level ? 'selected-severity' : ''}
                onClick={() => setSeverity(level)}
              >
                {level}
              </button>
            ))}

          </div>
        </div>


        <div className="input-group">
          <label>Affected Population</label>

          <input
            type="number"
            placeholder="e.g. 50000"
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
          />
        </div>

      </div>


      <button
        className="run-btn"
        onClick={runAnalysis}
        disabled={isAnalyzing}
      >
        {/* ⚡ RUN NIRANTAR ANALYSIS */}
        {/* <span>→</span> */}

        {isAnalyzing ? 'NIRANTAR ANALYZING...' : '⚡ RUN NIRANTAR ANALYSIS'}
        <span>→</span>
      </button>

    </div>


    {/* PREVIEW PANEL */}
    <div className="simulation-preview">

      <div className="preview-grid"></div>

      <div className="preview-content">

  {isAnalyzing ? (
    <>
      <div className="preview-icon analyzing-icon">◌</div>

      <p className="preview-label">
        NIRANTAR IS PROCESSING
      </p>

      <h3>Analyzing Incident</h3>

      <p>
        Assessing disaster severity, affected population,
        resource requirements and logistics constraints...
      </p>

      <div className="preview-status analyzing-status">
        <span></span>
        Intelligence engine active
      </div>
    </>
  ) : responsePlan ? (
  <div className="response-dashboard">

    {/* HEADER */}
    <div className="response-header">
      <div>
        <p className="preview-label">
          AI RESPONSE PLAN GENERATED
        </p>

        <h3>
          {responsePlan.priority} PRIORITY
        </h3>
      </div>

      <span className={`priority-badge ${responsePlan.priority.toLowerCase()}`}>
        {responsePlan.priority}
      </span>
    </div>


    {/* INCIDENT */}
    <div className="incident-card">
      <div>
        <span className="incident-label">INCIDENT</span>
        <h4>{responsePlan.disaster}</h4>
        <p>{responsePlan.location}</p>
      </div>

      <div className="population-info">
        <span>AFFECTED</span>
        <strong>{responsePlan.affectedPopulation}</strong>
      </div>
    </div>


    {/* SITUATION */}
    <div className="response-block">
      <div className="block-title">
        <span>◉</span>
        Situation Assessment
      </div>

      <p className="situation-summary">
        {responsePlan.situation.summary}
      </p>

      <div className="risk-tags">
        {responsePlan.situation.secondary_risks.map((risk, index) => (
          <span key={index}>
            ⚠ {risk}
          </span>
        ))}
      </div>
    </div>


    {/* IMMEDIATE ACTIONS */}
    <div className="response-block">
      <div className="block-title">
        <span>⚡</span>
        Immediate Actions
      </div>

      <div className="action-list">
        {responsePlan.actions.map((action, index) => (
          <div className="action-item" key={index}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{action}</p>
          </div>
        ))}
      </div>
    </div>


    {/* RESOURCES */}
    <div className="response-block">
      <div className="block-title">
        <span>◈</span>
        Resource Deployment
      </div>

      <div className="resource-grid">
        {responsePlan.resources.map((resource) => (
          <div className="resource-card" key={resource.name}>
            <span className="resource-icon">
              {resource.icon}
            </span>

            <strong>
              {resource.quantity.toLocaleString()}
            </strong>

            <small>
              {resource.name}
            </small>
          </div>
        ))}
      </div>
    </div>


    {/* STAKEHOLDERS */}
    <div className="response-block">
      <div className="block-title">
        <span>⌘</span>
        Coordination Network
      </div>

      <div className="stakeholder-list">
        {responsePlan.stakeholders.map((stakeholder, index) => (
          <div className="stakeholder-card" key={index}>

            <div className="stakeholder-top">
              <h4>{stakeholder.stakeholder}</h4>
              <span>{stakeholder.role}</span>
            </div>

            <p>
              {stakeholder.recommended_contribution}
            </p>

          </div>
        ))}
      </div>
    </div>


    {/* LOGISTICS */}
    <div className="response-block logistics-block">

      <div className="block-title">
        <span>➤</span>
        Logistics Strategy
      </div>

      <div className="logistics-item">
        <span>ETA</span>
        <p>{responsePlan.logistics.eta}</p>
      </div>

      <div className="logistics-item">
        <span>ROUTE</span>
        <p>{responsePlan.logistics.route}</p>
      </div>

      <div className="logistics-item">
        <span>DISTRIBUTION</span>
        <p>{responsePlan.logistics.distribution}</p>
      </div>

    </div>


    {/* FINAL RECOMMENDATION */}

    <div className="recommendation-card">

      <span>✦ AI RECOMMENDATION</span>

      <p>
        {responsePlan.recommendation}
      </p>

    </div>

  </div>
  ) : (
    <>
      <div className="preview-icon">
        ◉
      </div>

      <p className="preview-label">
        NIRANTAR INTELLIGENCE ENGINE
      </p>

      <h3>Ready to Analyze</h3>

      <p>
        Configure a disaster scenario and initiate the response engine.
        NIRANTAR will assess impact, prioritize resources and recommend
        an optimized deployment strategy.
      </p>

      <div className="preview-status">
        <span></span>
        Waiting for incident data
      </div>
    </>
  )}

</div>

    </div>

    </div>

</section>



    {/* =========================================
    SUPPLY CHAIN INTELLIGENCE
========================================= */}

<section className="supply-chain-section" id="resources">

  <div className="supply-chain-heading">

    <div>
      <p className="section-tag">
        ◈ ADAPTIVE LOGISTICS INTELLIGENCE
      </p>

      <h2>Supply Chain Command Center</h2>

      <p>
        From AI-generated response requirements to optimized
        sourcing, routing and last-mile deployment.
      </p>
    </div>

    {supplyChainData && (
      <div className="sc-live-status">
        <span></span>
        LIVE ALLOCATION ACTIVE
      </div>
    )}

  </div>


  {!supplyChainData ? (

    /* EMPTY STATE */

    <div className="supply-chain-empty">

      <div className="sc-empty-icon">
        ◈
      </div>

      <h3>Awaiting Incident Intelligence</h3>

      <p>
        Run a disaster simulation to activate NIRANTAR's
        supply chain intelligence engine.
      </p>

      <div className="sc-flow-preview">

        <span>INCIDENT</span>
        <b>→</b>
        <span>DEMAND</span>
        <b>→</b>
        <span>HUBS</span>
        <b>→</b>
        <span>ROUTES</span>
        <b>→</b>
        <span>DEPLOYMENT</span>

      </div>

    </div>

  ) : (

    <div className="supply-chain-dashboard">


      {/* TOP INTELLIGENCE BAR */}

      <div className="sc-command-bar">

        <div>
          <span>ACTIVE SUPPLY CHAIN SCENARIO</span>

          <h3>
            {responsePlan?.disaster} —
            {' '}
            {responsePlan?.location}
          </h3>
        </div>

        <div className="sc-command-metrics">

          <div>
            <span>HUBS</span>
            <strong>
              {supplyChainData.supply_hubs.length}
            </strong>
          </div>

          <div>
            <span>ALLOCATIONS</span>
            <strong>
              {supplyChainData.resource_reallocation.length}
            </strong>
          </div>

        </div>

      </div>


      {/* MAIN GRID */}

      <div className="sc-main-grid">


        {/* SUPPLY HUBS */}

        <div className="sc-panel">

          <div className="sc-panel-header">
            <div>
              <span className="sc-panel-tag">
                01 • SUPPLY NETWORK
              </span>

              <h3>Regional Supply Hubs</h3>
            </div>

            <span className="panel-icon">
              ◉
            </span>
          </div>


          <div className="hub-list">

            {supplyChainData.supply_hubs.map((hub, index) => (

              <div className="hub-card" key={index}>

                <div className="hub-status-line">

                  <span
                    className={`hub-dot ${
                      hub.status
                        .toLowerCase()
                        .replaceAll(' ', '-')
                    }`}
                  ></span>

                  <div>

                    <h4>{hub.name}</h4>

                    <p>{hub.role}</p>

                  </div>

                </div>


                <div className="hub-meta">

                  <span className="hub-capacity">
                    Capacity: {hub.capacity}
                  </span>

                  <span
                    className={`hub-status ${
                      hub.status
                        .toLowerCase()
                        .replaceAll(' ', '-')
                    }`}
                  >
                    {hub.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ROUTE INTELLIGENCE */}

        <div className="sc-panel route-panel">

          <div className="sc-panel-header">

            <div>

              <span className="sc-panel-tag">
                02 • LOGISTICS ANALYSIS
              </span>

              <h3>Route Intelligence</h3>

            </div>

            <span className="panel-icon">
              ⌁
            </span>

          </div>


          {/* PRIMARY ROUTE */}

          <div className="route-card primary-route">

            <div className="route-card-header">

              <span>PRIMARY CORRIDOR</span>

              <b>
                {supplyChainData
                  .route_intelligence
                  .primary_route
                  .status}
              </b>

            </div>

            <h4>
              {
                supplyChainData
                  .route_intelligence
                  .primary_route
                  .name
              }
            </h4>

            <p>
              {
                supplyChainData
                  .route_intelligence
                  .primary_route
                  .issue
              }
            </p>

            <div className="route-risk">
              RISK LEVEL:
              <strong>
                {
                  supplyChainData
                    .route_intelligence
                    .primary_route
                    .risk
                }
              </strong>
            </div>

          </div>


          {/* ALTERNATE ROUTE */}

          <div className="route-card alternate-route">

            <div className="route-card-header">

              <span>ALTERNATE CORRIDOR</span>

              <b>
                RECOMMENDED
              </b>

            </div>

            <h4>
              {
                supplyChainData
                  .route_intelligence
                  .alternate_route
                  .name
              }
            </h4>

            <p>
              {
                supplyChainData
                  .route_intelligence
                  .alternate_route
                  .advantage
              }
            </p>

            <div className="route-risk safe">
              RISK LEVEL:
              <strong>
                {
                  supplyChainData
                    .route_intelligence
                    .alternate_route
                    .risk
                }
              </strong>
            </div>

          </div>

        </div>

      </div>


      {/* RESOURCE DEMAND */}

      <div className="sc-panel demand-panel">

        <div className="sc-panel-header">

          <div>

            <span className="sc-panel-tag">
              03 • DEMAND FULFILLMENT
            </span>

            <h3>Resource Allocation Status</h3>

          </div>

          <span className="panel-icon">
            ◈
          </span>

        </div>


        <div className="demand-grid">

          {supplyChainData.resource_demand.map(
            (item, index) => (

              <div
                className="demand-card"
                key={index}
              >

                <span className="demand-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <strong>
                  {item.required.toLocaleString()}
                </strong>

                <p>
                  {item.resource}
                </p>

                <span className="demand-status">
                  {item.status}
                </span>

              </div>

            )
          )}

        </div>

      </div>


      {/* REALLOCATION */}

      <div className="sc-panel reallocation-panel">

        <div className="sc-panel-header">

          <div>

            <span className="sc-panel-tag">
              04 • ADAPTIVE RESPONSE
            </span>

            <h3>Dynamic Resource Reallocation</h3>

          </div>

          <span className="panel-icon">
            ↻
          </span>

        </div>


        <div className="reallocation-list">

          {supplyChainData.resource_reallocation.map(
            (item, index) => (

              <div
                className="reallocation-item"
                key={index}
              >

                <div className="allocation-resource">

                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <strong>
                    {item.resource}
                  </strong>

                </div>


                <div className="allocation-flow">

                  <div>
                    <small>SOURCE</small>
                    <p>{item.source}</p>
                  </div>

                  <span className="flow-arrow">
                    →
                  </span>

                  <div>
                    <small>DESTINATION</small>
                    <p>{item.destination}</p>
                  </div>

                </div>


                <span
                  className={`allocation-priority ${
                    item.priority.toLowerCase()
                  }`}
                >
                  {item.priority}
                </span>

              </div>

            )
          )}

        </div>

      </div>


      {/* AI OPTIMIZATION */}

      <div className="sc-optimization">

        <div className="optimization-icon">
          ✦
        </div>

        <div>

          <span>
            NIRANTAR SUPPLY CHAIN DECISION
          </span>

          <h3>
            Adaptive Logistics Optimization
          </h3>

          <p>
            {supplyChainData.optimization}
          </p>

        </div>

      </div>

    </div>

  )}

</section>




{/* =========================================
    NIRANTAR ANALYTICS CENTER
========================================= */}

<section className="analytics-section" id="analytics">

  <div className="analytics-heading">

    <div>
      <p className="section-tag">
        ◈ DECISION INTELLIGENCE LAYER
      </p>

      <h2>Incident Analytics Center</h2>

      <p>
        Transforming disaster intelligence into measurable risk,
        operational impact and response priorities.
      </p>
    </div>

    <div className="analytics-live">
      <span></span>
      LIVE ANALYTICS
    </div>

  </div>


  {!responsePlan ? (

    /* EMPTY STATE */

    <div className="analytics-empty">

      <div className="analytics-empty-icon">
        ◈
      </div>

      <h3>Awaiting Incident Intelligence</h3>

      <p>
        Run a NIRANTAR disaster analysis to generate dynamic risk,
        impact and response analytics.
      </p>

      <div className="analytics-flow">
        <span>INCIDENT</span>
        <b>→</b>
        <span>ANALYSIS</span>
        <b>→</b>
        <span>INSIGHTS</span>
        <b>→</b>
        <span>DECISION</span>
      </div>

    </div>

  ) : (

    /* ANALYTICS DASHBOARD */

    <div className="analytics-dashboard">


      {/* TOP METRICS */}

      <div className="analytics-metrics">

        <div className="risk-score-card">

          <div className="risk-score-top">
            <span>OVERALL RISK SCORE</span>
            <span className="risk-status">
              {analytics.riskScore >= 85
                ? 'CRITICAL'
                : analytics.riskScore >= 70
                ? 'HIGH'
                : analytics.riskScore >= 50
                ? 'ELEVATED'
                : 'MODERATE'}
            </span>
          </div>

          <div className="risk-score-main">

            <div className="risk-circle">
              <strong>{analytics.riskScore}</strong>
              <span>/100</span>
            </div>

            <div>
              <h3>
                {analytics.riskScore >= 85
                  ? 'Immediate Action Required'
                  : analytics.riskScore >= 70
                  ? 'High Operational Risk'
                  : analytics.riskScore >= 50
                  ? 'Elevated Monitoring Required'
                  : 'Situation Under Control'}
              </h3>

              <p>
                Risk score generated from disaster severity,
                affected population and potential operational disruption.
              </p>
            </div>

          </div>

        </div>


        <div className="analytics-mini-metrics">

          <div className="analytics-mini-card">
            <span>👥</span>
            <div>
              <small>AFFECTED POPULATION</small>
              <strong>
                {analytics.populationNumber.toLocaleString()}
              </strong>
            </div>
          </div>

          <div className="analytics-mini-card">
            <span>⚡</span>
            <div>
              <small>RESPONSE PRIORITY</small>
              <strong>{responsePlan.priority}</strong>
            </div>
          </div>

          <div className="analytics-mini-card">
            <span>⏱</span>
            <div>
              <small>INITIAL ETA</small>
              <strong>{responsePlan.eta}</strong>
            </div>
          </div>

          <div className="analytics-mini-card">
            <span>◉</span>
            <div>
              <small>INCIDENT TYPE</small>
              <strong>{responsePlan.disaster}</strong>
            </div>
          </div>

        </div>

      </div>



      {/* IMPACT ANALYSIS */}

      <div className="analytics-grid">

        <div className="impact-panel">

          <div className="analytics-panel-header">
            <div>
              <span>IMPACT ASSESSMENT</span>
              <h3>Cascading Impact Analysis</h3>
            </div>

            <small>LIVE MODEL</small>
          </div>


          <div className="impact-bars">

            <div className="impact-item">

              <div className="impact-label">
                <span>Humanitarian Impact</span>
                <strong>{analytics.humanitarianImpact}%</strong>
              </div>

              <div className="impact-track">
                <div
                  className="impact-fill humanitarian"
                  style={{
                    width: `${analytics.humanitarianImpact}%`
                  }}
                ></div>
              </div>

            </div>


            <div className="impact-item">

              <div className="impact-label">
                <span>Infrastructure Disruption</span>
                <strong>{analytics.infrastructureImpact}%</strong>
              </div>

              <div className="impact-track">
                <div
                  className="impact-fill infrastructure"
                  style={{
                    width: `${analytics.infrastructureImpact}%`
                  }}
                ></div>
              </div>

            </div>


            <div className="impact-item">

              <div className="impact-label">
                <span>Supply Chain Disruption</span>
                <strong>{analytics.supplyChainImpact}%</strong>
              </div>

              <div className="impact-track">
                <div
                  className="impact-fill supply"
                  style={{
                    width: `${analytics.supplyChainImpact}%`
                  }}
                ></div>
              </div>

            </div>


            <div className="impact-item">

              <div className="impact-label">
                <span>Response Urgency</span>
                <strong>{analytics.responseUrgency}%</strong>
              </div>

              <div className="impact-track">
                <div
                  className="impact-fill urgency"
                  style={{
                    width: `${analytics.responseUrgency}%`
                  }}
                ></div>
              </div>

            </div>

          </div>

        </div>



        {/* INTELLIGENCE INSIGHT */}

        <div className="insight-panel">

          <span className="insight-label">
            ✦ NIRANTAR INTELLIGENCE
          </span>

          <h3>Key Decision Insight</h3>

          <p>
            {responsePlan.disaster} conditions in {responsePlan.location}
            indicate a <strong>{responsePlan.priority.toLowerCase()}</strong> priority
            response scenario. Resource mobilization should focus on
            immediate humanitarian demand while logistics operations
            continuously monitor disruption risks.
          </p>

          <div className="insight-footer">
            <span className="insight-dot"></span>
            Decision confidence: HIGH
          </div>

        </div>

      </div>



      {/* RESOURCE DEMAND */}

      <div className="resource-analytics-panel">

        <div className="analytics-panel-header">

          <div>
            <span>RESOURCE INTELLIGENCE</span>
            <h3>Projected Emergency Demand</h3>
          </div>

          <small>
            {responsePlan.resources.length} RESOURCE CATEGORIES
          </small>

        </div>


        <div className="resource-demand-grid">

          {responsePlan.resources.map((resource, index) => {

            const maxResource = Math.max(
              ...responsePlan.resources.map(r => r.quantity)
            )

            const percentage =
              maxResource > 0
                ? (resource.quantity / maxResource) * 100
                : 0

            return (

              <div
                className="resource-demand-card"
                key={resource.name}
              >

                <div className="resource-demand-top">

                  <span>
                    {index === 0
                      ? '◈'
                      : index === 1
                      ? '◉'
                      : index === 2
                      ? '✚'
                      : '⚡'}
                  </span>

                  <strong>
                    {resource.quantity.toLocaleString()}
                  </strong>

                </div>

                <p>{resource.name}</p>

                <div className="resource-demand-track">

                  <div
                    className="resource-demand-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>

                </div>

              </div>

            )
          })}

        </div>

      </div>



      {/* RESPONSE TIMELINE */}

      <div className="timeline-panel">

        <div className="analytics-panel-header">

          <div>
            <span>OPERATIONAL ROADMAP</span>
            <h3>Response Timeline</h3>
          </div>

        </div>


        <div className="response-timeline">

          <div className="timeline-step active">

            <div className="timeline-node">01</div>

            <div>
              <small>0–6 HOURS</small>
              <h4>Emergency Activation</h4>
              <p>
                Activate command network and initiate critical response.
              </p>
            </div>

          </div>


          <div className="timeline-step">

            <div className="timeline-node">02</div>

            <div>
              <small>6–24 HOURS</small>
              <h4>Resource Mobilization</h4>
              <p>
                Deploy prioritized food, water and medical supplies.
              </p>
            </div>

          </div>


          <div className="timeline-step">

            <div className="timeline-node">03</div>

            <div>
              <small>24–72 HOURS</small>
              <h4>Supply Chain Stabilization</h4>
              <p>
                Activate alternate routes and stabilize distribution.
              </p>
            </div>

          </div>


          <div className="timeline-step">

            <div className="timeline-node">04</div>

            <div>
              <small>72+ HOURS</small>
              <h4>Recovery Monitoring</h4>
              <p>
                Continuously reassess demand and optimize operations.
              </p>
            </div>

          </div>

        </div>

      </div>


    </div>

  )}

</section>




{/* =========================================
    REAL-TIME MONITORING
========================================= */}

<section className="monitoring-section" id="monitoring">

  <div className="monitoring-heading">
    <div>
      <p className="section-tag">LIVE OPERATIONS</p>

      <h2>Real-Time Response Monitoring</h2>

      <p>
        Track incident evolution, resource deployment and supply chain
        movement through a unified operational intelligence layer.
      </p>
    </div>

    <div className="monitoring-live">
      <span className="monitoring-dot"></span>
      SYSTEM LIVE
    </div>
  </div>


  <div className="monitoring-grid">

    {/* LEFT SIDE - LIVE STATUS */}

    <div className="operations-panel">

      <div className="panel-header">
        <div>
          <p className="panel-label">ACTIVE OPERATIONS</p>
          <h3>Response Status</h3>
        </div>

        <span className="active-badge">
          ACTIVE
        </span>
      </div>


      <div className="operation-item">

        <div className="operation-icon">
          🚨
        </div>

        <div className="operation-info">
          <h4>Incident Assessment</h4>
          <p>AI engine continuously evaluating disaster conditions.</p>

          <div className="progress-bar">
            <div className="progress-fill progress-complete"></div>
          </div>
        </div>

        <span className="operation-status complete">
          COMPLETE
        </span>

      </div>


      <div className="operation-item">

        <div className="operation-icon">
          📦
        </div>

        <div className="operation-info">
          <h4>Resource Allocation</h4>
          <p>Prioritized resources assigned to affected regions.</p>

          <div className="progress-bar">
            <div className="progress-fill progress-75"></div>
          </div>
        </div>

        <span className="operation-status running">
          DEPLOYING
        </span>

      </div>


      <div className="operation-item">

        <div className="operation-icon">
          🚚
        </div>

        <div className="operation-info">
          <h4>Supply Chain Routing</h4>
          <p>Optimized logistics routes generated for deployment.</p>

          <div className="progress-bar">
            <div className="progress-fill progress-60"></div>
          </div>
        </div>

        <span className="operation-status running">
          IN TRANSIT
        </span>

      </div>


      <div className="operation-item">

        <div className="operation-icon">
          📡
        </div>

        <div className="operation-info">
          <h4>Field Intelligence</h4>
          <p>Monitoring incoming signals and operational updates.</p>

          <div className="progress-bar">
            <div className="progress-fill progress-40"></div>
          </div>
        </div>

        <span className="operation-status monitoring">
          MONITORING
        </span>

      </div>

    </div>


    {/* RIGHT SIDE - LIVE EVENT STREAM */}

    <div className="event-panel">

      <div className="panel-header">

        <div>
          <p className="panel-label">INTELLIGENCE STREAM</p>
          <h3>Live Event Feed</h3>
        </div>

        <div className="stream-indicator">
          <span></span>
          LIVE
        </div>

      </div>


      <div className="event-stream">

        <div className="event-item">

          <div className="event-time">
            NOW
          </div>

          <div className="event-line">
            <span></span>
          </div>

          <div className="event-content">
            <h4>Resource mobilization initiated</h4>
            <p>
              Priority logistics hubs notified for rapid deployment.
            </p>
          </div>

        </div>


        <div className="event-item">

          <div className="event-time">
            2 MIN
          </div>

          <div className="event-line">
            <span></span>
          </div>

          <div className="event-content">
            <h4>AI response plan generated</h4>
            <p>
              Incident severity and resource demand successfully analyzed.
            </p>
          </div>

        </div>


        <div className="event-item">

          <div className="event-time">
            5 MIN
          </div>

          <div className="event-line">
            <span></span>
          </div>

          <div className="event-content">
            <h4>Logistics routes optimized</h4>
            <p>
              Alternate supply paths identified to reduce disruption risk.
            </p>
          </div>

        </div>


        <div className="event-item">

          <div className="event-time">
            8 MIN
          </div>

          <div className="event-line">
            <span></span>
          </div>

          <div className="event-content">
            <h4>Incident intelligence activated</h4>
            <p>
              NIRANTAR monitoring network initiated continuous analysis.
            </p>
          </div>

        </div>

      </div>


      <div className="network-health">

        <div>
          <span>NETWORK HEALTH</span>
          <strong>98.7%</strong>
        </div>

        <div className="health-bar">
          <div></div>
        </div>

      </div>

    </div>

  </div>

</section>



{/* =========================================
    REPORT A DISASTER
========================================= */}

<section className="report-section" id="report">

  <div className="simulation-heading">
    <p className="section-tag">⚠ COMMUNITY REPORTING</p>
    <h2>Report a Disaster</h2>
    <p>
      Spotted an emergency? Submit the details below and NIRANTAR's
      team will review and activate a response.
    </p>
  </div>

  <div className="report-card">

    {!reportSubmitted ? (

      <form className="report-form" onSubmit={submitReport}>

        <div className="form-header">
          <div>
            <span className="form-step">DISASTER REPORT</span>
            <h3>Incident Details</h3>
          </div>
        </div>

        <div className="form-grid">

          <div className="input-group">
            <label>Disaster Type</label>
            <select
              value={reportForm.disasterType}
              onChange={(e) => handleReportChange('disasterType', e.target.value)}
            >
              <option value="">Select disaster</option>
              <option>Flood</option>
              <option>Landslide</option>
              <option>Cyclone</option>
              <option>Earthquake</option>
              <option>Fire</option>
              <option>Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="City / District, State"
              value={reportForm.location}
              onChange={(e) => handleReportChange('location', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Severity</label>
            <select
              value={reportForm.severity}
              onChange={(e) => handleReportChange('severity', e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          <div className="input-group">
            <label>Estimated Affected Population</label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={reportForm.population}
              onChange={(e) => handleReportChange('population', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Optional"
              value={reportForm.reporterName}
              onChange={(e) => handleReportChange('reporterName', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Contact Number</label>
            <input
              type="text"
              placeholder="Optional"
              value={reportForm.contact}
              onChange={(e) => handleReportChange('contact', e.target.value)}
            />
          </div>

        </div>

        <div className="input-group report-description">
          <label>What's happening?</label>
          <textarea
            rows="4"
            placeholder="Describe the situation..."
            value={reportForm.description}
            onChange={(e) => handleReportChange('description', e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="primary-btn report-submit-btn">
          ⚠ Submit Report →
        </button>

      </form>

    ) : (

      <div className="report-success">
        <div className="preview-icon">✓</div>
        <h3>Report Received</h3>
        <p>
          Thank you — your report on <b>{reportForm.disasterType}</b> in{' '}
          <b>{reportForm.location}</b> has been logged. NIRANTAR's team
          will review it shortly.
        </p>
        <button
          className="secondary-btn"
          onClick={() => {
            setReportSubmitted(false)
            setReportForm({
              disasterType: '',
              location: '',
              severity: 'Medium',
              population: '',
              description: '',
              reporterName: '',
              contact: '',
            })
          }}
        >
          Submit Another Report
        </button>
      </div>

    )}

  </div>

</section>


{/* ================= FOOTER ================= */}

<footer className="nirantar-footer">

  <div className="footer-main">

    {/* Brand */}
    <div className="footer-brand">
      <div className="footer-logo-row">
        <div className="footer-logo">N</div>
        <h2>NIRANTAR</h2>
      </div>

      <p>
        Adaptive intelligence for resilient disaster response and
        supply chain coordination.
      </p>

      <div className="footer-status">
        <span className="status-dot"></span>
        SYSTEM OPERATIONAL
      </div>
    </div>


    {/* Platform */}
    <div className="footer-column">
      <span className="footer-label">PLATFORM</span>

      <p>Incident Intelligence</p>
      <p>Supply Chain Command</p>
      <p>Risk Analytics</p>
      <p>Response Monitoring</p>
    </div>


    {/* Intelligence */}
    <div className="footer-column">
      <span className="footer-label">INTELLIGENCE</span>

      <p>AI Decision Engine</p>
      <p>Resource Allocation</p>
      <p>Logistics Optimization</p>
      <p>Predictive Insights</p>
    </div>


    {/* Mission */}
    <div className="footer-column footer-mission">
      <span className="footer-label">OUR MISSION</span>

      <p>
        Transforming disaster response through intelligent,
        adaptive and connected operations.
      </p>
    </div>

  </div>


  {/* Bottom Bar */}

  <div className="footer-bottom">

    <p>© 2026 NIRANTAR. All systems connected.</p>

    <div className="footer-bottom-right">
      <span>ADAPTIVE</span>
      <span>RESILIENT</span>
      <span>INTELLIGENT</span>
    </div>

  </div>

</footer>

  </div>


  )
}

export default App