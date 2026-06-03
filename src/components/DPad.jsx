import { useState, useEffect, useCallback } from 'react'

const KEY_MAP = {
  w: 'up',    arrowup: 'up',
  s: 'down',  arrowdown: 'down',
  a: 'left',  arrowleft: 'left',
  d: 'right', arrowright: 'right',
}

const DIRS = [
  { dir: 'up',    label: '∧', letter: 'W', style: { top: 6,    left: '50%', transform: 'translateX(-50%)' } },
  { dir: 'down',  label: '∨', letter: 'S', style: { bottom: 6, left: '50%', transform: 'translateX(-50%)' } },
  { dir: 'left',  label: '‹', letter: 'A', style: { left: 6,   top: '50%',  transform: 'translateY(-50%)' } },
  { dir: 'right', label: '›', letter: 'D', style: { right: 6,  top: '50%',  transform: 'translateY(-50%)' } },
]

export default function DPad() {
  const [active, setActive] = useState(new Set())

  const press   = useCallback((dir) => setActive(p => new Set([...p, dir])), [])
  const release = useCallback((dir) => setActive(p => { const n = new Set(p); n.delete(dir); return n }), [])

  useEffect(() => {
    const onDown = (e) => { const d = KEY_MAP[e.key.toLowerCase()]; if (d) { e.preventDefault(); press(d) } }
    const onUp   = (e) => { const d = KEY_MAP[e.key.toLowerCase()]; if (d) release(d) }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp) }
  }, [press, release])

  return (
    <div
      className="w-[128px] h-[128px] rounded-full bg-[radial-gradient(circle_at_40%_38%,#2e2e3c,#1a1a24_65%)] border-2 border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] relative"
      role="group"
      aria-label="Directional controls"
    >
      {DIRS.map(({ dir, label, letter, style }) => (
        <button
          key={dir}
          style={{ position: 'absolute', ...style }}
          aria-label={`Move ${dir} (${letter})`}
          className={`w-[32px] h-[32px] rounded-lg border flex flex-col items-center justify-center gap-[1px] cursor-pointer transition-[background,color,box-shadow,border-color] duration-100 touch-none ${
            active.has(dir)
              ? 'bg-white/20 text-white border-white/25 shadow-[0_0_10px_rgba(255,255,255,0.18)]'
              : 'bg-white/[0.04] border-white/10 text-white/65 hover:bg-white/10 hover:text-white'
          }`}
          onMouseDown={() => press(dir)}
          onMouseUp={() => release(dir)}
          onMouseLeave={() => release(dir)}
          onTouchStart={(e) => { e.preventDefault(); press(dir) }}
          onTouchEnd={() => release(dir)}
        >
          <span className="text-[15px] leading-none">{label}</span>
          <span className="text-[9px] font-bold tracking-[0.05em] opacity-75">{letter}</span>
        </button>
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center leading-[1.3]" aria-hidden="true">
        <span className="text-[9px] font-bold text-white/45 tracking-[0.05em]">R+</span>
        <span className="text-[8px] text-white/25">key</span>
      </div>
    </div>
  )
}
