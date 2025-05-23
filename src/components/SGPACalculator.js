import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormControlLabel,
  Switch,
  Alert,
  Fade,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { GRADE_LABELS, calculateSGPA } from '../constants/grades';
import FlowerDecoration from '../assets/FlowerDecoration';

const CREDIT_OPTIONS = [0.5, 1, 1.5, 2, 3, 4, 5, 20];
const DEFAULT_ROWS = 10;

const emptyCourse = {
  name: '',
  credits: '',
  grade: '',
  isCreditCourse: true,
};

const SGPACalculator = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [courses, setCourses] = useState(Array.from({ length: DEFAULT_ROWS }, () => ({ ...emptyCourse })));
  const [showResult, setShowResult] = useState(false);
  const [sgpa, setSGPA] = useState(0);

  const handleCourseChange = (idx, field, value) => {
    const updated = [...courses];
    updated[idx][field] = value;
    // If switching to non-credit, clear credits and grade
    if (field === 'isCreditCourse' && !value) {
      updated[idx].credits = '';
      updated[idx].grade = '';
    }
    setCourses(updated);
  };

  const handleAddCourseRow = () => {
    setCourses([...courses, { ...emptyCourse }]);
  };

  const handleRemoveCourse = (idx) => {
    const updated = [...courses];
    updated.splice(idx, 1);
    setCourses(updated);
  };

  const getFilledCourses = (courses) =>
    courses.filter(
      (c) =>
        c.name &&
        c.grade &&
        (c.isCreditCourse ? c.credits : true)
    );

  const handleCalculate = () => {
    const filled = getFilledCourses(courses);
    setSGPA(calculateSGPA(filled));
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
          <span role="img" aria-label="flower">🌸</span> SGPA Calculator <span role="img" aria-label="flower">🌸</span>
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
          For non-credit courses, select 'Pass' or 'Fail' instead of letter grades. These courses will not be counted in SGPA calculations.
        </Alert>
        <Box sx={{ overflowX: isMobile ? 'auto' : 'visible' }}>
          {courses.map((course, idx) => (
            <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
              <TextField
                variant="outlined"
                size={isMobile ? 'small' : 'medium'}
                placeholder="Course"
                value={course.name}
                onChange={(e) => handleCourseChange(idx, 'name', e.target.value)}
                sx={{ background: '#fff', borderRadius: 2, flex: 2, minWidth: 80 }}
              />
              {course.isCreditCourse ? (
                <FormControl size={isMobile ? 'small' : 'medium'} sx={{ minWidth: isMobile ? 90 : 120, flex: 1 }}>
                  <InputLabel>Credits</InputLabel>
                  <Select
                    value={course.credits}
                    label="Credits"
                    onChange={(e) => handleCourseChange(idx, 'credits', e.target.value)}
                    sx={{ pr: 4 }}
                  >
                    {CREDIT_OPTIONS.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  size={isMobile ? 'small' : 'medium'}
                  disabled
                  value="N/A"
                  sx={{ background: '#fff', borderRadius: 2, minWidth: isMobile ? 60 : 100, flex: 1 }}
                />
              )}
              <FormControl size={isMobile ? 'small' : 'medium'} sx={{ minWidth: isMobile ? 90 : 120, flex: 1 }}>
                <InputLabel>Grade</InputLabel>
                <Select
                  value={course.grade}
                  label="Grade"
                  onChange={(e) => handleCourseChange(idx, 'grade', e.target.value)}
                  sx={{ pr: 4 }}
                >
                  {course.isCreditCourse ? (
                    GRADE_LABELS.map((grade) => (
                      <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                    ))
                  ) : (
                    ['Pass', 'Fail'].map((grade) => (
                      <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={course.isCreditCourse}
                    onChange={(e) => handleCourseChange(idx, 'isCreditCourse', e.target.checked)}
                    color="secondary"
                  />
                }
                label={course.isCreditCourse ? 'Credit' : 'Non-Credit'}
                sx={{ flex: 1, minWidth: 90 }}
              />
              <Button
                color="secondary"
                variant="outlined"
                size={isMobile ? 'small' : 'medium'}
                onClick={() => handleRemoveCourse(idx)}
                sx={{ minWidth: 0, px: 1 }}
                disabled={courses.length <= 1}
              >
                ✕
              </Button>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Button
              variant="text"
              color="primary"
              onClick={handleAddCourseRow}
              sx={{ fontWeight: 600, fontSize: isMobile ? 13 : 16 }}
            >
              + Add Course
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCalculate}
            sx={{ fontWeight: 600, px: 4, py: 1.5, fontSize: isMobile ? 15 : 18, borderRadius: 3, boxShadow: 2 }}
          >
            Calculate SGPA
          </Button>
        </Box>
        {showResult && (
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{ mt: 4, color: 'secondary.main', fontWeight: 700, textAlign: 'center', fontSize: isMobile ? 18 : 24 }}
          >
            SGPA: {sgpa}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default SGPACalculator; 