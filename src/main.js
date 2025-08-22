import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// import { RGBELoader } from 'three/examples/jsm/Addons.js'
import GUI from 'lil-gui'
// import gsap from 'gsap'

/**
 * !Debug
 */
const gui = new GUI({
  width: 360,
  title: 'Debug UI',
  container: document.querySelector('.webgl-container'),
  // closeFolders: true,
})
gui.hide()
// Debug show/hide pressing CTRL + 'm' key
window.addEventListener('keydown', (ev) => {
  if (ev.key === 'm' && ev.ctrlKey) {
    gui.show(gui._hidden)
  }
})

/**
 * !Textures
 */

//! DOM
const canvasContainer = document.querySelector('.webgl-container')
const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

//! MATERIALS
// const material = new THREE.MeshStandardMaterial()
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.35

//! OBJECTS
const planeGeometry = new THREE.PlaneGeometry(6, 6)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, 0, 0)
plane.rotation.x = -Math.PI * 0.5

const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32)
const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.position.set(-2, 0.75, 0)

const torusGeometry = new THREE.TorusGeometry(0.5, 0.3, 64, 128)
const torus = new THREE.Mesh(torusGeometry, material)
torus.position.set(2, 0.8, 0)

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cube = new THREE.Mesh(cubeGeometry, material)
cube.position.set(0, 0.9, 0)

scene.add(sphere, plane, torus, cube)

/**
 *! SIZES
 */

const sizes = {
  width: canvasContainer.clientWidth,
  height: canvasContainer.clientHeight,
}

const defaultSizes = {
  width: canvasContainer.clientWidth,
  height: canvasContainer.clientHeight,
}

//! Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

gui
  .add(ambientLight, 'intensity')
  .min(0)
  .max(5)
  .step(0.01)
  .name('Ambient Light Intensity')

const directionalLight = new THREE.DirectionalLight(0x00fffc, 1)
directionalLight.position.set(2, 3, 4)
scene.add(directionalLight)
gui
  .add(directionalLight, 'intensity')
  .min(0)
  .max(5)
  .step(0.01)
  .name('Directional Light Intensity')

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000, 1, 10, 2)
pointLight.position.set(-1, 1, 1)

scene.add(pointLight)
gui
  .add(pointLight, 'intensity')
  .min(0)
  .max(5)
  .step(0.01)
  .name('Point Light Intensity')

//! Camera setup
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  1000
)
camera.position.set(1, 1, 10)
camera.lookAt(plane.position)

scene.add(camera)

//! Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.enableZoom = false
controls.touches = {
  ONE: THREE.TOUCH.ROTATE, // arrastre horizontal → rota
  TWO: THREE.TOUCH.DOLLY_PAN, // dos dedos → zoom/pan
}
controls.update()

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  // alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.domElement.style.touchAction = 'pan-y' // Prevents the browser from interpreting touch events as scroll events

// Update sizes
const updateWebGLSizes = () => {
  sizes.width = canvasContainer.clientWidth
  sizes.height = canvasContainer.clientHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

// Resize event
window.addEventListener('resize', updateWebGLSizes)

// Fullscreen change event
document.addEventListener('fullscreenchange', () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement // For Safari compatibility
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
    document.fullscreenElement || document.webkitFullscreenElement // For Safari compatibility

  if (!fullscreenElement) {
    defaultSizes.width = document.querySelector('.webgl-container').clientWidth
    defaultSizes.height =
      document.querySelector('.webgl-container').clientHeight

    if (canvasContainer.requestFullscreen) {
      // canvas.requestFullscreen()
      canvasContainer.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      // For Safari compatibility
      // canvas.webkitRequestFullscreen()
      canvasContainer.webkitRequestFullscreen()
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
  camera.lookAt(plane.position)

  sphere.rotation.y = Math.PI * elapsedTime * 0.05
  torus.rotation.y = Math.PI * elapsedTime * 0.05
  cube.rotation.y = Math.PI * elapsedTime * 0.05

  sphere.rotation.x = -Math.PI * elapsedTime * 0.09
  torus.rotation.x = -Math.PI * elapsedTime * 0.09
  cube.rotation.x = -Math.PI * elapsedTime * 0.09

  controls.update()

  //Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
