import { useLang } from '../../../context/LanguageContext';
import { skills } from '../../../data/skills';

export default function SkillPills({ selected, onSelect }) {
  const { lang, t } = useLang();
  return (
    <div className="skill-pills" id="skillPills" role="group" aria-label={t('Ур чадварууд', 'Explore skills')}>
      {skills.map((skill, i) => (
        <button key={skill.en[0]} type="button" aria-pressed={selected === i} onClick={() => onSelect(i)}>
          {skill[lang][0]}
        </button>
      ))}
    </div>
  );
}
