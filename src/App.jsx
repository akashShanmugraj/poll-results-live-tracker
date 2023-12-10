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
socket.emit("nconn", "1xRCUrDrctRtHAAxFyFowYNpB4pt3Nxuviw4_gm4-bQQ");

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
console.log(timeZone);

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
        <h3 className="results">Best Viewing Experience at 67% zoom</h3>
        <h1 className="sem-poll">Semester 3 CR Poll</h1>
        <p className="form-host-info">Form hosting by S Akash (22z255@psgtech.ac.in)</p>
        <p className="form-host-info">This form was closed on 21st September 2023, please wait till 10th December 2023 22:00 IST while I try to add interactiveness</p>
          <p className='live-inactive'>
            <b>◉ CLOSED</b>
          </p>
        </div>
      <div className="result-cards-container">{globalRenderCharts}</div>
    </div>
  );
}
