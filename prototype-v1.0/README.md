# Ludus Fati Prototype 1.0

Open `index.html` in a browser to play the current working fork.

This version is the 1.0 snapshot, with the final rule pass, Revelation animations, save system, gallery cards, Synthesis, Codex layer, and animated threshold popups. It includes:

- A short intro and Play/Quit menu.
- A 46-cell ribbon with four fixed Dilemma checkpoints and a final Revelation that acts as the last dilemma.
- Procedural encounter, lose, advance, retreat, and rest cells.
- Former Draw cells now roll encounter subtypes: Stranger, Sage, Relic, Text, Temptation, Contradiction, Dream, or Echo.
- Sage, Temptation, Echo, and Relic do not appear on the 1st branch; the 1st branch uses a gentler four-encounter/one-loss mix.
- A 6-card starting hand, 6-card visible hand carousel, and 15-card hand limit.
- Optional merging of matching suit/rank pairs.
- Sixteen active trolley-problem variation Dilemmas, distributed four per checkpoint.
- Dilemma cards with composed description text, suit-specific narrative outcomes, and matching stop-motion images from `output/imagegen/dilemma-stop-motion-series/`.
- Revelation scoring by strongest suit total, requiring that suit's Ace and a score over 34; missing either condition at the final cell is automatic failure.
- Positive Revelation outcomes embed their matching suit animations from the four Revelation animation folders in `output/`.
- Failed Revelation embeds the Clear Pill animation from `output/clear-pill-revelation-animation/`.
- Gallery card images for ranks 2-Ace where a matching suit/rank image exists.
- Text fallback cards for any missing gallery art.
- Loss cells use their matching Loss card images from `output/imagegen/loss-cards/`.
- Click a card in hand to open it full-size with a rank-specific suit description beside it; click the enlarged card to close it.
- Rebuilt main game screen with a permanent left ribbon, compact top score strip, central abstract cell stage, right Synthesis button, and six-card image carousel.
- Animated threshold popups: the window opens, the cell image appears first, the cell text types in, and only then do choices/buttons appear.
- Earlier-branch Stranger encounters are more likely to produce positive card gains.
- Failed Dilemmas only strip a card that is high enough to answer that branch's threshold.
- Main-screen hand sorting by rank or by suit, defaulting to suit.
- Codex overlay with rules, suit philosophies, discovered cards, revealed encounters, solved dilemma records, branch status, and Revelation records without revealing undiscovered cells.
- Codex suit entries use dedicated suit emblem images from `assets/codex-suits/`.
- Local user accounts by seeker name.
- Automatic browser autosave after Dilemma outcomes only. There is no manual save.

No build step or server is required. The card images and animations required by the release are bundled under `output/` inside this folder.
