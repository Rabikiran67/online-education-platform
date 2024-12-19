// src/utils/fileFormat.js

// Function to check if the file is a video
export const isVideo = (file) => {
    const videoFormats = ['mp4', 'mov', 'avi', 'mkv'];
    return videoFormats.includes(file.split('.').pop().toLowerCase());
  };
  
  // Function to check if the file is a PDF
  export const isPDF = (file) => {
    return file.split('.').pop().toLowerCase() === 'pdf';
  };
  
  // Function to check if the file is a quiz
  export const isQuiz = (file) => {
    return file.split('.').pop().toLowerCase() === 'json'; // assuming quizzes are in JSON format
  };
  
  // Function to get the correct component to render the file based on type
  export const renderMaterial = (material) => {
    if (isVideo(material.file)) {
      return <video controls width="100%"><source src={material.file} type="video/mp4" /></video>;
    }
    if (isPDF(material.file)) {
      return (
        <embed
          src={material.file}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      );
    }
    if (isQuiz(material.file)) {
      return <div>Interactive Quiz (Coming Soon!)</div>;  // Customize quiz rendering
    }
    return <p>Unsupported file format</p>;
  };
  