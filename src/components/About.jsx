export default function About() {
  return (
    <section className="border-b border-[var(--color-border)] px-6 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <p className="section-label">// about</p>

        {/* Section heading */}
        <div className="mt-3 flex items-center gap-4">
          <div className="h-px w-10 shrink-0 bg-gradient-to-r from-[#78b83f] to-[#2bb67f]" />
          <h2 className="heading-main">About Me</h2>
        </div>

        {/* Content Grid — left text vertically centered relative to right cards */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-center">

          {/* Left Column — Bio */}
          <div className="flex flex-col justify-center space-y-5">
            <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
              I'm a Statistics, Data Science, and Machine Learning student passionate about transforming data into actionable insights.
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              With a strong foundation in statistical analysis, predictive modeling, and programming, I focus on solving real-world problems through data-driven decision-making. My work spans from exploratory analysis to production-ready ML systems.
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              I'm particularly interested in time series forecasting, causal inference, and building scalable data pipelines. When I'm not coding, I'm exploring new methodologies or contributing to open-source projects.
            </p>
          </div>

          {/* Right Column — Highlights */}
          <div className="space-y-4">
            <div className="card-base p-5">
              <h3 className="mb-2 text-sm font-semibold text-[#2bb67f]">
                📊 Specialization
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Statistical inference, predictive modeling, data visualization, and ML system design
              </p>
            </div>

            <div className="card-base p-5">
              <h3 className="mb-2 text-sm font-semibold text-[#2bb67f]">
                🎓 Education
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Hebrew University of Jerusalem · B.Sc. in Data Science &amp; Statistics
              </p>
            </div>

            <div className="card-base p-5">
              <h3 className="mb-2 text-sm font-semibold text-[#2bb67f]">
                💡 Mission
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Make data science accessible and impactful through clean code and clear communication
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
