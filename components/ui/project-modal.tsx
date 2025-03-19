import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react"
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
`

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
    style.textContent = fadeInAnimation + iOSFullscreenFix
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
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          isFullscreen ? 'h-screen w-screen max-w-none rounded-none border-none bg-black p-0 sm:rounded-none' : ''
        )}
      >
        {/* Container para a imagem e botões */}
        <div ref={imageContainerRef} className="relative h-full w-full">
          {/* Botão de tela cheia */}
          <button
            onClick={toggleFullscreen}
            className={cn(
              'absolute right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border bg-black/50 text-white shadow-lg transition-all hover:bg-black/70 active:scale-95',
              isFullscreen ? 'top-4' : 'top-4'
            )}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
            <span className="sr-only">
              {isFullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia'}
            </span>
          </button>

          {/* Imagem */}
          <div
            className={cn(
              'relative flex h-full w-full items-center justify-center overflow-hidden',
              isFullscreen ? 'h-screen' : ''
            )}
          >
            <Image
              src={gallery[galleryIndex]}
              alt={`Imagem ${galleryIndex + 1} do projeto`}
              width={1280}
              height={720}
              quality={100}
              priority
              className={cn(
                'h-auto w-auto max-w-full object-contain transition-transform duration-500 ease-in-out',
                isFullscreen ? 'max-h-screen' : 'max-h-[80vh]'
              )}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://i.ytimg.com/vi/${project.youtubeId}/mqdefault.jpg`;
                target.onerror = () => {
                  target.src = `https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg`;
                };
              }}
            />
          </div>

          {/* Botões de navegação */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className={cn(
                  'absolute left-4 top-[50%] z-50 flex h-10 w-10 translate-y-[-50%] items-center justify-center rounded-full border bg-black/50 text-white shadow-lg transition-all hover:bg-black/70 active:scale-95',
                  isFullscreen ? 'h-12 w-12' : ''
                )}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <ChevronLeft className={cn('h-6 w-6', isFullscreen ? 'h-8 w-8' : '')} />
                <span className="sr-only">Imagem anterior</span>
              </button>
              <button
                onClick={nextImage}
                className={cn(
                  'absolute right-4 top-[50%] z-50 flex h-10 w-10 translate-y-[-50%] items-center justify-center rounded-full border bg-black/50 text-white shadow-lg transition-all hover:bg-black/70 active:scale-95',
                  isFullscreen ? 'h-12 w-12' : ''
                )}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <ChevronRight className={cn('h-6 w-6', isFullscreen ? 'h-8 w-8' : '')} />
                <span className="sr-only">Próxima imagem</span>
              </button>
            </>
          )}
        </div>

        {/* Título e descrição - só mostrar quando não estiver em tela cheia */}
        {!isFullscreen && (
          <div className="px-6 pb-6">
            <DialogHeader>
              <DialogTitle>{project.title}</DialogTitle>
              {project.description && (
                <DialogDescription>{project.description}</DialogDescription>
              )}
            </DialogHeader>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 