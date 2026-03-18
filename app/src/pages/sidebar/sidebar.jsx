import { Link } from "react-router-dom";

import "./sidebar.css"

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link className="nav-icon" to={"/"}>
                <p>Hey</p>
            </Link>
            <Link className="nav-icon" to={"/"}>
                <p>Hey</p>
            </Link>
            <Link className="nav-icon" to={"/"}>
                <p>Hey</p>
            </Link>
        </div>
    )
};

export default Sidebar