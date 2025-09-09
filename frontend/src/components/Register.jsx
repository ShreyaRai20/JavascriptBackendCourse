// import React from 'react'
// import { useRef } from 'react'
// import axios from 'axios'

// function Register() {
//     const fullNameRef = useRef()
//     const usernameRef = useRef()
//     const emailRef = useRef()
//     const passwordRef = useRef()
//     const avatarRef = useRef()
//     const coverImageRef = useRef()

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         const formData = new FormData()

//         formData.append("fullName", fullNameRef.current.value)
//         formData.append("username", usernameRef.current.value)
//         formData.append("email", emailRef.current.value)
//         formData.append("password", passwordRef.current.value)

//         if (avatarRef.current.files[0]) {
//             formData.append("avatar", avatarRef.current.files[0])
//         }
//         if (coverImageRef.current.files[0]) {
//             formData.append("coverImage", coverImageRef.current.files[0])
//         }

//         const res = await axios.post(
//             'http://localhost:3000/api/v1/users/register',
//             formData,
//             {
//                 headers: { "Content-Type": "multipart/form-data" }
//             }
//         )

//         console.log(res.data)

//     }

//     return (
//         <form onSubmit={(e) => handleSubmit(e)}>
//             <Link to="/login">Login</Link>
//             <input type='text' ref={fullNameRef} />
//             <input type='text' ref={usernameRef} />
//             <input type='text' ref={emailRef} />
//             <input type='text' ref={passwordRef} />
//             <input type='file' ref={avatarRef} />
//             <input type='file' ref={coverImageRef} />
//             <button />
//         </form>
//     )
// }

// export default Register


// src/features/auth/Register.js
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
;

function Register() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const fullNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const avatarRef = useRef();
    const coverImageRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullName", fullNameRef.current.value);
        formData.append("username", usernameRef.current.value);
        formData.append("email", emailRef.current.value);
        formData.append("password", passwordRef.current.value);

        if (avatarRef.current.files[0]) {
            formData.append("avatar", avatarRef.current.files[0]);
        }
        if (coverImageRef.current.files[0]) {
            formData.append("coverImage", coverImageRef.current.files[0]);
        }

        dispatch(registerUser(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={fullNameRef} placeholder="Full Name" />
            <input type="text" ref={usernameRef} placeholder="Username" />
            <input type="email" ref={emailRef} placeholder="Email" />
            <input type="password" ref={passwordRef} placeholder="Password" />
            <input type="file" ref={avatarRef} />
            <input type="file" ref={coverImageRef} />
            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}


export default Register;
