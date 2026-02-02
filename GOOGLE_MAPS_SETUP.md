# Google Maps API Setup

## Quick Start

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create/Select Project**
   - Click "Select a project" → "New Project"
   - Name it "Gearmobile" → Create

3. **Enable Maps JavaScript API**
   - Go to: https://console.cloud.google.com/apis/library
   - Search for "Maps JavaScript API"
   - Click it → Enable

4. **Create API Key**
   - Go to: https://console.cloud.google.com/apis/credentials
   - Click "Create Credentials" → "API Key"
   - Copy the key

5. **Add to .env.local**
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...your_key_here
   ```

6. **Restart Dev Server**
   ```bash
   npm run dev -- --turbo
   ```

7. **Test**
   - Go to: http://localhost:3000/listings
   - You should see an interactive Google Map!

---

## Features Now Active

✅ **Real Google Maps** with street view, satellite, terrain  
✅ **Interactive markers** for each tool location  
✅ **Info windows** with tool details on click  
✅ **Zoom & pan** controls  
✅ **Proximity search** (can add distance calculation)  

---

## Optional Enhancements

### Restrict API Key (Security)
In Google Cloud Console:
1. Go to API Key settings
2. Add "Application restrictions" → HTTP referrers
3. Add: `http://localhost:3000/*` and `yourdomain.com/*`
4. Add "API restrictions" → Restrict key to Maps JavaScript API

### Enable Additional APIs
For full functionality, also enable:
- **Geocoding API** - Convert addresses to coordinates
- **Places API** - Search/autocomplete locations
- **Directions API** - Show routes to tool pickup

---

## Cost

Google Maps offers **$200 free credits/month**:
- ~28,000 map loads free per month
- More than enough for development & small-scale launch

---

## Troubleshooting

**Map not loading?**
- Check browser console for errors
- Verify API key is correct in `.env.local`
- Make sure you enabled Maps JavaScript API
- Restart dev server after adding key

**"For development purposes only" watermark?**
- Normal without billing enabled
- Add billing account in Google Cloud to remove
