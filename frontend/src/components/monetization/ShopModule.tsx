import React, { useState } from 'react';
import { Zap, Shield, Box, Star, X, Info } from 'lucide-react';

// --- Types ---
type ShopItem = {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    rarity: 'COMMON' | 'RARE' | 'EPIC';
    features: { icon: React.ReactNode; text: string }[];
    type: 'plan' | 'pack';
    theme: 'default' | 'pro' | 'epic';
};

// --- Data ---
const SHOP_ITEMS: ShopItem[] = [
    {
        id: 'explorer',
        title: 'Explorer',
        subtitle: 'Starter',
        price: 'FREE',
        rarity: 'COMMON',
        type: 'plan',
        theme: 'default',
        features: [
            { icon: <Shield size={14} />, text: 'Basic Lessons' },
            { icon: <Zap size={14} />, text: '5 Tutor Msgs/day' },
            { icon: <Box size={14} />, text: 'Standard Analytics' }
        ]
    },
    {
        id: 'pro',
        title: 'Pro Learner',
        subtitle: 'Unlimited AI | Neural Map',
        price: '₹499 / mo',
        rarity: 'RARE',
        type: 'plan',
        theme: 'pro',
        features: [
            { icon: <Zap size={14} />, text: 'Unlimited Tutor' },
            { icon: <Shield size={14} />, text: 'Deep Skill Scan' },
            { icon: <Box size={14} />, text: 'Personalized Map' }
        ]
    },
    {
        id: 'artifact',
        title: 'Artifact Pack',
        subtitle: 'Badges, Frames & XP Boosts',
        price: '200 Credits',
        rarity: 'EPIC',
        type: 'pack',
        theme: 'epic',
        features: [
            { icon: <Star size={14} />, text: '1 Rare Badge' },
            { icon: <Zap size={14} />, text: '+10% XP boost (2h)' },
            { icon: <Box size={14} />, text: 'Profile Frame' }
        ]
    }
];

// --- Theme Helpers ---
const THEMES = {
    default: {
        accent: '#94a3b8', // Slate
        glow: 'rgba(148, 163, 184, 0.2)',
        border: 'rgba(148, 163, 184, 0.1)'
    },
    pro: {
        accent: '#b28aff', // Purple
        glow: 'rgba(178, 138, 255, 0.3)',
        border: 'rgba(178, 138, 255, 0.2)'
    },
    epic: {
        accent: '#ffb86b', // Orange
        glow: 'rgba(255, 184, 107, 0.3)',
        border: 'rgba(255, 184, 107, 0.2)'
    }
};

