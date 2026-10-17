import { Fragment, createElement } from 'react';
import { useLang } from '../../context/LanguageContext';

const TOKEN = /(<br\s*\/?>|<em>[\s\S]*?<\/em>)/g;

// Эх HTML-д data-mn/data-en дотор зөвхөн <br>, <em> тэмдэглэгээ байдаг. innerHTML ашиглахгүйгээр React элемент болгоно.
export function rich(text) {
  return text.split(TOKEN).map((part, i) => {
    if (/^<br/.test(part)) return createElement('br', { key: i });
    const em = part.match(/^<em>([\s\S]*)<\/em>$/);
    if (em) return createElement('em', { key: i }, em[1]);
    return createElement(Fragment, { key: i }, part);
  });
}

export default function Tr({ mn, en, text }) {
  const { lang } = useLang();
  const value = text ? text[lang] : lang === 'mn' ? mn : en;
  return <>{rich(value)}</>;
}
