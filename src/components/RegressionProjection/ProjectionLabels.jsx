import * as THREE from 'three';
import { Text, Html } from '@react-three/drei';

export function ProjectionLabels({ yPoint, yHatPoint, residual, x1, x2, isMobileView }) {
  const sz = isMobileView ? 0.22 : 0.26;

  const x1LabelPos = x1.clone().multiplyScalar(1.12).add(new THREE.Vector3(0.1, 0.18, 0));
  const x2LabelPos = x2.clone().multiplyScalar(1.12).add(new THREE.Vector3(-0.18, 0.16, 0.08));

  const htmlStyle = {
    color: '#6ee7b7',
    fontFamily: 'monospace',
    fontSize: isMobileView ? '11px' : '13px',
    pointerEvents: 'none',
    textShadow: '0 0 8px rgba(110,231,183,0.55)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  };

  const yLabelPos = yPoint.clone().normalize().multiplyScalar(yPoint.length() + 0.22);
  const yHatLabelPos = yHatPoint.clone().add(new THREE.Vector3(-0.28, -0.22, 0.14));
  const eLabelPos = yHatPoint.clone()
    .add(residual.clone().multiplyScalar(0.5))
    .add(new THREE.Vector3(0.22, 0.05, 0));

  return (
    <group>
      <Text
        position={yLabelPos}
        fontSize={isMobileView ? 0.24 : 0.28}
        color="#f8fafc"
        anchorX="center"
        anchorY="middle"
        renderOrder={100}
      >y</Text>

      <Text
        position={yHatLabelPos}
        fontSize={sz}
        color="#22c55e"
        anchorX="center"
        anchorY="middle"
        renderOrder={100}
      >ŷ</Text>

      {residual.length() > 0.01 && (
        <Text
          position={eLabelPos}
          fontSize={sz}
          color="#fb923c"
          anchorX="center"
          anchorY="middle"
          renderOrder={100}
        >e</Text>
      )}

      <Html position={x1LabelPos} center distanceFactor={10} zIndexRange={[50, 60]}>
        <span style={htmlStyle}>x<sub>1</sub></span>
      </Html>

      <Html position={x2LabelPos} center distanceFactor={10} zIndexRange={[50, 60]}>
        <span style={htmlStyle}>x<sub>2</sub></span>
      </Html>
    </group>
  );
}
