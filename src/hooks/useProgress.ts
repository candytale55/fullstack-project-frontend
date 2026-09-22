/* Loads authenticated progress for DashboardPage and ProgressPage. */

import { useEffect, useState } from 'react'

import { getMyProgress } from '../services/progressService'
import type { CourseProgress } from '../types/progress'


export default function useProgress() {
    const [progress, setProgress] =
        useState<CourseProgress[]>([])

    const [loading, setLoading] =
        useState(true)

    const [error, setError] =
        useState('')

    /* --------------- Load progress --------------- */

    // Shares one request lifecycle between progress pages.
    useEffect(() => {
        const loadProgress = async () => {
            try {
                const data = await getMyProgress()
                setProgress(data)
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'No se pudo cargar el progreso'
                )
            } finally {
                setLoading(false)
            }
        }

        loadProgress()
    }, [])

    return {
        progress,
        loading,
        error,
    }
}
