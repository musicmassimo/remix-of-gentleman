
# Replace Non-Homepage Images with Homepage Gallery Images

## What Changes

The homepage uses 10 Unsplash photos. Several other pages use local image files (`portrait.jpg`, `hero-bg.jpg`, `performance.jpg`, `video-bg.jpg`, `tour-1/2/3.jpg`) that don't appear on the homepage. This plan replaces all of those with images from the homepage gallery.

## Pages Affected

### 1. About Page (`src/pages/About.tsx`)
- Currently uses `src/assets/portrait.jpg` as the hero background
- Replace with one of the homepage gallery Unsplash URLs (e.g. the "man in suit with hands on face" image)

### 2. Tour/Calendar Page (`src/data/tourDates.ts`)
- Each tour date has a hover background image using `/assets/tour/tour-1.jpg`, `tour-2.jpg`, `tour-3.jpg`
- Replace these 3 images with 3 different homepage gallery Unsplash URLs, cycling through them

### 3. Videos Page (`src/pages/Videos.tsx`)
- Uses `video-bg.jpg`, `performance.jpg`, `hero-bg.jpg` as video thumbnails
- Replace all 3 with homepage gallery Unsplash URLs

### 4. Video Detail Page (`src/pages/VideoDetail.tsx`)
- Same 3 local images used as thumbnails
- Replace with the same homepage gallery URLs used in Videos page

## Image Assignments (from the 10 homepage gallery images)

| Usage | Current Image | Replacement (homepage gallery) |
|-------|--------------|-------------------------------|
| About hero | portrait.jpg | "Man in suit with hands on face" (photo-1766939228519) |
| Tour bg 1 | tour-1.jpg | "Young man in suit sitting against red background" (photo-1766939229108) |
| Tour bg 2 | tour-2.jpg | "Man in suit with patterned tie and rings" (photo-1766939228800) |
| Tour bg 3 | tour-3.jpg | "Man in a suit sits against a red background" (photo-1766939228746) |
| Video thumb 1 | video-bg.jpg | "Young man in suit with braided hair" (photo-1766939228418) |
| Video thumb 2 | performance.jpg | "Man with braided hair wearing a suit" (photo-1766939228501) |
| Video thumb 3 | hero-bg.jpg | "Man in suit with braids and rings reaching forward" (photo-1766939228598) |

Note: The Music and Album Detail pages already use a homepage gallery image (`photo-1766939228554`) -- no changes needed there.

## Technical Details

### Files to modify:
1. **`src/pages/About.tsx`** -- Remove `portrait.jpg` import, use Unsplash URL string directly
2. **`src/data/tourDates.ts`** -- Replace tour image paths with Unsplash URLs
3. **`src/pages/Videos.tsx`** -- Remove local image imports, use Unsplash URLs
4. **`src/pages/VideoDetail.tsx`** -- Remove local image imports, use Unsplash URLs

### Files unchanged:
- `src/pages/Index.tsx`, `src/pages/Music.tsx`, `src/pages/AlbumDetail.tsx` -- already use homepage images
- The local asset files themselves remain in the repo but will no longer be referenced
