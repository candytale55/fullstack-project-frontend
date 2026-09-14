export type CourseStructure = 'units' | 'exercises'
// if units -> UnitsPage, if exercises -> ExercisesPage

export type Course = {
    id: string
    languageId: string
    title: string
    level: string
    description?: string
    structure: CourseStructure
    contentCount: number // number of units or exercises
}

