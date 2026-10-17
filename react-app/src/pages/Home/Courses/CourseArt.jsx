import { Fragment } from 'react';
import { useLang } from '../../../context/LanguageContext';
import Tr from '../../../components/Tr/Tr';
import { chartBars, courseCodeArt, courseKeys } from '../../../data/courses';

export default function CourseArt({ course }) {
  const { lang } = useLang();
  const code = courseCodeArt[lang];
  return (
    <div className={`course-art ${course.art}`}>
      <span className="tag"><Tr text={course.tag} /></span>
      {course.kind === 'code' && (
        <div className="art-code">
          {code.lines.map((line) => (
            <Fragment key={line}>
              {line}
              <br />
            </Fragment>
          ))}
          <span style={{ color: '#b8d5a9' }}>{code.ok}</span>
        </div>
      )}
      {course.kind === 'chart' && (
        <div className="chart">
          {chartBars.map((h) => (
            <i key={h} style={{ '--h': h }} />
          ))}
        </div>
      )}
      {course.kind === 'keys' && (
        <div className="keys">
          {courseKeys.map((k) => (
            <b key={k}>{k}</b>
          ))}
        </div>
      )}
    </div>
  );
}
