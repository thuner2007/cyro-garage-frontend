import { Scissors, Ruler, Palette } from "lucide-react"

const values = [
  {
    icon: Scissors,
    title: "Precision Cut",
    description: "Every design is cut with a professional plotter for clean, sharp edges",
  },
  {
    icon: Palette,
    title: "Custom Design",
    description: "Your ideas brought to life with in-house design and unlimited color choices",
  },
  {
    icon: Ruler,
    title: "Perfect Fit",
    description: "Measured and sized to fit your exact vehicle make and model",
  },
]

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              ABOUT <span className="text-primary glow-text">CYROGARAGE</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                CyroGarage specializes in premium plotter-cut vinyl stickers and graphic designs
                for the car community. From bold windshield banners to intricate custom decals,
                every piece is designed and produced in-house.
              </p>
              <p>
                We use a professional vinyl cutting plotter paired with high-quality, UV-resistant
                vinyl films to deliver stickers that look sharp and last through all weather conditions.
                Whether you want a clean text banner or a complex graphic design, we bring your vision to life.
              </p>
              <p>
                Every order is handcrafted with care - from the initial design concept through
                plotter cutting, weeding, and application-ready finishing. We take pride in
                delivering products that stand out on the road.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-card border border-border rounded-lg hover:border-primary transition-all duration-300 group"
                >
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              )
            })}

            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/vinyl-plotter-cutting-machine.jpg"
                alt="Our vinyl cutting plotter in action"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              <p className="absolute bottom-4 left-4 text-sm font-semibold text-foreground">
                Our plotter in action
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
