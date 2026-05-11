import { skillCategories } from "../data/skills";

export default function Skills() {
  const skillDescriptions = {
    "Programming Languages": "Languages I use for data analysis, automation, academic programming, and web-based projects.",
    "Data Science & ML": "Statistical and machine learning skills developed through coursework, projects, and practical data analysis.",
    "Data Engineering & Wrangling": "Tools and methods I use to clean, transform, organize, and prepare data for analysis and modeling.",
    "Visualization & Tools": "Tools I use to create clear charts, dashboards, and reports that make data easier to understand.",
    "Web Development": "Frontend technologies I use to build portfolio pages, project interfaces, and interactive learning tools.",
    "Core Competencies": "Professional strengths that support fast learning, teamwork, problem solving, and project execution."
  };

  return (
    <section id="skills" className="border-b border-[var(--color-border)] px-6 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <p className="section-label">// skills</p>

        {/* Section heading */}
        <div className="mt-3 flex items-center gap-4">
          <div className="h-px w-10 shrink-0 bg-gradient-to-r from-[#90D24E] to-[#34D399]" />
          <h2 className="heading-main">Skills &amp; Experience</h2>
        </div>

        {/* Skills Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="card-base group flex flex-col p-6 transition-all duration-300 hover:scale-[1.015]"
            >
              {/* Header — fixed-height area so description starts at same vertical level */}
              <div
                className="mb-4 flex items-start gap-3"
                style={{ minHeight: '4rem' }}
              >
                <span className="mt-0.5 shrink-0 text-2xl">{category.icon}</span>
                <h3 className="text-base font-bold leading-snug text-[var(--color-text-primary)]">
                  {category.category}
                </h3>
              </div>

              {/* Description */}
              <p className="mb-5 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {skillDescriptions[category.category]}
              </p>

              {/* Divider before tags */}
              <div className="divider-green" />

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <span key={skillIdx} className="tag">{skill}</span>
                ))}
              </div>

              {/* Bottom hover accent */}
              <div className="mt-5 h-0.5 w-0 bg-gradient-to-r from-[var(--color-bright-green)] to-[var(--color-lime-accent)] transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Bottom area */}
        <div className="mt-8 text-center">
          <p className="mb-8 text-sm text-[var(--color-text-muted)]">
            Always learning, always building.
          </p>
          {/* Badge — pill style, intentional */}
          <span
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
            style={{
              background: 'rgba(52, 211, 153, 0.08)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              color: '#34d399',
              letterSpacing: '0.01em'
            }}
          >
            <span className="terminal-blink h-2 w-2 rounded-full bg-[#34d399]" />
            Open to collaborations and challenging projects
          </span>
        </div>

      </div>
    </section>
  );
}
