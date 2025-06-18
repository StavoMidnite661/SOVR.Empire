# 🚀 SOVR Empire Deployment Guide

## Quick Deploy to Vercel

### 1. Prepare Your Project
\`\`\`bash
# Ensure all dependencies are installed
npm install

# Test build locally
npm run build
\`\`\`

### 2. Deploy to Vercel
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
\`\`\`

### 3. Configure Environment Variables

In your Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add these variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_id
NEXT_PUBLIC_COINBASE_APP_ID=your_coinbase_app_id
\`\`\`

### 4. Set Up Supabase Database

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run this SQL in the SQL editor:

\`\`\`sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create demo table for testing
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  amount DECIMAL(18,8) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  vendor TEXT DEFAULT 'Demo Vendor',
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert demo data
INSERT INTO public.transactions (amount, currency, vendor, status)
VALUES 
  (42.00, 'USD', 'Manny''s Tacos', 'completed'),
  (15.50, 'USD', 'Coffee Shop', 'completed'),
  (100.00, 'USD', 'Gas Station', 'completed');
\`\`\`

## Alternative Deployment Options

### Railway
\`\`\`bash
npm install -g @railway/cli
railway login
railway link
railway up
\`\`\`

### Netlify
\`\`\`bash
npm install -g netlify-cli
netlify deploy --prod
\`\`\`

## 🎉 You're Live!

Your SOVR Empire is now deployed and ready to revolutionize finance! 🏛️

Visit your deployed URL and start the financial revolution! 🚀
