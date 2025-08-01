import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

import { Box, Typography, Button, CircularProgress } from '@mui/material';

function HomePage({ setParsedData }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUploadFiles = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      workers: true,
      complete: (results) => {
        const formatted = results.data.map(row => ({
          ...row,
          step: Number(row.step),
          value: Number(row.value),
        }));
        setParsedData(formatted);
        setLoading(false);
        navigate('/dashboard');
      }
    });
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        MLExperiment Tracker
      </Typography>

      <Button
        variant="contained"
        component="label"
        disabled={loading}
      >
        Upload CSV File
        <input
          hidden
          type="file"
          accept=".csv"
          onChange={handleUploadFiles}
        />
      </Button>

      {loading && (
        <Box sx={{ mt: 3 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 1 }}>
            Loading file, please wait...
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default HomePage;
