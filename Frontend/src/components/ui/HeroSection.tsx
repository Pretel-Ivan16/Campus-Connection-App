import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

function HeroSection() {
  const { isAuthenticated } = useAuth();
  const href = isAuthenticated ? "/foros" : "/publicaciones";

  return (
    <section className="container mx-auto  px-20 py-20 text-center rounded-xl bg-[#0a0c12]">
      <h1 className="text-5xl font-bold text-[#eee] mb-6">
        Bienvenido a Campus Connection
      </h1>
      <p className="text-xl text-[#b0b0b0] mb-10 max-w-2xl mx-auto">
        Conecta con otros estudiantes, comparte experiencias y crece académicamente en nuestra comunidad
      </p>
      <div>
        <Link to={href} className="text-white text-2xl bg-[#6483ff] hover:bg-[#5a76e8] font-semibold py-3 px-8 rounded-lg transition inline-block">
          VER MÁS
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
