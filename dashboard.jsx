import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import { 
  TrendingUp, Users, Clock, Globe, Mail, Phone, ExternalLink, 
  Linkedin, Award, Briefcase, ChevronRight, Database, Code, 
  CheckCircle, Zap, LayoutTemplate 
} from 'lucide-react';

// --- DATA SOURCE (Strictly Aligned with Resume "Structured Data Object") ---
const RESUME_DATA = {
  profile: {
    name: "Jimmy Doorenweerd",
    title: "Account Executive | Customer Success Manager",
    subtitle: "B2B SaaS | AI Automation | NRR Growth",
    location: "Marbella, Spain",
    availability: "Willing to work CET & EST Hours",
    phone: "+34 669 430 123",
    email: "jdelcaribe@gmail.com",
    linkedin: "linkedin.com/in/jimmy-doorenweerd",
    website: "jimmydoorenweerd.com"
  },
  kpis: [
    { label: "ARR Turnaround", value: "€19k → €28k", sub: "in 6 Months", icon: TrendingUp, color: "text-emerald-400" },
    { label: "Efficiency Gain", value: "2+ Hrs", sub: "Saved Per Account via AI", icon: Zap, color: "text-blue-400" },
    { label: "Deal Volume", value: "€6.1M", sub: "Property Sales Facilitated", icon: Briefcase, color: "text-purple-400" },
    { label: "Experience", value: "7+ Years", sub: "Remote SaaS & Sales", icon: Clock, color: "text-orange-400" }
  ],
  skills: {
    commercial: ["Net Revenue Retention (NRR)", "Churn Reduction", "QBRs/EBRs", "Pipeline Management", "Cross-selling", "Customer Journey Mapping"],
    technical: ["HubSpot CRM", "AI Agents (Automation)", "Zendesk", "Intercom", "Jira", "SaaS API Integrations"],
    languages: ["English (C2 - Proficient)", "Spanish (Native)", "Dutch (Conversational)"]
  },
  experience: [
    {
      id: "coastal",
      company: "Coastal Living Marbella",
      role: "Marbella Luxury Property Specialist",
      period: "March 2025 – Present",
      logoColor: "bg-blue-600",
      description: "Managing full-cycle high-stakes property sales and customer experience for international buyers.",
      achievements: [
        "Facilitated €6.1M in property sales across 5 major deals.",
        "Mapped end-to-end buyer journey reducing friction and speeding up deal cycles.",
        "Increased inbound lead volume via targeted digital content strategies.",
        "Designed post-sale retention loops to drive high referral rates."
      ]
    },
    {
      id: "hostaway",
      company: "Hostaway",
      role: "Account Executive (B2B SaaS)",
      period: "Dec 2017 – Feb 2025",
      logoColor: "bg-red-500",
      description: "Hybrid Hunter/Farmer role driving NRR, retention, and expansion for a high-growth SaaS platform.",
      achievements: [
        "Turned around a critical €19K ARR account to €28K (+47%) in 6 months.",
        "Automated call analysis with AI agents, saving 2+ hours per account/week.",
        "Reduced churn by utilizing HubSpot for omnichannel risk mitigation.",
        "Closed €2.8K MRR outbound deals and managed full onboarding lifecycle."
      ],
      chartData: [
        { month: 'M1', arr: 19000 },
        { month: 'M2', arr: 20500 },
        { month: 'M3', arr: 22000 },
        { month: 'M4', arr: 24500 },
        { month: 'M5', arr: 26000 },
        { month: 'M6', arr: 28000 },
      ]
    },
    {
      id: "correyvuela",
      company: "Correyvuela",
      role: "Sales Manager",
      period: "June 2017 – Oct 2017",
      logoColor: "bg-indigo-500",
      description: "Driving commercial strategy and reseller incentive programs.",
      achievements: [
        "Identified new market opportunities accelerating growth targets.",
        "Designed reseller incentive programs to expand portfolio reach."
      ]
    },
    {
      id: "bossar",
      company: "Bossar Packaging, SA",
      role: "Head of Strategic Purchasing",
      period: "Feb 2012 – May 2017",
      logoColor: "bg-slate-500",
      description: "Strategic procurement and complex spend analysis.",
      achievements: [
        "Leveraged market expertise to analyze complex spend data for cost reduction.",
        "Led negotiations with key strategic suppliers to align with target costing."
      ]
    },
    {
      id: "colt",
      company: "Colt Technology Services",
      role: "Inside Sales Account Executive",
      period: "June 2010 – Feb 2012",
      logoColor: "bg-orange-500",
      description: "High-volume sales and retention focus in the Benelux market.",
      achievements: [
        "Exceeded sales objectives and earned 2011 Achievement Award.",
        "Minimized churn through portfolio data analysis and targeted campaigns.",
        "Expanded sales coverage into Germany and UK markets."
      ]
    }
  ]
};

