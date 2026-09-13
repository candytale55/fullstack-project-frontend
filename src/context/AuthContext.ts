/*
 * Define context and its types for authentication.
 */

import { createContext } from "react"

import type {
    AuthUser,
    LoginCredentials,
    RegisterData,
} from "../types/auth"

// The value exposed to consumers: it centralizes session state and the actions that
// mutate it so components can stay simple and consistent.
type AuthContextType = {
    user: AuthUser | null
    isAuthenticated: boolean
    login: (credentials: LoginCredentials) => Promise<void>
    register: (data: RegisterData) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)


