import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ReportDisaster.css'

function ReportDisaster() {

  const [disasterType, setDisasterType] = useState('')
  const [location, setLocation] = useState('')
  const [severity, setSeverity] = useState('Medium')
  const [description, setDescription] = useState('')
  const [reporterName, setReporterName] = useState('')
  const [contact, setContact] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reportResult, setReportResult] = useState(null)


  const submitReport = async (e) => {

    e.preventDefault()

    if (!disasterType || !location || !description) {
      alert('Please fill all required fields.')
      return
    }

    setIsSubmitting(true)
    setReportResult(null)

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/report-disaster',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            disaster_type: disasterType,
            location: location,
            severity: severity,
            description: description,
            reporter_name: reporterName,
            contact: contact,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to submit disaster report')
      }

      const data = await response.json()

      setReportResult(data)

    } catch (error) {

      console.error(error)

      alert(
        'Unable to submit report. Please check the NIRANTAR backend connection.'
      )

    } finally {

      setIsSubmitting(false)

    }

  }


  return (

    <div className="report-page">

      {/* NAVBAR */}

      <nav className="report-navbar">

        <Link to="/" className="report-logo">

          <div className="report-logo-icon">✦</div>

          <div>
            <h2>NIRANTAR</h2>
            <span>Resilient Together</span>
          </div>

        </Link>


        <Link to="/" className="back-home">
          ← Back to Command Center
        </Link>

      </nav>



      {/* MAIN */}

      <main className="report-container">

        <div className="report-header">

          <p className="report-tag">
            ⚠ INCIDENT REPORTING SYSTEM
          </p>

          <h1>Report a Disaster</h1>

          <p>
            Submit verified incident information to the NIRANTAR
            intelligence network for rapid assessment and response coordination.
          </p>

        </div>



        {!reportResult ? (

          <div className="report-grid">


            {/* FORM */}

            <form
              className="report-form"
              onSubmit={submitReport}
            >

              <div className="report-form-header">

                <div>

                  <span>INCIDENT DETAILS</span>

                  <h2>Provide Disaster Information</h2>

                </div>

                <div className="report-status">
                  <span></span>
                  SECURE CHANNEL
                </div>

              </div>



              <div className="report-input-grid">


                {/* Disaster Type */}

                <div className="report-input-group">

                  <label>Disaster Type *</label>

                  <select
                    value={disasterType}
                    onChange={(e) =>
                      setDisasterType(e.target.value)
                    }
                  >

                    <option value="">
                      Select disaster type
                    </option>

                    <option>Flood</option>
                    <option>Landslide</option>
                    <option>Cyclone</option>
                    <option>Earthquake</option>
                    <option>Wildfire</option>
                    <option>Fire</option>
                    <option>Other</option>

                  </select>

                </div>



                {/* Location */}

                <div className="report-input-group">

                  <label>Location *</label>

                  <input
                    type="text"
                    placeholder="City, District, State"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                  />

                </div>



                {/* Severity */}

                <div className="report-input-group full-width">

                  <label>Estimated Severity</label>

                  <div className="report-severity-options">

                    {['Low', 'Medium', 'High', 'Critical'].map(
                      (level) => (

                        <button
                          type="button"
                          key={level}
                          className={
                            severity === level
                              ? `active ${level.toLowerCase()}`
                              : ''
                          }
                          onClick={() =>
                            setSeverity(level)
                          }
                        >
                          {level}
                        </button>

                      )
                    )}

                  </div>

                </div>



                {/* Description */}

                <div className="report-input-group full-width">

                  <label>Incident Description *</label>

                  <textarea
                    placeholder="Describe what happened, affected areas, immediate risks, or urgent requirements..."
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                  />

                </div>



                {/* Reporter */}

                <div className="report-input-group">

                  <label>Your Name (Optional)</label>

                  <input
                    type="text"
                    placeholder="Name"
                    value={reporterName}
                    onChange={(e) =>
                      setReporterName(e.target.value)
                    }
                  />

                </div>



                {/* Contact */}

                <div className="report-input-group">

                  <label>Contact Number (Optional)</label>

                  <input
                    type="text"
                    placeholder="Contact information"
                    value={contact}
                    onChange={(e) =>
                      setContact(e.target.value)
                    }
                  />

                </div>

              </div>



              <button
                type="submit"
                className="submit-report-btn"
                disabled={isSubmitting}
              >

                {isSubmitting
                  ? 'SUBMITTING INCIDENT...'
                  : '⚠ SUBMIT DISASTER REPORT'
                }

                <span>→</span>

              </button>

            </form>



            {/* SIDE PANEL */}

            <div className="report-info-panel">

              <div className="info-glow"></div>


              <div className="info-content">

                <div className="info-icon">
                  ◉
                </div>

                <p className="info-tag">
                  NIRANTAR RESPONSE NETWORK
                </p>

                <h2>
                  Every Report Can
                  <br />
                  Trigger Action.
                </h2>

                <p className="info-description">

                  Submitted incidents enter the NIRANTAR
                  intelligence workflow for assessment,
                  prioritization and coordinated response planning.

                </p>


                <div className="report-process">

                  <div className="process-item">

                    <span>01</span>

                    <div>
                      <h4>Report Received</h4>
                      <p>Incident enters the intelligence network</p>
                    </div>

                  </div>


                  <div className="process-line"></div>


                  <div className="process-item">

                    <span>02</span>

                    <div>
                      <h4>AI Assessment</h4>
                      <p>Severity and potential impact evaluated</p>
                    </div>

                  </div>


                  <div className="process-line"></div>


                  <div className="process-item">

                    <span>03</span>

                    <div>
                      <h4>Response Coordination</h4>
                      <p>Relevant stakeholders can be alerted</p>
                    </div>

                  </div>

                </div>


                <div className="emergency-note">

                  <span>⚠</span>

                  <p>
                    For immediate life-threatening emergencies,
                    contact local emergency services directly.
                  </p>

                </div>

              </div>

            </div>


          </div>

        ) : (

          /* SUCCESS STATE */

          <div className="report-success">

            <div className="success-icon">
              ✓
            </div>

            <p className="report-tag">
              INCIDENT SUCCESSFULLY REGISTERED
            </p>

            <h1>
              Report Received
            </h1>

            <p>
              NIRANTAR has successfully received the disaster incident.
              The information is now available for intelligence assessment
              and response coordination.
            </p>


            <div className="incident-card">

              <div>

                <span>INCIDENT ID</span>

                <strong>
                  {reportResult.incident_id}
                </strong>

              </div>


              <div>

                <span>REPORTED AT</span>

                <strong>
                  {reportResult.reported_at}
                </strong>

              </div>


              <div>

                <span>STATUS</span>

                <strong className="received-status">
                  RECEIVED
                </strong>

              </div>

            </div>


            <div className="success-actions">

              <button
                className="new-report-btn"
                onClick={() => {

                  setReportResult(null)

                  setDisasterType('')
                  setLocation('')
                  setSeverity('Medium')
                  setDescription('')
                  setReporterName('')
                  setContact('')

                }}
              >
                Report Another Incident
              </button>


              <Link
                to="/"
                className="return-home-btn"
              >
                Return to Command Center →
              </Link>

            </div>

          </div>

        )}

      </main>

    </div>

  )

}

export default ReportDisaster