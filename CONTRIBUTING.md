# Contributing to Awesome Wordle Games

Thanks for helping keep this list useful, accurate, and up to date.

## What Belongs Here?

Good candidates are:

- Wordle variants with different rules, word lengths, grids, or themes.
- Daily or unlimited browser games inspired by Wordle's guessing and deduction loop.
- Geography, film, music, sports, math, color, or language variants that offer a comparable puzzle experience.
- Related daily **word** puzzles that fit the separate `related` section.

Please submit games with a working, directly playable browser URL. The core experience should be accessible without mandatory registration.

We generally do **not** include answer/cheat pages, generic news articles, referral landing pages, gambling sites, abandoned projects, misleading copies of another game's branding, or link collections with no playable game.

## Add a Game

1. Check [README.md](README.md) and [games.json](games.json) to make sure the game is not already listed.
2. Visit the proposed URL and confirm that it still hosts the intended game.
3. Add one object to the `games` array in `games.json`.
4. Add the same game to the matching section in `README.md`, using a short, original one-sentence description.
5. Run `node scripts/validate.mjs` if you have Node.js installed.
6. Open a pull request explaining what makes the game relevant.

Example:

```json
{
  "id": "example-word-game",
  "name": "Example Word Game",
  "url": "https://example.org/",
  "category": "classic",
  "description": "Guess a hidden word using colored letter feedback.",
  "modes": ["daily"],
  "language": "en"
}
```

Use `https://` URLs, remove tracking parameters, and link to the actual game or its official publisher rather than a third-party answer page. Use a stable, lowercase, hyphen-separated `id`.

### Fields

| Field | Meaning |
| --- | --- |
| `id` | Unique, stable lowercase slug |
| `name` | Display name used by the game |
| `url` | Canonical playable URL |
| `category` | An existing ID from `categories` in `games.json` |
| `description` | One original, factual sentence (no marketing claims) |
| `modes` | Known modes: `daily`, `unlimited`, `practice`; use `[]` if uncertain |
| `language` | BCP 47 language code such as `en`, `es`, or `pt-BR`; `multilingual` when appropriate |

## Fix a Link or Description

A broken-link report is just as valuable as a new entry. Please include:

- The game name and existing URL.
- What happens now (dead page, redirect, parked domain, unrelated content, or a rule change).
- A replacement **official** URL, if you found one.

If a former game URL now points to unrelated or unsafe content, remove it instead of keeping the link for historical reasons.

## Editorial Guidelines

- Prefer the original developer or current publisher's site.
- Keep descriptions concise and neutral, written in your own words.
- Separate strict Wordle mechanics from loosely related daily puzzles.
- Do not include spoilers or daily solutions.
- Do not paste other directories' copyrighted descriptions or large chunks of their README files.
- Avoid duplicates, URL shorteners, and unnecessary UTM or affiliate parameters.
- Disclose any relationship you have with a game you're submitting; it may still be listed if it fits.

## Questions?

[Open an issue](https://github.com/buainoai/awesome-wordle-games/issues) to suggest a category, report an outdated game, or ask about the list.
