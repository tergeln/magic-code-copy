import { useLang } from '../../context/LanguageContext';
import { liveStrip } from '../../data/skills';

export default function LiveStrip() {
  const { lang } = useLang();
  return (
    <div className="live-strip" aria-hidden="true">
      <span>
        <b>●</b>
        {liveStrip[lang]}
      </span>
    </div>
  );
}
