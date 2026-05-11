const PANEL_LABELS = {
  "Data Analysis": "ANALYSIS",
  "Text Mining": "TEXT MINING",
  "Statistics": "STATISTICS",
  "Statistical Modeling": "MODELING",
};

function getPanelLabel(tags) {
  for (const tag of tags) {
    if (PANEL_LABELS[tag]) return PANEL_LABELS[tag];
  }
  return tags[0]?.toUpperCase() ?? "PROJECT";
}

export default function ProjectCard({ project }) {
  const panelLabel = getPanelLabel(project.tags);

  return (
    <article className="card-base group relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5">
      {/* Top accent line */}
      <div className="relative mb-5 h-0.5 bg-gradient-to-r from-[var(--color-bright-green)]/60 via-[var(--color-lime-accent)]/30 to-transparent" />

      {/* Panel label */}
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted-green)]">
        [{panelLabel}]
      </p>

      {/* Project title — solid green, below main section headings in hierarchy */}
      <h3
        className="mt-2.5 text-lg font-bold tracking-tight sm:text-xl project-card-title"
      >
        {project.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {project.description}
      </p>

      {project.note && (
        <p className="mt-3 text-xs italic text-[var(--color-text-muted)]">
          <span className="font-mono font-semibold not-italic text-[#2bb67f]">note:</span>{" "}
          {project.note}
        </p>
      )}

      {/* Divider before tags */}
      <div className="divider-green" />

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* CTA button */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cta mt-5 self-start"
      >
        {project.buttonText}
      </a>
    </article>
  );
}
