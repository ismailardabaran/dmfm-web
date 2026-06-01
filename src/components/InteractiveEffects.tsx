'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Note {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number; // Note's stable horizontal base velocity
  baseVy: number; // Note's stable vertical base velocity
  text: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
}

export const InteractiveEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -2000, y: -2000, active: false });
  const scrollYRef = useRef(0);
  const spawnYRef = useRef(3000);
  const { language } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let gravityX = 0;
    let gravityY = 0;

    // Cache the footer offset (spawnY) safely
    const updateSpawnY = () => {
      const footer = document.querySelector('footer');
      spawnYRef.current = footer ? footer.offsetTop : document.documentElement.scrollHeight - 100;
    };
    updateSpawnY();

    // Viewport resizing with dynamic note count update
    const getTargetCount = () => (window.innerWidth < 768 ? 40 : 95);
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      updateSpawnY();

      // Dynamic adjustment of notes count during resize
      const targetCount = getTargetCount();
      if (notes.length < targetCount) {
        while (notes.length < targetCount) {
          notes.push(createNote(false));
        }
      } else if (notes.length > targetCount) {
        notes.length = targetCount;
      }
    };
    window.addEventListener('resize', handleResize);

    // Track scroll position passively
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Track mouse page-relative position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.pageX;
      mouseRef.current.y = e.pageY;
      mouseRef.current.active = true;
      
      const glowEl = glowRef.current;
      if (glowEl) {
        glowEl.style.setProperty('--mouse-x', `${e.clientX}px`);
        glowEl.style.setProperty('--mouse-y', `${e.clientY}px`);
        glowEl.style.setProperty('--mouse-opacity', '1');
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -2000;
      mouseRef.current.y = -2000;
      
      const glowEl = glowRef.current;
      if (glowEl) {
        glowEl.style.setProperty('--mouse-opacity', '0');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Mobile touch interaction mapping (page-relative touch targets)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      mouseRef.current.x = e.touches[0].pageX;
      mouseRef.current.y = e.touches[0].pageY;
      mouseRef.current.active = true;
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -2000;
      mouseRef.current.y = -2000;
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    // Gyroscope orientation tilt tracking (copied exactly from FilaMental)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        gravityX = Math.max(-0.5, Math.min(0.5, (e.gamma / 45) * 0.3));
        gravityY = Math.max(-0.5, Math.min(0.5, ((e.beta - 45) / 45) * 0.3));
      }
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    // Generate initial music notes
    const noteSymbols = ['♩', '♪', '♫', '♬', '♭', '♮', '♯', '🎵', '🎶'];
    const notes: Note[] = [];
    const notesCount = getTargetCount();

    const createNote = (atSpawnLine = false): Note => {
      const currentSpawnY = spawnYRef.current;
      // EXACT FilaMental base velocities:
      // speedY: -(Math.random() * 0.4 + 0.1) -> upward float
      // speedX: Math.random() * 0.2 - 0.1 -> horizontal drift
      const baseVx = Math.random() * 0.2 - 0.1;
      const baseVy = -(Math.random() * 0.4 + 0.1);
      return {
        x: Math.random() * width,
        y: atSpawnLine ? currentSpawnY + Math.random() * 20 : Math.random() * currentSpawnY,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        text: noteSymbols[Math.floor(Math.random() * noteSymbols.length)],
        fontSize: Math.floor(Math.random() * 12) + 16, // Size 16px to 28px
        opacity: Math.random() * 0.22 + 0.08,
        rotation: Math.random() * Math.PI * 2,
        // EXACT FilaMental spin speed calculation:
        // spinSpeed: (Math.random() * 0.01 + 0.002) * (Math.random() > 0.5 ? 1 : -1)
        rotSpeed: (Math.random() * 0.01 + 0.002) * (Math.random() > 0.5 ? 1 : -1)
      };
    };

    // Initialize distributed notes
    for (let i = 0; i < notesCount; i++) {
      notes.push(createNote(false));
    }

    // Animation Loop (Identical working principles as FilaMental)
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mActive = mouseRef.current.active;
      const sy = scrollYRef.current;

      // Update and Draw Music Notes
      notes.forEach((note) => {
        // 1. Update position (antigravity drift + gyroscope tilt response) - EXACTLY as FilaMental
        note.y += note.vy + gravityY;
        note.x += note.vx + gravityX;
        note.rotation += note.rotSpeed;

        // 2. Mouse Repulsion Physics - EXACTLY as FilaMental (Optimized with squared distance check)
        if (mActive) {
          const mdx = note.x - mx;
          const mdy = note.y - my;
          const distSq = mdx * mdx + mdy * mdy;
          const forceRadius = 140;
          const forceRadiusSq = forceRadius * forceRadius;

          // Only perform square root if particle is within the force radius
          if (distSq < forceRadiusSq) {
            const mDist = Math.sqrt(distSq);
            const force = (forceRadius - mDist) / forceRadius;
            const pushX = (mdx / (mDist || 1)) * force * 1.5;
            const pushY = (mdy / (mDist || 1)) * force * 1.5;

            note.x += pushX;
            note.y += pushY;
          }
        }

        // 3. Boundary wrap: if note floats past the top of the entire document page (y = 0)
        if (note.y < -30) {
          Object.assign(note, createNote(true));
        }

        // Wrap around horizontally
        if (note.x < -30) {
          note.x = width + 20;
        } else if (note.x > width + 30) {
          note.x = -20;
        }

        // 4. Render viewport-relative notes (Orijinal görsel stil korunmuştur)
        const screenY = note.y - sy;
        
        if (screenY >= -30 && screenY <= height + 30 && note.x >= -30 && note.x <= width + 30) {
          ctx.save();
          ctx.translate(note.x, screenY);
          ctx.rotate(note.rotation);
          ctx.font = `bold ${note.fontSize}px Geist, sans-serif`;
          ctx.fillStyle = `rgba(245, 57, 0, ${note.opacity})`;
          ctx.fillText(note.text, 0, 0);
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [language]);

  // Premium, soft Scroll Reveal intersection observer with staggered entry delay
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerOptions = {
      threshold: 0.02,
      // Trigger when the element is 50px above the bottom viewport edge for a more noticeable, soft entrance
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      // Find all entries intersecting now and not already revealed
      const intersecting = entries.filter((entry) => entry.isIntersecting);

      intersecting.forEach((entry, index) => {
        const target = entry.target as HTMLElement;
        
        // Dynamic staggered delay (80ms gap) only between elements entering simultaneously
        const staggerDelay = index * 80;
        
        setTimeout(() => {
          target.classList.add('revealed');
        }, staggerDelay);
        
        // Stop observing once the fade-in animation triggers
        observer.unobserve(target);
      });
    }, observerOptions);

    // Collect and observe all elements carrying the scroll-reveal signature class
    const observeElements = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          observer.observe(el);
        }
      });
    };

    // Initial setup
    observeElements();

    // MutationObserver monitors for dynamically injected or filtered markup
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [language]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div
        ref={glowRef}
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ease-out"
        style={{
          background: 'radial-gradient(circle 320px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(245, 57, 0, 0.05), rgba(255, 224, 214, 0.02), transparent 80%)',
          opacity: 'var(--mouse-opacity, 0)',
        }}
      />
    </>
  );
};
