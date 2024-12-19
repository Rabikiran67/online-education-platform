import { useAuth } from '../contexts/AuthContext';

const useAuthStatus = () => {
  const { user, loading } = useAuth();

  return {
    isAuthenticated: !!user, // Returns true if a user is authenticated
    user,                   // Provides user details
    loading,                // Indicates if authentication is still loading
  };
};

export default useAuthStatus;
