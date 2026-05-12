import { useState, useCallback, Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { RegressionProjectionScene } from './RegressionProjectionScene';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { useIsMobile } from '../../hooks/useIsMobile';
import { isValidPlane } from './RegressionMath';

const DEFAULT_X1 = { x: 2.21, y: 0, z: 0.33 };
const DEFAULT_X2 = { x: -0.46, y: 0, z: 1.76 };
const DEFAULT_Y = { x: 1.50, y: 2.21, z: 1.24 };

const LEGEND_ITEMS = [
  { cls: 'regression-legend-swatch-y',        symCls: 'math-sym-y',    sym: 'y',  desc: '— observed' },
  { cls: 'regression-legend-swatch-yhat',     symCls: 'math-sym-yhat', sym: 'ŷ', desc: '— predicted' },
  { cls: 'regression-legend-swatch-residual', symCls: 'math-sym-eps',  sym: 'ε',  desc: '— residual' },
];

export function RegressionProjectionCard() {
  const isMobileView = useIsMobile();
  const [focusTarget, setFocusTarget] = useState(null);
  const [x1State, setX1State] = useState(DEFAULT_X1);
  const [x2State, setX2State] = useState(DEFAULT_X2);
  const [yState, setYState] = useState(DEFAULT_Y);

  const x1Vec = useMemo(
    () => new THREE.Vector3(x1State.x, x1State.y, x1State.z),
    [x1State.x, x1State.y, x1State.z]
  );
  const x2Vec = useMemo(
    () => new THREE.Vector3(x2State.x, x2State.y, x2State.z),
    [x2State.x, x2State.y, x2State.z]
  );
  const yVec = useMemo(
    () => new THREE.Vector3(yState.x, yState.y, yState.z),
    [yState.x, yState.y, yState.z]
  );

  const handleFocus = (target) => setFocusTarget(prev => prev === target ? null : target);

  const handleDragX1 = useCallback((newVec) => {
    if (newVec.length() < 0.1) return;
    if (!isValidPlane(newVec, x2Vec)) return;
    setX1State({ x: newVec.x, y: newVec.y, z: newVec.z });
  }, [x2Vec]);

  const handleDragX2 = useCallback((newVec) => {
    if (newVec.length() < 0.1) return;
    if (!isValidPlane(x1Vec, newVec)) return;
    setX2State({ x: newVec.x, y: newVec.y, z: newVec.z });
  }, [x1Vec]);

  const handleDragY = useCallback((newVec) => {
    if (newVec.length() < 0.1) return;
    setYState({ x: newVec.x, y: newVec.y, z: newVec.z });
  }, []);

  return (
    <div
      className="regression-projection-card"
      aria-label="Visualization of linear regression as projection onto span X"
    >
      <div className="regression-card-header">
        <p>// residual orthogonality</p>
      </div>

      <div className="regression-legend" aria-label="Scene legend">
        {LEGEND_ITEMS.map((item, i) => (
          <div key={i} className="regression-legend-item">
            <span className={`regression-legend-swatch ${item.cls}`} />
            <span><span className={item.symCls}>{item.sym}</span>{' '}{item.desc}</span>
          </div>
        ))}
      </div>

      <CanvasErrorBoundary>
        <Suspense fallback={
          <div className="regression-canvas-wrap regression-webgl-fallback">
            <span>Loading...</span>
          </div>
        }>
          <RegressionProjectionScene
            isMobileView={isMobileView}
            focusTarget={focusTarget}
            x1={x1Vec}
            x2={x2Vec}
            y={yVec}
            onDragX1={handleDragX1}
            onDragX2={handleDragX2}
            onDragY={handleDragY}
          />
        </Suspense>
      </CanvasErrorBoundary>

      <div className="regression-equation">
        <span className="white">y</span>
        <span className="gray">=</span>
        <span className="green">ŷ</span>
        <span className="gray">+</span>
        <span className="orange">ε</span>
      </div>

      <div className="regression-card-footer">
        {[
          { key: 'y',        symCls: 'math-sym-y',    sym: 'y', desc: 'observed',  ariaLabel: 'Focus camera on observed y vector' },
          { key: 'yhat',     symCls: 'math-sym-yhat', sym: 'ŷ', desc: 'predicted', ariaLabel: 'Focus camera on predicted ŷ vector' },
          { key: 'residual', symCls: 'math-sym-eps',  sym: 'ε', desc: 'residual',  ariaLabel: 'Focus camera on residual error vector' },
        ].map(({ key, symCls, sym, desc, ariaLabel }) => (
          <button
            key={key}
            type="button"
            className={`regression-tag regression-focus-button regression-tag-${key}${focusTarget === key ? ' active' : ''}`}
            onClick={() => handleFocus(key)}
            aria-label={ariaLabel}
            aria-pressed={focusTarget === key}
          >
            <span className={symCls}>{sym}</span>{' '}{desc}
          </button>
        ))}
      </div>
    </div>
  );
}
