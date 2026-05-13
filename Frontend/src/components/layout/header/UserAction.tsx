import { Link, useNavigate } from "react-router-dom"
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
          <svg className="w-6 h-6 text-[#eee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
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
        <svg className="w-6 h-6 text-[#eee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>

      {/* Menú de usuario en pantallas grandes */}
      <div className="hidden lg:flex items-center gap-2 relative">
        <UserButton 
          name={user?.name || ''} 
          onClick={() => setShowMenu(!showMenu)}
          isActive={showMenu}
        />

        <DropdownMenu isOpen={showMenu} align="right" position="bottom">
          <UserInfo name={user?.name || ''} email={user?.email || ''} />
          <DropdownItem onClick={handleLogout}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </DropdownItem>
        </DropdownMenu>
      </div>

      {/* Menú móvil */}
      <DropdownMenu isOpen={showMenu} align="right" position="bottom">
        <div className="lg:hidden">
          <UserInfo name={user?.name || ''} email={user?.email || ''} />
          <DropdownItem onClick={handleLogout}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </DropdownItem>
        </div>
      </DropdownMenu>
    </>
  )
}

export default UserAction

