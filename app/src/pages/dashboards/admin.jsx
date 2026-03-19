import { useState } from "react"

import "./dashboard.css"

const UserInfoWindow = ({ userItem }) => {
    if (userItem) { 
        return (
            <div className="user-info-window">
                <table className="user-table">
                    <tbody>
                        <tr>
                            <th scope="row" align="right">User ID:</th>
                            <td>{userItem._id}</td>
                        </tr>
                        <tr>
                            <th scope="row" align="right">Name:</th>
                            <td>{userItem.user}</td>
                        </tr>
                        <tr>
                            <th scope="row" align="right">Level:</th>
                            <td>{userItem.perms}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            
            <div className="user-info-window">
                <p>No User Selected</p>
            </div>
        )
    } 
}   


const UserWindow = () => {
    const [userItem, setUserItem] = useState(null);

    const deleteUser = async () => {
        if (!userItem) return;
        const urlDelete = `/api/users/${userItem._id}`;
        const options = {
            method: 'DELETE',
            credentials: 'include',
        };
        await fetch(urlDelete, options);
        setUserItem(null);
    }

    const updateUser = () => {
        
        return
    }

    const deselectUser = () => {
        setUserItem(null);
    }
    
    return (
        <div className="user-manager">
            <form className="input-with-search" onSubmit={(event) => {
                event.preventDefault();
                if (!event.target.searchUser.value) {
                    setUserItem(null);
                    return;
                }
                fetch(`/api/users/one/${event.target.searchUser.value}`)
                .then((res) => res.ok? res.json() : null)
                .then(data => {
                    if (!data || data.error) {
                        setUserItem(null);
                        return;
                    }
                    setUserItem(data)});
                    return;
            }}>
                <input className="search-input" name="searchUser" type="text" placeholder="Id/Username" autoComplete="off"/>
                <input className="search-submit" type="button"/>
            </form>
            <UserInfoWindow userItem={userItem}/>
            <div className="manager-buttons">
                <button className="admin-button" onClick={deleteUser}>
                    Delete User
                </button>
                <button className="admin-button" onClick={updateUser}>
                    Change Permissions
                </button>
                <button className="admin-button" onClick={deselectUser}>
                    Deselect User
                </button>
            </div>
        </div>
    )
} 

export const AdminDashboard = () => {
    return (
        <div className="dashboard-page">
            <h1> Admin Dashboard </h1>
            <div className="Dashboard">
                <UserWindow/>
            </div>
        </div>
    )
};

export default AdminDashboard;