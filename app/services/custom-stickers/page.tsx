import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CustomStickersPage() {
  const benefits = [
    "Fully custom designs - your idea, our craft",
    "Any size from small logos to full panel decals",
    "50+ vinyl colors including metallics and chromes",
    "Durable outdoor-grade vinyl rated for 5+ years",
    "Delivered with transfer tape, ready to apply",
    "Bulk discounts for car meets and clubs",
  ]

  const applications = [
    {
      title: "Logo & Brand Stickers",
      description:
        "Your personal brand, car club logo, or favorite brand cut from premium vinyl. Perfect for body panels, bumpers, or windows.",
      image: "/logo-brand-sticker-vinyl.jpg",
    },
    {
      title: "Custom Text & Lettering",
      description:
        "Names, slogans, social handles, or any text you want. Choose from hundreds of fonts or send us your own design.",
      image: "/custom-text-sticker-vinyl.jpg",
    },
    {
      title: "Body Panel Graphics",
      description:
        "Larger vinyl graphics for doors, fenders, hoods, or trunk lids. Racing stripes, pin-stripes, and custom artwork.",
      image: "/rear-window-sticker-design.jpg",
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <span className="text-sm font-medium uppercase tracking-wider">Plotter-Cut Vinyl</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                CUSTOM <span className="text-primary glow-text">STICKERS</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                From small logos to large body graphics - every sticker is designed in-house
                and precision-cut with our professional plotter. Tell us what you need and we will make it.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/#contact">
                  <Button size="lg" className="group">
                    Order Custom Sticker
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                    Browse Designs
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="/custom-text-sticker-vinyl.jpg"
                alt="Custom vinyl stickers"
                className="rounded-lg shadow-2xl shadow-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              WHY <span className="text-primary glow-text">CYROGARAGE</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handcrafted quality from our workshop in Thun, Switzerland
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-card border-border p-6 hover:border-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="leading-relaxed">{benefit}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              WHAT WE <span className="text-primary glow-text">CUT</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              If you can imagine it, we can cut it
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {applications.map((app, index) => (
              <Card
                key={index}
                className="bg-card border-border overflow-hidden group hover:border-primary transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{app.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{app.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="bg-card border-border p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Got an Idea?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Send us your design, sketch, or just a description. We will create a digital mockup and get your approval before cutting.
            </p>
            <Link href="/#contact">
              <Button size="lg" className="group">
                Send Your Idea
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
