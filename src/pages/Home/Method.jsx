import { useEffect, useRef } from 'react';
import Tr from '../../components/Tr/Tr';
import useReveal from '../../hooks/useReveal';
import { journey } from '../../data/journey';

function JourneyPanel({ panel }) {
  const [ref, className] = useReveal('journey-panel');
  return (
    <article ref={ref} className={className}>
      <div>
        <i><Tr text={panel.step} /></i>
        <h3><Tr text={panel.title} /></h3>
        <p><Tr text={panel.text} /></p>
      </div>
      <div className="journey-visual">
        {typeof panel.visual === 'string' ? panel.visual : <Tr text={panel.visual} />}
      </div>
    </article>
  );
}

// Sticky хэсэг дотор scroll-ийн явцад панелуудыг хэвтээ гүйлгэнэ.
export default function Method() {
  const journeyRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const section = journeyRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const h = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / (section.offsetHeight - h)));
      track.style.transform = `translateX(${-(track.scrollWidth - window.innerWidth) * progress}px)`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section id="method" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="eyebrow">Method</div>
        <h2><Tr mn="Санаанаас<br>бодит бүтээл рүү." en="From concept<br>to shipped system." /></h2>
      </div>
      <div className="journey" id="journey" ref={journeyRef}>
        <div className="journey-sticky">
          <div className="journey-track" id="journeyTrack" ref={trackRef}>
            {journey.map((panel) => (
              <JourneyPanel key={panel.title.en} panel={panel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
