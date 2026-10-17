import Tr from '../../components/Tr/Tr';
import useReveal from '../../hooks/useReveal';
import { activities } from '../../data/activities';

function ActivityCard({ activity }) {
  const [ref, className] = useReveal('activity');
  return (
    <article ref={ref} className={className}>
      <span className="number">{activity.number}</span>
      <h3><Tr text={activity.title} /></h3>
      <p><Tr text={activity.text} /></p>
    </article>
  );
}

export default function Activities() {
  const [headRef, headClass] = useReveal('section-head');
  return (
    <section id="activities">
      <div className="wrap">
        <div ref={headRef} className={headClass}>
          <div>
            <div className="eyebrow"><Tr mn="БИДНИЙ ҮЙЛ АЖИЛЛАГАА" en="WHAT WE DO" /></div>
            <h2><Tr mn="Хичээлээс <em>цааш.</em>" en="Beyond the <em>classroom.</em>" /></h2>
          </div>
          <p>
            <Tr
              mn="Мэдлэгээ хуваалцах, санаагаа турших, шинэ хүмүүстэй холбогдох боломжууд."
              en="More ways to share knowledge, test your ideas and find your people."
            />
          </p>
        </div>
        <div className="activities">
          {activities.map((activity) => (
            <ActivityCard key={activity.number} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
}
