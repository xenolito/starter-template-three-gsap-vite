import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/Addons.js'
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

const loadingManager = new THREE.LoadingManager()
loadingManager.onError = (url) => {
  console.error(`Error loading texture: ${url}`)
}

const textureLoader = new THREE.TextureLoader(loadingManager)

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
)
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

matcapTexture.colorSpace = THREE.SRGBColorSpace
doorColorTexture.colorSpace = THREE.SRGBColorSpace // Ensure the texture is in sRGB color space

const canvasContainer = document.querySelector('.webgl-container')
const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const material_a = new THREE.MeshPhysicalMaterial()

const materialFolder = gui.addFolder('Material Properties')

//! MeshBasicMaterial
// material_a.map = doorColorTexture
// material_a.color = new THREE.Color(0xff0000)
// material_a.opacity = 0.5
// material_a.transparent = true
// material_a.alphaMap = doorAlphaTexture
// material_a.wireframe = true

//! MeshNormalMaterial
// material_a.flatShading = true

//! MeshMatcapMaterial
// material_a.matcap = matcapTexture

//! MeshLambertMaterial

//! MeshPhongMaterial
// material_a.shininess = 100
// material_a.specular = new THREE.Color(0x1188ff)

//! MeshToonMaterial (like cellshading on videogames)
// material_a.gradientMap = gradientTexture
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

//! MeshStandardMaterial (PBR)
// material_a.metalness = 1
// material_a.roughness = 1

// material_a.map = doorColorTexture
// material_a.aoMap = doorAmbientOcclusionTexture
// material_a.aoMapIntensity = 1
// material_a.displacementMap = doorHeightTexture
// material_a.displacementScale = 0.1
// material_a.metalnessMap = doorMetalnessTexture
// material_a.roughnessMap = doorRoughnessTexture
// material_a.normalMap = doorNormalTexture
// material_a.normalScale.set(0.5, 0.5)
// material_a.transparent = true
// material_a.alphaMap = doorAlphaTexture

//! MeshPhysicalMaterial (extends MeshStandardMaterial)
material_a.metalness = 0
material_a.roughness = 0

// material_a.map = doorColorTexture
// material_a.aoMap = doorAmbientOcclusionTexture
// material_a.aoMapIntensity = 1
// material_a.displacementMap = doorHeightTexture
// material_a.displacementScale = 0.1
// material_a.metalnessMap = doorMetalnessTexture
// material_a.roughnessMap = doorRoughnessTexture
// material_a.normalMap = doorNormalTexture
// material_a.normalScale.set(0.5, 0.5)
// material_a.transparent = true
// material_a.alphaMap = doorAlphaTexture

// Clearcoat
// material_a.clearcoat = 1
// material_a.clearcoatRoughness = 0
// materialFolder
//   .add(material_a, 'clearcoat')
//   .min(0)
//   .max(1)
//   .step(0.01)
//   .name('Clearcoat')
// materialFolder
//   .add(material_a, 'clearcoatRoughness')
//   .min(0)
//   .max(1)
//   .step(0.01)
//   .name('Clearcoat Roughness')

// Sheen (fluffy)
// material_a.sheen = 1
// material_a.sheenColor = new THREE.Color(0xffffff)
// material_a.sheenRoughness = 0.5
// materialFolder.add(material_a, 'sheen').min(0).max(1).step(0.01).name('Sheen')
// materialFolder
//   .add(material_a, 'sheenRoughness')
//   .min(0)
//   .max(1)
//   .step(0.01)
//   .name('Sheen Roughness')

// Iridescence (like soap bubbles)
// material_a.iridescence = 1
// material_a.iridescenceThickness = 0.1
// material_a.iridescenceIOR = 1.5 // Index of Refraction
// materialFolder
//   .add(material_a, 'iridescenceIOR')
//   .min(1)
//   .max(2.333)
//   .step(0.01)
//   .name('Iridescence IOR')
// materialFolder
//   .add(material_a, 'iridescenceThickness')
//   .min(0)
//   .max(1)
//   .step(0.01)
//   .name('Iridescence Thickness')

// materialFolder
//   .add(material_a, 'iridescence')
//   .min(0)
//   .max(1)
//   .step(0.01)
//   .name('Iridescence')

// Transmission (like glass)
material_a.transmission = 1
material_a.ior = 1.5 // Index of Refraction
material_a.thickness = 0.5 // Thickness of the material

materialFolder
  .add(material_a, 'transmission')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Transmission')

materialFolder.add(material_a, 'ior').min(1).max(2.333).step(0.01).name('IOR')

materialFolder
  .add(material_a, 'thickness')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Thickness')

materialFolder
  .add(material_a, 'roughness')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Roughness')

materialFolder
  .add(material_a, 'aoMapIntensity')
  .min(0)
  .max(10)
  .step(0.01)
  .name('AO Map Intensity')

materialFolder
  .add(material_a, 'displacementScale')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Displacement Scale')

const sphereGeometry = new THREE.SphereGeometry(1, 64, 64)
const sphere = new THREE.Mesh(sphereGeometry, material_a)
sphere.position.set(-3, 0, 0)

const planeGeometry = new THREE.PlaneGeometry(3, 3, 100, 100)
const plane = new THREE.Mesh(planeGeometry, material_a)

const torusGeometry = new THREE.TorusGeometry(1, 0.75, 64, 128)
const torus = new THREE.Mesh(torusGeometry, material_a)
torus.position.set(3, 0, 0)

scene.add(sphere, plane, torus)

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
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 60)
// pointLight.position.set(5, 5, 5)
// scene.add(pointLight)

// Camera setup
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  1000
)
camera.position.set(1, 1, 10)
camera.lookAt(plane.position)

scene.add(camera)

/**
 *! Enviroment map
 */
const rgbeLoader = new RGBELoader(loadingManager)
rgbeLoader.load('./textures/environmentMap/2k.hdr', (em) => {
  em.mapping = THREE.EquirectangularReflectionMapping
  scene.environment = em
  scene.background = em

  // Add the env map to the material
  material_a.envMap = em

  // Update the material to reflect the environment map
  material_a.needsUpdate = true

  // Add a GUI control for the environment map intensity
  const envMapFolder = gui.addFolder('Environment Map')
  envMapFolder
    .add(material_a, 'envMapIntensity')
    .min(0)
    .max(10)
    .step(0.01)
    .name('Env Map Intensity')
})

//! Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05
// controls.enableZoom = false
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
  plane.rotation.y = Math.PI * elapsedTime * 0.05
  torus.rotation.y = Math.PI * elapsedTime * 0.05

  sphere.rotation.x = -Math.PI * elapsedTime * 0.09
  plane.rotation.x = -Math.PI * elapsedTime * 0.09
  torus.rotation.x = -Math.PI * elapsedTime * 0.09

  controls.update()

  //Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
