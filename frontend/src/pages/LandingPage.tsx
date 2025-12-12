
import { Terminal, Cpu, Globe, Gamepad2, FlaskConical, Code, Sigma, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Typing effect component
const Typewriter = ({ text, delay }: { text: string; delay: number }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    return <span>{currentText}<span className="typing-cursor"></span></span>;
};

const LandingPage = () => {
    const navigate = useNavigate();

    // Memoize particles to avoid hydration mismatch (impure render)
    const particles = useState(() => [...Array(15)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`
    })))[0];

    return (
        <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Custom Landing Header */}
            <header className="glass-nav" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--spacing-4)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', borderRadius: '8px', boxShadow: '0 0 10px var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', fontFamily: 'var(--font-pixel)' }}>E</div>
                    <h3 style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>EduLearn<span style={{ color: 'var(--accent)' }}>AI</span></h3>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Login</button>
                </div>
            </header>

            {/* Background Layer: Mesh + Particles */}
            <div style={{
                position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(109, 40, 217, 0.2) 0%, transparent 70%)',
                filter: 'blur(80px)', zIndex: -1
            }} />
            <div style={{
                position: 'absolute', bottom: '-20%', right: '-10%', width: '800px', height: '800px',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
                filter: 'blur(80px)', zIndex: -1
            }} />

            {/* Soft Particles */}
            {particles.map((p, i) => (
                <div key={i} className="particle" style={{
                    left: p.left,
                    top: p.top,
                    animationDelay: p.delay,
                    opacity: 0.3
                }} />
            ))}

            {/* Floating Pixel Icons Layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                {[
                    { icon: <Sigma size={24} />, top: '15%', left: '10%', color: 'var(--neon-pink)', delay: '0s' },
                    { icon: 'π', top: '25%', left: '85%', color: 'var(--accent)', delay: '1.5s', isText: true },
                    { icon: <Gamepad2 size={24} />, top: '65%', left: '5%', color: 'var(--primary-glow)', delay: '2s' },
                    { icon: <FlaskConical size={24} />, top: '75%', left: '90%', color: 'var(--neon-green)', delay: '3s' },
                    { icon: 'A', top: '10%', left: '60%', color: 'var(--warning)', delay: '1s', isText: true },
                    { icon: <Code size={24} />, top: '85%', left: '20%', color: 'var(--accent)', delay: '2.5s' },
                    { icon: '+', top: '40%', left: '5%', color: 'white', delay: '4s', isText: true },
                    { icon: <Calculator size={20} />, top: '5%', left: '30%', color: 'var(--neon-pink)', delay: '0.5s' },
                    { icon: 'B', top: '90%', left: '50%', color: 'var(--text-muted)', delay: '3.5s', isText: true },
                ].map((item, idx) => (
                    <div key={idx} className="animate-float" style={{
                        position: 'absolute',
                        top: item.top,
                        left: item.left,
                        color: item.color,
                        animationDelay: item.delay,
                        fontFamily: item.isText ? 'var(--font-pixel)' : 'inherit',
                        fontSize: item.isText ? '24px' : 'inherit',
                        opacity: 0.4,
                        transition: 'all 0.3s ease',
                        cursor: 'default',
                        pointerEvents: 'auto' // Allow hover
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-10px) scale(1.2)';
                            e.currentTarget.style.opacity = '1';
                            // Add a tiny bounce effect manually or via class if preferred
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.opacity = '0.4';
                        }}
                    >
                        {item.icon}
                    </div>
                ))}
            </div>


            {/* --- Hero Section --- */}
            <main className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

                    {/* Left Content - Enhanced with "Central HoloGlass" vibe (applied to container) */}
                    <div className="animate-fade-in-up" style={{ padding: '24px', position: 'relative' }}>

                        {/* Top Tagline */}
                        <div style={{
                            fontFamily: 'var(--font-pixel)',
                            color: 'var(--text-muted)',
                            fontSize: '1.5rem',
                            letterSpacing: '6px',
                            marginBottom: '40px',
                            opacity: 1,
                            display: 'flex', gap: '32px',
                            textShadow: '0 0 20px rgba(255,255,255,0.1)'
                        }}>
                            <span style={{ color: 'var(--primary-glow)' }}>EVOLVE.</span>
                            <span style={{ color: 'var(--accent)' }}>ADAPT.</span>
                            <span style={{ color: 'var(--neon-pink)' }}>ASCEND.</span>
                        </div>

                        {/* Status Badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '6px 12px', borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--accent)', background: 'rgba(6, 182, 212, 0.1)',
                            marginBottom: '24px', fontSize: '0.85rem', color: 'var(--accent)',
                            fontFamily: 'var(--font-pixel)'
                        }}>
                            <span style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%', display: 'block', boxShadow: '0 0 10px var(--accent)' }}></span>
                            SYSTEM_ONLINE v2.0
                        </div>

                        <h1 style={{ marginBottom: '24px', position: 'relative', marginLeft: '40px' }}>
                            Learning that <br />
                            <span className="text-gradient" style={{
                                textShadow: '0 0 40px rgba(6,182,212,0.3)',
                                fontFamily: 'var(--font-pixel)',
                                fontSize: '0.8em', // Adjust for pixel font size
                                display: 'inline-block'
                            }}>
                                <Typewriter text="Adapts to YOU." delay={100} />
                            </span>
                        </h1>

                        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '500px', lineHeight: '1.8' }}>
                            EduLearn-AI uses futuristic adaptive intelligence to guide you through a personalized learning universe.
                        </p>

                        {/* Glossy Strip Button Container */}
                        <div style={{
                            position: 'relative',
                            padding: '10px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--glass-border)',
                            display: 'inline-block',
                            backdropFilter: 'blur(5px)',
                            marginLeft: '40px'
                        }}>
                            <button
                                className="btn btn-primary btn-shine"
                                onClick={() => navigate('/dashboard')}
                                style={{
                                    padding: '16px 40px', fontSize: '1.0rem', // Slightly smaller for pixel font
                                    background: 'linear-gradient(135deg, var(--primary) 0%, #4c1d95 100%)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    fontFamily: 'var(--font-pixel)',
                                    display: 'flex', alignItems: 'center', gap: '12px'
                                }}
                            >
                                <Terminal size={14} /> START LEARNING
                            </button>

                            {/* Tiny Pixel Icons Floating Around Button */}
                            <div className="animate-float" style={{ position: 'absolute', top: '-10px', right: '-10px', animationDelay: '1s' }}>
                                <div style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 0 5px var(--accent))' }}>📐</div>
                            </div>
                            <div className="animate-float" style={{ position: 'absolute', bottom: '-10px', left: '-10px', animationDelay: '2s' }}>
                                <div style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 0 5px var(--neon-pink))' }}>💻</div>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div style={{ display: 'flex', gap: '40px', marginTop: '60px', borderTop: '1px solid var(--glass-border)', paddingTop: '30px' }}>
                            <div>
                                <h4 style={{ fontSize: '2rem', marginBottom: '4px' }}>98%</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Completion Rate</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', marginBottom: '4px' }}>24/7</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>AI Tutor Access</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', marginBottom: '4px' }}>150+</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Skills Mapped</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - The Orb & Glass Interfaces */}
                    <div style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        {/* Floating Orb with Ripple */}
                        <div className="animate-float animate-ripple" style={{
                            width: '300px', height: '300px',
                            borderRadius: '50%',
                            background: 'conic-gradient(from 180deg at 50% 50%, #6d28d9 0deg, #06b6d4 180deg, #6d28d9 360deg)',
                            filter: 'blur(30px)', opacity: 0.8,
                            position: 'absolute', zIndex: 0,
                            boxShadow: '0 0 100px rgba(109, 40, 217, 0.4)'
                        }} />

                        {/* Glass Mesh Layer (The Brain) */}
                        <div className="animate-float" style={{ animationDelay: '-1s', position: 'relative', zIndex: 1 }}>
                            <Cpu size={200} color="white" strokeWidth={0.5} style={{ opacity: 0.9, filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.5))' }} />
                        </div>

                        {/* Orbiting Cards */}
                        <div className="glass-panel" style={{
                            position: 'absolute', top: '10%', right: '10%',
                            padding: '16px', borderRadius: '16px',
                            display: 'flex', alignItems: 'center', gap: '12px',
                            animation: 'float 5s ease-in-out infinite alternate',
                            zIndex: 2, borderLeft: '3px solid var(--neon-green)'
                        }}>
                            <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '8px', borderRadius: '8px' }}>
                                <Globe size={20} color="var(--neon-green)" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Status</div>
                                <div style={{ fontWeight: 'bold' }}>Optimal Learning Path</div>
                            </div>
                        </div>

                        <div className="glass-panel" style={{
                            position: 'absolute', bottom: '15%', left: '5%',
                            padding: '16px', borderRadius: '16px',
                            display: 'flex', alignItems: 'center', gap: '12px',
                            animation: 'float 7s ease-in-out infinite alternate-reverse',
                            zIndex: 2, borderLeft: '3px solid var(--neon-pink)'
                        }}>
                            <div style={{ background: 'rgba(236, 72, 153, 0.2)', padding: '8px', borderRadius: '8px' }}>
                                <Terminal size={20} color="var(--neon-pink)" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI Suggestion</div>
                                <div style={{ fontWeight: 'bold' }}>Review Physics Module</div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
