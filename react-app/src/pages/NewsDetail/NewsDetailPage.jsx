import { Link, useParams } from 'react-router-dom';
import SimpleNavbar from '../../components/SimpleNavbar/SimpleNavbar';
import { useLang } from '../../context/LanguageContext';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { stories } from '../../data/stories';
import './news-detail.css';

const detailRows = [
  ['Огноо', 'Date'],
  ['Байршил', 'Location'],
  ['Хамтрагчид', 'Partners'],
];

export default function NewsDetailPage() {
  const { id } = useParams();
  const { lang, t } = useLang();
  const num = Number(id);
  const story = Number.isInteger(num) ? stories[num - 1] : undefined;

  useDocumentTitle(story ? `${story.title[lang]} — Magic Code AI` : 'Бидний хийсэн ажлууд — Magic Code AI');

  return (
    <>
      <SimpleNavbar logoTo="/#about" backTo="/news" back={{ mn: '← Бүх мэдээ', en: '← All stories' }} />
      <main className="story-page" id="story">
        {!story ? (
          t('Мэдээ олдсонгүй. Бүх мэдээ рүү буцна уу.', 'Story not found. Return to all stories.')
        ) : (
          <>
            <small className="story-meta">{story.category[lang]}</small>
            <h1>{story.title[lang]}</h1>
            <p className="sample-note">
              {t('Загварын жишээ · Энэ мэдээний бодит мэдээлэл хараахан ороогүй.', 'Sample story · Real details have not been added yet.')}
            </p>
            <div className="story-art" aria-hidden="true">{story.number}</div>
            <p>{story.summary[lang]}</p>
            <h2>{t('Ажлын тухай', 'About this initiative')}</h2>
            <p>
              {t(
                'Энэ хэсэгт тухайн ажлын зорилго, хэрхэн зохион байгуулсан, хамтран оролцсон хүмүүсийн тухай дэлгэрэнгүй мэдээллийг нийтэлнэ.',
                'This section will describe the initiative’s purpose, how it was organised and the people involved.',
              )}
            </p>
            <dl>
              {detailRows.map(([mn, en]) => (
                <DetailRow key={en} label={t(mn, en)} value={t('Мэдээлэл нэмэгдэнэ', 'To be added')} />
              ))}
            </dl>
            <h2>{t('Үр дүн ба онцлох агшнууд', 'Results and highlights')}</h2>
            <p>
              {t(
                'Бодит үр дүн, оролцогчдын сэтгэгдэл болон гэрэл зургуудыг энд нэмнэ.',
                'Verified outcomes, participant reflections and photographs will appear here.',
              )}
            </p>
            <Link className="btn secondary" to="/news">{t('← Бүх мэдээ рүү буцах', '← Back to all stories')}</Link>
          </>
        )}
      </main>
    </>
  );
}

function DetailRow({ label, value }) {
  return (
    <>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </>
  );
}
