import * as THREE from 'three';
import { useMemo } from 'react';

export function PlaneSpan({ x1, x2, scale = 1.5 }) {
  const geometry = useMemo(() => {
    const v1 = new THREE.Vector3().copy(x1).multiplyScalar(scale);
    const v2 = new THREE.Vector3().copy(x2).multiplyScalar(scale);
    
    const corners = [
      new THREE.Vector3(0, 0, 0),
      v1.clone(),
      v2.clone(),
      v1.clone().add(v2),
    ];
    
    const positions = new Float32Array([
      corners[0].x, corners[0].y, corners[0].z,
      corners[1].x, corners[1].y, corners[1].z,
      corners[2].x, corners[2].y, corners[2].z,
      
      corners[1].x, corners[1].y, corners[1].z,
      corners[3].x, corners[3].y, corners[3].z,
      corners[2].x, corners[2].y, corners[2].z,
    ]);
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    return geom;
  }, [x1, x2, scale]);

  const edgeGeometry = useMemo(() => {
    const v1 = new THREE.Vector3().copy(x1).multiplyScalar(scale);
    const v2 = new THREE.Vector3().copy(x2).multiplyScalar(scale);
    
    const corners = [
      new THREE.Vector3(0, 0, 0),
      v1.clone(),
      v1.clone().add(v2),
      v2.clone(),
      new THREE.Vector3(0, 0, 0),
    ];
    
    const positions = new Float32Array(corners.flatMap(p => [p.x, p.y, p.z]));
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    return geom;
  }, [x1, x2, scale]);

  return (
    <group>
      {/* Plane surface */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={0x10b981}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Plane edge outline */}
      <line geometry={edgeGeometry}>
        <lineBasicMaterial color={0x34d399} linewidth={1.5} transparent opacity={0.4} />
      </line>
    </group>
  );
}
