# Ludus Fati Specification

## Game Overview

Ludus Fati is a strictly solo browser card game about a seeker moving through a philosophical landscape. The player advances one cell at a time along a ribbon path, collects and loses suited cards, resolves philosophical Dilemmas, and attempts a final Revelation.

## Scope

The 1.0 release is a playable static prototype. It includes the complete core loop, card handling, procedural cells, Dilemma resolution, Revelation outcomes, Codex reference layer, autosave, and GitLab Pages deployment configuration.

Out of scope for 1.0:

- Multiplayer.
- Server-side persistence.
- Manual save slots.
- Full balance tuning beyond the current prototype values.
- Audio.
- Mobile-specific redesign beyond responsive fallback behavior.

## Core Rules

- The player is dealt 6 starting cards.
- A hand can hold up to 15 cards.
- Cards have only suit and rank.
- Suits are Orbs, Daggers, Abysses, and Candles.
- Ranks follow a 52-card deck scale: 2 through Ace, where Ace is 14.
- Aces cannot be drawn from ordinary Draw-style encounters.
- Two cards of the same suit and rank can be synthesized into one card of the same suit at the next rank.
- Movement is one step per click. The player does not choose movement direction.
- The ribbon has 46 cells.
- Dilemmas occur at cells 9, 18, 27, and 36.
- The Revelation occurs at cell 46 and acts as the final dilemma.

## Cell Types

- Encounter: replaces the original Draw cell and can reveal Stranger, Sage, Relic, Text, Temptation, Contradiction, Dream, or Echo.
- Loss: removes a matching card when possible.
- Advance: moves the seeker forward within the current branch.
- Retreat: moves the seeker backward and rerolls obscured future cells in the current branch.
- Rest: has no mechanical effect.
- Dilemma: requires a card at or above the branch threshold.
- Revelation: final suit-total check.

## Dilemmas

- Any suit can resolve a Dilemma if the selected card has sufficient rank.
- There are no mechanically correct or incorrect suit answers.
- The selected card increases by 1 rank unless it is already an Ace.
- Failing a Dilemma sends the player back to the first cell of that branch.
- Failed Dilemmas only strip a card that is high enough for that branch's threshold.
- If the player fails the first Dilemma and has fewer than 6 cards, the hand is topped back up to 6 low-rank cards.

## Revelation

At cell 46:

- Calculate the total rank value for each suit in the player's hand.
- Identify the leading suit.
- The leading suit must exceed 34.
- The leading suit must contain its Ace.
- If those conditions are met, the player chooses whether to embrace or refuse that suit's Revelation.
- If those conditions are not met, the run ends in failed Revelation.

## Functional Requirements

- The game must run locally from static files.
- The root page must launch the 1.0 release.
- The main menu must ask for a seeker name.
- Autosave must occur after Dilemma outcomes only.
- The hand must support sorting by suit and rank.
- Clicking a card must open a larger card view.
- The Codex must expose rules, suits, discovered content, branch status, and Revelation records.
- The game must be playable without a build step.
- The repository must include GitLab Pages deployment configuration.

## Acceptance Criteria

- Opening `prototype-v1.0/index.html` shows the main menu.
- Starting a new game creates a 6-card hand.
- The Dilemma counter starts at `0 / 4`.
- The step control opens an illustrated cell popup.
- All referenced card, encounter, loss, Dilemma, and Revelation assets load from `prototype-v1.0/output/`.
- The final branch has no separate Dilemma before the Revelation.
- The final Revelation fails automatically when the leading suit lacks either score over 34 or the suit Ace.
- `README.md`, `SPEC.md`, `ARCHITECTURE.md`, and `RETROSPECTIVE.md` are present.
