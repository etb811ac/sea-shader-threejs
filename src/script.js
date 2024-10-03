import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

import waterVertex from './shaders/water/vertex.glsl'
import waterFragment from './shaders/water/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })
const debugObject = {}

gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(8, 8, 700, 700)

//Color
debugObject.depthColor = '#6D59CF'
debugObject.surfaceColor = '#D92FA2'

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertex,
    fragmentShader: waterFragment,
    wireframe: true,
    transparent: true,
    uniforms: {
        uTime: { value: 0 },

        uWaveSpeed: { value: 0.005 },
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },

        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.05 },
        uSmallWavesIterations: { value: 6 },

        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uColorOffset: { value: 0.36 },
        uColorMultiplier: { value: 1.284 }
    },
    side: THREE.DoubleSide
})

//debug waves
const colorFolder = gui.addFolder('Color')
colorFolder.add(waterMaterial.uniforms.uColorOffset, 'value', 0, 1, 0.001).name("Color Offset");
colorFolder.add(waterMaterial.uniforms.uColorMultiplier, 'value', 0, 10, 0.001).name("Color Multiplier")
colorFolder.addColor(debugObject, 'depthColor').onChange(() => { waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor) }).name('Depth Color')
colorFolder.addColor(debugObject, 'surfaceColor').onChange(() => { waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor) }).name('Suface Color')


const bigWavesFolder = gui.addFolder('Big Waves')
bigWavesFolder.add(waterMaterial.uniforms.uBigWavesElevation, 'value', 0, 1, 0.001).name('Waves Elevation')
bigWavesFolder.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x', 0, 10, 0.001).name('Wave Frequency X')
bigWavesFolder.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y', 0, 10, 0.001).name('Wave Frequency Y')
bigWavesFolder.add(waterMaterial.uniforms.uWaveSpeed, 'value', 0, 4, 0.001).name('Waves Speed')

const smallWavesFolder = gui.addFolder('Small Waves')
smallWavesFolder.add(waterMaterial.uniforms.uSmallWavesElevation, 'value', 0, 1, 0.001).name('Waves Elevation')
smallWavesFolder.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value', 0, 10, 0.001).name('Wave Frequency')
smallWavesFolder.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value', 0, 4, 0.001).name('Waves Speed')
smallWavesFolder.add(waterMaterial.uniforms.uSmallWavesIterations, 'value', 0, 8, 1).name('Wave Iteration')

gui.add(waterMaterial, 'wireframe')

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 0.6, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

gsap.to(waterMaterial,{wireframe: true, duration:3})

const tick = () => {
    const elapsedTime = clock.getElapsedTime()


    //update Time
    waterMaterial.uniforms.uTime.value = elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()