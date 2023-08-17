import "./App.css";
import ResultCard from "./assets/Chart.jsx";
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

console.log(dataArray);

export const WebsocketComponent = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const socket = io('ws://localhost:4040');

    socket.emit('nconn', '1zzB8xGjJcVpJrr-RpZsJU441-x6xcWE3V4SWXKifnpo');
    
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('relay', (data) => {
      setMessage(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const dataArray = Object.keys(message).map((questionKey) => ({
    title: message[questionKey].title,
    choices: message[questionKey].choices,
  }));
  
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
  
export default function App() {
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
