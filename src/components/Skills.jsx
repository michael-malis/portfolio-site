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
    <section id="skills" className="scroll-mt-20 border-b border-[var(--color-border)] px-6 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <p className="section-label">// skills</p>

        {/* Section heading */}
        <div className="mt-3 flex items-center gap-4">
          <div className="h-px w-10 shrink-0 bg-gradient-to-r from-[#78b83f] to-[#2bb67f]" />
          <h2 className="heading-main">Skills &amp; Experience</h2>
        </div>

        {/* Skills Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className={`card-base group flex flex-col p-6 transition-all duration-300 hover:scale-[1.015] ${
                category.category === "Data Science & ML" ? "skill-card-data-science" : ""
              }`}
            >
              {/* Header — fixed-height area so description starts at same vertical level */}
              <div className="mb-4 flex items-center gap-3">
                <span className="shrink-0 text-2xl leading-none">{category.icon}</span>
                <h3 className="text-base font-bold leading-tight skill-card-title">
                  {category.category}
                </h3>
              </div>

              {/* Description — fixed min-height for consistent divider positioning */}
              <p className="mb-5 text-sm leading-relaxed text-[var(--color-text-secondary)]" style={{ minHeight: '4rem' }}>
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
              <div className="mt-5 h-0.5 w-0 bg-gradient-to-r from-[#34d399] to-[#2bb67f] transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Bottom area */}
        <div className="mt-12 text-center">
          <p className="mb-6 text-sm text-[var(--color-text-muted)] skills-closing-line">
            Always learning, always building.
          </p>
          {/* Badge — pill style, intentional */}
          <span
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:bg-[rgba(52,211,153,0.12)]"
            style={{
              background: 'rgba(52, 211, 153, 0.08)',
              border: '1.5px solid rgba(52, 211, 153, 0.25)',
              color: '#2bb67f',
              letterSpacing: '0.3px'
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
