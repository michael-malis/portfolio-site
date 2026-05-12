import * as THREE from 'three';
import { Billboard, Text, Html } from '@react-three/drei';
import { VECTOR_COLORS } from './RegressionMath';

export function ProjectionLabels({ yPoint, yHatPoint, residual, x1, x2, isMobileView }) {
  const sz = isMobileView ? 0.22 : 0.25;

  const x1LabelPos = x1.clone().multiplyScalar(0.5).add(new THREE.Vector3(0.0, 0.32, 0.0));
  const x2LabelPos = x2.clone().multiplyScalar(0.5).add(new THREE.Vector3(0.0, 0.32, 0.0));

  const htmlStyle = {
    color: VECTOR_COLORS.x,
    fontFamily: "'Courier New', monospace",
    fontSize: isMobileView ? '12px' : '13px',
    fontWeight: '600',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    lineHeight: '1',
  };

  const yLabelPos = yPoint.clone().multiplyScalar(0.5).add(new THREE.Vector3(0.30, 0.0, -0.25));
  const yHatLabelPos = yHatPoint.clone().multiplyScalar(0.5).add(new THREE.Vector3(0.28, 0.22, -0.18));
  const epsilonLabelPos = yHatPoint.clone()
    .add(residual.clone().multiplyScalar(0.5))
    .add(new THREE.Vector3(0.30, 0.0, -0.20));

  return (
    <group>
      <Billboard position={yLabelPos}>
        <Text
          fontSize={isMobileView ? 0.23 : 0.27}
          color={VECTOR_COLORS.y}
          anchorX="center"
          anchorY="middle"
          renderOrder={100}
        >y</Text>
      </Billboard>

      <Billboard position={yHatLabelPos}>
        <Text
          fontSize={sz}
          color={VECTOR_COLORS.yhat}
          anchorX="center"
          anchorY="middle"
          renderOrder={100}
        >ŷ</Text>
      </Billboard>

      {residual.length() > 0.01 && (
        <Billboard position={epsilonLabelPos}>
          <Text
            fontSize={sz}
            color={VECTOR_COLORS.epsilon}
            anchorX="center"
            anchorY="middle"
            renderOrder={100}
          >ε</Text>
        </Billboard>
      )}

      <Html position={x1LabelPos} center distanceFactor={10} zIndexRange={[50, 60]}>
        <span style={htmlStyle}>x<sub>i</sub></span>
      </Html>

      <Html position={x2LabelPos} center distanceFactor={10} zIndexRange={[50, 60]}>
        <span style={htmlStyle}>x<sub>j</sub></span>
      </Html>
    </group>
  );
}
