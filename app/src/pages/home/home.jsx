import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from "../../contexts/userSlice";

import "./home.css"

export const Home = () => {
    const { currentUser, loading, err } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logOutUser());
    }
    if (currentUser) return (
        <div className="home-page">
            <h1> Hey, {currentUser.user}! </h1>
            <Link className="SPA-link" id="dash-link" to="/dashboard">
            Go to Dashboard
            </Link>
            <Link className="SPA-link" id="logout-link" to="/" onMouseDown={logout}>
                Logout
            </Link>
        </div>
    )
    return (
        <div className="home-page">
            <h1> Welcome! </h1>
            <Link className="SPA-link" id="login-link" to="/login">
                Login
            </Link>
            <Link className="SPA-link" id="register-link" to="/register" title="Register">
                Register
            </Link>
        </div>
    )
};

export default Home;