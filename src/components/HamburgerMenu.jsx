import { X, LayoutDashboard, Map, MapPin, Box, Settings2, TrendingUp, User } from 'lucide-react'
import EmergencyStop from './EmergencyStop'
import DPad from './DPad'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Map,             label: 'Map' },
  { icon: MapPin,          label: 'Goals' },
  { icon: Box,             label: 'Objects' },
  { icon: Settings2,       label: 'Settings' },
  { icon: TrendingUp,      label: 'Analytics' },
]

export default function HamburgerMenu({ isOpen, onClose, mode, setMode }) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-[#0d0e14] z-50 flex flex-col overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.07]">
          <div>
            <div className="text-white font-black tracking-[0.16em] text-base">ERIC</div>
            <div className="text-white/40 text-[8px] tracking-[0.22em]">ROBOTICS</div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 p-3 border-b border-white/[0.07]">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                active ? 'bg-white/15 text-white' : 'text-white/45 hover:bg-white/8 hover:text-white/75'
              }`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-white/45 hover:bg-white/8 hover:text-white/75 transition-colors">
            <User size={17} />
            Profile
          </button>
        </nav>

        <div className="md:hidden flex flex-col gap-3 p-4 border-b border-white/[0.07]">

          {/* Status */}
          <div className="flex items-center gap-2.5 bg-white rounded-full py-2 pl-4 pr-2 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-[13px] whitespace-nowrap flex-1">
              <span className="text-gray-400">Status</span>
              <span className="font-semibold text-gray-900"> On Mission 1234</span>
            </span>
            <button className="w-7 h-7 rounded-full bg-gray-900 text-white text-[11px] flex items-center justify-center shrink-0">⏸</button>
          </div>

          {/* Quick Goal */}
          <div className="flex items-center gap-2.5 bg-white rounded-full py-2 pl-4 pr-2 shadow-[0_2px_12px_rgba(0,0,0,0.3)] cursor-pointer">
            <span className="text-[12px] font-bold tracking-widest text-gray-900 flex-1">QUICK GOAL</span>
            <span className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm shrink-0">→</span>
          </div>

          {/* Mode toggle */}
          <div className="flex items-center gap-3 bg-white rounded-full py-2 pl-4 pr-2 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
            <span className="text-[11px] font-bold text-gray-400 tracking-[0.12em] uppercase">Mode</span>
            <div className="flex bg-gray-100 rounded-full p-0.5 gap-0.5 flex-1">
              {['AUTO', 'MANUAL'].map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-1.5 rounded-full text-[11px] font-bold tracking-wide cursor-pointer transition-all ${
                    mode === m ? 'bg-gray-900 text-white' : 'bg-transparent text-gray-500'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center p-5 mt-auto">
          <p className="text-white/30 text-[11px] uppercase tracking-widest">Controls</p>
          <div className="scale-[0.72] origin-center">
            <EmergencyStop />
          </div>
          <div className="scale-[0.72] origin-center">
            <DPad />
          </div>
        </div>

      </div>
    </>
  )
}