const ShopModule = () => {
    const [purchasingId, setPurchasingId] = useState<string | null>(null);
    const [previewItem, setPreviewItem] = useState<ShopItem | null>(null);
    const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

    const handlePurchase = (id: string) => {
        setPurchasingId(id);
        // Simulate network request
        setTimeout(() => {
            setPurchasingId(null);
            setPurchasedIds(prev => [...prev, id]);
            // Here we would typically trigger a confetti effect or update global state
        }, 1500);
    };

    return (
        <div className="shop-container" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>

            {/* Grid Layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                width: '100%'
            }}>
                {SHOP_ITEMS.map((item, index) => (
                    <ShopCard
                        key={item.id}
                        item={item}
                        index={index}
                        isPurchasing={purchasingId === item.id}
                        isPurchased={purchasedIds.includes(item.id)}
                        onPurchase={() => handlePurchase(item.id)}
                        onPreview={() => setPreviewItem(item)}
                    />
                ))}
            </div>

            {/* Preview Modal */}
            {previewItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                    onClick={() => setPreviewItem(null)}
                >
                    <div
                        className="card glass-panel"
                        style={{ width: '100%', maxWidth: '400px', padding: '24px', border: `1px solid ${THEMES[previewItem.theme].accent}` }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xl text-white">{previewItem.title}</h3>
                            <button onClick={() => setPreviewItem(null)} className="text-muted hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="space-y-4 mb-8">
                            {previewItem.features.map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 text-white">
                                    <div style={{ color: THEMES[previewItem.theme].accent }}>{feat.icon}</div>
                                    <span>{feat.text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="btn btn-ghost flex-1"
                                onClick={() => setPreviewItem(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary flex-1"
                                onClick={() => {
                                    setPreviewItem(null);
                                    handlePurchase(previewItem.id);
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Sub-Component: ShopCard ---
const ShopCard = ({
    item,
    index,
    isPurchasing,
    isPurchased,
    onPurchase,
    onPreview
}: {
    item: ShopItem;
    index: number;
    isPurchasing: boolean;
    isPurchased: boolean;
    onPurchase: () => void;
    onPreview: () => void;
}) => {
    // Current Plan Logic
    const isCurrentPlan = item.id === 'explorer';
    const theme = THEMES[item.theme];

    // Handlers
    const handleClick = () => {
        if (isCurrentPlan || isPurchased || isPurchasing) return;
        onPurchase();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <button
            className="shop-card group relative text-left"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-label={`${item.title} - ${item.price}`}
            disabled={isCurrentPlan || isPurchasing}
            style={{
                height: '280px', // Increased height
                background: 'rgba(20, 20, 25, 0.6)', // Darker background for contrast
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                border: `1px solid ${theme.border}`,
                padding: '0',
                overflow: 'hidden',
                transition: 'transform 220ms ease-out, box-shadow 220ms ease-out',
                animation: `fade-up 0.5s ease-out forwards ${index * 150}ms`,
                opacity: 0,
                position: 'relative',
                cursor: isCurrentPlan ? 'default' : 'pointer',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    boxShadow: `inset 0 0 20px ${theme.glow}, 0 0 20px ${theme.glow}`,
                    pointerEvents: 'none'
                }}
            />

            <div style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', width: '100%', position: 'relative', zIndex: 10 }}>

                {/* Header Row - Forced Flex */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', width: '100%' }}>
                    {/* Rarity Chip */}
                    <div style={{
                        fontFamily: 'var(--font-pixel)',
                        fontSize: '0.65rem',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        background: 'rgba(0,0,0,0.4)',
                        border: `1px solid ${theme.accent}`,
                        color: theme.accent,
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}>
                        {item.rarity}
                    </div>

                    {/* Price Pill */}
                    <div style={{
                        fontSize: '0.8rem',
                        fontWeight: '800',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        background: theme.accent,
                        color: '#000',
                        boxShadow: `0 0 10px ${theme.glow}`,
                        letterSpacing: '-0.5px'
                    }}>
                        {item.price}
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'auto' }}>
                    {/* Icon */}
                    <div style={{
                        width: '56px', height: '56px',
                        flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: `linear-gradient(135deg, ${theme.border}, rgba(255,255,255,0.03))`,
                        borderRadius: '14px',
                        border: `1px solid ${theme.accent}`,
                        boxShadow: `0 0 15px ${theme.glow}`
                    }}>
                        {item.id === 'explorer' && <Shield size={28} color={theme.accent} />}
                        {item.id === 'pro' && <Zap size={28} color={theme.accent} />}
                        {item.id === 'artifact' && <Star size={28} color={theme.accent} />}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.1, color: 'white', letterSpacing: '-0.02em' }}>
                            {item.title}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                            {item.subtitle}
                        </p>
                    </div>
                </div>

                {/* Stat Chips */}
                <div style={{
                    display: 'flex', gap: '8px', marginBottom: '24px',
                    overflowX: 'auto', paddingBottom: '4px',
                    scrollbarWidth: 'none', msOverflowStyle: 'none'
                }}>
                    {item.features.map((feat, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            fontSize: '0.7rem',
                            padding: '6px 10px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            whiteSpace: 'nowrap',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'rgba(255,255,255,0.8)'
                        }}>
                            <span style={{ color: theme.accent }}>{feat.icon}</span> {feat.text}
                        </div>
                    ))}
                </div>

                {/* Footer Action */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onPreview();
                        }}
                        style={{
                            fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)',
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: 'transparent', border: 'none', cursor: 'pointer',
                            transition: 'color 0.2s'
                        }}
                        className="hover:text-white"
                    >
                        <Info size={14} /> Preview
                    </button>

                    <div style={{
                        fontSize: '0.8rem',
                        fontWeight: '900',
                        color: isCurrentPlan ? 'rgba(255,255,255,0.3)' : theme.accent,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        {isPurchasing ? 'Processing...' :
                            isPurchased ? 'PURCHASED!' :
                                isCurrentPlan ? 'EQUIPPED' :
                                    'UPGRADE >'}
                    </div>
                </div>

                {/* Inline Toast / Confetti Placeholder */}
                {isPurchased && (
                    <div className="absolute bottom-4 right-4 animate-fade-in-up" style={{ pointerEvents: 'none' }}>
                        ✨
                    </div>
                )}
            </div>
        </button>
    );
};

export default ShopModule;
