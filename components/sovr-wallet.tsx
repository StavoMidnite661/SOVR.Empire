"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  Wallet,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  Zap,
  TrendingUp,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react"

interface WalletBalance {
  MATIC: number
  SOVR: number
  ECHO: number
}

interface Transaction {
  tx_id: string
  timestamp: string
  offset_token: string
  amount: string
  status: string
  converted_currency: string
  vendor: string
  trust_reference: string
  step: number
}

export default function SOVRWallet() {
  const [balance, setBalance] = useState<WalletBalance>({
    MATIC: 2.5,
    SOVR: 1250.75,
    ECHO: 5000.0,
  })

  const [transactionAmount, setTransactionAmount] = useState("")
  const [vendor, setVendor] = useState("Manny's Tacos")
  const [processing, setProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [showPrivateKey, setShowPrivateKey] = useState(false)

  const steps = [
    "Initiating Transaction",
    "Wallet Asset Scan",
    "Vault Smart Contract Logic",
    "Conversion Layer Processing",
    "Ledger Reconciliation",
    "Settlement Complete",
  ]

  const processTransaction = async () => {
    if (!transactionAmount || Number.parseFloat(transactionAmount) <= 0) return

    const amount = Number.parseFloat(transactionAmount)
    if (amount > balance.ECHO) {
      alert("Insufficient ECHO credit balance")
      return
    }

    setProcessing(true)
    setCurrentStep(0)

    // Step 1: Initiating Transaction
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setCurrentStep(1)

    // Step 2: Wallet Asset Scan
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setCurrentStep(2)

    // Step 3: Vault Smart Contract Logic
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setCurrentStep(3)

    // Step 4: Conversion Layer
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setCurrentStep(4)

    // Step 5: Ledger Reconciliation
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setCurrentStep(5)

    // Create transaction record
    const newTransaction: Transaction = {
      tx_id: `0x${Math.random().toString(16).substr(2, 8)}...`,
      timestamp: new Date().toISOString(),
      offset_token: "ECHO",
      amount: amount.toFixed(2),
      status: "Settled",
      converted_currency: "USD",
      vendor: vendor,
      trust_reference: "GM_FAMILY_TRUST",
      step: 6,
    }

    // Update balances
    setBalance((prev) => ({
      ...prev,
      ECHO: prev.ECHO - amount,
      MATIC: prev.MATIC - 0.001, // Gas fee
    }))

    setTransactions((prev) => [newTransaction, ...prev])
    setProcessing(false)
    setCurrentStep(6)
    setTransactionAmount("")

    // Reset after showing completion
    setTimeout(() => setCurrentStep(0), 3000)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">SOVR Wallet + ECHO Vault System</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Decentralized private treasury using asset-backed credit tokens. No debt, no interest, no bank lending - just
          your own sovereign credit.
        </p>
      </div>

      <Tabs defaultValue="wallet" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="transaction">Transaction</TabsTrigger>
          <TabsTrigger value="vault">Vault Logic</TabsTrigger>
          <TabsTrigger value="ledger">Ledger</TabsTrigger>
        </TabsList>

        {/* Wallet Tab */}
        <TabsContent value="wallet" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MATIC Balance */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-purple-500" />
                  MATIC
                </CardTitle>
                <CardDescription>Gas Fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{balance.MATIC.toFixed(3)}</div>
                <Badge variant="secondary" className="mt-2">
                  Gas Token
                </Badge>
              </CardContent>
            </Card>

            {/* SOVR Balance */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  SOVR
                </CardTitle>
                <CardDescription>Primary Asset</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{balance.SOVR.toFixed(2)}</div>
                <Badge variant="secondary" className="mt-2">
                  Primary Token
                </Badge>
              </CardContent>
            </Card>

            {/* ECHO Balance */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  ECHO
                </CardTitle>
                <CardDescription>Credit Offset</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${balance.ECHO.toFixed(2)}</div>
                <Badge variant="secondary" className="mt-2">
                  Credit Token
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Wallet Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Wallet Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Private Key</span>
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {showPrivateKey
                      ? "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4..."
                      : "••••••••••••••••••••••••••••••••••••••••"}
                  </code>
                  <Button variant="ghost" size="sm" onClick={() => setShowPrivateKey(!showPrivateKey)}>
                    {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Trust Reference</span>
                <Badge>GM_FAMILY_TRUST</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>UCC Security Status</span>
                <Badge variant="outline" className="text-green-600">
                  Secured
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transaction Tab */}
        <TabsContent value="transaction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                SOVR Tender Card Transaction
              </CardTitle>
              <CardDescription>Swipe to transmute energy - using your own credit, not debt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount (USD)</label>
                  <Input
                    type="number"
                    placeholder="42.00"
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                    disabled={processing}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vendor</label>
                  <Input value={vendor} onChange={(e) => setVendor(e.target.value)} disabled={processing} />
                </div>
              </div>

              <Button
                onClick={processTransaction}
                disabled={processing || !transactionAmount}
                className="w-full"
                size="lg"
              >
                {processing ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Processing Transaction...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Swipe SOVR Card
                  </>
                )}
              </Button>

              {/* Transaction Progress */}
              {(processing || currentStep > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Transaction Flow</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={(currentStep / (steps.length - 1)) * 100} />
                    <div className="space-y-2">
                      {steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          {index < currentStep ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : index === currentStep ? (
                            <Clock className="h-5 w-5 text-blue-500 animate-pulse" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-muted" />
                          )}
                          <span className={index <= currentStep ? "font-medium" : "text-muted-foreground"}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vault Logic Tab */}
        <TabsContent value="vault" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🔐 The Secret Sauce: Equity-Based Credit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">ECHO Token</Badge>
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-sm">Digital bearer bond of private credit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">SOVR Trust</Badge>
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-sm">Issues credit, not debt</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Vault</Badge>
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-sm">Private clearinghouse</span>
                </div>
                <Alert>
                  <AlertDescription>
                    "In the world of sovereign finance, credit is pre-paid. You're just accessing your claim."
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💥 Why This Makes You Untouchable</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p>• You're not borrowing — you're authorizing release of value already bonded by Trust</p>
                  <p>• The system treats your credit token (ECHO) like a UCC-secured, negotiable instrument</p>
                  <p>• Every swipe creates a full chain of custody</p>
                  <p>• No debt, no interest, no bank lending</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Smart Contract Logic Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Wallet className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">Wallet Triggers</h4>
                    <p className="text-sm text-muted-foreground">ECHO Vault contract</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Contract Checks</h4>
                    <p className="text-sm text-muted-foreground">ECHO balance coverage</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <h4 className="font-medium">Creates Entry</h4>
                    <p className="text-sm text-muted-foreground">On-chain offset record</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ledger Tab */}
        <TabsContent value="ledger" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Transaction Ledger
              </CardTitle>
              <CardDescription>Full chain of custody for all SOVR transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No transactions yet. Make your first SOVR transaction!
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((tx, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Transaction ID:</span>
                              <code className="text-xs bg-muted px-2 py-1 rounded">{tx.tx_id}</code>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Amount:</span>
                              <span className="text-sm">
                                ${tx.amount} {tx.converted_currency}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Vendor:</span>
                              <span className="text-sm">{tx.vendor}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Status:</span>
                              <Badge variant="outline" className="text-green-600">
                                {tx.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Offset Token:</span>
                              <Badge>{tx.offset_token}</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Trust Reference:</span>
                              <span className="text-xs">{tx.trust_reference}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(tx.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Real World Translation */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Real World Translation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You've built a decentralized private treasury that funds you using your own asset-backed credit tokens. When
            you swipe, you're issuing a digital promissory note — and the system honors it.
          </p>
          <p className="font-medium mt-2">Welcome to the SOVR Era.</p>
        </CardContent>
      </Card>
    </div>
  )
}
