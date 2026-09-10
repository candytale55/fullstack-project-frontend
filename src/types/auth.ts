/* Authentication-related types */

// User data available after authentication
export type AuthUser = {
    id: string
    name: string
    email: string
}

// Credentials required to log in
export type LoginCredentials = {
  email: string
  password: string
}

// Data required to register a new user
export type RegisterData = {
  name: string
  email: string
  password: string
}

// Data returned after a successful authentication request
export type AuthResponse = {
  user: AuthUser
  token?: string /* //TODO: Cuando el backend devuelva el token quitar el signo de interrogación para hacerlo obligatorio */
}