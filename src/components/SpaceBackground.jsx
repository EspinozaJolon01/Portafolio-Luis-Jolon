import { useEffect, useRef } from 'react';
import styles from './SpaceBackground.module.css';
import backgroundImage from '../img/luna1.jpeg';

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let shootingStars = [];
    let lastShoot = 0;
    const bg = new Image();
    bg.src = backgroundImage;
    let bgReady = false;
    bg.onload = () => {
      bgReady = true;
    };

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function spawnShootingStar() {
      const side = Math.random();
      let x, y, angle;
      if (side < 0.5) {
        x = Math.random() * canvas.width * 0.6;
        y = Math.random() * canvas.height * 0.4;
        angle = (Math.random() * 30 + 15) * Math.PI / 180;
      } else {
        x = canvas.width * 0.4 + Math.random() * canvas.width * 0.6;
        y = Math.random() * canvas.height * 0.4;
        angle = (Math.random() * 30 + 150) * Math.PI / 180;
      }
      shootingStars.push({
        x, y, angle,
        speed: Math.random() * 14 + 10,
        length: Math.random() * 180 + 120,
        opacity: 1,
        trail: [],
        maxTrail: Math.floor(Math.random() * 14 + 10),
        alive: true,
      });
    }

    function draw(timestamp) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (bgReady) {
        const scale = Math.max(canvas.width / bg.width, canvas.height / bg.height);
        const drawWidth = bg.width * scale;
        const drawHeight = bg.height * scale;
        const drawX = (canvas.width - drawWidth) / 2;
        const drawY = (canvas.height - drawHeight) / 2;

        ctx.drawImage(bg, drawX, drawY, drawWidth, drawHeight);
        const overlay = ctx.createLinearGradient(0, 0, 0, canvas.height);
        overlay.addColorStop(0, 'rgba(13, 13, 13, 0.42)');
        overlay.addColorStop(0.55, 'rgba(13, 13, 13, 0.58)');
        overlay.addColorStop(1, 'rgba(13, 13, 13, 0.76)');
        ctx.fillStyle = overlay;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGrad.addColorStop(0, '#17120f');
        bgGrad.addColorStop(0.45, '#0d0d0d');
        bgGrad.addColorStop(1, '#090909');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Shooting stars
      if (timestamp - lastShoot > (Math.random() * 3000 + 2500)) {
        spawnShootingStar();
        lastShoot = timestamp;
      }

      shootingStars = shootingStars.filter(ss => {
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.trail.unshift({ x: ss.x, y: ss.y });
        if (ss.trail.length > ss.maxTrail) ss.trail.pop();

        for (let i = 0; i < ss.trail.length - 1; i++) {
          const frac = 1 - i / ss.trail.length;
          ctx.beginPath();
          ctx.moveTo(ss.trail[i].x, ss.trail[i].y);
          ctx.lineTo(ss.trail[i + 1].x, ss.trail[i + 1].y);
          ctx.strokeStyle = `rgba(180,230,255,${frac * 0.9})`;
          ctx.lineWidth = frac * 2.2;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Head glow
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220,245,255,0.95)';
        ctx.fill();

        return ss.x > -100 && ss.x < canvas.width + 100
          && ss.y > -100 && ss.y < canvas.height + 100
          && ss.trail.length < ss.maxTrail * 3;
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    animId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}