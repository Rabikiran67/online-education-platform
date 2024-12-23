import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your backend server URL
export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password });
    const { user, token } = response.data;
    localStorage.setItem('authToken', token); // Save token to localStorage
    return user;
  } catch (error) {
    throw new Error('Signup failed: ' + (error.response?.data?.message || error.message));
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { user, token } = response.data;
    localStorage.setItem('authToken', token); // Save token to localStorage
    return user;
  } catch (error) {
    throw new Error('Login failed: ' + (error.response?.data?.message || error.message));
  }
};

// Google Login: Starts the OAuth process, user will be redirected to Google login page.
export const googleLogin = () => {
  window.location.href = `${API_URL}/google`; // Trigger backend OAuth process
};

// After Google login, the backend will redirect to this URL with the token.
export const handleGoogleCallback = async (res) => {
  const { token} = res.data;// Get the token from URL

  if (token) {
    localStorage.setItem('authToken', token); // Save the token to localStorage
    // navigate(redirectTo)// Redirect to courses page after login
  } else {
    // Handle errors if token is missing or invalid
    throw new Error('Google login failed');
  }
};
export const logout = () => {
  localStorage.removeItem('authToken');
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  try {
    const response = await axios.get(`${API_URL}/current_user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    logout(); // Clear invalid token
    return null;
  }
};
