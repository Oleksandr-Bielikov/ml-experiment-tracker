import Plot from 'react-plotly.js';

const colorPalette = [
  '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00',
  '#a65628', '#f781bf', '#999999', '#66c2a5', '#fc8d62'
];

function MetricsCharts({ parsedData, selectedExperiments, metrics }) {
  const getPlotData = (metricName) => {
    return selectedExperiments.map((expId, index) => {
      const expData = parsedData
        .filter(row => row.metric_name === metricName && row.experiment_id === expId)
        .sort((a, b) => a.step - b.step);

      return {
        x: expData.map(row => row.step),
        y: expData.map(row => row.value),
        type: 'scattergl',
        mode: 'lines',
        name: expId,
        line: {
          color: colorPalette[index % colorPalette.length],
          width: 1.5,
        },
      };
    });
  };

  return (
    <>
      {metrics.map(metric => (
        <details key={metric} style={{ marginBottom: 24 }}>
          <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>Metric: {metric}</summary>
          <Plot
            data={getPlotData(metric)}
            layout={{
              title: `Metric: ${metric}`,
              xaxis: { title: 'Step' },
              yaxis: { title: metric },
              hovermode: 'closest',
              legend: { orientation: 'h', y: -0.2 },
              width: '100%',
              height: 400,
              autosize: true,
            }}
            config={{ responsive: true }}
            style={{ width: '100%', height: '400px' }}
          />
        </details>
      ))}
    </>
  );
}

export default MetricsCharts;
