import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
      
      {/* Glass Container */}
      <div className="flex justify-between items-center px-6 py-3 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-lg shadow-black/30">
        
        {/* Logo */}
        <h1 className="text-lg font-semibold tracking-wide">
          Lakshan
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#home" className="hover:text-white hover:drop-shadow-[0_0_8px_white] transition">
            Home
          </a>
          <a href="#about" className="hover:text-white hover:drop-shadow-[0_0_8px_white] transition">
            About
          </a>
          <a href="#projects" className="hover:text-white hover:drop-shadow-[0_0_8px_white] transition">
            Projects
          </a>
          <a href="#achievements" className="hover:text-white hover:drop-shadow-[0_0_8px_white] transition">
            Achievements
          </a>
          <a href="#contact" className="hover:text-white hover:drop-shadow-[0_0_8px_white] transition">
            Contact
          </a>
        </div>

        {/* Hamburger */}
        <div
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""}`}></span>
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`}></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-2 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col text-center py-4 gap-4 text-gray-300">
          <a href="#home" onClick={() => setOpen(false)}>Home</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
          <a href="#achievements" onClick={() => setOpen(false)}>Achievements</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </div>
      </div>
    </nav>
  );
}