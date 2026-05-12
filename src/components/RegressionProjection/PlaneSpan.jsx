import * as THREE from 'three';
import { useMemo } from 'react';
import { Text } from '@react-three/drei';
import { getPlaneNormal, isValidPlane } from './RegressionMath';

const PLANE_SIZE = 8;
const DEFAULT_NORMAL = new THREE.Vector3(0, 0, 1);

export function PlaneSpan({ x1, x2 }) {
  const { planeQuat, textQuat, labelPos } = useMemo(() => {
    const fallback = {
      planeQuat: new THREE.Quaternion(),
      textQuat: new THREE.Quaternion(),
      labelPos: new THREE.Vector3(0.8, 0.04, 0.8),
    };
    if (!isValidPlane(x1, x2)) return fallback;

    const normal = getPlaneNormal(x1, x2);

    // Plane quaternion: rotate default +Z face to target normal
    let pq;
    if (normal.dot(DEFAULT_NORMAL) > -0.9999) {
      pq = new THREE.Quaternion().setFromUnitVectors(DEFAULT_NORMAL, normal);
    } else {
      pq = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
    }

    // Text quaternion: same plane orientation, but ensure face points toward +Y side
    // so the label is visible when camera looks from above
    const textNormal = normal.clone();
    if (textNormal.y < 0) textNormal.negate();
    let tq;
    if (textNormal.dot(DEFAULT_NORMAL) > -0.9999) {
      tq = new THREE.Quaternion().setFromUnitVectors(DEFAULT_NORMAL, textNormal);
    } else {
      tq = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
    }

    // Top-left corner using plane-local axes derived from pq
    const planeLocalX = new THREE.Vector3(1, 0, 0).applyQuaternion(pq);
    const planeLocalY = new THREE.Vector3(0, 1, 0).applyQuaternion(pq);
    const corner = PLANE_SIZE * 0.3;
    const labelPos = planeLocalX.clone().multiplyScalar(-corner)
      .add(planeLocalY.clone().multiplyScalar(corner))
      .add(textNormal.clone().multiplyScalar(0.025));

    return { planeQuat: pq, textQuat: tq, labelPos };
  }, [x1, x2]);

  return (
    <group>
      <mesh quaternion={planeQuat}>
        <planeGeometry args={[PLANE_SIZE, PLANE_SIZE]} />
        <meshBasicMaterial
          color={0x10b981}
          transparent
          opacity={0.075}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <Text
        position={labelPos}
        quaternion={textQuat}
        fontSize={0.26}
        color="#9FB1B7"
        anchorX="center"
        anchorY="middle"
        renderOrder={100}
      >span(X)</Text>
    </group>
  );
}
