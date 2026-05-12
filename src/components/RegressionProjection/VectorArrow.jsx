import * as THREE from 'three';
import { useMemo } from 'react';

const SHAFT_RADIUS = 0.028;
const HEAD_HEIGHT = 0.16;
const HEAD_RADIUS = 0.065;

export function VectorArrow({ from, to, color }) {
  const geo = useMemo(() => {
    const f = new THREE.Vector3().copy(from);
    const t = new THREE.Vector3().copy(to);
    const dir = new THREE.Vector3().subVectors(t, f);
    const len = dir.length();
    if (len < 0.01) return null;
    dir.normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    const shaftLen = Math.max(0.001, len - HEAD_HEIGHT);
    const shaftMid = f.clone().add(dir.clone().multiplyScalar(shaftLen * 0.5));
    const coneMid = t.clone().sub(dir.clone().multiplyScalar(HEAD_HEIGHT * 0.5));
    return { shaftLen, shaftMid, coneMid, q };
  }, [from, to]);

  if (!geo) return null;

  return (
    <group>
      <mesh position={geo.shaftMid} quaternion={geo.q}>
        <cylinderGeometry args={[SHAFT_RADIUS, SHAFT_RADIUS, geo.shaftLen, 6]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={geo.coneMid} quaternion={geo.q}>
        <coneGeometry args={[HEAD_RADIUS, HEAD_HEIGHT, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}
