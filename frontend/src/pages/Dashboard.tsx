import { useState } from 'react';
import { Target, Zap, Clock, PlayCircle } from 'lucide-react';
import NeuralPathWidget from '../components/dashboard/NeuralPathWidget';
import Leaderboard from '../components/social/Leaderboard';
import SkillGraph from '../components/dashboard/SkillGraph';
import AchievementsWidget from '../components/dashboard/AchievementsWidget';

const Dashboard = () => {
    const [xp] = useState(2450);
    const nextLevelXp = 3000;
    const progress = (xp / nextLevelXp) * 100;

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '3rem' }}>

            {/* --- XP Bar & Header --- */}
            <div style={{ marginBottom: 'var(--spacing-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                    <h2 className="text-2xl">Dashboard</h2>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{xp} XP</span>
                        <span className="text-muted"> / {nextLevelXp} XP</span>
                    </div>
                </div>
                {/* Pixel XP Bar */}
                <div style={{
                    height: '16px', background: 'rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                    border: '1px solid var(--glass-border)'
                }}>
                    <div style={{
                        width: `${progress}%`, height: '100%',
                        background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)',
                        boxShadow: '0 0 10px var(--accent)',
                        transition: 'width 1s ease-in-out'
                    }} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 'var(--spacing-4)' }}>

                {/* --- Left Column: Main Learning --- */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>

                    {/* Continue Your Path */}
                    <div className="card glass-panel" style={{
                        position: 'relative', overflow: 'hidden',
                        borderLeft: '4px solid var(--accent)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                    fontSize: '0.75rem', color: 'var(--accent)',
                                    marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px'
                                }}>
                                    <Zap size={14} /> Recommended for You
                                </div>
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Advanced Calculus: Limits</h3>
                                <p className="text-muted" style={{ maxWidth: '400px', marginBottom: '24px' }}>
                                    Master the concept of limits to unlock the next module in your Calculus galaxy.
                                </p>
                                <button className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                                    <PlayCircle size={18} /> CONTINUE LESSON
                                </button>
                            </div>
                            {/* Graphic Decor */}
                            <div style={{ opacity: 0.8 }} className="animate-float">
                                <Clock size={80} color="var(--accent)" strokeWidth={0.5} />
                            </div>
                        </div>
                    </div>

                    {/* Neural Path Widget */}
                    <NeuralPathWidget />

                    {/* Weekly Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
                        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '50%',
                                border: '4px solid var(--bg-app)', borderTopColor: 'var(--neon-green)', borderRightColor: 'var(--neon-green)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transform: 'rotate(45deg)'
                            }}>
                                <span style={{ transform: 'rotate(-45deg)', fontWeight: 'bold' }}>5d</span>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Learning Streak</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>5 Days</div>
                            </div>
                        </div>
                        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                background: 'rgba(236, 72, 153, 0.2)', padding: '12px', borderRadius: '12px',
                                color: 'var(--neon-pink)'
                            }}>
                                <Target size={24} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Weekly Goal</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>85% Done</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- Right Column: Side Stats & Leaderboard --- */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>

                    {/* Skill Graph Widget Integration */}
                    <SkillGraph />

                    {/* Quick Stats */}
                    <AchievementsWidget />

                    {/* Leaderboard Widget */}
                    <Leaderboard />

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
