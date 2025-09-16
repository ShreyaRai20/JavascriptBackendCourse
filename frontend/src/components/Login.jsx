import React, { useState } from 'react'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom'

function Login() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post('http://localhost:3000/api/v1/users/login', { username: username, password: password })

        console.log(res.data)

        if (res.data.success) {
            console.log(res.data.success)
            navigate('/dashboard', { replace: true });

            redirect('/dashboard')
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
