import { BookOpen, Users, MessageSquare, Trophy } from 'lucide-react'
import FeatureCard from './FeatureCard'

function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: 'Conecta con Estudiantes',
      description: 'Conoce y conecta con otros estudiantes de tu campus'
    },
    {
      icon: MessageSquare,
      title: 'Comparte Experiencias',
      description: 'Publica tus experiencias y aprende de otras perspectivas'
    },
    {
      icon: BookOpen,
      title: 'Recursos Académicos',
      description: 'Accede a recursos y consejos académicos compartidos'
    },
    {
      icon: Trophy,
      title: 'Crece y Destaca',
      description: 'Desarrolla habilidades y destaca en tu comunidad académica'
    }
  ]

  return (
    <section className="bg-[#] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#eee] mb-16">
          Características Principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
