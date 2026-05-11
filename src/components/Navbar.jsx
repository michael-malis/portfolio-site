export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-surface-border)] bg-[var(--color-background)]/92 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:py-4">

        {/* Logo */}
        <span className="font-mono text-3xl font-bold tracking-widest sm:text-4xl">
          <span className="bg-gradient-to-r from-[#78b83f] to-[#2bb67f] bg-clip-text text-transparent">michael.malis</span><span className="cursor-blink bg-gradient-to-r from-[#78b83f] to-[#2bb67f] bg-clip-text text-transparent">_</span>
        </span>

        {/* Nav links — one cohesive gradient group */}
        <div className="flex gap-2 sm:gap-2.5">
          <a href="#about" className="nav-link nav-link:nth-child(1)">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

      </div>
    </nav>
  );
}
