import { useState, useRef } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import VideoView from './components/VideoView'
import MapView3D from './components/MapView3D'
import EmergencyStop from './components/EmergencyStop'
import DPad from './components/DPad'

const THUMB = 'absolute bottom-6 left-[100px] w-[280px] h-[186px] z-[6] rounded-xl overflow-hidden cursor-pointer border-2 border-white/[0.18] shadow-[0_4px_24px_rgba(0,0,0,0.55)] hover:border-white/[0.45] transition-colors'
const MAIN  = 'absolute inset-0 z-0'

export default function App() {
  const [isMapMain, setIsMapMain] = useState(true)
  const swap = () => setIsMapMain(v => !v)

  const mapControlsRef = useRef(null)

  const handleZoom = (e) => {
    const controls = mapControlsRef.current
    if (!controls) return

    const val = parseInt(e.target.value)
    const minDist = 30
    const maxDist = 500
    const dist = maxDist - (val / 100) * (maxDist - minDist)

    const direction = controls.object.position.clone()
      .sub(controls.target)
      .normalize()

    controls.object.position.copy(controls.target)
      .addScaledVector(direction, dist)

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

      {/* View label */}
      <div className="absolute top-[96px] inset-x-0 flex justify-center z-[8] pointer-events-none">
        <span className="bg-[rgba(18,18,24,0.82)] backdrop-blur-md text-white py-1.5 px-5 rounded-full text-[13px] font-medium tracking-[0.02em] border border-white/10">
          {isMapMain ? 'Map View' : 'Camera View'}
        </span>
      </div>

      {/* Zoom slider */}
      <div className="absolute bottom-6 left-16 z-[7] flex flex-col items-center gap-1.5 p-1.5">
        <span className="text-white/65 text-lg font-light leading-none cursor-pointer select-none w-5 text-center">+</span>
        <div className="h-[100px] flex items-center justify-center">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="60"
            aria-label="Zoom"
            onChange={handleZoom}
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
        <span className="text-white/65 text-lg font-light leading-none cursor-pointer select-none w-5 text-center">−</span>
      </div>

      <Sidebar />
      <TopBar />

      {/* Bottom-right controls */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col items-center gap-3.5">
        <EmergencyStop />
        <DPad />
      </div>
    </div>
  )
}
