import React, { useEffect, useState } from "react";
import { Box, Grid2, Typography, Paper } from "@mui/material";
import CourseCard from "../components/CourseCard"; // Assuming this component exists and is correct
import { getCourses, deleteCourse } from "../services/courseService"; // Assuming deleteCourse service is implemented
import FileUpload from "../components/FileUpload"; // Import the FileUpload component

const CoursesListPage = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses(); // Fetching courses from the service
        setCourses(coursesData);
      } catch (error) {
        alert("Error loading courses: " + error.message);
      }
    };

    fetchCourses();
  }, []);

  // Handle delete course
  const handleDeleteCourse = async (courseId) => {
    try {
      // Call the deleteCourse service
      await deleteCourse(courseId);

      // Remove the deleted course from the state
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));

      alert("Course deleted successfully!");
    } catch (error) {
      alert("Error deleting course: " + error.message);
    }
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        All Courses
      </Typography>

      {/* File Upload Section */}
      <Paper sx={{ padding: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Upload Course Materials
        </Typography>
        <FileUpload /> {/* File Upload component */}
      </Paper>

      {/* Courses List */}
      <Grid2 container spacing={3}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Grid2 item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard
                course={course}
                onEnroll={() => alert(`Enrolled in ${course.name}`)}
                onDelete={handleDeleteCourse} // Pass the delete handler
              />
            </Grid2>
          ))
        ) : (
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ textAlign: "center", width: "100%" }}
          >
            No courses available at the moment.
          </Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default CoursesListPage;
