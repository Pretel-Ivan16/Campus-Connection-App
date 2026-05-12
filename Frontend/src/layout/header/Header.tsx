import BrandLogo from "./BrandLogo"
import { NavLinks } from "./NavLinks"
import { HamburgerMenu } from "./HamburgerMenu"
import UserAction from "./UserAction"

function Header() {
  return (
    <header className="w-full min-h-28 bg-background flex items-center justify-center">
      <div className="flex items-center justify-between w-full md:min-w-200 min-h-32 px-3 sm:px-4 md:px-0">
        <BrandLogo />
        <div className="hidden md:block">
          <NavLinks />
        </div>
        <div className="flex items-center gap-4">
          <HamburgerMenu />
          <UserAction />
        </div>
      </div>
    </header>
  )
}

export default Header
