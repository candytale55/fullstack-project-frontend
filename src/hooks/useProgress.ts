/* Loads authenticated progress for DashboardPage and ProgressPage. */

import { getMyProgress } from '../services/progressService'
import useFetch from './useFetch'


export default function useProgress() {
    const {
        data: progress,
        loading,
        error,
    } = useFetch(
        getMyProgress,
        {
            initialData: [],
            errorMessage: 'No se pudo cargar el progreso',
        }
    )

    return {
        progress,
        loading,
        error,
    }
}
