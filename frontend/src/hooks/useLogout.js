import { useState } from 'react';
import { useAuth } from '../context/authContext';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authUser, setAuthUser } = useAuth(); // Get authUser and setter from context

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
        const response = await fetch('/api/auth/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: authUser.userId }),
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        // Clear user data after successful logout
        setAuthUser(null); // This line should trigger a re-render
        localStorage.removeItem('authUser'); // Make sure to remove user data from localStorage

        console.log('Logout successful');
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};


  return { logout, loading, error };
};

export default useLogout;
