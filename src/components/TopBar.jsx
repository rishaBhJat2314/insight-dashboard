import { useState } from 'react'

const pill = 'flex items-center gap-2.5 bg-white rounded-full py-1 pl-2 pr-1 shadow-[0_2px_12px_rgba(0,0,0,0.4)] border border-black/5'

const ArrowCircle = () => (
  <span className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm shrink-0">→</span>
)

export default function TopBar() {
  const [mode, setMode] = useState('AUTO')

  return (
    <header
      className="absolute top-5 left-[72px] right-6 z-10 grid items-start gap-3 pointer-events-none"
      style={{ gridTemplateColumns: '1fr auto 1fr' }}
    >
      {/* Left */}
      <div className="flex flex-col items-start gap-2 pointer-events-auto">

        <div className={pill}>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-[13px] whitespace-nowrap">
            <span className="text-gray-400">Status</span>
            <span className="font-semibold text-gray-900"> On Mission 1234</span>
          </span>
          <button className="w-7 h-7 rounded-full bg-gray-900 text-white text-[11px] flex items-center justify-center shrink-0 hover:bg-gray-700 transition-colors">⏸</button>
        </div>

        <div className={`${pill} cursor-pointer`}>
          <span className="text-[12px] font-bold tracking-widest text-gray-900 whitespace-nowrap">QUICK GOAL</span>
          <ArrowCircle />
        </div>

      </div>

      {/* Center */}
      <div className="pointer-events-auto">
        <div className="flex items-center gap-3 bg-gray-950 rounded-full py-1 px-5 border border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.5)] whitespace-nowrap">

          <span className="flex items-center gap-1.5 text-[12px] text-white font-medium">
            <span className="text-emerald-400 font-bold text-[10px]">▮▮▮▮</span>100%
          </span>
          <span className="w-px h-3.5 bg-white/20 shrink-0" />

          <span className="flex items-center gap-1.5 text-[12px] text-white font-medium">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <rect x="0" y="7" width="2" height="5" fill="white" opacity="0.4"/>
              <rect x="3" y="5" width="2" height="7" fill="white" opacity="0.6"/>
              <rect x="6" y="3" width="2" height="9" fill="white" opacity="0.8"/>
              <rect x="9" y="1" width="2" height="11" fill="white"/>
            </svg>
            Strong
          </span>
          <span className="w-px h-3.5 bg-white/20 shrink-0" />

          <span className="flex items-center gap-1.5 text-[12px] text-white font-medium">
            Failsafe <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" /> Okay
          </span>
          <span className="w-px h-3.5 bg-white/20 shrink-0" />

          <span className="flex items-center gap-1.5 text-[12px] text-white font-medium">
            System <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" /> Okay
          </span>

        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-2 pointer-events-auto">

        <div className={pill}>
          <span className="text-[11px] font-bold text-gray-400 tracking-[0.12em] uppercase whitespace-nowrap">Mode</span>
          <div className="flex bg-gray-100 rounded-full p-0.5 gap-0.5">
            {['AUTO', 'MANUAL'].map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`py-1.5 px-3 rounded-full text-[11px] font-bold tracking-wide cursor-pointer transition-all duration-150 whitespace-nowrap ${
                  mode === m ? 'bg-gray-900 text-white' : 'bg-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className={`${pill} cursor-pointer`}>
          <span className="text-[12px] font-bold tracking-widest text-gray-900 whitespace-nowrap">INITIATE</span>
          <ArrowCircle />
        </div>

      </div>
    </header>
  )
}
