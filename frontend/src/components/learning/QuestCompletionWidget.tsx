import { useEffect } from 'react';
import { Award, ArrowRight, BrainCircuit } from 'lucide-react';

interface QuestCompletionProps {
    xpEarned: number;
    onContinue: () => void;
}

const QuestCompletionWidget = ({ xpEarned, onContinue }: QuestCompletionProps) => {

    useEffect(() => {
        // Simple confetti effect using canvas or DOM could go here
        // For now, we rely on CSS animations
    }, []);

    return (
        <div className="card glass-panel animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '32px', textAlign: 'center' }}>

            {/* Success Header */}
            <div style={{ marginBottom: '40px' }} className="animate-bounce-custom">
                <div style={{
                    fontSize: '4rem',
                    marginBottom: '16px',
                    textShadow: '0 0 40px rgba(16, 185, 129, 0.6)'
                }}>
                    🎉
                </div>
                <h1 className="text-4xl text-gradient" style={{ fontFamily: 'var(--font-pixel)', marginBottom: '8px' }}>
                    MISSION COMPLETE!
                </h1>
                <p className="text-xl text-muted">
                    Your understanding of "change" has evolved.
                </p>
            </div>

            {/* XP & Rewards */}
            <div className="card" style={{
                background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 10, 15, 0.3) 100%)',
                border: '1px solid var(--neon-green)',
                maxWidth: '500px', margin: '0 auto 40px auto',
                padding: '32px', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
                    background: 'linear-gradient(90deg, transparent, var(--neon-green), transparent)',
                    animation: 'shine 2s infinite'
                }}></div>

                <div style={{ color: 'var(--neon-green)', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>
                    TOTAL XP EARNED
                </div>
                <div style={{ fontSize: '3.5rem', fontWeight: 'bold', fontFamily: 'var(--font-pixel)', color: 'white', marginBottom: '24px' }}>
                    +{xpEarned} XP
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <div className="badge-unlock animate-spin-slow">
                        <Award size={32} className="text-violet-400" />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BADGE UNLOCKED</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--violet-400)' }}>Derivative Explorer</div>
                    </div>
                </div>
            </div>

            {/* Next Recommendations */}
            <div style={{ marginBottom: '32px' }}>
                <h3 className="text-lg text-muted" style={{ marginBottom: '16px' }}>Recommended Next Quests</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    {[
                        { title: 'Polynomials', xp: 15, color: 'var(--accent)' },
                        { title: 'Tangent Slopes', xp: 10, color: 'var(--neon-pink)' },
                        { title: 'Chain Rule Bridge', xp: 20, color: 'var(--warning)' },
                    ].map((quest, i) => (
                        <div key={i} className="card hover-scale" style={{ padding: '16px', borderTop: `2px solid ${quest.color}`, cursor: 'pointer' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <BrainCircuit size={16} color={quest.color} />
                                <span style={{ fontSize: '0.8rem', color: quest.color }}>+{quest.xp} XP</span>
                            </div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{quest.title}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Continue Button */}
            <div style={{ marginTop: 'auto' }}>
                <button
                    onClick={onContinue}
                    className="btn btn-ghost"
                    style={{ fontSize: '1.1rem', gap: '8px' }}
                >
                    Return to Lobby <ArrowRight size={18} />
                </button>
            </div>

        </div>
    );
};

export default QuestCompletionWidget;
