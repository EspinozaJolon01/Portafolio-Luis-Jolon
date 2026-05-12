import { useFadeIn } from '../hooks/useFadeIn';
import { SKILLS } from '../data/content';
import pythonImg from '../img/python.png';
import jsImg from '../img/JS.png';
import tsImg from '../img/TS.png';
import nodeImg from '../img/node.png';
import postgresqlImg from '../img/postgresql.png';
import mysqlImg from '../img/mysql.png';
import dockerImg from '../img/docker.jpg';
import linuxImg from '../img/linux.png';
import awsImg from '../img/aws.png';
import azureImg from '../img/azure.jpg';
import gitImg from '../img/git.png';
import styles from './Skills.module.css';

export default function Skills({ t }) {
  const ref = useFadeIn(0);

  const categories = {
    languages: { label: t('skills_cat_languages') },
    databases: { label: t('skills_cat_databases') },
    cloud_devops: { label: t('skills_cat_cloud_devops') },
    tools: { label: t('skills_cat_tools') },
  };

  const skillImages = {
    'python.png': pythonImg,
    'JS.png': jsImg,
    'TS.png': tsImg,
    'node.png': nodeImg,
    'postgresql.png': postgresqlImg,
    'mysql.png': mysqlImg,
    'docker.jpg': dockerImg,
    'linux.png': linuxImg,
    'aws.png': awsImg,
    'azure.jpg': azureImg,
    'git.png': gitImg,
  };

  return (
    <section id="skills">
      <div className="section-wrapper" style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>{t('skills_label')}</div>
        <h2 className="section-title">{t('skills_title')}</h2>
        <p className="section-sub" style={{ margin: '0 auto 1rem' }}>{t('skills_sub')}</p>

        <div ref={ref} className="fade-in">
          {Object.entries(SKILLS).map(([key, skillList]) => (
            <div key={key} className={styles.category}>
              <div className={styles.categoryTitle}>
                {categories[key]?.label}
              </div>
              <div className={styles.grid}>
                {skillList.map((s, i) => (
                  <div key={s.name} className={styles.card} style={{ animationDelay: `${i * 0.06}s` }}>
                    <div className={styles.icon} style={{ backgroundColor: s.surface || s.color }}>
                      <img className={styles.iconImage} src={skillImages[s.image]} alt={s.name} loading="lazy" />
                    </div>
                    <div className={styles.name}>{s.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}