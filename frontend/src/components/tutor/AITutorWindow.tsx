import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Mic, Volume2, Clock, X } from 'lucide-react';
import { api } from '../../services/api';

interface Message {
    id: number;
    sender: 'user' | 'ai';
    text: string;
    audioUrl?: string;
}

const AITutorWindow = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'ai', text: "Hello! I'm EduBot. How can I help you learn today?" },
    ]);
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isTTSActive, setIsTTSActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Prepare history for API
            const history = messages.map(m => ({ role: m.sender === 'ai' ? 'assistant' : 'user', content: m.text }));

            const data = await api.chatWithTutor(userMsg.text, history);
            const aiText = data.response;

            let audioUrl = undefined;
            if (isTTSActive) {
                try {
                    const ttsData = await api.textToSpeech(aiText);
                    // Prepend backend URL if needed, assuming proxy or full URL
                    audioUrl = `https://edulearn-ai.onrender.com${ttsData.audio_url}`;
                    const audio = new Audio(audioUrl);
                    audio.play();
                } catch (err) {
                    console.error("TTS Error:", err);
                }
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiText, audioUrl }]);

        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioFile = new File([audioBlob], "recording.wav", { type: "audio/wav" });

                setIsLoading(true);
                try {
                    const data = await api.transcribeAudio(audioFile);
                    setInput(data.text);
                } catch (error) {
                    console.error("Transcription Error:", error);
                    alert("Failed to transcribe audio.");
                } finally {
                    setIsLoading(false);
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Microphone Access Error:", error);
            alert("Could not access microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            // Stop all tracks to release microphone
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    return (
        <div className="container animate-fade-in" style={{
            display: 'grid', gridTemplateColumns: '250px 1fr',
            height: 'calc(100vh - 100px)', gap: 'var(--spacing-4)',
            marginTop: 'var(--spacing-4)'
        }}>

            {/* --- Sidebar: History --- */}
            <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: 'var(--spacing-3)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={18} color="var(--accent)" />
                    <h3 style={{ fontSize: '1rem' }}>Chat History</h3>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-2)' }}>
                    <div className="btn-ghost" style={{ justifyContent: 'flex-start', fontSize: '0.9rem', marginBottom: '4px' }}>
                        Today's Session
                    </div>
                    <div className="btn-ghost" style={{ justifyContent: 'flex-start', fontSize: '0.9rem', opacity: 0.6 }}>
                        Calculus Review
                    </div>
                </div>
            </div>

            {/* --- Main Chat Area --- */}
            <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

                {/* Header */}
                <div style={{
                    padding: 'var(--spacing-3)', borderBottom: '1px solid var(--glass-border)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            background: 'rgba(124, 58, 237, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 15px var(--primary)', border: '1px solid var(--primary-glow)'
                        }}>
                            <Bot size={24} className="text-violet-400" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)' }}>EduBot AI</h3>
                            <div style={{ fontSize: '0.75rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span className={isRecording || isTTSActive ? "animate-pulse" : ""} style={{ width: 6, height: 6, borderRadius: '50%', background: isRecording ? 'var(--error)' : 'var(--neon-green)' }}></span>
                                {isRecording ? "Listening..." : "Online • Voice Enabled"}
                            </div>
                        </div>
                    </div>

                    {/* Audio Visualizer Simulation */}
                    {(isRecording || isLoading) && (
                        <div style={{ display: 'flex', gap: '2px', alignItems: 'center', height: '20px' }}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="animate-pulse" style={{
                                    width: '3px',
                                    height: '100%',
                                    background: 'var(--accent)',
                                    animationDelay: `${i * 0.1}s`,
                                    transform: 'scaleY(0.5)'
                                }}></div>
                            ))}
                        </div>
                    )}

                    <button
                        className="btn-ghost"
                        onClick={() => setIsTTSActive(!isTTSActive)}
                        title={isTTSActive ? "Mute Voice" : "Enable Voice"}
                    >
                        {isTTSActive ? <Volume2 size={20} color="var(--neon-green)" /> : <Volume2 size={20} color="var(--text-muted)" style={{ opacity: 0.5 }} />}
                    </button>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, padding: 'var(--spacing-4)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {messages.map(msg => (
                        <div key={msg.id} style={{
                            display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        }}>
                            <div style={{
                                padding: '12px 16px',
                                borderRadius: '16px',
                                borderTopLeftRadius: msg.sender === 'ai' ? '4px' : '16px',
                                borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
                                background: msg.sender === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                border: msg.sender === 'ai' ? '1px solid var(--glass-border)' : 'none',
                                maxWidth: '70%',
                                position: 'relative'
                            }}>
                                <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{msg.text}</p>
                                {msg.audioUrl && (
                                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--accent)', cursor: 'pointer' }}
                                        onClick={() => new Audio(msg.audioUrl).play()}>
                                        <Volume2 size={14} /> Replay Audio
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', borderTopLeftRadius: '4px' }}>
                                <div className="flex gap-1">
                                    <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
                                    <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} style={{
                    padding: 'var(--spacing-3)', borderTop: '1px solid var(--glass-border)',
                    display: 'flex', gap: '12px', alignItems: 'center',
                    background: 'rgba(0,0,0,0.2)'
                }}>
                    <button
                        type="button"
                        className={`btn ${isRecording ? 'btn-danger' : 'btn-ghost'}`}
                        onClick={isRecording ? stopRecording : startRecording}
                        style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {isRecording ? <X size={20} className="animate-pulse" /> : <Mic size={20} />}
                    </button>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isRecording ? "Listening..." : "Type your question..."}
                        style={{
                            flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
                            padding: '10px 16px', borderRadius: 'var(--radius-full)',
                            color: 'white', outline: 'none'
                        }}
                        disabled={isRecording}
                    />

                    <button type="submit" className="btn btn-primary" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} disabled={!input.trim() || isRecording}>
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AITutorWindow;
