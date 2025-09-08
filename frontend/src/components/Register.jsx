import React from 'react'
import { useRef } from 'react'
import axios from 'axios'

function Register() {
    const fullNameRef = useRef()
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const avatarRef = useRef()
    const coverImageRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("fullName", fullNameRef.current.value)
        formData.append("username", usernameRef.current.value)
        formData.append("email", emailRef.current.value)
        formData.append("password", passwordRef.current.value)

        if (avatarRef.current.files[0]) {
            formData.append("avatar", avatarRef.current.files[0])
        }
        if (coverImageRef.current.files[0]) {
            formData.append("coverImage", coverImageRef.current.files[0])
        }

        const res = await axios.post(
            'http://localhost:3000/api/v1/users/register',
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        )

        console.log(res.data)

    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type='text' ref={fullNameRef} />
            <input type='text' ref={usernameRef} />
            <input type='text' ref={emailRef} />
            <input type='text' ref={passwordRef} />
            <input type='file' ref={avatarRef} />
            <input type='file' ref={coverImageRef} />
            <button />
        </form>
    )
}

export default Register
