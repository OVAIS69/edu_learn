import React, { useState, useMemo, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BrainCircuit, Calculator, BookOpen, FlaskConical, Code, Gamepad2, ChevronRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

/* --- Data: The Learning Universe (Compact Radii) --- */
const learningData = [
    {
        id: 'math',
        name: 'Mathematics',
        color: 'var(--primary)', // Deep Purple
        icon: <Calculator size={20} />,
        orbitRadius: 180,
        orbitDuration: '60s',
        size: 50,
        progress: 75,
        chapters: [
            { id: 'm1', title: 'Calculus I', mastery: 80 },
            { id: 'm2', title: 'Linear Algebra', mastery: 45 },
            { id: 'm3', title: 'Statistics', mastery: 90 }
        ]
    },
    {
        id: 'science',
        name: 'Science',
        color: 'var(--neon-green)', // Emerald
        icon: <FlaskConical size={20} />,
        orbitRadius: 260,
        orbitDuration: '90s',
        size: 55,
        progress: 60,
        chapters: [
            { id: 's1', title: 'Physics II', mastery: 50 },
            { id: 's2', title: 'Organic Chem', mastery: 70 },
            { id: 's3', title: 'Quantum Mech', mastery: 10 }
        ]
    },
    {
        id: 'cs',
        name: 'Computer Science',
        color: 'var(--accent)', // Cyan
        icon: <Code size={20} />,
        orbitRadius: 220,
        orbitDuration: '40s',
        size: 60,
        progress: 90,
        chapters: [
            { id: 'c1', title: 'Data Structures', mastery: 100 },
            { id: 'c2', title: 'Algorithms', mastery: 85 },
            { id: 'c3', title: 'Web Dev', mastery: 95 }
        ]
    },
    {
        id: 'english',
        name: 'English',
        color: 'var(--neon-pink)', // Rose
        icon: <BookOpen size={20} />,
        orbitRadius: 130,
        orbitDuration: '45s',
        size: 40,
        progress: 50,
        chapters: [
            { id: 'e1', title: 'Grammar', mastery: 60 },
            { id: 'e2', title: 'Essay Writing', mastery: 40 }
        ]
    },
    {
        id: 'gamified',
        name: 'Gamification',
        color: 'var(--warning)', // Amber
        icon: <Gamepad2 size={20} />,
        orbitRadius: 340,
        orbitDuration: '120s',
        size: 45,
        progress: 30,
        chapters: [
            { id: 'g1', title: 'Game Design', mastery: 30 },
            { id: 'g2', title: 'Unity Basics', mastery: 0 }
        ]
    }
];

interface Chapter {
    id: string;
    title: string;
    mastery: number;
}

interface Planet {
    id: string;
    name: string;
    color: string;
    icon: JSX.Element;
    orbitRadius: number;
    orbitDuration: string;
    size: number;
    progress: number;
    chapters: Chapter[];
}

const GalaxyLearningMap = () => {
    const navigate = useNavigate();
    const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
    const [pressedPlanetId, setPressedPlanetId] = useState<string | null>(null);
    const [originRect, setOriginRect] = useState<DOMRect | null>(null);

    // Generate Background Stars efficiently
    const [stars] = useState(() => {
        return [...Array(100)].map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1 + 'px',
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.3
        }));
    });

    // AI Logic: Determine priorities
    const insights = useMemo(() => {
        const sorted = [...learningData].sort((a, b) => a.progress - b.progress);
        const priority = sorted[0];
        const review = sorted.find(p => p.id !== priority.id && p.progress > 50) || sorted[1];
        return { priority, review };
    }, []);

    // Helper to zoom to planet
    const handleFocus = (planet: Planet) => {
        setOriginRect(null); // HUD clicks don't zoom from a specific point
        setSelectedPlanet(planet);
    };

    const handleChapterClick = (chapter: Chapter) => {
        if (chapter.mastery === 100) return;
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6d28d9', '#06b6d4', '#10b981']
        });
    };

    return (
        <div className="galaxy-container animate-fade-in text-white" style={{ background: 'radial-gradient(ellipse at center, #0B0B15 0%, #000000 100%)' }}>
            {/* Top Bar */}
            <div className="absolute top-0 w-full glass-nav flex justify-between items-center px-6 py-4 z-50">
                <div onClick={() => navigate('/dashboard')} className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                    <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', borderRadius: '8px', fontSize: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'var(--font-pixel)', boxShadow: '0 0 15px var(--primary)' }}>E</div>
                    <span className="font-bold text-xl tracking-tight font-display">EDU<span className="text-gradient">VERSE</span></span>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="glass-panel px-4 py-2 flex items-center gap-2 text-sm font-bold border border-yellow-500/30 text-yellow-400">
                        <Sparkles size={16} /> XP Multiplier: 2.0x
                    </div>
                </div>
            </div>

            {/* Milky Way Background */}
            <div className="milky-way" style={{ opacity: 0.3 }} />

            {/* Left Sidebar: Detailed Subject Info */}
            <div className={`glass-panel absolute left-6 top-24 bottom-6 w-96 transition-transform duration-500 z-40 ${selectedPlanet ? 'translate-x-0' : '-translate-x-[150%]'}`}
                style={{ display: 'flex', flexDirection: 'column', borderLeft: `4px solid ${selectedPlanet?.color || 'transparent'}`, boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}>
                {selectedPlanet && (
                    <>
                        <div className="p-8 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                            <h2 className="text-4xl font-bold mb-2 font-display" style={{ color: selectedPlanet.color, textShadow: `0 0 20px ${selectedPlanet.color}` }}>{selectedPlanet.name}</h2>
                            <p className="text-sm text-slate-400 font-mono">Mastery Level: {selectedPlanet.progress}%</p>
                            <div className="w-full h-2 bg-slate-800 mt-4 rounded-full overflow-hidden border border-white/5">
                                <div className="h-full relative overflow-hidden" style={{ width: `${selectedPlanet.progress}%`, backgroundColor: selectedPlanet.color }}>
                                    <div className="absolute inset-0 bg-white/20 animate-[shine_2s_infinite]" />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-2"><Star size={12} /> Learning Path</h3>
                            {selectedPlanet.chapters.map((chapter: Chapter) => (
                                <div key={chapter.id} onClick={() => handleChapterClick(chapter)} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer group relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-2 relative z-10">
                                        <span className="font-bold text-lg group-hover:text-white transition-colors">{chapter.title}</span>
                                        <span className={`text-xs px-2 py-1 rounded font-mono ${chapter.mastery === 100 ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-400'}`}>{chapter.mastery}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full transition-all duration-1000" style={{ width: `${chapter.mastery}%`, background: chapter.mastery === 100 ? 'var(--neon-green)' : 'var(--primary)' }} />
                                    </div>
                                    {chapter.mastery === 100 && (
                                        <div className="absolute top-2 right-2 text-green-400 opacity-20 group-hover:opacity-100 transition-opacity">
                                            <Sparkles size={40} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="p-6 border-t border-white/10 bg-black/20">
                            <button className="btn btn-primary w-full py-4 text-lg font-bold btn-shine" onClick={() => navigate('/learn')}>
                                Continue Journey <ChevronRight className="inline ml-1" />
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* AI Recommendations */}
            <div className={`glass-panel absolute right-6 top-24 w-80 z-40 p-6 transition-transform duration-500 ${selectedPlanet ? 'translate-x-[200%]' : 'translate-x-0'}`}>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-gradient">
                    <BrainCircuit size={24} color="var(--accent)" /> AI Guidance
                </h3>
                <div className="space-y-4">
                    <div onClick={() => handleFocus(insights.priority)} className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all cursor-pointer group relative overflow-hidden">
                        <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors" />
                        <div className="relative z-10">
                            <div className="text-sm font-bold text-purple-300 mb-1 uppercase tracking-wider">Recommended Focus</div>
                            <div className="text-2xl font-bold text-white mb-2">{insights.priority.name}</div>
                            <p className="text-xs text-slate-300">Boost your mastery to unlock advanced modules.</p>
                        </div>
                    </div>

                    <div onClick={() => handleFocus(insights.review)} className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all cursor-pointer group">
                        <div className="text-sm font-bold text-cyan-300 mb-1 uppercase tracking-wider">Quick Review</div>
                        <div className="text-xl font-bold text-white mb-2">{insights.review.name}</div>
                        <p className="text-xs text-slate-300">Maintain your streak by reviewing this topic.</p>
                    </div>
                </div>
            </div>

            {/* --- 3D Scene Layer --- */}

            {/* Background Stars */}
            {stars.map((star) => (
                <div key={star.id} className="star" style={{
                    top: star.top, left: star.left, width: star.size, height: star.size, animationDelay: star.animationDelay, opacity: star.opacity
                }} />
            ))}

            {/* Solar System */}
            <div className={`transition-all duration-700 ${selectedPlanet ? 'opacity-10 pointer-events-none blur-sm' : 'opacity-100 scale-100'}`}>
                <div className="central-star animate-pulse-core"></div>
                {learningData.map((planet) => {
                    const isPriority = planet.id === insights.priority.id;
                    const isPressed = pressedPlanetId === planet.id;
                    const isSelected = selectedPlanet?.id === planet.id;

                    return (
                        <div key={planet.id} className="orbit-ring" style={{
                            width: planet.orbitRadius * 2, height: planet.orbitRadius * 2,
                            borderColor: isPriority ? 'rgba(168, 85, 247, 0.3)' : 'rgba(255,255,255,0.05)',
                            boxShadow: isPriority ? '0 0 30px rgba(168, 85, 247, 0.1)' : undefined,
                            animationPlayState: selectedPlanet ? 'paused' : 'running'
                        }}>
                            <div className="planet-wrapper" style={{
                                position: 'absolute', top: '50%', left: '50%', width: 0, height: 0,
                                animation: `orbit ${planet.orbitDuration} linear infinite`,
                                animationPlayState: selectedPlanet ? 'paused' : 'running',
                                '--orbit-radius': `${planet.orbitRadius}px`
                            } as React.CSSProperties}>
                                <div className={`planet ${isPressed ? 'scale-90 brightness-125' : ''} ${isSelected ? 'opacity-0' : ''}`}
                                    onPointerDown={(e) => {
                                        e.stopPropagation();
                                        e.currentTarget.setPointerCapture(e.pointerId);
                                        setPressedPlanetId(planet.id);
                                    }}
                                    onPointerUp={(e) => {
                                        e.stopPropagation();
                                        e.currentTarget.releasePointerCapture(e.pointerId);
                                        if (pressedPlanetId === planet.id) {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            setOriginRect(rect);
                                            setSelectedPlanet(planet);
                                        }
                                        setPressedPlanetId(null);
                                    }}
                                    onPointerLeave={() => setPressedPlanetId(null)}
                                    style={{
                                        '--planet-color': planet.color,
                                        '--planet-size': `${planet.size}px`,
                                        'transform': 'translateX(var(--orbit-radius))',
                                        '--orbit-duration': planet.orbitDuration
                                    } as React.CSSProperties}
                                >
                                    <div style={{ color: 'white', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))', pointerEvents: 'none', position: 'relative', zIndex: 10 }}>
                                        {planet.icon}
                                    </div>
                                    <div style={{
                                        position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)',
                                        whiteSpace: 'nowrap', fontSize: '12px', fontWeight: 'bold', fontFamily: 'var(--font-display)',
                                        color: planet.color, textShadow: '0 0 10px black', opacity: 0.9,
                                        pointerEvents: 'none', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px', border: `1px solid ${planet.color}`
                                    }}>
                                        {planet.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* HERO PLANET OVERLAY (Active Selection) */}
            {selectedPlanet && (
                <div className="absolute inset-0 z-[60] flex items-center justify-center animate-fade-in"
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', animationDuration: '0.5s' }}
                    onClick={() => setSelectedPlanet(null)}>

                    <HeroPlanet
                        planet={selectedPlanet}
                        originRect={originRect}
                    />

                    <div className="absolute bottom-10 text-white/50 text-sm animate-pulse font-mono cursor-pointer hover:text-white transition-colors tracking-widest">
                        [ CLICK ANYWHERE TO CLOSE ]
                    </div>
                </div>
            )}
        </div>
    );
};

// Extracted Component for FLIP Animation
const HeroPlanet = ({ planet, originRect }: { planet: Planet, originRect: DOMRect | null }) => {
    const [isAnimating, setIsAnimating] = useState(!!originRect);

    useLayoutEffect(() => {
        if (originRect) {
            requestAnimationFrame(() => {
                setIsAnimating(false);
            });
        }
    }, [originRect]);

    const initialStyle = originRect ? {
        position: 'fixed' as const,
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        transform: 'none',
        borderRadius: '50%',
        zIndex: 100
    } : {};

    const finalStyle = {
        width: '600px', // Enlarged further to fit content
        height: '600px',
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${planet.color}, #000)`,
        boxShadow: `0 0 100px ${planet.color}, inset 0 0 50px rgba(0,0,0,0.5)`,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative' as const,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid rgba(255,255,255,0.2)`
    };

    return (
        <div
            className="hero-planet-flip"
            style={isAnimating ? initialStyle : finalStyle as React.CSSProperties}
        >
            {/* Inner Content */}
            <div className={`text-white text-center z-10 p-8 flex flex-col items-center transition-all duration-500 ${isAnimating ? 'opacity-0 scale-50' : 'opacity-100 scale-100 delay-100'}`} style={{ width: '80%' }}>
                <div className="mb-4 scale-[1.5] drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">{planet.icon}</div>
                <h1 className="text-5xl font-bold mb-2 text-white drop-shadow-lg font-display whitespace-nowrap">{planet.name}</h1>
                <p className="text-xl opacity-90 mb-6 font-mono text-cyan-50 bg-black/30 px-4 py-1 rounded-full border border-white/10">Mastery: {planet.progress}%</p>

                {/* Chapter Summary */}
                <div className="w-full bg-black/40 rounded-xl p-4 backdrop-blur-md border border-white/10 mb-4 text-left">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-2 border-b border-white/10 pb-1">Chapter Progress</h3>
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                        {planet.chapters.map((chapter: Chapter) => (
                            <div key={chapter.id} className="flex justify-between items-center text-sm">
                                <span className="text-slate-200">{chapter.title}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-400" style={{ width: `${chapter.mastery}%` }} />
                                    </div>
                                    <span className="text-xs font-mono text-slate-400">{chapter.mastery}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Future Planning / AI Insight */}
                <div className="w-full bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-xl p-4 backdrop-blur-md border border-white/10 text-left relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-purple-300 mb-1 flex items-center gap-2">
                        <BrainCircuit size={14} /> Future Planning
                    </h3>
                    <p className="text-sm text-slate-200 leading-relaxed">
                        Recommended: Focus on <span className="font-bold text-white">{planet.chapters.find((c: Chapter) => c.mastery < 100)?.title || "Advanced Topics"}</span> to boost your mastery.
                        <br />
                        <span className="text-xs text-slate-400 mt-1 block">Next Milestone: Reach 80% to unlock the "Cosmic Scholar" badge.</span>
                    </p>
                </div>
            </div>

            {/* Rings */}
            {!isAnimating && (
                <>
                    <div className="absolute inset-0 border border-white/20 rounded-full animate-[spin_20s_linear_infinite]" style={{ width: '140%', height: '140%', left: '-20%', top: '-20%', pointerEvents: 'none', borderStyle: 'dashed' }} />
                    <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" style={{ width: '170%', height: '170%', left: '-35%', top: '-35%', pointerEvents: 'none' }} />
                </>
            )}
        </div>
    );
};

export default GalaxyLearningMap;
