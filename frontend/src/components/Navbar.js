import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";



const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading, handleLogout, handleGoogleLogin } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to handle Google login response
  const responseGoogle = (response) => {
    if (response.tokenId) {
      handleGoogleLogin(response.tokenId); // Call Google login function
    } else {
      console.error("Google login failed");
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit", fontWeight: "bold" }}
        >
          Online Learning Platform
        </Typography>

        {/* Conditional Rendering Based on Login Status */}
        {!user ? (
          // User is not logged in
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
         
          </>
        ) : (
          // User is logged in
          <>
            <Button color="inherit" component={Link} to="/courses">Courses</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            <Button color="inherit" component={Link} to="/create-course">Create Course</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
