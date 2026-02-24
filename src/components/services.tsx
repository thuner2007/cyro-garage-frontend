import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "Windshield Banners",
    subtitle: "Scheibenbanner",
    description:
      "Bold plotter-cut vinyl banners for the top of your windshield. Custom text, fonts, and colors to match your style.",
    features: ["Custom Typography", "Precision Plotter-Cut", "UV Resistant Vinyl", "Easy Application"],
    image: "/windshield-banner-bold-text.jpg",
    href: "/services/windshield-banners",
  },
  {
    title: "Window Graphics",
    subtitle: "Fenstergrafiken",
    description:
      "Custom graphic designs for side and rear windows. From JDM-style lettering to geometric patterns, all cut with precision.",
    features: ["Side Windows", "Rear Windows", "Custom Patterns", "Premium Materials"],
    image: "/side-window-decal-graphic.jpg",
    href: "/services/window-graphics",
  },
  {
    title: "Custom Stickers",
    subtitle: "Individuelle Aufkleber",
    description:
      "Bespoke vinyl stickers and decals for any surface. Logos, lettering, graphics - designed and plotter-cut to your exact specifications.",
    features: ["Logo Stickers", "Custom Lettering", "Body Panel Decals", "Any Size & Color"],
    image: "/custom-text-sticker-vinyl.jpg",
    href: "/services/custom-stickers",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            WHAT WE <span className="text-primary glow-text">OFFER</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            All stickers are designed in-house and precision-cut with our professional plotter
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary transition-all duration-300 overflow-hidden group hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              <div className="p-8 -mt-8 relative">
                <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">{service.subtitle}</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={service.href}>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent group/btn">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
