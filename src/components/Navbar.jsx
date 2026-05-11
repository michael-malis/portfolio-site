export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[rgba(52,211,153,0.15)] bg-[rgba(2,6,4,0.92)] backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5">

        {/* Logo */}
        <span className="shrink-0 font-mono text-2xl font-bold tracking-widest sm:text-3xl md:text-3xl lg:text-4xl">
          <span className="bg-gradient-to-r from-[#78b83f] to-[#2bb67f] bg-clip-text text-transparent">michael.malis</span><span className="cursor-blink bg-gradient-to-r from-[#78b83f] to-[#2bb67f] bg-clip-text text-transparent">_</span>
        </span>

        {/* Nav links — varied green palette */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 ml-4 justify-end">
          <a href="#about" className="nav-link nav-link-about">About</a>
          <a href="#skills" className="nav-link nav-link-skills">Skills</a>
          <a href="#projects" className="nav-link nav-link-projects">Projects</a>
          <a href="#contact" className="nav-link nav-link-contact">Contact</a>
        </div>

      </div>
    </nav>
  );
}
