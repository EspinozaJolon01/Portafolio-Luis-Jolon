import { useFadeIn } from '../hooks/useFadeIn';
import styles from './Contact.module.css';

const GhIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
  </svg>
);

export default function Contact({ t }) {
  const leftRef = useFadeIn(0);
  const rightRef = useFadeIn(0.15);

  return (
    <section id="contact">
      <div className={`section-wrapper ${styles.grid}`}>
        {/* LEFT */}
        <div ref={leftRef} className="fade-in">
          <div className="section-label">{t('contact_label')}</div>
          <h2 className="section-title">{t('contact_title')}</h2>
          <p className={styles.desc}>{t('contact_desc')}</p>

          <div className={styles.links}>
            <a href={`mailto:${t('contact_email_val')}`} className={styles.link}>
              <div className={styles.linkIcon}>✉</div>
              <div>
                <div className={styles.linkLabel}>{t('contact_email_lbl')}</div>
                <div className={styles.linkVal}>{t('contact_email_val')}</div>
              </div>
            </a>
            <a
              href={t('contact_li_val')}
              target="_blank" rel="noopener noreferrer"
              className={styles.link}
            >
              <div className={styles.linkIcon} style={{fontFamily:'Georgia',fontWeight:'bold'}}>in</div>
              <div>
                <div className={styles.linkLabel}>LinkedIn</div>
                <div className={styles.linkVal}>linkedin.com/in/jluis-jolón</div>
              </div>
            </a>
            <a
              href={t('contact_gh_val')}
              target="_blank" rel="noopener noreferrer"
              className={styles.link}
            >
              <div className={styles.linkIcon}><GhIcon /></div>
              <div>
                <div className={styles.linkLabel}>GitHub</div>
                <div className={styles.linkVal}>github.com/EspinozaJolon01</div>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div ref={rightRef} className="fade-in">
          <h3 className={styles.formTitle}>{t('contact_form_title')}</h3>
          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <div className={styles.field}>
              <label className={styles.label}>{t('form_name')}</label>
              <input type="text" className={styles.input} placeholder="..." />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{t('form_email')}</label>
              <input type="email" className={styles.input} placeholder="you@example.com" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{t('form_msg')}</label>
              <textarea className={styles.textarea} rows={5} placeholder="..." />
            </div>
            <button type="submit" className={styles.submit}>{t('form_send')}</button>
          </form>
        </div>
      </div>
    </section>
  );
}