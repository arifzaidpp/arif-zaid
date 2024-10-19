import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null); // Store user data
    const [loading, setLoading] = useState(true);

    // Check if the user is logged in (e.g., check local storage)
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('authUser'));
        if (storedUser) {
            setAuthUser(storedUser);
        }
        setLoading(false); // Set loading false when done
    }, []);

    // Function to log in and store user data locally
    const login = (userData) => {
        localStorage.setItem('authUser', JSON.stringify(userData));
        setAuthUser(userData);
    };

    // Function to log out
    const logout = () => {
        localStorage.removeItem('authUser');
        setAuthUser(null);
    };

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
