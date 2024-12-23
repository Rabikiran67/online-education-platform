import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth to get access to context
import { googleLogin, handleGoogleCallback } from '../services/authService'; // Import googleLogin and handleGoogleCallback

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin, loading: contextLoading, user } = useAuth(); // Use handleLogin from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Local loading state

  useEffect(() => {
    // Check if there's a token in the URL (i.e., callback from Google login)
    if (window.location.search.includes('token')) {
      handleGoogleCallback(); // Call the callback handler if token exists in URL
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(''); // Clear any previous error
    try {
      await handleLogin(email, password); // Use handleLogin from AuthContext
      navigate('/courses'); // Redirect to courses after successful login
    } catch (error) {
      setError('Login failed: ' + error.message); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGoogleLogin = () => {
    googleLogin(); // Trigger Google OAuth login flow
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
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
        <Button 
          variant="contained" 
          type="submit" 
          fullWidth 
          disabled={loading || contextLoading} // Disable the button while loading
        >
          {loading || contextLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </form>

      {/* OAuth Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ mx: 2 }}>or</Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>

      {/* Google OAuth Button */}
      <Button
        variant="outlined"
        fullWidth
        color="primary"
        onClick={handleGoogleLogin}
        disabled={loading || contextLoading} // Disable if already loading
      >
        {loading || contextLoading ? <CircularProgress size={24} color="inherit" /> : 'Login with Google'}
      </Button>
    </Box>
  );
};

export default LoginPage;
