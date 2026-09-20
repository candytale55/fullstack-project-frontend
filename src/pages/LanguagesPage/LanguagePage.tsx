/*
 * src/pages/LanguagesPage/LanguagesPage.tsx
 *
 * Loads languages through languageService and displays them for selection.
 * Each language id is used to navigate to its available courses.
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import { getLanguages } from '../../services/languageService'
import type { Language } from '../../types/language'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'

import styles from './LanguagesPage.module.css'


export default function LanguagesPage() {

  const [languages, setLanguages] = useState<Language[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const data = await getLanguages()
        setLanguages(data)
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
            className={`${styles.languageCard} ${language.code === 'pt'
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