const MetricCard = ({ icon: Icon, label, value, sub, color }) => (
  <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg bg-slate-700/50 ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      {label === "ARR Turnaround" && (
        <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-1 rounded-full font-medium">
          Top Result
        </span>
      )}
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-slate-400 text-sm font-medium">{label}</div>
    <div className="text-slate-500 text-xs mt-2">{sub}</div>
  </div>
);

const SkillPill = ({ text, type }) => {
  let colorClass = "bg-slate-700 text-slate-300";
  if (type === 'tech') colorClass = "bg-blue-900/30 text-blue-300 border border-blue-800";
  if (type === 'comm') colorClass = "bg-emerald-900/30 text-emerald-300 border border-emerald-800";
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2 inline-flex items-center ${colorClass}`}>
      {type === 'tech' && <Database size={10} className="mr-1.5" />}
      {type === 'comm' && <Award size={10} className="mr-1.5" />}
      {text}
    </span>
  );
};

export default function JimmyDashboard() {
  const [activeTab, setActiveTab] = useState('hostaway');

  const activeRole = RESUME_DATA.experience.find(exp => exp.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <h1 className="text-white font-bold text-lg leading-tight">Jimmy Doorenweerd</h1>
                <p className="text-xs text-slate-400">Interactive Career Dashboard</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-900/10 px-3 py-1 rounded-full border border-emerald-900/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold tracking-wide">OPEN TO WORK (CET / EST)</span>
              </div>
              <a href={`mailto:${RESUME_DATA.profile.email}`} className="text-sm font-medium hover:text-white transition-colors">Contact</a>
              <a href={`https://${RESUME_DATA.profile.linkedin}`} target="_blank" rel="noreferrer" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* --- HERO SECTION --- */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">
                Revenue Architect & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Customer Success Operator
                </span>
              </h2>
              <p className="text-slate-400 max-w-2xl text-lg">
                I don't just manage accounts; I engineer growth. Specializing in turning around at-risk portfolios, driving NRR, and automating workflows with AI.
              </p>
            </div>
            <div className="flex gap-3">
               <button onClick={() => window.open(`https://${RESUME_DATA.profile.linkedin}`, '_blank')} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 font-medium transition-all flex items-center gap-2">
                 <Globe size={16} /> Portfolio
               </button>
               <button onClick={() => window.location.href = `mailto:${RESUME_DATA.profile.email}`} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 font-medium transition-all flex items-center gap-2">
                 <Mail size={16} /> Email Me
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESUME_DATA.kpis.map((kpi, index) => (
              <MetricCard key={index} {...kpi} />
            ))}
          </div>
        </section>

        {/* --- MAIN DASHBOARD CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Experience Navigator */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-blue-400" />
                Experience Log
              </h3>
              <div className="space-y-3">
                {RESUME_DATA.experience.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => setActiveTab(exp.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 border group ${
                      activeTab === exp.id 
                        ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-900/20' 
                        : 'bg-slate-800 border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm font-bold ${activeTab === exp.id ? 'text-blue-300' : 'text-slate-300'}`}>
                        {exp.company}
                      </span>
                      {activeTab === exp.id && <ChevronRight size={16} className="text-blue-400" />}
                    </div>
                    <div className="text-xs text-slate-400 truncate">{exp.role}</div>
                    <div className="text-[10px] text-slate-500 mt-2 uppercase tracking-wider">{exp.period}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* SKILLS SECTION (Mobile/Tablet Friendly) */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <LayoutTemplate size={20} className="text-emerald-400" />
                Tech & Skills Stack
              </h3>
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Commercial</h4>
                <div className="flex flex-wrap">
                  {RESUME_DATA.skills.commercial.map(skill => <SkillPill key={skill} text={skill} type="comm" />)}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Technical</h4>
                <div className="flex flex-wrap">
                  {RESUME_DATA.skills.technical.map(skill => <SkillPill key={skill} text={skill} type="tech" />)}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Detailed View & Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Role Detail Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 md:p-8 min-h-[500px] flex flex-col">
              
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-8 border-b border-slate-700 pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    {activeRole.company}
                    <span className="text-sm font-normal text-slate-400 bg-slate-700 px-3 py-1 rounded-full border border-slate-600">
                      {activeRole.period}
                    </span>
                  </h2>
                  <p className="text-blue-400 font-medium text-lg mt-1">{activeRole.role}</p>
                  <p className="text-slate-400 mt-2 max-w-xl italic">"{activeRole.description}"</p>
                </div>
                {/* Visual Indicator for Chart Availability */}
                {activeRole.chartData && (
                  <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-900/20 px-3 py-1.5 rounded-lg border border-emerald-900/50">
                    <TrendingUp size={14} />
                    GROWTH DATA AVAILABLE
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
                {/* Achievements List */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Key Wins & Impact</h4>
                  <ul className="space-y-3">
                    {activeRole.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <CheckCircle size={18} className="text-emerald-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dynamic Visualization based on role */}
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 flex flex-col justify-center items-center">
                  {activeRole.chartData ? (
                    <>
                      <div className="w-full flex justify-between items-center mb-4 px-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase">ARR Growth Strategy</span>
                        <span className="text-[10px] text-slate-500">6 Month Turnaround</span>
                      </div>
                      <div className="w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={activeRole.chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={(value) => `€${value/1000}k`} tickLine={false} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                              itemStyle={{ color: '#34d399' }}
                              formatter={(value) => [`€${value.toLocaleString()}`, "ARR"]}
                            />
                            <Line type="monotone" dataKey="arr" stroke="#34d399" strokeWidth={3} dot={{ fill: '#34d399', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-center text-xs text-slate-500 mt-2">Visualized: €19k to €28k expansion trajectory</p>
                    </>
                  ) : (
                    <div className="text-center p-6 opacity-60">
                      <Users size={48} className="mx-auto text-slate-600 mb-3" />
                      <p className="text-sm text-slate-400 font-medium">Relationship Management Focus</p>
                      <p className="text-xs text-slate-500 mt-1">Managed high-value stakeholders and negotiations</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* --- FOOTER --- */}
        <footer className="border-t border-slate-800 pt-8 pb-10 text-center text-slate-500 text-sm">
          <div className="flex justify-center gap-6 mb-4">
             <a href={`https://${RESUME_DATA.profile.website}`} className="hover:text-blue-400 transition-colors">Portfolio</a>
             <a href={`https://${RESUME_DATA.profile.linkedin}`} className="hover:text-blue-400 transition-colors">LinkedIn</a>
             <a href={`mailto:${RESUME_DATA.profile.email}`} className="hover:text-blue-400 transition-colors">Email</a>
          </div>
          <p>© 2026 Jimmy Doorenweerd. Built with React & Tailwind CSS.</p>
          <p className="mt-2 text-xs opacity-50">Optimized for Remote-First, Data-Driven Teams.</p>
        </footer>

      </main>
    </div>
  );
}