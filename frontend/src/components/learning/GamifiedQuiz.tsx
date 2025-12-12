import { useState, useEffect, useCallback } from 'react';
import { Timer, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const questions = [
    {
        id: 1,
        text: "What is the limit of (1/x) as x approaches infinity?",
        options: ["Infinity", "0", "1", "Undefined"],
        correct: 1
    },
    {
        id: 2,
        text: "Which concept helps visualize the rate of change?",
        options: ["Integral", "Derivative", "Matrix", "Vector"],
        correct: 1
    },
    {
        id: 3,
        text: "If f(x) = x^2, what is f'(x)?",
        options: ["x", "2x", "x^2", "2"],
        correct: 1
    }
];

const GamifiedQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [gameState, setGameState] = useState<'playing' | 'result'>('playing');
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleOptionSelect = useCallback((index: number) => {
        if (isAnswered) return;

        setSelectedOption(index);
        setIsAnswered(true);

        const isCorrect = index === questions[currentQuestion].correct;

        if (isCorrect) {
            setScore(prev => prev + 100 + (timeLeft * 10)); // Time bonus
            triggerConfetti();
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setTimeLeft(15);
                setSelectedOption(null);
                setIsAnswered(false);
            } else {
                setGameState('result');
                if (score > 200) triggerMassiveConfetti();
            }
        }, 1500);
    }, [isAnswered, questions, currentQuestion, timeLeft, score]);

    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0 && !isAnswered) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isAnswered) {
            handleOptionSelect(-1); // Time out
        }
    }, [timeLeft, gameState, isAnswered, handleOptionSelect]);

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#06b6d4', '#ec4899', '#ffffff']
        });
    };

    const triggerMassiveConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#06b6d4', '#ec4899']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#06b6d4', '#ec4899']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    if (gameState === 'result') {
        return (
            <div className="container animate-fade-in" style={{
                height: '80vh', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center'
            }}>
                <div className="card glass-panel" style={{ textAlign: 'center', padding: 'var(--spacing-6)' }}>
                    <div style={{ marginBottom: '24px' }} className="animate-float">
                        <Trophy size={64} color="var(--accent)" />
                    </div>
                    <h2 className="text-2xl" style={{ marginBottom: '16px' }}>Quiz Complete!</h2>
                    <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '32px' }}>
                        You scored <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{score} XP</span>
                    </p>
                    <button className="btn btn-primary" onClick={() => window.location.reload()}>
                        Play Again
                    </button>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];

    return (
        <div className="container animate-fade-in" style={{ maxWidth: '800px', marginTop: 'var(--spacing-5)' }}>

            {/* Header / Timer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-4)' }}>
                <div>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        Question {currentQuestion + 1}/{questions.length}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: timeLeft < 5 ? 'var(--neon-pink)' : 'white' }}>
                    <Timer size={20} className={timeLeft < 5 ? 'animate-pulse' : ''} />
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{timeLeft}s</span>
                </div>
            </div>

            {/* Question Card */}
            <div className="card glass-panel" style={{ padding: 'var(--spacing-5)', minHeight: '400px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '32px', textAlign: 'center' }}>
                    {currentQ.text}
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {currentQ.options.map((opt, idx) => {
                        let style = {};
                        if (isAnswered) {
                            if (idx === currentQ.correct) style = { background: 'rgba(16, 185, 129, 0.2)', borderColor: 'var(--neon-green)' };
                            else if (idx === selectedOption) style = { background: 'rgba(236, 72, 153, 0.2)', borderColor: 'var(--neon-pink)' };
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(idx)}
                                disabled={isAnswered}
                                className="btn-ghost"
                                style={{
                                    height: '80px', fontSize: '1.1rem',
                                    border: '1px solid var(--glass-border)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    borderRadius: '16px',
                                    ...style
                                }}
                            >
                                {opt}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* XP Popup Animation (Simple conditional) */}
            {isAnswered && selectedOption === currentQ.correct && (
                <div className="animate-slide-up" style={{
                    position: 'fixed', bottom: '20%', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--accent)', color: 'black', padding: '12px 24px',
                    borderRadius: 'var(--radius-full)', fontWeight: 'bold', zIndex: 100
                }}>
                    +100 XP!
                </div>
            )}
        </div>
    );
};

export default GamifiedQuiz;
