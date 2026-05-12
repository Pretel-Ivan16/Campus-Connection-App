import BrandLogo from "./BrandLogo"
import { NavLinks } from "./NavLinks"
import { HamburgerMenu } from "./HamburgerMenu"
import UserAction from "./UserAction"

function Header() {
  return (
    <header className="w-full bg-background flex">
      <div className="flex items-center justify-between min-h-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
        <BrandLogo />
        <div className="hidden lg:block">
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
