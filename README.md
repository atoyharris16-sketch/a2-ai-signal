# A² Studios — website

The home base for **A² Studios**, a San Diego creative house building worlds,
developing artists, and creating timeless IP across music, film, AI, and culture.

> We build worlds, develop artists & create timeless IP.

## The site

A single-page static site (`index.html` + `styles.css` + `script.js`) covering:

- Hero with the studio tagline and an animated signal-wave motif
- The artist roster: **Kario Voss** and **Velvet Blade**, with tap-to-play
  tracklists (15 tracks) and artist artwork
- A short-films section (in production — placeholders for upcoming drops)
- The 5-episode YouTube launch season (Music, Video, Avatar, Ethics, Money)
- The house rules — including the 3-second AI-labeling rule
- About the studio + YouTube link

## Media

Audio and images are stored as base64 text (`.b64`) because the uploader only
accepts text files. `script.js` decodes them into blob URLs at runtime:

- `audio/*.mp3.b64` — 160kbps MP3s, decoded lazily when a track is played
- `images/*.jpg.b64` — compressed artwork, decoded on page load

Source WAVs live in `audio-src/` (local only, not pushed).

## Run it locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

Note: `file://` works for layout, but the fetch-based media loader needs
`http://` (use the command above).

## Publish with GitHub Pages

1. On GitHub, open this repo → **Settings** → **Pages**
2. Under *Build and deployment*, set **Source** to **Deploy from a branch**
3. Choose the `main` branch and `/ (root)`, then **Save**

The site goes live at `https://<your-username>.github.io/a2-ai-signal/`.

## House rule (the site's, and the series')

If a viewer couldn't tell something is AI in 3 seconds, it isn't labeled enough.
