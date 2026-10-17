import SimpleNavbar from '../../components/SimpleNavbar/SimpleNavbar';
import ImpactCard from '../../components/ImpactCard/ImpactCard';
import ImpactIntro from '../../components/ImpactCard/ImpactIntro';
import { useLang } from '../../context/LanguageContext';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { stories } from '../../data/stories';
import './news.css';

export default function NewsPage() {
  const { t } = useLang();
  useDocumentTitle(t('Бидний хийсэн ажлууд — Magic Code AI', 'Our community work — Magic Code AI'));

  return (
    <>
      <SimpleNavbar logoTo="/#about" backTo="/#about" back={{ mn: '← Бидний тухай', en: '← About us' }} />
      <main className="news-page">
        <div className="wrap impact-news">
          <ImpactIntro />
          <div className="impact-grid">
            {stories.map((story, i) => (
              <ImpactCard key={story.number} story={story} index={i} to={`/news/${i + 1}`} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
