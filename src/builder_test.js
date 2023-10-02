import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
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
const cube = new Cube()
const platform = new Platform()
const text = new Text()
// const text2 = new Text();

/**
 * Add to scene
 */

scene.add(cube.setMeshPositions(0, 0, 0))
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

  const loader = new GLTFLoader();

loader.load( './objects/GLTFObjects/SciFi-Cube/scene.gltf', function ( gltf ) {

  gltf.scene.scale.set(10,10,10)
  gltf.scene.position.set(text.mesh.position.x, text.mesh.position.y + 2, text.mesh.position.z)
  
  scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

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

scene.add(dirLight)
scene.add(ambientLight)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 3
camera.position.y = 0.8
scene.add(camera)

// Controls with mouse
const controls = new OrbitControls(camera, canvas)

controls.keys = {
  // Move
  LEFT: 'ArrowLeft', //left arrow
  UP: 'ArrowUp', // up arrow
  RIGHT: 'ArrowRight', // right arrow
  DOWN: 'ArrowDown', // down arrow

  Z: 'z',
  Q: 'q',
  S: 's',
  D: 'd',

  // Rotate
  R: 'r',
  T: 't'
}

// controls.enabled = false
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.shadowMap.enabled = true

var goal, keys, follow;

var temp = new THREE.Vector3;
var dir = new THREE.Vector3;
var a = new THREE.Vector3;
var b = new THREE.Vector3;
var coronaSafetyDistance = 0.3;
var velocity = 0.0;
var speed = 0.0;

goal = new THREE.Object3D;
    follow = new THREE.Object3D;
    follow.position.z = -coronaSafetyDistance;
    cube.mesh.add( follow );
    
    goal.add( camera );

keys = {
  a: false,
  s: false,
  d: false,
  w: false
};

document.body.addEventListener( 'keydown', function(e) {
  
  const key = e.code.replace('Key', '').toLowerCase();
  if ( keys[ key ] !== undefined )
    keys[ key ] = true;
  
});
document.body.addEventListener( 'keyup', function(e) {
  
  const key = e.code.replace('Key', '').toLowerCase();
  if ( keys[ key ] !== undefined )
    keys[ key ] = false;
  
});


/**
 * Animate
 */
const clock = new THREE.Clock()

function animate() {

  requestAnimationFrame( animate );
  
speed = 0.0;

if ( keys.w )
  speed = 0.01;
else if ( keys.s )
  speed = -0.01;

velocity += ( speed - velocity ) * .3;
cube.mesh.translateZ( velocity );

if ( keys.a )
  cube.mesh.rotateY(0.05);
else if ( keys.d )
  cube.mesh.rotateY(-0.05);
  

a.lerp(cube.mesh.position, 0.4);
b.copy(goal.position);

  dir.copy( a ).sub( b ).normalize();
  const dis = a.distanceTo( b ) - coronaSafetyDistance;
  goal.position.addScaledVector( dir, dis );
  goal.position.lerp(temp, 0.02);
  temp.setFromMatrixPosition(follow.matrixWorld);
  
  camera.lookAt( cube.mesh.position );
  
  renderer.render( scene, camera );

}

animate()

/**
 * Mouse Events
 */
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

// events
let intersects = []
let hovered = {}

window.addEventListener('pointermove', (e) => {
  mouse.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1)
  raycaster.setFromCamera(mouse, camera)
  intersects = raycaster.intersectObjects(scene.children, true)
  console.log('hover')
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
    if (!hovered[hit.object.uuid]) {
      hovered[hit.object.uuid] = hit
      if (hit.object.onPointerOver) hit.object.onPointerOver(hit)
    }
    // Call onPointerMove
    if (hit.object.onPointerMove) hit.object.onPointerMove(hit)
  })
})

window.addEventListener('click', (e) => {
  intersects.forEach((hit) => {
    // Call onClick
    console.log('click', hit.object.uuid)
    if (hovered[hit.object.uuid]) {
      console.log('eushfhdsuf')
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
