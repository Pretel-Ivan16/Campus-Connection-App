import FooterBrand from './FooterBrand'
import FooterLinksColumn from './FooterLinksColumn'
import FooterBottom from './FooterBottom'

const footerLinks = {
  producto: [
    { label: 'Características', href: '#features' },
    { label: 'Facultades', href: '/facultades' },
    { label: 'Publicaciones', href: '/publicaciones' },
    { label: 'Precios', href: '#' },
  ],
  soporte: [
    { label: 'Centro de ayuda', href: '#' },
    { label: 'Contacto', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Comunidad', href: '#' },
  ],
  legal: [
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
}

function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0d0f16]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          <FooterBrand />
          <FooterLinksColumn title="Producto" links={footerLinks.producto} />
          <FooterLinksColumn title="Soporte" links={footerLinks.soporte} />
          <FooterLinksColumn title="Legal" links={footerLinks.legal} />
        </div>
        <FooterBottom />
      </div>
    </footer>
  )
}

export default Footer
