import { Download, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';

interface Certificate {
    id: string;
    title: string;
    level: string;
    price: number;
    color: string;
    glow: string;
    skills: string[];
    image: string;
}

const certificates: Certificate[] = [
    { id: 'py-beg', title: 'Python Novice', level: 'Beginner', price: 149, color: '#facc15', glow: 'rgba(250, 204, 21, 0.4)', skills: ['Variables', 'Loops', 'Functions'], image: '🐍' },
    { id: 'math-l2', title: 'Calculus I', level: 'Intermediate', price: 79, color: '#f87171', glow: 'rgba(248, 113, 113, 0.4)', skills: ['Limits', 'Derivatives', 'Integrals'], image: '∫' },
    { id: 'eng-speak', title: 'Spoken English', level: 'Advanced', price: 99, color: '#4ade80', glow: 'rgba(74, 222, 128, 0.4)', skills: ['Fluency', 'Public Speaking'], image: '🗣️' },
    { id: 'react-dev', title: 'React Dev', level: 'Advanced', price: 299, color: '#22d3ee', glow: 'rgba(34, 211, 238, 0.4)', skills: ['Hooks', 'Context', 'Redux'], image: '⚛️' },
    { id: 'data-sci', title: 'Data Science', level: 'Beginner', price: 199, color: '#c084fc', glow: 'rgba(192, 132, 252, 0.4)', skills: ['Pandas', 'NumPy', 'Matplotlib'], image: '📊' },
    { id: 'fin-lit', title: 'Finance 101', level: 'All Levels', price: 49, color: '#34d399', glow: 'rgba(52, 211, 153, 0.4)', skills: ['Budgeting', 'Investing'], image: '💰' }
];

const CertificateStore = () => {
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    return (
        <div className="animate-fade-in pb-12">
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                width: '100%',
                maxWidth: '1100px',
                margin: '0 auto'
            }}>
                {certificates.map((cert) => (
                    <div
                        key={cert.id}
                        onClick={() => setSelectedCert(cert)}
                        className="group relative cursor-pointer"
                        style={{
                            height: '240px',
                            background: 'rgba(20, 20, 25, 0.6)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Hover Border Glow */}
                        <div className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                            style={{ boxShadow: `inset 0 0 0 1px ${cert.color}, inset 0 0 20px ${cert.glow}` }}
                        />

                        {/* Scanline Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" style={{ backgroundSize: '100% 3px', transform: 'translateY(-100%)', animation: 'scan 2s linear infinite' }} />


                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div style={{
                                width: '56px', height: '56px', borderRadius: '12px',
                                background: `linear-gradient(135deg, rgba(255,255,255,0.05), transparent)`,
                                border: `1px solid ${cert.color}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.8rem',
                                boxShadow: `0 0 15px ${cert.glow}`
                            }}>
                                {cert.image}
                            </div>
                            <div style={{
                                fontFamily: 'var(--font-pixel)', fontSize: '0.6rem', padding: '6px 10px',
                                borderRadius: '6px', background: 'rgba(0,0,0,0.4)', border: `1px solid ${cert.color}`, color: cert.color
                            }}>
                                {cert.level}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-1">{cert.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {cert.skills.slice(0, 2).map((skill, i) => (
                                    <span key={i} className="text-xs text-slate-300 bg-white/5 px-2 py-1 rounded border border-white/5">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
                            <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">View Details</span>
                            <span className="text-lg font-bold" style={{ color: cert.color }}>₹{cert.price}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedCert && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
                    onClick={() => setSelectedCert(null)}
                >
                    <div
                        className="relative w-full max-w-md p-8 rounded-2xl overflow-hidden"
                        style={{
                            background: '#0B0B15',
                            border: `1px solid ${selectedCert.color}`,
                            boxShadow: `0 0 40px ${selectedCert.glow}`
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white">
                            <X size={24} />
                        </button>

                        <div className="text-center mb-8">
                            <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-6xl mb-4 border-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                style={{ borderColor: selectedCert.color, background: `radial-gradient(circle, ${selectedCert.glow} 0%, transparent 70%)` }}>
                                {selectedCert.image}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">{selectedCert.title}</h2>
                            <p className="text-slate-400 text-sm font-mono tracking-wide">{selectedCert.level} Certification</p>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <ShieldCheck size={24} style={{ color: selectedCert.color }} />
                                <div>
                                    <div className="text-white font-bold text-sm">Verified Badge</div>
                                    <div className="text-slate-400 text-xs">Blockchain-secured credential</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <Download size={24} className="text-blue-400" />
                                <div>
                                    <div className="text-white font-bold text-sm">PDF Report</div>
                                    <div className="text-slate-400 text-xs">Detailed skills breakdown</div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-4 text-black font-bold rounded-xl hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-2"
                            style={{ background: selectedCert.color, boxShadow: `0 0 20px ${selectedCert.glow}` }}>
                            Unlock for ₹{selectedCert.price}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificateStore;
