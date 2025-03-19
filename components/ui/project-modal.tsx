import { Dialog, DialogContent as RadixDialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2, X } from "lucide-react"
import { useState, useRef } from "react"
import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

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

// Estilo específico para iOS em fullscreen
const iOSFullscreenFix = `
  /* Fix para iOS */
  @supports (-webkit-touch-callout: none) {
    .ios-fullscreen-fix {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 100% !important;
      max-width: none !important;
      max-height: none !important;
      margin: 0 !important;
      padding: 0 !important;
      transform: none !important;
      border-radius: 0 !important;
      z-index: 9999 !important;
      background-color: #000000 !important;
    }
    
    /* Fix para o fundo em tela cheia iOS */
    body.ios-fullscreen-active {
      background-color: #000000 !important;
      overflow: hidden !important;
    }
  }
  
  /* Esconder botão X quando em fullscreen */
  [data-state="open"] .ios-fullscreen-fix button[aria-label="Close"] {
    display: none !important;
  }
  
  .ios-fullscreen-fix button[aria-label="Close"] {
    display: none !important;
  }
`

// Componente personalizado que estende o DialogContent original para não exibir o botão de fechar quando em fullscreen
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { isFullscreen?: boolean }
>(({ className, children, isFullscreen, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      {!isFullscreen && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground p-2 md:p-2">
          <X className="h-6 w-6 md:h-4 md:w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "CustomDialogContent";

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null)
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
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null || gallery.length <= 1) return

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

  const handleTouchEnd = () => {
    setTouchStart(null)
  }

  const toggleFullscreen = () => {
    // Simular fullscreen para compatibilidade com iOS
    const newFullscreenState = !isFullscreen;
    
    // Primeiro atualizamos o estado
    setIsFullscreen(newFullscreenState);
    
    // Depois aplicamos todas as mudanças necessárias
    if (newFullscreenState) {
      // Entrando em tela cheia
      document.body.classList.add('ios-fullscreen-active');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.backgroundColor = '#000000';
      document.body.style.backgroundColor = '#000000';
      
      // Força o foco no botão para garantir que ele seja clicável
      if (imageContainerRef.current) {
        const fullscreenButton = imageContainerRef.current.querySelector('button');
        if (fullscreenButton) {
          fullscreenButton.focus();
        }
      }
    } else {
      // Saindo da tela cheia
      document.body.classList.remove('ios-fullscreen-active');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    }
  }

  const handleThumbnailClick = () => {
    if (gallery[galleryIndex].includes('youtube.com/embed')) {
      setShowVideo(true)
    }
  }

  // Adicionado para fechar fullscreen ao pressionar ESC
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        toggleFullscreen(); // Usar a função toggleFullscreen em vez de apenas mudar o estado
      }
    }
    
    window.addEventListener('keydown', handleEscKey)
    return () => {
      window.removeEventListener('keydown', handleEscKey)
    }
  }, [isFullscreen])

  // Prevenir scroll e garantir fundo preto quando em tela cheia no iOS
  React.useEffect(() => {
    // Essa parte foi movida para dentro da função toggleFullscreen
    return () => {
      // Cleanup ao desmontar
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      document.body.classList.remove('ios-fullscreen-active');
    };
  }, []);

  // Adicione o estilo global para a animação e fix para iOS
  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = fadeInAnimation + iOSFullscreenFix + `
      /* Esconder botão de fechar quando em fullscreen */
      .fullscreen-active [data-ui-dialog-close] {
        display: none !important;
      }
    `
    document.head.appendChild(style)
    
    // Limpeza ao desmontar o componente
    return () => {
      document.head.removeChild(style)
      document.body.classList.remove('ios-fullscreen-active');
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
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        // Primeiro saímos da tela cheia se estiver ativa
        if (isFullscreen) {
          setIsFullscreen(false);
          document.body.classList.remove('ios-fullscreen-active');
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
          document.documentElement.style.backgroundColor = '';
          document.body.style.backgroundColor = '';
        }
        // Depois fechamos o modal
        onClose();
      }
    }}>
      <DialogContent 
        isFullscreen={isFullscreen}
        className={`
          ${isFullscreen 
            ? 'p-0 !max-w-none !max-h-none !w-full !h-screen !m-0 !rounded-none !inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 !border-0 fixed ios-fullscreen-fix bg-black' 
            : 'max-w-4xl max-h-[90vh]'
          } overflow-y-auto bg-gradient-to-br from-background to-primary/5`}
      >
        {!isFullscreen && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{project.title}</h2>
          </div>
        )}
        
        <div className={`${isFullscreen ? 'mt-0 h-full' : 'mt-8'}`}>
          {/* Galeria de Imagens */}
          <div 
            ref={imageContainerRef}
            className={`relative group bg-black/10 rounded-lg overflow-hidden ${
              isFullscreen ? 'fixed inset-0 z-[9999] bg-black h-full w-full flex items-center justify-center' : 'aspect-video'
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={`absolute top-6 right-6 z-[9999] ${isFullscreen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
              <button
                onClick={toggleFullscreen}
                className="w-14 h-14 rounded-full bg-black/80 text-white flex items-center justify-center border border-white/40 shadow-lg active:scale-95 transition-transform touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-7 w-7" />
                ) : (
                  <Maximize2 className="h-6 w-6" />
                )}
                <span className="sr-only">
                  {isFullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia'}
                </span>
              </button>
            </div>

            <div className={`relative ${isFullscreen ? 'w-full h-full flex items-center justify-center' : 'w-full h-full'}`}>
              <div className={`relative ${isFullscreen ? 'w-full h-full flex items-center justify-center' : 'aspect-video mb-6'}`}>
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
                      ${isFullscreen ? 'w-full h-full' : 'w-full h-full'}
                      transition-transform duration-500 ease-in-out
                    `}
                    style={isFullscreen ? { width: '100vw', height: '100vh' } : {}}
                  >
                    <Image
                      key={galleryIndex}
                      src={gallery[galleryIndex]}
                      alt={`${project.title} - Imagem`}
                      fill
                      className={`
                        ${isFullscreen ? 'object-contain !w-full !h-full' : 'object-cover'} 
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
                      sizes={isFullscreen ? "100vw" : "50vw"}
                      style={isFullscreen ? { 
                        objectFit: 'contain', 
                        width: '100%', 
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                      } : {}}
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
          </div>

          {/* Conteúdo em duas colunas - oculto quando em fullscreen */}
          {!isFullscreen && (
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 