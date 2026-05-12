import { Link } from "react-router-dom"
import { Logo } from "../../Logo"
import TittleLogo from "../../TittleLogo"

function BrandLogo() {
  return (
    <Link to="/" className="flex items-center gap-1 sm:gap-2 lg:gap-3">
      <Logo />
      <TittleLogo />
    </Link>
  )
}

export default BrandLogo
