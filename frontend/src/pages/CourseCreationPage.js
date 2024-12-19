import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { createCourse } from '../services/courseService';
import { useNavigate } from 'react-router-dom';

const CourseCreationPage = () => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [lessons, setLessons] = useState([{
    title: '',
    content: '',
    quiz: { title: '', questions: ['', '', ''] },
    assignment: { title: '' }
  }]);
  const navigate = useNavigate();

  // Add a new lesson
  const handleAddLesson = () => {
    setLessons([...lessons, {
      title: '',
      content: '',
      quiz: { title: '', questions: ['', '', ''] },
      assignment: { title: '' }
    }]);
  };

  // Handle lesson changes
  const handleLessonChange = (index, field, value) => {
    const updatedLessons = lessons.map((lesson, i) =>
      i === index ? { ...lesson, [field]: value } : lesson
    );
    setLessons(updatedLessons);
  };

  // Handle quiz question change
  const handleQuizQuestionChange = (lessonIndex, questionIndex, value) => {
    const updatedLessons = [...lessons];
    updatedLessons[lessonIndex].quiz.questions[questionIndex] = value;
    setLessons(updatedLessons);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare course data
    const courseData = {
      name: courseName,
      description,
      tags: tags.split(',').map((tag) => tag.trim()),
      category,
      lessons,
      createdAt: new Date(),
    };

    try {
      const courseId = await createCourse(courseData); // Create course and get its ID
      alert('Course created successfully!');
      navigate(`/course/${courseId}`); // Redirect to the View Course page
    } catch (error) {
      alert('Failed to create course: ' + error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Create Course</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Course Name"
          variant="outlined"
          fullWidth
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Course Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Tags (comma-separated)"
          variant="outlined"
          fullWidth
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Category"
          variant="outlined"
          select
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="Programming">Programming</MenuItem>
          <MenuItem value="Math">Math</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
          <MenuItem value="Art">Art</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <Typography variant="h6" sx={{ mt: 2 }}>Lessons</Typography>
        {lessons.map((lesson, lessonIndex) => (
          <Box key={lessonIndex} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <TextField
              label={`Lesson ${lessonIndex + 1} Title`}
              variant="outlined"
              fullWidth
              value={lesson.title}
              onChange={(e) => handleLessonChange(lessonIndex, 'title', e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              label={`Lesson ${lessonIndex + 1} Content`}
              variant="outlined"
              fullWidth
              value={lesson.content}
              onChange={(e) => handleLessonChange(lessonIndex, 'content', e.target.value)}
              sx={{ mb: 1 }}
            />

            {/* Quiz Section */}
            <Typography variant="h6" sx={{ mt: 2 }}>Quiz for Lesson {lessonIndex + 1}</Typography>
            <TextField
              label="Quiz Title"
              variant="outlined"
              fullWidth
              value={lesson.quiz.title}
              onChange={(e) => handleLessonChange(lessonIndex, 'quiz', { ...lesson.quiz, title: e.target.value })}
              sx={{ mb: 1 }}
            />
            {lesson.quiz.questions.map((question, questionIndex) => (
              <TextField
                key={questionIndex}
                label={`Question ${questionIndex + 1}`}
                variant="outlined"
                fullWidth
                value={question}
                onChange={(e) => handleQuizQuestionChange(lessonIndex, questionIndex, e.target.value)}
                sx={{ mb: 1 }}
              />
            ))}

            {/* Assignment Section */}
            <Typography variant="h6" sx={{ mt: 2 }}>Assignment for Lesson {lessonIndex + 1}</Typography>
            <TextField
              label="Assignment Title"
              variant="outlined"
              fullWidth
              value={lesson.assignment.title}
              onChange={(e) => handleLessonChange(lessonIndex, 'assignment', { ...lesson.assignment, title: e.target.value })}
              sx={{ mb: 1 }}
            />
          </Box>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="outlined" onClick={handleAddLesson}>
            Add Lesson
          </Button>
          <Button variant="contained" type="submit">
            Create Course
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CourseCreationPage;
