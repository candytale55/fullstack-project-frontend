/* Renders a simple studied/not-studied grid grouped by calendar month. */

import { buildHeatmapMonths, formatDayLabel } from './studyHeatmapUtils'
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

                    <div
                        className={styles.monthGrid}
                        style={{
                            gridTemplateColumns: `repeat(${month.weeks}, 0.75rem)`,
                        }}
                    >
                        {month.days.map(({ key, weekday, week }) => {
                            const studied = studiedDays.has(key)
                            const label = formatDayLabel(key, studied)

                            return (
                                <div
                                    key={key}
                                    className={
                                        studied
                                            ? `${styles.day} ${styles.studied}`
                                            : styles.day
                                    }
                                    style={{
                                        gridRow: weekday + 1,
                                        gridColumn: week + 1,
                                    }}
                                    title={label}
                                    aria-label={label}
                                />
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
