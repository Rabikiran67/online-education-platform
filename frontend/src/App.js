import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // AuthProvider is now directly outside Router
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CoursesListPage from "./pages/CoursesListPage";
import CoursePage from "./pages/CoursesPage";
import CourseCreationPage from "./pages/CourseCreationPage";
import ProgressTracker from "./pages/ProgressTracker";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewCoursePage from "./pages/ViewCoursePage";
import LearningMaterialPage from "./pages/LearningMaterialPage";

const App = () => {
  return (
    <AuthProvider>
      <Router> {/* Router should be inside AuthProvider */}
        <Navbar /> {/* Navbar added inside Router */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/courses" element={<CoursesListPage />} />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute>
                <ViewCoursePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:id/learning-materials"
            element={
              <ProtectedRoute>
                <LearningMaterialPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-course"
            element={
              <ProtectedRoute>
                <CourseCreationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course-progress"
            element={
              <ProtectedRoute>
                <ProgressTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course-details/:id"
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
