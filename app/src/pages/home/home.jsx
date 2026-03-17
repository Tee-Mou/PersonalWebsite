import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./home.css"

export const Home = () => {
    const { currentUser, loading, err } = useSelector((state) => state.user)
    const logout = () => {
        return null;
    }
    if (currentUser) return (
        <div className="content">
            <Link className="SPA_link" id="dash_link" to="/dashboard">
            Go to Dashboard
            </Link>
            <Link className="SPA_link" id="dash_link" to="/" onMouseDown={logout}>
                Logout
            </Link>
        </div>
    )
    return (
        <div className="content">
            <Link className="SPA_link" id="dash_link" to="/login">
                Login
            </Link>
            <Link className="SPA_link" id="dash_link" to="/register" title="Register">
                Register
            </Link>
        </div>
    )
};

export default Home;