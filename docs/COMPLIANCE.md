# Compliance Review

## Scope

This review covers `prototype-v1.0/`, the 1.0 release snapshot of Ludus Fati.

## Verified Locally

- The game is a static browser prototype and opens from `prototype-v1.0/index.html`.
- Root `index.html` redirects to `prototype-v1.0/` for URL-based launch.
- JavaScript syntax passes with the bundled Node runtime.
- All 108 game-referenced art and animation paths resolve inside the self-contained `prototype-v1.0/output/` release assets.
- The active rule constants are correct: Dilemma checkpoints at cells 9, 18, 27, and 36; final Revelation at cell 46.
- Failed Revelation is wired to the Clear Pill animation and remains a mechanical failure, not a weak ending.
- Browser smoke testing confirmed:
  - Prototype title reports 1.0.
  - A new game starts from the main menu.
  - The initial hand renders six cards.
  - The Dilemma counter reads `0 / 4`.
  - Pressing the step control opens an illustrated popup.

## Verified In Production

- Verification date: 2026-07-14.
- GitLab Pages pipeline `#10083631` completed successfully from `main`.
- The protected Pages URL redirects to `prototype-v1.0/` after GitLab authorization.
- A new live game starts with six cards and renders its first illustrated encounter popup.
- The production smoke test found no broken image references on the menu, game screen, or encounter popup.

## Implemented Release Requirements

- Solo card game loop with one-step ribbon movement.
- Procedural encounter, loss, advance, retreat, and rest cells.
- Four Dilemma checkpoints before the final Revelation.
- Revelation requires a leading suit score above 34 plus that suit's Ace.
- Automatic failure at the final cell if Revelation conditions are not met.
- User account prompt with autosave after Dilemma outcomes.
- Main menu, game screen, Codex, Synthesis, score display, hand sorting, and card popup viewer.
- GitLab Pages deployment configuration in `.gitlab-ci.yml`.

## External Document Status

The requested Google document was reviewed through the in-app browser after authenticated access became available.

Document URL:
`https://docs.google.com/document/d/12xtIiQF1wkJhmKjBY5eOA2Z8nZzRkpnzx_X0vdzt7Dc/edit?tab=t.0#bookmark=id.5zpx48fs1z7i`

## Challenge Deliverables

| Requirement | Status | Evidence |
| --- | --- | --- |
| Dedicated GitLab repository under `rc-ai-learning` | Complete | Remote: `https://git.ringcentral.com/rc-ai-learning/mark-dzhumaylo-ludusfati.git` |
| Source code and supporting assets committed | Complete on `main` | `prototype-v1.0/` contains the game and self-contained release assets |
| `README.md` | Complete | Root `README.md` |
| `SPEC.md` | Complete | Root `SPEC.md` |
| `ARCHITECTURE.md` | Complete | Root `ARCHITECTURE.md` |
| `RETROSPECTIVE.md` | Complete | Root `RETROSPECTIVE.md` |
| Playable game | Complete | `prototype-v1.0/index.html`; production Pages deployment verified |
| Setup and run instructions | Complete | Root `README.md` |
| Testing and validation notes | Complete | This file |
| Playable directly from URL | Complete | `https://mark-dzhumaylo-ludusfati-3fd90f.pages.git.ringcentral.com/` (GitLab authentication required) |

## Result

All listed challenge deliverables are present. The optional URL-based launch is deployed and verified through authenticated GitLab Pages.
