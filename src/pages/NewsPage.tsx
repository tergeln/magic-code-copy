import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { stories } from '../data/content'
import { useSite } from '../context/SiteContext'

export function NewsPage() {
  const { t } = useSite()

  useEffect(() => {
    document.title = t('Бидний хийсэн ажлууд — Magic Code AI', 'Our community work — Magic Code AI')
  }, [t])

  return (
    <main className="news-page">
      <div className="wrap impact-news">
        <Link className="page-back" to="/#about">
          {t('← Бидний тухай', '← About us')}
        </Link>
        <div className="section-head">
          <div>
            <div className="eyebrow">{t('БИДНИЙ ОРОЛЦОО', 'OUR IMPACT')}</div>
            <h2 dangerouslySetInnerHTML={{ __html: t('Бидний <em>хийсэн ажлууд.</em>', 'Our work <em>in the community.</em>') }} />
          </div>
        </div>
        <p className="impact-sample">
          {t(
            'Хамт олны санаачилга, боловсролын дэмжлэг, нийгэмд чиглэсэн ажлуудын түүх.',
            'Stories of community initiatives, educational support and social impact.',
          )}
        </p>
        <div className="impact-grid">
          {stories.map((story) => (
            <article className="impact-card" key={story.id}>
              <Link className="news-card-link" to={`/news/${story.id}`}>
                <div className={`impact-art impact-art-${story.art}`} aria-hidden="true">
                  <span>{story.number}</span>
                  <i />
                </div>
                <div className="impact-card-body">
                  <small>{t(story.category.mn, story.category.en)}</small>
                  <h3>{t(story.title.mn, story.title.en)}</h3>
                  <p>{t(story.summary.mn, story.summary.en)}</p>
                </div>
                <span className="news-read">{t('Дэлгэрэнгүй →', 'Read story →')}</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
