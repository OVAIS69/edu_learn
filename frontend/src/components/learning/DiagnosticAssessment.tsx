import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { Question, DiagnosticResult } from '../../services/api';
import { CheckCircle, ArrowRight, Brain } from 'lucide-react';

const DiagnosticAssessment = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [result, setResult] = useState<DiagnosticResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await api.get('/engine/diagnostic/questions');
                setQuestions(data);
            } catch (error) {
                console.error("Failed to fetch questions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswer = (optionIndex: number) => {
        const currentQuestion = questions[currentQuestionIndex];
        setAnswers({ ...answers, [currentQuestion.id]: optionIndex });
    };

    const handleNext = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setLoading(true);
            try {
                const data = await api.post('/engine/diagnostic/submit', answers);
                setResult(data);
            } catch (error) {
                console.error("Failed to submit diagnostic", error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <div className="card p-4">Loading assessment...</div>;

    if (result) {
        return (
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-3)' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Brain size={40} />
                    </div>
                </div>
                <h2 className="text-2xl">Assessment Complete!</h2>
                <p className="text-muted" style={{ margin: 'var(--spacing-2) 0' }}>
                    Your learning profile has been generated.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3)', margin: 'var(--spacing-4) 0', textAlign: 'left' }}>
                    <div style={{ padding: 'var(--spacing-2)', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)' }}>
                        <p className="text-sm text-muted">Score</p>
                        <p className="text-2xl" style={{ color: 'var(--primary)' }}>{result.score.toFixed(0)}%</p>
                    </div>
                    <div style={{ padding: 'var(--spacing-2)', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)' }}>
                        <p className="text-sm text-muted">Style</p>
                        <p className="text-2xl" style={{ textTransform: 'capitalize' }}>{result.learning_style}</p>
                    </div>
                </div>

                <div style={{ textAlign: 'left' }}>
                    <h3 className="text-xl" style={{ marginBottom: 'var(--spacing-2)' }}>Weak Areas</h3>
                    <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                        {result.weak_topics.map(topic => (
                            <span key={topic} style={{
                                padding: '4px 12px', borderRadius: 'var(--radius-full)',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', fontSize: '0.875rem'
                            }}>
                                {topic}
                            </span>
                        ))}
                        {result.weak_topics.length === 0 && <p className="text-muted">None! Great job.</p>}
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const hasAnswered = answers[currentQuestion.id] !== undefined;

    return (
        <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-4)' }}>
                <span className="text-sm text-muted">Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span className="text-sm" style={{
                    padding: '4px 8px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)'
                }}>
                    {currentQuestion.topic}
                </span>
            </div>

            <h2 className="text-xl" style={{ marginBottom: 'var(--spacing-4)' }}>{currentQuestion.text}</h2>

            <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        style={{
                            padding: '16px',
                            textAlign: 'left',
                            borderRadius: 'var(--radius-sm)',
                            border: answers[currentQuestion.id] === index ? '2px solid var(--primary)' : '1px solid var(--border)',
                            backgroundColor: answers[currentQuestion.id] === index ? 'rgba(79, 70, 229, 0.05)' : 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s'
                        }}
                    >
                        <span>{option}</span>
                        {answers[currentQuestion.id] === index && <CheckCircle size={20} color="var(--primary)" />}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: 'var(--spacing-4)', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={!hasAnswered}
                    style={{ opacity: !hasAnswered ? 0.5 : 1, cursor: !hasAnswered ? 'not-allowed' : 'pointer' }}
                >
                    {isLastQuestion ? 'Finish Assessment' : 'Next Question'}
                    {!isLastQuestion && <ArrowRight size={18} style={{ marginLeft: '8px' }} />}
                </button>
            </div>
        </div>
    );
};

export default DiagnosticAssessment;
