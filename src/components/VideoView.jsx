export default function VideoView() {
  return (
    <video
      src="/BigBuckBunny_320x180.mp4"
      autoPlay
      muted
      loop
      playsInline
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  )
}
