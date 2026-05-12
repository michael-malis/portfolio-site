import * as THREE from 'three';

export const Y_VEC = new THREE.Vector3(1.15, 1.7, 0.95);

export function isValidPlane(x1, x2) {
  const cross = new THREE.Vector3().crossVectors(x1, x2);
  return cross.length() > 0.01;
}

export function getPlaneNormal(u, v) {
  return new THREE.Vector3().crossVectors(u, v).normalize();
}

export function projectPointOntoPlane(point, normal, planePoint = new THREE.Vector3(0, 0, 0)) {
  const relative = point.clone().sub(planePoint);
  const signedDistance = relative.dot(normal);
  
  return point.clone().sub(
    normal.clone().multiplyScalar(signedDistance)
  );
}

export function getResidualVector(yPoint, yHatPoint) {
  return yPoint.clone().sub(yHatPoint);
}

export function lerpVector(a, b, t) {
  return a.clone().lerp(b, t);
}
