# Ludus Fati Architecture

## Technology Stack

- HTML, CSS, and vanilla JavaScript.
- Static image and animation assets.
- Browser `localStorage` for local seeker accounts and autosave.
- GitLab Pages configuration for URL-based static deployment.

No package manager, build step, framework, or server is required for the 1.0 prototype.

## Repository Layout

- `index.html`: root launch page that redirects to the 1.0 prototype.
- `prototype-v1.0/index.html`: game document.
- `prototype-v1.0/styles.css`: complete visual system and responsive layout.
- `prototype-v1.0/game.js`: game state, rules, procedural cells, UI rendering, Codex, autosave, and modal flow.
- `prototype-v1.0/assets/`: local Codex suit art.
- `prototype-v1.0/output/`: self-contained release art and animation bundle.
- `.gitlab-ci.yml`: GitLab Pages publishing configuration.
- `SPEC.md`: rules and requirements.
- `RETROSPECTIVE.md`: AI-native workflow reflection.
- `docs/COMPLIANCE.md`: challenge compliance and QA notes.

## Runtime Architecture

The prototype is a single-page static browser app. The HTML provides fixed UI containers. CSS owns the presentation, layout, modal treatment, card visuals, and responsive behavior. JavaScript owns all game state and rendering.

Main runtime responsibilities in `game.js`:

- Define suits, branches, ranks, art references, and rule constants.
- Generate the hidden ribbon board with constrained procedural cells.
- Resolve cell effects.
- Present animated modal encounters.
- Manage Dilemmas and Revelation.
- Render hand cards, Synthesis, ribbon status, scores, Codex, and logs.
- Persist seeker state to `localStorage` after Dilemma outcomes.

## State Model

The game keeps one in-memory `state` object with:

- Current player/account.
- Seeded random state.
- Current position and step count.
- Hand, discovered cards, and synthesis state.
- Generated cells.
- Solved Dilemmas and current pending choices.
- Codex records.
- Autosave metadata.

Saved games are serialized as JSON under a versioned `localStorage` namespace: `ludus-fati.v1.0.*`.

## Asset Strategy

Earlier working folders used shared generated assets outside the prototype. For the 1.0 release, required assets were copied into `prototype-v1.0/output/` and game references were changed to local `output/...` paths. This makes the release folder self-contained and deployable without historical prototype folders.

## Deployment Design

The project uses GitLab Pages. The CI job copies:

- Root launch page.
- Release docs.
- `prototype-v1.0/`.

into the `public/` artifact. Once merged to the default branch and the Pages job succeeds, the game should be playable from the project's GitLab Pages URL.

## Major Design Decisions

- Keep the game static to minimize operational complexity.
- Use vanilla JavaScript to keep the prototype inspectable and easy to deploy.
- Keep older prototype folders local and commit only the 1.0 release.
- Bundle only assets referenced by the release instead of pushing the full generated output archive.
- Use branch checkpoints for Dilemmas and make the Revelation the final dilemma.

## AI Tooling Used

- ChatGPT/Codex for requirements shaping, implementation, refactoring, QA, documentation, and release preparation.
- Image generation tasks for card and animation assets.
- Browser automation through Codex for smoke testing and document review.

## Agent Workflow

The project was built iteratively:

1. Define rules and unanswered design questions.
2. Implement a text prototype.
3. Fork prototype versions for new mechanics and visual directions.
4. Add art, Codex, Synthesis, autosave, and animated modal flow.
5. Stabilize the 1.0 release.
6. Run syntax, asset, rule-constant, and browser smoke tests.
7. Prepare GitLab Pages deployment.
