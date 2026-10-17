import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { catalog, catalogFilters, plannedNote, type CourseCategory } from '../data/content'
import { useSite } from '../context/SiteContext'

export function CoursesPage() {
  const { t } = useSite()
  const [filter, setFilter] = useState<'all' | CourseCategory>('all')

  useEffect(() => {
    document.title = t('Бүх сургалтууд — Magic Code AI', 'Explore courses — Magic Code AI')
  }, [t])

  return (
    <main className="catalog-page wrap">
      <Link className="page-back" to="/#courses">
        {t('← Сургалтууд', '← Courses')}
      </Link>
      <div className="eyebrow">{t('СУРАЛЦАХ ЗАМАА СОНГО', 'CHOOSE YOUR PATH')}</div>
      <h1>{t('Бүх сургалтууд', 'Explore courses')}</h1>
      <p className="catalog-intro">{t('Өөрийн зорилго, түвшинд тохирох чиглэлээ сонгоорой.', 'Find a learning path for your goals and level.')}</p>
      <div className="catalog-filters" aria-label="Course categories">
        {catalogFilters.map((item) => (
          <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
            {t(item.label.mn, item.label.en)}
          </button>
        ))}
      </div>
      <div className="catalog-grid">
        {catalog.map((course) => (
          <article className="catalog-card" key={course.title.en} hidden={filter !== 'all' && course.category !== filter}>
            <div className={`catalog-art catalog-art-${course.art}`} aria-hidden="true">
              {course.symbol}
            </div>
            <div className="catalog-body">
              <small>{t(course.status.mn, course.status.en)}</small>
              <h3>{t(course.title.mn, course.title.en)}</h3>
              <p>{t(course.body.mn, course.body.en)}</p>
              {course.enroll === undefined ? (
                <span className="planned-note">{t(plannedNote.mn, plannedNote.en)}</span>
              ) : (
                <Link className="btn" to={`/?course=${course.enroll}#courses`}>
                  {course.enroll === 1 ? t('Сургалт авах →', 'Take this course →') : t('Хүлээлгийн жагсаалт →', 'Join waitlist →')}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
