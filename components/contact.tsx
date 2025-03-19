"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Send, AlertCircle, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"
import { cn } from "@/lib/utils"

// Schema de validação
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome muito longo')
    .regex(/^[a-zA-ZÀ-ÿ\s]*$/, 'Nome deve conter apenas letras'),
  email: z.string()
    .email('Email inválido')
    .min(5, 'Email muito curto')
    .max(50, 'Email muito longo'),
  subject: z.string()
    .min(3, 'Assunto deve ter pelo menos 3 caracteres')
    .max(100, 'Assunto muito longo'),
  message: z.string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(1000, 'Mensagem muito longa')
})

type ContactForm = z.infer<typeof contactSchema>

export default function Contact() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof ContactForm, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Função para verificar se o formulário está válido
  const isFormValid = () => {
    // Verifica se todos os campos foram preenchidos e são válidos
    try {
      contactSchema.parse(formData)
      return true
    } catch (error) {
      return false
    }
  }

  const validateField = (name: keyof ContactForm, value: string) => {
    try {
      contactSchema.shape[name].parse(value)
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
      setTouched(prev => ({ ...prev, [name]: true }))
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }))
        setTouched(prev => ({ ...prev, [name]: true }))
        return false
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name as keyof ContactForm, value)
  }

  // Removendo a necessidade de handleBlur já que validamos em tempo real
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    validateField(name as keyof ContactForm, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validar todos os campos
    let isValid = true
    Object.keys(formData).forEach((key) => {
      const fieldValid = validateField(
        key as keyof ContactForm,
        formData[key as keyof ContactForm]
      )
      if (!fieldValid) isValid = false
    })

    if (!isValid) {
      setIsSubmitting(false)
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os erros no formulário",
        variant: "destructive",
      })
      return
    }

    try {
      console.log('Enviando formulário...')
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('Resposta recebida:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem')
      }

      // Resetar formulário
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setErrors({})
      setTouched({})

      // Mostrar mensagem de sucesso
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderei em breve!",
        variant: "default",
      })
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      toast({
        title: "Erro ao enviar",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderFieldError = (fieldName: keyof ContactForm) => {
    if (touched[fieldName] && errors[fieldName]) {
      return (
        <div className="flex items-center gap-1 mt-1 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{errors[fieldName]}</span>
        </div>
      )
    }
    if (touched[fieldName] && !errors[fieldName]) {
      return (
        <div className="flex items-center gap-1 mt-1 text-primary text-sm">
          <CheckCircle2 className="h-4 w-4" />
          <span>Válido</span>
        </div>
      )
    }
    return null
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl opacity-50"></div>

      <div className="container relative z-10">
        <h2 className="section-title">Entre em Contato</h2>
        <p className="section-subtitle">Vamos trabalhar juntos? Entre em contato para discutirmos seu projeto</p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Vamos Conversar</h3>
            <p className="text-muted-foreground mb-8">
              Estou sempre aberto a novas oportunidades e parcerias. Se você tem um projeto em mente ou apenas quer
              bater um papo sobre tecnologia, não hesite em entrar em contato.
            </p>

            <div className="space-y-6">
              <Card className="border-none shadow-md card-hover">
                <CardContent className="p-4 flex items-center">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:danieldigrandi08@gmail.com" className="font-medium hover:text-primary">
                      danieldigrandi08@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md card-hover">
                <CardContent className="p-4 flex items-center">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <a
                      href="https://wa.me/5519997145550"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-primary"
                    >
                      (19) 99714-5550
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card className="border-none shadow-xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Envie uma Mensagem</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nome
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={cn(
                          "border-primary/20 focus-visible:ring-primary transition-colors",
                          touched.name && errors.name && "border-destructive focus-visible:ring-destructive",
                          touched.name && !errors.name && "border-primary focus-visible:ring-primary"
                        )}
                      />
                      {renderFieldError('name')}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={cn(
                          "border-primary/20 focus-visible:ring-primary transition-colors",
                          touched.email && errors.email && "border-destructive focus-visible:ring-destructive",
                          touched.email && !errors.email && "border-primary focus-visible:ring-primary"
                        )}
                      />
                      {renderFieldError('email')}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Assunto
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Assunto da mensagem"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={cn(
                        "border-primary/20 focus-visible:ring-primary transition-colors",
                        touched.subject && errors.subject && "border-destructive focus-visible:ring-destructive",
                        touched.subject && !errors.subject && "border-primary focus-visible:ring-primary"
                      )}
                    />
                    {renderFieldError('subject')}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensagem
                    </label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Sua mensagem"
                        maxLength={1000}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={cn(
                          "border-primary/20 focus-visible:ring-primary transition-colors h-[200px] resize-none",
                          touched.message && errors.message && "border-destructive focus-visible:ring-destructive",
                          touched.message && !errors.message && "border-primary focus-visible:ring-primary"
                        )}
                      />
                      <div className={cn(
                        "absolute -bottom-6 right-0 text-xs",
                        formData.message.length > 900 ? "text-destructive" : 
                        formData.message.length > 700 ? "text-yellow-500" : 
                        "text-muted-foreground",
                        "transition-colors duration-200"
                      )}>
                        {formData.message.length}/1000
                      </div>
                    </div>
                    {renderFieldError('message')}
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 bg-primary hover:bg-primary/90 transition-colors mt-8"
                    disabled={isSubmitting || !isFormValid()}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        Enviar Mensagem <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

