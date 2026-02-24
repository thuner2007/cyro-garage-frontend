import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Shop } from "@/components/shop"
import { Location } from "@/components/location"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Shop />
      <Location />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
