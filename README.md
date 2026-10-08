# Pat and Sons website

Plain HTML, CSS and JavaScript. No build step, no frameworks. It works on GitHub Pages as it is.

## Put it online (GitHub Pages)
1. On GitHub, create a new repository, for example `pat-and-sons`.
2. Upload everything in this folder. Keep the folders `css`, `js`, `images` and `icons`, and the `.nojekyll` file.
3. Go to Settings > Pages. Under "Build and deployment" choose "Deploy from a branch", pick `main` and `/ (root)`, then Save.
4. After about a minute the site is live at `https://YOUR-USERNAME.github.io/pat-and-sons/`.

## The one file you edit: `js/data.js`
- `CONFIG`: your WhatsApp number (for example `"27712345678"`), phone, and trading hours. When the WhatsApp number is filled in, customers can send their basket straight to you. Fill in `openDays`, `openHour` and `closeHour` to show an "Open now" badge.
- `MENU`: names, prices and descriptions. Change a price here and it updates in the menu and in the order total.
- `GALLERY`: the 46 photos. Files live in `images/thumb` (small) and `images/full` (large).

## What the site does
- Menu with budget filter and an order basket (saved on the phone). The basket sends a ready-made WhatsApp message.
- Photo gallery with tabs, "show more", full-screen viewer, swipe and arrow keys.
- Light and dark mode button, share button, scroll animations, and offline support after the first visit.
- The "What should we make next?" vote is saved only in each visitor's own browser. It does not send votes to you yet.

## Tips
- After you change files, a phone that visited before may show the old version once. Open the page again to refresh. If it sticks, change `V = "pat-v1"` in `sw.js` to `"pat-v2"`.
- To show a picture when the link is shared, add an `og:image` line in `index.html` with the full address of an image, for example `https://YOUR-USERNAME.github.io/pat-and-sons/images/menu/hero.jpg`.
