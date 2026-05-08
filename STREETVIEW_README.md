# Google Maps Street View Integration

## Setup Instructions

1. **Get a Google Maps API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the following APIs:
     - Maps JavaScript API
     - Street View Static API (optional)
   - Create credentials (API Key)
   - Optionally restrict the API key to your domain for security

2. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`
   - Add your API key: `REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here`

3. **Restart the Development Server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Features

- **Regional Street View:** Click on any region in the map to view Street View imagery
- **Privacy Protection:** Only shows public street-level imagery, no specific incident locations
- **Multi-language Support:** All UI text is translated (English, French, Arabic)
- **Fallback Handling:** Gracefully handles cases where Street View is unavailable
- **Educational Purpose:** Designed for regional awareness and educational use only

## Important Notes

- **API Costs:** Google Maps API has usage costs. Monitor your usage in Google Cloud Console
- **Privacy:** This feature shows general street-level imagery for regional awareness only
- **Availability:** Street View coverage varies by location and may not be available everywhere
- **Legal Compliance:** Ensure compliance with local laws regarding location data and imagery

## Usage

1. Navigate to the Map View in the Authority dashboard
2. Click on any region to view its details
3. Click the "View Street View" button to open the Street View modal
4. Use the Street View controls to navigate and explore the area
5. The mini-map shows the regional overview with markers