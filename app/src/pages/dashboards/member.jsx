import { useSelector, useDispatch } from "react-redux"

import "./dashboard.css"

const UserInfoWindow = () => {
    const { currentUser, loading, err } = useSelector((state) => state.user)
    if (loading) return <div>Loading... </div>
    if (currentUser) { 
        return (
            <div className="user-info-window">
                <table className="user-table">
                    <tbody>
                        <tr>
                            <th scope="row" align="right">User ID:</th>
                            <td>{currentUser._id}</td>
                        </tr>
                        <tr>
                            <th scope="row" align="right">Name:</th>
                            <td>{currentUser.user}</td>
                        </tr>
                        <tr>
                            <th scope="row" align="right">Level:</th>
                            <td>{currentUser.perms}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    } 
}   

const UserWindow = () => {
    const deleteUser = () => { return }
    const changeUsername = () => { return }
    const changePassword = () => { return }
    return (
        <div className="user-manager">
            <UserInfoWindow/>
            <div className="manager-buttons">
                <button className="admin-button" onClick={deleteUser}>
                    Delete Account
                </button>
                <button className="admin-button" onClick={changeUsername}>
                    Change Username
                </button>
                <button className="admin-button" onClick={changePassword}>
                    Change Password
                </button>
            </div>
        </div>
    )
}

export const MemberDashboard = () => {
    return (
        <div className="dashboard-page">
            <h1> Member Dashboard </h1>
            <div className="Dashboard">
                <UserWindow/>
            </div>
        </div>
    )
};

export default MemberDashboard;