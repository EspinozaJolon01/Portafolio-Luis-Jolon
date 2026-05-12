import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href: '#about',    key: 'nav_about' },
    { href: '#skills',   key: 'nav_skills' },
    { href: '#projects', key: 'nav_projects' },
    { href: '#contact',  key: 'nav_contact' },
  ];

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <span className={styles.logoStar}>✦</span>
        <span className={styles.logoText}>JL</span>
      </div>

      <ul className={styles.links}>
        {links.map(l => (
          <li key={l.key}>
            <a href={l.href} className={styles.link}>{t(l.key)}</a>
          </li>
        ))}
      </ul>

      <div className={styles.langToggle}>
        <button
          className={`${styles.langBtn} ${lang === 'en' ? styles.active : ''}`}
          onClick={() => setLang('en')}
        >EN</button>
        <button
          className={`${styles.langBtn} ${lang === 'es' ? styles.active : ''}`}
          onClick={() => setLang('es')}
        >ES</button>
      </div>
    </nav>
  );
}