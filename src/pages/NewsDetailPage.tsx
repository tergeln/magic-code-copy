import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { stories } from '../data/content'
import { useSite } from '../context/SiteContext'

const facts = [
  { mn: 'Огноо', en: 'Date' },
  { mn: 'Байршил', en: 'Location' },
  { mn: 'Хамтрагчид', en: 'Partners' },
]

export function NewsDetailPage() {
  const { id } = useParams()
  const { t } = useSite()
  const story = stories.find((item) => item.id === Number(id))

  useEffect(() => {
    document.title = story
      ? `${t(story.title.mn, story.title.en)} — Magic Code AI`
      : t('Бидний хийсэн ажлууд — Magic Code AI', 'Our community work — Magic Code AI')
  }, [story, t])

  return (
    <main className="story-page" id="story">
      {!story ? (
        <p>{t('Мэдээ олдсонгүй. Бүх мэдээ рүү буцна уу.', 'Story not found. Return to all stories.')}</p>
      ) : (
        <>
          <small className="story-meta">{t(story.category.mn, story.category.en)}</small>
          <h1>{t(story.title.mn, story.title.en)}</h1>
          <p className="sample-note">
            {t('Загварын жишээ · Энэ мэдээний бодит мэдээлэл хараахан ороогүй.', 'Sample story · Real details have not been added yet.')}
          </p>
          <div className="story-art" aria-hidden="true">
            {story.number}
          </div>
          <p>{t(story.summary.mn, story.summary.en)}</p>
          <h2>{t('Ажлын тухай', 'About this initiative')}</h2>
          <p>
            {t(
              'Энэ хэсэгт тухайн ажлын зорилго, хэрхэн зохион байгуулсан, хамтран оролцсон хүмүүсийн тухай дэлгэрэнгүй мэдээллийг нийтэлнэ.',
              'This section will describe the initiative’s purpose, how it was organised and the people involved.',
            )}
          </p>
          <dl>
            {facts.map((fact) => (
              <span key={fact.en} style={{ display: 'contents' }}>
                <dt>{t(fact.mn, fact.en)}</dt>
                <dd>{t('Мэдээлэл нэмэгдэнэ', 'To be added')}</dd>
              </span>
            ))}
          </dl>
          <h2>{t('Үр дүн ба онцлох агшнууд', 'Results and highlights')}</h2>
          <p>
            {t(
              'Бодит үр дүн, оролцогчдын сэтгэгдэл болон гэрэл зургуудыг энд нэмнэ.',
              'Verified outcomes, participant reflections and photographs will appear here.',
            )}
          </p>
          <Link className="btn secondary" to="/news">
            {t('← Бүх мэдээ рүү буцах', '← Back to all stories')}
          </Link>
        </>
      )}
    </main>
  )
}
