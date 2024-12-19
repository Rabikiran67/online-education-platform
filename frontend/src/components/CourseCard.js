import React from 'react';
import { Paper, Typography, Box, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import { Link } from 'react-router-dom'; // Import Link for View Course functionality

const CourseCard = ({ course, onEnroll, onDelete }) => {
  return (
    <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Delete Button with Trash Bin Icon */}
      <IconButton
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: 'gray',
        }}
        onClick={() => onDelete(course.id)}
      >
        <DeleteIcon />
      </IconButton>

      {/* Course Name */}
      <Typography variant="h6" gutterBottom>
        {course.name}
      </Typography>

      {/* Course Description */}
      <Typography variant="body2" color="textSecondary" paragraph>
        {course.description}
      </Typography>

      {/* Enroll Button */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onEnroll}
        >
          Enroll
        </Button>

        {/* View Course Button */}
        <Button
          variant="outlined"
          component={Link} // Using Link to route to View Course page
          to={`/course/${course.id}`} // Navigate to View Course page
        >
          View Course
        </Button>
      </Box>
    </Paper>
  );
};

export default CourseCard;
