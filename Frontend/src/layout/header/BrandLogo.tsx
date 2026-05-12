import { Logo } from "../../components/Logo"
import TittleLogo from "../../components/TittleLogo"

function BrandLogo() {
  return (
    <a href="/" className="flex items-center gap-1 sm:gap-2 lg:gap-3">
      <Logo />
      <TittleLogo />
    </a>
  )
}

export default BrandLogo
