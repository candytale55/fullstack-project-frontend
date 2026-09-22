/* Loads all authenticated course progress and presents each course independently. */

import { useNavigate } from 'react-router'

import useProgress from '../../hooks/useProgress'
import CourseProgressCard from '../../components/dashboard/CourseProgressCard/CourseProgressCard'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'

import styles from './ProgressPage.module.css'


export default function ProgressPage() {
    const navigate = useNavigate()

    const {
        progress,
        loading,
        error,
    } = useProgress()

    // Keeps each course card responsible only for its own navigation target.
    const handleContinue = (courseId: string, languageId: string) => {
        navigate(
            `/languages/${languageId}/courses/${courseId}`
        )
    }

    return (
        <div className={styles.progressPage}>

            <header className={styles.header}>
                <h1>Progreso</h1>
                <p>Consulta tu progreso</p>
            </header>

            {loading && <Loader />}

            {!loading && error && (
                <Alert variant="error">
                    {error}
                </Alert>
            )}

            {!loading && !error && progress.length === 0 && (
                <Alert>
                    Todavía no has realizado ninguna sesión de estudio.
                </Alert>
            )}

            {!loading && !error && progress.length > 0 && (
                <div className={styles.progressGrid}>
                    {progress.map((courseProgress) => (
                        <CourseProgressCard
                            key={courseProgress.id}
                            progress={courseProgress}
                            onContinue={() =>
                                handleContinue(
                                    courseProgress.course.id,
                                    courseProgress.course.language.id
                                )
                            }
                        />
                    ))}
                </div>
            )}
        </div>

    )
}