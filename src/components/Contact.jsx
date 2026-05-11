export default function Contact() {
  return (
    <section id="contact" className="border-b border-[var(--color-border)] px-6 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <p className="section-label">// contact</p>

        {/* Section heading */}
        <div className="mt-3 flex items-center gap-4">
          <div className="h-px w-10 shrink-0 bg-gradient-to-r from-[#78b83f] to-[#2bb67f]" />
          <h2 className="heading-main">Get In Touch</h2>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-[var(--color-text-secondary)]">
          Interested in data science, machine learning, or collaboration opportunities? Let's connect.
        </p>

        <div className="mt-7 card-base p-7">
          <div className="grid gap-6 sm:grid-cols-2">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-muted-green)]">
                EMAIL:
              </span>
              <a
                href="mailto:mykhailo.malis@gmail.com"
                className="break-all text-base font-semibold text-[var(--color-text-primary)] underline decoration-[var(--color-muted-green)]/40 underline-offset-2 transition hover:text-[var(--color-bright-green)] hover:decoration-[var(--color-bright-green)]"
              >
                mykhailo.malis@gmail.com
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-muted-green)]">
                LINKEDIN:
              </span>
              <a
                href="https://www.linkedin.com/in/michael-malis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-[var(--color-text-primary)] underline decoration-[var(--color-muted-green)]/40 underline-offset-2 transition hover:text-[var(--color-bright-green)] hover:decoration-[var(--color-bright-green)]"
              >
                /in/michael-malis
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
