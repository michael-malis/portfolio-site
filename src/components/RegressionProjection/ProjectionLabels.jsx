import * as THREE from 'three';
import { Text, Html } from '@react-three/drei';

export function ProjectionLabels({ yPoint, yHatPoint, residual, x1, x2, isMobileView }) {
  const sz = isMobileView ? 0.22 : 0.26;
  const szSm = isMobileView ? 0.16 : 0.19;

  const x1LabelPos = x1.clone().multiplyScalar(1.15).add(new THREE.Vector3(0.12, 0.22, 0));
  const x2LabelPos = x2.clone().multiplyScalar(1.15).add(new THREE.Vector3(-0.2, 0.18, 0.1));
  const spanPos = new THREE.Vector3(0.5, -0.35, 0.6);
  const htmlFontSize = isMobileView ? '11px' : '13px';
  const htmlStyle = {
    color: '#6ee7b7',
    fontFamily: 'monospace',
    fontSize: htmlFontSize,
    pointerEvents: 'none',
    textShadow: '0 0 8px rgba(110,231,183,0.55)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  };

  return (
    <group>
      <Text
        position={yPoint.clone().normalize().multiplyScalar(yPoint.length() + 0.28)}
        fontSize={isMobileView ? 0.24 : 0.28}
        color="#f8fafc"
        anchorX="center"
        anchorY="middle"
        renderOrder={100}
      >y</Text>

      <Text
        position={yHatPoint.clone().add(new THREE.Vector3(-0.35, -0.3, 0.18))}
        fontSize={sz}
        color="#22c55e"
        anchorX="center"
        anchorY="middle"
        renderOrder={100}
      >ŷ</Text>

      {residual.length() > 0.01 && (
        <Text
          position={yHatPoint.clone().add(residual.clone().multiplyScalar(0.5)).add(new THREE.Vector3(0.28, 0, 0))}
          fontSize={sz}
          color="#fb923c"
          anchorX="center"
          anchorY="middle"
          renderOrder={100}
        >e</Text>
      )}

      <Text
        position={spanPos}
        fontSize={szSm}
        color="#34d399"
        anchorX="center"
        anchorY="middle"
        renderOrder={100}
      >span(X)</Text>

      <Html position={x1LabelPos} center distanceFactor={10} zIndexRange={[50, 60]}>
        <span style={htmlStyle}>x<sub>i</sub></span>
      </Html>

      <Html position={x2LabelPos} center distanceFactor={10} zIndexRange={[50, 60]}>
        <span style={htmlStyle}>x<sub>j</sub></span>
      </Html>
    </group>
  );
}
