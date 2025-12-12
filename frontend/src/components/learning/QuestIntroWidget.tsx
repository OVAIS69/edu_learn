import { Play, TrendingUp, BrainCircuit, Zap, Unlock, Award } from 'lucide-react';

interface QuestIntroProps {
    title: string;
    onStart: () => void;
}

const QuestIntroWidget = ({ title, onStart }: QuestIntroProps) => {
    return (
        <div className="card glass-panel animate-fade-in bg-grid-pattern" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '32px', position: 'relative', overflow: 'hidden' }}>

            {/* Glowing Accent Top Border */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}></div>

            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div className="animate-slide-down" style={{ display: 'inline-block' }}>
                    <div className="animate-hover-glow" style={{
                        display: 'inline-block',
                        padding: '8px 24px',
                        background: 'rgba(6, 182, 212, 0.15)',
                        border: '1px solid var(--accent)',
                        borderRadius: 'var(--radius-full)',
                        marginBottom: '16px',
                        color: 'var(--accent)',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        letterSpacing: '1px',
                        boxShadow: '0 0 10px rgba(6, 182, 212, 0.2)',
                        backdropFilter: 'blur(4px)'
                    }}>
                        ✨ QUEST AVAILABLE
                    </div>
                </div>
                <h1 className="text-4xl" style={{ fontFamily: 'var(--font-pixel)', marginBottom: '16px', lineHeight: 1.4 }}>
                    {title}
                </h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Award size={16} className="text-yellow-400" /> Core Concept Mission
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Zap size={16} className="text-red-400" /> Difficulty: ★★☆☆☆
                    </span>
                </div>
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>

                {/* Left: Rewards */}
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                    <h3 className="text-xl" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Unlock size={20} className="text-green-400" /> Mission Rewards
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '8px',
                                background: 'rgba(6, 182, 212, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--accent)'
                            }}>
                                <BrainCircuit size={20} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', color: 'var(--accent)' }}>+12 XP — Understanding Change</div>
                                <div className="text-sm text-muted">Increases Math Insight stat</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '8px',
                                background: 'rgba(236, 72, 153, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--neon-pink)'
                            }}>
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', color: 'var(--neon-pink)' }}>+8 XP — Slope Intuition</div>
                                <div className="text-sm text-muted">Boosts Geometry Sense stat</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '8px',
                                background: 'rgba(234, 179, 8, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--warning)'
                            }}>
                                <Zap size={20} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', color: 'var(--warning)' }}>+10 XP — Basic Derivative Rules</div>
                                <div className="text-sm text-muted">Powers up Problem-Solving Efficiency</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Badge Preview */}
                <div style={{
                    background: 'linear-gradient(145deg, rgba(124, 58, 237, 0.1) 0%, rgba(10, 10, 15, 0.5) 100%)',
                    padding: '24px', borderRadius: '16px',
                    border: '1px solid var(--primary-glow)',
                    textAlign: 'center',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{
                        width: '100px', height: '100px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(0,0,0,0) 70%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '16px',
                        border: '2px solid rgba(139, 92, 246, 0.5)',
                        boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
                    }} className="animate-float">
                        <Award size={48} className="text-violet-400" />
                    </div>
                    <div style={{ color: 'var(--violet-400)', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' }}>BADGE REWARD</div>
                    <h3 className="text-2xl" style={{ fontFamily: 'var(--font-pixel)', marginBottom: '8px' }}>Derivative Explorer</h3>
                    <p className="text-sm text-muted" style={{ maxWidth: '80%' }}>
                        +3% XP in Calculus lessons & unlocks "Chain Rule Trail"
                    </p>
                </div>
            </div>

            {/* Action Bar */}
            <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                <button
                    onClick={onStart}
                    className="btn btn-primary hover-scale"
                    style={{
                        padding: '16px 48px',
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-pixel)',
                        boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
                    }}
                >
                    <Play size={20} fill="currentColor" style={{ marginRight: '12px' }} />
                    ACCEPT MISSION
                </button>
            </div>

        </div>
    );
};

export default QuestIntroWidget;
