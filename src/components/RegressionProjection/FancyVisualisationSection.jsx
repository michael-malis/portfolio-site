import { RegressionProjectionCard } from './RegressionProjectionCard';

export function FancyVisualisationSection() {
  return (
    <section id="fancy-visualisation" className="fancy-visualisation-section">
      <div className="mx-auto px-6 sm:px-8">
        <div className="fancy-visualisation-header">
          <p className="section-label">// fancy visualisation</p>
          <h2>Linear Regression as Projection</h2>
          <p className="mt-3">
            Matrix view of prediction: <strong>y</strong> decomposes into fitted values <strong>ŷ</strong> and residual error <strong>ε</strong>.
          </p>
          <p className="fancy-visualisation-caption">
            <span className="regression-note-label">note:</span>{' '}
            you can drag y, x<sub>i</sub>, and x<sub>j</sub> to explore how the geometry changes.
          </p>
        </div>

        <div className="regression-layout">
          {/* Left column: 75% — Canvas visualization */}
          <div className="regression-visual-column">
            <RegressionProjectionCard />
          </div>

          {/* Right column: 25% — Math reference panel */}
          <aside className="regression-math-panel" aria-label="Linear regression math reference">
            <h3 className="regression-math-title">ΔLGEBRΔIC DERIVΔTION</h3>

            <div className="regression-formula">
              <span className="math-sym-y"><em>y</em></span> = <span className="math-sym-x"><em>X</em></span>β + <span className="math-sym-eps">ε</span>
            </div>
            <ul className="regression-math-list">
              <li><span className="regression-math-symbol math-sym-y"><em>y</em></span> observed response</li>
              <li><span className="regression-math-symbol math-sym-x"><em>X</em></span> design matrix</li>
              <li><span className="regression-math-symbol">β</span> coefficients</li>
              <li><span className="regression-math-symbol math-sym-eps">ε</span> residual vector</li>
            </ul>

            <div className="regression-formula">
              <span className="math-sym-x">span(<em>X</em>)</span> = &#123;<span className="math-sym-x"><em>x</em><sub>i</sub></span>, <span className="math-sym-x"><em>x</em><sub>j</sub></span>&#125;
            </div>
            <p className="regression-formula-note">all linear combos of columns of X</p>

            <div className="regression-formula">
              <span className="regression-betahat">β<span className="regression-betahat-hat">ˆ</span></span> = (<span className="math-sym-x"><em>X</em></span><sup>T</sup><span className="math-sym-x"><em>X</em></span>)<sup>−1</sup><span className="math-sym-x"><em>X</em></span><sup>T</sup><span className="math-sym-y"><em>y</em></span>
            </div>
            <p className="regression-formula-note">least-squares estimate (<em>X</em><sup>T</sup><em>X</em> invertible)</p>

            <div className="regression-formula">
              <span className="math-sym-yhat"><em>ŷ</em></span> = <span className="math-sym-x"><em>P</em><sub>X</sub></span><span className="math-sym-y"><em>y</em></span>
            </div>
            <div className="regression-formula">
              <span className="math-sym-x"><em>P</em><sub>X</sub></span> = <span className="math-sym-x"><em>X</em></span>(<span className="math-sym-x"><em>X</em></span><sup>T</sup><span className="math-sym-x"><em>X</em></span>)<sup>−1</sup><span className="math-sym-x"><em>X</em></span><sup>T</sup>
            </div>
            <p className="regression-formula-note">projection onto span(X)</p>

            <div className="regression-formula">
              <span className="math-sym-eps">ε</span> = <span className="math-sym-y"><em>y</em></span> − <span className="math-sym-yhat"><em>ŷ</em></span>
            </div>
            <div className="regression-formula">
              <span className="math-sym-x"><em>X</em></span><sup>T</sup><span className="math-sym-eps">ε</span> = 0
            </div>
            <p className="regression-formula-note">residual ⊥ span(X)</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
