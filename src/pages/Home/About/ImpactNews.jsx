import { Link } from 'react-router-dom';
import Tr from '../../../components/Tr/Tr';
import ImpactCard from '../../../components/ImpactCard/ImpactCard';
import ImpactIntro from '../../../components/ImpactCard/ImpactIntro';
import { stories } from '../../../data/stories';

export default function ImpactNews() {
  return (
    <div className="wrap impact-news">
      <ImpactIntro animate />
      <div className="impact-grid">
        {stories.slice(0, 3).map((story, i) => (
          <ImpactCard key={story.number} story={story} index={i} />
        ))}
      </div>
      <Link className="btn secondary" id="moreImpact" to="/news">
        <Tr mn="Цааш үзэх →" en="See all stories →" />
      </Link>
    </div>
  );
}
