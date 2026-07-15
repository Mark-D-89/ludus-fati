# Ludus Fati Retrospective

## AI Tools Used

- ChatGPT/Codex for product thinking, rule design, coding, QA, repository preparation, and documentation.
- Image generation workflows for card art, suit art, Dilemma imagery, and Revelation animations.
- Browser automation for local smoke tests and challenge-document review.

## Development Workflow

The project used an iterative prototype-fork workflow. Each major design turn preserved a prior prototype and moved the active work into a new version. This made it easier to experiment with mechanics and layout without losing a known-good baseline.

The workflow moved through:

- Rule discovery and requirements.
- Text-only prototype.
- Encounter mechanics.
- Gallery card art.
- Rich main screen and Codex.
- Animated popups.
- Dilemma replacement and Revelation animations.
- Final release packaging.

## What Worked Well

- Forking prototypes helped preserve working baselines.
- Keeping the game static made QA and deployment simpler.
- Procedural cells with fixed Dilemma checkpoints gave the game structure without overbuilding content.
- The Codex became a useful way to expose rules and discovered content without turning the main screen into a manual.
- AI was effective for generating variants, producing boilerplate UI code, and keeping documentation aligned with implementation.

## What Did Not Work Well

- Visual layout tuning took many iterations and was sensitive to viewport assumptions.
- Generated assets became large quickly, so release packaging had to be narrowed to only referenced files.
- External document and GitLab UI checks depended on browser authentication.
- Some browser smoke testing required fallback approaches because local automation packages were incomplete.

## Surprises and Discoveries

- A "simple" card game became richer once the suits had strong philosophical identities.
- The final Revelation worked better as the final dilemma than as a separate weak/strong ending branch.
- Keeping art assets self-contained inside the release folder made deployment much less fragile.
- The most useful QA checks were not elaborate: syntax, asset resolution, rule constants, and one real browser smoke test caught the important risks.

## Estimated AI-Generated Code Percentage

Approximately 85-90% of the implementation and documentation was AI-generated or AI-assisted, with human direction guiding rules, taste, theme, priorities, and acceptance decisions.

## Time Spent

Approximate elapsed project effort: several iterative sessions across multiple days. Stopwatch time was not tracked precisely; the implementation and refinement process is estimated at 12-18 hours of combined human direction and AI-assisted execution.

## What I Would Do Differently Next Time

- Define the deployment target earlier.
- Establish asset size limits before generating full-resolution card sets.
- Create required challenge documents at the beginning and update them incrementally.
- Add a tiny automated smoke-test script earlier in the repo lifecycle.
- Decide on a stable viewport and layout target before deep visual polish.

## Key Lessons Learned

- AI-native development works best when the human keeps strong ownership of product direction and taste.
- Versioned forks are useful for creative prototypes, especially when rules and layout are both moving.
- Documentation should evolve with the implementation, not be reconstructed at the end.
- Static games are excellent candidates for AI-assisted end-to-end delivery because the build, test, and deploy surface can stay small.
- Deployment constraints are product requirements; they should be discovered early, not after the game feels finished.
