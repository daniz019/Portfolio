"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

type Testimonial = {
  id: number
  name: string
  role: string
  company: string
  image: string
  content: string
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Carlos Silva",
      role: "CEO",
      company: "TechSolutions",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Daniel é um profissional excepcional. Seu conhecimento técnico e capacidade de resolver problemas complexos nos impressionou. Ele entregou nosso projeto antes do prazo e com qualidade superior ao esperado.",
    },
    {
      id: 2,
      name: "Ana Oliveira",
      role: "Diretora de Produto",
      company: "InnovateX",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Trabalhar com o Daniel foi uma experiência incrível. Ele não apenas implementou exatamente o que precisávamos, mas também sugeriu melhorias que tornaram nosso produto ainda melhor. Recomendo fortemente!",
    },
    {
      id: 3,
      name: "Marcos Pereira",
      role: "CTO",
      company: "GameDev Studios",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "A capacidade do Daniel de entender rapidamente nossos requisitos e transformá-los em soluções eficientes foi impressionante. Seu trabalho com automação economizou horas de trabalho manual para nossa equipe.",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="bg-gradient-to-b from-background to-secondary/5">
      <div className="container">
        <h2 className="section-title">Depoimentos</h2>
        <p className="section-subtitle">O que meus clientes dizem sobre meu trabalho e colaboração</p>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border-none shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
            <CardContent className="p-8 md:p-12 bg-gradient-to-br from-background to-primary/5">
              <Quote className="h-12 w-12 text-primary/20 mb-6" />

              <div className="grid md:grid-cols-[1fr_3fr] gap-8 items-center">
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 gradient-border p-1">
                    <img
                      src={testimonials[activeIndex].image || "/placeholder.svg"}
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="font-bold">{testimonials[activeIndex].name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>

                <blockquote className="text-lg italic">"{testimonials[activeIndex].content}"</blockquote>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              aria-label="Depoimento anterior"
              className="rounded-full hover:bg-primary/10 hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant={index === activeIndex ? "default" : "outline"}
                size="icon"
                className={`w-3 h-3 rounded-full p-0 ${index === activeIndex ? "bg-gradient-to-r from-primary to-secondary" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              aria-label="Próximo depoimento"
              className="rounded-full hover:bg-primary/10 hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

