import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "Windshield Banners",
    subtitle: "Scheibenbanner",
    description:
      "Bold plotter-cut vinyl banners for the top of your windshield. Choose your text, font, and color - we handle the rest. Our banners are precision-cut for a clean, professional look.",
    href: "/services/windshield-banners",
    image: "/windshield-banner-bold-text.jpg",
  },
  {
    title: "Window Graphics",
    subtitle: "Fenstergrafiken",
    description:
      "Custom graphic designs for your side and rear windows. From JDM-style kanji lettering to geometric patterns and racing-inspired designs, all precision-cut with our professional plotter.",
    href: "/services/window-graphics",
    image: "/side-window-decal-graphic.jpg",
  },
  {
    title: "Custom Stickers",
    subtitle: "Individuelle Aufkleber",
    description:
      "Bespoke vinyl stickers and decals for any surface. Logos, custom lettering, body panel graphics - designed in-house and plotter-cut to your exact specifications in any size and color.",
    href: "/services/custom-stickers",
    image: "/custom-text-sticker-vinyl.jpg",
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              OUR <span className="text-primary glow-text">SERVICES</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              All designs are created in-house and precision-cut with our professional vinyl plotter.
              Premium materials, clean cuts, and fast turnaround.
            </p>
          </div>

          <div className="grid gap-12 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-card border-border overflow-hidden hover:border-primary transition-all duration-300 group"
              >
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? "md:direction-rtl" : ""}`}>
                  <div className={`relative h-64 md:h-auto overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent md:hidden" />
                  </div>

                  <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "md:order-1" : ""}`}>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">{service.subtitle}</p>
                    <p className="text-muted-foreground mb-8 leading-relaxed text-lg">{service.description}</p>

                    <Link href={service.href}>
                      <Button className="group/btn">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
