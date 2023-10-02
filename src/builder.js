import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'

// Objects imports
import { Cube } from './objects/cube'
import { Platform } from './objects/platform'
import { Text } from './objects/text'

/**
 * Base
 */
THREE.Cache.enabled = true

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Base init
let initialWindowHeight = window.innerHeight

const scene = new THREE.Scene()

/**
 * Init Class Objects
 */
// "./objects/..."
const loaderGLTFL = new GLTFLoader()
const loaderOBJ = new OBJLoader()
const loaderMTL = new MTLLoader()
const cube = new Cube()
const platform = new Platform()
const text = new Text()
// const text2 = new Text();

/**
 * Add to scene the Objects
 */

scene.add(cube.setMeshPosRot(0, 0, 0, 0, Math.PI, 0))
scene.add(platform.setMeshPositions(0, -0.5, 2))
text
  .init(cube.getMeshPositionX(), cube.getMeshPositionY() + 1, cube.getMeshPositionZ())
  .then((textMesh) => {
    // The font has been loaded successfully
    console.log('The font has been loaded successfully')
    scene.add(textMesh)
  })
  .catch((error) => {
    console.error('An error was detected to load the font', error)
  })

// Sci-Fi Object
loaderGLTFL.load(
  './objects/GLTFObjects/SciFi-Cube/scene.gltf',
  function (gltf) {
    gltf.scene.scale.set(10, 10, 10)
    gltf.scene.position.set(text.mesh.position.x, text.mesh.position.y + 2, text.mesh.position.z)

    scene.add(gltf.scene)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)

// Car Object
loaderMTL.load(
  './objects/OBJObjects/Car-Model-3-Tesla-Roblox/Car-Roblox-Tesla-Model-3.mtl',
  function (materials) {
    loaderOBJ.setMaterials(materials)
    loaderOBJ.load(
      './objects/OBJObjects/Car-Model-3-Tesla-Roblox/Car-Roblox-Tesla-Model-3.obj',
      function (obj) {
        // obj.scale.set(10, 10, 10)
        obj.position.set(10, -2, 5)
        obj.rotation.y = -135


        
        scene.add(obj)
      },
      undefined,
      function (error) {
        console.error(error)
      }
    )
  },
  undefined,
  function (error) {
    console.error(error)
  }
)

// loader.load( './objects/GLTFObjects/SciFi-Cube/scene.gltf', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

/**
 * Lightning
 */
scene.background = new THREE.Color('#000000')
scene.fog = new THREE.Fog('#FF0000', 250, 1400)

const ambientLight = new THREE.AmbientLight('#db901f', 0.4)
const dirLight = new THREE.DirectionalLight('white', 0.8)
// const gridHelper = new THREE.GridHelper(40, 40)

// scene.add(gridHelper)
// scene.add(new THREE.AxesHelper())
scene.add(dirLight)
scene.add(ambientLight)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
// camera.position.x = cube.mesh.position.x + 2
camera.position.z = 3
camera.position.y = 0.9
// camera.lookAt( scene.position );
scene.add(camera)

// Controls with mouse
const controls = new OrbitControls(camera, canvas)

// controls.enabled = false
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.shadowMap.enabled = true

/**
 * FLUIDITY CONTROL CAMERA/OBJECT - https://codepen.io/Fyrestar/pen/oNxERMr
 */
let goal, keys, follow

let temp = new THREE.Vector3()
let dir = new THREE.Vector3()
let a = new THREE.Vector3()
let b = new THREE.Vector3()
let coronaSafetyDistance = 0.3
let velocity = 0.0
let speed = 0.0

goal = new THREE.Object3D()
follow = new THREE.Object3D()

cube.mesh.add(follow)
goal.add(camera)

keys = {
  a: false,
  s: false,
  d: false,
  w: false
}

document.body.addEventListener('keydown', function (e) {
  const key = e.code.replace('Key', '').toLowerCase()
  if (keys[key] !== undefined) keys[key] = true
})
document.body.addEventListener('keyup', function (e) {
  const key = e.code.replace('Key', '').toLowerCase()
  if (keys[key] !== undefined) keys[key] = false
})

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
  window.requestAnimationFrame(tick)
  // const elapsedTime = clock.getElapsedTime()

  // Animate
  //   cube.setMeshRotations(
  //     cube.mesh.rotation.x,
  //     (cube.mesh.rotation.y += elapsedTime),
  //     cube.mesh.rotation.z
  //   );

  // Fluidity - Controls - https://codepen.io/Fyrestar/pen/oNxERMr
  speed = 0.0

  if (keys.w) {
    speed = 0.1
  } else if (keys.s) {
    speed = -0.1
  }

  velocity += (speed - velocity) * 0.3
  cube.mesh.translateZ(velocity)

  if (keys.a) {
    cube.mesh.rotateY(0.05)
  } else if (keys.d) {
    cube.mesh.rotateY(-0.05)
  }

  a.lerp(cube.mesh.position, 0.4)
  b.copy(goal.position)

  dir.copy(a).sub(b).normalize()
  const dis = a.distanceTo(b) - coronaSafetyDistance
  goal.position.addScaledVector(dir, dis)
  goal.position.lerp(temp, 0.02)
  temp.setFromMatrixPosition(follow.matrixWorld)

  // Camera
  // camera.rotateY(cube.mesh.rotation.y)
  // camera.rotateY(cube.mesh.rotation.y)
  // camera.position.z = cube.mesh.position.z - 0.2
  // camera.position.y = cube.mesh.position.y + 0.8
  camera.lookAt(cube.mesh.position)

  // Custom
  // text.setMeshPositions(cube.mesh.position.x, cube.mesh.position.y + 1, cube.mesh.position.z)
  // text.setMeshRotations(cube.mesh.rotation.x, cube.mesh.rotation.y, cube.mesh.rotation.z)

  // cube.material.color.setRGB(
  //   Math.random(255),
  //   Math.random(255),
  //   Math.random(255)
  // );

  // Update controls mouse
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
}

tick()

/**
 * Mouse Events
 */
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

// events
let intersects = []
let hovered = {}

// Get the mouse position
window.addEventListener('pointermove', (e) => {
  mouse.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1)
  raycaster.setFromCamera(mouse, camera)
  intersects = raycaster.intersectObjects(scene.children, true)
  // console.log('hover')
  // If a previously hovered item is not among the hits we must call onPointerOut
  Object.keys(hovered).forEach((key) => {
    const hit = intersects.find((hit) => hit.object.uuid === key)
    if (hit === undefined) {
      const hoveredItem = hovered[key]
      if (hoveredItem.object.onPointerOver) hoveredItem.object.onPointerOut(hoveredItem)
      delete hovered[key]
    }
  })

  intersects.forEach((hit) => {
    // If a hit has not been flagged as hovered we must call onPointerOver
    // Call onPointerMove
    if (hit.object.material.color) {
      // hit.object.material.codlor.setRGB(Math.random(255), Math.random(255), Math.random(255))
    }
  })
})

window.addEventListener('click', (e) => {
  intersects.forEach((hit) => {
    // if (hovered[hit.object.uuid]) {
    // Call onClick
    if (hit.object.name == 'Cube') {
      // console.log(hit.object.material.color.setRGB(Math.random(255), Math.random(255), Math.random(255)))
    }
  })
})

/**
 * Resize Window
 */
function onWindowResize(justAdjustWidth) {
  const height = justAdjustWidth ? initialWindowHeight : window.innerHeight
  const width = window.innerWidth

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

// When window resizes,its call the function!
window.onresize = () => onWindowResize()
