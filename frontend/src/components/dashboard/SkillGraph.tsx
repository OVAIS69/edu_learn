import { useState } from 'react';
const SkillGraph = () => {
    // Mock nodes for a "Neural Map"
    const [selectedSkill, setSelectedSkill] = useState<{ id: string; label: string; level: number; description: string; mastery: number } | null>(null);

    const skills = [
        { id: 'math', label: 'Math', x: 50, y: 70, level: 3, description: 'Foundational logic and numbers.', mastery: 95 },
        { id: 'calc', label: 'Calculus', x: 30, y: 50, level: 2, description: 'Rates of change and accumulation.', mastery: 78 },
        { id: 'alg', label: 'Algebra', x: 70, y: 50, level: 3, description: 'Symbols and rules for manipulating them.', mastery: 92 },
        { id: 'phys', label: 'Physics', x: 20, y: 90, level: 1, description: 'Matter, motion, and energy.', mastery: 45 },
        { id: 'qa', label: 'Quantum', x: 80, y: 90, level: 0, description: 'Nature at the smallest scales.', mastery: 12 }, // Locked
    ];

    return (
        <>
            <div className="card" style={{
                height: '300px', position: 'relative',
                background: 'var(--bg-app)', overflow: 'hidden',
                border: '1px solid var(--glass-border)'
            }}>
                <h3 style={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>Knowledge Neural Map</h3>

                {/* Neural Connections (SVG Lines) */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <line x1="50%" y1="70%" x2="30%" y2="50%" stroke="var(--primary)" strokeWidth="2" opacity="0.5" />
                    <line x1="50%" y1="70%" x2="70%" y2="50%" stroke="var(--primary)" strokeWidth="2" opacity="0.5" />
                    <line x1="30%" y1="50%" x2="20%" y2="90%" stroke="var(--primary)" strokeWidth="1" opacity="0.3" />
                    <line x1="70%" y1="50%" x2="80%" y2="90%" stroke="var(--text-muted)" strokeWidth="1" opacity="0.2" strokeDasharray="4" />
                </svg>

                {/* Nodes */}
                {skills.map(skill => (
                    <div key={skill.id} className="pixel-node"
                        onClick={() => setSelectedSkill(skill)}
                        style={{
                            position: 'absolute', left: `${skill.x}%`, top: `${skill.y}%`,
                            transform: 'translate(-50%, -50%)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            cursor: 'pointer', zIndex: 20
                        }}>
                        <div style={{
                            width: '16px', height: '16px', borderRadius: '50%',
                            background: skill.level > 0 ? 'var(--accent)' : 'var(--text-muted)',
                            boxShadow: skill.level > 0 ? '0 0 15px var(--accent)' : 'none',
                            border: '2px solid var(--bg-deep)',
                            transition: 'all 0.3s ease'
                        }} className="hover:scale-125" />

                        {/* Hover Label */}
                        <div style={{
                            marginTop: '8px',
                            background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px',
                            color: skill.level > 0 ? 'white' : 'var(--text-muted)',
                            fontFamily: 'var(--font-pixel)', fontSize: '0.6rem'
                        }}>
                            {skill.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* RPG Style Popup Modal */}
            {selectedSkill && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
                    zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} onClick={() => setSelectedSkill(null)}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="animate-fade-in-up"
                        style={{
                            width: '400px', background: 'var(--bg-deep)',
                            border: '4px solid var(--primary)',
                            boxShadow: '0 0 0 4px var(--bg-deep), 0 0 30px var(--primary)',
                            padding: '24px', position: 'relative',
                            fontFamily: 'var(--font-pixel)', color: 'white',
                            imageRendering: 'pixelated'
                        }}
                    >
                        <button
                            onClick={() => setSelectedSkill(null)}
                            style={{
                                position: 'absolute', top: '10px', right: '10px',
                                background: 'transparent', border: 'none', color: 'var(--error)',
                                cursor: 'pointer', fontSize: '1.2rem'
                            }}
                        >
                            [X]
                        </button>

                        <div style={{
                            borderBottom: '2px dashed var(--glass-border)', paddingBottom: '16px', marginBottom: '16px',
                            textAlign: 'center'
                        }}>
                            <h2 style={{ color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '8px' }}>
                                &lt; {selectedSkill.label} /&gt;
                            </h2>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>LEVEL {selectedSkill.level}</div>
                        </div>

                        <p style={{ fontSize: '0.8rem', lineHeight: '1.6', marginBottom: '24px', fontFamily: 'var(--font-main)' }}>
                            {selectedSkill.description}
                        </p>

                        {/* Stats Container */}
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.7rem' }}>
                                <span>MASTERY RATE</span>
                                <span>{selectedSkill.mastery}%</span>
                            </div>
                            <div style={{ width: '100%', height: '12px', background: '#333', border: '1px solid #555' }}>
                                <div style={{
                                    width: `${selectedSkill.mastery}%`, height: '100%',
                                    background: selectedSkill.mastery > 50 ? 'var(--neon-green)' : 'var(--warning)',
                                    boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)'
                                }} />
                            </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <button className="btn" style={{
                                background: 'var(--primary)', color: 'white',
                                border: '2px solid white', padding: '12px 24px',
                                fontFamily: 'var(--font-pixel)', fontSize: '0.8rem',
                                boxShadow: '4px 4px 0 rgba(0,0,0,0.5)', cursor: 'pointer'
                            }}>
                                {selectedSkill.level > 0 ? 'ENTER MODULE' : 'LOCKED'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SkillGraph;
