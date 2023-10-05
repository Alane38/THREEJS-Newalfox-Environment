// import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'

/**
 * Car Object Class
 */
export class Car {
  object
  loaderOBJ
  loaderMTL

  constructor() {
    this.loaderMTL = new MTLLoader() // Materials
    this.loaderOBJ = new OBJLoader() // Object
    this.object = null
  }

  async init(objectName, x, y, z, xdeg, ydeg, zdeg) {
    // Load materials
    let materials = await this.loadMTL('/objects/OBJObjects/Car-Model-3-Tesla-Roblox/Car-Roblox-Tesla-Model-3.mtl')
    this.loaderOBJ.setMaterials(materials)

    // Load object
    this.object = await this.loadOBJ('/objects/OBJObjects/Car-Model-3-Tesla-Roblox/Car-Roblox-Tesla-Model-3.obj')

    //Name the object
    this.object.name = objectName

    this.setObjectPosRot(x, y, z, xdeg, ydeg, zdeg)

    return this.object
  }

  async loadMTL(url) {
    return new Promise((resolve, reject) => {
      this.loaderMTL.load(
        url,
        (materials) => {
          resolve(materials)
        },
        undefined,
        reject
      )
    })
  }

  async loadOBJ(url) {
    return new Promise((resolve, reject) => {
      this.loaderOBJ.load(
        url,
        (obj) => {
          resolve(obj)
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
      x = this.object.position.x
    }

    if (!y) {
      y = this.object.position.y
    }

    if (!z) {
      z = this.object.position.z
    }

    this.object.position.set(x, y, z)

    //Rotations
    if (!xdeg) {
      xdeg = this.object.rotation.x
    }

    if (!ydeg) {
      ydeg = this.object.rotation.y
    }

    if (!zdeg) {
      zdeg = this.object.rotation.z
    }

    this.object.rotation.set(xdeg, ydeg, zdeg)

    return this.object
  }

  setObjectPositions(x, y, z) {
    if (!x) {
      x = this.object.position.x
    }

    if (!y) {
      y = this.object.position.y
    }

    if (!z) {
      z = this.object.position.z
    }

    this.object.position.set(x, y, z)

    return this.object
  }

  setObjectRotations(x, y, z) {
    if (!x) {
      x = this.object.rotation.x
    }

    if (!y) {
      y = this.object.rotation.y
    }

    if (!z) {
      z = this.object.rotation.z
    }

    this.object.rotation.set(x, y, z)

    return this.object
  }

  getObjectPositionX() {
    return this.mesh.position.x
  }

  getObjectPositionY() {
    return this.mesh.position.y
  }

  getObjectPositionZ() {
    return this.mesh.position.z
  }

  getObjectPositions() {
    return this.mesh.position
  }

  // onPointerOver(e) {
  //   this.material.color.set('hotpink')
  //   this.material.color.convertSRGBToLinear()
  // }

  // onPointerOut(e) {
  //   this.material.color.set('orange')
  //   this.material.color.convertSRGBToLinear()
  // }

  clicked(e) {
    console.log('testt', e)
  }
}
