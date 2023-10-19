// import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

/**
 * SignMenu Object Class
 */
export class SignMenu {
  object
  loaderGLTF

  constructor() {
    this.loaderGLTF = new GLTFLoader() // Object
    this.object = null
}

  async init(objectName, x, y, z, xdeg, ydeg, zdeg) {
    // Load object
    this.object = await this.loadGLTF('./objects/GLTFObjects/signMenu/chalkboard_sign_v1.glb')
    
    this.object.scene.scale.set(0.03, 0.03, 0.03)
    // Name the object
    this.object.scene.name = objectName

    this.setObjectPosRot(x, y, z, xdeg, ydeg, zdeg)

    return this.object.scene
  }

  async loadGLTF(url) {
    return new Promise((resolve, reject) => {
      this.loaderGLTF.load(
        url,
        (gltf) => {
          console.log(typeof gltf);
          resolve(gltf)
        },
        undefined,
        reject
      )
    })
  }

  setObjectPosRot(x, y, z, xdeg, ydeg, zdeg) {
    //x,y,z = Positions - xdeg, ydeg, zdeg = Rotations (deg)

    //Positions
    if (!x) {
      x = this.object.scene.position.x
    }

    if (!y) {
      y = this.object.scene.position.y
    }

    if (!z) {
      z = this.object.scene.position.z
    }

    this.object.scene.position.set(x, y, z)

    //Rotations
    if (!xdeg) {
      xdeg = this.object.scene.rotation.x
    }

    if (!ydeg) {
      ydeg = this.object.scene.rotation.y
    }

    if (!zdeg) {
      zdeg = this.object.scene.rotation.z
    }

    this.object.scene.rotation.set(xdeg, ydeg, zdeg)

    return this.object.scene
  }

  setObjectPositions(x, y, z) {
    if (!x) {
      x = this.object.scene.position.x
    }

    if (!y) {
      y = this.object.scene.position.y
    }

    if (!z) {
      z = this.object.scene.position.z
    }

    this.object.scene.position.set(x, y, z)

    return this.object.scene
  }

  setObjectRotations(x, y, z) {
    if (!x) {
      x = this.object.scene.rotation.x
    }

    if (!y) {
      y = this.object.scene.rotation.y
    }

    if (!z) {
      z = this.object.scene.rotation.z
    }

    this.object.scene.rotation.set(x, y, z)

    return this.object.scene
  }

//   getObjectPositionX() {
//     return this.mesh.position.x
//   }

//   getObjectPositionY() {
//     return this.mesh.position.y
//   }

//   getObjectPositionZ() {
//     return this.mesh.position.z
//   }

//   getObjectPositions() {
//     return this.mesh.position
//   }
}
