import { Logo } from "../../Logo"
import TittleLogo from "../../TittleLogo"

function BrandLogo() {
  return (
    <a href="/" className="flex items-center gap-1 sm:gap-2 lg:gap-3">
      <Logo />
      <TittleLogo />
    </a>
  )
}

export default BrandLogo
