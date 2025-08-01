import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import DashboardPage from './components/DashboardPage';

function App() {
  const [parsedData, setParsedData] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage setParsedData={setParsedData} />} />
        <Route path="/dashboard" element={<DashboardPage parsedData={parsedData} setParsedData={setParsedData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
