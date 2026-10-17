import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import {
  activities,
  codeArt,
  homeCourses,
  journey,
  motionLabels,
  showpieces,
  skills,
  stories,
  techLabels,
} from '../data/content'
import { useSite } from '../context/SiteContext'
import { mountHomeCanvas } from '../effects/homeCanvas'
import { mountParticleUniverse } from '../effects/particleUniverse'
import { useHomeMotion } from '../hooks/useHomeMotion'

function stars() {
  let seed = 2047
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  return Array.from({ length: 170 }, (_, id) => ({
    id,
    left: `${random() * 100}%`,
    top: `${random() * 100}%`,
    size: `${0.8 + random() * 1.8}px`,
    opacity: (0.12 + random() * 0.24).toFixed(2),
  }))
}

export function HomePage() {
  const { lang, t, openEnroll, openChat } = useSite()
  const [selected, setSelected] = useState(-1)
  const [loaded, setLoaded] = useState(0)
  const [loaderDone, setLoaderDone] = useState(false)
  const live = useRef({ selected: -1 })
  live.current.selected = selected
  const sky = useMemo(stars, [])
  useHomeMotion(lang)

  useEffect(() => {
    document.title = t('Magic Code AI — Суралц. Бүтээ. Хөгж.', 'Magic Code AI — Learn. Build. Become.')
  }, [t])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let percent = 0
    const timer = window.setInterval(() => {
      percent = Math.min(100, percent + (reduced ? 100 : 8))
      setLoaded(percent)
      if (percent === 100) {
        window.clearInterval(timer)
        window.setTimeout(() => setLoaderDone(true), 200)
      }
    }, 45)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const universe = document.getElementById('universe')
    const constellation = document.getElementById('constellation')
    const cursorGlow = document.getElementById('cursorGlow')
    if (!(universe instanceof HTMLCanvasElement) || !(constellation instanceof HTMLCanvasElement)) return undefined
    const stopCanvas = mountHomeCanvas({
      universe,
      constellation,
      cursorGlow,
      live,
      onSelect: setSelected,
    })
    const stopField = mountParticleUniverse()
    return () => {
      stopCanvas()
      stopField()
    }
  }, [])

  const manifesto = t('Magic Code AI-тай суралцаж, санаагаа бүтээл болго.', 'Learn with Magic Code AI and bring your ideas to life.')
  const ticker = t(
    'Хамтарсан дадлага · Багшийн зөвлөгөө · Дараагийн санаагаа бүтээ · Улаанбаатар · Python · SQL · Power BI · Хиймэл оюун',
    'Live labs · Mentor reviews · Build your next idea · Ulaanbaatar · Python · SQL · Power BI · AI',
  )

  return (
    <>
      <div className={loaderDone ? 'immersive-loader done' : 'immersive-loader'} id="immersiveLoad" aria-hidden="true">
        {String(loaded).padStart(3, '0')}%
      </div>
      <div id="cursorGlow" />
      <canvas id="universe" aria-hidden="true" />
      <nav className="chapter-index" aria-label="Chapters">
        <a href="#home">{t('01 / Эхлэл', '01 / Welcome')}</a>
        <a href="#about">{t('02 / Бидний тухай', '02 / About')}</a>
        <a href="#activities">{t('03 / Үйл ажиллагаа', '03 / Activities')}</a>
        <a href="#courses">{t('04 / Сургалт', '04 / Courses')}</a>
        <a href="#merch">{t('05 / Бүтээгдэхүүн', '05 / Merch')}</a>
        <a href="#contact">{t('06 / Холбоо барих', '06 / Contact')}</a>
      </nav>
      <main>
        <div className="wrap" id="home">
          <div className="hero-static-stars" aria-hidden="true">
            {sky.map((star) => (
              <i
                key={star.id}
                style={{ left: star.left, top: star.top, ['--star-size' as string]: star.size, ['--star-opacity' as string]: star.opacity }}
              />
            ))}
          </div>
          <div className="hero-color-clouds" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <canvas id="constellation" aria-label={t('Ур чадварын оддын зураглалыг судлах', 'Explore the skills constellation')} />
          <div className="hero">
            <div>
              <div className="eyebrow">{t('ИРЭЭДҮЙГ ХАМТДАА БҮТЭЭЕ', 'BUILD YOUR NEXT CHAPTER')}</div>
              <h1 dangerouslySetInnerHTML={{ __html: t('AI-г ашиглах уу,<em>өөрөө бүтээх үү?</em>', 'Will you use AI,<em>or build it?</em>') }} />
              <p>
                {t(
                  'Сониуч зангаа бодит ур чадвар болго. Программчлал, өгөгдөл, хиймэл оюуныг практик төсөл дээр суралцах таны шинэ орон зай.',
                  'Turn your curiosity into real skills. Your space to learn programming, data and artificial intelligence through hands-on projects.',
                )}
              </p>
              <div className="actions">
                <a className="btn" href="#courses">
                  {t('Сургалтууд үзэх ↗', 'Explore courses ↗')}
                </a>
                <a className="btn secondary" href="#about">
                  {t('Бидэнтэй танилцах →', 'Meet the academy →')}
                </a>
              </div>
              <div className="skill-pills" id="skillPills" role="group" aria-label={t('Ур чадварууд', 'Explore skills')}>
                {skills.map((skill, index) => (
                  <button key={skill.en} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>
                    {lang === 'mn' ? skill.mn : skill.en}
                  </button>
                ))}
              </div>
              <div className="hero-foot">
                <div className="avatars">
                  <i>MC</i>
                  <i>AI</i>
                  <i>&lt;/&gt;</i>
                  <i>↗</i>
                </div>
                <span>{t('Суралц. Турш. Бүтээ. Хамтдаа.', 'Learn. Experiment. Build. Together.')}</span>
              </div>
            </div>
          </div>
          <div className="strip">
            <div className="tech-flow-track">
              {[0, 1].map((copy) => (
                <div className="tech-flow-group" key={copy} aria-hidden={copy === 1}>
                  {techLabels.map((label) => (
                    <span key={`${copy}-${label}`}>{label}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <section id="manifesto">
          <div className="wrap">
            <p className="eyebrow">Manifesto</p>
            <p className="serif">
              {manifesto.split(' ').map((word, index) => (
                <span key={`${word}-${index}`}>{word} </span>
              ))}
            </p>
          </div>
        </section>

        <section id="courses">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">{t('ӨӨРТ ТОХИРОХ ЗАМАА СОНГО', 'FIND YOUR STARTING POINT')}</div>
                <h2 dangerouslySetInnerHTML={{ __html: t('Шинэ ур чадвар.<br><em>Шинэ боломж.</em>', 'New skills.<br><em>New possibilities.</em>') }} />
              </div>
              <p>
                {t(
                  'Анхан шатнаас ахисан түвшин хүртэл. Зөвхөн хичээл үзэхээс илүүг — өөрийн бүтээлтэй болохыг сонго.',
                  'From first steps to your next level. Go beyond watching lessons. Build something you can call your own.',
                )}
              </p>
            </div>
            <div className="courses">
              {homeCourses.map((course) => (
                <article className="card reveal" key={course.index}>
                  <div className={`course-art ${course.art === 'code' ? 'art1' : course.art === 'chart' ? 'art2' : 'art3'}`}>
                    <span className="tag">{t(course.tag.mn, course.tag.en)}</span>
                    {course.art === 'code' && <div className="art-code" dangerouslySetInnerHTML={{ __html: lang === 'mn' ? codeArt.mn : codeArt.en }} />}
                    {course.art === 'chart' && (
                      <div className="chart">
                        {['40%', '65%', '53%', '87%', '100%'].map((height) => (
                          <i key={height} style={{ '--h': height } as CSSProperties} />
                        ))}
                      </div>
                    )}
                    {course.art === 'keys' && (
                      <div className="keys">
                        <b>⌘</b>
                        <b>⇧</b>
                        <b>↗</b>
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <h3>{t(course.title.mn, course.title.en)}</h3>
                    <p>{t(course.body.mn, course.body.en)}</p>
                    <div className="meta">{t(course.meta.mn, course.meta.en)}</div>
                    <div className="card-bottom">
                      <strong>{t(course.status.mn, course.status.en)}</strong>
                      <button type="button" onClick={() => openEnroll(course.index)}>
                        {t(course.cta.mn, course.cta.en)}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
              <Link className="btn secondary courses-more" to="/courses">
                {t('Цааш үзэх →', 'See all courses →')}
              </Link>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="wrap about-grid">
            <div className="about-picture">
              <div className="picture-note">
                <strong>{t('Эхний алхмаас ид шид эхэлнэ.', 'Magic happens when you start.')}</strong>
                <br />
                <span className="muted">{t('Улаанбаатар, Монгол ↗', 'Ulaanbaatar, Mongolia ↗')}</span>
              </div>
            </div>
            <div className="about-copy reveal">
              <div className="eyebrow">{t('БИДНИЙ ТУХАЙ', 'OUR STORY')}</div>
              <h2 dangerouslySetInnerHTML={{ __html: t('Технологийг ойртуулж,<br><em>боломжийг нээнэ.</em>', 'Making technology<br><em>feel possible.</em>') }} />
              <p>
                {t(
                  'Magic Code AI бол программчлал, өгөгдөл, хиймэл оюуныг бодитоор туршиж суралцах орон зай. Бид онолыг практиктай холбож, суралцагч бүрийг өөрийн санааг бүтээл болгоход чиглүүлнэ.',
                  'Magic Code AI is a space to explore programming, data and artificial intelligence. We connect concepts with practice and help learners turn their own ideas into things that work.',
                )}
              </p>
              <div className="values">
                <div>
                  <b>{t('Практик эхэнд', 'Practice comes first')}</b>
                  <span>{t('Бодит төсөл дээр суралцана', 'Learn by making real projects')}</span>
                </div>
                <div>
                  <b>{t('Хамтдаа илүү хол', 'Better together')}</b>
                  <span>{t('Асууж, туршиж, хамтдаа өснө', 'Ask, experiment and grow')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap impact-news">
            <div className="section-head reveal">
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
              {stories.slice(0, 3).map((story) => (
                <article className="impact-card" key={story.id}>
                  <div className={`impact-art impact-art-${story.art}`} aria-hidden="true">
                    <span>{story.number}</span>
                    <i />
                  </div>
                  <div className="impact-card-body">
                    <small>{t(story.category.mn, story.category.en)}</small>
                    <h3>{t(story.title.mn, story.title.en)}</h3>
                    <p>{t(story.summary.mn, story.summary.en)}</p>
                  </div>
                </article>
              ))}
            </div>
            <Link className="btn secondary" id="moreImpact" to="/news">
              {t('Цааш үзэх →', 'See all stories →')}
            </Link>
          </div>
        </section>

        <div className="motion-band" aria-hidden="true">
          <div className="motion-band-track">
            {[0, 1].map((copy) => (
              <div className="motion-band-group" key={copy}>
                {motionLabels[lang].map((label) => (
                  <Fragment key={`${copy}-${label}`}>
                    <span>{label}</span>
                    <i>✧</i>
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section id="activities">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">{t('БИДНИЙ ҮЙЛ АЖИЛЛАГАА', 'WHAT WE DO')}</div>
                <h2 dangerouslySetInnerHTML={{ __html: t('Хичээлээс <em>цааш.</em>', 'Beyond the <em>classroom.</em>') }} />
              </div>
              <p>
                {t(
                  'Мэдлэгээ хуваалцах, санаагаа турших, шинэ хүмүүстэй холбогдох боломжууд.',
                  'More ways to share knowledge, test your ideas and find your people.',
                )}
              </p>
            </div>
            <div className="activities">
              {activities.map((item) => (
                <article className="activity reveal" key={item.number}>
                  <span className="number">{item.number}</span>
                  <h3>{t(item.title.mn, item.title.en)}</h3>
                  <p>{t(item.body.mn, item.body.en)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="method" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <div className="eyebrow">Method</div>
            <h2 dangerouslySetInnerHTML={{ __html: t('Санаанаас<br>бодит бүтээл рүү.', 'From concept<br>to shipped system.') }} />
          </div>
          <div className="journey" id="journey">
            <div className="journey-sticky">
              <div className="journey-track" id="journeyTrack">
                {journey.map((step) => (
                  <article className="journey-panel reveal" key={step.kicker.en}>
                    <div>
                      <i>{t(step.kicker.mn, step.kicker.en)}</i>
                      <h3>{t(step.title.mn, step.title.en)}</h3>
                      <p>{t(step.body.mn, step.body.en)}</p>
                    </div>
                    <div className="journey-visual">{t(step.visual.mn, step.visual.en)}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="merch-section" id="merch">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">{t('ШИДЭТ ЦУГЛУУЛГА', 'THE MAGIC COLLECTION')}</div>
                <h2 dangerouslySetInnerHTML={{ __html: t('Өдөр бүрт <em>багахан шид.</em>', 'A little magic, <em>every day.</em>') }} />
              </div>
            </div>
            <div className="products lv-products">
              {showpieces.map((item) => (
                <article key={item.en}>
                  <a className="product-art" href={item.href} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.src}
                      alt={item.alt}
                      width="1800"
                      height="1800"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      data-original-src={item.original}
                      onError={(event) => {
                        const image = event.currentTarget
                        if (image.dataset.fallback) return
                        image.dataset.fallback = 'true'
                        const original = image.dataset.originalSrc
                        if (original) image.src = original
                      }}
                    />
                  </a>
                  <div className="product-info reveal">
                    <div>
                      <h3>{t(item.mn, item.en)}</h3>
                    </div>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${t('Үзэх', 'View')} ${item.en}`}>
                      ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="merch-notice">
              {t(
                'Түр загварын зураг · Magic Code AI-ийн худалдаалах бүтээгдэхүүн биш.',
                'Temporary design imagery · These are not products sold by Magic Code AI.',
              )}
            </p>
          </div>
        </section>

        <section id="contact">
          <div className="wrap contact reveal">
            <div>
              <div className="eyebrow">{t('ХОЛБОО БАРИХ', 'SAY HELLO')}</div>
              <h2 dangerouslySetInnerHTML={{ __html: t('Танд нэг санаа байна уу?<br><em>Ярилцъя.</em>', 'Something on your mind?<br><em>Let’s talk.</em>') }} />
              <p>
                {t(
                  'Сургалтын талаар асуух эсвэл хамтран ажиллах — бид таныг сонсоход бэлэн.',
                  'Have a course question or a collaboration idea? We would love to hear from you.',
                )}
              </p>
            </div>
            <div className="contact-links">
              <a className="contact-row" href="mailto:magiccodeai@gmail.com">
                <small>{t('И-мэйл', 'Email')}</small>
                <span>magiccodeai@gmail.com ↗</span>
              </a>
              <div className="contact-row">
                <small>{t('Байршил', 'Location')}</small>
                <span>{t('Улаанбаатар, Монгол', 'Ulaanbaatar, Mongolia')}</span>
              </div>
              <button className="btn secondary" id="contactChat" type="button" onClick={() => openChat(false)}>
                {t('Туслахтай ярилцах ↗', 'Chat with our assistant ↗')}
              </button>
            </div>
          </div>
        </section>
      </main>
      <div className="live-strip" aria-hidden="true">
        <span>
          <b>●</b> {ticker} · <b>●</b> {ticker} ·{' '}
        </span>
      </div>
    </>
  )
}
