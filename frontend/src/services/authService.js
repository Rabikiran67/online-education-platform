import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { googleProvider, facebookProvider } from './firebase'; // Assuming providers are defined in firebase.js

const auth = getAuth(); // Initialize Firebase Auth instance

// Email/password login
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

// Email/password signup
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error('Signup failed: ' + error.message);
  }
};

// Google login
export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw new Error('Google login failed: ' + error.message);
  }
};

// Facebook login
export const facebookLogin = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;
  } catch (error) {
    throw new Error('Facebook login failed: ' + error.message);
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error('Error logging out: ' + error.message);
  }
};
