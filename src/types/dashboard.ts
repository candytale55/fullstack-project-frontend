export type DashboardCourse = {
    id: string
    title: string
    level: string
    progress: number  // Progress as a percentage (0-100)
    completedUnits: number
    totalUnits: number
}

export type DashboardStats = {
    completedExercises: number
    studyStreak: number
}