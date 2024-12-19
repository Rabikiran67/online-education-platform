import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase"; // Assuming auth is already configured in firebase

const Navbar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser; // Get current user info from Firebase

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert("Logged out successfully!");
      navigate("/"); // Redirect to homepage after logout
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo or Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
          }}
        >
          Online Learning Platform
        </Typography>

        {/* Conditional rendering based on user authentication */}
        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/courses">
              Courses
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <Button color="inherit" component={Link} to="/create-course">
              Create Course
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
