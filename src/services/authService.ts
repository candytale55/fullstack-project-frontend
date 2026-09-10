import type { LoginCredentials } from '../types/auth'

const API_URL = import.meta.env.VITE_API_URL

// Service for handling authentication-related API calls
export async function login(credentials: LoginCredentials) { 
    const response = await fetch(`${API_URL}/api/v1/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    
    const data: unknown = await response.json()
    // TODO: We don't yet know the exact TypeScript shape returned by the current backend. Once backend controller is working will create the LoginResponse type.
    // const data: LoginResponse = await response.json()

    if (!response.ok) {
        throw new Error('Login failed')
    }

    return data
}
