import { Link } from "react-router-dom"
import { User } from "lucide-react"

function UserAction() {
  return (
    <>
      {/* Icono en pantallas pequeñas */}
      <Link to="/login" className="md:hidden flex items-center justify-center p-2">
        <User size={24} className="text-[#eee]" />
      </Link>

      {/* Botones en pantallas grandes */}
      <div className="hidden md:flex gap-2 md:gap-4 items-center justify-center md:m-9 h-8 md:h-10 px-3 md:w-64 md:p-8 bg-[#6483ff] rounded-lg">
        <Link to="/login" className="text-primary-foreground h-max hover:text-[#06070b] transition-colors text-sm lg:text-base"> 
          Iniciar Sesión
        </Link>
        <Link to="/register" className="ml-4 text-primary-foreground hover:text-[#06070b] transition-colors text-sm lg:text-base">
          Registrarse
        </Link>
      </div>
    </>
  )
}

export default UserAction

