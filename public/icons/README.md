# PWA Icons

This directory contains the Progressive Web App icons for TradeHub.

## Required Icons

Generate the following icon sizes from your logo:

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## How to Generate Icons

You can use online tools like:
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator
- https://favicon.io/

Or use ImageMagick:
```bash
convert logo.png -resize 192x192 icon-192x192.png
convert logo.png -resize 512x512 icon-512x512.png
# ... repeat for other sizes
```

## Design Guidelines

- Use a simple, recognizable logo
- Ensure good contrast for visibility
- Test on both light and dark backgrounds
- Make it work at small sizes (72x72)
- Use PNG format with transparency if needed
- Primary color: #3b82f6 (blue)
- Background: white or transparent
