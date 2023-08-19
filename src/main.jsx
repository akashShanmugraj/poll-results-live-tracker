import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="header">
      <p className="live-poll-tracker">Live Poll Tracker</p>
      <p className="credits">hosted with ❤️ by <a href="https://github.com/akashShanmugraj">@akashShanmugraj</a> and <a href="https://github.com/kishoreadhith-v/poll-results-live-tracker/">@kishoreadhith-v</a></p>
    </div>
    <App />
  </React.StrictMode>
);
