import axios from 'axios'
import { useRef } from 'react'

function Login() {
    const usernameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await axios.post(
            'http://localhost:3000/api/v1/users/login',
            {
                username: usernameRef.current.value,
                password: passwordRef.current.value

            }
        )

        console.log(res.data)

    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type='text' ref={usernameRef} />
            <input type='text' ref={passwordRef} />
            <button />
        </form>
    )
}

export default Login
