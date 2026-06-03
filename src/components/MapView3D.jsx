import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function MapView3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth  || 800
    const h = mount.clientHeight || 600

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x14151c)

    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 2000)
    camera.position.set(0, 50, 200)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h)
    renderer.domElement.style.touchAction = 'none'
    mount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping     = true
    controls.dampingFactor     = 0.06
    controls.screenSpacePanning = true
    controls.minDistance       = 5
    controls.maxDistance       = 800
    controls.minPolarAngle     = 0
    controls.maxPolarAngle     = Math.PI

    const grid = new THREE.GridHelper(400, 40, 0x1e2030, 0x1a1c26)
    scene.add(grid)

    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const dirLight = new THREE.DirectionalLight(0x88aaff, 0.8)
    dirLight.position.set(50, 100, 50)
    scene.add(dirLight)

    const robotGroup = new THREE.Group()

    const body = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 6),
      new THREE.MeshBasicMaterial({ color: 0x111111, side: THREE.DoubleSide })
    )
    body.rotation.x = -Math.PI / 2
    robotGroup.add(body)

    const mast = new THREE.Mesh(
      new THREE.CircleGeometry(1, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    )
    mast.rotation.x = -Math.PI / 2
    mast.position.y = 0.1
    robotGroup.add(mast)

    scene.add(robotGroup)

    const loader = new PCDLoader()
    loader.load(
      '/wolf.pcd',
      (points) => {

        points.geometry.computeBoundingBox()
        const box = points.geometry.boundingBox.clone()
        const center = new THREE.Vector3()
        box.getCenter(center)
        points.geometry.translate(-center.x, -center.y, -center.z)

        points.geometry.rotateX(-Math.PI / 2)

        const size = new THREE.Vector3()
        box.getSize(size)
        const maxDim      = Math.max(size.x, size.y, size.z)
        const TARGET      = 120
        const scaleFactor = TARGET / maxDim
        points.scale.setScalar(scaleFactor)

        points.material.color = new THREE.Color(0x4fc3f7)
        points.material.size  = 0.8
        scene.add(points)

        const worldHalfY = (size.z / 2) * scaleFactor
        points.position.y = worldHalfY

        robotGroup.position.set(0, 2, 0)

        const fovRad  = (camera.fov * Math.PI) / 180
        const fitDist = (TARGET * 0.9) / Math.tan(fovRad / 2)

        camera.position.set(fitDist * 0.6, fitDist * 0.6, fitDist * 0.6)
        controls.target.set(0, worldHalfY, 0)
        controls.update()
      },
      undefined,
      (err) => console.error('PCD load error:', err)
    )

    const ro = new ResizeObserver(() => {
      const rw = mount.clientWidth
      const rh = mount.clientHeight
      if (rw === 0 || rh === 0) return
      camera.aspect = rw / rh
      camera.updateProjectionMatrix()
      renderer.setSize(rw, rh)
    })
    ro.observe(mount)

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      controls.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
