import { useEffect, useRef, useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { PROJECTS } from '../data/content';
import { GithubIcon, ArrowRightIcon, ArrowUpRightIcon } from './icons.jsx';
import styles from './Projects.module.css';

function ProjectCard({ project, lang, t, onOpen }) {
  const ref = useFadeIn(0);
  const titleId = `project-${project.id}`;
  return (
    <article ref={ref} className={`${styles.card} fade-in`} aria-labelledby={titleId}>
      <ul className={styles.tags}>
        {project.tags.map((tag) => <li key={tag} className={styles.tag}>{tag}</li>)}
      </ul>
      <div className={styles.cardBody}>
        <h3 id={titleId} className={styles.cardTitle}>{project[`title_${lang}`]}</h3>
        <p className={styles.cardDesc}>{project[`desc_${lang}`]}</p>
      </div>
      <div className={styles.cardFooter}>
        <button type="button" className="btn btn-secondary btn-sm btn-block" onClick={(e) => onOpen(project, e.currentTarget)}>
          {t('btn_details')} <span className="nudge-right"><ArrowRightIcon /></span>
        </button>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
          aria-label={`${t('btn_github_aria')}: ${project[`title_${lang}`]}`}
        >
          <GithubIcon size={16} /> {t('btn_github')}
        </a>
      </div>
    </article>
  );
}

function Modal({ project, lang, t, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      // Mantener el foco dentro del modal
      const focusables = dialogRef.current.querySelectorAll('a[href], button:not([disabled])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button ref={closeRef} type="button" className={styles.closeBtn} onClick={onClose} aria-label={t('btn_close')}>✕</button>
        <ul className={styles.tags}>
          {project.tags.map((tag) => <li key={tag} className={styles.tag}>{tag}</li>)}
        </ul>
        <h2 id="modal-title" className={styles.modalTitle}>{project[`title_${lang}`]}</h2>
        <p className={styles.modalDesc}>{project[`long_${lang}`]}</p>
        <h3 className={styles.featuresTitle}>{t('modal_features')}</h3>
        <ul className={styles.featuresList}>
          {project[`features_${lang}`].map((f) => (
            <li key={f} className={styles.featureItem}>{f}</li>
          ))}
        </ul>
        <div className={styles.modalActions}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm btn-block">
            <GithubIcon size={16} /> {t('btn_github_view')} <span className="nudge-up-right"><ArrowUpRightIcon /></span>
          </a>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>{t('btn_close')}</button>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ t, lang }) {
  const [active, setActive] = useState(null);
  const triggerRef = useRef(null);

  const open = (project, trigger) => {
    triggerRef.current = trigger;
    setActive(project);
  };
  const closeRef = useRef(() => {
    setActive(null);
    // Devolver el foco al botón que abrió el modal
    requestAnimationFrame(() => triggerRef.current?.focus());
  });

  return (
    <section id="projects">
      <div className="section-wrapper">
        <p className="section-label">{t('projects_label')}</p>
        <h2 className="section-title">{t('projects_title')}</h2>
        <p className="section-sub">{t('projects_sub')}</p>

        <div className={styles.grid}>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} lang={lang} t={t} onOpen={open} />
          ))}
        </div>
      </div>

      {active && <Modal project={active} lang={lang} t={t} onClose={closeRef.current} />}
    </section>
  );
}
