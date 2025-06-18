# SOVR Empire - Security Best Practices

## 🔐 Environment Variable Security

### ⚠️ CRITICAL: Never Expose API Keys Client-Side

**WRONG** ❌
\`\`\`env
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key  # NEVER DO THIS!
NEXT_PUBLIC_CDP_API_KEY=your_key      # EXPOSED TO BROWSER!
\`\`\`

**CORRECT** ✅
\`\`\`env
# Client-side (safe to expose)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_COINBASE_APP_ID=your_app_id
NEXT_PUBLIC_SOVR_CONTRACT_ADDRESS=0x...

# Server-side only (keep private)
ALCHEMY_API_KEY=your_alchemy_key
CDP_API_KEY=your_cdp_key
VAULT_PRIVATE_KEY=your_private_key
\`\`\`

## 🛡️ Frontend Security Guidelines

### Environment Variables
- **NEXT_PUBLIC_** prefix exposes variables to the browser
- Only use for non-sensitive configuration (contract addresses, app IDs)
- Keep all API keys, private keys, and secrets server-side only

### API Key Management
\`\`\`typescript
// ❌ WRONG - Exposes API key to client
const provider = new ethers.providers.AlchemyProvider('polygon', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)

// ✅ CORRECT - Use server-side API route
const response = await fetch('/api/blockchain/provider')
const data = await response.json()
\`\`\`

### Server-Side API Routes
Create API routes for sensitive operations:

\`\`\`typescript
// pages/api/blockchain/provider.ts
import { ethers } from 'ethers'

export default function handler(req, res) {
  // API key is safely server-side
  const provider = new ethers.providers.AlchemyProvider('polygon', process.env.ALCHEMY_API_KEY)
  // Return only necessary data
  res.json({ networkName: 'polygon', blockNumber: await provider.getBlockNumber() })
}
\`\`\`

## 🔒 Production Deployment Security

### Vercel Environment Variables
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add server-side variables (without NEXT_PUBLIC_ prefix)
3. Set appropriate environment (Production, Preview, Development)

### Railway/Heroku Backend
\`\`\`bash
# Set environment variables securely
railway variables set ALCHEMY_API_KEY=your_key
railway variables set CDP_API_KEY=your_key
railway variables set VAULT_PRIVATE_KEY=your_key

# Or for Heroku
heroku config:set ALCHEMY_API_KEY=your_key
heroku config:set CDP_API_KEY=your_key
\`\`\`

## 🚨 Security Checklist

### Before Deployment
- [ ] No API keys in client-side code
- [ ] No private keys in environment files
- [ ] All sensitive operations server-side
- [ ] Environment variables properly scoped
- [ ] Secrets stored in secure vaults

### Code Review
- [ ] Search for "NEXT_PUBLIC_.*API" patterns
- [ ] Verify no hardcoded credentials
- [ ] Check all fetch calls use relative URLs
- [ ] Ensure proper error handling

### Monitoring
- [ ] Set up secret scanning
- [ ] Monitor for exposed credentials
- [ ] Regular security audits
- [ ] Automated vulnerability scanning

## 🛠️ Implementation Examples

### Secure Blockchain Integration
\`\`\`typescript
// components/wallet-provider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const WalletContext = createContext(null)

export function WalletProvider({ children }) {
  const [provider, setProvider] = useState(null)
  
  useEffect(() => {
    // Use server-side API for provider initialization
    fetch('/api/blockchain/init')
      .then(res => res.json())
      .then(data => {
        // Initialize with safe configuration
        setProvider(data.providerConfig)
      })
  }, [])
  
  return (
    <WalletContext.Provider value={{ provider }}>
      {children}
    </WalletContext.Provider>
  )
}
\`\`\`

### Secure API Routes
\`\`\`typescript
// app/api/blockchain/init/route.ts
import { NextResponse } from 'next/server'
import { ethers } from 'ethers'

export async function GET() {
  try {
    // Server-side provider with secure API key
    const provider = new ethers.providers.AlchemyProvider(
      'polygon', 
      process.env.ALCHEMY_API_KEY // Server-side only
    )
    
    // Return only safe configuration
    return NextResponse.json({
      providerConfig: {
        network: 'polygon',
        chainId: 137,
        rpcUrl: 'https://polygon-rpc.com' // Public RPC for client
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to initialize' }, { status: 500 })
  }
}
\`\`\`

## 📋 Environment Variable Reference

### Safe for Client (NEXT_PUBLIC_)
\`\`\`env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_COINBASE_APP_ID=your_app_id
NEXT_PUBLIC_SOVR_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ECHO_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_NETWORK_NAME=polygon
NEXT_PUBLIC_CHAIN_ID=137
\`\`\`

### Server-Side Only (NO PREFIX)
\`\`\`env
ALCHEMY_API_KEY=your_alchemy_key
CDP_API_KEY=your_cdp_key
CDP_API_SECRET=your_cdp_secret
VAULT_PRIVATE_KEY=your_vault_private_key
ONCHAIN_PRIVATE_KEY=your_onchain_private_key
ZELLE_API_KEY=your_zelle_key
CASHAPP_API_KEY=your_cashapp_key
VENMO_API_KEY=your_venmo_key
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
\`\`\`

## 🎯 Key Takeaways

1. **Never expose API keys client-side** - Use server-side API routes
2. **NEXT_PUBLIC_ = Browser Visible** - Only for non-sensitive config
3. **Server-side operations** - Keep sensitive logic on the server
4. **Environment separation** - Different keys for dev/staging/prod
5. **Regular audits** - Monitor and scan for exposed secrets

Following these practices ensures your SOVR Empire remains secure and production-ready! 🏛️🔒
