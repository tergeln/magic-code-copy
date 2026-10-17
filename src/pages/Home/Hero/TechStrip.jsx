import { techStack } from '../../../data/skills';

// Эх JS: `.strip`-ийг цэвэрлэж, технологийн жагсаалтыг 2 хос (хоёр дахь нь aria-hidden) болгон гүйлгэдэг.
export default function TechStrip() {
  return (
    <div className="strip">
      <div className="tech-flow-track">
        {[0, 1].map((group) => (
          <div key={group} className="tech-flow-group" aria-hidden={group ? 'true' : undefined}>
            {techStack.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
