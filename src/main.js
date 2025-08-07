import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
// import gsap from 'gsap'

/**
 * Debug
 */
const gui = new GUI({
  width: 360,
  closeFolders: true,
  closed: true,
})

/* Cursor */

// const cursor = {
//   x: 0,
//   y: 0,
// }

// window.addEventListener('mousemove', (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5
//   cursor.y = event.clientY / sizes.height - 0.5
// })

const canvasContainer = document.querySelector(
  '.webgl-container'
)
const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const group = new THREE.Group()
scene.add(group)

// // Manual custom geometry
// const geometry = new THREE.BufferGeometry()

// const facesCount = 5000

// const positionsArray = new Float32Array(facesCount * 3 * 3) // 3 components per vertex (x, y, z)

// for (let i = 0; i < facesCount * 3 * 3; i++) {
//   positionsArray[i] = (Math.random() - 0.5) * 2 // Random value between -1 and 1
// }

// geometry.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3))

const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  // wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)
group.add(cube)

gui.add(cube.material, 'wireframe').name('Wireframe')
gui
  .add(cube.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('Cube Y Position')

const sizes = {
  width: canvasContainer.clientWidth,
  height: canvasContainer.clientHeight,
}

const defaultSizes = {
  width: canvasContainer.clientWidth,
  height: canvasContainer.clientHeight,
}

// Camera setup
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  1000
)
camera.position.set(1, 1, 3)
camera.lookAt(cube.position)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.enableZoom = false
controls.touches = {
  ONE: THREE.TOUCH.ROTATE, // arrastre horizontal → rota
  TWO: THREE.TOUCH.DOLLY_PAN, // dos dedos → zoom/pan
}
// controls.screenSpacePanning = false
// controls.maxPolarAngle = Math.PI / 2
// controls.target.y = 0.5
// controls.enabled = false
controls.update()

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  // alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.domElement.parentElement.style.touchAction = 'pan-y' // Prevents the browser from interpreting touch events as scroll events
renderer.domElement.style.touchAction = 'pan-y' // Prevents the browser from interpreting touch events as scroll events

// Animation setup
// gsap.to(cube.position, {
//   duration: 1,
//   delay: 1,
//   x: 2,
//   ease: 'power1.inOut',
//   yoyo: true,
//   repeat: -1,
//   onComplete: () => {
//     console.log('Animation complete')
//   }
// })

// Update sizes
const updateWebGLSizes = (restoreFromFullscreen) => {
  sizes.width = canvasContainer.clientWidth
  sizes.height = canvasContainer.clientHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  )
}

// Resize event
window.addEventListener('resize', updateWebGLSizes)

// Fullscreen change event
document.addEventListener('fullscreenchange', (ev) => {
  const fullscreenElement =
    document.fullscreenElement ||
    document.webkitFullscreenElement // For Safari compatibility
  canvas.fullscreen = !!fullscreenElement

  if (canvas.fullscreen) {
    canvasContainer.style.aspectRatio = 'unset'
    canvasContainer.style.width = '100vw' // Set to full width
    canvasContainer.style.height = '100vh' // Set to full height
    defaultSizes.width = canvasContainer.clientWidth
    defaultSizes.height = canvasContainer.clientHeight
  } else {
    canvasContainer.style.width = '100vw' // Set to full width
    canvasContainer.style.height = 'auto' // Set to full width
    canvasContainer.style.aspectRatio = '1 / 1'
  }

  updateWebGLSizes()
})

// Double click event for launching Fullscreen
canvas.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement ||
    document.webkitFullscreenElement // For Safari compatibility

  if (!fullscreenElement) {
    defaultSizes.width = document.querySelector(
      '.webgl-container'
    ).clientWidth
    defaultSizes.height = document.querySelector(
      '.webgl-container'
    ).clientHeight

    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      // For Safari compatibility
      canvas.webkitRequestFullscreen()
    }
    updateWebGLSizes() // Update sizes for fullscreen
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      // For Safari compatibility
      document.webkitExitFullscreen()
    }
    updateWebGLSizes()
  }
})

// Time
// let time = Date.now();

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {
  //Clock
  const elapsedTime = clock.getElapsedTime()

  // update scene

  // cube.rotation.y = elapsedTime * (Math.PI * 2) * 0.2 // one revolution per second

  // cube.position.y = Math.sin(elapsedTime * 1.5) // oscillate up and down
  // cube.position.x = Math.cos(elapsedTime * 1.5) // oscillate up and down

  // CAMERA UPDATE WITH MOUSE MOVEMENT MANUALLY
  // camera.position.x = Math.sin(cursor.x * Math.PI*1.5) * 4
  // camera.position.z = Math.cos(cursor.x * Math.PI * 1.5) * 4
  // camera.position.y = cursor.y * 5 * -1
  // camera.lookAt(cube.position)

  controls.update()

  //Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
