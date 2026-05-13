import { Link, useNavigate } from "react-router-dom"
import { User, LogOut } from "lucide-react"
import { useAuth } from "../../../hooks/useAuth"
import { useState } from "react"
import UserButton from "../../ui/UserButton"
import DropdownMenu from "../../ui/DropdownMenu"
import DropdownItem from "../../ui/DropdownItem"
import UserInfo from "../../ui/UserInfo"

function UserAction() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
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
    );
  }

  return (
    <>
      {/* Icono en pantallas pequeñas */}
      <button onClick={() => setShowMenu(!showMenu)} className="lg:hidden flex items-center justify-center p-2">
        <User size={24} className="text-[#eee]" />
      </button>

      {/* Menú de usuario en pantallas grandes */}
      <div className="hidden lg:flex items-center gap-2 relative">
        <UserButton 
          email={user?.email || ''} 
          onClick={() => setShowMenu(!showMenu)}
          isActive={showMenu}
        />

        <DropdownMenu isOpen={showMenu} align="right" position="bottom">
          <UserInfo email={user?.email || ''} />
          <DropdownItem onClick={handleLogout}>
            <LogOut size={18} />
            Cerrar Sesión
          </DropdownItem>
        </DropdownMenu>
      </div>

      {/* Menú móvil */}
      <DropdownMenu isOpen={showMenu} align="right" position="bottom">
        <div className="lg:hidden">
          <UserInfo email={user?.email || ''} />
          <DropdownItem onClick={handleLogout}>
            <LogOut size={18} />
            Cerrar Sesión
          </DropdownItem>
        </div>
      </DropdownMenu>
    </>
  )
}

export default UserAction

