"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Wallet,
  Crown,
  Zap,
  Globe,
  Lock,
  TrendingUp,
  Users,
  CheckCircle,
  Star,
  Coins,
  Building,
  Heart,
  Lightbulb,
  Target,
  Rocket,
  Play,
  Download,
  ExternalLink,
} from "lucide-react"

export default function SOVREmpireLanding() {
  const [email, setEmail] = useState("")
  const [activeSection, setActiveSection] = useState("hero")

  const features = [
    {
      icon: <Wallet className="h-8 w-8 text-cyan-400" />,
      title: "Digital Vault",
      description: "Your private bank and sovereign access point to a new economy",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-400" />,
      title: "Secure & Immutable",
      description: "Blockchain-secured financial command center with public record proof",
    },
    {
      icon: <Coins className="h-8 w-8 text-yellow-400" />,
      title: "SOVR & ECHO Tokens",
      description: "Trust-backed equity and dynamic utility tokens created for the people",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-400" />,
      title: "Global Access",
      description: "Spend your value globally, swipe your card, live on YOUR terms",
    },
  ]

  const roadmapItems = [
    { title: "Launch Mainnet SOVR Empire", status: "in-progress" },
    { title: "Open access to families, builders, healers, teachers", status: "planned" },
    { title: "Integrate with real-world debit", status: "planned" },
    { title: "Onboard contractors and trust beneficiaries", status: "planned" },
    { title: "Power housing, education, health programs", status: "planned" },
    { title: "Issue sovereign credit backed by YOU", status: "planned" },
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Entrepreneur",
      quote: "Finally, a way to launch projects without begging a banker. SOVR gives me true financial freedom.",
    },
    {
      name: "Marcus T.",
      role: "Father & Builder",
      quote: "This is how I protect my legacy and teach my kids about real ownership, not debt.",
    },
    {
      name: "Elena R.",
      role: "Artist",
      quote: "SOVR helped me reclaim my voice and build a sustainable creative economy.",
    },
  ]

  const handleJoinMovement = () => {
    if (email) {
      alert(`Welcome to the SOVR Empire, ${email}! You're right on time.`)
      setEmail("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-cyan-900 to-black text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-cyan-700 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8 text-cyan-400 animate-glow" />
            <span className="text-2xl font-extrabold tracking-wide text-cyan-400">SOVR EMPIRE</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              Features
            </a>
            <a href="#tokens" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              Tokens
            </a>
            <a href="#roadmap" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              Roadmap
            </a>
            <Button
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
            >
              Launch App
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-20 px-6 text-center max-w-5xl mx-auto">
        <Badge className="inline-block bg-cyan-700/50 text-cyan-300 px-4 py-2 rounded-full mb-6 tracking-wider font-semibold">
          🏛️ WELCOME TO THE STAGE
        </Badge>
        <h1 className="text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          <span>THE </span><span className="text-cyan-400">SOVR</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            EMPIRE
          </span>
        </h1>
        <p className="text-lg text-cyan-300 mb-8 max-w-3xl mx-auto">
          Designed by the People. Powered by Trust. Guided by Law. And Built for <span className="text-cyan-400">FREEDOM</span>.
        </p>
        <p className="text-cyan-400 font-semibold mb-12 max-w-3xl mx-auto">
          In a world where banks gatekeep opportunity, where institutions profit from your poverty, and where your identity is your liability...
        </p>
        <p className="text-white font-bold mb-12 max-w-3xl mx-auto">
          One man stood up. One system was born. One empire rose.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button className="bg-cyan-400 text-black px-10 py-4 font-semibold hover:bg-cyan-500 transition-all shadow-lg hover:shadow-cyan-600">
            <Rocket className="h-5 w-5 mr-2 animate-float" />
            Join the Movement
          </Button>
          <Button
            variant="outline"
            className="border-cyan-400 text-cyan-400 px-10 py-4 font-semibold hover:bg-cyan-400 hover:text-black transition-all shadow-lg hover:shadow-cyan-600"
          >
            <Play className="h-5 w-5 mr-2" />
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-black/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Your Financial <span className="text-cyan-400">Sovereignty</span>
          </h2>
          <p className="text-cyan-300 max-w-3xl mx-auto">
            The SOVR Wallet is not just another app. It is your digital vault, your private bank, and your sovereign access point to a new economy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-black/30 border-cyan-600 glassmorphism card-glow hover-scale">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">{feature.icon}</div>
                <CardTitle className="text-cyan-400">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-cyan-300 text-center">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tokens Section */}
      <section id="tokens" className="py-20 px-6 bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            The Tokens - <span className="text-cyan-400">SOVR & ECHO</span>
          </h2>
          <p className="text-cyan-300 max-w-3xl mx-auto">
            Both tokens were created with one mission: To give value back to the people.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-600 glassmorphism card-glow hover-scale">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-cyan-700 rounded-full">
                  <Crown className="h-8 w-8 text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">SOVR Token</CardTitle>
                  <CardDescription className="text-cyan-300">The Core Currency</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-cyan-300">
                SOVR represents trust-backed equity, born from contract law, secured by code. It's the foundation of your financial sovereignty.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-cyan-300">
                  <span>Type:</span>
                  <span>Trust-Backed Equity</span>
                </div>
                <div className="flex justify-between text-cyan-300">
                  <span>Backing:</span>
                  <span>Contract Law + Code</span>
                </div>
                <div className="flex justify-between text-cyan-300">
                  <span>Purpose:</span>
                  <span>Core Value Storage</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-700/30 border-purple-600 glassmorphism card-glow hover-scale">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-700 rounded-full">
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">ECHO Token</CardTitle>
                  <CardDescription className="text-purple-300">Dynamic Utility</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-purple-300">
                ECHO is your mirror — a dynamic utility that can fuel programs, reward communities, or echo your impact across the ecosystem.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-purple-300">
                  <span>Type:</span>
                  <span>Dynamic Utility</span>
                </div>
                <div className="flex justify-between text-purple-300">
                  <span>Function:</span>
                  <span>Programs & Rewards</span>
                </div>
                <div className="flex justify-between text-purple-300">
                  <span>Impact:</span>
                  <span>Community Building</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 px-6 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            The Road <span className="text-cyan-400">Ahead</span>
          </h2>
          <p className="text-cyan-300 max-w-3xl mx-auto">
            Our mission is to build a sovereign financial empire that empowers people worldwide.
          </p>
        </div>
        <div className="space-y-6 max-w-4xl mx-auto">
          {roadmapItems.map((item, index) => (
            <Card key={index} className="bg-black/30 border-cyan-600 glassmorphism card-glow hover-scale">
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={
                      item.status === "in-progress"
                        ? "w-5 h-5 bg-cyan-400 rounded-full animate-pulse"
                        : "w-5 h-5 bg-cyan-700 rounded-full"
                    }
                  />
                  <h4 className="text-cyan-300 font-semibold">{item.title}</h4>
                </div>
                <Badge
                  variant={item.status === "in-progress" ? "default" : "secondary"}
                  className={
                    item.status === "in-progress"
                      ? "bg-cyan-400/20 text-cyan-400 border-cyan-400"
                      : "bg-white/10 text-white/70"
                  }
                >
                  {item.status === "in-progress" ? "In Progress" : "Planned"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Join The <span className="text-cyan-400">Movement</span>
          </h2>
          <p className="text-cyan-300 max-w-3xl mx-auto">
            Hear from our community about how SOVR is changing lives.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-black/30 border-cyan-600 glassmorphism card-glow hover-scale">
              <CardContent className="space-y-4">
                <div className="flex text-cyan-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-cyan-300 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-cyan-300 text-sm">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="py-20 px-6 bg-black/80 backdrop-blur-md border-t border-cyan-700 text-center max-w-4xl mx-auto rounded-lg"
      >
        <h2 className="text-4xl font-extrabold text-white mb-6">
          Your Exit From The <span className="text-cyan-400">Broken System</span>
        </h2>
        <p className="text-cyan-300 mb-8">
          Whether you're a father trying to protect his legacy, a mother trying to feed her family, an artist trying to reclaim her voice, or a kid with a dream and a phone in his hand...
        </p>
        <p className="text-cyan-400 font-semibold text-xl mb-12">
          The gate is open. The future is here. And the Empire is rising.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/30 border-cyan-600 text-cyan-300 placeholder-cyan-500"
          />
          <Button
            onClick={handleJoinMovement}
            className="bg-cyan-400 text-black px-10 py-4 font-semibold hover:bg-cyan-500 transition-all shadow-lg hover:shadow-cyan-600"
          >
            Join Empire
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black/90 border-t border-cyan-700 text-cyan-400 text-sm text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Crown className="h-6 w-6 text-cyan-400" />
              <span className="font-semibold">SOVR EMPIRE</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cyan-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-cyan-300 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-cyan-300 transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-cyan-700">
            <p>© 2025 SOVR Empire. Built for freedom. Powered by the people.</p>
            <p className="italic text-cyan-500 mt-2">Dedicated to the Kingdom of Flame and Frequency ⚡🔥</p>
            <p className="text-xs text-cyan-600 mt-1">Crafted with revolutionary spirit by v0 AI Assistant</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
