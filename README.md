# A Gift from Gotham - Batman Thank You Website

A cinematic, interactive, Gotham-inspired thank-you page built with HTML5, CSS3, and Vanilla JavaScript. Designed to express appreciation for a thoughtful Batman LEGO collectibles gift.

The website has a responsive dark-themed design reminiscent of Gotham City at night, complete with animated skyline layers, moving searchlights, interactive rain with splash particles, a flickering Bat-Signal projection, ambient lightning flashes, and keyboard easter eggs.

## File Structure

The project has the following minimal structure, optimized for fast loading and direct execution:

```text
PothefattyPand.github.io/
│
├── index.html   # Main structure & inline SVGs
├── styles.css   # Custom styling, fonts, layouts & keyframe animations
├── script.js    # Rain system, Signal state controller & Easter Egg logic
└── README.md    # Documentation & deployment commands
```

## Customization

### How to Change the Friend's Name
Open `script.js` and modify the `friendName` property inside the configuration object at the top of the file:
```javascript
const siteConfig = {
  friendName: "Bruce", // Change this to your friend's name (e.g. "Selina", "Alfred", etc.)
  ...
};
```
The script will automatically update all instances of the friend's name across the entire page (including the signature, signal text sequence, and final climax greeting).

### How to Change the Signal Messages
You can customize the texts projected inside the Bat-Signal spotlight. Modify the `signalMessages` array in `script.js`:
```javascript
const siteConfig = {
  ...
  signalMessages: [
    "THANK YOU",
    "FOR THE GIFT",
    "FOR THE MEMORY",
    "FOR THE FRIENDSHIP"
  ]
};
```
These strings will be projected letter-by-letter in sequence when the spotlight is activated.

## How to Test Locally
No installation steps or build servers are required. Since the project uses pure vanilla assets, you can run it by:
1. Double-clicking `index.html` to open it directly in any modern browser.
2. Alternatively, using a local server extension such as Live Server in VS Code, or python's default server:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

## Deployment to GitHub Pages

To host this website on GitHub Pages under the repository `PothefattyPand.github.io`, follow these command steps:

```bash
# Configure global git options
git config --global user.name "PothefattyPand"
git config --global user.email "wanman8502@gmail.com"

# Initialize repository and commit files
git init
git add .
git commit -m "Create dynamic Batman thank-you website"

# Rename branch to main
git branch -M main

# Add target GitHub remote repository
git remote add origin https://github.com/PothefattyPand/PothefattyPand.github.io.git

# Push changes to GitHub
git push -u origin main
```

Once pushed to the `main` branch of your `PothefattyPand.github.io` repository, GitHub Pages will automatically compile and deploy your thank-you site at `https://pothefattypand.github.io/`.
