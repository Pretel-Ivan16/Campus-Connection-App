import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import SocialLink from './SocialLink'
import { Share2, Code, Mail, Camera } from 'lucide-react'

const socialLinks = [
  { icon: Share2, href: '#', label: 'Twitter' },
  { icon: Code, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'LinkedIn' },
  { icon: Camera, href: '#', label: 'Instagram' },
]

function FooterBrand() {
  return (
    <div className="lg:col-span-2">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6483ff]">
          <GraduationCap className="h-5 w-5 text-white" />
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
            icon={social.icon}
            href={social.href}
            label={social.label}
          />
        ))}
      </div>
    </div>
  )
}

export default FooterBrand
