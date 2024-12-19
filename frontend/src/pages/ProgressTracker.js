import React, { useState, useEffect } from "react";
import { Box, Button, LinearProgress, Typography, Card, CardContent } from "@mui/material";
import { updateLessonProgress } from "../services/courseService";  // Import the updateLessonProgress method

const ProgressTracker = ({ courseId, lessons, quizzes, assignments, userId }) => {
  const [completedLessons, setCompletedLessons] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);
  const [completedAssignments, setCompletedAssignments] = useState(0);

  useEffect(() => {
    const updateCompletedCounts = () => {
      setCompletedLessons(lessons.filter((lesson) => lesson.completed).length);
      setCompletedQuizzes(quizzes.filter((quiz) => quiz.completed).length);
      setCompletedAssignments(assignments.filter((assignment) => assignment.completed).length);
    };

    updateCompletedCounts();
  }, [lessons, quizzes, assignments]);

  const totalLessons = lessons.length;
  const totalQuizzes = quizzes.length;
  const totalAssignments = assignments.length;

  const totalItems = totalLessons + totalQuizzes + totalAssignments;
  const completedItems = completedLessons + completedQuizzes + completedAssignments;

  const progress = (completedItems / totalItems) * 100;

  const handleMarkAsCompleted = async (id, type) => {
    try {
      const completed = true;

      if (type === "lesson") {
        // Update lesson progress
        await updateLessonProgress(userId, courseId, id, completed);
      } else if (type === "quiz") {
        // Assuming similar function for quizzes if needed
        // await updateQuizProgress(userId, courseId, id, completed);
      } else if (type === "assignment") {
        // Assuming similar function for assignments if needed
        // await updateAssignmentProgress(userId, courseId, id, completed);
      }

      // After updating progress, refresh the counts (or ideally fetch from Firestore if needed)
      setCompletedLessons(lessons.filter((lesson) => lesson.completed).length);
      setCompletedQuizzes(quizzes.filter((quiz) => quiz.completed).length);
      setCompletedAssignments(assignments.filter((assignment) => assignment.completed).length);
    } catch (error) {
      console.error("Error marking as completed:", error);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Course Progress Tracker
        </Typography>
        <Typography variant="body1" gutterBottom>
          You have completed {completedItems} out of {totalItems} items:
          <ul>
            <li>{completedLessons} lessons</li>
            <li>{completedQuizzes} quizzes</li>
            <li>{completedAssignments} assignments</li>
          </ul>
        </Typography>

        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
          {Math.round(progress)}% Completed
        </Typography>

        {/* Display buttons for each lesson to mark as completed */}
        <Box sx={{ mt: 3 }}>
          {lessons.map((lesson) => (
            <Box
              key={lesson.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography variant="body2">{lesson.name}</Typography>
              {lesson.completed ? (
                <Typography variant="body2" color="success.main">
                  Completed
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleMarkAsCompleted(lesson.id, "lesson")}
                >
                  Mark as Completed
                </Button>
              )}
            </Box>
          ))}

          {quizzes.map((quiz) => (
            <Box
              key={quiz.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography variant="body2">{quiz.name}</Typography>
              {quiz.completed ? (
                <Typography variant="body2" color="success.main">
                  Completed
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleMarkAsCompleted(quiz.id, "quiz")}
                >
                  Mark as Completed
                </Button>
              )}
            </Box>
          ))}

          {assignments.map((assignment) => (
            <Box
              key={assignment.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography variant="body2">{assignment.name}</Typography>
              {assignment.completed ? (
                <Typography variant="body2" color="success.main">
                  Completed
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleMarkAsCompleted(assignment.id, "assignment")}
                >
                  Mark as Completed
                </Button>
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
