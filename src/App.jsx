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

const socket = io("wss://socket.akashshanmugaraj.com");
socket.emit("nconn", "1HgY1RF_ZYBSJ1ZFhwCp6uCuexrTOL2jetm5tg0vcxsg");

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
console.log(timeZone);

socket.on("load", (data) => {
  console.log("DATALOAD");
  dataArray = objecttoArray(data);
});


export default function App() {
  const [data, setData] = useState([]);
  const [isLive, setIsLive] = useState(true);
  const [doAbort, setDoAbort] = useState(false);

  useEffect(() => {
    socket.on("relay", (data) => {
      setData(objecttoArray(data));
    });
    socket.on("load", (data) => {
      console.log("DATALOAD");
      setData(objecttoArray(data));
    });
    socket.on("stop", (data) => {
      console.log("STOPPING");
      setIsLive(false);
    });
    socket.on("start", (data) => {
      console.log("STARTING");
      setIsLive(true);
      setDoAbort(false);
    });
    socket.on("reload", (data) => {
      console.log("RELOADING");
      window.location.reload();
      setIsLive(true);
    });
    socket.on("abort", (data) => {
      console.log("ABORTING");
      setDoAbort(true);
      setIsLive(false);
    });
  }, []);

  var dataArray = data;

  var globalRenderCharts = doAbort ? "Don't Cheat" : dataArray.map((question) => (
    <ResultCard title={question.title} choices={question.choices} />
  ));
  

  return (
    <div className="main">
      <div className="info">
        <h3 className="results">Best Viewing Experience at 67% zoom</h3>
        <h1 className={doAbort? "cheat-notice" : "sem-poll"}>{doAbort ? "🫵 tried to cheat in a CR Poll 😒" : "Semester 5 CR Poll"}</h1>
        {/* <p className="form-host-info">Form hosting by S Akash (22z255@psgtech.ac.in)</p> */}
        {/* <p className="form-host-info">This form was closed on 21st September 2023, please wait till 10th December 2023 22:00 IST while I try to add interactiveness</p> */}
        <p
          className={isLive ? "live-active" : "live-inactive"}
        >
          <b>◉ {isLive ? "LIVE" : "CLOSED"}</b>
        </p>
      </div>
      <div className="result-cards-container">{globalRenderCharts}</div>
    </div>
  );
}
