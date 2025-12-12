import { Trophy, Flame } from 'lucide-react';

const Leaderboard = () => {
    // Mock data if profile is null (for hackathon demo reliability)
    const profile = { level: 5, points: 2450, streak_days: 12, badges: [{ id: 1, icon: '🚀', description: 'Early Adopter' }, { id: 2, icon: '🔥', description: 'On Fire' }] };
    // const [loading, setLoading] = useState(true);

    // Using mock data for immediate "Wow" factor in demo
    // if (!profile) return null;

    return (
        <div className="card glass-panel" style={{ height: '100%', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="text-xl">Top Scholars</h3>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>Global</span>
            </div>

            {/* Top 3 List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {[
                    { name: 'Sarah J.', points: 2800, rank: 1, avatar: '👩‍🎓' },
                    { name: 'Alex (You)', points: 2450, rank: 2, avatar: '👨‍💻' },
                    { name: 'Mike T.', points: 2300, rank: 3, avatar: '👨‍🏫' }
                ].map((user) => (
                    <div key={user.rank} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px', borderRadius: '12px',
                        background: user.rank === 2 ? 'rgba(79, 70, 229, 0.2)' : 'rgba(255,255,255,0.03)',
                        border: user.rank === 2 ? '1px solid var(--primary)' : 'none'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '24px', height: '24px', borderRadius: '50%',
                                background: user.rank === 1 ? 'gold' : user.rank === 2 ? 'silver' : '#cd7f32',
                                color: 'black', fontWeight: 'bold', fontSize: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>{user.rank}</div>
                            <span style={{ fontSize: '1.2rem' }}>{user.avatar}</span>
                            <span style={{ fontWeight: user.rank === 2 ? 'bold' : 'normal' }}>{user.name}</span>
                        </div>
                        <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{user.points}</span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
                <div style={{
                    padding: '12px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                    border: '1px solid var(--glass-border)'
                }}>
                    <Flame size={24} color="var(--neon-pink)" className="animate-pulse" />
                    <span style={{ fontWeight: 600 }}>{profile.streak_days} Days</span>
                    <span className="text-sm text-muted">Streak</span>
                </div>
                <div style={{
                    padding: '12px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                    border: '1px solid var(--glass-border)'
                }}>
                    <Trophy size={24} color="gold" />
                    <span style={{ fontWeight: 600 }}>Top 5%</span>
                    <span className="text-sm text-muted">Global</span>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
