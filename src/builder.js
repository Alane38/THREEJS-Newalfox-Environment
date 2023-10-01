import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

// Objects imports
import { Cube } from "./objects/cube";
import { Platform } from "./objects/platform";
import { Text } from "./objects/text";

/**
 * Base
 */
THREE.Cache.enabled = true;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Base init
let initialWindowHeight = window.innerHeight;

const scene = new THREE.Scene();

/**
 * Init Class Objects
 */
// "./objects/..."
const cube = new Cube();
const platform = new Platform();
const text = new Text();
// const text2 = new Text();

/**
 * Add to scene
 */

scene.add(cube.setMeshPositions(0, 0, 0));
scene.add(platform.setMeshPositions(0, -0.5, 2));
text
  .init(
    cube.getMeshPositionX() - 1.8,
    cube.getMeshPositionY() + 1,
    cube.getMeshPositionZ()
  )
  .then((textMesh) => {
    // The font has been loaded successfully
    console.log("The font has been loaded successfully");
    scene.add(textMesh);
  })
  .catch((error) => {
    console.error("An error was detected to load the font", error);
  });


/**
 * Lightning
 */
scene.background = new THREE.Color("#000000");
scene.fog = new THREE.Fog("#FF0000", 250, 1400);

const ambientLight = new THREE.AmbientLight("#db901f", 0.4);
const dirLight = new THREE.DirectionalLight("white", 0.8);

scene.add(dirLight);
scene.add(ambientLight);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 3;
camera.position.y = 0.8;
scene.add(camera);

// Controls with mouse
const controls = new OrbitControls(camera, canvas);
// controls.enabled = false
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime)

  // Animate
//   cube.setMeshRotations(
//     cube.mesh.rotation.x,
//     (cube.mesh.rotation.y += elapsedTime),
//     cube.mesh.rotation.z
//   );

  cube.setMeshPositions(null, null, elapsedTime)

  text.setMeshPositions(
    cube.mesh.position.x - 1.8,
    cube.mesh.position.y + 1,
    cube.mesh.position.z 
    )
    

//   cube.material.color.setRGB(
//     Math.random(255),
//     Math.random(255),
//     Math.random(255)
//   );

    console.log(cube.getMeshPositions());

  // Update controls mouse
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/**
 * Resize Window
 */

function onWindowResize(justAdjustWidth) {
  const height = justAdjustWidth ? initialWindowHeight : window.innerHeight;
  const width = window.innerWidth;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

// When window resizes,its call the function!
window.onresize = () => onWindowResize();
