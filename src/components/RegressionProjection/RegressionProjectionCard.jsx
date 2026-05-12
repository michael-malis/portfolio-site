import { useState, useCallback, Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { RegressionProjectionScene } from './RegressionProjectionScene';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { useIsMobile } from '../../hooks/useIsMobile';
import { isValidPlane } from './RegressionMath';

const DEFAULT_X1 = { x: 1.7, y: 0, z: 0.25 };
const DEFAULT_X2 = { x: -0.35, y: 0, z: 1.35 };

const LEGEND_ITEMS = [
  { cls: 'regression-legend-swatch-y',        label: 'y' },
  { cls: 'regression-legend-swatch-yhat',     label: 'ŷ' },
  { cls: 'regression-legend-swatch-residual', label: 'e' },
  { cls: 'regression-legend-swatch-plane',    label: 'span(X)' },
  { cls: 'regression-legend-swatch-basis',    label: 'x1/x2' },
];

export function RegressionProjectionCard() {
  const isMobileView = useIsMobile();
  const [focusTarget, setFocusTarget] = useState(null);
  const [x1State, setX1State] = useState(DEFAULT_X1);
  const [x2State, setX2State] = useState(DEFAULT_X2);

  const x1Vec = useMemo(
    () => new THREE.Vector3(x1State.x, x1State.y, x1State.z),
    [x1State.x, x1State.y, x1State.z]
  );
  const x2Vec = useMemo(
    () => new THREE.Vector3(x2State.x, x2State.y, x2State.z),
    [x2State.x, x2State.y, x2State.z]
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

  return (
    <div
      className="regression-projection-card"
      aria-label="Visualization of linear regression as projection onto span X"
    >
      <div className="regression-card-header">
        <p>// matrix geometry</p>
      </div>

      <div className="regression-legend" aria-label="Scene legend">
        {LEGEND_ITEMS.map((item, i) => (
          <div key={i} className="regression-legend-item">
            <span className={`regression-legend-swatch ${item.cls}`} />
            <span>{item.label}</span>
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
            onDragX1={handleDragX1}
            onDragX2={handleDragX2}
          />
        </Suspense>
      </CanvasErrorBoundary>

      <div className="regression-equation">
        <span className="white">y</span>
        <span className="gray">=</span>
        <span className="green">ŷ</span>
        <span className="gray">+</span>
        <span className="orange">e</span>
      </div>

      <div className="regression-card-footer">
        {[
          { key: 'y',        label: 'y observed',  ariaLabel: 'Focus camera on observed y vector' },
          { key: 'yhat',     label: 'ŷ predicted', ariaLabel: 'Focus camera on predicted ŷ vector' },
          { key: 'residual', label: 'e residual',  ariaLabel: 'Focus camera on residual error vector' },
        ].map(({ key, label, ariaLabel }) => (
          <button
            key={key}
            type="button"
            className={`regression-tag regression-focus-button${focusTarget === key ? ' active' : ''}`}
            onClick={() => handleFocus(key)}
            aria-label={ariaLabel}
            aria-pressed={focusTarget === key}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
