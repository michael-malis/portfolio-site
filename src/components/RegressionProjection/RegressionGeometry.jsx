import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { VectorArrow } from './VectorArrow';
import { PlaneSpan } from './PlaneSpan';
import { ProjectionLabels } from './ProjectionLabels';
import {
  Y_VEC,
  getPlaneNormal,
  projectPointOntoPlane,
  getResidualVector,
  isValidPlane,
} from './RegressionMath';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const COLORS = {
  yObserved: 0xf8fafc,
  yPredicted: 0x22c55e,
  residual: 0xfb923c,
  x1: 0x6ee7b7,
  x2: 0x6ee7b7,
};

const ORIGIN = new THREE.Vector3(0, 0, 0);

export function RegressionGeometry({ isMobileView, reducedMotion: reducedMotionProp, x1, x2 }) {
  const groupRef = useRef();
  const reducedMotionFromHook = usePrefersReducedMotion();
  const reducedMotion = reducedMotionProp !== undefined ? reducedMotionProp : reducedMotionFromHook;

  const { x1Scaled, x2Scaled, yPoint, yHatPoint, residual, normal, valid } = useMemo(() => {
    const yVec = Y_VEC.clone();
    const x1s = x1.clone().multiplyScalar(1.1);
    const x2s = x2.clone().multiplyScalar(1.1);

    if (!isValidPlane(x1, x2)) {
      return {
        x1Scaled: x1s, x2Scaled: x2s,
        yPoint: yVec, yHatPoint: yVec.clone(),
        residual: new THREE.Vector3(),
        normal: new THREE.Vector3(0, 1, 0),
        valid: false,
      };
    }
    const n = getPlaneNormal(x1, x2);
    const yHat = projectPointOntoPlane(yVec, n, ORIGIN);
    const e = getResidualVector(yVec, yHat);
    return { x1Scaled: x1s, x2Scaled: x2s, yPoint: yVec, yHatPoint: yHat, residual: e, normal: n, valid: true };
  }, [x1, x2]);

  const residualMidpoint = useMemo(
    () => yHatPoint.clone().add(residual.clone().multiplyScalar(0.5)),
    [yHatPoint, residual]
  );

  const rightAngleGeometry = useMemo(() => {
    if (!valid || residual.length() < 0.01) return null;
    const size = 0.22;
    const cornerOffset = yHatPoint.clone().add(
      residual.clone().normalize().multiplyScalar(size * 0.3)
    );
    const p1 = cornerOffset.clone().add(normal.clone().multiplyScalar(0.001));
    const p2 = cornerOffset.clone().add(x1.clone().normalize().multiplyScalar(size * 0.15));
    const p3 = cornerOffset.clone().add(residual.clone().normalize().multiplyScalar(size * 0.15));
    const pts = [p1, p2, p1, p3];
    const positions = new Float32Array(pts.flatMap(p => [p.x, p.y, p.z]));
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [yHatPoint, residual, normal, x1, valid]);

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.025;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.10) * 0.012;
  });

  return (
    <group ref={groupRef}>
      <gridHelper args={[4, 8]} position={[0, -0.6, 0]} />

      <PlaneSpan x1={x1} x2={x2} scale={1.3} />

      <VectorArrow from={ORIGIN} to={yPoint} color={COLORS.yObserved} lineWidth={2} headSize={0.20} />
      <VectorArrow from={ORIGIN} to={yHatPoint} color={COLORS.yPredicted} lineWidth={2.5} headSize={0.18} />
      {valid && residual.length() > 0.01 && (
        <VectorArrow from={yHatPoint} to={yPoint} color={COLORS.residual} lineWidth={2} headSize={0.16} />
      )}

      <VectorArrow from={ORIGIN} to={x1Scaled} color={COLORS.x1} lineWidth={1.5} headSize={0.14} />
      <VectorArrow from={ORIGIN} to={x2Scaled} color={COLORS.x2} lineWidth={1.5} headSize={0.14} />

      <mesh position={yPoint}>
        <sphereGeometry args={[0.10, 16, 16]} />
        <meshBasicMaterial color={COLORS.yObserved} />
      </mesh>

      <mesh position={yHatPoint}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={COLORS.yPredicted} />
      </mesh>

      {/* Static orange residual marker at midpoint */}
      {valid && residual.length() > 0.01 && (
        <mesh position={residualMidpoint}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={COLORS.residual} />
        </mesh>
      )}

      {rightAngleGeometry && (
        <line geometry={rightAngleGeometry}>
          <lineBasicMaterial color={COLORS.residual} linewidth={2} />
        </line>
      )}

      <ProjectionLabels
        yPoint={yPoint}
        yHatPoint={yHatPoint}
        residual={residual}
        x1={x1}
        x2={x2}
        isMobileView={isMobileView}
      />
    </group>
  );
}
