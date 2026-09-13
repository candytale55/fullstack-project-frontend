/*
 * AuthProvider is the component responsible for storing and providing the application's
 * authentication state and authentication actions to its descendant components.
 */

import {
    useState,
    type ReactNode,
} from "react"

import { AuthContext } from "./AuthContext"


import type {
    AuthUser,
    LoginCredentials,
    RegisterData,
} from "../types/auth"


type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    // Keep the authenticated user here so all app sections read the same source of truth.
    // A null value represents an unauthenticated session.
    const [user, setUser] = useState<AuthUser | null>(null)

    const login = async (credentials: LoginCredentials) => {
        // Temporary development shortcut: useful while the backend endpoint is not ready.
        // The app can still flow through the login UI without failing on missing API wiring.
        console.log('Login credentials:', credentials)

        // TODO: Replace this mock with a real auth service call once backend auth is implemented.
        setUser({
            id: "temp-id",
            name: "Test User",
            email: credentials.email,
        })
    }

    const register = async (data: RegisterData) => {
        // This keeps the registration form usable during early development and makes the
        // rest of the app able to react as if a session was created.
        console.log('Register data:', data)

        // TODO: Temporary development shortcut: replace this mock with a real registration request once the backend is available.
        setUser({
            id: "temp-id",
            name: data.name,
            email: data.email,
        })
    }

    const logout = () => {
        // Clearing the user here invalidates the session for all consumers immediately.
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

// TODO: Move the mock login/register behavior into a dedicated auth service and hook the context up to the real backend once the API contract is confirmed.