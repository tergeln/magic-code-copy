import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import Tr from '../Tr/Tr';
import '../../styles/subpage.css';

// courses, news, news-detail хуудасны header: logo + "← буцах" + хэлний товч
export default function SimpleNavbar({ logoTo, backTo, back }) {
  const { lang, toggleLang } = useLang();
  return (
    <header>
      <div className="wrap">
        <Link className="brand" to={logoTo} aria-label="Magic Code AI">
          <img className="brand-logo" src="/assets/magic-code-logo.png" alt="Magic Code AI" width="332" height="214" />
        </Link>
        <Link className="news-back" to={backTo}>
          <Tr text={back} />
        </Link>
        <button className="language" id="newsLang" onClick={toggleLang}>
          {lang === 'mn' ? 'EN' : 'MN'}
        </button>
      </div>
    </header>
  );
}
