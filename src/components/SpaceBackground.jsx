import { useEffect, useRef } from 'react';
import styles from './SpaceBackground.module.css';
import moonPhoto from '../img/luna1.jpeg';

// Colores de estrellas reales: azul-blanco, blanco, y algunas cálidas.
const STAR_TINTS = ['220,235,255', '237,244,255', '200,220,255', '255,240,215'];

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0, height = 0, dpr = 1;
    let stars = [];
    let shootingStars = [];
    let nextShoot = 0;
    let animId;

    function buildStars() {
      const count = Math.min(420, Math.round((width * height) / 4200));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: depth * 1.1 + 0.25,
          alpha: depth * 0.6 + 0.25,
          twinkleSpeed: Math.random() * 0.0025 + 0.0006,
          twinklePhase: Math.random() * Math.PI * 2,
          parallax: depth * 0.06 + 0.01,
          tint: STAR_TINTS[Math.random() < 0.12 ? 3 : Math.floor(Math.random() * 3)],
        };
      });
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
      if (reduceMotion) draw(0);
    }

    function spawnShootingStar() {
      const fromLeft = Math.random() < 0.5;
      const x = fromLeft ? Math.random() * width * 0.6 : width * 0.4 + Math.random() * width * 0.6;
      const y = Math.random() * height * 0.4;
      const deg = fromLeft ? Math.random() * 30 + 15 : Math.random() * 30 + 135;
      shootingStars.push({
        x, y,
        angle: (deg * Math.PI) / 180,
        speed: Math.random() * 10 + 9,
        trail: [],
        maxTrail: Math.floor(Math.random() * 14 + 10),
        life: 0,
      });
    }

    function drawStars(time) {
      const scroll = window.scrollY;
      for (const s of stars) {
        const twinkle = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        let y = (s.y - scroll * s.parallax) % height;
        if (y < 0) y += height;
        ctx.fillStyle = `rgba(${s.tint},${s.alpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawShootingStars() {
      shootingStars = shootingStars.filter((ss) => {
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.life++;
        ss.trail.unshift({ x: ss.x, y: ss.y });
        if (ss.trail.length > ss.maxTrail) ss.trail.pop();

        ctx.lineCap = 'round';
        for (let i = 0; i < ss.trail.length - 1; i++) {
          const frac = 1 - i / ss.trail.length;
          ctx.beginPath();
          ctx.moveTo(ss.trail[i].x, ss.trail[i].y);
          ctx.lineTo(ss.trail[i + 1].x, ss.trail[i + 1].y);
          ctx.strokeStyle = `rgba(180,230,255,${frac * 0.85})`;
          ctx.lineWidth = frac * 2;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220,245,255,0.95)';
        ctx.fill();

        return ss.life < 120 && ss.x > -100 && ss.x < width + 100 && ss.y > -100 && ss.y < height + 100;
      });
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);
      drawStars(time);
      if (reduceMotion) return;

      if (time > nextShoot) {
        spawnShootingStar();
        nextShoot = time + Math.random() * 4000 + 3500;
      }
      drawShootingStars();
      animId = requestAnimationFrame(draw);
    }

    resize();
    if (!reduceMotion) animId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={styles.sky} aria-hidden="true">
      <div className={styles.photo} style={{ backgroundImage: `url(${moonPhoto})` }} />
      <div className={styles.veil} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
