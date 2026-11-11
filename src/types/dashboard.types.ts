/* src/types/dashboard.types.ts
 * These types define the structure of the data displayed in the dashboard. 
 * It was created in the early stages of the project to standardize the dashboard data structure. Must be removed in the future.
*/
// TODO: Remove this file once the dashboard data structure is fully integrated with the backend.   

// Info about the last course studied displayed in the dashboard.
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