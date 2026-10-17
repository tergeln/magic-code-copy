import { Fragment } from 'react';
import { useLang } from '../../context/LanguageContext';
import { motionBandLabels } from '../../data/skills';

// Эх JS: #activities-ийн өмнө оруулсан хоёр хос гүйдэг мөр.
export default function MotionBand() {
  const { lang } = useLang();
  return (
    <div className="motion-band" aria-hidden="true">
      <div className="motion-band-track">
        {[0, 1].map((group) => (
          <div key={group} className="motion-band-group">
            {motionBandLabels[lang].map((label) => (
              <Fragment key={label}>
                <span>{label}</span>
                <i>✧</i>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
