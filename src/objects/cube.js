import * as THREE from "three";

/**
 * Cube Object Class
 */
export class Cube {
  geometry;
  material;
  mesh;

  // Create default object
  constructor() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: "#2e2e2e" });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  setMeshPositions(x, y, z) {
    if (!x) {
      x = this.mesh.position.x;
    }

    if (!y) {
      y = this.mesh.position.y;
    }

    if (!z) {
      z = this.mesh.position.z;
    }

    this.mesh.position.set(x, y, z);
    
    return this.mesh;
  }

  setMeshRotations(x, y, z) {
    if (!x) {
      x = this.mesh.rotation.x;
    }

    if (!y) {
      y = this.mesh.rotation.y;
    }

    if (!z) {
      z = this.mesh.rotation.z;
    }

    this.mesh.rotation.set(x, y, z);

    return this.mesh;
  }

  getMeshPositionX() {
    return this.mesh.position.x;
  }

  getMeshPositionY() {
    return this.mesh.position.y;
  }

  getMeshPositionZ() {
    return this.mesh.position.z;
  }

  getMeshPositions() {
    return this.mesh.position;
  }
}
