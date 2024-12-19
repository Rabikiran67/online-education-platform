import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getCourses } from '../services/courseService';

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const courseData = await getCourses(courseId);
      setCourse(courseData);
    };

    fetchCourse();
  }, [courseId]);

  return (
    <Box sx={{ mt: 5 }}>
      {course ? (
        <>
          <Typography variant="h4">{course.name}</Typography>
          <Typography variant="body1">{course.description}</Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            Enroll Now
          </Button>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default CoursePage;