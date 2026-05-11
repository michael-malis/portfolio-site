export default function Education() {
  return (
    <section className="border-b border-[var(--color-border)] px-6 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <p className="section-label">// education</p>

        {/* Section heading */}
        <div className="mt-3 flex items-center gap-4">
          <div className="h-px w-10 shrink-0 bg-gradient-to-r from-[#90D24E] to-[#34D399]" />
          <h2 className="heading-main">Education</h2>
        </div>

        {/* Education card */}
        <div className="mt-10 space-y-6">
          <div className="card-base overflow-hidden border-l-4 border-l-[var(--color-bright-green)] p-7 transition-all duration-300 hover:shadow-lg sm:p-9">

            {/* Header row */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                {/* Institution — main heading weight, white */}
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
                  Hebrew University of Jerusalem
                </h3>
                {/* Degree — solid #34d399 second-level, NOT gradient, smaller than institution */}
                <p
                  className="mt-1.5 text-base font-semibold"
                  style={{ color: '#34d399' }}
                >
                  B.Sc. in Data Science &amp; Statistics
                </p>
              </div>
              {/* In Progress badge — pill style */}
              <span
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{
                  background: 'rgba(52, 211, 153, 0.1)',
                  border: '1px solid rgba(52, 211, 153, 0.35)',
                  color: '#34d399'
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#34d399] inline-block" />
                In Progress
              </span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Focused coursework in statistical theory, machine learning algorithms, data engineering, and statistical inference. Developing expertise in predictive modeling and causal analysis.
            </p>

            {/* Divider before tags */}
            <div className="divider-green" />

            {/* Tags — no "Key Areas:" label */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['Statistical Inference', 'Machine Learning', 'Data Engineering', 'Causal Analysis', 'Time Series'].map((area) => (
                <span key={area} className="tag">{area}</span>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
