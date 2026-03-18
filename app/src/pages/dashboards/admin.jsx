import { useState } from "react"
import "./dashboard.css"

const UserInfoWindow = ({ userItem }) => {
    if (userItem) { 
        return (
            <div className="userInfoWindow">
                <p>User ID: {userItem._id}</p>
                <p>Username: {userItem.user}</p>
                <p>Permission Level: {userItem.perms}</p>
            </div>
        )
    } else {
        return (
            
            <div className="userInfoWindow">
                <p>No User Selected</p>
            </div>
        )
    } 
}   


const UserWindow = () => {
    const [userItem, setUserItem] = useState(null);

    const deleteUser = async () => {
        if (!userItem) return;
        console.log(userItem._id)
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
        <div className="userManager">
            <form className="inputWithSearch" onSubmit={(event) => {
                event.preventDefault();
                if (!event.target.searchUser.value) {
                    setUserItem(null);
                    return;
                }
                fetch(`/api/users/one/${event.target.searchUser.value}`)
                .then((res) => res.ok? res.json() : null)
                .then(data => {
                    console.log(data)
                    if (!data || data.error) {
                        setUserItem(null);
                        return;
                    }
                    setUserItem(data)});
                    return;
            }}>
                <input className="userSearchInput" name="searchUser" type="text" placeholder="Id/Username" autoComplete="off"/>
                <input className="userSearchSubmit" type="button"/>
            </form>
            <h2> Manage User </h2>
            <UserInfoWindow userItem={userItem}/>
            <div className="userManagerButtons">
                <button className="adminButton" onClick={deleteUser}>
                    Delete User
                </button>
                <button className="adminButton" onClick={updateUser}>
                    Change Permissions
                </button>
                <button className="adminButton" onClick={deselectUser}>
                    Deselect User
                </button>
            </div>
        </div>
    )
} 

export const AdminDashboard = () => {
    return (
        <div className="content">
            <h1> Admin Dashboard </h1>
            <div className="Dashboard">
                <UserWindow/>
            </div>
        </div>
    )
};

export default AdminDashboard;