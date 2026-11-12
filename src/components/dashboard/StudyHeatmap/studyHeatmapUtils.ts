/* Builds local calendar keys and month blocks consumed by StudyHeatmap. */

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


// Gets the local date key in a string with YYYY-MM-DD format.
const formatLocalDateKey = (date: Date): string =>
    [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
    ].join('-')


// Parses a local date key in the format YYYY-MM-DD into a Date object, or returns null if invalid.
const parseDateKey = (key: string): Date | null => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key)

    if (!match) {
        return null
    }

    const [, year, month, day] = match.map(Number)
    const date = new Date(year, month - 1, day)

    return date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
        ? date
        : null
}


// Returns complete calendar months from the earliest recorded activity to today.
const getVisibleMonths = (
    studyDays: readonly string[],
    today: Date
): { year: number; month: number }[] => {
    const currentMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    )
    // Find the earliest user's recorded study day, month and year.
    const earliestStudyDay = studyDays
        .map(parseDateKey)
        .filter((date): date is Date => date !== null)
        .filter((date) => date <= currentMonth)
        .sort((first, second) => first.getTime() - second.getTime())[0]
    const firstMonth = earliestStudyDay
        ? new Date(
            earliestStudyDay.getFullYear(),
            earliestStudyDay.getMonth(),
            1
        )
        : currentMonth
    const months: { year: number; month: number }[] = []

    for (
        const date = new Date(firstMonth);
        date <= currentMonth;
        date.setMonth(date.getMonth() + 1)
    ) {
        months.push({
            year: date.getFullYear(),
            month: date.getMonth(),
        })
    }

    return months
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
            key: formatLocalDateKey(date),
            weekday: date.getDay(),
            week,
        })
    }

    return days
}


// Builds independent calendar-month blocks without mixing days between them.
export const buildHeatmapMonths = (
    studyDays: readonly string[],
    today = new Date()
): HeatmapMonth[] => {
    return getVisibleMonths(studyDays, today).map(({ year, month }) => {
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
