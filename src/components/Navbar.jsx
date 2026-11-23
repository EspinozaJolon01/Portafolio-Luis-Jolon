import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const LINKS = [
  { id: 'about', key: 'nav_about' },
  { id: 'skills', key: 'nav_skills' },
  { id: 'projects', key: 'nav_projects' },
  { id: 'contact', key: 'nav_contact' },
];

export default function Navbar({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Resalta la sección que está en pantalla
  useEffect(() => {
    const sections = ['home', ...LINKS.map((l) => l.id)].map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setCurrent(e.target.id); });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Cerrar el menú móvil con Escape o al agrandar la pantalla
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const mq = window.matchMedia('(min-width: 769px)');
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  return (
    <header className={`${styles.nav} ${scrolled || open ? styles.scrolled : ''}`}>
      <a href="#home" className={styles.logo} onClick={() => setOpen(false)}>
        <span className={styles.logoStar} aria-hidden="true">✦</span>
        <span className={styles.logoText}>JL</span>
        <span className="visually-hidden">Luis Jolón</span>
      </a>

      <nav aria-label={t('nav_aria')}>
        <ul id="nav-links" className={`${styles.links} ${open ? styles.open : ''}`}>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`${styles.link} ${current === l.id ? styles.current : ''}`}
                aria-current={current === l.id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.right}>
        <div className={styles.langToggle} role="group" aria-label={t('nav_lang')}>
          {['es', 'en'].map((code) => (
            <button
              key={code}
              type="button"
              className={`${styles.langBtn} ${lang === code ? styles.active : ''}`}
              aria-pressed={lang === code}
              onClick={() => setLang(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.menuBtn} ${open ? styles.menuOpen : ''}`}
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? t('nav_menu_close') : t('nav_menu_open')}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  );
}
