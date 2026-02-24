import { MapPin, Clock, Truck, Mail } from "lucide-react"
import { Card } from "@/components/ui/card"

export function Location() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            BASED IN <span className="text-primary glow-text">THUN</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Designed and produced in our workshop in the heart of the Bernese Oberland, Switzerland
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-card border-border p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Our Workshop</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Thun, Switzerland
                  <br />
                  All stickers designed and cut locally
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Turnaround Time</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Standard orders: 2-4 business days
                  <br />
                  Custom designs: 3-5 business days
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Shipping</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Free shipping across Switzerland
                  <br />
                  EU shipping available from CHF 9.90
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Contact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  info@cyrogarage.ch
                  <br />
                  DM us on Instagram
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
