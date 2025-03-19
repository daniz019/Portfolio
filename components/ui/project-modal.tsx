import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react"
import { useState, useRef } from "react"
import React from "react"
import Image from "next/image"

type Project = {
  id: string
  title: string
  description: string
  image: string
  gallery?: string[]
  category: string
  technologies: string[]
  challenge: string
  solution: string
  link?: string
  github?: string
  youtubeId?: string
}

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project
}

const fadeInAnimation = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null)
  const [scale, setScale] = useState(1)
  const [lastDistance, setLastDistance] = useState<number | null>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const gallery = project.gallery || [project.image]

  const nextImage = () => {
    setSlideDirection('left')
    setGalleryIndex((prev) => (prev + 1) % gallery.length)
  }

  const prevImage = () => {
    setSlideDirection('right')
    setGalleryIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    // Detectar se é gesto com um dedo (swipe) ou dois dedos (pinch)
    if (e.touches.length === 1) {
      setTouchStart(e.touches[0].clientX)
    } else if (e.touches.length === 2) {
      // Calcula a distância inicial entre os dois dedos
      const distance = getDistanceBetweenTouches(e);
      setLastDistance(distance);
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    // Gesto com um dedo - swipe para navegação
    if (e.touches.length === 1 && touchStart !== null && gallery.length > 1 && scale === 1) {
      const currentTouch = e.touches[0].clientX
      const diff = touchStart - currentTouch

      // Se o deslize for maior que 50px, muda a imagem
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextImage() // Deslize para a esquerda -> próxima imagem
        } else {
          prevImage() // Deslize para a direita -> imagem anterior
        }
        setTouchStart(null)
      }
    } 
    // Gesto com dois dedos - pinch to zoom
    else if (e.touches.length === 2 && lastDistance !== null && !gallery[galleryIndex].includes('youtube.com/embed')) {
      e.preventDefault(); // Previne o comportamento padrão do navegador
      
      // Calcula a nova distância entre os dedos
      const currentDistance = getDistanceBetweenTouches(e);
      
      // Calcula o fator de escala
      const scaleFactor = 0.01; // Ajuste a sensibilidade aqui
      let newScale = scale;
      
      if (currentDistance > lastDistance) {
        // Zoom in
        newScale = Math.min(scale + scaleFactor, 3); // Limita o zoom máximo a 3x
      } else if (currentDistance < lastDistance) {
        // Zoom out
        newScale = Math.max(scale - scaleFactor, 1); // Não permite zoom menor que 1x
      }
      
      setScale(newScale);
      setLastDistance(currentDistance);
    }
  }

  const handleTouchEnd = () => {
    setTouchStart(null);
    setLastDistance(null);
  }

  // Função para calcular a distância entre dois pontos de toque
  const getDistanceBetweenTouches = (e: React.TouchEvent): number => {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    return Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  };

  // Reset zoom quando mudar de imagem
  React.useEffect(() => {
    setScale(1);
  }, [galleryIndex]);

  // Reset zoom quando fechar o modal
  React.useEffect(() => {
    if (!isOpen) {
      setScale(1);
    }
  }, [isOpen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      if (imageContainerRef.current) {
        if ((imageContainerRef.current as any).webkitRequestFullscreen) {
          (imageContainerRef.current as any).webkitRequestFullscreen()
        } else {
          imageContainerRef.current.requestFullscreen()
        }
        setIsFullscreen(true)
      }
    } else {
      if ((document as any).webkitFullscreenElement) {
        (document as any).webkitExitFullscreen()
      } else {
        document.exitFullscreen()
      }
      setIsFullscreen(false)
    }
  }

  const handleThumbnailClick = () => {
    if (gallery[galleryIndex].includes('youtube.com/embed')) {
      setShowVideo(true)
    }
  }

  // Atualiza o estado quando o usuário sai da tela cheia usando Esc
  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement || !!(document as any).webkitFullscreenElement)
  }

  // Adiciona e remove o listener de evento de tela cheia
  React.useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Adicione o estilo global para a animação
  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = fadeInAnimation
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Reset slide direction after animation
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSlideDirection(null)
    }, 500)
    return () => clearTimeout(timer)
  }, [galleryIndex])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background to-primary/5">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-8">
          {/* Galeria de Imagens */}
          <div 
            ref={imageContainerRef}
            className={`relative group aspect-video bg-black/10 rounded-lg overflow-hidden ${
              isFullscreen ? 'fixed inset-0 z-[9999] bg-black' : ''
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={`relative ${isFullscreen ? 'w-full h-screen flex items-center justify-center' : 'w-full h-full'}`}>
              <div className={`relative ${isFullscreen ? 'w-full h-full' : 'aspect-video mb-6'}`}>
                {showVideo ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${project.youtubeId}?rel=0`}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : gallery[galleryIndex].includes('youtube.com/embed') ? (
                  <div className="relative w-full h-full cursor-pointer" onClick={handleThumbnailClick}>
                    <Image
                      src={`https://i.ytimg.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                      alt={`${project.title} - Thumbnail`}
                      fill
                      className={`${isFullscreen ? 'object-contain w-full h-full' : 'object-cover'} rounded-lg`}
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
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div 
                    className={`
                      relative 
                      ${isFullscreen ? 'w-full h-screen' : 'w-full h-full'}
                      transition-transform duration-500 ease-in-out
                    `}
                  >
                    <Image
                      key={galleryIndex}
                      src={gallery[galleryIndex]}
                      alt={`${project.title} - Imagem`}
                      fill
                      style={{ 
                        transform: `scale(${scale})`,
                        transition: 'transform 0.1s ease-out'
                      }}
                      className={`
                        ${isFullscreen ? 'object-contain w-full h-full' : 'object-cover'} 
                        rounded-lg 
                        transition-all 
                        duration-500 
                        ease-in-out
                        animate-in 
                        fade-in
                        ${slideDirection === 'left' ? 'slide-in-from-right' : ''}
                        ${slideDirection === 'right' ? 'slide-in-from-left' : ''}
                        ${!slideDirection ? 'zoom-in-95' : ''}
                      `}
                      priority={true}
                      quality={100}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {gallery.length > 1 && (
              <>
                {/* Botões de navegação */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Indicadores */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {gallery.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === galleryIndex
                          ? "bg-white w-4"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Botão de Tela Cheia */}
            {!showVideo && !gallery[galleryIndex].includes('youtube.com/embed') && (
              <div className="absolute top-2 right-2">
                <button
                  onClick={toggleFullscreen}
                  className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-5 w-5" />
                  ) : (
                    <Maximize2 className="h-5 w-5" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Conteúdo em duas colunas */}
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Descrição
                  </Badge>
                </h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                    Desafio
                  </Badge>
                </h3>
                <p className="text-muted-foreground">{project.challenge}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                    Solução
                  </Badge>
                </h3>
                <p className="text-muted-foreground">{project.solution}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Tecnologias</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="bg-background/50 border-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {(project.github || project.link) && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Links</h3>
                  <div className="flex flex-col gap-3">
                    {project.github && (
                      <Button
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Ver Código
                      </Button>
                    )}
                    {project.link && (
                      <Button
                        className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90 transition-opacity"
                        onClick={() => window.open(project.link, "_blank")}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ver Demo
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 