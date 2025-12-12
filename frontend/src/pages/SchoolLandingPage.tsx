import { Building2, Users, BarChart3, BrainCircuit, ArrowRight } from 'lucide-react';

const SchoolLandingPage = () => {

    return (
        <div className="min-h-screen bg-[#030305] text-white overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-6">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#030305] to-[#030305] pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8 animate-fade-in">
                        <Building2 size={16} /> EDUVERSE FOR SCHOOLS
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 leading-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">AI Operating System</span><br />
                        for Modern Education
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Empower your institution with adaptive learning, automated grading, and deep student analytics. The future of classroom management is here.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] flex items-center gap-2">
                            Request Demo <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-lg border border-white/10 transition-all">
                            View Pricing
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24 bg-white/5 border-y border-white/5">
                <div className="container mx-auto max-w-6xl px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: BrainCircuit,
                                title: "AI Teacher Assistant",
                                desc: "Automate lesson planning, worksheet generation, and grading. Save teachers 15+ hours per week."
                            },
                            {
                                icon: Users,
                                title: "Adaptive Classrooms",
                                desc: "Every student gets a personalized learning path. No one gets left behind, no one gets bored."
                            },
                            {
                                icon: BarChart3,
                                title: "Institutional Analytics",
                                desc: "Real-time dashboards for Principals and Admins to track performance across grades and subjects."
                            }
                        ].map((feat, i) => (
                            <div key={i} className="group">
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feat.icon size={32} className="text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Social Proof / Stats */}
            <div className="py-24 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Schools Partnered", val: "50+" },
                            { label: "Students Active", val: "10k+" },
                            { label: "Hours Saved", val: "5000+" },
                            { label: "Grade Improvement", val: "35%" }
                        ].map((stat, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                <div className="text-3xl font-bold text-white mb-2">{stat.val}</div>
                                <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 px-6">
                <div className="container mx-auto max-w-5xl bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-3xl p-12 border border-blue-500/20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-6">Ready to transform your school?</h2>
                        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
                            Join the network of forward-thinking institutions using EduVerse to drive excellence.
                        </p>
                        <button className="px-10 py-4 bg-white text-blue-900 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                            Get Started Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolLandingPage;
