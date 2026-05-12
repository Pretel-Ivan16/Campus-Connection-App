import BrandLogo from "./BrandLogo"
import { NavLinks } from "./NavLinks"
import { HamburgerMenu } from "./HamburgerMenu"
import UserAction from "./UserAction"

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background lg:bg-background/80 lg:backdrop-blur-md">
      <div className="flex items-center justify-between min-h-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
        <BrandLogo />
        <div className="lg:block flex-1 flex items-center justify-center">
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
