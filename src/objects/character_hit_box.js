import * as THREE from 'three'

/**
 * CharacterHitBox Object Class
 */
export class CharacterHitBox {
  geometry
  material
  mesh

  // Create default object
  constructor() {
    this.geometry = new THREE.BoxGeometry(4, 1, 1.1)
    this.material = new THREE.MeshBasicMaterial({ color: '#00FFFF', opacity: 0.1, transparent: true })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.name = "CharacterHitBox"
  }

  setMeshPosRot(x, y, z, xdeg, ydeg, zdeg) {
    //x,y,z = Positions - xdeg, ydeg, zdeg = Rotations (deg)

    //Positions
    if (!x) {
      x = this.mesh.position.x
    }

    if (!y) {
      y = this.mesh.position.y
    }

    if (!z) {
      z = this.mesh.position.z
    }

    this.mesh.position.set(x, y, z)

    //Rotations
    if (!xdeg) {
      xdeg = this.mesh.rotation.x
    }

    if (!ydeg) {
      ydeg = this.mesh.rotation.y
    }

    if (!zdeg) {
      zdeg = this.mesh.rotation.z
    }

    this.mesh.rotation.set(xdeg, ydeg, zdeg)

    return this.mesh
  }

  setMeshPositions(x, y, z) {
    if (!x) {
      x = this.mesh.position.x
    }

    if (!y) {
      y = this.mesh.position.y
    }

    if (!z) {
      z = this.mesh.position.z
    }

    this.mesh.position.set(x, y, z)

    return this.mesh
  }

  setMeshRotations(x, y, z) {
    if (!x) {
      x = this.mesh.rotation.x
    }

    if (!y) {
      y = this.mesh.rotation.y
    }

    if (!z) {
      z = this.mesh.rotation.z
    }

    this.mesh.rotation.set(x, y, z)

    return this.mesh
  }

  getMeshPositionX() {
    return this.mesh.position.x
  }

  getMeshPositionY() {
    return this.mesh.position.y
  }

  getMeshPositionZ() {
    return this.mesh.position.z
  }

  getMeshPositions() {
    return this.mesh.position
  }

  onPointerOver(e) {
    this.material.color.set('hotpink')
    this.material.color.convertSRGBToLinear()
  }

  onPointerOut(e) {
    this.material.color.set('orange')
    this.material.color.convertSRGBToLinear()
  }

  onClick(e) {
    console.log('testt', e)
  }
}
