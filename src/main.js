import * as THREE from 'three'
import gsap from 'gsap'



const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const group = new THREE.Group()
scene.add(group)

const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)
group.add(cube)

const sizes = {
  width: 800,
  height: 600,
}

const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  1000
)
camera.position.set(1, 1, 4)
camera.lookAt(cube.position)

scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  // alpha: true
})

renderer.setSize(sizes.width, sizes.height)

// Time
// let time = Date.now();

// Clock
const clock = new THREE.Clock()

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

// Animations
const tick = () => {
  //Clock
  const elapsedTime = clock.getElapsedTime()

  // update scene

  cube.rotation.y = elapsedTime * (Math.PI * 2) // one revolution per second

  cube.position.y = Math.sin(elapsedTime * 1.5) // oscillate up and down
  cube.position.x = Math.cos(elapsedTime * 1.5) // oscillate up and down

  //Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()

