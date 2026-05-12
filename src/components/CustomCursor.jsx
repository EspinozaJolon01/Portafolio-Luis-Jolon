import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const starRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const star = starRef.current;
    const glow = glowRef.current;
    let gx = 0, gy = 0;

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;
      star.style.left = x + 'px';
      star.style.top = y + 'px';
      gx += (x - gx) * 0.16;
      gy += (y - gy) * 0.16;
    };

    let raf;
    const lerp = () => {
      glow.style.left = gx + 'px';
      glow.style.top = gy + 'px';
      raf = requestAnimationFrame(lerp);
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(lerp);

    const grow = () => { star.style.transform = 'translate(-50%,-50%) scale(1.25) rotate(18deg)'; glow.style.transform = 'translate(-50%,-50%) scale(1.6) rotate(18deg)'; };
    const shrink = () => { star.style.transform = 'translate(-50%,-50%) scale(1) rotate(18deg)'; glow.style.transform = 'translate(-50%,-50%) scale(1) rotate(18deg)'; };
    document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink); });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className={styles.glow} />
      <div ref={starRef} className={styles.star} />
    </>
  );
}