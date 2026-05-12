import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { RegressionGeometry } from './RegressionGeometry';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Y_VEC, getPlaneNormal, projectPointOntoPlane, isValidPlane } from './RegressionMath';

const ORIGIN = new THREE.Vector3(0, 0, 0);

function CameraController({ controlsRef, focusTarget, isMobileView, yHatPoint }) {
  const { camera } = useThree();
  const targetPos = useRef(null);
  const targetLook = useRef(null);

  const defaultPos = useMemo(
    () => isMobileView ? new THREE.Vector3(3.2, 2.2, 4.4) : new THREE.Vector3(3.8, 2.45, 4.6),
    [isMobileView]
  );

  useEffect(() => {
    if (!focusTarget) {
      targetPos.current = defaultPos.clone();
      targetLook.current = ORIGIN.clone();
      return;
    }

    const yMid = Y_VEC.clone().multiplyScalar(0.5);
    const yHatMid = yHatPoint.clone().multiplyScalar(0.5);
    const eMid = yHatPoint.clone().lerp(Y_VEC, 0.5);

    const presets = {
      y: {
        pos: isMobileView ? new THREE.Vector3(2.2, 2.4, 3.6) : new THREE.Vector3(2.6, 2.6, 4.0),
        look: yMid,
      },
      yhat: {
        pos: isMobileView ? new THREE.Vector3(2.6, 1.6, 3.4) : new THREE.Vector3(3.0, 1.8, 3.8),
        look: yHatMid,
      },
      residual: {
        pos: isMobileView ? new THREE.Vector3(2.0, 2.2, 3.2) : new THREE.Vector3(2.4, 2.6, 3.8),
        look: eMid,
      },
    };

    const preset = presets[focusTarget];
    if (preset) {
      targetPos.current = preset.pos;
      targetLook.current = preset.look;
    }
  }, [focusTarget, isMobileView, yHatPoint, defaultPos]);

  useFrame(() => {
    if (!controlsRef.current || !targetPos.current || !targetLook.current) return;

    controlsRef.current.enabled = false;
    camera.position.lerp(targetPos.current, 0.08);
    controlsRef.current.target.lerp(targetLook.current, 0.08);
    controlsRef.current.update();

    if (
      camera.position.distanceTo(targetPos.current) < 0.01 &&
      controlsRef.current.target.distanceTo(targetLook.current) < 0.01
    ) {
      camera.position.copy(targetPos.current);
      controlsRef.current.target.copy(targetLook.current);
      controlsRef.current.update();
      controlsRef.current.enabled = true;
      targetPos.current = null;
      targetLook.current = null;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableZoom={true}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={isMobileView ? 0.45 : 0.65}
      zoomSpeed={0.7}
      minDistance={2}
      maxDistance={8}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={Math.PI * 0.8}
    />
  );
}

export function RegressionProjectionScene({ isMobileView, focusTarget, x1, x2 }) {
  const reducedMotion = usePrefersReducedMotion();
  const controlsRef = useRef();

  const yHatPoint = useMemo(() => {
    if (!isValidPlane(x1, x2)) return Y_VEC.clone();
    const normal = getPlaneNormal(x1, x2);
    return projectPointOntoPlane(Y_VEC.clone(), normal, ORIGIN);
  }, [x1, x2]);

  return (
    <div className="regression-canvas-wrap">
      <Canvas
        camera={{
          position: isMobileView ? [3.2, 2.2, 4.4] : [3.8, 2.45, 4.6],
          fov: isMobileView ? 50 : 40,
        }}
        dpr={isMobileView ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 0);
        }}
        fallback={
          <div className="regression-webgl-fallback">
            <span>WebGL unavailable</span>
          </div>
        }
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} />
        <CameraController
          controlsRef={controlsRef}
          focusTarget={focusTarget}
          isMobileView={isMobileView}
          yHatPoint={yHatPoint}
        />
        <RegressionGeometry
          isMobileView={isMobileView}
          reducedMotion={reducedMotion}
          x1={x1}
          x2={x2}
        />
      </Canvas>
    </div>
  );
}
