export const GRADE_POINTS = {
  'S': 10,
  'A': 9,
  'B': 8,
  'C': 7,
  'D': 6,
  'E': 5,
  'F': 0
};

export const GRADE_LABELS = Object.keys(GRADE_POINTS);

export const MAX_SEMESTERS = 8; // Assuming 8 semesters for a typical engineering course

export const calculateCreditPoints = (grade, credits) => {
  return GRADE_POINTS[grade] * credits;
};

export const calculateSGPA = (courses) => {
  if (!courses || courses.length === 0) return 0;
  
  // Filter out non-credit courses
  const creditCourses = courses.filter(course => course.isCreditCourse);
  
  const totalCreditPoints = creditCourses.reduce((sum, course) => {
    return sum + calculateCreditPoints(course.grade, course.credits);
  }, 0);
  
  const totalCredits = creditCourses.reduce((sum, course) => {
    return sum + course.credits;
  }, 0);
  
  // Round to 2 decimal places as per guidelines
  return totalCredits > 0 ? Number((totalCreditPoints / totalCredits).toFixed(2)) : 0;
};

export const calculateCGPA = (semesters) => {
  if (!semesters || semesters.length === 0) return 0;
  
  let totalCreditPoints = 0;
  let totalCredits = 0;
  
  semesters.forEach(semester => {
    if (semester.courses && semester.courses.length > 0) {
      const semesterSGPA = calculateSGPA(semester.courses);
      const semesterCredits = semester.courses
        .filter(course => course.isCreditCourse)
        .reduce((sum, course) => sum + course.credits, 0);
      
      totalCreditPoints += semesterSGPA * semesterCredits;
      totalCredits += semesterCredits;
    }
  });
  
  // Round to 2 decimal places as per guidelines
  return totalCredits > 0 ? Number((totalCreditPoints / totalCredits).toFixed(2)) : 0;
}; 