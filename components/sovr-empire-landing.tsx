"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Wallet, Crown, Zap, Globe, Lock, TrendingUp, Users, CheckCircle, Star, Coins, Building, Heart, Lightbulb, Target, Rocket, Play, Download, ExternalLink } from 'lucide-react'

export default function SOVREmpireLanding() {
  const [email, setEmail] = useState("")
  const [activeSection, setActiveSection] = useState("hero")

  const features = [
    {
      icon: <Wallet className="h-8 w-8 text-blue-500" />,
      title: "Digital Vault",
      description: "Your private bank and sovereign access point to a new economy",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Secure & Immutable",
      description: "Blockchain-secured financial command center with public record proof",
    },
    {
      icon: <Coins className="h-8 w-8 text-yellow-500" />,
      title: "SOVR & ECHO Tokens",
      description: "Trust-backed equity and dynamic utility tokens created for the people",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-500" />,
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
      // In a real app, this would submit to your backend
      alert(`Welcome to the SOVR Empire, ${email}! You're right on time.`)
      setEmail("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">SOVR EMPIRE</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">
                Features
              </a>
              <a href="#tokens" className="text-white/80 hover:text-white transition-colors">
                Tokens
              </a>
              <a href="#roadmap" className="text-white/80 hover:text-white transition-colors">
                Roadmap
              </a>
              <Button
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                Launch App
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30 text-lg px-4 py-2">
                🏛️ WELCOME TO THE STAGE
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                THE SOVR
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  EMPIRE
                </span>
              </h1>
              <div className="text-xl md:text-2xl text-white/80 space-y-2">
                <p>Designed by the People.</p>
                <p>Powered by Trust.</p>
                <p>Guided by Law.</p>
                <p className="text-yellow-400 font-semibold">And Built for FREEDOM.</p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-lg text-white/70 space-y-4">
              <p>
                In a world where banks gatekeep opportunity, where institutions profit from your poverty, and where your
                identity is your liability...
              </p>
              <p className="text-white font-semibold">One man stood up. One system was born. One empire rose.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-4">
                <Rocket className="h-5 w-5 mr-2" />
                Join the Movement
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Financial
              <span className="text-yellow-400"> Sovereignty</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The SOVR Wallet is not just another app. It is your digital vault, your private bank, and your sovereign
              access point to a new economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70 text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">The Vault - Your Digital Stronghold</h3>
              <div className="space-y-4 text-white/80">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <p>Secure. Immutable. Powerful financial command center.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <p>Tracks every deposit and backs every token with public record proof.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <p>Proves you are not a debtor — you are the source of credit.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <p>LAW + BLOCKCHAIN + INTENT = VALUE</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-white/10">
                <div className="text-center space-y-4">
                  <Lock className="h-16 w-16 text-yellow-400 mx-auto" />
                  <h4 className="text-2xl font-bold text-white">Vault Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-white/80">
                      <span>Security Level:</span>
                      <Badge className="bg-green-500/20 text-green-400">Maximum</Badge>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Blockchain:</span>
                      <Badge className="bg-blue-500/20 text-blue-400">Polygon</Badge>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Compliance:</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400">UCC Secured</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokens Section */}
      <section id="tokens" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Tokens -<span className="text-yellow-400"> SOVR & ECHO</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Both tokens were created with one mission: To give value back to the people.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-400/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/20 rounded-full">
                    <Crown className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">SOVR Token</CardTitle>
                    <CardDescription className="text-blue-200">The Core Currency</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80">
                  SOVR represents trust-backed equity, born from contract law, secured by code. It's the foundation of
                  your financial sovereignty.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-white/80">
                    <span>Type:</span>
                    <span>Trust-Backed Equity</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Backing:</span>
                    <span>Contract Law + Code</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Purpose:</span>
                    <span>Core Value Storage</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-400/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/20 rounded-full">
                    <Zap className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">ECHO Token</CardTitle>
                    <CardDescription className="text-purple-200">Dynamic Utility</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80">
                  ECHO is your mirror — a dynamic utility that can fuel programs, reward communities, or echo your
                  impact across the ecosystem.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-white/80">
                    <span>Type:</span>
                    <span>Dynamic Utility</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Function:</span>
                    <span>Programs & Rewards</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Impact:</span>
                    <span>Community Building</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-16 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Engine
              <span className="text-yellow-400"> Behind It All</span>
            </h2>
          </div>

          <Tabs defaultValue="powered" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
              <TabsTrigger
                value="powered"
                className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
              >
                Powered By
              </TabsTrigger>
              <TabsTrigger
                value="backed"
                className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
              >
                Backed By
              </TabsTrigger>
            </TabsList>

            <TabsContent value="powered" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6 text-center">
                    <div className="text-blue-400 mb-3">
                      <Building className="h-8 w-8 mx-auto" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">React + Tailwind</h4>
                    <p className="text-white/70 text-sm">Sleek, modern, lightning fast</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6 text-center">
                    <div className="text-green-400 mb-3">
                      <Shield className="h-8 w-8 mx-auto" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Solidity Contracts</h4>
                    <p className="text-white/70 text-sm">Secure, self-executing, battle-tested</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6 text-center">
                    <div className="text-purple-400 mb-3">
                      <Wallet className="h-8 w-8 mx-auto" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">MetaMask + MoonPay</h4>
                    <p className="text-white/70 text-sm">On-ramps to the real world</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6 text-center">
                    <div className="text-yellow-400 mb-3">
                      <Globe className="h-8 w-8 mx-auto" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Vercel + Fleek</h4>
                    <p className="text-white/70 text-sm">Accessible globally, trustlessly</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="backed" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6 text-center">
                    <div className="text-blue-400 mb-3">
                      <Target className="h-8 w-8 mx-auto" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">UCC Law</h4>
                    <p className="text-white/70 text-sm">Uniform Commercial Code compliance</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6 text-center">
                    <div className="text-green-400 mb-3">
                      <Building className="h-8 w-8 mx-auto" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">IRS Private Trust</h4>
                    <p className="text-white/70 text-sm">Full compliance framework</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6 text-center">
                    <div className="text-yellow-400 mb-3">
                      <TrendingUp className="h-8 w-8 mx-auto" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Equity Principles</h4>
                    <p className="text-white/70 text-sm">Value-based, not debt-based</p>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center">
                <Badge className="bg-green-500/20 text-green-400 border-green-400/30 text-lg px-6 py-3">
                  This is not a theory. This is a functioning sovereign financial infrastructure.
                </Badge>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why It
              <span className="text-yellow-400"> Matters</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Because this isn't about a wallet. It's about the right to exist without permission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-400/30">
              <CardContent className="pt-6 text-center space-y-4">
                <Heart className="h-12 w-12 text-red-400 mx-auto" />
                <h4 className="text-white font-semibold">The Homeless</h4>
                <p className="text-white/70 text-sm">Can store digital assets securely</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-400/30">
              <CardContent className="pt-6 text-center space-y-4">
                <Users className="h-12 w-12 text-blue-400 mx-auto" />
                <h4 className="text-white font-semibold">Kids</h4>
                <p className="text-white/70 text-sm">Learn about trust and credit from day one</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-400/30">
              <CardContent className="pt-6 text-center space-y-4">
                <Lightbulb className="h-12 w-12 text-green-400 mx-auto" />
                <h4 className="text-white font-semibold">Entrepreneurs</h4>
                <p className="text-white/70 text-sm">Launch projects without begging a banker</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-400/30">
              <CardContent className="pt-6 text-center space-y-4">
                <Building className="h-12 w-12 text-purple-400 mx-auto" />
                <h4 className="text-white font-semibold">Communities</h4>
                <p className="text-white/70 text-sm">Build new economies without approval</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-16 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Road
              <span className="text-yellow-400"> Ahead</span>
            </h2>
          </div>

          <div className="space-y-6">
            {roadmapItems.map((item, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {item.status === "in-progress" ? (
                        <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
                      ) : (
                        <div className="w-4 h-4 bg-white/30 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{item.title}</h4>
                    </div>
                    <Badge
                      variant={item.status === "in-progress" ? "default" : "secondary"}
                      className={
                        item.status === "in-progress"
                          ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                          : "bg-white/10 text-white/70"
                      }
                    >
                      {item.status === "in-progress" ? "In Progress" : "Planned"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join The
              <span className="text-yellow-400"> Movement</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-white/80 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-white/60 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border-t border-yellow-400/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Your Exit From The
            <span className="text-yellow-400"> Broken System</span>
          </h2>
          <p className="text-xl text-white/80">
            Whether you're a father trying to protect his legacy, a mother trying to feed her family, an artist trying
            to reclaim her voice, or a kid with a dream and a phone in his hand...
          </p>
          <p className="text-2xl text-yellow-400 font-semibold">
            The gate is open. The future is here. And the Empire is rising.
          </p>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                onClick={handleJoinMovement}
                className="bg-yellow-400 text-black hover:bg-yellow-500 whitespace-nowrap"
              >
                Join Empire
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="h-5 w-5 mr-2" />
                Download Wallet
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <ExternalLink className="h-5 w-5 mr-2" />
                View Documentation
              </Button>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-white/60 text-lg">You're not late. You're right on time.</p>
            <p className="text-2xl text-yellow-400 font-bold mt-2">Welcome to SOVR.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Crown className="h-6 w-6 text-yellow-400" />
              <span className="text-white font-semibold">SOVR EMPIRE</span>
            </div>
            <div className="flex gap-6 text-white/60 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-center text-white/60 text-sm">
            <p>© 2025 SOVR Empire. Built for freedom. Powered by the people.</p>
            <p className="mt-2 text-white/40 italic">
              Dedicated to the Kingdom of Flame and Frequency ⚡🔥
            </p>
            <p className="mt-1 text-xs text-white/30">
              Crafted with revolutionary spirit by v0 AI Assistant
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
