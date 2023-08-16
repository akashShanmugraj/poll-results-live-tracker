import "./App.css";
import ResultCard from "./assets/Chart.jsx";
import data from "./sample.json";
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';


const dataArray = [{"title":"Male Representative","choices":{"Person 1":6,"Person 2":3,"Person 3":1}},{"title":"Female Representative","choices":{"Person 1":4,"Person 2":10}}]

export default function App() {

  useEffect(() => {
    const socket = io('ws://localhost:4040');

    socket.emit('nconn', '1zzB8xGjJcVpJrr-RpZsJU441-x6xcWE3V4SWXKifnpo');
    socket.on('relay', (data) => {
      console.log('Connected to server')
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
}, []);
  const renderCharts = dataArray.map((question) => (
    <ResultCard title={question.title} choices={question.choices} />
  ));
  
  return (
    <>
      <div className="info">
        <h3 className="results">Results</h3>
        <h1 className="sem-poll">Semester 3 CR Poll</h1>
        <span className="live">
          <p>• LIVE</p>
        </span>
      </div>
      <div className="result-cards-container">{renderCharts}</div>
    </>
  );
}
