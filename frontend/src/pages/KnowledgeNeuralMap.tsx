import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Share2, ChevronRight, Lock, Sparkles } from 'lucide-react';

// --- Types ---
type NodeStatus = 'locked' | 'active' | 'completed';

interface Node {
    id: string;
    label: string;
    x: number;
    y: number;
    status: NodeStatus;
    mastery: number; // 0-100
    type: 'core' | 'elective' | 'project';
}

interface Edge {
    source: string;
    target: string;
    active: boolean;
    duration: string;
}

// --- Mock Data: The Knowledge Graph ---
const initialNodes: Node[] = [
    { id: 'n1', label: 'Python Basics', x: 50, y: 80, status: 'completed', mastery: 100, type: 'core' },
    { id: 'n2', label: 'Data Structures', x: 30, y: 60, status: 'completed', mastery: 90, type: 'core' },
    { id: 'n3', label: 'Algorithms', x: 70, y: 60, status: 'active', mastery: 45, type: 'core' },
    { id: 'n4', label: 'Web Dev', x: 20, y: 40, status: 'locked', mastery: 0, type: 'elective' },
    { id: 'n5', label: 'React.js', x: 30, y: 25, status: 'locked', mastery: 0, type: 'elective' },
    { id: 'n6', label: 'Machine Learning', x: 80, y: 40, status: 'locked', mastery: 0, type: 'project' },
    { id: 'n7', label: 'Neural Networks', x: 70, y: 20, status: 'locked', mastery: 0, type: 'project' },
];

const initialEdges: Edge[] = [
    { source: 'n1', target: 'n2', active: true, duration: '3.2s' },
    { source: 'n1', target: 'n3', active: true, duration: '2.5s' },
    { source: 'n2', target: 'n4', active: false, duration: '4.0s' },
    { source: 'n4', target: 'n5', active: false, duration: '3.0s' },
    { source: 'n3', target: 'n6', active: false, duration: '2.8s' },
    { source: 'n6', target: 'n7', active: false, duration: '3.5s' },
];

