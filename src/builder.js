import * as THREE from 'three'

// Statistics (FPS, params ...)
import Stats from '/customModules/stats.module.js'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'

// Custom functions importations
import { GetMaterialsOnMTLFile } from '/functions'

// Lightning importations
import { Sky } from './objects/sky'

// Objects importations
import { Cube } from '/objects/cube'
import { Platform } from '/objects/platform'
import { Text } from '/objects/text'
import { Car } from '/objects/OBJObjects/car'
import { City } from './objects/OBJObjects/city'

/**
 * Base
 */
// Reload cache
// THREE.Cache.enabled = true

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Base init
let initialWindowHeight = window.innerHeight

const scene = new THREE.Scene()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.shadowMap.enabled = true

/**
 * FPS statistics
 */
const stats = new Stats()
const container = document.getElementById( 'fpsViewer' );
container.appendChild(stats.dom)

/**
 * Init Class Objects
 */
const scifiObject = new GLTFLoader()
const signMenu = new GLTFLoader()
const cube = new Cube()
const platform = new Platform()
const text = new Text()
const car = new Car()
const city = new City()

/**
 * Add to scene the Objects
 */
// Platform Object
scene.add(platform.setMeshPositions(0, -0.5, 2))

// Cube Object
scene.add(cube.setMeshPosRot(0, 0, 0, 0, Math.PI, 0))

// Newalfox Text Object
text
  .init('Newalfox-Text', cube.getMeshPositionX(), cube.getMeshPositionY() + 1, cube.getMeshPositionZ())
  .then((textMesh) => {
    // The font has been loaded successfully
    console.log('The font has been loaded successfully')
    scene.add(textMesh)
  })
  .catch((error) => {
    console.error('An error was detected to load the font', error)
  })

// Sci-Fi Object
scifiObject.load(
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

// SignMenu Object
signMenu.load(
  './objects/GLTFObjects/signMenu/chalkboard_sign_v1.glb',
  function (gltf) {
    gltf.scene.scale.set(0.03, 0.03, 0.03)
    gltf.scene.position.set(-2, platform.getMeshPositionY(), -5)
    gltf.scene.rotation.set(0, platform.getMeshRotationX(), 0)

    scene.add(gltf.scene)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)

// Car Object
car
  .init('Car', 10, -2, 5, null, -135, null)
  .then((carObject) => {
    console.log('The car was loaded successfully')
    scene.add(carObject)
  })
  .catch((error) => {
    console.error('An error was detected to load the car', error)
  })

// city.init('City', 10, -4, 5, null, null, null)
// .then((carObject) => {
//   console.log('The car was loaded successfully')
//   scene.add(carObject)
// })
// .catch((error) => {
//   console.error('An error was detected to load the car', error)
// })

/**
 * Lightning
 */
// scene.background = new THREE.Color('#000000')
// scene.fog = new THREE.Fog('#FF0000', 250, 1400)

const ambientLight = new THREE.AmbientLight('#db901f', 0.4)
const dirLight = new THREE.DirectionalLight('white', 0.8)
const sky = new Sky()

// Helpers
// const gridHelper = new THREE.GridHelper(40, 40)

// scene.add(gridHelper)
// scene.add(new THREE.AxesHelper())
scene.add(sky)
scene.add(dirLight)
scene.add(ambientLight)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000)
// camera.position.x = cube.mesh.position.x + 2
camera.position.z = 3
camera.position.y = 0.9
// camera.lookAt( scene.position );
scene.add(camera)

// Controls with mouse
const controls = new OrbitControls(camera, canvas)

// controls.enabled = false
// controls.enableDamping = true
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.rotateSpeed = 0.5
controls.zoomSpeed = 1.0
controls.panSpeed = 1.0

/**
 * FLUIDITY CONTROL CAMERA/OBJECT - https://codepen.io/Fyrestar/pen/oNxERMr
 */
let goal, keys

let dir = new THREE.Vector3()
let a = new THREE.Vector3()
let b = new THREE.Vector3()
let coronaSafetyDistance = 0.9
let velocity = 0.0
let speed = 0.0

goal = new THREE.Object3D()
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
// const clock = new THREE.Clock()
const tick = () => {
  // Clock system
  // const elapsedTime = clock.getElapsedTime()

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

  // Camera
  camera.lookAt(cube.mesh.position)

  // Custom
  text.setMeshPositions(cube.mesh.position.x, cube.mesh.position.y + 1, cube.mesh.position.z)
  text.setMeshRotations(cube.mesh.rotation.x, cube.mesh.rotation.y, cube.mesh.rotation.z)

  // cube.material.color.setRGB(
  //   Math.random(255),
  //   Math.random(255),
  //   Math.random(255)
  // );

  // Update controls mouse
  controls.update()

  // Update statistics FPS
  stats.update();

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
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
      // hit.object.material.color.setRGB(Math.random(255), Math.random(255), Math.random(255))
    }
  })
})

window.addEventListener('click', (e) => {
  intersects.forEach((hit) => {
    let objects3DImportedList = [
      {
        name: 'Car',
        mtlPath: '/objects/OBJObjects/Car-Model-3-Tesla-Roblox/Car-Roblox-Tesla-Model-3.mtl'
      }
    ]

    const verifyNameObjectClickIsOnFolder = () => {
      const hitObjectName = hit.object.name

      objects3DImportedList.forEach(async (objectName) => {
        const materialsList = await GetMaterialsOnMTLFile(objectName.mtlPath)

        materialsList.forEach((materialName) => {
          if (hitObjectName == materialName) {
            console.log(objectName.name)
            // } else {
            //   console.log(hitObjectName)
          }
        })
      })
    }

    verifyNameObjectClickIsOnFolder()

    console.log(hit)
  })
})

/**
 * Resize Window canvas
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
