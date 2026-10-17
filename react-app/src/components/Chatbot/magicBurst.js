// Chat нээхэд ботын хажуугаас тархдаг "ид шидийн" оч (42 ширхэг). Тархалт нь санамсаргүй.
export default function createBurst(rect) {
  const burst = document.createElement('div');
  burst.className = 'magic-burst';
  burst.setAttribute('aria-hidden', 'true');
  burst.style.left = `${rect.left + rect.width * 0.17}px`;
  burst.style.top = `${rect.top + rect.height * 0.18}px`;
  for (let i = 0; i < 42; i++) {
    const spark = document.createElement('span');
    const angle = Math.PI * 0.95 + Math.random() * Math.PI * 1.35;
    const distance = 65 + Math.random() * 150;
    spark.className = 'magic-spark';
    spark.textContent = i % 4 === 0 ? '✧' : '✦';
    spark.style.setProperty('--spark-color', i % 2 ? '#E8D5A3' : '#7DD3FC');
    spark.style.setProperty('--spark-size', `${9 + Math.random() * 9}px`);
    spark.style.setProperty('--spark-x', `${Math.cos(angle) * distance}px`);
    spark.style.setProperty('--spark-y', `${Math.sin(angle) * distance}px`);
    spark.style.setProperty('--spark-rotation', `${Math.random() * 180 - 90}deg`);
    burst.append(spark);
  }
  return burst;
}
