import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signup, googleLogin, facebookLogin } from '../services/authService';  // Import signup and social login functions

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate('/courses'); // Redirect to courses after successful signup
    } catch (error) {
      setError('Signup failed: ' + error.message); // Handle error
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const user = await googleLogin();
      navigate('/courses');
      alert(`Welcome ${user?.displayName || "User"}!`);
    } catch (error) {
      setError('Google login failed: ' + error.message); // Handle Google login error
    }
  };

  const handleFacebookSignup = async () => {
    try {
      const user = await facebookLogin();
      navigate('/courses');
      alert(`Welcome ${user.displayName}!`);
    } catch (error) {
      setError('Facebook login failed: ' + error.message); // Handle Facebook login error
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Signup</Typography>
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSignup}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit" fullWidth>
          Signup
        </Button>
      </form>

      {/* Social login buttons */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Or sign up using:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleGoogleSignup}
            color="error"
            sx={{ flexGrow: 1 }}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            onClick={handleFacebookSignup}
            color="primary"
            sx={{ flexGrow: 1 }}
          >
            Facebook
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
