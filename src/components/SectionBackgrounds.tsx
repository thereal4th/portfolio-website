'use client';

import { useEffect, useState } from 'react';

export default function SectionBackgrounds({ isDark }: { isDark: boolean }) {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    // Generate leaves for light mode
    const generatedLeaves = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 40 + 40,
      delay: Math.random() * 20,
      duration: Math.random() * 15 + 15, // 15s to 30s fall
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 360,
      image: '/assets/leaves/maple-leaf.png',
    }));
    setLeaves(generatedLeaves);

    // Generate stars for dark mode
    const generatedStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Light Mode: Spring Leaves */}
      <div style={{ opacity: isDark ? 0 : 1, transition: 'opacity 1.5s ease-in-out' }}>
        {leaves.map((leaf) => (
          <div
            key={`leaf-${leaf.id}`}
            className="falling-leaf"
            style={{
              position: 'absolute',
              left: `${leaf.left}%`,
              top: '-10%',
              opacity: 0,
              width: `${leaf.size}px`,
              height: `${leaf.size}px`,
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${leaf.duration * 2}s`,
              '--rotate-start': `${leaf.rotateStart}deg`,
              '--rotate-end': `${leaf.rotateEnd}deg`,
            } as React.CSSProperties}
          >
            <img
              src={leaf.image}
              alt="Spring leaf"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: 0.85,
              }}
            />
          </div>
        ))}
      </div>

      {/* Dark Mode: Twinkling Stars */}
      <div style={{ opacity: isDark ? 1 : 0, transition: 'opacity 1.5s ease-in-out' }}>
        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="twinkling-star"
            style={{
              position: 'absolute',
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: '#fff',
              borderRadius: '50%',
              boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.4)',
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
