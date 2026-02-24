"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            GET IN <span className="text-primary glow-text">TOUCH</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Have a custom design in mind? Send us your idea and we will make it happen
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+41 XX XXX XX XX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Describe your sticker idea</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your design - text, colors, size, vehicle model..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full group">
                <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                Send Request
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-card border-border p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a
                      href="mailto:info@cyrogarage.ch"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@cyrogarage.ch
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <a href="tel:+41XXXXXXXX" className="text-muted-foreground hover:text-primary transition-colors">
                      +41 XX XXX XX XX
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Location</p>
                    <p className="text-muted-foreground">
                      Thun, Switzerland
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-8">
              <h3 className="text-2xl font-bold mb-4">How It Works</h3>
              <ol className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-bold text-primary text-lg">1.</span>
                  <span>Send us your idea - text, reference image, or sketch</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary text-lg">2.</span>
                  <span>We create a digital mockup for your approval</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary text-lg">3.</span>
                  <span>Your design is plotter-cut from premium vinyl</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary text-lg">4.</span>
                  <span>We ship it to you with application instructions</span>
                </li>
              </ol>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
