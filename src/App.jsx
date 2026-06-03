import { useState, useRef } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import VideoView from './components/VideoView'
import MapView3D from './components/MapView3D'
import EmergencyStop from './components/EmergencyStop'
import DPad from './components/DPad'
import HamburgerMenu from './components/HamburgerMenu'

const THUMB = 'hidden md:block md:absolute md:bottom-6 md:left-[100px] md:w-[280px] md:h-[186px] md:z-[6] md:rounded-xl md:overflow-hidden md:cursor-pointer md:border-2 md:border-white/[0.18] md:shadow-[0_4px_24px_rgba(0,0,0,0.55)] md:hover:border-white/45 md:transition-colors'
const MAIN  = 'absolute inset-0 z-0'

export default function App() {
  const [isMapMain, setIsMapMain] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const swap = () => setIsMapMain(v => !v)

  const mapControlsRef = useRef(null)
  const [zoomVal, setZoomVal] = useState(60)

  const applyZoom = (val) => {
    const controls = mapControlsRef.current
    if (!controls) return
    const clamped = Math.min(100, Math.max(0, val))
    setZoomVal(clamped)
    const dist = 500 - (clamped / 100) * (500 - 30)
    const dir = controls.object.position.clone().sub(controls.target).normalize()
    controls.object.position.copy(controls.target).addScaledVector(dir, dist)
    controls.update()
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#111]">

      {/* Map view */}
      <div
        className={isMapMain ? MAIN : THUMB}
        onClick={!isMapMain ? swap : undefined}
        title={!isMapMain ? 'Click to expand map' : ''}
      >
        <MapView3D controlsRef={mapControlsRef} />
      </div>

      {/* Camera view */}
      <div
        className={isMapMain ? THUMB : MAIN}
        onClick={isMapMain ? swap : undefined}
        title={isMapMain ? 'Click to expand camera' : ''}
      >
        <VideoView />
      </div>

      <div className="absolute top-4 md:top-[60px] lg:top-[96px] inset-x-0 flex justify-center z-[8]">
        <button
          onClick={swap}
          className="flex items-center gap-2 bg-[rgba(18,18,24,0.82)] backdrop-blur-md text-white py-1.5 px-5 rounded-full text-[13px] font-medium tracking-[0.02em] border border-white/10 md:pointer-events-none"
        >
          {isMapMain ? 'Map View' : 'Camera View'}

          <span className="md:hidden text-white/50 text-[11px]">⇄ tap to switch</span>
        </button>
      </div>

      {isMapMain && (
        <div className="absolute bottom-6 left-4 lg:left-16 z-[7] flex flex-col items-center gap-1.5 p-1.5">
          <span onClick={() => applyZoom(zoomVal + 10)} className="text-white/65 text-lg font-light leading-none cursor-pointer select-none w-5 text-center">+</span>
          <div className="h-[100px] flex items-center justify-center">
            <input
              type="range"
              min="0"
              max="100"
              value={zoomVal}
              aria-label="Zoom"
              onChange={(e) => applyZoom(parseInt(e.target.value))}
              style={{
                writingMode: 'vertical-lr',
                direction: 'rtl',
                WebkitAppearance: 'slider-vertical',
                appearance: 'slider-vertical',
                height: '100px',
                width: '4px',
                accentColor: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
              }}
            />
          </div>
          <span onClick={() => applyZoom(zoomVal - 10)} className="text-white/65 text-lg font-light leading-none cursor-pointer select-none w-5 text-center">−</span>
        </div>
      )}

      <div className="hidden lg:block"><Sidebar /></div>

      <TopBar />

      <div className="hidden lg:flex absolute bottom-6 right-6 z-10 flex-col items-center gap-3.5 scale-[0.75] origin-bottom-right">
        <EmergencyStop />
        <DPad />
      </div>

      <button
        onClick={() => setIsMenuOpen(true)}
        className="lg:hidden absolute top-4 left-4 z-20 w-10 h-10 rounded-xl bg-[#0d0e14]/90 border border-white/15 text-white flex flex-col items-center justify-center gap-1.5 backdrop-blur-md"
      >
        <span className="w-5 h-0.5 bg-white/80 rounded" />
        <span className="w-5 h-0.5 bg-white/80 rounded" />
        <span className="w-5 h-0.5 bg-white/80 rounded" />
      </button>

      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}
