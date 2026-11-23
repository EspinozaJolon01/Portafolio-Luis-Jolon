import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"]';

export default function CustomCursor() {
  const starRef = useRef(null);
  const glowRef = useRef(null);
  // Solo en dispositivos con mouse; en táctil se usa el cursor normal.
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  useEffect(() => {
    if (!enabled) return;
    const star = starRef.current;
    const glow = glowRef.current;
    const root = document.documentElement;
    root.classList.add('custom-cursor');

    let x = -100, y = -100, gx = -100, gy = -100;
    let raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.classList.remove(styles.hidden);
      glow.classList.remove(styles.hidden);
    };
    const onOver = (e) => {
      const active = !!e.target.closest?.(INTERACTIVE);
      star.classList.toggle(styles.active, active);
      glow.classList.toggle(styles.active, active);
    };
    const onLeave = () => {
      star.classList.add(styles.hidden);
      glow.classList.add(styles.hidden);
    };
    const follow = () => {
      gx += (x - gx) * 0.16;
      gy += (y - gy) * 0.16;
      glow.style.left = `${gx}px`;
      glow.style.top = `${gy}px`;
      raf = requestAnimationFrame(follow);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(follow);

    return () => {
      root.classList.remove('custom-cursor');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={glowRef} className={`${styles.glow} ${styles.hidden}`} aria-hidden="true" />
      <div ref={starRef} className={`${styles.star} ${styles.hidden}`} aria-hidden="true" />
    </>
  );
}
