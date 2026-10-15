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

        {["Overview", "Mobility Map", "Store Performance", "Store Comparison", "Cannibalization"].map(
          (item) => (
            <button
              key={item}
              className={`nav-item ${activeTab === item ? "active" : ""}`}
              onClick={() => setActiveTab(item)}
            >
              <span>{{
                Overview: "▦",
                "Mobility Map": "◎",
                "Store Performance": "▥",
                "Store Comparison": "⇄",
                Cannibalization: "◉",
              }[item]}</span>
              {item}
            </button>
          )
        )}

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
              <div className={`metric-icon icon-${index}`}>{["⌁", "◉", "⌂", "⇄"][index]}</div>
              <p className="metric-title">{metric.title}</p>
              <h3>{metric.value}</h3>
              <p className="metric-note">{metric.note}</p>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <article className="panel map-panel">
            <div className="panel-header">
              <div>
                <h2>{activeTab === "Mobility Map" ? "Mobility Map Preview" : "Mobility Overview"}</h2>
                <p>Geospatial visualization workspace</p>
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
                <span>Kepler.gl and verified location data will be connected later.</span>
              </div>
            </div>
          </article>

          <article className="panel insights-panel">
            <div className="panel-header">
              <div>
                <h2>Analysis Status</h2>
                <p>Project progress</p>
              </div>
            </div>

            {[
              ["Data preparation", "Completed dataset available", "complete"],
              ["Data validation", "Validation script available", "complete"],
              ["Store analytics", "Store locations required", "pending"],
              ["Cannibalization", "SQL analysis to be validated", "pending"],
              ["Map integration", "Kepler.gl not connected", "pending"],
            ].map(([title, description, status]) => (
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

        <footer>
          <span>GeoPulse · Retail Mobility Analytics</span>
          <span>Prototype · Data connections not yet configured</span>
        </footer>
      </main>
    </div>
  );
}

export default App;