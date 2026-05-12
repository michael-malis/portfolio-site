import { useState } from 'react';

const navLinks = [
  { href: '#about', label: 'About', className: 'nav-link nav-link-about' },
  { href: '#skills', label: 'Skills', className: 'nav-link nav-link-skills' },
  { href: '#projects', label: 'Projects', className: 'nav-link nav-link-projects' },
  { href: '#contact', label: 'Contact', className: 'nav-link nav-link-contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[rgba(52,211,153,0.15)] bg-[rgba(2,6,4,0.92)] backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5">

        {/* Logo */}
        <span className="shrink-0 font-mono text-2xl font-bold tracking-widest sm:text-3xl md:text-3xl lg:text-4xl">
          <span className="bg-gradient-to-r from-[#78b83f] to-[#2bb67f] bg-clip-text text-transparent">michael.malis</span><span className="cursor-blink bg-gradient-to-r from-[#78b83f] to-[#2bb67f] bg-clip-text text-transparent">_</span>
        </span>

        {/* Desktop nav links — varied green palette */}
        <div className="hidden md:flex flex-wrap gap-1.5 sm:gap-2 ml-4 justify-end">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={link.className}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
        >
          <div className={`hamburger-line ${isMenuOpen ? 'line-1-active' : ''}`} />
          <div className={`hamburger-line ${isMenuOpen ? 'line-2-active' : ''}`} />
          <div className={`hamburger-line ${isMenuOpen ? 'line-3-active' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="mobile-menu-container border-t border-[rgba(52,211,153,0.15)] bg-[rgba(2,6,4,0.95)] backdrop-blur-lg">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`mobile-nav-link ${link.className.replace('nav-link', '').trim()}`}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
