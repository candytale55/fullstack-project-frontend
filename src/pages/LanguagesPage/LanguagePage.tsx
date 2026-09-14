import { Link } from 'react-router'
import { languagesMock } from '../../mocks/languagesMock'
import styles from './LanguagesPage.module.css'

export default function LanguagesPage() {

  return (
    <div className={styles.languagesPage}>
      <header className={styles.header}>
        <h1>Idiomas</h1>
        <p>Elige un idioma para ver los cursos disponibles.</p>
      </header>

      <div className={styles.languageGrid}>
        {languagesMock.map((language) => (
          <article
            key={language.id}
            className={styles.languageCard}>

            <div>
              <h2>{language.name}</h2>
              <p>
                {language.availableCourses}
                {" "}
                cursos disponibles
              </p>
            </div>

            <Link
              to={`/languages/${language.id}/courses`}
              className={styles.courseLink}>
              Ver cursos
            </Link>
          </article>
        ))}
      </div>
    </div>
    )
}

