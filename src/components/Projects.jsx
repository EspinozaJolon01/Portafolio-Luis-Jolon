import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { PROJECTS } from '../data/content';
import styles from './Projects.module.css';

const GhIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
  </svg>
);

function ProjectCard({ project, lang, t, onOpen }) {
  const ref = useFadeIn(0);
  return (
    <div ref={ref} className={`${styles.card} fade-in`}>
      <div className={styles.cardHeader}>
        <span className={styles.cardNum}>0{project.id}</span>
        <div className={styles.tags}>
          {project.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
        </div>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project[`title_${lang}`]}</h3>
        <p className={styles.cardDesc}>{project[`desc_${lang}`]}</p>
      </div>
      <div className={styles.cardFooter}>
        <button className={styles.btnInfo} onClick={() => onOpen(project)}>
          {t('btn_details')}
        </button>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.btnGh}>
          <GhIcon /> {t('btn_github')}
        </a>
      </div>
    </div>
  );
}

function Modal({ project, lang, t, onClose }) {
  if (!project) return null;
  return (
    <div className={`${styles.backdrop}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        <div className={styles.modalTags}>
          {project.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
        </div>
        <h2 className={styles.modalTitle}>{project[`title_${lang}`]}</h2>
        <p className={styles.modalDesc}>{project[`long_${lang}`]}</p>
        <div className={styles.features}>
          <h4 className={styles.featuresTitle}>{t('modal_features')}</h4>
          <ul className={styles.featuresList}>
            {project[`features_${lang}`].map((f, i) => (
              <li key={i} className={styles.featureItem}>{f}</li>
            ))}
          </ul>
        </div>
        <div className={styles.modalActions}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.btnGh}>
            <GhIcon /> GitHub
          </a>
          <button className={styles.btnClose} onClick={onClose}>{t('btn_close')}</button>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ t, lang }) {
  const [active, setActive] = useState(null);

  return (
    <section id="projects">
      <div className="section-wrapper">
        <div className="section-label">{t('projects_label')}</div>
        <h2 className="section-title">{t('projects_title')}</h2>
        <p className="section-sub">{t('projects_sub')}</p>

        <div className={styles.grid}>
          {PROJECTS.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              lang={lang}
              t={t}
              onOpen={setActive}
            />
          ))}
        </div>
      </div>

      {active && (
        <Modal project={active} lang={lang} t={t} onClose={() => setActive(null)} />
      )}
    </section>
  );
}