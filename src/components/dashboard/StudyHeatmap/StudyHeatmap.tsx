/* Renders a simple studied/not-studied grid grouped by calendar month. */

import { buildHeatmapMonths } from './studyHeatmapUtils'
import styles from './StudyHeatmap.module.css'


type StudyHeatmapProps = {
    studyDays: string[]
}


export default function StudyHeatmap({
    studyDays,
}: StudyHeatmapProps) {
    const studiedDays = new Set(studyDays)
    const months = buildHeatmapMonths()

    return (
        <div
            className={styles.heatmap}
            role="img"
            aria-label="Mapa de días de estudio de los últimos 3 meses"
        >
            {months.map((month) => (
                <div className={styles.month} key={month.key}>
                    <p className={styles.monthLabel}>
                        {month.label}
                    </p>

                    <div className={styles.monthGrid}>
                        {month.days.map(({ key, weekday }) => {
                            const studied = studiedDays.has(key)

                            return (
                                <div
                                    key={key}
                                    className={
                                        studied
                                            ? `${styles.day} ${styles.studied}`
                                            : styles.day
                                    }
                                    style={{ gridRow: weekday + 1 }}
                                    title={
                                        studied
                                            ? `${key}: estudiado`
                                            : `${key}: no estudiado`
                                    }
                                    aria-label={
                                        studied
                                            ? `${key}: estudiado`
                                            : `${key}: no estudiado`
                                    }
                                />
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
