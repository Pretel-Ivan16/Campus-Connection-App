import { Link } from "react-router-dom"
import { User } from "lucide-react"

function UserAction() {
  return (
    <>
      {/* Icono en pantallas pequeñas */}
      <Link to="/login" className="lg:hidden flex items-center justify-center p-2">
        <User size={24} className="text-[#eee]" />
      </Link>

      {/* Botones en pantallas grandes */}
      <div className="hidden lg:flex gap-4 items-center justify-center h-10 rounded-lg">
        <Link to="/login" className="text-primary-foreground h-max whitespace-nowrap transition-colors text-sm lg:text-base"> 
          Iniciar Sesión
        </Link>
        <Link to="/register" className="p-2 text-primary-foreground hover:text-[#06070b] transition-colors text-sm lg:text-base bg-[#6483ff] rounded-lg">
          Registrarse
        </Link>
      </div>
    </>
  )
}

export default UserAction

