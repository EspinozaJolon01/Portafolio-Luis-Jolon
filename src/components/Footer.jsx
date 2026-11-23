import { PROFILE } from '../data/content';
import styles from './Footer.module.css';

export default function Footer({ t }) {
  return (
    <footer className={styles.footer}>
      <p className={styles.motto}>{t('footer_motto')}</p>
      <p className={styles.meta}>© {new Date().getFullYear()} {PROFILE.shortName}</p>
    </footer>
  );
}
