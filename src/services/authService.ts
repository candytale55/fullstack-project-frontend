// Service for handling authentication-related API calls

import type {
  AuthResponse,
  CurrentUserResponse,
  LoginCredentials,
  RegisterData,
  RegisterResponse,
} from '../types/auth'


const API_URL = import.meta.env.VITE_API_URL

/* ========= LOGIN ========= */

export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {

  const response = await fetch(
    `${API_URL}/api/v1/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Login failed'
    )
  }

  return data
}


/* ========= REGISTER USER ========= */

export async function register(
  registerData: RegisterData
): Promise<RegisterResponse> {

  const response = await fetch(
    `${API_URL}/api/v1/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Registration failed'
    )
  }

  return data
}

/* ========= CURRENT USER ========= */

export async function getCurrentUser(
  token: string
): Promise<CurrentUserResponse> {

  const response = await fetch(
    `${API_URL}/api/v1/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to restore session'
    )
  }

  return data
}