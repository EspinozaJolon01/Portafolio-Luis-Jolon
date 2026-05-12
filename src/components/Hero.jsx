import { useFadeIn } from '../hooks/useFadeIn';
import styles from './Hero.module.css';
import profilePhoto from '../img/Foto.png';

const GithubIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
  </svg>
);

export default function Hero({ t }) {
  const textRef = useFadeIn(0);
  const photoRef = useFadeIn(0.2);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.content}>
        <div ref={textRef} className={`${styles.text} fade-in`}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            {t('hero_badge')}
          </div>

          <h1 className={styles.name}>
            <span className={styles.nameLine1}>{t('hero_name1')}</span>
            <br />
            <span className={styles.nameLine2}>{t('hero_name2')}</span>
          </h1>

          <p className={styles.role}>
            <span className={styles.roleArrow}>&gt;</span>
            {t('hero_role')}
          </p>

          <p className={styles.desc}>{t('hero_desc')}</p>

          <div className={styles.cta}>
            <a href="#projects" className={styles.btnPrimary}>
              ↓ {t('hero_cta1')}
            </a>
            <a href="#contact" className={styles.btnGhost}>
              {t('hero_cta2')}
            </a>
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnGhost}
            >
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>

        <div ref={photoRef} className={`${styles.photoWrap} fade-in`}>
          <div className={styles.glow} />
          <div className={styles.orbit1} />
          <div className={styles.orbit2} />
          <div className={styles.frame}>
            <img src={profilePhoto} alt="perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Orbiting dot */}
          <div className={styles.orbitDot} />
        </div>
      </div>

      <a href="#about" className={styles.scrollHint} aria-label="Scroll down">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
        <span>{t('scroll_hint')}</span>
      </a>
    </section>
  );
}