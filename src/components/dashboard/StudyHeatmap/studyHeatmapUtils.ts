/* Pure date-range helper for StudyHeatmap, kept separate for clarity and testability. */

export type HeatmapDay = {
    key: string
    weekday: number
    week: number
}


export type HeatmapMonth = {
    key: string
    label: string
    days: HeatmapDay[]
    weeks: number
}


const capitalize = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1)

const monthFormatter = new Intl.DateTimeFormat('es-ES', {
    month: 'short',
})

// es-ES abbreviations can include a trailing period (e.g. "sept."); trim to 3 letters.
const formatMonthAbbreviation = (date: Date) =>
    capitalize(
        monthFormatter.format(date).replace('.', '').slice(0, 3)
    )


// Returns the current month plus the two previous ones, oldest first.
const getVisibleMonths = (): { year: number; month: number }[] => {
    const today = new Date()
    /* current month and the three previous months. */
    return [3, 2, 1, 0].map((offset) => {
        const date = new Date(
            today.getFullYear(),
            today.getMonth() - offset,
            1
        )

        return {
            year: date.getFullYear(),
            month: date.getMonth(),
        }
    })
}


// Builds every real YYYY-MM-DD date of one calendar month, oldest first.
const buildMonthDays = (
    year: number,
    month: number
): HeatmapDay[] => {
    const days: HeatmapDay[] = []

    const firstDay = new Date(year, month, 1)
    const firstWeekday = firstDay.getDay()

    // Day 0 of the next month is always the last real day of this month.
    const lastDayOfMonth = new Date(year, month + 1, 0)

    for (
        const date = new Date(firstDay);
        date <= lastDayOfMonth;
        date.setDate(date.getDate() + 1)
    ) {
        // Groups each day under the week column it belongs to inside this month only.
        const week = Math.floor(
            (date.getDate() - 1 + firstWeekday) / 7
        )

        days.push({
            key: date.toISOString().slice(0, 10),
            weekday: date.getDay(),
            week,
        })
    }

    return days
}


// Builds three independent calendar-month blocks; never mixes days across months.
export const buildHeatmapMonths = (): HeatmapMonth[] => {
    return getVisibleMonths().map(({ year, month }) => {
        const days = buildMonthDays(year, month)

        const weeks = days.length === 0
            ? 1
            : Math.max(...days.map((day) => day.week)) + 1

        return {
            key: `${year}-${String(month + 1).padStart(2, '0')}`,
            label: `${formatMonthAbbreviation(
                new Date(year, month, 1)
            )} ${year}`,
            days,
            weeks,
        }
    })
}


const dayFormatter = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})

// Builds an accessible "23 septiembre 2026 — Día de estudio" style label.
export const formatDayLabel = (
    key: string,
    studied: boolean
): string => {
    const [year, month, day] = key.split('-').map(Number)
    const date = new Date(year, month - 1, day)

    const status = studied
        ? 'Día de estudio'
        : 'Sin actividad'

    return `${dayFormatter.format(date)} — ${status}`
}
