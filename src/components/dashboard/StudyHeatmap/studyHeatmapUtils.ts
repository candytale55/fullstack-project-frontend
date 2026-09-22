/* Pure date-range helper for StudyHeatmap, kept separate for clarity and testability. */

export type HeatmapDay = {
    key: string
    weekday: number
}


export type HeatmapMonth = {
    key: string
    label: string
    days: HeatmapDay[]
}


// Builds the current month plus the two previous calendar months, oldest first.
const buildHeatmapDays = (): HeatmapDay[] => {
    const days: HeatmapDay[] = []

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Date normalizes negative months into the correct previous year.
    const start = new Date(
        today.getFullYear(),
        today.getMonth() - 2,
        1
    )

    for (
        const date = new Date(start);
        date <= today;
        date.setDate(date.getDate() + 1)
    ) {
        days.push({
            key: date.toISOString().slice(0, 10),
            weekday: date.getDay(),
        })
    }

    return days
}


const capitalize = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1)

const monthFormatter = new Intl.DateTimeFormat('es-ES', {
    month: 'long',
})


// Groups the visible days into labeled calendar months, oldest first.
export const buildHeatmapMonths = (): HeatmapMonth[] => {
    const months = new Map<string, HeatmapMonth>()

    for (const day of buildHeatmapDays()) {
        const [year, month] = day.key.split('-')
        const monthKey = `${year}-${month}`

        if (!months.has(monthKey)) {
            const monthDate = new Date(
                Number(year),
                Number(month) - 1,
                1
            )

            months.set(monthKey, {
                key: monthKey,
                label: `${capitalize(monthFormatter.format(monthDate))} ${year}`,
                days: [],
            })
        }

        months.get(monthKey)?.days.push(day)
    }

    return Array.from(months.values())
}
