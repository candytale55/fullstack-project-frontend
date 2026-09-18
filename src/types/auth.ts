/* Authentication-related types */


// Normalized profile after a successful session.
export type AuthUser = {
  id: string
  name: string
  email: string
  role?: 'user' | 'admin'
}

/* ================================== */

// Shape returned directly by MongoDB/backend

// Decodes the backend user entity into a shape that can be safely consumed by the frontend.

export type ApiUser = {
  _id: string
  name: string
  email: string
  role?: 'user' | 'admin'
}


/* ================================== */

// Provides the minimal payload the UI can send to authenticate without forcing a duplicate profile shape.
export type LoginCredentials = {
  email: string
  password: string
}


/* ================================== */

// Represents the information the app needs to create a fresh account before sending it to the backend.
export type RegisterData = {
  name: string
  email: string
  password: string
}



/* ================================== */
// Login returns a JWT
// Wraps the token and profile returned from a successful auth request so the app can store the session in one step.
export type AuthResponse = {
  user: ApiUser
  token: string
}


/* ================================== */

// Register does NOT log the user in
export type RegisterResponse = {
  message: string
  user: ApiUser
}

/* ================================== */

// Used by GET auth/me to fetch the current authenticated user's profile.
// Keeps the current-user fetch response consistent with the rest of the auth contract without duplicating the user fields.

export type CurrentUserResponse = {
  user: ApiUser
}
