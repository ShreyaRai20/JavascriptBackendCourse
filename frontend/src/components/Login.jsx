import React, { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import api from '../api.js'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants.js'

function Login() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await api.post('http://localhost:3000/api/v1/users/login', { username: username, password: password })


        if (res.data.success) {

            navigate('/', { replace: true });
        } else {
            alert("login failed")
        }

    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type='text' placeholder='write username' name='username' onChange={(e) => setUsername(e.target.value)} />
            <input type='password' placeholder='write password' name='password' onChange={(e) => setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    )
}

export default Login
