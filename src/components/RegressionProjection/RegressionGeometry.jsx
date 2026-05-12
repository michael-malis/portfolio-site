import * as THREE from 'three';
import { useRef, useMemo, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { VectorArrow } from './VectorArrow';
import { PlaneSpan } from './PlaneSpan';
import { ProjectionLabels } from './ProjectionLabels';
import {
  getPlaneNormal,
  projectPointOntoPlane,
  getResidualVector,
  isValidPlane,
  VECTOR_COLORS,
} from './RegressionMath';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const COLORS = {
  yObserved: VECTOR_COLORS.y,
  yPredicted: VECTOR_COLORS.yhat,
  residual: VECTOR_COLORS.epsilon,
  x1: VECTOR_COLORS.x,
  x2: VECTOR_COLORS.x,
};

function GridFaded() {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) return;
    const mat = ref.current.material;
    mat.transparent = true;
    mat.opacity = 0.22;
    mat.needsUpdate = true;
  }, []);
  return <gridHelper ref={ref} args={[4, 8, '#BECDC8', '#BECDC8']} position={[0, -0.6, 0]} />;
}

const ORIGIN = new THREE.Vector3(0, 0, 0);

function DraggableHandle({ position, color, onDrag, controlsRef, groupRef, setDraggingAny, interactionRef }) {
  const { camera, gl } = useThree();
  const dragging = useRef(false);
  const dragPlane = useRef(new THREE.Plane());
  const ray = useRef(new THREE.Raycaster());
  const onDragRef = useRef(onDrag);
  useEffect(() => { onDragRef.current = onDrag; }, [onDrag]);

  useEffect(() => {
    const controls = controlsRef?.current;
    return () => {
      if (dragging.current && controls) {
        controls.enabled = true;
      }
    };
  }, [controlsRef]);

  const onPointerDown = (e) => {
    e.stopPropagation();
    dragging.current = true;
    setDraggingAny(true);
    interactionRef?.current?.pause();
    if (controlsRef?.current) controlsRef.current.enabled = false;

    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    const worldPos = new THREE.Vector3().copy(position);
    if (groupRef?.current) groupRef.current.localToWorld(worldPos);
    dragPlane.current.setFromNormalAndCoplanarPoint(camDir, worldPos);

    gl.domElement.setPointerCapture(e.pointerId);

    const move = (ev) => {
      if (!dragging.current) return;
      const rect = gl.domElement.getBoundingClientRect();
      const nx = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      ray.current.setFromCamera({ x: nx, y: ny }, camera);
      const pt = new THREE.Vector3();
      if (!ray.current.ray.intersectPlane(dragPlane.current, pt)) return;
      if (groupRef?.current) groupRef.current.worldToLocal(pt);
      if (pt.length() > 4) pt.normalize().multiplyScalar(4);
      if (pt.length() < 0.15) return;
      onDragRef.current(pt.clone());
    };

    const up = (ev) => {
      dragging.current = false;
      setDraggingAny(false);
      interactionRef?.current?.scheduleResume();
      if (controlsRef?.current) controlsRef.current.enabled = true;
      gl.domElement.releasePointerCapture(ev.pointerId);
      gl.domElement.removeEventListener('pointermove', move);
      gl.domElement.removeEventListener('pointerup', up);
      gl.domElement.removeEventListener('pointercancel', up);
    };

    gl.domElement.addEventListener('pointermove', move);
    gl.domElement.addEventListener('pointerup', up);
    gl.domElement.addEventListener('pointercancel', up);
  };

  return (
    <mesh position={position} onPointerDown={onPointerDown}>
      <sphereGeometry args={[0.18, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

export function RegressionGeometry({
  isMobileView,
  reducedMotion: reducedMotionProp,
  x1, x2, y,
  onDragX1, onDragX2, onDragY,
  controlsRef,
  interactionRef,
}) {
  const groupRef = useRef();
  const isDraggingAny = useRef(false);
  const setDraggingAny = useCallback((val) => { isDraggingAny.current = val; }, []);
  const reducedMotionFromHook = usePrefersReducedMotion();
  const reducedMotion = reducedMotionProp !== undefined ? reducedMotionProp : reducedMotionFromHook;

  const { yPoint, yHatPoint, residual, normal, valid } = useMemo(() => {
    const yVec = y.clone();
    if (!isValidPlane(x1, x2)) {
      return {
        yPoint: yVec, yHatPoint: yVec.clone(),
        residual: new THREE.Vector3(),
        normal: new THREE.Vector3(0, 1, 0),
        valid: false,
      };
    }
    const n = getPlaneNormal(x1, x2);
    const yHat = projectPointOntoPlane(yVec, n, ORIGIN);
    const e = getResidualVector(yVec, yHat);
    return { yPoint: yVec, yHatPoint: yHat, residual: e, normal: n, valid: true };
  }, [x1, x2, y]);

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
    if (!groupRef.current || reducedMotion || isDraggingAny.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.025;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.10) * 0.012;
  });

  return (
    <group ref={groupRef}>
      <GridFaded />

      <PlaneSpan x1={x1} x2={x2} />

      <VectorArrow from={ORIGIN} to={yPoint} color={COLORS.yObserved} />
      <VectorArrow from={ORIGIN} to={yHatPoint} color={COLORS.yPredicted} />
      {valid && residual.length() > 0.01 && (
        <VectorArrow from={yHatPoint} to={yPoint} color={COLORS.residual} />
      )}
      <VectorArrow from={ORIGIN} to={x1} color={COLORS.x1} />
      <VectorArrow from={ORIGIN} to={x2} color={COLORS.x2} />

      {rightAngleGeometry && (
        <line geometry={rightAngleGeometry}>
          <lineBasicMaterial color={COLORS.residual} linewidth={2} />
        </line>
      )}

      <DraggableHandle
        position={yPoint}
        color={COLORS.yObserved}
        onDrag={onDragY}
        controlsRef={controlsRef}
        groupRef={groupRef}
        setDraggingAny={setDraggingAny}
        interactionRef={interactionRef}
      />
      <DraggableHandle
        position={x1}
        color={COLORS.x1}
        onDrag={onDragX1}
        controlsRef={controlsRef}
        groupRef={groupRef}
        setDraggingAny={setDraggingAny}
        interactionRef={interactionRef}
      />
      <DraggableHandle
        position={x2}
        color={COLORS.x2}
        onDrag={onDragX2}
        controlsRef={controlsRef}
        groupRef={groupRef}
        setDraggingAny={setDraggingAny}
        interactionRef={interactionRef}
      />

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
