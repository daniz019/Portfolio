"use client"

import { useEffect, useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Lightbulb, Rocket, Cpu, Database, Layout, Zap, Brain, Globe, Star, Code2, Terminal } from "lucide-react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  delay: number
}

export default function About() {
  const skills = [
    "Angular",
    "TypeScript",
    "JavaScript",
    "C#",
    "C++",
    "Python",
    "Flutter",
    "MySQL",
    "React",
    "NodeJs",
    "CSS",
    "Lua",
    "HTML",
  ]

  const skillLevels = [
    { name: "Frontend", level: 90, icon: <Layout className="h-5 w-5 text-primary" /> },
    { name: "Backend", level: 85, icon: <Database className="h-5 w-5 text-secondary" /> },
    { name: "Automação", level: 95, icon: <Cpu className="h-5 w-5 text-accent" /> },
  ]

  // Detectar tipo de dispositivo
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  // Animação para as barras de progresso
  const [animate, setAnimate] = useState(false)

  // Contador animado para os anos de experiência
  const [count, setCount] = useState(0)

  // Referência para o elemento de habilidades
  const skillsRef = useRef<HTMLDivElement>(null)

  // Estado para controlar a visibilidade das habilidades
  const [skillsVisible, setSkillsVisible] = useState<boolean[]>(Array(skills.length).fill(false))

  // Estado para partículas
  const [particles, setParticles] = useState<Particle[]>([])

  // Estado para o efeito de mouse hover
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  // Detectar dispositivo móvel e iOS
  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || ""
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase(),
      )
      const isIOSDevice =
        /iphone|ipad|ipod/i.test(userAgent.toLowerCase()) ||
        (navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform))

      setIsMobile(!!isMobileDevice)
      setIsIOS(!!isIOSDevice)
    }

    checkDevice()

    // Também verificar no redimensionamento
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 500)

    const countInterval = setInterval(() => {
      setCount((prev) => {
        if (prev < 3) return prev + 1
        clearInterval(countInterval)
        return prev
      })
    }, 200)

    // Gerar partículas - reduzir quantidade em dispositivos móveis
    generateParticles()

    // Configurar observador de interseção para animar habilidades quando visíveis
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateSkillsSequentially()
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }, // Ajustado para melhor detecção em dispositivos móveis
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => {
      clearTimeout(timer)
      clearInterval(countInterval)
      observer.disconnect()
    }
  }, [])

  // Função para animar as habilidades sequencialmente
  const animateSkillsSequentially = () => {
    skills.forEach((_, index) => {
      setTimeout(
        () => {
          setSkillsVisible((prev) => {
            const newState = [...prev]
            newState[index] = true
            return newState
          })
        },
        index * (isMobile ? 100 : 150),
      ) // Mais rápido em dispositivos móveis
    })
  }

  // Função para gerar partículas
  const generateParticles = () => {
    // Reduzir número de partículas em dispositivos móveis
    const particleCount = isMobile ? 8 : 15

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (isMobile ? 3 : 4) + 2, // Partículas menores em dispositivos móveis
      color: i % 3 === 0 ? "primary" : i % 3 === 1 ? "secondary" : "accent",
      speed: Math.random() * 5 + (isMobile ? 25 : 30), // Animações mais lentas para evitar saltos
      delay: Math.random() * (isMobile ? 5 : 10),
    }))

    setParticles(newParticles)
  }

  // Efeito para atualizar a posição do mouse/toque
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
      }
    }

    // Adicionar suporte a eventos de toque
    const handleTouchMove = (e: TouchEvent) => {
      if (cardRef.current && e.touches && e.touches[0]) {
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.touches[0].clientX - rect.left
        const y = e.touches[0].clientY - rect.top
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  // Componentes para elementos visuais - visíveis em todos os dispositivos
  const FloatingIcons = () => (
    <>
      <div
        className="absolute top-[10%] left-[5%] md:top-20 md:left-10 w-6 md:w-8 h-6 md:h-8 bg-primary/30 rounded-full animate-float opacity-70"
        style={{
          animationDuration: "40s", // Aumentar duração para movimento mais suave
          animationTimingFunction: "ease-in-out", // Usar ease-in-out para transições mais suaves
          transform: isIOS ? "translateZ(0)" : undefined, // Hack para iOS
        }}
      ></div>

      <div
        className="absolute bottom-[30%] right-[5%] md:bottom-40 md:right-10 w-8 md:w-10 h-8 md:h-10 bg-secondary/30 rounded-full animate-float opacity-70"
        style={{
          animationDelay: "4s",
          animationDuration: "45s", // Duração diferente para evitar padrões
          animationTimingFunction: "ease-in-out",
          transform: isIOS ? "translateZ(0)" : undefined,
        }}
      ></div>

      <div
        className="absolute top-[40%] right-[10%] md:top-1/3 md:right-20 w-5 md:w-6 h-5 md:h-6 bg-accent/30 rounded-full animate-float opacity-70"
        style={{
          animationDelay: "8s",
          animationDuration: "50s", // Duração ainda mais longa
          animationTimingFunction: "ease-in-out",
          transform: isIOS ? "translateZ(0)" : undefined,
        }}
      ></div>

      <div
        className="absolute bottom-[20%] left-[15%] md:bottom-1/4 md:left-1/4 w-10 md:w-12 h-10 md:h-12 bg-primary/20 rounded-full animate-float opacity-50"
        style={{
          animationDelay: "12s",
          animationDuration: "55s", // Duração ainda mais longa
          animationTimingFunction: "ease-in-out",
          transform: isIOS ? "translateZ(0)" : undefined,
        }}
      ></div>

      {/* Ícones flutuantes - visíveis em todos os dispositivos */}
      <div
        className="absolute top-[25%] right-[25%] md:top-1/4 md:right-1/3 animate-float"
        style={{
          animationDelay: "6s",
          animationDuration: "42s", // Duração longa
          animationTimingFunction: "ease-in-out",
          transform: isIOS ? "translateZ(0)" : undefined,
        }}
      >
        <Code className="h-5 md:h-6 w-5 md:w-6 text-primary/40" />
      </div>

      <div
        className="absolute bottom-[35%] left-[20%] md:bottom-1/3 md:left-1/3 animate-float"
        style={{
          animationDelay: "10s",
          animationDuration: "48s", // Duração longa
          animationTimingFunction: "ease-in-out",
          transform: isIOS ? "translateZ(0)" : undefined,
        }}
      >
        <Database className="h-6 md:h-8 w-6 md:w-8 text-secondary/40" />
      </div>

      <div
        className="absolute top-[60%] right-[15%] md:top-2/3 md:right-1/4 animate-float"
        style={{
          animationDelay: "14s",
          animationDuration: "52s", // Duração longa
          animationTimingFunction: "ease-in-out",
          transform: isIOS ? "translateZ(0)" : undefined,
        }}
      >
        <Cpu className="h-5 md:h-7 w-5 md:w-7 text-accent/40" />
      </div>
    </>
  )

  // Adicionar efeito de código no fundo - simplificado em dispositivos móveis
  const CodeBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
      {!isMobile && (
        <div className="absolute top-10 left-10 font-mono text-xs">
          <div>function createSolution() {"{"}</div>
          <div className="ml-4">const skills = ['JS', 'TS', 'Python'];</div>
          <div className="ml-4">const passion = 'coding';</div>
          <div className="ml-4">return buildAmazingExperience();</div>
          <div>{"}"}</div>
        </div>
      )}
      <div className="absolute bottom-10 right-10 font-mono text-xs">
        <div>const developer = {"{"}</div>
        <div className="ml-4">name: 'Daniel',</div>
        <div className="ml-4">expertise: ['Frontend', 'Backend', 'Automation'],</div>
        <div className="ml-4">yearsOfExperience: 3</div>
        <div>{"}"}</div>
      </div>
    </div>
  )

  return (
    <section id="about" className="relative overflow-hidden py-16 md:py-20">
      {/* Background Elements - reduzidos em dispositivos móveis */}
      <div
        className="absolute top-40 left-0 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"
        style={{ transform: isIOS ? "translateZ(0)" : undefined }}
      ></div>
      <div
        className="absolute bottom-20 right-0 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"
        style={{
          animationDelay: "2s",
          transform: isIOS ? "translateZ(0)" : undefined,
        }}
      ></div>

      {/* Partículas de fundo */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full opacity-30 bg-${particle.color}`}
          style={{
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.speed}s ease-in-out infinite`, // Usar ease-in-out para transições mais suaves
            animationDelay: `${particle.delay}s`,
            willChange: "transform",
            transform: isIOS ? "translateZ(0)" : undefined, // Hack para melhorar desempenho no iOS
            WebkitBackfaceVisibility: "hidden", // Otimização para dispositivos móveis
            WebkitPerspective: 1000,
          }}
        ></div>
      ))}

      {/* Elementos flutuantes adicionais */}
      <FloatingIcons />

      <div
        className="container relative z-10"
        style={{
          willChange: "transform",
          WebkitOverflowScrolling: "touch", // Melhorar rolagem em iOS
        }}
      >
        <div className="mb-8 md:mb-12 animate-fade-in">
          <h2 className="section-title text-2xl md:text-3xl lg:text-4xl">Sobre Mim</h2>
          <p className="section-subtitle text-base md:text-lg">
            Conheça minha trajetória profissional e especialidades técnicas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="animate-slide-in-left">
            <div className="relative">
              <div
                className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/20 via-secondary/20 to-accent/20 blur-xl rounded-2xl transform rotate-3 animate-pulse-slow"
                style={{ transform: isIOS ? "translateZ(0) rotate(3deg)" : "rotate(3deg)" }}
              ></div>
              <div
                ref={cardRef}
                className="gradient-border"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb), 0.15), rgba(var(--secondary-rgb), 0.15), rgba(var(--accent-rgb), 0.15))`,
                  transition: "background 0.3s ease",
                  WebkitTapHighlightColor: "transparent", // Remover highlight de toque em dispositivos móveis
                }}
              >
                <div className="rounded-lg w-full h-full bg-background/90 backdrop-blur-sm p-4 md:p-8 space-y-6 md:space-y-8 relative overflow-hidden card-3d">
                  {/* Padrão de fundo */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50"></div>
                    <div className="grid grid-cols-8 grid-rows-8 gap-4 h-full w-full">
                      {Array.from({ length: isMobile ? 32 : 64 }).map((_, i) => (
                        <div key={i} className="bg-primary/10 rounded-full"></div>
                      ))}
                    </div>
                  </div>

                  {/* Código decorativo - simplificado em dispositivos móveis */}
                  <CodeBackground />

                  {/* Experiência em destaque */}
                  <div
                    className="text-center mb-6 md:mb-8 relative animate-scale-in"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <div className="relative inline-block">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-md animate-pulse-slow"
                        style={{ transform: isIOS ? "translateZ(0)" : undefined }}
                      ></div>
                      <div className="relative bg-background rounded-full p-1">
                        <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-4 md:p-6 relative overflow-hidden">
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10"></div>
                          </div>
                          <h3
                            className="text-3xl md:text-4xl font-bold text-white animate-fade-in"
                            style={{ animationDelay: "0.6s" }}
                          >
                            {count}+
                          </h3>
                          <p className="text-white text-xs md:text-sm">Anos de Experiência</p>

                          {/* Estrelas decorativas - apenas em desktop */}
                          {!isMobile && (
                            <>
                              <div className="absolute -top-1 -right-1 animate-spin-slow">
                                <Star className="h-3 w-3 text-yellow-300" />
                              </div>
                              <div className="absolute bottom-0 left-2 animate-spin-slow-reverse">
                                <Star className="h-2 w-2 text-yellow-300" />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Ícones flutuantes em diferentes cantos - visíveis em todos os dispositivos */}
                    <div
                      className="absolute top-[-20px] left-[-20px] md:-top-8 md:-left-8 bg-primary/10 p-1.5 md:p-2 rounded-full animate-bounce-slow"
                      style={{ transform: isIOS ? "translateZ(0)" : undefined }}
                    >
                      <Zap className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                    </div>

                    <div
                      className="absolute bottom-[-20px] right-[20%] md:-bottom-6 md:right-1/4 bg-secondary/10 p-1.5 md:p-2 rounded-full animate-bounce-slow"
                      style={{
                        animationDelay: "0.5s",
                        transform: isIOS ? "translateZ(0)" : undefined,
                      }}
                    >
                      <Brain className="h-4 md:h-5 w-4 md:w-5 text-secondary" />
                    </div>

                    <div
                      className="absolute top-[20%] right-[-15px] md:top-1/4 md:-right-6 bg-accent/10 p-1.5 md:p-2 rounded-full animate-bounce-slow"
                      style={{
                        animationDelay: "1.2s",
                        transform: isIOS ? "translateZ(0)" : undefined,
                      }}
                    >
                      <Star className="h-4 md:h-5 w-4 md:w-5 text-accent" />
                    </div>

                    <div
                      className="absolute bottom-[-15px] left-[-15px] md:-bottom-5 md:-left-5 bg-primary/10 p-1.5 md:p-2 rounded-full animate-bounce-slow"
                      style={{
                        animationDelay: "0.8s",
                        transform: isIOS ? "translateZ(0)" : undefined,
                      }}
                    >
                      <Code className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                    </div>
                  </div>

                  {/* Barras de progresso de habilidades */}
                  <div
                    className="space-y-4 md:space-y-6 relative animate-fade-in-up"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div
                      className="absolute right-[5px] top-[-20px] md:-right-2 md:-top-5 bg-accent/10 p-1.5 md:p-2 rounded-full animate-bounce-slow"
                      style={{
                        animationDelay: "1s",
                        transform: isIOS ? "translateZ(0)" : undefined,
                      }}
                    >
                      <Globe className="h-4 md:h-5 w-4 md:w-5 text-accent" />
                    </div>

                    {skillLevels.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="space-y-1 md:space-y-2 animate-fade-in-up"
                        style={{ animationDelay: `${0.6 + index * 0.2}s` }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={isMobile ? "" : "animate-wiggle"}
                              style={{ animationDelay: `${index * 0.5}s` }}
                            >
                              {skill.icon}
                            </div>
                            <span className="font-medium text-sm md:text-base">{skill.name}</span>
                          </div>
                          <span
                            className="text-xs md:text-sm text-muted-foreground animate-fade-in"
                            style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 md:h-2 w-full bg-muted rounded-full overflow-hidden relative">
                          <div
                            className={`h-full rounded-full ${
                              skill.name === "Frontend"
                                ? "bg-gradient-to-r from-primary to-primary/70"
                                : skill.name === "Backend"
                                  ? "bg-gradient-to-r from-secondary to-secondary/70"
                                  : "bg-gradient-to-r from-accent to-accent/70"
                            }`}
                            style={{
                              width: animate ? `${skill.level}%` : "0%",
                              animationDelay: `${0.7 + index * 0.3}s`,
                              boxShadow: `0 0 10px ${
                                skill.name === "Frontend"
                                  ? "rgba(var(--primary-rgb), 0.5)"
                                  : skill.name === "Backend"
                                    ? "rgba(var(--secondary-rgb), 0.5)"
                                    : "rgba(var(--accent-rgb), 0.5)"
                              }`,
                              transition: "width 1s ease-out",
                              transform: isIOS ? "translateZ(0)" : undefined,
                            }}
                          >
                            {/* Efeito de brilho - simplificado em dispositivos móveis */}
                            {!isMobile && (
                              <div className="shimmer-container">
                                <div className="shimmer"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Habilidades */}
                  <div className="relative" ref={skillsRef}>
                    <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-center flex items-center justify-center gap-2">
                      <Terminal className="h-4 w-4 text-primary animate-pulse-slow" />
                      Habilidades
                      <Code2 className="h-4 w-4 text-primary animate-pulse-slow" style={{ animationDelay: "1s" }} />
                    </h4>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
                      {skills.map((skill, index) => (
                        <div
                          key={skill}
                          className={`transition-all duration-500 transform ${
                            skillsVisible[index]
                              ? "opacity-100 translate-y-0 scale-100"
                              : "opacity-0 translate-y-4 scale-95"
                          }`}
                          style={{
                            transitionDelay: `${index * 0.1}s`,
                            transform: skillsVisible[index]
                              ? isIOS
                                ? "translateZ(0) translateY(0) scale(1)"
                                : "translateY(0) scale(1)"
                              : isIOS
                                ? "translateZ(0) translateY(4px) scale(0.95)"
                                : "translateY(4px) scale(0.95)",
                          }}
                        >
                          <Badge
                            variant="outline"
                            className="bg-background border-primary/20 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:scale-110 text-xs md:text-sm"
                          >
                            {skill}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6 animate-slide-in-right">
            <div className="relative">
              <div className="absolute -left-2 md:-left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full"></div>
              <h3
                className="text-xl md:text-2xl font-bold mb-2 md:mb-3 pl-3 md:pl-4 animate-fade-in"
                style={{ animationDelay: "0.6s" }}
              >
                Daniel Di Grandi
              </h3>
              <p
                className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 pl-3 md:pl-4 animate-fade-in"
                style={{ animationDelay: "0.7s" }}
              >
                Desenvolvedor Full Stack com 3 anos de experiência, especializado na criação de soluções digitais
                inovadoras e eficientes. Minha abordagem combina conhecimento técnico sólido com visão estratégica para
                entregar resultados que superam expectativas.
              </p>
              <p
                className="text-sm md:text-base text-muted-foreground pl-3 md:pl-4 animate-fade-in"
                style={{ animationDelay: "0.8s" }}
              >
                Possuo expertise em desenvolvimento web, automação de processos e implementação de tecnologias de
                inteligência artificial. Meu compromisso é transformar conceitos complexos em soluções práticas e
                escaláveis, sempre buscando a excelência técnica e a satisfação do cliente.
              </p>
            </div>

            <div
              className="mt-4 md:mt-6 p-4 md:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10 relative overflow-hidden animate-fade-in-up"
              style={{ animationDelay: "0.9s" }}
            >
              {/* Efeito de brilho no card */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 animate-pulse-slow"
                style={{ transform: isIOS ? "translateZ(0)" : undefined }}
              ></div>

              <h4 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2 relative z-10">
                <Zap className="h-4 md:h-5 w-4 md:w-5 text-primary animate-pulse" />
                Diferencial
              </h4>
              <p className="text-sm md:text-base text-muted-foreground relative z-10">
                Minha capacidade de aprender rapidamente novas tecnologias e adaptar soluções existentes para resolver
                problemas complexos me permite entregar projetos de alta qualidade dentro dos prazos estabelecidos,
                sempre focando na experiência do usuário final.
              </p>

              {/* Decoração de código no canto - apenas em desktop */}
              {!isMobile && (
                <div className="absolute bottom-2 right-2 opacity-10">
                  <Terminal className="h-16 w-16" />
                </div>
              )}
            </div>

            {/* Botão interativo */}
            <div className="mt-4 md:mt-6 flex justify-center animate-fade-in" style={{ animationDelay: "1s" }}>
              <button
                onClick={() => {
                  const portfolioSection = document.getElementById('portfolio')
                  if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="px-4 md:px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <Rocket className="h-4 w-4" />
                <span>Ver Projetos</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              icon: <Code className="h-5 md:h-6 w-5 md:w-6 text-primary" />,
              title: "Desenvolvimento Web",
              description:
                "Criação de aplicações web modernas, responsivas e de alta performance, utilizando as melhores práticas e tecnologias atuais.",
              color: "primary",
              delay: 0.2,
            },
            {
              icon: <Lightbulb className="h-5 md:h-6 w-5 md:w-6 text-secondary" />,
              title: "Automação e IA",
              description:
                "Desenvolvimento de soluções inteligentes para automatizar processos e implementar tecnologias de inteligência artificial em diversos contextos.",
              color: "secondary",
              delay: 0.4,
            },
            {
              icon: <Rocket className="h-5 md:h-6 w-5 md:w-6 text-accent" />,
              title: "Soluções Personalizadas",
              description:
                "Desenvolvimento de soluções sob medida para necessidades específicas, com foco em qualidade, desempenho e experiência do usuário.",
              color: "accent",
              delay: 0.6,
            },
          ].map((service, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${service.delay}s` }}>
              <Card
                className={`border-none shadow-md bg-gradient-to-br from-background to-${service.color}/5 card-hover group relative overflow-hidden ${isMobile ? "" : "card-3d"}`}
                style={{ 
                  WebkitTapHighlightColor: "transparent",
                  minHeight: isMobile ? "auto" : "100%" // Garante altura mínima consistente
                }}
              >
                {/* Linha superior com gradiente */}
                <div className={`h-1 w-full bg-${service.color}`}></div>

                <CardContent className={`p-4 md:p-6 ${isMobile ? "" : "card-3d-content"}`}>
                  <div
                    className={`mb-3 md:mb-4 flex h-10 md:h-12 w-10 md:w-12 items-center justify-center rounded-full bg-${service.color}/10 group-hover:bg-${service.color}/20 transition-colors ${isMobile ? "" : "group-hover:rotate-6"} duration-300`}
                  >
                    {service.icon}
                  </div>
                  <h3
                    className={`text-lg md:text-xl font-bold mb-2 transition-colors ${
                      service.color === "primary"
                        ? "group-hover:text-primary"
                        : service.color === "secondary"
                        ? "group-hover:text-secondary"
                        : "group-hover:text-accent"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

