import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { Post } from '../../services/api';
import { MessageSquare, ThumbsUp, Plus, Award, Zap } from 'lucide-react';

const CommunityWidget = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [showNewPostForm, setShowNewPostForm] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await api.get('/social/community/posts');
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch posts", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newPost = await api.post('/social/community/posts', {
                title: newPostTitle,
                content: newPostContent,
                tags: ['General'] // Default tag for now
            });
            setPosts([newPost, ...posts]);
            setShowNewPostForm(false);
            setNewPostTitle('');
            setNewPostContent('');
        } catch (error) {
            console.error("Failed to create post", error);
        }
    };

    if (loading) return <div className="card p-4">Loading community...</div>;

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-4)' }}>
                <div>
                    <h2 className="text-2xl">Community Hub</h2>
                    <p className="text-muted">Ask questions, share knowledge, and earn badges.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowNewPostForm(!showNewPostForm)}>
                    <Plus size={18} style={{ marginRight: '8px' }} />
                    New Discussion
                </button>
            </div>

            {showNewPostForm && (
                <div className="card glass-panel animate-fade-in" style={{ marginBottom: 'var(--spacing-4)', border: '1px solid var(--accent)' }}>
                    <form onSubmit={handleCreatePost}>
                        <div style={{ padding: 'var(--spacing-3)' }}>
                            <div style={{ marginBottom: 'var(--spacing-3)' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--accent)' }}>TITLE</label>
                                <input
                                    type="text"
                                    value={newPostTitle}
                                    onChange={(e) => setNewPostTitle(e.target.value)}
                                    placeholder="What's on your mind?"
                                    style={{
                                        width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
                                        background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)',
                                        color: 'white', fontFamily: 'var(--font-main)'
                                    }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: 'var(--spacing-3)' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--accent)' }}>CONTENT</label>
                                <textarea
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    placeholder="Describe your question or idea..."
                                    style={{
                                        width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
                                        background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)',
                                        minHeight: '100px',
                                        color: 'white', fontFamily: 'var(--font-main)'
                                    }}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" className="btn btn-ghost" onClick={() => setShowNewPostForm(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">
                                    <Zap size={16} style={{ marginRight: '8px' }} /> Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {posts.map((post, idx) => (
                    <div key={post.id} className="card glass-panel hover-scale" style={{
                        animationDelay: `${idx * 0.1}s`,
                        borderLeft: `3px solid ${idx % 2 === 0 ? 'var(--primary)' : 'var(--neon-green)'}`,
                        transition: 'transform 0.2s, box-shadow 0.2s'
                    }}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl" style={{ marginBottom: '8px', fontWeight: 600 }}>{post.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)' }}>
                                        <Award size={14} />
                                        <span style={{ fontWeight: 'bold' }}>{post.author_name}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {post.tags.map(tag => (
                                    <span key={tag} style={{
                                        padding: '4px 10px', borderRadius: 'var(--radius-full)',
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--glass-border)',
                                        fontSize: '0.7rem', color: 'var(--text-muted)',
                                        textTransform: 'uppercase', letterSpacing: '0.5px'
                                    }}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <p style={{ margin: 'var(--spacing-3) 0', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
                            {post.content}
                        </p>

                        <div className="flex gap-4 text-muted text-sm" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '12px', marginTop: '16px' }}>
                            <button className="btn-ghost" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                                <ThumbsUp size={16} style={{ marginRight: '6px' }} /> {post.likes} Likes
                            </button>
                            <button className="btn-ghost" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                                <MessageSquare size={16} style={{ marginRight: '6px' }} /> {post.replies.length} Replies
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default CommunityWidget;
