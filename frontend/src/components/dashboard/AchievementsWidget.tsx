
import { useState } from 'react';
import { Award } from 'lucide-react';

const AchievementsWidget = () => {
    const [selectedBadge, setSelectedBadge] = useState<{ icon: string; title: string; date: string; description: string; rarity: string } | null>(null);

    const achievements = [
        { icon: '🚀', title: 'Blast Off', date: '2023-10-12', description: 'Completed your first lesson.', rarity: 'Common' },
        { icon: '🔥', title: 'On Fire', date: '2023-10-15', description: 'Maintained a 3-day learning streak.', rarity: 'Uncommon' },
        { icon: '📚', title: 'Bookworm', date: '2023-11-01', description: 'Read 50 lesson articles.', rarity: 'Rare' },
        { icon: '💡', title: 'Eureka!', date: '2023-11-20', description: 'Solved a complex problem without hints.', rarity: 'Epic' },
    ];

    return (
        <>
            <div className="card" style={{ background: 'linear-gradient(180deg, var(--bg-card) 0%, rgba(109, 40, 217, 0.1) 100%)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={18} color="var(--primary)" /> Achievements
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {achievements.map((badge, i) => (
                        <div key={i}
                            onClick={() => setSelectedBadge(badge)}
                            style={{
                                width: '40px', height: '40px', background: 'var(--bg-app)',
                                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.2rem', cursor: 'pointer', border: '1px solid var(--glass-border)',
                                transition: 'transform 0.2s',
                            }}
                            className="hover:scale-110"
                            title={badge.title}>
                            {badge.icon}
                        </div>
                    ))}
                    <div style={{
                        width: '40px', height: '40px', background: 'transparent',
                        borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px dashed var(--text-muted)', color: 'var(--text-muted)', cursor: 'pointer'
                    }}>
                        +2
                    </div>
                </div>
            </div>

            {/* Achievement Popup */}
            {selectedBadge && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
                    zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} onClick={() => setSelectedBadge(null)}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="animate-fade-in-up"
                        style={{
                            width: '350px', background: 'var(--bg-deep)',
                            border: '4px solid var(--neon-pink)',
                            boxShadow: '0 0 0 4px var(--bg-deep), 0 0 30px var(--neon-pink)',
                            padding: '24px', position: 'relative',
                            fontFamily: 'var(--font-pixel)', color: 'white',
                            textAlign: 'center',
                            imageRendering: 'pixelated'
                        }}
                    >
                        <div style={{ fontSize: '4rem', marginBottom: '16px', animation: 'float 3s ease-in-out infinite' }}>
                            {selectedBadge.icon}
                        </div>

                        <h2 style={{ color: 'var(--neon-pink)', fontSize: '1.2rem', marginBottom: '8px' }}>
                            {selectedBadge.title}
                        </h2>

                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                            EARNED: {selectedBadge.date}
                        </div>

                        <p style={{ fontSize: '0.8rem', lineHeight: '1.6', marginBottom: '24px', fontFamily: 'var(--font-main)' }}>
                            {selectedBadge.description}
                        </p>

                        <div style={{
                            display: 'inline-block', padding: '4px 12px', borderRadius: '4px',
                            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                            fontSize: '0.7rem', color: selectedBadge.rarity === 'Epic' ? 'var(--warning)' : 'white'
                        }}>
                            RARITY: {selectedBadge.rarity.toUpperCase()}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AchievementsWidget;
