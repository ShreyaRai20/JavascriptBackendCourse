// src/features/auth/Profile.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h1>Welcome, {user.fullName}</h1>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.avatar && <img src={user.avatar} alt="avatar" width="120" />}
            <br />
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
    );
};

export default Profile;
