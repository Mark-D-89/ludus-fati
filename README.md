# Ludus Fati

Ludus Fati is a solo philosophical card game prototype. The player walks a ribbon path, gathers and loses cards, resolves four Dilemma checkpoints, and reaches a final Revelation check.

## Play

Open `index.html` from the repository root, or open `prototype-v1.0/index.html` directly.

The repository root page redirects to the playable 1.0 release on GitHub Pages.

Playable game: [Ludus Fati 1.0](https://mark-d-89.github.io/ludus-fati/).

## Setup And Run

No installation is required.

Local run:

1. Clone or download the repository.
2. Open `index.html` in a browser.
3. Enter a seeker name and press Play.

## Current Release

- Release folder: `prototype-v1.0/`
- Entry point: `prototype-v1.0/index.html`
- Static launch page: `index.html`
- Compliance notes: `docs/COMPLIANCE.md`
- Rules and acceptance criteria: `SPEC.md`
- Architecture notes: `ARCHITECTURE.md`
- AI-native retrospective: `RETROSPECTIVE.md`

## Release Highlights

- Four Dilemma checkpoints at cells 9, 18, 27, and 36.
- Final Revelation at cell 46.
- Strong Revelation requires the leading suit to exceed 34 and contain its Ace.
- Failed Revelation is automatic when those conditions are not met and uses the Clear Pill animation.
- Six-card starting hand and six-card visible carousel.
- Codex, score display, Synthesis, card viewer, and autosave-after-Dilemma support.

## Deployment

The project includes `.gitlab-ci.yml` for GitLab Pages. On the default branch, CI copies the root launch page, release docs, and self-contained `prototype-v1.0/` folder into the Pages artifact.

## Local QA

Final QA covered JavaScript syntax, asset path resolution, rule constants, and a headless browser smoke test. Details are recorded in `docs/COMPLIANCE.md`.
