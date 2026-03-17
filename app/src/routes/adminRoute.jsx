import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';

export const AdminRoute = ({ children }) => {
    const { currentUser, loading } = useSelector((state) => state.user);
    var perms = "none";
    if (loading) return <div className="loading">Loading...</div>;
    if (currentUser) perms = currentUser.perms;
    return currentUser?.perms === "admin" ? children : <Navigate to="/" />;
}

export default AdminRoute;