import { useFadeIn } from '../hooks/useFadeIn';
import { SKILLS } from '../data/content';
import styles from './Skills.module.css';

// Forma de cada constelación: posiciones (en % del panel) y líneas entre estrellas.
// Si agregas más tecnologías que puntos, las nuevas se acomodan solas en un anillo.
const SHAPES = {
  languages: {
    points: [[8, 20], [30, 34], [50, 18], [70, 36], [88, 58], [62, 76], [30, 70]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1]],
  },
  databases: {
    points: [[14, 30], [62, 22], [40, 72]],
    edges: [[0, 1], [1, 2], [2, 0]],
  },
  cloud_devops: {
    points: [[8, 26], [24, 60], [44, 30], [58, 64], [80, 28], [86, 78]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5]],
  },
  tools: {
    points: [[12, 34], [40, 18], [56, 50], [30, 76]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
  },
};

function layout(key, count) {
  const shape = SHAPES[key] ?? { points: [], edges: [] };
  const points = shape.points.slice(0, count);
  for (let i = points.length; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    points.push([50 + Math.cos(a) * 34, 50 + Math.sin(a) * 30]);
  }
  const edges = shape.edges.filter(([a, b]) => a < count && b < count);
  return { points, edges };
}

function Constellation({ id, title, skills, index }) {
  const ref = useFadeIn(index * 0.12, 0.3);
  const { points, edges } = layout(id, skills.length);

  return (
    <figure ref={ref} className={styles.panel}>
      <figcaption className={styles.panelTitle}>{title}</figcaption>
      <div className={styles.chart}>
        <svg className={styles.lines} viewBox="0 0 160 100" aria-hidden="true">
          {edges.map(([a, b], i) => (
            <line
              key={`${a}-${b}`}
              x1={points[a][0] * 1.6} y1={points[a][1]}
              x2={points[b][0] * 1.6} y2={points[b][1]}
              pathLength="1"
              style={{ transitionDelay: `${0.25 + i * 0.12}s` }}
            />
          ))}
        </svg>
        <ul className={styles.stars}>
          {skills.map((name, i) => {
            const [x, y] = points[i];
            return (
              <li
                key={name}
                className={`${styles.star} ${x > 72 ? styles.labelLeft : ''}`}
                style={{ left: `${x}%`, top: `${y}%`, transitionDelay: `${i * 0.08}s` }}
              >
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.label}>{name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </figure>
  );
}

export default function Skills({ t }) {
  return (
    <section id="skills">
      <div className="section-wrapper">
        <p className="section-label">{t('skills_label')}</p>
        <h2 className="section-title">{t('skills_title')}</h2>
        <p className="section-sub">{t('skills_sub')}</p>

        <div className={styles.sky}>
          {Object.entries(SKILLS).map(([key, list], i) => (
            <Constellation key={key} id={key} index={i} title={t(`skills_cat_${key}`)} skills={list} />
          ))}
        </div>
      </div>
    </section>
  );
}
