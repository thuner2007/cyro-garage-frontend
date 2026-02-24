import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function WindowGraphicsPage() {
  const benefits = [
    "Custom designs for side and rear windows",
    "Precision plotter-cut for intricate detail",
    "High-quality vinyl in 50+ colors",
    "Weather and UV resistant for years of use",
    "Does not obstruct visibility when properly placed",
    "Easy application with transfer tape included",
  ]

  const styles = [
    {
      title: "JDM / Kanji Style",
      description:
        "Japanese-inspired lettering and graphic elements popular in the tuning scene. Clean kanji characters, katakana text, and rising sun motifs.",
      image: "/side-window-decal-graphic.jpg",
    },
    {
      title: "Rear Window Decals",
      description:
        "Custom graphics for your rear window - from brand logos and text to full graphic compositions that turn heads on the road.",
      image: "/rear-window-sticker-design.jpg",
    },
    {
      title: "Geometric & Abstract",
      description:
        "Modern geometric patterns, tribal designs, and abstract graphics that add a unique visual element to your windows.",
      image: "/custom-text-sticker-vinyl.jpg",
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
                WINDOW <span className="text-primary glow-text">GRAPHICS</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Custom plotter-cut graphics for your side and rear windows. From subtle accents
                to bold statements, we design and cut everything in-house using premium vinyl.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/#contact">
                  <Button size="lg" className="group">
                    Design Your Graphics
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
                src="/side-window-decal-graphic.jpg"
                alt="Custom window graphics"
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
              PREMIUM <span className="text-primary glow-text">QUALITY</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed in Thun, cut with precision, built to last
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

      {/* Styles Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              GRAPHIC <span className="text-primary glow-text">STYLES</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pick a style or bring your own idea - we cut it for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {styles.map((style, index) => (
              <Card
                key={index}
                className="bg-card border-border overflow-hidden group hover:border-primary transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={style.image}
                    alt={style.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {style.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{style.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a Design in Mind?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Send us a sketch, reference image, or description and we will create a custom mockup for your approval.
            </p>
            <Link href="/#contact">
              <Button size="lg" className="group">
                Start Your Design
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
