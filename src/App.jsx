import "./App.css";
import ResultCard from "./assets/Chart.jsx";
import data from "./sample.json";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

function objecttoArray(data) {
  const dataArray = Object.keys(data).map((questionKey) => ({
    title: data[questionKey].title,
    choices: data[questionKey].choices,
  }));
  return dataArray;
}

const socket = io("ws://localhost:4040");
socket.emit("nconn", "1zzB8xGjJcVpJrr-RpZsJU441-x6xcWE3V4SWXKifnpo");
socket.on("load", (data) => {
  console.log("DATALOAD");
  dataArray = objecttoArray(data);
});

export default function App() {
  const [data, setData] = useState([]);
  const [isLive, setIsLive] = useState(true);

  const handleClick = () => {
    setIsLive(!isLive);
  };

  useEffect(() => {
    socket.on("relay", (data) => {
      setData(objecttoArray(data));
    });
    socket.on("load", (data) => {
      console.log("DATALOAD");
      setData(objecttoArray(data));
    });
    socket.on("stop", (data) => {
      console.log("STOP");
      setIsLive(false);
    });
  }, []);

  const dataArray = objecttoArray(data);

  const globalRenderCharts = dataArray.map((question) => (
    <ResultCard title={question.title} choices={question.choices} />
  ));

  return (
    <div className="main">
      <div className="info">
        <h3 className="results">Results</h3>
        <h1 className="sem-poll">Semester 3 CR Poll</h1>
        <p className="form-host-info">Form hosting by S Akash (22z255@psgtech.ac.in)</p>

          <p className={isLive ? 'live-active':'live-inactive'} onClick={handleClick}>
            <b>◉ {isLive ? 'LIVE':'CLOSED'}</b>
          </p>
        </div>
      <div className="result-cards-container">{globalRenderCharts}</div>
    </div>
  );
}
