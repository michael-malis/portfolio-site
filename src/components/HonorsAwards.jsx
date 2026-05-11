import { awards } from "../data/awards";

export default function HonorsAwards() {
  return (
    <section id="awards" className="border-b border-[var(--color-border)] px-6 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <p className="section-label">// honors &amp; awards</p>

        {/* Section heading */}
        <div className="mt-3 flex items-center gap-4">
          <div className="h-px w-10 shrink-0 bg-gradient-to-r from-[#78b83f] to-[#2bb67f]" />
          <h2 className="heading-main">Recognition</h2>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-[#d7dee8]">
          Achievements and recognition for excellence in data science and machine learning projects.
        </p>

        <div className="mt-10 space-y-8 sm:space-y-10">
          {awards.map((award) => (
            <article
              key={award.title}
              className="card-base relative rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 sm:p-9"
            >
              {/* Top accent line */}
              <div className="relative mb-6 h-0.5 w-32 bg-gradient-to-r from-[#78b83f] via-[#a8c68c] to-transparent rounded" />

              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  {/* Badge label */}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a8c68c]/40 bg-[#a8c68c]/8 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#a8c68c]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a8c68c]" />
                    🏆 Achievement
                  </span>

                  {/* Primary headline */}
                  <h3 className="mt-4 text-3xl font-bold tracking-tight text-[#78b83f] sm:text-4xl">
                    1st Place Hackathon Award
                  </h3>

                  {/* Project name — subtitle in heading area */}
                  <p className="mt-2 text-lg font-semibold text-[#d7dee8] sm:text-xl">
                    {award.title.replace("Hackathon Award — ", "")}
                  </p>
                </div>
                <span className="font-mono text-sm font-semibold text-[var(--color-text-muted)]">{award.date}</span>
              </div>

              {/* Description */}
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                {award.description}
              </p>

              {/* Details — two columns */}
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {award.details.map((detail, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[var(--color-text-secondary)]">
                    <span className="shrink-0 font-mono font-bold text-[var(--color-lime-accent)]">+</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Divider before tags */}
              <div className="divider-green" />

              {/* Tags + Button */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {award.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <a
                  href={award.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta shrink-0"
                >
                  {award.buttonText}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
