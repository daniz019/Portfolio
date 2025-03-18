"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye } from "lucide-react"
import { ProjectModal } from "@/components/ui/project-modal"

type Project = {
  id: string
  title: string
  description: string
  image: string
  gallery: string[]
  category: string
  technologies: string[]
  challenge: string
  solution: string
  link?: string
  github?: string
  youtubeId?: string
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showAllMobile, setShowAllMobile] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const projects: Project[] = [
    {
      id: "qr-code-generator",
      title: "QR Code Generator",
      description:
        "Aplicação web elegante e minimalista para geração de QR Codes, desenvolvida com HTML, CSS e JavaScript puro. Interface intuitiva com recursos de histórico, notificações toast e área de arrastar e soltar.",
      image: "/logos/qr-code-generator-logo.jpg",
      gallery: [
        "/images/projects/qr-code/1.png",
        "/images/projects/qr-code/2.png"
      ],
      category: "websites",
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "LocalStorage"
      ],
      challenge: 
        "O principal desafio foi criar uma aplicação moderna e responsiva usando apenas tecnologias web fundamentais, sem depender de frameworks. Era necessário implementar funcionalidades avançadas como histórico de geração, área de arrastar e soltar, e um sistema de notificações toast, tudo isso mantendo o código limpo e organizado.",
      solution:
        "Utilizei HTML5 semântico para uma estrutura clara e acessível, CSS moderno com variáveis customizadas e animações suaves, e JavaScript puro para toda a lógica da aplicação. Implementei o armazenamento local para o histórico de QR Codes, a API de Drag & Drop para upload de arquivos, e criei um sistema de notificações toast personalizado. O resultado é uma aplicação leve, rápida e fácil de usar."
    },
    {
      id: "assistente-medico",
      title: "Assistente Médico Virtual",
      description:
        "Aplicação web inteligente que utiliza Processamento de Linguagem Natural para analisar sintomas descritos pelo usuário e sugerir possíveis diagnósticos. Interface moderna e responsiva que permite ajustes personalizados com base em idade e gênero para diagnósticos mais precisos.",
      image: "/logos/assistente-medico-logo.jpg",
      gallery: [
        "/images/projects/assistente-medico/1.png",
        "/images/projects/assistente-medico/2.png",
        "/images/projects/assistente-medico/3.png",
        "/images/projects/assistente-medico/4.png",
        "/images/projects/assistente-medico/5.png"
      ],
      category: "websites",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "NLP"
      ],
      challenge: 
        "O principal desafio foi criar um sistema inteligente de processamento de linguagem natural que pudesse interpretar sintomas descritos em linguagem comum e convertê-los em termos médicos padronizados. Além disso, era necessário desenvolver uma interface intuitiva que tornasse o processo de consulta virtual acessível e confiável.",
      solution:
        "Desenvolvi uma aplicação moderna utilizando Next.js e TypeScript, com uma interface fluida construída em Tailwind CSS e Framer Motion. Implementei um sistema de processamento de sintomas que analisa o texto do usuário e fornece diagnósticos personalizados baseados em idade e gênero. A experiência do usuário foi aprimorada com animações suaves e feedback visual imediato."
    },
    {
      id: "chacara-recanto",
      title: "Chácara Recanto do Sol",
      description:
        "Site moderno e funcional para locação de chácara, com galerias de imagens, calendário de reservas, formulário de contato e integração com WhatsApp.",
      image: "/logos/chacara-recanto-logo.png",
      gallery: [
        "/images/projects/chacara/1.png",
        "/images/projects/chacara/2.png",
        "/images/projects/chacara/3.png",
        "/images/projects/chacara/4.png",
        "/images/projects/chacara/5.png",
        "/images/projects/chacara/6.png",
        "/images/projects/chacara/7.png"
      ],
      category: "websites",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Embla Carousel",
        "Zod"
      ],
      challenge: 
        "O principal desafio deste projeto foi criar uma plataforma de locação intuitiva e visualmente atrativa, que facilitasse a navegação dos usuários e a comunicação direta com os responsáveis pela chácara. Além disso, o site precisava ser responsivo, garantindo uma boa experiência em dispositivos móveis, e incluir funcionalidades específicas, como um sistema de calendário e galerias de imagens.",
      solution:
        "Para resolver esses desafios, utilizei o Next.js com React para criar um front-end dinâmico e performático, estilizado com Tailwind CSS para garantir uma estética moderna. Integrei um carrossel de imagens com a biblioteca Embla Carousel para destacar as principais fotos da chácara, e adicionei um calendário interativo e um formulário de contato para facilitar o agendamento de locações. O site também conta com um botão de WhatsApp para comunicação instantânea com os interessados.",
      link: "https://chacararecantodosol.com.br",
    },
    {
      id: "triggerbot",
      title: "TriggerBot Valorant",
      description:
        "Bot avançado para Valorant desenvolvido em Python que oferece disparo automático ultra-rápido (0-10ms) contra inimigos detectados. Utiliza detecção de cores via OpenCV e MSS, com sistema anti-detecção para o Vanguard através de comunicação via socket.",
      image: "/images/projects/triggerbot/thumbnail.png",
      gallery: [
        "https://www.youtube.com/embed/xMqv1IV8hIM"
      ],
      category: "automacao",
      technologies: [
        "Python",
        "OpenCV",
        "MSS",
        "Socket Programming"
      ],
      challenge: 
        "O principal desafio foi desenvolver um sistema que contornasse o Vanguard, o rigoroso anti-cheat do Valorant, que bloqueia eventos de mouse e teclado externos. Além disso, era necessário garantir uma velocidade de resposta extremamente rápida (0-10ms) em comparação com o tempo médio de reação humana (200-300ms).",
      solution:
        "Implementei um sistema sofisticado de detecção de cores usando OpenCV e MSS para identificar inimigos em tempo real. Para contornar o Vanguard, desenvolvi uma comunicação via socket que permite a operação do bot de forma indetectável, resultando em um sistema eficiente e seguro.",
      youtubeId: "xMqv1IV8hIM"
    },
    {
      id: "discord-bot",
      title: "Discord Bot",
      description:
        "Bot para Discord desenvolvido em Python que gerencia o sistema de licenças do TriggerBot. Oferece teste gratuito de 3 horas, sistema de detecção de HWID para prevenir duplicações, reposição de HWID a cada 7 dias e registro automatizado de chaves de acesso vitalício.",
      image: "/images/projects/discord-bot/thumbnail.png",
      gallery: [
        "https://www.youtube.com/embed/-4peRJDeS3o"
      ],
      category: "automacao",
      technologies: [
        "Python",
        "MySQL",
        "Discord.py",
        "Sistema HWID"
      ],
      challenge: 
        "O principal desafio foi criar um sistema robusto de gerenciamento de licenças que prevenisse o uso não autorizado do TriggerBot, enquanto mantivesse uma boa experiência para usuários legítimos. Era necessário implementar verificações de HWID, sistema de testes gratuitos e gerenciamento seguro de chaves de acesso.",
      solution:
        "Implementei um sistema completo de gerenciamento com MySQL, incluindo detecção de HWID para bloquear contas fraudulentas, sistema de teste gratuito de 3 horas, reposição de HWID a cada 7 dias e registro automatizado de chaves de acesso vitalício através de comandos seguros.",
      youtubeId: "-4peRJDeS3o"
    },
    {
      id: "roblox-script",
      title: "Universal Script Roblox",
      description:
        "Script Universal em Lua para Roblox que oferece funcionalidades avançadas como Aimbot, ESP e FPS Boost, compatível com qualquer jogo da plataforma. Interface gráfica intuitiva desenvolvida com OrionLib para personalização rápida dos recursos.",
      image: "/images/projects/roblox-script/thumbnail.png",
      gallery: [
        "https://www.youtube.com/embed/L5PNr0B3yAc"
      ],
      category: "automacao",
      technologies: [
        "Lua",
        "OrionLib",
        "Roblox",
        "GUI Design"
      ],
      challenge: 
        "O principal desafio foi criar um script universal que funcionasse em qualquer jogo do Roblox, mantendo a compatibilidade e eficiência. Era necessário implementar funcionalidades avançadas como Aimbot com FOV personalizável, ESP com múltiplas opções de visualização e otimização de FPS, tudo através de uma interface intuitiva.",
      solution:
        "Desenvolvi um sistema modular utilizando Lua e OrionLib, implementando um Aimbot preciso com opções de FOV e seleção de partes do corpo, ESP completo com caixas, nomes e barras de saúde, e otimização de FPS através de ajustes automáticos nas configurações do jogo. A interface gráfica permite personalização rápida e fácil de todos os recursos.",
      youtubeId: "L5PNr0B3yAc"
    },
  ]

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)
  const displayedProjects = !showAllMobile && isMobile ? filteredProjects.slice(0, 3) : filteredProjects

  return (
    <section id="portfolio" className="bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <h2 className="section-title">Meus Projetos</h2>
        <p className="section-subtitle">
          Conheça alguns dos projetos que desenvolvi, demonstrando minhas habilidades e experiência
        </p>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-background/80 backdrop-blur-sm border border-primary/20 flex gap-1 p-1">
              <TabsTrigger 
                className="min-w-[70px] text-[13px] md:text-base py-1.5 px-2.5 md:px-4" 
                value="all"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger 
                className="min-w-[85px] text-[13px] md:text-base py-1.5 px-2.5 md:px-4" 
                value="websites"
              >
                Websites
              </TabsTrigger>
              <TabsTrigger 
                className="min-w-[95px] text-[13px] md:text-base py-1.5 px-2.5 md:px-4" 
                value="automacao"
              >
                Automação
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {displayedProjects.map((project) => (
                <div key={project.id} className="flex flex-col">
                  <Card className="overflow-hidden group border-none shadow-lg card-hover flex-1 flex flex-col">
                    <div className="relative overflow-hidden aspect-video">
                      {(project.id === "triggerbot" || project.id === "discord-bot" || project.id === "roblox-script") ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={`https://i.ytimg.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                            alt={project.title}
                            width={1920}
                            height={1080}
                            className="object-cover w-full h-full"
                            priority={true}
                            quality={100}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://i.ytimg.com/vi/${project.youtubeId}/mqdefault.jpg`;
                              target.onerror = () => {
                                target.src = `https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg`;
                              };
                            }}
                          />
                        </div>
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={1920}
                          height={1080}
                          className="object-cover w-full h-full"
                          priority={true}
                          quality={100}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-3 md:p-4 w-full">
                          <div className="flex justify-end gap-1.5 md:gap-2">
                            <Button 
                              size="sm" 
                              variant="secondary" 
                              className="rounded-full w-8 md:w-9 h-8 md:h-9 p-0"
                              onClick={() => setSelectedProject(project)}
                            >
                              <Eye className="h-3.5 md:h-4 w-3.5 md:w-4" />
                            </Button>
                            {project.github && (
                              <Button 
                                size="sm" 
                                variant="secondary" 
                                className="rounded-full w-8 md:w-9 h-8 md:h-9 p-0"
                                onClick={() => window.open(project.github, "_blank")}
                              >
                                <Github className="h-3.5 md:h-4 w-3.5 md:w-4" />
                              </Button>
                            )}
                            {project.link && !isMobile && project.id === "chacara-recanto" && (
                              <Button 
                                size="sm" 
                                variant="secondary" 
                                className="rounded-full w-8 md:w-9 h-8 md:h-9 p-0"
                                onClick={() => window.open(project.link, "_blank")}
                              >
                                <ExternalLink className="h-3.5 md:h-4 w-3.5 md:w-4" />
                              </Button>
                            )}
                            {project.link && project.id !== "chacara-recanto" && (
                              <Button 
                                size="sm" 
                                variant="secondary" 
                                className="rounded-full w-8 md:w-9 h-8 md:h-9 p-0"
                                onClick={() => window.open(project.link, "_blank")}
                              >
                                <ExternalLink className="h-3.5 md:h-4 w-3.5 md:w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 md:p-6 bg-gradient-to-br from-background/95 to-background flex-1 flex flex-col">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-bold">{project.title}</h3>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs md:text-sm bg-background/50 border-primary/20">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-sm md:text-base mt-4"
                          onClick={() => setSelectedProject(project)}
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            {!showAllMobile && isMobile && filteredProjects.length > 3 && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={() => setShowAllMobile(true)}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  Ver Mais
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </section>
  )
}

