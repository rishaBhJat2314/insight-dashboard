export default function EmergencyStop() {
  const handleStop = () => alert('⚠ EMERGENCY STOP ACTIVATED')

  return (
    <button
      onClick={handleStop}
      title="Emergency Stop"
      className="w-[90px] h-[90px] rounded-full border-0 bg-[radial-gradient(circle_at_38%_35%,#fde047,#eab308_45%,#a16207_80%)] shadow-[0_0_0_3px_#ca8a04,0_4px_18px_rgba(0,0,0,0.5),inset_0_2px_3px_rgba(255,255,255,0.2)] cursor-pointer flex items-center justify-center hover:scale-[1.04] active:scale-[0.96] transition-transform"
    >
      <div className="w-[67px] h-[67px] rounded-full bg-[radial-gradient(circle_at_38%_35%,#f87171,#dc2626_50%,#991b1b)] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center gap-[2px]">
        <svg className="w-[23px] h-[23px]" viewBox="0 0 44 44" fill="none">
          <path d="M8 22 A14 14 0 1 1 22 36" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <polyline points="5,14 8,22 16,19" stroke="white" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        </svg>
        <span className="text-white text-[6.5px] font-extrabold tracking-[0.06em] text-center uppercase leading-[1.4]">
          EMERGENCY<br />STOP
        </span>
      </div>
    </button>
  )
}
