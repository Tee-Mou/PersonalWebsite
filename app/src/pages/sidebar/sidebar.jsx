import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../contexts/userSlice";

import "./sidebar.css"

export const Sidebar = () => {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logOutUser());
    }
    return (
        <div className="sidebar">
            <Link className="nav-icon" id="home" to={"/"}>
            </Link>
            <Link className="nav-icon" id="logout" onMouseDown={logout}>
            </Link>
            <Link className="nav-icon" to={"/"}>
            </Link>
        </div>
    )
};

export default Sidebar