import * as THREE from 'three';
import { useMemo } from 'react';

export function VectorArrow({ from, to, color, lineWidth = 2, headSize = 0.25 }) {
  const { points, conePosition, coneQuaternion } = useMemo(() => {
    const f = new THREE.Vector3().copy(from);
    const t = new THREE.Vector3().copy(to);
    const direction = new THREE.Vector3().subVectors(t, f);
    const length = direction.length();
    
    if (length < 0.001) {
      return {
        points: [f, t],
        conePosition: f,
        coneQuaternion: new THREE.Quaternion(),
      };
    }
    
    direction.normalize();
    const coneStart = t.clone().sub(direction.clone().multiplyScalar(headSize * length));
    
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    
    return {
      points: [f, coneStart],
      conePosition: t.clone().sub(direction.clone().multiplyScalar(headSize * length * 0.5)),
      coneQuaternion: q,
    };
  }, [from, to, headSize]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(points.flatMap(p => [p.x, p.y, p.z]));
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    return geometry;
  }, [points]);

  return (
    <group>
      {/* Line segment */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial color={color} linewidth={lineWidth} />
      </line>

      {/* Arrow head (cone) */}
      <mesh position={conePosition} quaternion={coneQuaternion}>
        <coneGeometry args={[headSize * 0.4, headSize, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}
