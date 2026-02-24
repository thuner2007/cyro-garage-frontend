"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Filter } from "lucide-react"

const allProducts = [
  {
    name: "Classic Text Banner",
    category: "Windshield Banners",
    price: "CHF 39.90",
    image: "/windshield-banner-bold-text.jpg",
    description: "Bold custom text banner for the top of your windshield. Choose your font and color.",
  },
  {
    name: "Sunstrip Gradient Banner",
    category: "Windshield Banners",
    price: "CHF 44.90",
    image: "/sunstrip-windshield-banner.jpg",
    description: "Gradient-tinted sunstrip banner combining style with sun protection.",
  },
  {
    name: "Brand Logo Banner",
    category: "Windshield Banners",
    price: "CHF 49.90",
    image: "/logo-brand-sticker-vinyl.jpg",
    description: "Your favorite brand or car club logo as a windshield banner.",
  },
  {
    name: "JDM Side Window Set",
    category: "Window Graphics",
    price: "CHF 49.90",
    image: "/side-window-decal-graphic.jpg",
    description: "Japanese-inspired graphics for both side windows. Kanji and geometric elements.",
  },
  {
    name: "Rear Window Graphic",
    category: "Window Graphics",
    price: "CHF 34.90",
    image: "/rear-window-sticker-design.jpg",
    description: "Custom graphic design for your rear window. Logos, text, or abstract art.",
  },
  {
    name: "Quarter Window Accents",
    category: "Window Graphics",
    price: "CHF 29.90",
    image: "/custom-text-sticker-vinyl.jpg",
    description: "Small accent graphics for quarter panel windows. Subtle but impactful.",
  },
  {
    name: "Custom Text Sticker",
    category: "Custom Stickers",
    price: "CHF 19.90",
    image: "/custom-text-sticker-vinyl.jpg",
    description: "Your custom text in any font, size, and color. Perfect for any surface.",
  },
  {
    name: "Logo / Brand Sticker",
    category: "Custom Stickers",
    price: "CHF 14.90",
    image: "/logo-brand-sticker-vinyl.jpg",
    description: "Your personal logo or brand cut from premium vinyl.",
  },
  {
    name: "Racing Stripe Set",
    category: "Custom Stickers",
    price: "CHF 59.90",
    image: "/sunstrip-windshield-banner.jpg",
    description: "Classic racing stripes for hood, roof, and trunk. Available in multiple widths.",
  },
  {
    name: "Social Handle Sticker",
    category: "Custom Stickers",
    price: "CHF 12.90",
    image: "/custom-text-sticker-vinyl.jpg",
    description: "Your Instagram or TikTok handle as a clean vinyl sticker.",
  },
  {
    name: "Combo Pack - Banner + Sides",
    category: "Bundles",
    price: "CHF 79.90",
    image: "/windshield-banner-bold-text.jpg",
    description: "Windshield banner plus matching side window graphics at a bundled price.",
  },
  {
    name: "Full Window Set",
    category: "Bundles",
    price: "CHF 109.90",
    image: "/side-window-decal-graphic.jpg",
    description: "Complete set: windshield banner, side windows, and rear window graphic.",
  },
]

const categories = ["All", "Windshield Banners", "Window Graphics", "Custom Stickers", "Bundles"]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts =
    selectedCategory === "All" ? allProducts : allProducts.filter((p) => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              ALL <span className="text-primary glow-text">DESIGNS</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Browse our collection of plotter-cut vinyl stickers and banners.
              Every design can be customized to your preferences.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-5 w-5" />
              <span className="font-semibold uppercase tracking-wider text-sm">Filter:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`uppercase tracking-wider ${selectedCategory !== category ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent" : ""}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
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
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
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

          {/* Results Count */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Showing <span className="text-primary font-semibold">{filteredProducts.length}</span> designs
              {selectedCategory !== "All" && (
                <span>
                  {" "}
                  in <span className="text-primary font-semibold">{selectedCategory}</span>
                </span>
              )}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
