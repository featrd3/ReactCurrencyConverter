import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const TimeframePlot = ({inputLabels,inputData,labelCode}) => { 

    const labels = inputLabels;
    const data = {
        labels: labels,
        datasets: [{
            label: labelCode,
            data: inputData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return (
        <div>
          <Line labels={labels} data ={data}/>
      </div>
    );
};

  


export default TimeframePlot;