import { useMemo } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { PROFILE } from '../data/content';
import { getMoonPhase } from '../utils/moonPhase';
import { GithubIcon } from "./icons.jsx";
import styles from './Hero.module.css';
import profilePhoto from '../img/Foto.png';

function MoonToday({ t }) {
  const moon = useMemo(() => getMoonPhase(), []);
  const phaseName = t('moon_phases')[moon.index];
  const percent = Math.round(moon.illumination * 100);

  return (
    <p className={styles.moon}>
      <span className={styles.moonLabel}>{t('moon_today')}</span>
      <span className={styles.moonValue}>{phaseName}, {percent}% {t('moon_lit')}</span>
    </p>
  );
}

export default function Hero({ t }) {
  const textRef = useFadeIn(0);
  const photoRef = useFadeIn(0.2);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.content}>
        <div ref={textRef} className={`${styles.text} fade-in`}>
          <h1 className={styles.name}>
            <span className={styles.nameLine1}>{t('hero_name1')}</span>
            <span className={styles.nameLine2}>{t('hero_name2')}</span>
          </h1>

          <p className={styles.role}>
            <span className={styles.roleArrow} aria-hidden="true">&gt;</span>
            {t('hero_role')}
          </p>

          <p className={styles.desc}>{t('hero_desc')}</p>

          <div className={styles.cta}>
            <a href="#projects" className="btn btn-primary">
              {t('hero_cta1')}
            </a>
            <a href="#contact" className="btn btn-secondary">{t('hero_cta2')}</a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <GithubIcon size={18} /> GitHub
            </a>
          </div>

          <MoonToday t={t} />
        </div>

        <div ref={photoRef} className={`${styles.photoWrap} fade-in`}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.orbit1} aria-hidden="true" />
          <div className={styles.orbit2} aria-hidden="true" />
          <div className={styles.frame}>
            <img src={profilePhoto} alt={t('hero_photo_alt')} width="300" height="300" />
          </div>
          <div className={styles.orbitTrack} aria-hidden="true">
            <span className={styles.orbitDot} />
          </div>
        </div>
      </div>

      <a href="#about" className={styles.scrollHint}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
        <span>{t('scroll_hint')}</span>
      </a>
    </section>
  );
}
