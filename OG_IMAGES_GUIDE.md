# Open Graph (OG) Images Guide

## Current Status

The application currently uses `/assets/logo.png` as a fallback for Open Graph images. For optimal SEO and social media sharing, you should create dedicated OG images.

## Required OG Images

### 1. Main OG Image
- **Path**: `/public/assets/og-image.jpg`
- **Dimensions**: 1200x630 pixels (recommended)
- **Format**: JPG or PNG
- **Usage**: Homepage, general pages, blog posts (if no featured image)
- **Content**: Should include:
  - Laxmi Education logo
  - Tagline: "Your Gateway to International Education"
  - Visual elements representing education/study abroad

### 2. Institution OG Image
- **Path**: `/public/assets/og-institution.jpg`
- **Dimensions**: 1200x630 pixels
- **Format**: JPG or PNG
- **Usage**: Institution/Universities pages
- **Content**: Should include:
  - Laxmi Education logo
  - Text: "Top Universities & Colleges in India"
  - Visual elements representing universities/colleges

## Creating OG Images

### Option 1: Using Design Tools
1. Use tools like Canva, Figma, or Adobe Photoshop
2. Create a 1200x630px canvas
3. Add your logo, text, and branding
4. Export as JPG (optimized for web) or PNG
5. Save to `/public/assets/` directory

### Option 2: Using Online Generators
- [OG Image Generator](https://og-image.vercel.app/)
- [Social Share Preview](https://socialsharepreview.com/)

### Option 3: Programmatic Generation
You can use Next.js Image API or libraries like `@vercel/og` to generate OG images dynamically.

## Image Optimization

1. **File Size**: Keep under 200KB for faster loading
2. **Format**: JPG for photos, PNG for graphics with transparency
3. **Compression**: Use tools like TinyPNG or ImageOptim
4. **Testing**: Test your OG images using:
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## After Creating Images

Once you've created the OG images:

1. Place them in `/public/assets/` directory:
   - `og-image.jpg` (main OG image)
   - `og-institution.jpg` (institution page OG image)

2. Update the metadata files to use the new images:
   - The code is already set up to use these images
   - Currently using `/assets/logo.png` as fallback
   - Once images are added, update the references in:
     - `src/app/layout.tsx`
     - `src/app/(frontend)/layout.tsx`
     - `src/app/(frontend)/institution/layout.tsx`

3. Test the images:
   ```bash
   # After deployment, test with:
   # Facebook: https://developers.facebook.com/tools/debug/
   # Twitter: https://cards-dev.twitter.com/validator
   ```

## Current Implementation

The application automatically:
- ✅ Uses dynamic base URLs from environment variables
- ✅ Falls back to logo.png if OG images don't exist
- ✅ Includes proper Open Graph and Twitter Card metadata
- ✅ Supports custom OG images per page/section

## Notes

- OG images are cached by social media platforms
- After updating images, use the debugger tools to refresh the cache
- The images should be publicly accessible (in `/public` directory)
- Consider creating OG images for individual blog posts using featured images














