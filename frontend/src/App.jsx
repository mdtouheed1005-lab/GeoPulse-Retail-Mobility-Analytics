
import { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("Overview");

  const metrics = [
    { title: "Total GPS Records", value: "15.2M", note: "Processed location records" },
    { title: "Unique Devices", value: "—", note: "Awaiting verified aggregation" },
    { title: "Active Stores", value: "—", note: "Store data not connected" },
    { title: "Multi-Store Visitors", value: "—", note: "Cannibalization analysis pending" },
  ];

  const navItems = [
    "Overview",
    "Mobility Map",
    "Store Performance",
    "Store Comparison",
    "Cannibalization",
  ];

  const statusItems = [
    ["Data preparation", "Cleaned dataset available", "complete"],
    ["Data validation", "Validation script available", "complete"],
    ["Store analytics", "Store location data required", "pending"],
    ["Cannibalization", "SQL analysis needs validation", "pending"],
    ["Map integration", "Kepler.gl connection pending", "pending"],
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">G</div>
          <div>
            <h2>GeoPulse</h2>
            <p>RETAIL INTELLIGENCE</p>
          </div>
        </div>

        <p className="menu-label">WORKSPACE</p>

        {navItems.map((item) => (
          <button
            key={item}
            className={`nav-item ${activeTab === item ? "active" : ""}`}
            onClick={() => setActiveTab(item)}
          >
            <span>
              {{
                Overview: "▦",
                "Mobility Map": "◎",
                "Store Performance": "▥",
                "Store Comparison": "⇄",
                Cannibalization: "◉",
              }[item]}
            </span>
            {item}
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="status-dot" />
          <span>Dashboard prototype</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / {activeTab}</p>
            <h1>{activeTab}</h1>
          </div>
          <div className="profile">
            <span className="online-dot" />
            Local Preview
          </div>
        </header>

        {activeTab === "Overview" && (
          <>
            <section className="welcome">
              <div>
                <p className="eyebrow">RETAIL MOBILITY ANALYTICS</p>
                <h2>Understand movement.<br />Discover opportunities.</h2>
                <p className="welcome-text">
                  Explore mobility patterns and prepare store-level insights
                  from location data.
                </p>
              </div>
              <div className="welcome-art">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="map-pin">⌖</div>
                <span className="map-label">MOBILITY</span>
              </div>
            </section>

            <div className="section-heading">
              <div>
                <h2>Key Metrics</h2>
                <p>Current dataset and analysis status</p>
              </div>
              <span className="demo-badge">PROTOTYPE</span>
            </div>

            <section className="metrics-grid">
              {metrics.map((metric, index) => (
                <article className="metric-card" key={metric.title}>
                  <div className={`metric-icon icon-${index}`}>
                    {["⌁", "◉", "⌂", "⇄"][index]}
                  </div>
                  <p className="metric-title">{metric.title}</p>
                  <h3>{metric.value}</h3>
                  <p className="metric-note">{metric.note}</p>
                </article>
              ))}
            </section>

            <section className="content-grid">
              <article className="panel">
                <div className="panel-header">
                  <div>
                    <h2>Project Overview</h2>
                    <p>Current progress</p>
                  </div>
                </div>
                {statusItems.map(([title, description, status]) => (
                  <div className="status-row" key={title}>
                    <span className={`status-icon ${status}`}>
                      {status === "complete" ? "✓" : "•"}
                    </span>
                    <div>
                      <strong>{title}</strong>
                      <p>{description}</p>
                    </div>
                    <span className={`status-label ${status}`}>
                      {status === "complete" ? "READY" : "PENDING"}
                    </span>
                  </div>
                ))}
              </article>
            </section>
          </>
        )}

        {activeTab === "Mobility Map" && (
          <>
            <div className="section-heading">
              <div>
                <h2>Mobility Map</h2>
                <p>Explore geographic movement patterns</p>
              </div>
              <span className="demo-badge">INTEGRATION PENDING</span>
            </div>
            <section className="panel map-panel">
              <div className="panel-header">
                <div>
                  <h2>Map Workspace</h2>
                  <p>GPS visualization preview</p>
                </div>
                <span className="panel-tag">MAP</span>
              </div>
              <div className="map-placeholder">
                <div className="map-grid" />
                <div className="route route-one" />
                <div className="route route-two" />
                {[
                  ["18%", "25%"],
                  ["34%", "55%"],
                  ["53%", "30%"],
                  ["70%", "62%"],
                  ["83%", "37%"],
                  ["46%", "75%"],
                ].map(([left, top], index) => (
                  <span
                    className={`map-point point-${index}`}
                    style={{ left, top }}
                    key={left}
                  />
                ))}
                <div className="map-overlay">
                  <strong>Map integration pending</strong>
                  <span>
                    Connect Kepler.gl and verified GPS data to show real
                    movement patterns.
                  </span>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === "Store Performance" && (
          <>
            <div className="section-heading">
              <div>
                <h2>Store Performance</h2>
                <p>Store-level visitor and activity analysis</p>
              </div>
              <span className="demo-badge">AWAITING DATA</span>
            </div>
            <section className="metrics-grid">
              {[
                ["Active Stores", "—", "Store locations not connected"],
                ["Total Visits", "—", "Visit aggregation pending"],
                ["Peak Traffic", "—", "Time-based analysis pending"],
                ["Unique Visitors", "—", "Device aggregation pending"],
              ].map(([title, value, note]) => (
                <article className="metric-card" key={title}>
                  <p className="metric-title">{title}</p>
                  <h3>{value}</h3>
                  <p className="metric-note">{note}</p>
                </article>
              ))}
            </section>
            <section className="panel">
              <h2>Store Analytics</h2>
              <p>
                Store coordinates and verified visit data are required before
                performance rankings can be calculated.
              </p>
            </section>
          </>
        )}

        {activeTab === "Store Comparison" && (
          <>
            <div className="section-heading">
              <div>
                <h2>Store Comparison</h2>
                <p>Compare visitor activity across retail locations</p>
              </div>
              <span className="demo-badge">AWAITING DATA</span>
            </div>
            <section className="panel">
              <h2>Comparison Workspace</h2>
              <p>
                Store comparison will be available after store locations,
                visit counts, and time-period aggregations are connected.
              </p>
              <div className="status-row">
                <div>
                  <strong>Visitor comparison</strong>
                  <p>Requires verified store-level visitor counts</p>
                </div>
                <span className="status-label pending">PENDING</span>
              </div>
              <div className="status-row">
                <div>
                  <strong>Traffic by time of day</strong>
                  <p>Requires validated timestamps and store visits</p>
                </div>
                <span className="status-label pending">PENDING</span>
              </div>
            </section>
          </>
        )}

        {activeTab === "Cannibalization" && (
          <>
            <div className="section-heading">
              <div>
                <h2>Cannibalization Analysis</h2>
                <p>Identify visitors shared by multiple stores</p>
              </div>
              <span className="demo-badge">VALIDATION PENDING</span>
            </div>
            <section className="metrics-grid">
              {[
                ["Multi-Store Visitors", "—", "Requires store visit mapping"],
                ["Stores Analyzed", "—", "Store data not connected"],
                ["Overlap Percentage", "—", "Calculation pending"],
                ["Potential Overlap", "—", "Requires validated analysis"],
              ].map(([title, value, note]) => (
                <article className="metric-card" key={title}>
                  <p className="metric-title">{title}</p>
                  <h3>{value}</h3>
                  <p className="metric-note">{note}</p>
                </article>
              ))}
            </section>
            <section className="panel">
              <h2>Analysis Status</h2>
              <p>
                Cannibalization measures how many devices visit more than one
                store during the defined analysis period. Real results require
                validated SQL and store-location data.
              </p>
            </section>
          </>
        )}

        <footer>
          <span>GeoPulse · Retail Mobility Analytics</span>
          <span>Prototype · Data connections not yet configured</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
