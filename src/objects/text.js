import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

export class Text {
  geometry
  loader

  constructor() {
    this.loader = new FontLoader()
    this.materials = [
      new THREE.MeshPhongMaterial({ color: '#db901f' }), // front
      new THREE.MeshPhongMaterial({ color: '#db901f' }) // side
    ]
    this.mesh = null
  }

  async init(x, y, z) {
    const font = await this.loadFont('./fonts/helvetiker_bold.typeface.json')
    this.geometry = new TextGeometry('NEWALFOX', {
      font: font,
      size: 0.5,
      height: 0.1
    })

    this.mesh = new THREE.Mesh(this.geometry, this.materials)

    //Center the text into the middle
    this.mesh.geometry.computeBoundingBox()
    this.mesh.geometry.boundingBox.getCenter(new THREE.Vector3())
    this.mesh.geometry.center()

    this.setMeshPositions(x, y, z)

    return this.mesh
  }

  async loadFont(url) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (font) => {
          resolve(font)
        },
        undefined,
        reject
      )
    })
  }

  setMeshPositions(x, y, z) {
    if (this.mesh) {
      this.mesh.position.set(x || 0, y || 0, z || 0)
    }
  }

  setMeshRotations(x, y, z) {
    if (this.mesh) {
      this.mesh.rotation.set(x || 0, y || 0, z || 0)
    }
  }

  getMeshPositionX() {
    return this.mesh ? this.mesh.position.x : 0
  }

  getMeshPositionY() {
    return this.mesh ? this.mesh.position.y : 0
  }

  getMeshPositionZ() {
    return this.mesh ? this.mesh.position.z : 0
  }

  getMeshPositions() {
    return this.mesh.position
  }
}
