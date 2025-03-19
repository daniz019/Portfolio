import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Cpu, Database, Layout, Lightbulb, Bot } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: <Layout className="h-12 w-12 text-primary" />,
      title: "Desenvolvimento Frontend",
      description:
        "Criação de interfaces modernas, responsivas e intuitivas utilizando as mais recentes tecnologias web.",
    },
    {
      icon: <Database className="h-12 w-12 text-secondary" />,
      title: "Desenvolvimento Backend",
      description:
        "Implementação de APIs robustas, sistemas de banco de dados e lógica de servidor para aplicações web e mobile.",
    },
    {
      icon: <Code className="h-12 w-12 text-accent" />,
      title: "Desenvolvimento Full Stack",
      description:
        "Soluções completas de ponta a ponta, integrando frontend e backend para criar aplicações web completas.",
    },
    {
      icon: <Bot className="h-12 w-12 text-primary" />,
      title: "Automação",
      description: "Desenvolvimento de scripts e bots para automatizar tarefas repetitivas e otimizar processos.",
    },
    {
      icon: <Cpu className="h-12 w-12 text-secondary" />,
      title: "Inteligência Artificial",
      description:
        "Implementação de soluções baseadas em IA para resolver problemas complexos e melhorar a eficiência.",
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-accent" />,
      title: "Consultoria Técnica",
      description:
        "Análise e recomendações para melhorar sistemas existentes, otimizar desempenho e implementar novas tecnologias.",
    },
  ]

  return (
    <section id="services" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl opacity-50"></div>

      <div className="container relative z-10">
        <h2 className="section-title">Meus Serviços</h2>
        <p className="section-subtitle">
          Ofereço uma variedade de serviços para ajudar a transformar suas ideias em realidade digital
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-none shadow-lg card-hover bg-gradient-to-br from-gray-100 to-primary/5"
            >
              <CardHeader className="pb-2">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