const KnowledgeNeuralMap = () => {
    const navigate = useNavigate();
    const [nodes] = useState(initialNodes);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Animation Ref for "Pulse"
    const svgRef = useRef<SVGSVGElement>(null);

    // Helper to get color based on status
    const getNodeColor = (status: NodeStatus) => {
        switch (status) {
            case 'completed': return 'var(--neon-green)';
            case 'active': return 'var(--accent)';
            case 'locked': return '#334155'; // Slate-700
            default: return '#fff';
        }
    };

    return (
        <div className="relative w-full h-screen bg-[#030305] overflow-hidden flex items-center justify-center text-white selection:bg-cyan-500/30">

            {/* Background Grid & Effects */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(109, 40, 217, 0.1) 0%, transparent 50%)',
                    backgroundSize: '100% 100%'
                }}
            />
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
                <div className="pointer-events-auto cursor-pointer flex items-center gap-3" onClick={() => navigate('/')}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                        <BrainCircuit size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold font-display tracking-tight leading-none">NEURAL<span className="text-cyan-400">MAP</span></h1>
                        <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Knowledge Graph v2.0</p>
                    </div>
                </div>
            </div>

            {/* Main SVG Graph */}
            <svg ref={svgRef} className="w-full h-full max-w-5xl max-h-[80vh] z-10" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="edge-gradient" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.8" />
                    </linearGradient>
                </defs>

                {/* Edges */}
                {initialEdges.map((edge, i) => {
                    const start = nodes.find(n => n.id === edge.source)!;
                    const end = nodes.find(n => n.id === edge.target)!;
                    const isActive = edge.active || (hoveredNode === edge.source || hoveredNode === edge.target);

                    return (
                        <g key={i}>
                            <line
                                x1={start.x} y1={start.y}
                                x2={end.x} y2={end.y}
                                stroke={isActive ? 'url(#edge-gradient)' : '#334155'}
                                strokeWidth={isActive ? 0.8 : 0.3}
                                strokeLinecap="round"
                                className="transition-all duration-500"
                            />
                            {/* Animated Pulse Packet */}
                            {edge.active && (
                                <circle r="0.8" fill="white" filter="url(#glow)">
                                    <animateMotion
                                        dur={edge.duration}
                                        repeatCount="indefinite"
                                        path={`M${start.x},${start.y} L${end.x},${end.y}`}
                                    />
                                </circle>
                            )}
                        </g>
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                    const isHovered = hoveredNode === node.id;
                    const isSelected = selectedNode?.id === node.id;
                    const color = getNodeColor(node.status);

                    return (
                        <g
                            key={node.id}
                            className="cursor-pointer transition-all duration-300"
                            onClick={() => setSelectedNode(node)}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            style={{ transformOrigin: `${node.x}px ${node.y}px`, transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
                        >
                            {/* Outer Glow Ring */}
                            {(node.status === 'active' || isHovered) && (
                                <circle
                                    cx={node.x} cy={node.y} r="6"
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="0.2"
                                    opacity="0.5"
                                    className="animate-pulse"
                                />
                            )}

                            {/* Main Node Shape */}
                            <circle
                                cx={node.x} cy={node.y} r={node.type === 'core' ? 4 : 3}
                                fill="#0f172a"
                                stroke={color}
                                strokeWidth={isSelected ? 1 : 0.5}
                                filter={node.status !== 'locked' ? 'url(#glow)' : ''}
                            />

                            {/* Inner Status Indicator */}
                            {node.status === 'completed' && (
                                <circle cx={node.x} cy={node.y} r="1.5" fill={color} />
                            )}
                            {node.status === 'active' && (
                                <circle cx={node.x} cy={node.y} r="1.5" fill={color} className="animate-ping" opacity="0.5" />
                            )}
                            {node.status === 'locked' && (
                                <text x={node.x} y={node.y + 1} textAnchor="middle" fontSize="2" fill="#475569" fontFamily="monospace">🔒</text>
                            )}

                            {/* Label */}
                            <text
                                x={node.x} y={node.y + 7}
                                textAnchor="middle"
                                fill={isHovered || isSelected ? 'white' : '#94a3b8'}
                                fontSize="2.5"
                                fontWeight={isHovered ? 'bold' : 'normal'}
                                className="font-display tracking-wide pointer-events-none select-none transition-colors duration-300"
                                style={{ textShadow: isHovered ? `0 0 10px ${color}` : 'none' }}
                            >
                                {node.label}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Detail Overlay (Right Panel) */}
            <div className={`absolute top-0 right-0 h-full w-96 bg-black/40 backdrop-blur-xl border-l border-white/10 p-8 transform transition-transform duration-500 ease-out z-40 ${selectedNode ? 'translate-x-0' : 'translate-x-full'}`}>
                {selectedNode && (
                    <div className="h-full flex flex-col animate-fade-in">
                        <button
                            onClick={() => setSelectedNode(null)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>

                        <div className="mt-12 mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 mb-4 uppercase tracking-widest">
                                {selectedNode.type} Node
                            </div>
                            <h2 className="text-4xl font-bold font-display mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                {selectedNode.label}
                            </h2>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <span className={`w-2 h-2 rounded-full ${selectedNode.status === 'active' ? 'bg-cyan-400 animate-pulse' : selectedNode.status === 'completed' ? 'bg-green-400' : 'bg-slate-600'}`} />
                                <span className="capitalize">{selectedNode.status}</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-300">Mastery</span>
                                <span className="font-mono text-cyan-400">{selectedNode.mastery}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-1000"
                                    style={{ width: `${selectedNode.mastery}%` }}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            {selectedNode.status === 'locked' ? (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-200">
                                    <Lock size={20} />
                                    <span className="text-sm">Complete previous nodes to unlock.</span>
                                </div>
                            ) : (
                                <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                    {selectedNode.status === 'completed' ? 'Review Module' : 'Start Learning'}
                                    <ChevronRight size={18} />
                                </button>
                            )}

                            <button className="w-full py-4 bg-white/5 text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                <Share2 size={18} /> Share Progress
                            </button>
                        </div>

                        {/* AI Insight */}
                        <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/5">
                            <div className="flex items-center gap-2 mb-2 text-purple-300 text-sm font-bold">
                                <Sparkles size={14} /> AI Insight
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {selectedNode.status === 'completed'
                                    ? "You've shown strong retention here. Ready to tackle the advanced project node?"
                                    : "This topic is crucial for the upcoming 'Machine Learning' project. Focus on the core concepts."}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KnowledgeNeuralMap;
