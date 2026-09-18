/*
 * AuthProvider is the component responsible for storing and providing the application's authentication state and authentication actions to its descendant components.
 */

import { useState, type ReactNode, } from "react"
import { AuthContext } from "./AuthContext"

import {
  login as loginRequest,
  register as registerRequest,
} from '../services/authService' // Alias to avoid direct naming conflicts with local functions

import type {
    ApiUser,
    AuthUser,
    LoginCredentials,
    RegisterData,
} from '../types/auth'


type AuthProviderProps = {
    children: ReactNode
}



const mapApiUser = (
    apiUser: ApiUser
): AuthUser => ({
    id: apiUser._id, // Map the backend's _id field to the frontend's id field
    name: apiUser.name,
    email: apiUser.email,
    role: apiUser.role,
})

export function AuthProvider({ children }: AuthProviderProps) {
    // Keep the authenticated user here so all app sections read the same source of truth.
    // A null value represents an unauthenticated session.
    const [user, setUser] = useState<AuthUser | null>(null)

    const login = async (credentials: LoginCredentials) => {
        // Temporary development shortcut: useful while the backend endpoint is not ready.
        // The app can still flow through the login UI without failing on missing API wiring.
        const response = await loginRequest(credentials)
        // loginRequest handles the login API call. It should return the authenticated user's data.

        localStorage.setItem(
            'authToken',
            response.token) // Assuming the response contains a token field for authentication
  
        setUser(
            mapApiUser(response.user)
        )
    }

  const register = async (
    data: RegisterData) => {
        // This keeps the registration form usable during early development and makes the rest of the app able to react as if a session was created.

    await registerRequest(data);

  }




    const logout = () => {
      // Clearing the user here invalidates the session for all consumers immediately.
      localStorage.removeItem('authToken')
      setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                // Double-negation converts a user object into a boolean that mirrors the
                // authentication status for the whole app.
                isAuthenticated: !!user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

