import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Online Learning Platform
      </Typography>
      <Typography variant="h6" gutterBottom>
        Discover a wide variety of courses and improve your skills.
      </Typography>

    </Box>
  );
};

export default HomePage;