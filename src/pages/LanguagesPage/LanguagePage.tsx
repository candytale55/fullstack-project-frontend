/*
 * src/pages/LanguagesPage/LanguagesPage.tsx
 *
 * Loads languages through language.service and displays them for selection.
 * Each language id is used to navigate to its available courses.
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import { getLanguages } from '../../services/language.service'
import { getCoursesByLanguage } from '../../services/course.service'
import { getExercisesForCourse } from '../../services/exercise.service'
import { getMyProgress } from '../../services/progress.service'
import type { Language } from '../../types/language.types'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'

import styles from './LanguagesPage.module.css'


export default function LanguagesPage() {

  const [languages, setLanguages] = useState<Language[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastLanguageId, setLastLanguageId] = useState<string | null>(null)


  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const data = await getLanguages()

        try {
          const progress = await getMyProgress()
          setLastLanguageId(progress[0]?.course.language.id ?? null)
        } catch {
          setLastLanguageId(null)
        }

        const languagesWithExercises = await Promise.all(
          data.map(async (language) => {
            const courses = await getCoursesByLanguage(language.id)
            const courseExercises = await Promise.all(
              courses.map(getExercisesForCourse)
            )

            return courseExercises.some(
              (exercises) => exercises.length > 0
            )
              ? language
              : null
          })
        )

        // Keep empty languages in the database, but hide them until content exists.
        setLanguages(
          languagesWithExercises.filter(
            (language): language is Language => language !== null
          )
        )
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load languages'
        )
      } finally {
        setLoading(false)
      }
    }

    loadLanguages()
  }, [])


  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Alert>{error}</Alert>
  }


  return (
    <div className={styles.languagesPage}>
      <header className={styles.header}>
        <h1>Idiomas</h1>
        <p>
          Elige un idioma para ver los cursos disponibles.
        </p>
      </header>

      <div className={styles.languageGrid}>
        {languages.map((language) => (
          <article
            key={language.id}
            className={`${styles.languageCard} ${language.id === lastLanguageId
              ? styles.languageCardAvailable
              : ''
              }`}
          >
            <div>
              <h2>{language.nativeName}</h2>
              <p>{language.name}</p>
            </div>

            <Link
              to={`/languages/${language.id}/courses`}
              className={styles.courseLink}
            >
              Ver cursos
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}