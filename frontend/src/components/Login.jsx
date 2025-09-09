// import axios from 'axios'
// import { useRef } from 'react'
// import Register from './Register'
// import { Link, useHistory } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

// function Login() {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const usernameRef = useRef()
//     const passwordRef = useRef()


//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         try {
//             const saveUserThunk = saveUser(usernameRef.current.value, passwordRef.current.value)
//             dispatch(saveUserThunk)
//             history.push('/')

//             // const res = await axios.post(
//             //     'http://localhost:3000/api/v1/users/login',
//             //     {
//             //         username: usernameRef.current.value,
//             //         password: passwordRef.current.value
//             //     }
//             // )
//             // console.log(res.data)

//         } catch (error) {
//             console.log(error)
//         }

//     }
//     return (

//         <form onSubmit={(e) => handleSubmit(e)}>
//             <Link to="/register">Register</Link>
//             <input id="username" type='text' ref={usernameRef} />
//             <input id="password" type='text' ref={passwordRef} />
//             <button />
//         </form>
//     )
// }

// export default Login


// src/features/auth/Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({ username: "", password: "" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        dispatch(loginUser(form));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};

export default Login;
