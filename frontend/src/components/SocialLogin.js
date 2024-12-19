import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { googleLogin, facebookLogin } from "../services/authService"; // Custom functions for Google & Facebook login
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase"; // Firebase auth
import { useNavigate } from "react-router-dom"; // Navigation hook

const SocialLogin = () => {
  const navigate = useNavigate();

  // Handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome ${user?.displayName || "User"}!`);
      navigate("/courses"); // Redirect to courses after successful login
    } catch (error) {
      console.error("Error with Google login: ", error);
      alert("Google login failed: " + error.message); // Display error message if login fails
    }
  };

  // Handle Facebook login
  const handleFacebookLogin = async () => {
    try {
      const user = await facebookLogin(); // Using custom Facebook login function from authService.js
      alert(`Welcome ${user.displayName}!`);
      navigate("/courses"); // Redirect to courses after successful login
    } catch (error) {
      console.error("Error with Facebook login: ", error);
      alert("Facebook login failed: " + error.message); // Display error message if login fails
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Or login using:
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          color="error"
          sx={{ flexGrow: 1 }}
        >
          Google
        </Button>
        <Button
          variant="outlined"
          startIcon={<FacebookIcon />}
          onClick={handleFacebookLogin}
          color="primary"
          sx={{ flexGrow: 1 }}
        >
          Facebook
        </Button>
      </Box>
    </Box>
  );
};

export default SocialLogin;
