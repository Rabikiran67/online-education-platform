import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById, getUserProgress, updateLessonProgress } from '../services/courseService';
import { useAuth } from '../contexts/AuthContext';
import { Box, Typography, Paper, Button, List, ListItem, Divider, LinearProgress, IconButton, Grid2 } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Add checkmark icon for completed tasks

const ViewCoursePage = () => {
  const { id } = useParams(); // Course ID from URL
  const { user } = useAuth(); // Current authenticated user
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState({}); // User progress per lesson
  const [loading, setLoading] = useState(true);

  // Fetch course and progress data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCourse = await getCourseById(id); // Fetch course details
        const fetchedProgress = await getUserProgress(user.uid, id); // Fetch user's progress

        setCourse(fetchedCourse);
        setProgress(fetchedProgress);
      } catch (error) {
        console.error('Error fetching course or progress:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData(); // Only fetch data if the user is logged in
  }, [user, id]);

  // Mark a lesson, quiz, or assignment as completed
  const handleMarkAsCompleted = async (lessonId, type) => {
    try {
      await updateLessonProgress(user.uid, id, lessonId, type, true); // Update progress on the server

      // Update only the specific component progress locally
      setProgress((prevProgress) => ({
        ...prevProgress,
        [lessonId]: {
          ...prevProgress[lessonId],
          [type]: true, // Mark quiz or assignment as completed
        },
      }));
    } catch (error) {
      console.error('Error marking quiz/assignment as completed:', error);
    }
  };

  // Calculate the overall course completion progress
  const calculateProgress = () => {
    const totalLessons = course?.lessons.length || 0;
    const completedLessons = Object.values(progress).filter((lesson) =>
      lesson.quiz?.completed && lesson.assignment?.completed
    ).length;
    return totalLessons ? (completedLessons / totalLessons) * 100 : 0;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Course not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', mt: 5 }}>
      {/* Course Details */}
      <Paper sx={{ padding: 3, mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          {course.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
          {course.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
          Category: {course.category}
        </Typography>
      </Paper>

      {/* Progress Bar */}
      <Paper sx={{ padding: 3, mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Course Progress</Typography>
        <LinearProgress variant="determinate" value={calculateProgress()} sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {`${Math.round(calculateProgress())}% Completed`}
        </Typography>
      </Paper>

      {/* Lessons List */}
      <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Lessons:</Typography>
        <List>
          {course.lessons.map((lesson) => (
            <div key={lesson.id}>
              <ListItem sx={{ display: 'block', mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Lesson {lesson.id}: {lesson.title}
                </Typography>

                {/* Lesson Content */}
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                  Content/Description:
                  {lesson.content}
                </Typography>

                {/* Quiz */}
                {lesson.quiz && (
                  <>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                      Quiz:
                      <strong>{lesson.quiz.title}</strong>
                    </Typography>
                    <List sx={{ mb: 2 }}>
                      {lesson.quiz.questions.map((question, index) => (
                        <ListItem key={index}>
                          <Typography variant="body2">Questions:{`${index + 1}. ${question}`}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {/* Assignment */}
                {lesson.assignment && (
                  <Typography variant="body2" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Assignment: {lesson.assignment.title}
                  </Typography>
                )}

                {/* Mark Lesson as Completed */}
                <Grid2 container spacing={2}>
                  <Grid2 item>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => handleMarkAsCompleted(lesson.id, 'lesson')}
                      disabled={progress[lesson.id]?.lesson}
                      fullWidth
                    >
                      {progress[lesson.id]?.lesson ? (
                        <>
                          <CheckCircleIcon sx={{ mr: 1 }} />
                          Lesson Completed
                        </>
                      ) : (
                        'Mark Lesson as Completed'
                      )}
                    </Button>
                  </Grid2>

                  {/* Mark Quiz as Completed */}
                  <Grid2 item>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mt: 2 }}
                      onClick={() => handleMarkAsCompleted(lesson.id, 'quiz')}
                      disabled={progress[lesson.id]?.quiz}
                      fullWidth
                    >
                      {progress[lesson.id]?.quiz ? (
                        <>
                          <CheckCircleIcon sx={{ mr: 1 }} />
                          Quiz Completed
                        </>
                      ) : (
                        'Mark Quiz as Completed'
                      )}
                    </Button>
                  </Grid2>

                  {/* Mark Assignment as Completed */}
                  <Grid2 item>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mt: 2 }}
                      onClick={() => handleMarkAsCompleted(lesson.id, 'assignment')}
                      disabled={progress[lesson.id]?.assignment}
                      fullWidth
                    >
                      {progress[lesson.id]?.assignment ? (
                        <>
                          <CheckCircleIcon sx={{ mr: 1 }} />
                          Assignment Completed
                        </>
                      ) : (
                        'Mark Assignment as Completed'
                      )}
                    </Button>
                  </Grid2>
                </Grid2>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ViewCoursePage;
