import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Activity, Users, LogOut, Bot, BrainCircuit, ShoppingBag, Building2 } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Mentor View', path: '/mentor' },
        { icon: BookOpen, label: 'Learn', path: '/learn' },
        { icon: BrainCircuit, label: 'Neural Map', path: '/neural-map' },

        { icon: Bot, label: 'AI Tutor', path: '/tutor' },
        { icon: Activity, label: 'Skill MRI', path: '/mri' },
        { icon: ShoppingBag, label: 'Store', path: '/upgrade' },
        { icon: Building2, label: 'For Schools', path: '/schools' },
        { icon: Users, label: 'Community', path: '/community' },
    ];

    return (
        <aside style={{
            width: '260px',
            height: '100vh',
            backgroundColor: 'var(--bg-card)',
            borderRight: '1px solid var(--border)',
            position: 'fixed',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--spacing-3)'
        }}>
            <div style={{ marginBottom: 'var(--spacing-6)', paddingLeft: 'var(--spacing-2)' }}>
                <h1
                    className="text-2xl"
                    style={{ color: 'var(--primary)', fontFamily: 'var(--font-pixel)', fontSize: '1.5rem', cursor: 'pointer' }}
                    onClick={() => window.location.href = '/'}
                >
                    EduLearn AI
                </h1>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-2)',
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-sm)',
                            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                            backgroundColor: isActive ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                            fontWeight: 500,
                            transition: 'all 0.2s'
                        })}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--spacing-3)' }}>
                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    padding: '12px 16px',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                }}>
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
