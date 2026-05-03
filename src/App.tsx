import { Ship, Copy, Settings2, Terminal, Target, Sun, Moon } from 'lucide-react';
import { useState, useMemo } from 'react';

/**
 * 【黃金比例細節優化版】
 * 修正：調淡球頭裝飾線、保留亮色模式下的中心灰色芯
 */
const ShuttlecockIcon = ({ size, opacity, stroke, corkScale, isDark }: { size: number, opacity: number, stroke: number, corkScale: number, isDark: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
    <defs>
      {/* 定義裁剪路徑，確保格線不溢出羽毛邊界 */}
      <clipPath id="shuttlecock-mask-final">
        <path d="M12 16L7 5L12 2L17 5L12 16Z" />
        <path d="M12 14L5.5 4.5L8.5 2.5L12 12Z" />
        <path d="M12 14L18.5 4.5L15.5 2.5L12 12Z" />
      </clipPath>
    </defs>

    {/* 1. 羽毛主體：強制填色為白色以維持本體質感[cite: 1] */}
    <path d="M12 14L5.5 4.5L8.5 2.5L12 12Z" fill="white" fillOpacity={opacity} />
    <path d="M12 14L18.5 4.5L15.5 2.5L12 12Z" fill="white" fillOpacity={opacity} />
    <path d="M12 16L7 5L12 2L17 5L12 16Z" fill="white" />

    {/* 2. 橫向格線：受遮罩保護且調整透明度[cite: 1] */}
    <g clipPath="url(#shuttlecock-mask-final)">
      <path d="M2 7.5H22" stroke="currentColor" opacity="0.4" />
      <path d="M2 10.5H22" stroke="currentColor" opacity="0.4" />
    </g>

    {/* 3. 中心灰色芯：亮色模式下保留細節[cite: 1] */}
    <path d="M12 15.2L9.2 6.2L12 4.4L14.8 6.2L12 15.2Z" fill={isDark ? "black" : "#64748b"} fillOpacity="0.15" />
    
    {/* 4. 木製球頭：0.7x 縮放與輕量化裝飾線[cite: 1] */}
    <g style={{ transform: `scale(${corkScale})`, transformOrigin: '12px 16px' }}>
      <path d="M8.5 15.5C8.5 14 10 12.5 12 12.5C14 12.5 15.5 13.5 15.5 15.5C15.5 18.5 14 20.5 12 20.5C10 20.5 8.5 18.5 8.5 15.5Z" fill="white" />
      {/* 將球頭黑色裝飾線調淡 (使用 opacity 降低突兀感)[cite: 1] */}
      <path d="M9 14.5H15" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
      <path d="M9 17.5H15" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
      {/* 外框細線 */}
      <path d="M8.5 15.5C8.5 14 10 12.5 12 12.5C14 12.5 15.5 13.5 15.5 15.5C15.5 18.5 14 20.5 12 20.5C10 20.5 8.5 18.5 8.5 15.5Z" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    </g>
  </svg>
);

const DachuanLabConsole = () => {
  const [activeTab, setActiveTab] = useState<'ship' | 'shuttlecock'>('shuttlecock');
  const [isDark, setIsDark] = useState(true); 
  
  // --- 狀態控制：預設使用你的黃金參數[cite: 1] ---
  const [bounceHeight, setBounceHeight] = useState(-300); 
  const [shuttleOpacity, setShuttleOpacity] = useState(0.3); 
  const [shuttleStroke, setShuttleStroke] = useState(0.7); 
  const [corkScale, setCorkScale] = useState(0.7); 
  const [shipStroke, setShipStroke] = useState(1.0); 

  const currentPrompt = useMemo(() => {
    return activeTab === 'ship' 
      ? `[Dachuan Ship] 線條寬度 ${shipStroke}，2.5s 優雅漂浮。`
      : `[TGB Final] 0.7x 球頭，白色羽毛，格線裁剪，-300px 彈跳[cite: 1]。`;
  }, [activeTab, shipStroke, corkScale, shuttleOpacity, bounceHeight]);

  return (
    <div className={`flex h-screen w-full transition-colors duration-500 font-sans overflow-hidden ${isDark ? 'bg-[#0b0e14] text-slate-400' : 'bg-white text-slate-900'}`}>
      
      {/* 左側預覽 */}
      <div 
        className={`flex-1 relative flex flex-col items-center justify-center border-r transition-colors duration-500 ${isDark ? 'border-white/5' : 'border-slate-100'}`}
        style={{ '--bounce-height': `${bounceHeight}px` } as any}
      >
        <div className={`absolute top-8 flex backdrop-blur-2xl p-1.5 rounded-2xl border transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
          <button onClick={() => setActiveTab('ship')} className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'ship' ? 'bg-blue-600 text-white shadow-lg' : 'hover:opacity-60'}`}>🚢 大船模式</button>
          <button onClick={() => setActiveTab('shuttlecock')} className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'shuttlecock' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:opacity-60'}`}>🏸 羽球模式</button>
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
          <style>{`
            @keyframes shuttlecock-bounce {
              0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.15, 0.85, 0.35, 1); }
              50% { transform: translateY(var(--bounce-height)); animation-timing-function: cubic-bezier(0.8, 0, 1, 0.2); }
            }
            .animate-shuttlecock { animation: shuttlecock-bounce 1.4s infinite; }
            @keyframes ship-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
            .animate-ship { animation: ship-float 2.5s ease-in-out infinite; }
          `}</style>
          
          <div className={activeTab === 'shuttlecock' ? 'animate-shuttlecock' : 'animate-ship'}>
            {activeTab === 'shuttlecock' ? (
              <ShuttlecockIcon size={120} opacity={shuttleOpacity} stroke={shuttleStroke} corkScale={corkScale} isDark={isDark} />
            ) : (
              <Ship size={120} strokeWidth={shipStroke} className="text-blue-500 drop-shadow-2xl" />
            )}
          </div>
        </div>
      </div>

      {/* 右側面板 */}
      <div className={`w-[450px] flex flex-col p-10 z-50 shadow-2xl border-l transition-colors duration-500 ${isDark ? 'bg-[#0f1117] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
        <div className="flex justify-between items-start mb-10">
          <div className="border-l-4 border-indigo-600 pl-6">
            <h1 className={`text-xl font-black uppercase tracking-tighter italic ${isDark ? 'text-white' : 'text-slate-900'}`}>實驗室控制台</h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Operator: 挨滴</p>
          </div>
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-2xl border transition-all ${isDark ? 'border-white/10 bg-white/5 hover:bg-white/10 text-yellow-400' : 'border-slate-300 bg-white hover:bg-slate-100 text-indigo-600 shadow-sm'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
          <section className={`p-6 rounded-3xl border transition-all ${activeTab === 'ship' ? 'bg-blue-500/5 border-blue-500/20' : 'opacity-30 border-transparent'}`}>
            <h2 className="text-xs font-bold text-blue-400 mb-6 flex items-center gap-2 uppercase tracking-widest"><Settings2 size={14}/> 🚢 大船參數</h2>
            <div className="space-y-3">
              <span className="text-[11px] block opacity-60 font-mono">線條粗細: {shipStroke}</span>
              <input type="range" min="0.1" max="2.0" step="0.1" value={shipStroke} onChange={(e) => setShipStroke(Number(e.target.value))} className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-500" />
            </div>
          </section>

          <section className={`p-6 rounded-3xl border transition-all ${activeTab === 'shuttlecock' ? 'bg-indigo-500/5 border-indigo-500/20' : 'opacity-30 border-transparent'}`}>
            <h2 className="text-xs font-bold text-indigo-400 mb-6 flex items-center gap-2 uppercase tracking-widest"><Settings2 size={14}/> 🏸 羽球參數</h2>
            <div className="space-y-6">
              <div><span className="text-[11px] block mb-2 font-mono opacity-60">彈跳高度: {bounceHeight}px</span><input type="range" min="-500" max="-50" step="10" value={bounceHeight} onChange={(e) => setBounceHeight(Number(e.target.value))} className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-indigo-500" /></div>
              <div><span className="text-[11px] block mb-2 font-mono opacity-60">球頭大小: {corkScale}x</span><input type="range" min="0.4" max="1.5" step="0.05" value={corkScale} onChange={(e) => setCorkScale(Number(e.target.value))} className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-indigo-500" /></div>
              <div><span className="text-[11px] block mb-2 font-mono opacity-60">羽毛透明度: {shuttleOpacity}</span><input type="range" min="0.05" max="0.6" step="0.05" value={shuttleOpacity} onChange={(e) => setShuttleOpacity(Number(e.target.value))} className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-indigo-500" /></div>
            </div>
          </section>
        </div>

        <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert("指令已同步複製！"); }} className="mt-8 w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-bold shadow-2xl transition-all active:scale-[0.98]">
          <Copy size={18} /> 複製 AI 指令
        </button>
      </div>
    </div>
  );
};

export default DachuanLabConsole;