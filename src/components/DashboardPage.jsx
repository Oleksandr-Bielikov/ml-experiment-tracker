import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Drawer, Typography, FormControlLabel, Checkbox, Divider } from '@mui/material';

import MetricsCharts from './MetricsCharts';

function DashboardPage({ parsedData, setParsedData }) {
  const [selectedExperiments, setSelectedExperiments] = useState([]);
  const navigate = useNavigate();

  const experiments = useMemo(() => [...new Set(parsedData.map(r => r.experiment_id))], [parsedData]);
  const metrics = useMemo(() => [...new Set(parsedData.map(r => r.metric_name))], [parsedData]);

  const handleExperimentSelection = (e) => {
    const { value, checked } = e.target;
    setSelectedExperiments(prev =>
      checked ? [...prev, value] : prev.filter(id => id !== value)
    );
  };

  const toggleSelectAll = () => {
    if (selectedExperiments.length === experiments.length) {
      setSelectedExperiments([]);
    } else {
      setSelectedExperiments(experiments);
    }
  };

  const goBack = () => {
    setParsedData([]);
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: '30%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '30%',
            boxSizing: 'border-box',
            padding: 2,
          },
        }}
      >
        <Typography variant="h5" gutterBottom>MLExperiment Tracker</Typography>

        <Button variant="outlined" onClick={goBack} sx={{ mb: 2 }}>
          Back to Home
        </Button>

        <Button
          variant="contained"
          fullWidth
          onClick={toggleSelectAll}
          sx={{ mb: 2 }}
        >
          {selectedExperiments.length === experiments.length ? 'Deselect All' : 'Select All'}
        </Button>

        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>Experiments:</Typography>
        <Box sx={{ overflowY: 'auto', maxHeight: '70vh', display: 'flex', flexDirection: 'column' }}>
          {experiments.map(id => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  value={id}
                  checked={selectedExperiments.includes(id)}
                  onChange={handleExperimentSelection}
                />
              }
              label={id}
            />
          ))}
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        {metrics.length === 0 ? (
          <Typography>No metrics to display</Typography>
        ) : selectedExperiments.length === 0 ? (
          <Typography>Select at least one experiment to view charts</Typography>
        ) : (
          <MetricsCharts
            parsedData={parsedData}
            selectedExperiments={selectedExperiments}
            metrics={metrics}
          />
        )}
      </Box>
    </Box>
  );
}

export default DashboardPage;
