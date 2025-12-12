import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { Lesson } from '../../services/api';
import { Play, FileText, MousePointer, CheckCircle, ListMusic } from 'lucide-react';

import QuestIntroWidget from './QuestIntroWidget';
import QuestCompletionWidget from './QuestCompletionWidget';

const NanoLessonPlayer = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(true);
    const [questStatus, setQuestStatus] = useState<'intro' | 'active' | 'completed'>('intro');

    // Reset to intro when changing lessons
    useEffect(() => {
        if (activeLesson) {
            setQuestStatus('intro');
        }
    }, [activeLesson, activeLesson?.id]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const data = await api.get('/engine/recommendations');
                setLessons(data);
                if (data.length > 0) setActiveLesson(data[0]);
            } catch (error) {
                console.error("Failed to fetch recommendations", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, []);

    if (loading) return <div className="card p-4">Loading your personalized plan...</div>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'var(--spacing-4)', height: 'calc(100vh - 140px)' }}>
            {/* Playlist Sidebar */}
            <div className="card" style={{ overflowY: 'auto' }}>
                <h3 className="text-xl" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                        onClick={() => window.open('/dashboard', '_blank')}
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'inherit' }}
                        title="Open Dashboard in new window"
                    >
                        <ListMusic size={20} className="text-primary hover-scale" />
                    </div>
                    Up Next
                </h3>
                <p className="text-sm text-muted" style={{ marginBottom: 'var(--spacing-3)', marginLeft: '30px' }}>
                    Your personalized learning queue based on recent performance.
                </p>
                <div className="flex flex-col gap-2">
                    {lessons.map((lesson) => (
                        <button
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: activeLesson?.id === lesson.id ? 'var(--bg-app)' : 'transparent',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                {lesson.type === 'video' && <Play size={14} />}
                                {lesson.type === 'text' && <FileText size={14} />}
                                {lesson.type === 'interactive' && <MousePointer size={14} />}
                            </div>
                            <div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                                    {lesson.type}
                                </div>
                                <p className="text-sm" style={{ fontWeight: 600, color: 'var(--text-main)' }}>{lesson.title}</p>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{lesson.duration_minutes} min • {lesson.topic}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Player Area */}
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {activeLesson ? (
                    <>
                        {questStatus === 'intro' && (
                            <QuestIntroWidget
                                title={activeLesson.title}
                                onStart={() => setQuestStatus('active')}
                            />
                        )}

                        {questStatus === 'completed' && (
                            <QuestCompletionWidget
                                xpEarned={30}
                                onContinue={() => {
                                    // Logic to go to next lesson or reset
                                    setQuestStatus('intro');
                                }}
                            />
                        )}

                        {questStatus === 'active' && (
                            <div className="card animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 'var(--spacing-4)' }}>
                                <div style={{
                                    flex: 1, backgroundColor: '#000', borderRadius: 'var(--radius-sm)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', flexDirection: 'column', gap: '16px'
                                }}>
                                    {activeLesson.type === 'video' && (
                                        <>
                                            <Play size={64} />
                                            <p>Video Player Placeholder</p>
                                        </>
                                    )}
                                    {activeLesson.type === 'text' && (
                                        <div style={{ padding: '32px', maxWidth: '600px', textAlign: 'center' }}>
                                            <FileText size={64} style={{ marginBottom: '16px' }} />
                                            <h2 className="text-2xl">{activeLesson.title}</h2>
                                            <p style={{ marginTop: '16px', lineHeight: 1.6 }}>
                                                This is a text-based nano-lesson. In a real application, this would contain rich text content, diagrams, and formulas explaining {activeLesson.topic}.
                                            </p>
                                        </div>
                                    )}
                                    {activeLesson.type === 'interactive' && (
                                        <>
                                            <MousePointer size={64} />
                                            <p>Interactive Simulation Placeholder</p>
                                        </>
                                    )}
                                </div>

                                <div style={{ marginTop: 'var(--spacing-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h2 className="text-2xl">{activeLesson.title}</h2>
                                        <p className="text-muted">{activeLesson.topic}</p>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setQuestStatus('completed')}
                                    >
                                        <CheckCircle size={18} style={{ marginRight: '8px' }} />
                                        Complete Mission
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-muted">
                        Select a lesson to start learning
                    </div>
                )}
            </div>
        </div>
    );
};

export default NanoLessonPlayer;
