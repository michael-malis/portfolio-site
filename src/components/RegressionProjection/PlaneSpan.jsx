import * as THREE from 'three';
import { useMemo } from 'react';
import { Text } from '@react-three/drei';
import { getPlaneNormal, isValidPlane } from './RegressionMath';

const PLANE_SIZE = 16;
const DEFAULT_NORMAL = new THREE.Vector3(0, 0, 1);

export function PlaneSpan({ x1, x2 }) {
  const { quat, labelPos } = useMemo(() => {
    const fallback = {
      quat: new THREE.Quaternion(),
      labelPos: new THREE.Vector3(0.8, 0.1, 0.8),
    };
    if (!isValidPlane(x1, x2)) return fallback;

    const normal = getPlaneNormal(x1, x2);

    let q;
    if (normal.dot(DEFAULT_NORMAL) > -0.9999) {
      q = new THREE.Quaternion().setFromUnitVectors(DEFAULT_NORMAL, normal);
    } else {
      q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
    }

    const inPlane = x1.clone().add(x2).multiplyScalar(0.45);
    const labelPos = inPlane.clone().add(normal.clone().multiplyScalar(0.15));

    return { quat: q, labelPos };
  }, [x1, x2]);

  return (
    <group>
      <mesh quaternion={quat}>
        <planeGeometry args={[PLANE_SIZE, PLANE_SIZE]} />
        <meshBasicMaterial
          color={0x10b981}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <Text
        position={labelPos}
        fontSize={0.20}
        color="#34d399"
        anchorX="center"
        anchorY="middle"
        renderOrder={100}
      >span(X)</Text>
    </group>
  );
}
