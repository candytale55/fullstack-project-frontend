import type {
    DashboardCourse,
    DashboardStats
} from '../types/dashboard'

export const activeCourseMock: DashboardCourse = {
    id: 'course-1',
    title: 'Português',
    level: 'B2',
    progress: 35,
    completedUnits: 3,
    totalUnits: 10,
}

export const dashboardStatsMock: DashboardStats = {
    completedExercises: 18,
    studyStreak: 4,
}