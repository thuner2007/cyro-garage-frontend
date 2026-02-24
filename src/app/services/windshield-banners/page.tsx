import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function WindshieldBannersPage() {
  const benefits = [
    "Precision plotter-cut for clean, sharp edges",
    "Premium UV-resistant vinyl that lasts for years",
    "Custom text in any font and color",
    "Available in matte, gloss, or metallic finishes",
    "Easy dry or wet application",
    "Residue-free removal when you want a change",
  ]

  const options = [
    {
      title: "Classic Text Banner",
      description:
        "A clean, bold text banner that sits across the top of your windshield. Choose your text, font style, and color for a timeless look.",
      image: "/windshield-banner-bold-text.jpg",
    },
    {
      title: "Sunstrip / Gradient Banner",
      description:
        "A gradient-tinted vinyl strip that combines style with sun protection. Available in various color fades.",
      image: "/sunstrip-windshield-banner.jpg",
    },
    {
      title: "Brand / Logo Banner",
      description:
        "Showcase your favorite brand, car club, or personal logo across your windshield with a professionally cut banner.",
      image: "/logo-brand-sticker-vinyl.jpg",
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
                WINDSHIELD <span className="text-primary glow-text">BANNERS</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Make a statement with a custom plotter-cut windshield banner. Your text, your font, your color -
                precision-cut from premium vinyl and shipped ready to apply.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/#contact">
                  <Button size="lg" className="group">
                    Order Your Banner
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
                src="/windshield-banner-bold-text.jpg"
                alt="Custom windshield banner"
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
              WHY OUR <span className="text-primary glow-text">BANNERS</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every banner is individually designed and plotter-cut in our workshop in Thun
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

      {/* Options Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              BANNER <span className="text-primary glow-text">STYLES</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose a style or tell us your idea - we will make it happen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {options.map((option, index) => (
              <Card
                key={index}
                className="bg-card border-border overflow-hidden group hover:border-primary transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{option.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Custom Banner?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Send us your text and preferred style. We will create a mockup for your approval before cutting.
            </p>
            <Link href="/#contact">
              <Button size="lg" className="group">
                Get Started
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
