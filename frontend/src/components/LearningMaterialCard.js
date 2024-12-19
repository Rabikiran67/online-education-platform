// src/components/LearningMaterialCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const LearningMaterialCard = ({ material }) => {
  const renderContent = () => {
    switch (material.type) {
      case 'video':
        return <video src={material.url} controls width="100%" />;
      case 'pdf':
        return (
          <a href={material.url} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        );
      case 'quiz':
        return <Typography>Interactive Quiz: {material.title}</Typography>;
      default:
        return <Typography>Unsupported material type</Typography>;
    }
  };

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h6">{material.title}</Typography>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default LearningMaterialCard;
