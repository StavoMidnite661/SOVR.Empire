"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Wallet, Globe, Download, ExternalLink, Server, Zap } from "lucide-react"
import SOVRWallet from "../components/sovr-wallet"
import SOVREmpireLanding from "../components/sovr-empire-landing"
import ZipInstaller from "../zip-installer"

export default function Page() {
  const [activeView, setActiveView] = useState("landing")

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <div className="flex items-center space-x-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              <span className="font-bold">SOVR EMPIRE</span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="flex items-center space-x-2">
                <Button
                  variant={activeView === "landing" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("landing")}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Landing
                </Button>
                <Button
                  variant={activeView === "wallet" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("wallet")}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Wallet
                </Button>
                <Button
                  variant={activeView === "installer" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("installer")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Installer
                </Button>
                <Button
                  variant={activeView === "system" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("system")}
                >
                  <Server className="h-4 w-4 mr-2" />
                  System
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto">
        {activeView === "landing" && <SOVREmpireLanding />}
        {activeView === "wallet" && <SOVRWallet />}
        {activeView === "installer" && <ZipInstaller />}
        {activeView === "system" && <SystemOverview />}
      </main>
    </div>
  )
}

function SystemOverview() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">SOVR System Architecture</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete production-ready infrastructure for the SOVR Wallet + ECHO Vault System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Frontend Components */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-500" />
              Frontend Components
            </CardTitle>
            <CardDescription>React/Next.js Interface</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge variant="outline">SOVR Wallet Interface</Badge>
            <Badge variant="outline">Empire Landing Page</Badge>
            <Badge variant="outline">ZIP Installer</Badge>
            <Badge variant="outline">Admin Dashboard</Badge>
            <Badge variant="outline">Analytics Components</Badge>
          </CardContent>
        </Card>

        {/* Backend Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-green-500" />
              Backend Services
            </CardTitle>
            <CardDescription>Node.js/Express API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge variant="outline">Webhook System</Badge>
            <Badge variant="outline">Payout Engine</Badge>
            <Badge variant="outline">Vault Engine</Badge>
            <Badge variant="outline">Payment Services</Badge>
            <Badge variant="outline">Audit Trail</Badge>
          </CardContent>
        </Card>

        {/* Smart Contracts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              Smart Contracts
            </CardTitle>
            <CardDescription>Solidity/Polygon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge variant="outline">SOVR Token Contract</Badge>
            <Badge variant="outline">ECHO Token Contract</Badge>
            <Badge variant="outline">Vault Contract</Badge>
            <Badge variant="outline">Trust Authority</Badge>
            <Badge variant="outline">UCC Compliance</Badge>
          </CardContent>
        </Card>

        {/* Documentation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-orange-500" />
              Documentation
            </CardTitle>
            <CardDescription>Complete Guides</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge variant="outline">API Documentation</Badge>
            <Badge variant="outline">Security Guide</Badge>
            <Badge variant="outline">Legal Compliance</Badge>
            <Badge variant="outline">Deployment Guide</Badge>
            <Badge variant="outline">Smart Contract Docs</Badge>
          </CardContent>
        </Card>

        {/* Payment Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              Payment Rails
            </CardTitle>
            <CardDescription>Multi-Platform Support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge variant="outline">Zelle Integration</Badge>
            <Badge variant="outline">Cash App Service</Badge>
            <Badge variant="outline">Venmo Service</Badge>
            <Badge variant="outline">Coinbase CDP</Badge>
            <Badge variant="outline">On-Chain Transfers</Badge>
          </CardContent>
        </Card>

        {/* Security & Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-red-500" />
              Security & Legal
            </CardTitle>
            <CardDescription>Enterprise Grade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge variant="outline">Bank-Level Security</Badge>
            <Badge variant="outline">UCC Article 9</Badge>
            <Badge variant="outline">AML/KYC Compliance</Badge>
            <Badge variant="outline">Audit Trails</Badge>
            <Badge variant="outline">Trust Law Framework</Badge>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Production readiness checklist</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Frontend Components</span>
                <Badge className="bg-green-500/20 text-green-700">✅ Complete</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Backend Services</span>
                <Badge className="bg-green-500/20 text-green-700">✅ Complete</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Smart Contracts</span>
                <Badge className="bg-green-500/20 text-green-700">✅ Complete</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Documentation</span>
                <Badge className="bg-green-500/20 text-green-700">✅ Complete</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Security Implementation</span>
                <Badge className="bg-green-500/20 text-green-700">✅ Complete</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Legal Compliance</span>
                <Badge className="bg-green-500/20 text-green-700">✅ Complete</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment Integrations</span>
                <Badge className="bg-green-500/20 text-green-700">✅ Complete</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Production Ready</span>
                <Badge className="bg-green-500/20 text-green-700">✅ Ready</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-5 w-5 mr-2" />
          Download Complete System
        </Button>
        <Button variant="outline" size="lg">
          <ExternalLink className="h-5 w-5 mr-2" />
          View Documentation
        </Button>
        <Button variant="outline" size="lg">
          <Server className="h-5 w-5 mr-2" />
          Deploy to Production
        </Button>
      </div>
    </div>
  )
}
