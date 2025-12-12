import { useState } from 'react';
import { Zap, Award, ShoppingBag, Shield } from 'lucide-react';
import CertificateStore from '../components/monetization/CertificateStore';
import CreditTopUp from '../components/monetization/CreditTopUp';
import CosmeticStore from '../components/monetization/CosmeticStore';
import ShopModule from '../components/monetization/ShopModule';

const MonetizationPage = () => {
    const [activeTab, setActiveTab] = useState('plans');

    const tabs = [
        { id: 'plans', label: 'Store & Plans', icon: Shield },
        { id: 'certs', label: 'Certifications', icon: Award },
        { id: 'credits', label: 'AI Credits', icon: Zap },
        { id: 'cosmetics', label: 'Cosmetics', icon: ShoppingBag },
    ];

    return (
        <div className="container mx-auto px-4 py-8 pb-24 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4">
                    Upgrade Your Learning
                </h1>
                <p className="text-slate-400 max-w-xl mx-auto">
                    Unlock premium features, get certified, or customize your experience.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
                <div
                    className="p-1 rounded-xl flex gap-2 relative"
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}
                >
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-lg flex items-center gap-2 font-bold transition-all duration-300 relative overflow-hidden`}
                                style={{
                                    background: isActive ? 'var(--accent)' : 'transparent',
                                    color: isActive ? '#000' : 'rgba(255,255,255,0.6)',
                                    boxShadow: isActive ? '0 0 15px var(--accent-glow)' : 'none',
                                    textTransform: 'uppercase',
                                    fontSize: '0.8rem',
                                    letterSpacing: '1px',
                                    fontFamily: 'var(--font-display)',
                                }}
                            >
                                <tab.icon size={18} style={{
                                    color: isActive ? '#000' : 'var(--accent)',
                                    filter: isActive ? 'none' : 'drop-shadow(0 0 5px var(--accent-glow))'
                                }} />
                                {tab.label}

                                {/* Hover Effect for inactive */}
                                {!isActive && (
                                    <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity rounded-lg" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {activeTab === 'plans' && <ShopModule />}
                {activeTab === 'certs' && <CertificateStore />}
                {activeTab === 'credits' && <CreditTopUp />}
                {activeTab === 'cosmetics' && <CosmeticStore />}
            </div>
        </div>
    );
};

export default MonetizationPage;
