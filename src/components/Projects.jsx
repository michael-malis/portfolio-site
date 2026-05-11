import { projectSections } from "../data/projects";
import ProjectCard from "./ProjectCard";

const SECTION_LABELS = {
  "Data Analysis Projects": "DATA ANALYSIS",
  "Statistical & Probability Studies": "STATISTICS & PROBABILITY",
};

export default function Projects() {
  return (
    <section id="projects" className="border-b border-[var(--color-border)] px-6 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <p className="section-label">// projects</p>

        {/* Section heading */}
        <div className="mt-3 flex items-center gap-4">
          <div className="h-px w-10 shrink-0 bg-gradient-to-r from-[#78b83f] to-[#2bb67f]" />
          <h2 className="heading-main">Selected Works</h2>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-[#d7dee8]">
          Data analysis, statistical modeling, and machine learning projects showcasing practical applications.
        </p>

        <div className="mt-10 space-y-12 sm:space-y-14">
          {projectSections.map((section) => (
            <div key={section.title}>
              {/* Sub-section header */}
              <div className="flex items-center gap-4">
                <span className="shrink-0 rounded-md border border-[var(--color-surface-border)] bg-[var(--color-surface-soft)] px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-lime-accent)]">
                  {SECTION_LABELS[section.title] ?? section.title.toUpperCase()}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-surface-border)] to-transparent" />
              </div>

              {/* Sub-section title — solid green, increased size */}
              <h3
                className="mt-4 font-bold tracking-tight projects-subsection-title"
              >
                {section.title}
              </h3>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {section.projects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
