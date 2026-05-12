import { useState, Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { RegressionProjectionScene } from './RegressionProjectionScene';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { useIsMobile } from '../../hooks/useIsMobile';

const DEFAULT_X1 = { x: 1.7, y: 0, z: 0.25 };
const DEFAULT_X2 = { x: -0.35, y: 0, z: 1.35 };

const LEGEND_ITEMS = [
  { cls: 'regression-legend-swatch-y',        label: 'y' },
  { cls: 'regression-legend-swatch-yhat',     label: 'ŷ' },
  { cls: 'regression-legend-swatch-residual', label: 'e' },
  { cls: 'regression-legend-swatch-plane',    label: 'span(X)' },
  { cls: 'regression-legend-swatch-basis',    label: <>x<sub>i</sub>/x<sub>j</sub></> },
];

export function RegressionProjectionCard() {
  const isMobileView = useIsMobile();
  const [focusTarget, setFocusTarget] = useState(null);
  const [x1State, setX1State] = useState(DEFAULT_X1);
  const [x2State, setX2State] = useState(DEFAULT_X2);
  const [showControls, setShowControls] = useState(false);

  const x1Vec = useMemo(
    () => new THREE.Vector3(x1State.x, x1State.y, x1State.z),
    [x1State.x, x1State.y, x1State.z]
  );
  const x2Vec = useMemo(
    () => new THREE.Vector3(x2State.x, x2State.y, x2State.z),
    [x2State.x, x2State.y, x2State.z]
  );

  const handleFocus = (target) => setFocusTarget(prev => prev === target ? null : target);
  const handleX1 = (axis, val) => setX1State(prev => ({ ...prev, [axis]: parseFloat(val) }));
  const handleX2 = (axis, val) => setX2State(prev => ({ ...prev, [axis]: parseFloat(val) }));

  return (
    <div
      className="regression-projection-card"
      aria-label="Visualization of linear regression as projection onto span X"
    >
      {/* Card Header */}
      <div className="regression-card-header">
        <p>// matrix geometry</p>
      </div>

      {/* Legend — top-right */}
      <div className="regression-legend" aria-label="Scene legend">
        {LEGEND_ITEMS.map((item, i) => (
          <div key={i} className="regression-legend-item">
            <span className={`regression-legend-swatch ${item.cls}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Canvas */}
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
          />
        </Suspense>
      </CanvasErrorBoundary>

      {/* Formula Overlay */}
      <div className="regression-equation">
        <span className="white">y</span>
        <span className="gray">=</span>
        <span className="green">ŷ</span>
        <span className="gray">+</span>
        <span className="orange">e</span>
      </div>

      {/* span(X) controls — bottom-left */}
      <div className="regression-controls-toggle">
        <button
          type="button"
          className="regression-controls-toggle-btn"
          onClick={() => setShowControls(prev => !prev)}
          aria-expanded={showControls}
          aria-label="Toggle basis vector controls"
        >
          {showControls ? '▼' : '▶'} span(X)
        </button>
        {showControls && (
          <div className="regression-controls-panel">
            {[
              { label: <>x<sub>i</sub></>, state: x1State, handler: handleX1 },
              { label: <>x<sub>j</sub></>, state: x2State, handler: handleX2 },
            ].map(({ label, state, handler }, ri) => (
              <div key={ri} className="regression-control-row">
                <span className="regression-control-label">{label}</span>
                {['x', 'y', 'z'].map(axis => (
                  <label key={axis} className="regression-control-item">
                    <span>{axis}</span>
                    <input
                      type="range"
                      min="-5" max="5" step="0.2"
                      value={state[axis]}
                      onChange={e => handler(axis, e.target.value)}
                      className="regression-slider"
                      aria-label={`${axis} component`}
                    />
                    <span className="regression-control-val">{Number(state[axis]).toFixed(1)}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Focus buttons — bottom-center */}
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
