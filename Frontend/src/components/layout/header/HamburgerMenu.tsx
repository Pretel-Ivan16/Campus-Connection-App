import { useState } from "react";
import { Link } from "react-router-dom";

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={toggleMenu}
        className="flex flex-col gap-1.5"
        aria-label="Toggle menu"
      >
        <span className={`w-5 h-0.5 bg-[#eee] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-5 h-0.5 bg-[#eee] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
        <span className={`w-5 h-0.5 bg-[#eee] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed top-28 left-0 right-0 min-h-[calc(100vh-7rem)] bg-black/20 backdrop-blur-md z-40 animate-in fade-in duration-300" onClick={closeMenu} />
          <nav className="fixed top-28 left-0 right-0 bg-background border-b border-[#2a2a2a] z-50 w-full animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-6 p-8 items-center justify-center">
              <Link to="/publicaciones" onClick={closeMenu} className="text-[#b0b0b0] hover:text-[#6483ff] font-semibold transition-colors mb-2">
                Publicaciones
              </Link>
              <Link to="/facultades" onClick={closeMenu} className="text-[#b0b0b0] hover:text-[#6483ff] font-semibold transition-colors mb-2">
                Facultades
              </Link>
              <Link to="/foros" onClick={closeMenu} className="text-[#b0b0b0] hover:text-[#6483ff] font-semibold transition-colors mb-2">
                Foros
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
};
