import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

function ResultCard({ title, choices }) {
  const chartData = {
    labels: Object.keys(choices),
    datasets: [
      {
        data: Object.values(choices),
        backgroundColor: ["orange", "lime", "yellow", "red", "green"].slice(
          0,
          Object.keys(choices).length
        ),
        borderColor: ["black"],
      },
    ],
  };
  const options = {};

  return (
    <div className="result-card">
      <h2 className="poll-title">{title}</h2>
      <div className="result-container">
        <div>
          {Object.entries(choices).map(([nominee, votes]) => (
            <div className="nominee">
              <h3 className="name">{nominee}</h3>
              <p className="votes">{votes}</p>
            </div>
          ))}
        </div>
        <div className="chart">
          <Doughnut
            data={chartData}
            options={options}
            //   width={100}
            //   height={100}
          />
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
