import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import theme from './theme';
import SGPAPage from './components/SGPACalculator';
import CGPAPage from './components/CGPACalculatorPage';

function App() {
  const [tab, setTab] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', bgcolor: 'background.default', minHeight: '100vh' }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          centered
          sx={{ mb: 2, pt: 2 }}
        >
          <Tab label="SGPA Calculator" />
          <Tab label="CGPA Calculator" />
        </Tabs>
        {tab === 0 && <SGPAPage />}
        {tab === 1 && <CGPAPage />}
      </Box>
    </ThemeProvider>
  );
}

export default App; 