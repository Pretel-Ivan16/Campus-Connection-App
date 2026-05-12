interface FooterLinksColumnProps {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

function FooterLinksColumn({ title, links }: FooterLinksColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[#eee]">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-[#a0a0a0] transition-colors hover:text-[#eee]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterLinksColumn
