import { RegressionProjectionCard } from './RegressionProjectionCard';

export function FancyVisualisationSection() {
  return (
    <section id="fancy-visualisation" className="fancy-visualisation-section">
      <div className="mx-auto px-6 sm:px-8">
        <div className="fancy-visualisation-header">
          <p className="section-label">// fancy visualisation</p>
          <h2>Linear Regression as Projection</h2>
          <p className="mt-3">
            Matrix view of prediction: <strong>y</strong> decomposes into fitted values <strong>ŷ</strong> and residual error <strong>e</strong>.
          </p>
        </div>

        <div className="regression-layout">
          {/* Left column: 75% — Canvas visualization */}
          <div className="regression-visual-column">
            <RegressionProjectionCard />
          </div>

          {/* Right column: 25% — Math reference panel */}
          <aside className="regression-math-panel" aria-label="Linear regression math reference">
            <h3 className="regression-math-title">Matrix form</h3>

            <div className="regression-formula">y = Xβ + e</div>
            <ul className="regression-math-list">
              <li><span className="regression-math-symbol">y</span> observed response</li>
              <li><span className="regression-math-symbol">X</span> design matrix</li>
              <li><span className="regression-math-symbol">β</span> coefficients</li>
              <li><span className="regression-math-symbol">e</span> residual vector</li>
            </ul>

            <div className="regression-formula">
              span(X) = &#123;x<sub>i</sub>, x<sub>j</sub>&#125;
            </div>
            <p className="regression-formula-note">all linear combos of columns of X</p>

            <div className="regression-formula">β̂ = (XᵀX)⁻¹Xᵀy</div>
            <p className="regression-formula-note">least-squares estimate (XᵀX invertible)</p>

            <div className="regression-formula">ŷ = P<sub>X</sub>y</div>
            <div className="regression-formula">P<sub>X</sub> = X(XᵀX)⁻¹Xᵀ</div>
            <p className="regression-formula-note">projection onto span(X)</p>

            <div className="regression-formula">e = y − ŷ</div>
            <div className="regression-formula">Xᵀe = 0</div>
            <p className="regression-formula-note">residual ⊥ span(X)</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
