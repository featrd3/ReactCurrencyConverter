import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const TimeframePlot = ({inputLabels, inputData, labelCode}) => { 

    const labels = inputLabels;
    const data = {
        labels: labels,
        datasets: [{
            label: labelCode,
            data: inputData,
            fill: false,
            borderColor: 'rgb(93, 139, 244)',
            tension: 0.1
        }]};
    const options = {
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 14,
                            family: "'Cambria', 'Cochin', 'Georgia', 'Times', 'Times New Roman', serif"
                        }
                    }
                }
            }
        }

    return (
        <div>
          <Line className = "lineChart" labels = {labels} data = {data} options = {options}/>
      </div>
    );
};

export default TimeframePlot;