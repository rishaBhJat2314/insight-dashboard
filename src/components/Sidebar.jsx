import { LayoutDashboard, Map, MapPin, Box, Settings2, TrendingUp, User } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Map,             label: 'Map' },
  { icon: MapPin,          label: 'Goals' },
  { icon: Box,             label: 'Objects' },
  { icon: Settings2,       label: 'Settings' },
  { icon: TrendingUp,      label: 'Analytics' },
]

export default function Sidebar() {
  return (
    <aside className="absolute left-0 top-0 bottom-0 w-[64px] bg-[#0d0e14]/90 backdrop-blur-xl z-10 flex flex-col items-center pt-4 pb-3 border-r border-white/[0.06]">

      {/* Brand */}
      <div className="flex flex-col items-center w-full pb-3 mb-3 border-b border-white/[0.07]">
        <span className="text-white text-[14px] font-black tracking-[0.16em]">ERIC</span>
        <span className="text-white/40 text-[7.5px] tracking-[0.22em] mt-[3px]">ROBOTICS</span>
      </div>

      {/* Nav icons */}
      <nav className="flex flex-col gap-1 flex-1 items-center w-full px-2">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            title={label}
            className={`w-full h-9 rounded-lg flex items-center justify-center cursor-pointer transition-[background,color] duration-150 ${
              active
                ? 'bg-white/15 text-white'
                : 'bg-transparent text-white/35 hover:bg-white/8 hover:text-white/70'
            }`}
          >
            <Icon size={18} />
          </button>
        ))}
      </nav>

      {/* Profile */}
      <div className="w-full px-2 pt-3 border-t border-white/[0.07]">
        <button
          title="Profile"
          className="w-full h-9 rounded-lg flex items-center justify-center bg-transparent text-white/35 hover:bg-white/8 hover:text-white/70 cursor-pointer transition-[background,color] duration-150"
        >
          <User size={18} />
        </button>
      </div>

    </aside>
  )
}
