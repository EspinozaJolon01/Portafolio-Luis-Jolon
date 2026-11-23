import { useFadeIn } from '../hooks/useFadeIn';
import { PROFILE } from '../data/content';
import { GithubIcon, ArrowUpRightIcon } from './icons.jsx';
import styles from './Contact.module.css';

export default function Contact({ t }) {
  const headRef = useFadeIn(0);
  const linksRef = useFadeIn(0.15);

  const links = [
    {
      href: `mailto:${PROFILE.email}`,
      label: t('contact_email_lbl'),
      value: PROFILE.email,
      icon: <span aria-hidden="true">✉</span>,
      external: false,
    },
    {
      href: PROFILE.linkedin,
      label: 'LinkedIn',
      value: PROFILE.linkedinLabel,
      icon: <span className={styles.iconIn} aria-hidden="true">in</span>,
      external: true,
    },
    {
      href: PROFILE.github,
      label: 'GitHub',
      value: PROFILE.githubLabel,
      icon: <GithubIcon size={18} />,
      external: true,
    },
  ];

  return (
    <section id="contact">
      <div className="section-wrapper">
        <div ref={headRef} className="fade-in">
          <p className="section-label">{t('contact_label')}</p>
          <h2 className="section-title">{t('contact_title')}</h2>
          <p className={styles.desc}>{t('contact_desc')}</p>
        </div>

        <ul ref={linksRef} className={`${styles.links} fade-in`}>
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={styles.link}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className={styles.linkIcon}>{l.icon}</span>
                <span className={styles.linkText}>
                  <span className={styles.linkLabel}>{l.label}</span>
                  <span className={styles.linkVal}>{l.value}</span>
                </span>
                <span className={styles.linkArrow}><ArrowUpRightIcon /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
