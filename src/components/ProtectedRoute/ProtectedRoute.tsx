/*
 * components/ProtectedRoute/ProtectedRoute.tsx
 *
 * ProtectedRoute -> useAuth() -> AuthProvider.
 * It keeps private pages inaccessible until authentication has been resolved,
 * then redirects unauthenticated users through React Router.
 */

import type { ReactNode } from 'react'
import { Navigate } from 'react-router'

import useAuth from '../../hooks/useAuth'
import Loader from '../ui/Loader/Loader'

type ProtectedRouteProps = {
    children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const {
        isAuthenticated,
        isAuthLoading,
    } = useAuth()

    // Wait for the provider to restore or resolve the session before redirecting.
    if (isAuthLoading) {
        return (
            <div
                role="status"
                aria-busy="true"
                aria-live="polite"
            >
                <Loader />
                <span className="sr-only">Cargando sesión</span>
            </div>
        )
    }

    // Replace the attempted private route so unauthenticated users cannot return to it with Back.
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return (
        <>{children}</>
    )
}