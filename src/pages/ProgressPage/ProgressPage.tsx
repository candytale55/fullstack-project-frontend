/* Presents the temporary progress view from dashboard data until the progress API is connected. */

import {
    activeCourseMock,
    dashboardStatsMock,
} from '../../mocks/dashboardMock'

import styles from './ProgressPage.module.css'


export default function ProgressPage() {
    return (
        <div className={styles.progressPage}>

            <header className={styles.header}>
                <h1>Progreso</h1>
                <p>Consulta tu progreso</p>
            </header>

            <section className={styles.section}>
                <h2>Curso Activo</h2>
                <h3>{activeCourseMock.title}</h3>
                <p>Nivel: {activeCourseMock.level}</p>
                <p>Progreso: {activeCourseMock.progress}</p>
                <p>
                    {activeCourseMock.completedUnits} de{' '}
                    {activeCourseMock.totalUnits} unidades
                    completadas
                </p>
            </section>

            <section className={styles.section}>
                <h2>Actividades</h2>
                <div>
                    <strong>
                        {dashboardStatsMock.completedExercises}
                    </strong>

                    <span>
                        Ejercicios completados
                    </span>
                </div>

                <div>
                    <strong>
                        {dashboardStatsMock.studyStreak}
                    </strong>

                    <span>
                        Días de racha
                    </span>
                </div>
            </section>
        </div>

    )
}