// Custom hook to access authentication state and actions from AuthContext.
// Throws an error if used outside the AuthProvider.

import { useContext } from "react"

import { AuthContext } from "../context/AuthContext"

export default function useAuth() { 
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}