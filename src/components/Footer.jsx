export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] px-6 py-16 text-center">
      <div className="mx-auto mb-6 h-px max-w-xs bg-gradient-to-r from-transparent via-[var(--color-secondary-active)]/30 to-transparent" />
      <p className="font-mono text-xs text-[var(--color-text-muted)]">© 2026 Michael Malis</p>
      <p className="mt-2 font-mono text-xs text-[var(--color-text-muted)]">Built with React, Vite and Tailwind CSS</p>
    </footer>
  );
}
