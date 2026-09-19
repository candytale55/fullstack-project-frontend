import { useParams } from "react-router"

import { coursesMock } from "../../../docs/notas/mocks/coursesMock"
import { unitsMock } from "../../mocks/unitsMock"
import { exercisesMock } from "../../mocks/exercisesMock"

import styles from "./ExercisePage.module.css"

export default function ExercisePage() {

    const {
        languageId,
        courseId,
        unitId,
        exerciseId
    } = useParams()

    const course = coursesMock.find(
        (course) =>
            course.id === courseId &&
            course.languageId === languageId
    )

    const unit = unitId
        ? unitsMock.find(
            (unit) =>
                unit.id === unitId &&
                unit.courseId === courseId
        ) : undefined

    const exercise = exercisesMock.find(
        (exercise) =>
            exercise.id === exerciseId &&
            courseId === courseId && (
                unitId
                    ? exercise.unitId === unitId
                    : exercise.unitId === undefined
            )
    )

    if (!course) {
        return (
            <div className={styles.exercisePage}>
                <h1>Curso no encontrado</h1>
            </div>
        )
    }

    if (unitId && !unit) {
        return (
            <div className={styles.exercisePage}>
                <h1>Unidad no encontrada</h1>
            </div>
        )
    }

    if (!exercise) {
        return (
            <div className={styles.exercisePage}>
                <h1>Ejercicio no encontrado</h1>
            </div>
        )
    }

    return (
        <div className={styles.exercisePage}>
            <header className={styles.header}>
                <p>{course.title}</p>
                {unit && <p>{unit.title}</p>}
                <h1>{exercise.title}</h1>
                {exercise.description &&
                    (<p>{exercise.description}</p>)}
            </header>

            <main className={styles.exerciseContent}>
                <p>Tipo de ejercicio: {exercise.type}</p>
                <p>Aqui va el contenido del ejercicio</p> {/* //TODO: Reemplazar con el contenido real del ejercicio */}
            </main>
        </div>
    )
}