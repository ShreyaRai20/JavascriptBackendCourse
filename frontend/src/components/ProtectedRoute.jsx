import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api.js'

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get('api/v1/users/current-user') // backend validates accessToken cookie
                setIsAuthorized(true)
            } catch (err) {
                setIsAuthorized(false)
            }
        }
        checkAuth()
    }, [])

    if (isAuthorized === null) return <div>Loading...</div>

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute
