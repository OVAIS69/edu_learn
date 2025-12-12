import { useState } from 'react';
import { Check } from 'lucide-react';

const CosmeticStore = () => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const items = [
        { id: 'avatar-1', type: 'Avatar', name: 'Cyber Punk', price: 500, image: '🤖', rarity: 'common' },
        { id: 'avatar-2', type: 'Avatar', name: 'Neon Ninja', price: 1200, image: '🥷', rarity: 'rare' },
        { id: 'avatar-3', type: 'Avatar', name: 'Space Ace', price: 2500, image: '👩‍🚀', rarity: 'legendary' },
        { id: 'theme-1', type: 'Theme', name: 'Matrix Green', price: 800, image: '💻', rarity: 'rare' },
        { id: 'theme-2', type: 'Theme', name: 'Sunset Retro', price: 1500, image: '🌅', rarity: 'legendary' },
        { id: 'badge-1', type: 'Badge', name: 'Early Adopter', price: 300, image: '🚀', rarity: 'common' },
        { id: 'badge-2', type: 'Badge', name: 'Code Wizard', price: 1000, image: '🧙‍♂️', rarity: 'rare' },
        { id: 'xp-boost', type: 'Booster', name: '2x XP (1 Hr)', price: 200, image: '⚡', rarity: 'common' },
    ];

    const getRarityStyles = (rarity: string) => {
        switch (rarity) {
            case 'legendary': return { color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.5)', border: '#fbbf24' };
            case 'rare': return { color: '#c084fc', glow: 'rgba(192, 132, 252, 0.5)', border: '#c084fc' };
            default: return { color: '#94a3b8', glow: 'rgba(148, 163, 184, 0.2)', border: '#475569' };
        }
    };

    return (
        <div className="animate-fade-in pb-12">

            {/* Header / Stats */}
            <div className="flex justify-between items-end mb-8 px-4">
                <div>
                    <h2 className="text-2xl font-bold font-display text-white mb-2">Cosmetics & Upgrades</h2>
                    <p className="text-slate-400 text-sm">Personalize your profile with rare items.</p>
                </div>
                <div className="px-6 py-2 rounded-xl bg-black/40 border border-yellow-500/30 flex items-center gap-3 backdrop-blur-md">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_orange]" />
                    <span className="font-bold text-white font-mono tracking-wide">2,450 XP</span>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
                width: '100%'
            }}>
                {items.map((item) => {
                    const style = getRarityStyles(item.rarity);
                    const isSelected = selectedItem === item.id;

                    return (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item.id)}
                            className="group relative cursor-pointer"
                            style={{
                                height: '260px',
                                background: 'rgba(20, 20, 25, 0.6)',
                                backdropFilter: 'blur(12px)',
                                borderRadius: '16px',
                                border: `1px solid ${isSelected ? style.border : 'rgba(255,255,255,0.1)'}`,
                                padding: '0',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.2s ease-out',
                                overflow: 'hidden',
                                transform: isSelected ? 'scale(0.98)' : 'scale(1)'
                            }}
                        >
                            {/* Hover / Selected Glow */}
                            <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                style={{ boxShadow: `inset 0 0 20px ${style.glow}` }}
                            />

                            {/* Rarity Stripe */}
                            <div className="absolute top-0 left-0 w-full h-1" style={{ background: style.border }} />

                            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
                                <div style={{
                                    fontSize: '4rem',
                                    marginBottom: '1rem',
                                    filter: `drop-shadow(0 0 20px ${style.glow})`,
                                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                }} className="group-hover:scale-110">
                                    {item.image}
                                </div>
                                <h3 className="text-lg font-bold text-white text-center mb-1">{item.name}</h3>
                                <div className="text-xs font-pixel uppercase tracking-widest opacity-70" style={{ color: style.color }}>
                                    {item.type}
                                </div>
                            </div>

                            <div className="p-4 bg-black/20 border-t border-white/5 flex justify-between items-center relative z-10">
                                <div className="font-bold text-white flex items-center gap-1">
                                    <span style={{ color: '#fbbf24' }}>⚡</span> {item.price}
                                </div>
                                {isSelected ? (
                                    <div className="px-3 py-1 rounded bg-cyan-500 text-black text-xs font-bold flex items-center gap-1">
                                        <Check size={12} /> OWNED
                                    </div>
                                ) : (
                                    <div className="text-xs text-slate-500 group-hover:text-white transition-colors">
                                        Click to Buy
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CosmeticStore;
