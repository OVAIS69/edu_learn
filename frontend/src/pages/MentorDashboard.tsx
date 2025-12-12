import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { ClassAnalytics } from '../services/api';
import { Users, AlertCircle, TrendingUp, BrainCircuit, Activity, ChevronRight, Search } from 'lucide-react';

const MentorDashboard = () => {
    // Mock analytics for hackathon fallback + enhanced heatmap data
    const [analytics, setAnalytics] = useState<ClassAnalytics | null>(null);
    const [loading, setLoading] = useState(true);

    // Mock Heatmap Data (Topic vs Student Mastery) - Aligned with student_performances (4 students)
    const heatmapData = [
        { topic: 'Calculus', scores: [85, 45, 78, 88] },
        { topic: 'Algebra', scores: [90, 65, 82, 92] },
        { topic: 'Physics', scores: [72, 40, 70, 80] },
        { topic: 'Chemistry', scores: [88, 70, 85, 90] },
    ];

    const [selectedStudent, setSelectedStudent] = useState<{ name: string; score: number; topic: string | null } | null>(null);

    // Function to handle student click
    // Function to handle student click
    const handleStudentClick = (student: { name: string; average_score: number }) => {
        setSelectedStudent({ name: student.name, score: student.average_score, topic: null });
    };

    // Function to handle heatmap cell click
    const handleHeatmapClick = (studentId: number, topic: string, score: number) => {
        // Find student name from analytics
        const student = analytics?.student_performances.find(s => s.student_id === studentId + 1); // Mock mapping
        setSelectedStudent({ name: student ? student.name : `Student ${studentId + 1}`, score: score, topic: topic });
    };

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // Try fetching real data, fallback to mock if backend not ready
                const data = await api.get('/analytics/class/class_101');
                setAnalytics(data);
            } catch (error) {
                console.error("Using mock data due to API error", error);
                setAnalytics({
                    total_students: 24,
                    average_class_score: 78.5,
                    at_risk_count: 3,
                    top_weak_topics: ['Thermodynamics', 'Integration'],
                    student_performances: [
                        { student_id: 1, name: 'Alice M.', average_score: 92, lessons_completed: 15, active_gaps: 0, last_active: '2h ago' },
                        { student_id: 2, name: 'Bob D.', average_score: 45, lessons_completed: 8, active_gaps: 4, last_active: '1d ago' },
                        { student_id: 3, name: 'Charlie R.', average_score: 78, lessons_completed: 12, active_gaps: 1, last_active: '5h ago' },
                        { student_id: 4, name: 'Diana P.', average_score: 88, lessons_completed: 14, active_gaps: 0, last_active: '30m ago' },
                    ]
                });
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div className="container p-4">Initializing Command Center...</div>;
    if (!analytics) return null;



    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '3rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-5)' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontFamily: 'var(--font-pixel)', fontSize: '0.8rem', marginBottom: '4px' }}>
                        <BrainCircuit size={16} /> FACULTY_MODE // ACTIVE
                    </div>
                    <h1 className="text-3xl">Class Overview</h1>
                </div>
                <button className="btn btn-primary" style={{ padding: '10px 20px' }}>
                    Generate Report
                </button>
            </div>

            {/* Top Stats - Holo Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
                {[
                    { label: 'Total Students', value: analytics?.total_students, icon: Users, color: 'var(--primary-glow)' },
                    { label: 'Class Average', value: `${analytics?.average_class_score.toFixed(1)}%`, icon: TrendingUp, color: 'var(--neon-green)' },
                    { label: 'At Risk', value: analytics?.at_risk_count, icon: AlertCircle, color: 'var(--neon-pink)', pulse: true },
                    { label: 'Weakest Link', value: analytics?.top_weak_topics[0] || 'N/A', icon: Activity, color: 'var(--warning)' },
                ].map((stat, idx) => (
                    <div key={idx} className="card glass-panel animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, borderTop: `2px solid ${stat.color}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div style={{ opacity: 0.7 }}>{stat.label}</div>
                            <stat.icon size={20} color={stat.color} className={stat.pulse ? 'animate-pulse' : ''} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-5)' }}>

                {/* Left Col: Heatmap & Students */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>

                    {/* Mastery Heatmap */}
                    <div className="card glass-panel">
                        <h3 className="text-xl" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Activity size={20} color="var(--accent)" /> Real-time Mastery Heatmap
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {/* Heatmap Header - Student Names */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <div style={{ width: '100px' }}></div> {/* Spacer for Topic Labels */}
                                <div style={{ flex: 1, display: 'flex', gap: '4px' }}>
                                    {analytics?.student_performances.map((student) => (
                                        <div key={student.student_id} style={{
                                            flex: 1,
                                            fontSize: '0.75rem',
                                            textAlign: 'center',
                                            color: 'var(--text-muted)',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {student.name.split(' ')[0]} {/* Show First Name */}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {heatmapData.map((row, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '100px', textAlign: 'right', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{row.topic}</div>
                                    <div style={{ flex: 1, display: 'flex', gap: '4px' }}>
                                        {row.scores.map((score, sIdx) => {
                                            // Calculate color based on score (Red -> Yellow -> Green)
                                            let bg = 'rgba(239, 68, 68, 0.4)'; // Red
                                            if (score >= 60) bg = 'rgba(234, 179, 8, 0.4)'; // Yellow
                                            if (score >= 80) bg = 'rgba(16, 185, 129, 0.4)'; // Green
                                            if (score >= 90) bg = 'rgba(16, 185, 129, 0.8)'; // Bright Green

                                            return (
                                                <div
                                                    key={sIdx}
                                                    className="hover-scale"
                                                    title={`Student ${sIdx + 1}: ${score}%`}
                                                    onClick={() => handleHeatmapClick(sIdx, row.topic, score)}
                                                    style={{
                                                        flex: 1, height: '32px', borderRadius: '4px',
                                                        backgroundColor: bg, cursor: 'pointer', transition: 'all 0.2s',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontSize: '0.75rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.9)'
                                                    }}
                                                >
                                                    {score}%
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 8, height: 8, background: 'rgba(239, 68, 68, 0.6)' }} /> Critical</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 8, height: 8, background: 'rgba(234, 179, 8, 0.6)' }} /> Needs Work</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 8, height: 8, background: 'rgba(16, 185, 129, 0.6)' }} /> Mastered</span>
                        </div>
                    </div>

                    {/* Student List Table */}
                    <div className="card glass-panel">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 className="text-xl">Student Roster</h3>
                            <div style={{ position: 'relative' }}>
                                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input type="text" placeholder="Search student..." style={{
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
                                    padding: '8px 8px 8px 32px', borderRadius: 'var(--radius-full)', color: 'white', outline: 'none'
                                }} />
                            </div>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                    <th style={{ padding: '12px', color: 'var(--text-muted)' }}>Name</th>
                                    <th style={{ padding: '12px', color: 'var(--text-muted)' }}>Performance</th>
                                    <th style={{ padding: '12px', color: 'var(--text-muted)' }}>Active Gaps</th>
                                    <th style={{ padding: '12px', color: 'var(--text-muted)' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics?.student_performances.map((student) => (
                                    <tr
                                        key={student.student_id}
                                        style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', cursor: 'pointer' }}
                                        className="hover:bg-white/5"
                                        onClick={() => handleStudentClick(student)}
                                    >
                                        <td style={{ padding: '12px', fontWeight: 500 }}>{student.name}</td>
                                        <td style={{ padding: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', width: '80px' }}>
                                                    <div style={{
                                                        width: `${student.average_score}%`, height: '100%', borderRadius: '4px',
                                                        background: student.average_score < 60 ? 'var(--neon-pink)' : 'var(--neon-green)'
                                                    }} />
                                                </div>
                                                <span style={{ fontSize: '0.8rem' }}>{student.average_score}%</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            {student.active_gaps > 0 ? (
                                                <span style={{ color: 'var(--warning)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                    <AlertCircle size={14} /> {student.active_gaps} Detected
                                                </span>
                                            ) : (
                                                <span style={{ color: 'var(--text-muted)' }}>None</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '12px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{student.last_active}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Col: AI Insights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                    <div className="card glass-panel" style={{ background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.1) 0%, rgba(10, 10, 15, 0) 100%)', border: '1px solid var(--accent-glow)' }}>
                        <h3 className="text-xl" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <BrainCircuit size={20} className="animate-pulse" color="var(--accent)" /> AI Insights
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{
                                padding: '16px', borderRadius: '12px',
                                border: '1px solid var(--neon-pink)',
                                background: 'rgba(236, 72, 153, 0.05)',
                                position: 'relative', overflow: 'hidden'
                            }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--neon-pink)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <AlertCircle size={16} /> CRITICAL ATTENTION
                                </div>
                                <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
                                    3 students are failing "Calculus Chain Rule". This gap is blocking their physics module.
                                </p>
                                <button className="btn-ghost" style={{ width: '100%', fontSize: '0.8rem', justifyContent: 'space-between' }}>
                                    Auto-Assign Remedial <ChevronRight size={14} />
                                </button>
                            </div>

                            <div style={{
                                padding: '16px', borderRadius: '12px',
                                border: '1px solid var(--neon-green)',
                                background: 'rgba(16, 185, 129, 0.05)'
                            }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--neon-green)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <TrendingUp size={16} /> MOMENTUM
                                </div>
                                <p style={{ fontSize: '0.9rem' }}>
                                    Class velocity increased by 12% this week. "Visual Learning" mode is highly effective for this cohort.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card glass-panel">
                        <h3 className="text-lg" style={{ marginBottom: '16px' }}>Activity Log</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { user: 'Alice', action: 'completed Quiz 3', time: '10m ago' },
                                { user: 'Bob', action: 'struggling with Limits', time: '45m ago' },
                                { user: 'Diana', action: 'earned "Speedster" badge', time: '1h ago' },
                            ].map((log, i) => (
                                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '0.85rem' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px' }} />
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>{log.user}</span> {log.action} <br />
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{log.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Student Detail Modal */}
            {selectedStudent && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
                    zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} onClick={() => setSelectedStudent(null)}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="animate-fade-in-up"
                        style={{
                            width: '400px', background: 'var(--bg-deep)',
                            border: '1px solid var(--glass-border)',
                            boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                            padding: '24px', position: 'relative', borderRadius: '12px',
                        }}
                    >
                        <button
                            onClick={() => setSelectedStudent(null)}
                            style={{
                                position: 'absolute', top: '16px', right: '16px',
                                background: 'transparent', border: 'none', color: 'var(--text-muted)',
                                cursor: 'pointer', fontSize: '1.2rem'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #ddd 0%, #aaa 100%)',
                                margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2rem', fontWeight: 'bold', color: '#555'
                            }}>
                                {selectedStudent.name.charAt(0)}
                            </div>
                            <h2 className="text-2xl">{selectedStudent.name}</h2>
                            <p className="text-muted">Grade 10 - Section A</p>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span className="text-muted">Current Module</span>
                                <span style={{ color: 'var(--accent)' }}>Calculus II</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span className="text-muted">Avg. Performance</span>
                                <span style={{ fontWeight: 'bold', color: selectedStudent.score >= 80 ? 'var(--neon-green)' : 'var(--neon-pink)' }}>
                                    {selectedStudent.score}%
                                </span>
                            </div>
                            {selectedStudent.topic && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                                    <span className="text-muted">Selected Topic</span>
                                    <span style={{ fontWeight: 'bold' }}>{selectedStudent.topic}</span>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-primary" style={{ flex: 1 }}>View Full Profile</button>
                            <button className="btn btn-ghost" style={{ flex: 1 }}>Send Message</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MentorDashboard;
