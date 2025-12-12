
import { Bell, Search, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="glass-nav" style={{
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 var(--spacing-4)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            {/* Logo Area */}
            <div
                style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                onClick={() => window.location.href = '/'}
            >
                <div style={{
                    width: '32px', height: '32px',
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                    borderRadius: '8px', boxShadow: '0 0 10px var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', fontSize: '18px', fontFamily: 'var(--font-pixel)'
                }}>
                    E
                </div>
                <h3 style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                    EduLearn<span style={{ color: 'var(--accent)' }}>AI</span>
                </h3>
            </div>

            {/* Search Bar */}
            <div style={{ width: '400px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--glass-border)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    gap: 'var(--spacing-2)',
                    transition: 'all 0.2s ease'
                }}>
                    <Search size={16} className="text-muted" color="var(--text-muted)" />
                    <input
                        type="text"
                        placeholder="Search for skills, topics, or mentors..."
                        style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            width: '100%',
                            fontSize: '14px',
                            color: 'white'
                        }}
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3" style={{ display: 'flex', gap: '24px' }}>
                <button className="btn-ghost" style={{ padding: '8px', borderRadius: '50%' }}>
                    <Bell size={20} />
                </button>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    paddingLeft: '24px',
                    borderLeft: '1px solid var(--glass-border)'
                }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '14px', fontWeight: 600 }}>Alex Student</p>
                        <p style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: 'var(--font-pixel)' }}>LVL 5</p>
                    </div>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(to bottom right, #2c2c2c, #1a1a1a)',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                    }}>
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
