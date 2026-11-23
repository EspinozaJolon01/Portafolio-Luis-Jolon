import { useFadeIn } from '../hooks/useFadeIn';
import { PROFILE, PROJECTS } from '../data/content';
import styles from './About.module.css';

export default function About({ t }) {
  const leftRef = useFadeIn(0);
  const rightRef = useFadeIn(0.15);
  const interests = t('about_interests');

  const stats = [
    { num: String(PROFILE.semester), key: 'stat_semester' },
    { num: String(PROJECTS.length), key: 'stat_projects' },
    { num: String(interests.length), key: 'stat_areas' },
    { num: 'GT', key: 'stat_location' },
  ];

  return (
    <section id="about">
      <div className={`section-wrapper ${styles.grid}`}>
        <div ref={leftRef} className="fade-in">
          <div className={styles.terminal} aria-label="profile.json">
            <div className={styles.termBar} aria-hidden="true">
              <span className={`${styles.dot} ${styles.r}`} />
              <span className={`${styles.dot} ${styles.y}`} />
              <span className={`${styles.dot} ${styles.g}`} />
              <span className={styles.termTitle}>profile.json</span>
            </div>
            <pre className={styles.termBody}>
              <span className={styles.comment}>{t('about_card_comment')}</span>{'\n'}
              <span className={styles.punct}>{'{'}</span>{'\n'}
              {'  '}<span className={styles.key}>"name"</span><span className={styles.punct}>: </span><span className={styles.val}>"{PROFILE.fullName}"</span><span className={styles.punct}>,</span>{'\n'}
              {'  '}<span className={styles.key}>"university"</span><span className={styles.punct}>: </span><span className={styles.val}>"Universidad de San Carlos"</span><span className={styles.punct}>,</span>{'\n'}
              {'  '}<span className={styles.key}>"semester"</span><span className={styles.punct}>: </span><span className={styles.num}>{PROFILE.semester}</span><span className={styles.punct}>,</span>{'\n'}
              {'  '}<span className={styles.key}>"interests"</span><span className={styles.punct}>: [</span>{'\n'}
              {interests.map((item, i) => (
                <span key={item}>
                  {'    '}<span className={styles.val}>"{item}"</span>
                  {i < interests.length - 1 && <span className={styles.punct}>,</span>}{'\n'}
                </span>
              ))}
              {'  '}<span className={styles.punct}>],</span>{'\n'}
              {'  '}<span className={styles.key}>"english"</span><span className={styles.punct}>: </span><span className={styles.val}>"{t('about_english')}"</span><span className={styles.punct}>,</span>{'\n'}
              {'  '}<span className={styles.key}>"status"</span><span className={styles.punct}>: </span><span className={styles.val}>"{t('about_status')}"</span>{'\n'}
              <span className={styles.punct}>{'}'}</span><span className={styles.cursor} aria-hidden="true" />
            </pre>
          </div>

          <dl className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.key} className={styles.statCard}>
                <dt className={styles.statLabel}>{t(s.key)}</dt>
                <dd className={styles.statNum}>{s.num}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div ref={rightRef} className="fade-in">
          <p className="section-label">{t('about_label')}</p>
          <h2 className="section-title">{t('about_title')}</h2>
          <p className={styles.para}>{t('about_p1')}</p>
          <p className={styles.para}>{t('about_p2')}</p>
          <p className={styles.para}>{t('about_p3')}</p>

          <ul className={styles.focusTags}>
            {t('about_focus').map((tag) => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
