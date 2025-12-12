import { useState } from 'react';
import { Zap, Check, Sparkles } from 'lucide-react';

const CreditTopUp = () => {
    const [balance, setBalance] = useState(50);
    const [isAnimating, setIsAnimating] = useState(false);

    const packages = [
        { id: 'starter', amount: 100, price: 49, label: 'Exam Cram', features: ['Valid for 7 days', 'Standard Speed'], theme: 'slate' },
        { id: 'pro', amount: 500, price: 199, label: 'Semester Pack', popular: true, features: ['Valid for 30 days', 'Priority Support', '2x XP Boost'], theme: 'purple' },
        { id: 'ultra', amount: 1500, price: 499, label: 'Yearly Pass', features: ['Valid for 1 year', 'All Features Unlocked', 'Exclusive Badge'], theme: 'gold' },
    ];

    const getThemeColor = (theme: string) => {
        switch (theme) {
            case 'purple': return { border: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)', bg: '#a855f7' };
            case 'gold': return { border: '#eab308', glow: 'rgba(234, 179, 8, 0.4)', bg: '#eab308' };
            default: return { border: '#475569', glow: 'rgba(71, 85, 105, 0.2)', bg: '#475569' };
        }
    };

    const handlePurchase = (amount: number) => {
        setIsAnimating(true);
        setTimeout(() => {
            setBalance(prev => prev + amount);
            setIsAnimating(false);
        }, 1000);
    };

    return (
        <div className="animate-fade-in max-w-5xl mx-auto pb-12">
            {/* Balance Display */}
            <div className="flex justify-center mb-12">
                <div className="relative group">
                    <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-4 px-8 py-4 rounded-2xl bg-black/40 border border-yellow-500/30 backdrop-blur-md">
                        <div className={`p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 ${isAnimating ? 'animate-spin' : ''}`}>
                            <Zap size={28} fill="currentColor" />
                        </div>
                        <div>
                            <div className="text-xs text-yellow-500/80 uppercase tracking-widest font-bold mb-1">Current Balance</div>
                            <div className={`text-3xl font-bold text-white tabular-nums transition-all ${isAnimating ? 'scale-110 text-yellow-300' : ''}`} style={{ fontFamily: 'var(--font-display)' }}>
                                {balance} <span className="text-sm font-normal text-slate-400">Credits</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Packages Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {packages.map((pack) => {
                    const theme = getThemeColor(pack.theme);
                    return (
                        <div
                            key={pack.id}
                            className="group relative cursor-pointer"
                            style={{
                                height: '320px',
                                background: 'rgba(20, 20, 25, 0.6)',
                                backdropFilter: 'blur(12px)',
                                borderRadius: '16px',
                                border: `1px solid ${pack.popular ? theme.border : 'rgba(255,255,255,0.1)'}`,
                                padding: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1)',
                            }}
                            onClick={() => handlePurchase(pack.amount)}
                        >
                            {/* Popular Glow */}
                            {pack.popular && (
                                <div className="absolute inset-0 rounded-16 transition-opacity duration-300 pointer-events-none"
                                    style={{ boxShadow: `0 0 40px ${theme.glow}, inset 0 0 20px ${theme.glow}` }}
                                />
                            )}

                            {/* Hover Border */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-white/20 rounded-16 transition-colors pointer-events-none" />

                            {pack.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-black border border-purple-500 text-purple-400 text-xs font-bold rounded-full shadow-[0_0_10px_rgba(168,85,247,0.4)] flex items-center gap-1 z-20">
                                    <Sparkles size={12} /> BEST VALUE
                                </div>
                            )}

                            <div className="text-center mb-8 pt-4 relative z-10">
                                <h3 className="text-lg font-bold mb-2 text-slate-300 group-hover:text-white transition-colors">{pack.label}</h3>
                                <div className="text-5xl font-bold text-white mb-2 tracking-tight" style={{ textShadow: `0 0 20px ${theme.glow}` }}>
                                    {pack.amount}
                                </div>
                                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">AI Credits</div>
                            </div>

                            <div className="space-y-3 mb-auto relative z-10 px-4">
                                {pack.features.map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                                        <Check size={14} style={{ color: pack.popular ? theme.bg : '#64748b' }} />
                                        {feat}
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 relative z-10 mt-6 group-hover:scale-[1.02] active:scale-95"
                                style={{
                                    background: pack.popular ? theme.bg : 'rgba(255,255,255,0.1)',
                                    color: pack.popular ? '#fff' : '#fff',
                                    textShadow: pack.popular ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
                                }}>
                                Buy for ₹{pack.price}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CreditTopUp;
