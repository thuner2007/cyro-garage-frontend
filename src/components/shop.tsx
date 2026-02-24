import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

const products = [
  {
    name: "Classic Windshield Banner",
    category: "Windshield Banners",
    price: "CHF 39.90",
    image: "/windshield-banner-bold-text.jpg",
  },
  {
    name: "JDM Side Window Set",
    category: "Window Graphics",
    price: "CHF 49.90",
    image: "/side-window-decal-graphic.jpg",
  },
  {
    name: "Custom Text Sticker",
    category: "Custom Stickers",
    price: "CHF 24.90",
    image: "/custom-text-sticker-vinyl.jpg",
  },
  {
    name: "Sunstrip Gradient Banner",
    category: "Windshield Banners",
    price: "CHF 44.90",
    image: "/sunstrip-windshield-banner.jpg",
  },
  {
    name: "Rear Window Graphic",
    category: "Window Graphics",
    price: "CHF 34.90",
    image: "/rear-window-sticker-design.jpg",
  },
  {
    name: "Logo / Brand Sticker",
    category: "Custom Stickers",
    price: "CHF 19.90",
    image: "/logo-brand-sticker-vinyl.jpg",
  },
]

export function Shop() {
  return (
    <section id="shop" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            POPULAR <span className="text-primary glow-text">DESIGNS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Ready-to-order stickers and banners, or use these as a starting point for your custom design
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={index}
              className="bg-card border-border overflow-hidden group hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                </div>
                <Button className="w-full group/btn">
                  <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wider bg-transparent"
            >
              View All Designs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
