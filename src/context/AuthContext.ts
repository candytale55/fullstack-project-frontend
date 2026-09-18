/*
 * src/context/AuthContext.ts
 *
 * AuthProvider supplies this contract -> useAuth/components consume it.
 * Components interact with authentication state and actions without knowing
 * how API requests or token storage are implemented.
 */

import { createContext } from 'react'

import type {
    AuthUser,
    LoginCredentials,
    RegisterData,
} from '../types/auth'


type AuthContextType = {
    user: AuthUser | null
    isAuthenticated: boolean

    login: (
        credentials: LoginCredentials
    ) => Promise<void>

    register: (
        data: RegisterData
    ) => Promise<void>

    logout: () => void
}


export const AuthContext =
    createContext<AuthContextType | undefined>(
        undefined
    )