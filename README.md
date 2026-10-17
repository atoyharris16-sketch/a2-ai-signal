# A² Studios — website

The home base for **A² Studios**, the YouTube series by DJ Redlite about combining
AI with human creativity: making music, making videos, and encoding yourself as an
avatar.

> AI brings the speed. You bring the soul.

## The site

A single-page static site (`index.html` + `styles.css` + `script.js`) covering:

- Hero with the series tagline and an animated signal-wave motif
- The 5-episode launch season (Music, Video, Avatar, Ethics, Money)
- The house rules — including the 3-second AI-labeling rule
- The four recurring segments in every episode
- About the host + YouTube link

## Run it locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Publish with GitHub Pages

1. On GitHub, open this repo → **Settings** → **Pages**
2. Under *Build and deployment*, set **Source** to **Deploy from a branch**
3. Choose the `main` branch and `/ (root)`, then **Save**

The site goes live at `https://<your-username>.github.io/a2-ai-signal/`.

## House rule (the site's, and the series')

If a viewer couldn't tell something is AI in 3 seconds, it isn't labeled enough.
