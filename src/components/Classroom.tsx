import { useEffect, useState } from 'react'
import { lessons } from '../data/content'
import { useSite } from '../context/SiteContext'
import { useDialog } from '../hooks/useDialog'

function readCompleted() {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem('mc-lessons-v1') || '[]')
    if (!Array.isArray(saved)) return []
    return [...new Set(saved.filter((id): id is string => typeof id === 'string' && lessons.some((lesson) => lesson.id === id)))]
  } catch {
    return []
  }
}

function readCurrent() {
  const last = Number(localStorage.getItem('mc-last-lesson'))
  return Number.isInteger(last) && last >= 0 && last < lessons.length ? last : 0
}

export function Classroom() {
  const { t, classroomOpen, closeClassroom } = useSite()
  const ref = useDialog(classroomOpen, closeClassroom)
  const [current, setCurrent] = useState(readCurrent)
  const [completed, setCompleted] = useState<string[]>(readCompleted)
  const lesson = lessons[current]

  useEffect(() => {
    if (!classroomOpen) return
    try {
      localStorage.setItem('mc-last-lesson', String(current))
    } catch {
      /* The browser may block storage. Playback still works. */
    }
  }, [classroomOpen, current])

  const toggleComplete = () => {
    const id = lesson.id
    const next = completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id]
    setCompleted(next)
    try {
      localStorage.setItem('mc-lessons-v1', JSON.stringify(next))
    } catch {
      /* Ignore private-mode storage failures. */
    }
  }

  return (
    <dialog id="classroom" ref={ref}>
      <div className="classroom-top">
        <div>
          <small>MAGIC CODE · LEARNING SPACE</small>
          <h3>{t('Өгөгдлийн шинжилгээ ба Power BI', 'Data Analysis & Power BI')}</h3>
        </div>
        <button className="icon-btn" id="closeClassroom" type="button" aria-label={t('Хаах', 'Close')} onClick={closeClassroom}>
          ×
        </button>
      </div>
      <div className="classroom-layout">
        <div className="classroom-main">
          <div className="lesson-video">
            {classroomOpen && (
              <iframe
                id="lessonPlayer"
                title="Course video"
                src={`https://www.youtube-nocookie.com/embed/${lesson.id}?rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </div>
          <small id="lessonCreator">
            {lesson.creator} · YouTube
          </small>
          <h3 id="lessonTitle">{t(lesson.mn, lesson.en)}</h3>
          <p>
            {t(
              'Түр сан: бусад бүтээгчдийн нээлттэй YouTube хичээлүүд · Англи хэлээр.',
              'Preview library: public YouTube lessons from independent creators · In English.',
            )}
          </p>
          <a id="lessonYoutube" href={`https://www.youtube.com/watch?v=${lesson.id}`} target="_blank" rel="noopener noreferrer">
            {t('YouTube дээр үзэх ↗', 'Watch on YouTube ↗')}
          </a>
          <div className="lesson-actions">
            <button className="btn" id="completeLesson" type="button" onClick={toggleComplete}>
              {completed.includes(lesson.id)
                ? t('✓ Үзсэн · Тэмдэглэгээг авах', '✓ Completed · Undo')
                : t('Үзсэн гэж тэмдэглэх ✓', 'Mark as completed ✓')}
            </button>
            <button
              className="btn secondary"
              id="nextLesson"
              type="button"
              disabled={current === lessons.length - 1}
              onClick={() => setCurrent((value) => Math.min(lessons.length - 1, value + 1))}
            >
              {t('Дараагийн хичээл →', 'Next lesson →')}
            </button>
          </div>
        </div>
        <div className="classroom-sidebar">
          <h3>{t('Хичээлийн агуулга', 'Course content')}</h3>
          <p id="lessonProgress" aria-live="polite">
            {t('Дууссан: ', 'Completed: ')}
            {completed.length} / {lessons.length}
          </p>
          <progress id="lessonProgressBar" value={completed.length} max={lessons.length} />
          <div id="lessonList">
            {lessons.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="lesson-choice"
                aria-current={index === current ? 'true' : 'false'}
                onClick={() => setCurrent(index)}
              >
                <span>{completed.includes(item.id) ? '✓' : String(index + 1).padStart(2, '0')}</span>
                <span>{t(item.mn, item.en)}</span>
              </button>
            ))}
          </div>
          <small>{t('Тэмдэглэсэн явц энэ хөтөч дээр хадгалагдана.', 'Completion marks are saved in this browser.')}</small>
        </div>
      </div>
    </dialog>
  )
}
