import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CoursesListPage from "./pages/CoursesListPage"; // Fixed naming for consistency
import CoursePage from "./pages/CoursesPage"; // Consistent naming for course page
import CourseCreationPage from "./pages/CourseCreationPage";
import ProgressTracker from "./pages/ProgressTracker";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewCoursePage from "./pages/ViewCoursePage";
import LearningMaterialPage from "./pages/LearningMaterialPage"; // Added the learning materials page

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar added at the top */}
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
        {/* <Footer /> Footer added at the bottom */}
      </Router>
    </AuthProvider>
  );
};

export default App;
