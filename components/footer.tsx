import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-background to-primary/10 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold font-poppins">
              Daniel<span className="text-primary">.</span>
            </Link>
            <p className="text-muted-foreground mt-2 max-w-md">
              Desenvolvedor Full Stack especializado em automação, inteligência artificial e desenvolvimento web.
            </p>
          </div>

          {/* Os ícones foram removidos daqui */}
        </div>

        <div className="border-t border-primary/10 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Daniel Di Grandi. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

