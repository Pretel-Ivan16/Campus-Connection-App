import type { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center p-6 rounded-lg bg-[#121620] hover:bg-[#171a24] transition-colors">
      <div className="flex justify-center mb-4">
        <Icon className="w-12 h-12 text-[#6483ff]" />
      </div>
      <h3 className="text-xl font-semibold text-[#eee] mb-2">
        {title}
      </h3>
      <p className="text-[#a0a0a0]">
        {description}
      </p>
    </div>
  )
}

export default FeatureCard
