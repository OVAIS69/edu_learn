
import { BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NeuralPathWidget = () => {
    const navigate = useNavigate();

    // Mock Mini-Graph Data
    const nodes = [
        { id: 1, x: 20, y: 50, status: 'completed', label: 'Basics' },
        { id: 2, x: 50, y: 30, status: 'active', label: 'Core' },
        { id: 3, x: 80, y: 60, status: 'locked', label: 'Mastery' },
    ];

    return (
        <div
            className="card relative overflow-hidden group cursor-pointer hover:border-cyan-500/50 transition-all duration-300"
            style={{ height: '300px', background: 'radial-gradient(circle at center, #0B0B15 0%, #000000 100%)' }}
            onClick={() => navigate('/neural-map')}
        >
            {/* Header */}
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                    <BrainCircuit size={18} className="text-cyan-400" /> Neural Path
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">Current Focus: Algorithms</p>
            </div>

            {/* Mini SVG Graph */}
            <svg className="w-full h-full absolute left-0 top-12 pointer-events-none">
                <defs>
                    <linearGradient id="mini-edge" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.8" />
                    </linearGradient>
                </defs>

                {/* Edges */}
                <line x1="20%" y1="50%" x2="50%" y2="30%" stroke="url(#mini-edge)" strokeWidth="2" strokeLinecap="round" />
                <line x1="50%" y1="30%" x2="80%" y2="60%" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

                {/* Nodes */}
                {nodes.map((node) => (
                    <g key={node.id}>
                        {node.status === 'active' && (
                            <circle cx={`${node.x}%`} cy={`${node.y}%`} r="12" fill="var(--accent)" opacity="0.2" className="animate-ping" />
                        )}
                        <circle
                            cx={`${node.x}%`} cy={`${node.y}%`} r="6"
                            fill="#0f172a"
                            stroke={node.status === 'active' ? 'var(--accent)' : node.status === 'completed' ? 'var(--neon-green)' : '#334155'}
                            strokeWidth="2"
                        />
                        {node.status === 'completed' && (
                            <circle cx={`${node.x}%`} cy={`${node.y}%`} r="2" fill="var(--neon-green)" />
                        )}

                        {/* Label */}
                        <text
                            x={`${node.x}%`} y={`${node.y + 15}%`}
                            textAnchor="middle"
                            fill={node.status === 'locked' ? '#aaabbb' : 'white'}
                            fontSize="10"
                            fontFamily="var(--font-pixel)"
                            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                        >
                            {node.label}
                        </text>
                    </g>
                ))}
            </svg>

            {/* Overlay Text */}
            <div className="absolute bottom-4 right-4 text-xs text-slate-500 font-mono group-hover:text-cyan-400 transition-colors">
                View Full Map →
            </div>
        </div>
    );
};

export default NeuralPathWidget;
