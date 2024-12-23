import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth to get access to context

const SignupPage = () => {
  const navigate = useNavigate();
  const { handleSignup, loading: contextLoading } = useAuth(); // Use handleSignup from context
  const [name, setName] = useState(''); // Add name field for signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Local loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(''); // Clear any previous error
    try {
      await handleSignup(name, email, password); // Use handleSignup from AuthContext
      navigate('/courses'); // Redirect to courses after successful signup
    } catch (error) {
      setError('Signup failed: ' + error.message); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Signup
      </Typography>
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
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
          {loading || contextLoading ? <CircularProgress size={24} color="inherit" /> : 'Signup'}
        </Button>
      </form>
    </Box>
  );
};

export default SignupPage;
