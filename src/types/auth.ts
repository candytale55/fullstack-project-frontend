/*
 * src/types/auth.ts
 *
 * Shared authentication contracts.
 * Forms/AuthProvider use request types -> authService sends them to the backend
 * -> backend response types are normalized by AuthProvider for the UI.
 */


// User shape used throughout the frontend after authentication.
export type AuthUser = {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}


// User shape returned by the backend.
// AuthProvider maps `_id` to the frontend-friendly `id`.
export type ApiUser = {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
}


// Payload accepted by the login endpoint.
export type LoginCredentials = {
  email: string
  password: string
}


// Payload accepted by the registration endpoint.
export type RegisterData = {
  name: string
  email: string
  password: string
}


// Successful login response. Login creates the authenticated session.
export type AuthResponse = {
  user: ApiUser
  token: string
}


// Registration creates the account but does not authenticate the user.
export type RegisterResponse = {
  message: string
  user: ApiUser
}


// Response used to restore the authenticated user from an existing JWT.
export type CurrentUserResponse = {
  user: ApiUser
}