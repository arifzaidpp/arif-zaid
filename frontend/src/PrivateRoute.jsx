// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from './context/authContext';

const PrivateRoute = ({ children }) => {
    const { authUser } = useAuth();

    // If the user is not authenticated, redirect to login
    return authUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
