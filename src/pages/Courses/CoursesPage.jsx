import { useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleNavbar from '../../components/SimpleNavbar/SimpleNavbar';
import Tr from '../../components/Tr/Tr';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { catalog, catalogFilters } from '../../data/catalog';
import './courses.css';

export default function CoursesPage() {
  const [filter, setFilter] = useState('all');
  useDocumentTitle('Бүх сургалтууд — Magic Code AI');

  return (
    <>
      <SimpleNavbar logoTo="/#courses" backTo="/#courses" back={{ mn: '← Сургалтууд', en: '← Courses' }} />
      <main className="catalog-page wrap">
        <div className="eyebrow"><Tr mn="СУРАЛЦАХ ЗАМАА СОНГО" en="CHOOSE YOUR PATH" /></div>
        <h1><Tr mn="Бүх сургалтууд" en="Explore courses" /></h1>
        <p className="catalog-intro">
          <Tr mn="Өөрийн зорилго, түвшинд тохирох чиглэлээ сонгоорой." en="Find a learning path for your goals and level." />
        </p>
        <div className="catalog-filters" aria-label="Course categories">
          {catalogFilters.map((f) => (
            <button key={f.key} type="button" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
              <Tr text={f} />
            </button>
          ))}
        </div>
        <div className="catalog-grid">
          {catalog.map((c) => (
            <article
              key={c.title.en}
              className="catalog-card"
              hidden={filter !== 'all' && c.category !== filter}
            >
              <div className={`catalog-art catalog-art-${c.art}`} aria-hidden="true">{c.artText}</div>
              <div className="catalog-body">
                <small><Tr text={c.status} /></small>
                <h3><Tr text={c.title} /></h3>
                <p><Tr text={c.text} /></p>
                {c.planned ? (
                  <span className="planned-note"><Tr text={c.planned} /></span>
                ) : (
                  <Link className="btn" to={`/?course=${c.course}#courses`}><Tr text={c.cta} /></Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
