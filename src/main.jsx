import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="header">
      <p className="live-poll-tracker">Live Poll Tracker</p>
      <p className="credits">Hosted with ❤️ by Akash and Kishore</p>
    </div>
    <App />
  </React.StrictMode>
);
