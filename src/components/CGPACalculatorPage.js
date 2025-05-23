import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Fade,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FlowerDecoration from '../assets/FlowerDecoration';

const DEFAULT_ROWS = 2;

const emptySemester = {
  sgpa: '',
  credits: '',
};

const calculateCGPA = (semesters) => {
  let totalCreditPoints = 0;
  let totalCredits = 0;
  semesters.forEach((sem) => {
    if (sem.sgpa && sem.credits) {
      totalCreditPoints += parseFloat(sem.sgpa) * parseFloat(sem.credits);
      totalCredits += parseFloat(sem.credits);
    }
  });
  return totalCredits > 0 ? Number((totalCreditPoints / totalCredits).toFixed(2)) : 0;
};

const CGPACalculatorPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [semesters, setSemesters] = useState(Array.from({ length: DEFAULT_ROWS }, () => ({ ...emptySemester })));
  const [showResult, setShowResult] = useState(false);
  const [cgpa, setCGPA] = useState(0);

  const handleSemesterChange = (idx, field, value) => {
    const updated = [...semesters];
    updated[idx][field] = value;
    setSemesters(updated);
  };

  const handleAddSemester = () => {
    setSemesters([...semesters, { ...emptySemester }]);
  };

  const handleRemoveSemester = (idx) => {
    const updated = [...semesters];
    updated.splice(idx, 1);
    setSemesters(updated);
  };

  const getFilledSemesters = (semesters) =>
    semesters.filter((s) => s.sgpa && s.credits);

  const handleCalculate = () => {
    const filled = getFilledSemesters(semesters);
    setCGPA(calculateCGPA(filled));
    setShowResult(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: isMobile ? 1 : 4, position: 'relative' }}>
      <Fade in timeout={1200}>
        <Box sx={{ position: 'absolute', top: -30, left: -30, zIndex: 0 }}>
          <FlowerDecoration style={{ opacity: 0.3, transform: 'rotate(-15deg)' }} />
        </Box>
      </Fade>
      <Fade in timeout={1200}>
        <Box sx={{ position: 'absolute', bottom: -30, right: -30, zIndex: 0 }}>
          <FlowerDecoration style={{ opacity: 0.3, transform: 'rotate(20deg)' }} />
        </Box>
      </Fade>
      <Paper
        elevation={6}
        sx={{
          p: isMobile ? 1.5 : 4,
          borderRadius: 5,
          background: 'linear-gradient(135deg, #fce4ec 60%, #b388ff22 100%)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          gutterBottom
          align="center"
          sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1, fontSize: isMobile ? 22 : undefined }}
        >
          <span role="img" aria-label="flower">🌸</span> CGPA Calculator <span role="img" aria-label="flower">🌸</span>
        </Typography>
        <Alert
          severity="info"
          sx={{
            mb: 3,
            background: '#fff1fa',
            color: 'secondary.main',
            border: '1px solid #f06292',
            fontSize: isMobile ? 13 : 16,
          }}
        >
          Enter the SGPA and total credits for each semester. Only filled rows are used for calculation.
        </Alert>
        {semesters.map((sem, idx) => (
          <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: isMobile ? 'wrap' : 'nowrap', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              size={isMobile ? 'small' : 'medium'}
              placeholder="SGPA"
              value={sem.sgpa}
              type="number"
              inputProps={{ min: 0, max: 10, step: 0.01 }}
              onChange={(e) => handleSemesterChange(idx, 'sgpa', e.target.value)}
              sx={{ background: '#fff', borderRadius: 2, flex: 2, minWidth: 80 }}
            />
            <TextField
              variant="outlined"
              size={isMobile ? 'small' : 'medium'}
              placeholder="Credits"
              value={sem.credits}
              type="number"
              inputProps={{ min: 0, step: 0.5 }}
              onChange={(e) => handleSemesterChange(idx, 'credits', e.target.value)}
              sx={{ background: '#fff', borderRadius: 2, flex: 2, minWidth: 80 }}
            />
            <Button
              color="secondary"
              variant="outlined"
              size={isMobile ? 'small' : 'medium'}
              onClick={() => handleRemoveSemester(idx)}
              sx={{ minWidth: 0, px: 1 }}
              disabled={semesters.length <= 1}
            >
              ✕
            </Button>
          </Box>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Button
            variant="text"
            color="primary"
            onClick={handleAddSemester}
            sx={{ fontWeight: 600, fontSize: isMobile ? 13 : 16 }}
          >
            + Add Semester
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCalculate}
            sx={{ fontWeight: 600, px: 4, py: 1.5, fontSize: isMobile ? 15 : 18, borderRadius: 3, boxShadow: 2 }}
          >
            Calculate CGPA
          </Button>
        </Box>
        {showResult && (
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{ mt: 4, color: 'secondary.main', fontWeight: 700, textAlign: 'center', fontSize: isMobile ? 18 : 24 }}
          >
            CGPA: {cgpa}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default CGPACalculatorPage; 