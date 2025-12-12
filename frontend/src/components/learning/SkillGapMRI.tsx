import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { SkillGap } from '../../services/api';
import { Activity, Zap } from 'lucide-react';

const SkillGapMRI = () => {
    const [gaps, setGaps] = useState<SkillGap[]>([]);
    const [loading, setLoading] = useState(true);
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        const fetchGaps = async () => {
            try {
                // Simulate scanning delay for effect
                await new Promise(resolve => setTimeout(resolve, 2000));

                const data = await api.get('/engine/skill-gaps');
                setGaps(data);
                setIsScanning(false);
            } catch (error) {
                console.error("Failed to fetch skill gaps", error);
                setIsScanning(false);
            } finally {
                setLoading(false);
            }
        };
        fetchGaps();
    }, []);

    if (loading || isScanning) return (
        <div className="card glass-panel p-8 flex flex-col items-center justify-center text-center" style={{ minHeight: '400px' }}>
            <div className="animate-spin-slow" style={{
                width: '60px', height: '60px',
                border: '4px solid var(--glass-border)', borderTop: '4px solid var(--accent)',
                borderRadius: '50%', marginBottom: '20px'
            }} />
            <h3 className="text-xl animate-pulse" style={{ color: 'var(--accent)' }}>INITIATING NEURAL SCAN...</h3>
            <p className="text-muted">Analyzing learning patterns and identifying knowledge gaps.</p>
        </div>
    );

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: 'var(--spacing-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h2 className="text-2xl" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Activity className="text-red-500 animate-pulse" /> Skill Gap MRI
                    </h2>
                    <p className="text-muted">AI-powered analysis of your learning patterns.</p>
                </div>
                <div style={{
                    padding: '6px 12px', background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid var(--accent)', borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 'bold'
                }}>
                    SCAN COMPLETE
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--spacing-4)' }}>
                {gaps.map((gap, index) => (
                    <div key={index} className="card glass-panel hover-scale" style={{
                        borderLeft: `4px solid ${gap.severity === 'Critical' ? 'var(--error)' : 'var(--warning)'}`,
                        position: 'relative', overflow: 'hidden'
                    }}>
                        {/* Scanline Effect */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
                            background: gap.severity === 'Critical' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(245, 158, 11, 0.5)',
                            animation: 'scan-vertical 3s infinite linear', opacity: 0.5
                        }} />

                        <div className="flex justify-between items-start" style={{ marginBottom: '16px' }}>
                            <h3 className="text-xl" style={{ fontWeight: 'bold' }}>{gap.topic}</h3>
                            <span style={{
                                padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600,
                                backgroundColor: gap.severity === 'Critical' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                get boxShadow() { return `0 0 10px ${gap.severity === 'Critical' ? 'var(--error)' : 'var(--warning)'}`; },
                                color: gap.severity === 'Critical' ? 'var(--error)' : 'var(--warning)',
                                border: `1px solid ${gap.severity === 'Critical' ? 'var(--error)' : 'var(--warning)'}`
                            }}>
                                {gap.severity.toUpperCase()}
                            </span>
                        </div>

                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                                <Activity size={18} className="text-muted" style={{ minWidth: '18px', marginTop: '3px' }} />
                                <div>
                                    <p className="text-xs text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Diagnosis</p>
                                    <p style={{ fontSize: '0.95rem' }}>{gap.reason}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(6, 182, 212, 0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <Zap size={18} className="text-cyan-400" style={{ minWidth: '18px', marginTop: '3px' }} />
                                <div>
                                    <p className="text-xs text-cyan-400" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Prescription</p>
                                    <p style={{ fontSize: '0.95rem' }}>{gap.recommended_action}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 'var(--spacing-4)' }}>
                            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                <Activity size={18} style={{ marginRight: '8px' }} /> Initialize Remedial Protocol
                            </button>
                        </div>
                    </div>
                ))}

                {gaps.length === 0 && (
                    <div className="card glass-panel" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--spacing-6)', border: '1px solid var(--success)' }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
                            color: 'var(--success)', margin: '0 auto var(--spacing-4) auto',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid var(--success)',
                            boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)'
                        }} className="animate-pulse">
                            <Activity size={40} />
                        </div>
                        <h3 className="text-2xl" style={{ marginBottom: '8px', color: 'var(--success)' }}>System Optimal</h3>
                        <p className="text-muted" style={{ maxWidth: '400px', margin: '0 auto' }}>
                            Diagnostic complete. No critical skill gaps detected. Your learning neural network is functioning at peak efficiency.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkillGapMRI;
