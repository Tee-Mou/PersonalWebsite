import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';

export const AdminRoute = ({ children }) => {
    const { currentUser, loading } = useSelector((state) => state.user);
    var perms = 0;
    if (loading) return <div className="loading">Loading...</div>;

    if (currentUser) perms = currentUser.perms;
    console.log(perms);
    return (perms >= 2) ? children : <Navigate to="/" />;
}

export default AdminRoute;