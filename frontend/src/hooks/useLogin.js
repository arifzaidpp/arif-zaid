// hooks/useLogin.js
import { useState } from 'react';
import { useAuth } from '../context/authContext'; // Import auth context
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login: saveUser } = useAuth(); // Get login function from auth context

    const login = async (usernameOrEmail, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usernameOrEmail, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            if (data.isAdmin) {
                // Save user data in context if the user is an admin
                toast.success("Login successful");
                saveUser(data);
            } else {
                toast.error("You do not have admin access");
                throw new Error('You do not have admin access');
            }
        } catch (err) {
            toast.error("Failed to login");
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useLogin;
