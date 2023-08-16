import "./App.css";
import ResultCard from "./assets/Chart.jsx";
import data from "./sample.json";

const dataArray = Object.keys(data).map((questionKey) => ({
  title: data[questionKey].title,
  choices: data[questionKey].choices,
}));

console.log(dataArray);

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
