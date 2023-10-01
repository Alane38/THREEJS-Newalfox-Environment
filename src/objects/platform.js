import * as THREE from "three";

/**
 * Platform Object Class
 */

export class Platform {
  geometry;
  material;
  mesh;

  // Create default object
  constructor() {
    this.geometry = new THREE.PlaneGeometry(3, 10000);
    this.material = new THREE.MeshBasicMaterial({
      color: "#E2E2E2",
      opacity: 0.1,
      transparent: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
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
