import { useState } from 'react';
import { Lock, Star, CheckCircle, Sparkles } from 'lucide-react';

const GalaxyPath = () => {
    // Mock Data for Planets (Subjects/Modules)
    const planets = [
        { id: 1, name: 'Quantum Physics', status: 'completed', x: 20, y: 70, color: 'var(--neon-pink)', size: 60 },
        { id: 2, name: 'Advanced Calculus', status: 'active', x: 50, y: 50, color: 'var(--accent)', size: 90 },
        { id: 3, name: 'Neural Networks', status: 'locked', x: 80, y: 30, color: 'var(--primary)', size: 70 },
    ];

    // Generate Background Stars efficiently
    const [stars] = useState(() => [...Array(30)].map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: Math.random() * 2 + 'px',
        height: Math.random() * 2 + 'px',
        opacity: Math.random(),
        animationDelay: `${Math.random() * 5}s`
    })));

    return (
        <div className="card" style={{
            height: '400px', position: 'relative', overflow: 'hidden',
            background: 'radial-gradient(ellipse at center, #0B0B15 0%, #000000 100%)',
            border: '1px solid var(--primary-glow)',
            boxShadow: '0 0 20px rgba(109, 40, 217, 0.2)'
        }}>
            {/* Background Stars */}
            {stars.map((star) => (
                <div key={star.id} className="star" style={{
                    top: star.top, left: star.left,
                    width: star.width, height: star.height,
                    opacity: star.opacity,
                    animationDelay: star.animationDelay
                }} />
            ))}

            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Sparkles size={18} color="var(--accent)" /> My Universe
                </h3>
            </div>

            {/* Connecting Lines (Orbit Paths) */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <path d="M 100 280 Q 300 200 500 120" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            </svg>

            {/* Planets */}
            {planets.map((planet) => (
                <div key={planet.id} className="animate-float" style={{
                    position: 'absolute',
                    left: `${planet.x}%`, top: `${planet.y}%`,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    cursor: 'pointer', zIndex: 5,
                    animationDelay: `${planet.id * -1.5}s`
                }}>
                    <div style={{
                        width: `${planet.size}px`, height: `${planet.size}px`,
                        borderRadius: '50%',
                        background: `radial-gradient(circle at 30% 30%, ${planet.color}, #000)`,
                        boxShadow: planet.status === 'active' ? `0 0 30px ${planet.color}` : `0 0 10px ${planet.color}`,
                        position: 'relative',
                        border: planet.status === 'active' ? '2px solid white' : `1px solid rgba(255,255,255,0.2)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.3s ease'
                    }}
                        className="hover:scale-110"
                    >
                        {planet.status === 'completed' && <CheckCircle color="white" size={24} />}
                        {planet.status === 'locked' && <Lock color="rgba(255,255,255,0.5)" size={24} />}
                        {planet.status === 'active' && <Star color="white" fill="white" size={28} className="animate-pulse" />}

                        {/* Rings for active planet */}
                        {planet.status === 'active' && (
                            <div className="absolute inset-0 border border-white/30 rounded-full animate-[spin_10s_linear_infinite]" style={{ width: '140%', height: '140%', left: '-20%', top: '-20%', pointerEvents: 'none' }} />
                        )}
                    </div>
                    <div style={{
                        marginTop: '12px', textAlign: 'center',
                        background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '12px',
                        border: '1px solid var(--glass-border)',
                        backdropFilter: 'blur(4px)'
                    }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>{planet.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GalaxyPath;
