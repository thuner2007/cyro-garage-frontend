import { Instagram, Youtube, Facebook } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Products: [
      { name: "Windshield Banners", href: "/services/windshield-banners" },
      { name: "Window Graphics", href: "/services/window-graphics" },
      { name: "Custom Stickers", href: "/services/custom-stickers" },
      { name: "All Designs", href: "/shop" },
    ],
    Company: [
      { name: "About Us", href: "/#about" },
      { name: "Contact", href: "/#contact" },
      { name: "Services", href: "/services" },
    ],
    Support: [
      { name: "Application Guide", href: "#" },
      { name: "Shipping Info", href: "#" },
      { name: "FAQ", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <div className="text-3xl font-bold tracking-tight mb-4">
                <span className="text-primary glow-text">CYRO</span>
                <span className="text-foreground">GARAGE</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Custom plotter-cut windshield stickers and vinyl graphics. Designed and produced in Thun, Switzerland.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Based in <span className="text-primary font-semibold">Thun, Switzerland</span>
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4 uppercase tracking-wider">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} CyroGarage. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
