import { useFadeIn } from '../hooks/useFadeIn';
import styles from './About.module.css';

export default function About({ t }) {
  const leftRef = useFadeIn(0);
  const rightRef = useFadeIn(0.15);

  const stats = [
    { num: '10', key: 'stat_semester' },
    { num: 'X+', key: 'stat_projects' },
    { num: '3',  key: 'stat_areas'    },
    { num: 'GT', key: 'stat_location' },
  ];

  return (
    <section id="about">
      <div className={`section-wrapper ${styles.grid}`}>
        {/* LEFT: terminal card + stats */}
        <div ref={leftRef} className="fade-in">
          <div className={styles.terminal}>
            <div className={styles.termBar}>
              <span className={`${styles.dot} ${styles.r}`} />
              <span className={`${styles.dot} ${styles.y}`} />
              <span className={`${styles.dot} ${styles.g}`} />
              <span className={styles.termTitle}>profile.json</span>
            </div>
            <div className={styles.termBody}>
              <div className={styles.line}><span className={styles.comment}>// Edit in src/data/content.js</span></div>
              <div className={styles.line}><span className={styles.key}>"name"</span><span className={styles.colon}>: </span><span className={styles.val}>"José Luis Espinoza Jolón"</span><span className={styles.punct}>,</span></div>
              <div className={styles.line}><span className={styles.key}>"university"</span><span className={styles.colon}>: </span><span className={styles.val}>"Universidad De San Carlos"</span><span className={styles.punct}>,</span></div>
              <div className={styles.line}><span className={styles.key}>"semester"</span><span className={styles.colon}>: </span><span className={styles.num}>10</span><span className={styles.punct}>,</span></div>
              <div className={styles.line}><span className={styles.key}>"interests"</span><span className={styles.colon}>: </span><span className={styles.punct}>[</span></div>
              <div className={`${styles.line} ${styles.indent}`}><span className={styles.val}>"Cloud & DevOps"</span><span className={styles.punct}>,</span></div>
              <div className={`${styles.line} ${styles.indent}`}><span className={styles.val}>"Networking & Infrastructure"</span><span className={styles.punct}>,</span></div>
              <div className={`${styles.line} ${styles.indent}`}><span className={styles.val}>"Cybersecurity"</span></div>
              <div className={styles.line}><span className={styles.punct}>],</span></div>
              <div className={styles.line}><span className={styles.key}>"status"</span><span className={styles.colon}>: </span><span className={styles.val}>"Open to opportunities"</span></div>
              <div className={styles.cursor} />
            </div>
          </div>

          <div className={styles.statsGrid}>
            {stats.map(s => (
              <div key={s.key} className={styles.statCard}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{t(s.key)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: text */}
        <div ref={rightRef} className="fade-in">
          <div className="section-label">{t('about_label')}</div>
          <h2 className="section-title">{t('about_title')}</h2>
          <p className={styles.para}>{t('about_p1')}</p>
          <p className={styles.para}>{t('about_p2')}</p>
          <p className={styles.para}>{t('about_p3')}</p>

          <div className={styles.focusTags}>
            {['Cybersecurity', 'Networking & Infrastructure', 'Cloud & DevOps', 'Databases', 'Linux'].map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}