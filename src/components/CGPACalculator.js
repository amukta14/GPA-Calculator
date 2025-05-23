import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
  Switch,
  Alert,
  Fade,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { GRADE_LABELS, calculateSGPA, calculateCGPA } from '../constants/grades';
import FlowerDecoration from '../assets/FlowerDecoration';

const CREDIT_OPTIONS = [0.5, 1, 1.5, 2, 3, 4, 5, 20];
const DEFAULT_ROWS = 10;

const emptyCourse = {
  name: '',
  credits: '',
  grade: '',
  isCreditCourse: true,
};

const CGPACalculator = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [semesters, setSemesters] = useState([
    { courses: Array.from({ length: DEFAULT_ROWS }, () => ({ ...emptyCourse })) },
  ]);
  const [currentSemester, setCurrentSemester] = useState(1);

  const handleCourseChange = (semesterIdx, courseIdx, field, value) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIdx].courses[courseIdx][field] = value;
    if (field === 'isCreditCourse' && !value) {
      updatedSemesters[semesterIdx].courses[courseIdx].credits = '';
      updatedSemesters[semesterIdx].courses[courseIdx].grade = '';
    }
    setSemesters(updatedSemesters);
  };

  const handleAddCourseRow = (semesterIdx) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIdx].courses.push({ ...emptyCourse });
    setSemesters(updatedSemesters);
  };

  const handleAddSemester = () => {
    setSemesters([
      ...semesters,
      { courses: Array.from({ length: DEFAULT_ROWS }, () => ({ ...emptyCourse })) },
    ]);
    setCurrentSemester(semesters.length + 1);
  };

  const handleRemoveCourse = (semesterIdx, courseIdx) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIdx].courses.splice(courseIdx, 1);
    setSemesters(updatedSemesters);
  };

  const getFilledCourses = (courses) =>
    courses.filter(
      (c) =>
        c.name &&
        c.grade &&
        (c.isCreditCourse ? c.credits : true)
    );

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 1 : 4, position: 'relative' }}>
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
          p: isMobile ? 1.5 : isTablet ? 2 : 4,
          borderRadius: 5,
          background: 'linear-gradient(135deg, #fce4ec 60%, #b388ff22 100%)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h4'}
          gutterBottom
          align="center"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            letterSpacing: 1,
            fontSize: isMobile ? 22 : undefined,
          }}
        >
          <span role="img" aria-label="flower">🌸</span> CBIT CGPA Calculator <span role="img" aria-label="flower">🌸</span>
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
          For non-credit courses, select 'Pass' or 'Fail' instead of letter grades. These courses will not be counted in SGPA/CGPA calculations.
        </Alert>
        {semesters.map((semester, semesterIndex) => (
          <Box key={semesterIndex} sx={{ mb: 4 }}>
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              gutterBottom
              sx={{ color: 'secondary.main', fontWeight: 600, fontSize: isMobile ? 16 : undefined }}
            >
              Semester {semesterIndex + 1}
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                background: '#fff1fa',
                borderRadius: 3,
                overflowX: isMobile ? 'auto' : 'visible',
                maxWidth: '100%',
              }}
            >
              <Table size={isMobile ? 'small' : 'medium'} sx={{ minWidth: 600 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 16 }}>Course Name</TableCell>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 16 }}>Credits</TableCell>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 16 }}>Grade</TableCell>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 16 }}>Type</TableCell>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 16 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {semester.courses.map((course, courseIndex) => (
                    <TableRow key={courseIndex}>
                      <TableCell sx={{ minWidth: isMobile ? 90 : 120 }}>
                        <TextField
                          variant="outlined"
                          size={isMobile ? 'small' : 'medium'}
                          placeholder="Course"
                          value={course.name}
                          onChange={(e) => handleCourseChange(semesterIndex, courseIndex, 'name', e.target.value)}
                          sx={{ background: '#fff', borderRadius: 2, width: isMobile ? 80 : 120 }}
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: isMobile ? 70 : 100 }}>
                        {course.isCreditCourse ? (
                          <FormControl size={isMobile ? 'small' : 'medium'} fullWidth>
                            <InputLabel>Credits</InputLabel>
                            <Select
                              value={course.credits}
                              label="Credits"
                              onChange={(e) => handleCourseChange(semesterIndex, courseIndex, 'credits', e.target.value)}
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
                            sx={{ background: '#fff', borderRadius: 2, width: isMobile ? 60 : 100 }}
                          />
                        )}
                      </TableCell>
                      <TableCell sx={{ minWidth: isMobile ? 70 : 100 }}>
                        <FormControl size={isMobile ? 'small' : 'medium'} fullWidth>
                          <InputLabel>Grade</InputLabel>
                          <Select
                            value={course.grade}
                            label="Grade"
                            onChange={(e) => handleCourseChange(semesterIndex, courseIndex, 'grade', e.target.value)}
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
                      </TableCell>
                      <TableCell sx={{ minWidth: isMobile ? 70 : 100 }}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={course.isCreditCourse}
                              onChange={(e) => handleCourseChange(semesterIndex, courseIndex, 'isCreditCourse', e.target.checked)}
                              color="secondary"
                            />
                          }
                          label={course.isCreditCourse ? 'Credit' : 'Non-Credit'}
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: isMobile ? 50 : 80 }}>
                        <Button
                          color="secondary"
                          variant="outlined"
                          size={isMobile ? 'small' : 'medium'}
                          onClick={() => handleRemoveCourse(semesterIndex, courseIndex)}
                          sx={{ minWidth: 0, px: 1 }}
                          disabled={semester.courses.length <= 1}
                        >
                          ✕
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleAddCourseRow(semesterIndex)}
                        sx={{ fontWeight: 600, fontSize: isMobile ? 13 : 16 }}
                      >
                        + Add Course
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              variant={isMobile ? 'body2' : 'subtitle1'}
              sx={{ mt: 1, color: 'primary.main', fontWeight: 500, fontSize: isMobile ? 14 : 18 }}
            >
              SGPA: {calculateSGPA(getFilledCourses(semester.courses))}
            </Typography>
          </Box>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddSemester}
            sx={{
              fontWeight: 600,
              px: isMobile ? 2 : 4,
              py: isMobile ? 1 : 1.5,
              fontSize: isMobile ? 15 : 18,
              borderRadius: 3,
              boxShadow: 2,
            }}
          >
            + Add Semester
          </Button>
        </Box>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          sx={{
            mt: 4,
            color: 'secondary.main',
            fontWeight: 700,
            textAlign: 'center',
            fontSize: isMobile ? 18 : 24,
          }}
        >
          Overall CGPA: {calculateCGPA(semesters.map(s => ({ courses: getFilledCourses(s.courses) })))}
        </Typography>
      </Paper>
    </Container>
  );
};

export default CGPACalculator; 