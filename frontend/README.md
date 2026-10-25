# GeoPulse – Retail Mobility Analytics

## Project Overview
GeoPulse is a retail mobility analytics dashboard designed to explore GPS movement patterns, store activity, and potential store cannibalization.

## Technology Stack
- React
- Vite
- JavaScript
- CSS
- Kepler.gl (geospatial visualization integration)

## Dashboard Features
- Overview dashboard
- Mobility map section
- Store performance section
- Store comparison section
- Store cannibalization analysis section

## Prerequisites
- Node.js
- npm

## Run the Application

Open a terminal in the `frontend` directory and execute:

```bash
npm install
npm run dev
```

Open the local address displayed in the terminal to view the dashboard.

## Project Structure

```text
frontend/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Data Validation
GPS data validation is handled by Python scripts in the main project's `scripts/` directory. These scripts check data availability, coordinate validity, and traffic periods.

## Important Note
The dashboard's map and analytics features should be connected to validated geospatial data before being used for real business decisions. A displayed dashboard section does not necessarily mean its underlying live data integration is complete.

## Project Status
GeoPulse frontend dashboard structure and navigation have been developed. Further work includes completing map integration, connecting validated data, and verifying store-level cannibalization results.