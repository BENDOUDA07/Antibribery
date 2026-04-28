# Anti-Bribery Reclamation Platform - Setup Guide

## Prerequisites
- Node.js 18+ 
- pnpm (or npm)
- Git

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Ybourmaya/Anti-Bribery-app.git
cd Anti-Bribery-app
```

2. **Install dependencies:**
```bash
pnpm install
# or
npm install
```

3. **Start development server:**
```bash
pnpm dev
# or
npm run dev
```

4. **Open browser:**
Navigate to `http://localhost:5173`

## Google Maps Configuration

To enable the interactive Morocco map:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Open `src/app/components/AuthorityDashboard.tsx`
3. Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key on line 449

## Project Structure

```
src/
├── app/
│   ├── App.tsx                    # Main app with routing
│   ├── components/
│   │   ├── LoginPage.tsx          # Login & OTP authentication
│   │   ├── CitizenDashboard.tsx   # Citizen interface
│   │   ├── AuthorityDashboard.tsx # Authority dashboard
│   │   ├── ReportIncident.tsx     # Multi-step report form
│   │   ├── RegionalReports.tsx    # Regional analytics
│   │   ├── ReportResults.tsx      # Data visualization
│   │   ├── ScheduleReport.tsx     # Automated reporting
│   │   └── ui/                    # Reusable UI components
│   └── ...
├── styles/
│   ├── theme.css                  # Design system tokens
│   └── fonts.css                  # Inter font
└── ...
```

## Features

✅ Bilingual support (Arabic/French)
✅ Two-step OTP authentication  
✅ Citizen anonymous reporting
✅ Authority dashboard with metrics
✅ Interactive Morocco regional map
✅ Case management & tracking
✅ Report scheduling & analytics
✅ Responsive design

## Tech Stack

- React 18 + TypeScript
- React Router for navigation
- Tailwind CSS v4 for styling
- Recharts for data visualization
- Google Maps for regional mapping
- Sonner for toast notifications

## Design System

- Primary: #1a3a5c (Dark Navy Blue)
- Warning/Pending: #EF9F27 (Amber)
- Success/Resolved: #639922 (Green)
- High-Risk/Flagged: #E24B4A (Red)
- Font: Inter

## Notes

⚠️ **This is a demo/POC platform** - not intended for production use with real citizen data or PII.

For production deployment with real government data, you would need:
- Secure government-grade infrastructure
- Compliance with Morocco's data protection laws
- End-to-end encryption
- Comprehensive audit logging
- Enterprise-level authentication
