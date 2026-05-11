import avatar from "../assets/profile-avatar.png";

export default function Hero() {
  return (
    <section id="about" className="border-b border-[var(--color-border)] px-6 pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-12 lg:pb-12">
      <div className="mx-auto max-w-6xl">

        {/* Section Label — outside the card, consistent with all other sections */}
        <div className="mb-4">
          <p className="section-label">// profile</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-[var(--color-surface-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-soft)] p-7 shadow-2xl sm:p-9 lg:p-10">

          {/* Left accent bar */}
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-[var(--color-bright-green)] via-[var(--color-muted-green)] to-transparent" />

          {/* Desktop: side-by-side | Mobile: stacked */}
          <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between md:gap-12">

            {/* Text content */}
            <div className="min-w-0 flex-1">
              <div className="mb-5 h-0.5 w-16 bg-gradient-to-r from-[var(--color-bright-green)] via-[var(--color-lime-accent)] to-transparent" />

              {/* Main heading */}
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                <span className="bg-gradient-to-r from-[#78b83f] to-[#2bb67f] bg-clip-text text-transparent">Michael Malis</span>
              </h1>

              {/* Subtitle — solid #34d399, small and calm, not competing with the name */}
              <p
                className="mt-2 text-base font-medium"
                style={{ color: '#34d399', fontSize: '1.0625rem' }}
              >
                Statistics &amp; Data Science Student · Hebrew University of Jerusalem
              </p>

              {/* Meta rows */}
              <div className="mt-7 space-y-2.5 font-mono text-sm">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="shrink-0 font-semibold text-[var(--color-muted-green)]">role:</span>
                  <span className="text-[var(--color-text-secondary)]">Statistics &amp; Data Science</span>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="shrink-0 font-semibold text-[var(--color-muted-green)]">education:</span>
                  <span className="text-[var(--color-text-secondary)]">Hebrew University</span>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="shrink-0 font-semibold text-[var(--color-muted-green)]">focus:</span>
                  <span className="text-[var(--color-text-secondary)]">ML · Statistics · Data</span>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="shrink-0 font-semibold text-[var(--color-muted-green)]">location:</span>
                  <span className="text-[var(--color-text-secondary)]">Jerusalem</span>
                </div>
              </div>

              {/* Divider */}
              <div className="divider-green" />

              {/* Contact links — EMAIL: and LINKEDIN: with colon label style */}
              <div className="space-y-2.5 font-mono text-sm">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="shrink-0 font-semibold text-[var(--color-muted-green)]">EMAIL:</span>
                  <a
                    href="mailto:mykhailo.malis@gmail.com"
                    className="break-all font-semibold text-[var(--color-text-primary)] underline decoration-[var(--color-muted-green)]/40 underline-offset-2 transition hover:text-[var(--color-bright-green)] hover:decoration-[var(--color-bright-green)]"
                  >
                    mykhailo.malis@gmail.com
                  </a>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="shrink-0 font-semibold text-[var(--color-muted-green)]">LINKEDIN:</span>
                  <a
                    href="https://www.linkedin.com/in/michael-malis/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--color-text-primary)] underline decoration-[var(--color-muted-green)]/40 underline-offset-2 transition hover:text-[var(--color-bright-green)] hover:decoration-[var(--color-bright-green)]"
                  >
                    /in/michael-malis
                  </a>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#projects" className="btn-primary">
                  View Projects
                </a>
                <a href="#skills" className="btn-secondary">
                  Explore Skills
                </a>
              </div>
            </div>

            {/* Avatar */}
            <div className="flex justify-center md:block md:shrink-0 md:pt-2">
              <div className="relative h-60 w-60 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] shadow-2xl sm:h-64 sm:w-64 lg:h-80 lg:w-80">
                <div className="absolute inset-0 z-10 rounded-xl shadow-[inset_0_0_20px_rgba(52,211,153,0.12)]" />
                <div className="absolute -inset-32 z-0 rounded-full bg-gradient-to-br from-[var(--color-secondary-active)]/15 to-transparent blur-3xl" />
                <img
                  src={avatar}
                  alt="Michael Malis"
                  className="relative z-5 h-full w-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
