import { Link } from 'react-router-dom'
import SocialLink from './SocialLink'

const socialLinks = [
  { iconClass: 'bi-twitter-x', href: '#', label: 'Twitter' },
  { iconClass: 'bi-github', href: '#', label: 'GitHub' },
  { iconClass: 'bi-linkedin', href: '#', label: 'LinkedIn' },
  { iconClass: 'bi-instagram', href: '#', label: 'Instagram' },
]

function FooterBrand() {
  return (
    <div className="lg:col-span-2">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6483ff]">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.541 2 15.808c0 3.615 1.808 6.897 4.5 8.823.92.603 2.502 1.292 4.5 1.292s3.58-.689 4.5-1.292c2.692-1.926 4.5-5.208 4.5-8.823 0-5.267-4.5-9.555-10-9.555z" />
          </svg>
        </div>
        <span className="text-xl font-bold text-[#eee]">Campus Connection</span>
      </Link>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#a0a0a0]">
        La comunidad universitaria donde los estudiantes comparten ideas, conocimiento y experiencias.
      </p>
      <div className="mt-6 flex gap-4">
        {socialLinks.map((social) => (
          <SocialLink
            key={social.label}
            iconClass={social.iconClass}
            href={social.href}
            label={social.label}
          />
        ))}
      </div>
    </div>
  )
}

export default FooterBrand
