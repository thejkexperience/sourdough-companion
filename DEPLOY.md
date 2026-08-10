# Publishing Sourdough Companion online

This folder is a ready-to-host website — `index.html`, `manifest.json`, a service worker (`sw.js`), and the app icons. No build step needed; any static host will run it as-is.

Once it's live at a URL, open that URL on your phone and use "Add to Home Screen" (Safari) or "Install app" (Chrome/Android) to get a full-screen, offline-capable app icon — no App Store required.

## Option 1: Netlify Drop (easiest, free, ~2 minutes)

1. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)**.
2. Drag the `sourdough-companion-site.zip` file (or the whole `sourdough-site` folder) straight onto the page.
3. Netlify builds it and gives you a live URL immediately — something like `random-name-123.netlify.app`.
4. **Claim the site**: click "Claim your site" and sign up free (email or GitHub). This removes the temporary password lock and gives you a permanent URL you control. You can rename the subdomain or attach your own domain later, for free, from the site settings.

That's it — the URL works from any device, and your bake logs/recipes will be stored locally on whichever device you're using it from (a phone and a laptop won't automatically share data — use the Export/Import backup in the app's Settings to move data between them).

## Option 2: GitHub Pages (if you already use GitHub)

1. Create a new repository (e.g. `sourdough-companion`).
2. Upload all the files in this folder, keeping the `icons/` folder structure intact.
3. In the repo, go to **Settings → Pages**, set the source to the `main` branch (root), and save.
4. GitHub gives you a URL like `yourusername.github.io/sourdough-companion` within a minute or two.

## Option 3: Vercel

1. Go to **[vercel.com](https://vercel.com)**, sign up free.
2. Use "Add New → Project" and drag in this folder, or connect a GitHub repo with these files.
3. Deploy — you'll get a URL like `sourdough-companion.vercel.app`.

## A note on your data

This app has no backend or database — every bake log, recipe, and photo is saved in the browser's local storage on the device you're using it on. Hosting it online just gives you (and anyone you share the link with) a stable place to open the app from; it doesn't sync data between devices by itself. Use **Settings → Export backup** in the app periodically, and **Import backup** on another device, to move your data over or keep a safety copy.

If down the road you want real cross-device sync (open on your phone, see the same data on your laptop automatically), that requires adding a real backend with a database and accounts — a bigger project, and worth a separate conversation if you want to go there.
