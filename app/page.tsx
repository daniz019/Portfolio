import Hero from "@/components/hero"
import About from "@/components/about"
import Portfolio from "@/components/portfolio"
import Services from "@/components/services"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Contact />
    </main>
  )
}

