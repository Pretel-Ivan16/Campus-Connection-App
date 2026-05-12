import { Link } from "react-router-dom";

export const NavLinks = () => {
  return (
    <nav className="flex gap-4 md:gap-8">
      <Link to="/publicaciones" className="text-[#8f8f8f] hover:text-[#eee] transition-colors text-xs sm:text-sm md:text-base">
        Publicaciones
      </Link>
      <Link to="/facultades" className="text-[#8f8f8f] hover:text-[#eee] transition-colors text-xs sm:text-sm md:text-base">
        Facultades
      </Link>
      <Link to="/foros" className="text-[#8f8f8f] hover:text-[#eee] transition-colors text-xs sm:text-sm md:text-base">
        Foros
      </Link>
    </nav>
  );
};
