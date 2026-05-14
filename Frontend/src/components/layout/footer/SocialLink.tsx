interface SocialLinkProps {
  iconClass: string
  href: string
  label: string
}

function SocialLink({ iconClass, href, label }: SocialLinkProps) {
  return (
    <div className="relative group">
      <a
        href={href}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#a0a0a0] transition-colors hover:bg-[#171a24] hover:text-[#eee]"
        aria-label={label}
      >
        <i className={`bi ${iconClass} text-lg`}></i>
      </a>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#171a24] text-[#eee] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </div>
    </div>
  )
}

export default SocialLink
