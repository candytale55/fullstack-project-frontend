/*
 * src/context/AuthProvider.tsx
 *
 * Components/useAuth -> AuthProvider actions -> authService -> backend.
 * AuthProvider owns the frontend session, stores the JWT and normalizes
 * backend users before exposing them through AuthContext.
 */

import {
  useState,
  type ReactNode,
} from 'react'

import { AuthContext } from './AuthContext'

import {
  login as loginRequest,
  register as registerRequest,
} from '../services/authService'

import type {
  ApiUser,
  AuthUser,
  LoginCredentials,
  RegisterData,
} from '../types/auth'


type AuthProviderProps = {
  children: ReactNode
}


// Keeps MongoDB-specific `_id` outside the rest of the frontend.
const mapApiUser = (
  apiUser: ApiUser
): AuthUser => ({
  id: apiUser._id,
  name: apiUser.name,
  email: apiUser.email,
  role: apiUser.role,
})


export function AuthProvider({
  children,
}: AuthProviderProps) {

  // null represents a user without an active authenticated session.
  const [user, setUser] =
    useState<AuthUser | null>(null)


  const login = async (
    credentials: LoginCredentials
  ) => {
    const response =
      await loginRequest(credentials)

    localStorage.setItem(
      'authToken',
      response.token
    )

    setUser(
      mapApiUser(response.user)
    )
  }


  const register = async (
    data: RegisterData
  ) => {
    // Registration creates the account only; LoginPage starts the session.
    await registerRequest(data)
  }


  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }


  return (
    <AuthContext.Provider
      value={{
        user,
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