/* Renders DashboardPage's prepared calendar months with study-day highlights. */

import {
    formatDayLabel,
    type HeatmapMonth,
} from './studyHeatmapUtils'
import styles from './StudyHeatmap.module.css'


type StudyHeatmapProps = {
    studyDays: string[]
    months: HeatmapMonth[]
}


export default function StudyHeatmap({
    studyDays,
    months,
}: StudyHeatmapProps) {
    const studiedDays = new Set(studyDays)
    const monthDescription = months.length === 1
        ? 'último mes'
        : `últimos ${months.length} meses`

    return (
        <div
            className={styles.heatmap}
            role="img"
            aria-label={`Mapa de días de estudio de los ${monthDescription}`}
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
