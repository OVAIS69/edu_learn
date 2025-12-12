const API_URL = 'https://edulearn-ai.onrender.com';

export const api = {
    get: async (endpoint: string) => {
        const response = await fetch(`${API_URL}${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },
    post: async (endpoint: string, data: unknown) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },
    // Tutor
    chatWithTutor: async (message: string, history: { role: string; content: string }[]) => {
        const response = await fetch(`${API_URL}/tutor/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, history })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },
    transcribeAudio: async (audioFile: File) => {
        const formData = new FormData();
        formData.append('file', audioFile);
        const response = await fetch(`${API_URL}/tutor/transcribe`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },
    textToSpeech: async (text: string) => {
        const response = await fetch(`${API_URL}/tutor/speak`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }
};

export interface Question {
    id: string;
    text: string;
    options: string[];
    difficulty: number;
    topic: string;
    subtopic: string;
}

export interface DiagnosticResult {
    score: number;
    weak_topics: string[];
    strong_topics: string[];
    learning_style: string;
}

export interface SkillGap {
    topic: string;
    severity: string;
    reason: string;
    recommended_action: string;
}

export interface Lesson {
    id: string;
    title: string;
    type: 'video' | 'text' | 'interactive';
    duration_minutes: number;
    topic: string;
    difficulty: number;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    condition: string;
}

export interface UserGamificationProfile {
    user_id: number;
    points: number;
    streak_days: number;
    badges: Badge[];
    level: number;
}

export interface Reply {
    id: string;
    author_name: string;
    content: string;
    created_at: string;
    is_solution: boolean;
}

export interface Post {
    id: string;
    author_name: string;
    title: string;
    content: string;
    tags: string[];
    created_at: string;
    replies: Reply[];
    likes: number;
}

export interface StudentPerformance {
    student_id: number;
    name: string;
    average_score: number;
    lessons_completed: number;
    active_gaps: number;
    last_active: string;
}

export interface ClassAnalytics {
    total_students: number;
    average_class_score: number;
    at_risk_count: number;
    top_weak_topics: string[];
    student_performances: StudentPerformance[];
}
