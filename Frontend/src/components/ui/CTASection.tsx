import { Link } from 'react-router-dom'

function CTASection() {
  return (
    <section className="bg-[#171a24] py-20 rounded-xl">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">
          ¿Listo para Unirte?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90">
          Sé parte de una comunidad de estudiantes comprometidos con su crecimiento académico y personal
        </p>
        <Link
          to="/register"
          className="inline-block bg-[#171a24] hover:bg-[#1f2332] text-[#eee] font-semibold py-3 px-8 rounded-lg transition"
        >
          Registrarse Ahora
        </Link>
      </div>
    </section>
  )
}

export default CTASection
