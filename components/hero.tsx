import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-70 blob-animation"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl opacity-70 blob-animation"></div>

      <div className="container grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            Desenvolvedor Full Stack
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Transformando ideias em <span className="gradient-text">soluções digitais</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Especializado em automação, inteligência artificial e desenvolvimento web. Criando experiências digitais
            inovadoras e eficientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              size="lg"
              asChild
            >
              <Link href="#portfolio">
                Ver Projetos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#contact">Entre em Contato</Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-2xl opacity-70 animate-pulse-slow"></div>
          <div className="gradient-border">
            <div className="relative z-10 bg-background rounded-lg overflow-hidden aspect-square md:aspect-[4/5]">
              <img
                src="/images/profile/profile.jpeg" // Imagem na nova estrutura de pastas
                alt="Daniel Di Grandi"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

