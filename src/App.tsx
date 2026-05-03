import { Ship, Copy, Settings2, Target, Sun, Moon } from 'lucide-react';
import { useState, useMemo } from 'react';

const ShuttlecockIcon = ({ size, opacity, stroke, corkScale, isDark }: { size: number, opacity: number, stroke: number, corkScale: number, isDark: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
    <defs>
      <clipPath id="shuttlecock-mask-final">
        <path d="M12 16L7 5L12 2L17 5L12 16Z" />
        <path d="M12 14L5.5 4.5L8.5 2.5L12 12Z" />
        <path d="M12 14L18.5 4.5L15.5 2.5L12 12Z" />
      </clipPath>
    </defs>
    <path d="M12 14L5.5 4.5L8.5 2.5L12 12Z" fill="white" fillOpacity={opacity} />
    <path d="M12 14L18.5 4.5L15.5 2.5L12 12Z" fill="white" fillOpacity={opacity} />
    <path d="M12 16L7 5L12 2L17 5L12 16Z" fill="white" />
    <g clipPath="url(#shuttlecock-mask-final)">
      <path d="M2 7.5H22" stroke="currentColor" opacity="0.4" />
      <path d="M2 10.5H22" stroke="currentColor" opacity="0.4" />
    </g>
    <path d="M12 15.2L9.2 6.2L12 4.4L14.8 6.2L12 15.2Z" fill={isDark ? "black" : "#64748b"} fillOpacity="0.15" />
    <g style={{ transform: `scale(${corkScale})`, transformOrigin: '12px 16px' }}>
      <path d="M8.5 15.5C8.5 14 10 12.5 12 12.5C14 12.5 15.5 13.5 15.5 15.5C15.5 18.5 14 20.5 12 20.5C10 20.5 8.5 18.5 8.5 15.5Z" fill="white" />
      <path d="M9 14.5H15" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
      <path d="M9 17.5H15" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
      <path d="M8.5 15.5C8.5 14 10 12.5 12 12.5C14 12.5 15.5 13.5 15.5 15.5C15.5 18.5 14 20.5 12 20.5C10 20.5 8.5 18.5 8.5 15.5Z" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    </g>
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'ship' | 'shuttlecock'>('shuttlecock');
  const [isDark, setIsDark] = useState(true);
  const [bounceHeight, setBounceHeight] = useState(-300);
  const [shuttleOpacity, setShuttleOpacity] = useState(0.3);
  const [corkScale, setCorkScale] = useState(0.7);
  const [shipStroke, setShipStroke] = useState(1.0);

  const currentPrompt = useMemo(() => {
    return activeTab === 'ship' ? `[Dachuan Ship] Stroke: ${shipStroke}` : `TGB Shuttlecock v15.Final [Cork:${corkScale}x]`;
  }, [activeTab, corkScale, shipStroke]);

  return (
    <div className={`flex h-screen w-full transition-colors duration-500 ${isDark ? 'bg-[#0b0e14] text-slate-400' : 'bg-white text-slate-900'}`}>
      <div className={`flex-1 relative flex flex-col items-center justify-center border-r ${isDark ? 'border-white/5' : 'border-slate-100'}`} style={{ '--bounce-height': `${bounceHeight}px` } as any}>
        <div className={`absolute top-8 flex backdrop-blur-2xl p-1.5 rounded-2xl border z-50 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
          <button onClick={() => setActiveTab('ship')} className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'ship' ? 'bg-blue-600 text-white' : 'hover:opacity-60'}`}>🚢 大船模式</button>
          <button onClick={() => setActiveTab('shuttlecock')} className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'shuttlecock' ? 'bg-indigo-600 text-white' : 'hover:opacity-60'}`}>🏸 羽球模式</button>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
          <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.15, 0.85, 0.35, 1); } 50% { transform: translateY(var(--bounce-height)); animation-timing-function: cubic-bezier(0.8, 0, 1, 0.2); } } .animate-bounce-physics { animation: bounce 1.4s infinite; } @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } } .animate-float { animation: float 2.5s ease-in-out infinite; }`}</style>
          <div className={activeTab === 'shuttlecock' ? 'animate-bounce-physics' : 'animate-float'}>
            {activeTab === 'shuttlecock' ? <ShuttlecockIcon size={120} opacity={shuttleOpacity} stroke={0.7} corkScale={corkScale} isDark={isDark} /> : <Ship size={120} strokeWidth={shipStroke} className="text-blue-500 drop-shadow-2xl" />}
          </div>
        </div>
      </div>
      <div className={`w-[400px] p-10 flex flex-col z-50 ${isDark ? 'bg-[#0f1117]' : 'bg-slate-50 shadow-2xl'}`}>
        <div className="flex justify-between items-start mb-10">
          <div className="border-l-4 border-indigo-600 pl-4">
            <h1 className={`text-xl font-black italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>實驗室控制台</h1>
            <p className="text-[10px] font-mono uppercase opacity-50 tracking-widest">Operator: id30919</p>
          </div>
          <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded-2xl border transition-all ${isDark ? 'border-white/10 text-yellow-400 bg-white/5' : 'border-slate-300 text-indigo-600 bg-white'}`}>{isDark ? <Sun size={20}/> : <Moon size={20}/>}</button>
        </div>
        <div className="flex-1 space-y-10 overflow-y-auto custom-scrollbar">
          {activeTab === 'shuttlecock' ? (
            <section className="space-y-6">
              <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2"><Settings2 size={14}/> 羽球核心參數</h2>
              <div className="space-y-4">
                <label className="text-[11px] block opacity-60 font-mono">球頭大小: {corkScale}x</label>
                <input type="range" min="0.4" max="1.2" step="0.05" value={corkScale} onChange={(e) => setCorkScale(Number(e.target.value))} className="w-full h-1.5 accent-indigo-600 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                <label className="text-[11px] block opacity-60 font-mono">彈跳高度: {bounceHeight}px</label>
                <input type="range" min="-500" max="-100" step="10" value={bounceHeight} onChange={(e) => setBounceHeight(Number(e.target.value))} className="w-full h-1.5 accent-indigo-600 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
              </div>
            </section>
          ) : (
            <section className="space-y-6">
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2"><Settings2 size={14}/> 大船核心參數</h2>
              <div className="space-y-4">
                <label className="text-[11px] block opacity-60 font-mono">線條粗細: {shipStroke}</label>
                <input type="range" min="0.5" max="2.5" step="0.1" value={shipStroke} onChange={(e) => setShipStroke(Number(e.target.value))} className="w-full h-1.5 accent-blue-600 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
              </div>
            </section>
          )}
        </div>
        <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert("指令已同步至剪貼簿！"); }} className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"><Copy size={16}/> 複製 AI 指令</button>
      </div>
    </div>
  );
}