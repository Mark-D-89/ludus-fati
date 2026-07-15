# Ludus Fati Rules Design

Draft version: 0.1

This document defines the core rules for a strictly solo, short-form philosophical card game about a seeker moving along a ribbon path toward an ultimate revelation. It focuses on rules, progression, economy, dilemma resolution, and procedural generation. It does not define final card artwork.

## Design Goals

- The game is strictly solo.
- A full session should last about 10 to 15 minutes.
- The experience should feel meditative, story-forward, and chance-driven rather than competitive or highly optimized.
- The only path to victory is progression along the ribbon and the final Revelation check.
- The player is never eliminated during the journey, but they can be thrown back to the beginning of the current branch, or to the beginning of the ribbon before the first dilemma is solved.
- Dilemmas do not have correct answers. Every suit can resolve every dilemma if the card rank is high enough.
- The philosophical tone should evoke Greek and Roman antiquity: schools, temples, porticoes, courts, ruins, gardens, baths, oracles, tyrants, sages, and cosmic dread.

## Core Fantasy

The player is a seeker of knowledge led through a philosophical landscape. The seeker craves truths that may have been better left hidden, yet also fears them. The ribbon represents a path toward the ultimate revelation. Every card is a crystallized idea, impulse, doctrine, wound, or insight that the seeker carries in hand.

The central tension is simple:

- High cards help the seeker pass dilemmas.
- Cards retained in hand determine the final Revelation.
- Merging cards creates stronger single cards, but reduces the total combined value of that suit.
- Loss cells can remove important cards without player control.
- Progress is mostly movement through fate, with only a few moments of deliberate choice.

## Components

- One procedural ribbon board with 46 cells.
- Four unlimited card suits.
- Card ranks from 2 through Ace, following a standard 52-card rank model.
- A player hand with a minimum of 0 cards and a maximum of 15 cards.
- Five tiered dilemma decks.
- One final Revelation cell.

Cards are generated as needed. There is no finite deck, no discard pile, and no exhaustion rule. Cards of the same suit and rank may appear multiple times.

## Suits

| Suit | Color | Philosophical Mode | Narrative Signature |
| --- | --- | --- | --- |
| Orbs | Light blue | Enlightenment, improvement, rights, equality, optimism, progress, reasoned reform | The world can be clarified, healed, and made more just. |
| Daggers | Dark red | Realpolitik, hierarchy, brutal realism, cynical prudence, inherited order, power | The world is dangerous, and truth belongs to those who can survive its uses. |
| Abysses | Pitch black | Cosmic pessimism, human insignificance, nihilism, despair, the void beyond measure | The world is not arranged for human meaning, and may not answer at all. |
| Candles | Warm white | Stoic endurance, tragic hope, burden-bearing, defiant responsibility, light under pressure | The world is broken, yet one may still carry the burden placed before them. |

No suit is mechanically stronger than the others. Their differences are narrative, especially in dilemma outcomes and final Revelation text.

## Ranks

| Rank | Value |
| --- | ---: |
| 2 | 2 |
| 3 | 3 |
| 4 | 4 |
| 5 | 5 |
| 6 | 6 |
| 7 | 7 |
| 8 | 8 |
| 9 | 9 |
| 10 | 10 |
| Jack | 11 |
| Queen | 12 |
| King | 13 |
| Ace | 14 |

Higher ranks are always stronger for dilemma checks. Aces cannot be upgraded.

## Ribbon Structure

The default ribbon has 46 cells:

| Cell Range | Branch | Fixed Cell | Dilemma Threshold |
| --- | --- | --- | ---: |
| 1-9 | Branch I: The First Portico | Cell 9 is Dilemma I | 6 |
| 10-18 | Branch II: The Court of Masks | Cell 18 is Dilemma II | 8 |
| 19-27 | Branch III: The Ruined Academy | Cell 27 is Dilemma III | 10 |
| 28-36 | Branch IV: The Oracle's Stair | Cell 36 is Dilemma IV | Queen |
| 37-45 | Branch V: The Black Garden | Cell 45 is Dilemma V | King |
| 46 | Revelation | Final cell | Dominant suit score over 34 and Ace present |

Each branch has eight procedural cells followed by one fixed dilemma. The Revelation is the final cell after the fifth dilemma.

### Why 46 Cells

Forty-six cells gives the player a short but complete arc: five slightly fuller branches, five dilemma spikes, and one final check. With normal reading time, occasional advances, occasional retreats, and possible repeated branches after failed dilemmas, this should remain near the desired 10 to 15 minute session length while giving each branch a little more room to breathe.

## Setup

1. Set the player position before cell 1.
2. Deal 5 starting cards.
3. Starting cards are random low-tier cards:
   - Suit: random among the four suits.
   - Rank: random from 2 to 6.
4. Generate the first branch secretly.
5. Show the ribbon path, the fixed Dilemma cells, and the Revelation cell.
6. Keep all non-fixed cells obscured until reached.

## Turn Structure

Each turn is one press of the Step button.

1. Move the seeker forward by exactly one cell.
2. Reveal the new cell if it was obscured.
3. Resolve the cell effect.
4. If the player has any available card merges, offer them.
5. If the cell is a Dilemma or Revelation, resolve its special rules.

The player cannot choose to move fewer spaces. The player does not roll dice. The player does not choose a route.

## Branch Generation

When a branch begins, generate its eight procedural cells and shuffle them. They remain hidden until reached.

Each branch should contain:

- 3 Encounter cells, using the former Draw cell slot.
- 2 Lose cells.
- 1 Rest cell.
- 1 Advance cell.
- 1 Retreat cell.

This creates frequent change while putting more pressure on the player's hand. Playtesting may replace the fixed formula with weighted random generation, but the above is the recommended first implementation.

Two positional restrictions always apply:

- The first procedural cell after a Dilemma can never be a Retreat cell.
- The last procedural cell before a Dilemma can never be an Advance cell.

### Rank Tiers By Branch

| Branch | Encounter Rank Bias | Lose Target Tier | Advance | Retreat |
| --- | --- | --- | ---: | ---: |
| I | Low only, 2-6 | Low only | +3 | -1 |
| II | 70 percent low, 30 percent middle | Mostly low, some middle | +2 | -1 |
| III | 90 percent middle, 10 percent high | Middle only | +2 | -2 |
| IV | 85 percent middle, 15 percent high | Mostly middle, some high | +1 | -2 |
| V | 70 percent middle, 30 percent high | High only | +1 | -3 |

Low tier means ranks 2 to 6.

Middle tier means ranks 7 to 10.

High tier means Jack, Queen, King, or Ace for checks, loss targeting, upgrades, and merging.

High ranks should remain rare in Encounter cells even late in the ribbon. Encounter rewards can generate Jack, Queen, or King, but never Ace. Aces must be earned through dilemma upgrades or merging Kings.

## Cell Types

### Encounter

An Encounter cell replaces the old direct Draw cell. The branch determines the encounter rank, then the cell randomly selects an encounter subtype. The player can influence the outcome through choices, but they no longer freely choose any suit as a guaranteed reward.

The available encounter subtypes are:

| Subtype | Main Effect |
| --- | --- |
| Stranger | A fictional character tied to a suit appears. Passing is Rest. Engaging produces a 50/50 gain of the stranger's suit or loss from a criticized other suit. |
| Sage | A real thinker tied to a suit asks a question. A sufficient card of the sage's suit gains that suit. The opposite suit is criticized and loses two lowest cards of that suit. Neutral suits have no mechanical effect. Failing the rank check loses the lowest card of each suit held. |
| Relic | The player may take a suited object. Taking gains that suit and pays the lowest card of the opposing suit, if present. Leaving is Rest. |
| Text | The player interprets a suited fragment with a card. Matching suit upgrades the interpreting card. Opposing suit loses the interpreting card. Neutral suits gain a smaller card of the text's suit. |
| Temptation | The player may accept a stronger suited card at the cost of two lowest cards outside that suit. Refusing is Rest. |
| Contradiction | The path attacks the currently dominant suit, usually removing its lowest card through the opposing suit's pressure. |
| Dream | The hand's shape is judged. A clear leading suit gains a modest card; tied leading suits risk losing one low card among them. |
| Echo | The last meaningful card gain or loss returns. It may grant a weaker copy of that suit or remove the lowest card of that suit. |

Sage, Temptation, Echo, and Relic do not appear on the 1st branch. The 1st branch is limited to Stranger, Text, Contradiction, and Dream.

Resolution:

1. Generate rank from the branch's Encounter rank bias.
2. Randomly choose one encounter subtype from the branch-legal pool.
3. Resolve the subtype's choice, test, or automatic outcome.
4. If a card is gained and hand size exceeds 15, remove one random card among the lowest-rank cards in the hand.

### Lose

A Lose cell removes a card from the player. The flavor should be the opposite pressure of the suit being attacked.

Examples:

| Target Suit | Flavor Direction |
| --- | --- |
| Orbs | Chaotic thoughts, corrupted hopes, mockery of ideals |
| Daggers | Yearning for innocence, revolt against calculation, disgust with power |
| Abysses | Passing hope, sudden beauty, a human voice in darkness |
| Candles | Pangs of despair, exhaustion, ridicule of endurance |

Resolution:

1. Generate target suit from the cell flavor.
2. Generate target tier from the branch.
3. Remove the highest-rank card the player has in that suit and tier.
4. If the player has no card of that suit in that tier, remove the nearest-rank card of that suit.
5. If the player has no card of that suit, nothing is removed.

This makes loss cells punishing when they hit a suit the player is carrying, while still allowing occasional misses.

### Advance

An Advance cell moves the seeker forward automatically. Its flavor should suggest asceticism, discipline, purification, or temporary freedom from appetite.

Examples:

- A Day of Fasting
- A Walk in the Woods
- The Cold Bath Before Sunrise
- A Silent Hour Beneath the Portico
- Bread, Water, and a Clean Thought

Resolution:

1. Move the player forward by the branch's Advance value.
2. Advancement cannot pass an unsolved Dilemma.
3. Skipped cells do not resolve.
4. If advancement reaches a Dilemma or the Revelation, resolve it immediately.
5. If advancement reaches another procedural cell, reveal and resolve that destination cell immediately.

### Retreat

A Retreat cell moves the seeker backward automatically. Its flavor should suggest hedonism, comfort, intoxication, vanity, softness, or distraction.

Examples:

- A Fine Meal
- A Glass of Wine
- The Cushioned Couch
- Perfume in the Afternoon
- Applause at the Wrong Moment

Resolution:

1. Move the player backward by the branch's Retreat value.
2. Retreat cannot pass the first cell of the current branch.
3. After retreating, all procedural cells in the current branch ahead of the new position are obscured and randomized again.
4. Fixed Dilemma cells are never randomized.

### Rest

A Rest cell has no mechanical effect. It represents the "clear pill": no theory, no doctrine, no abstraction, no argument.

Examples:

- A Bowl of Still Water
- Breath Before Thought
- The Empty Bench
- No School, No Master
- A White Stone in the Hand

Resolution:

1. Show flavor text.
2. No card is drawn, lost, merged, upgraded, or moved.

### Dilemma

A Dilemma cell is a fixed checkpoint. It demands one card with rank equal to or higher than the branch threshold.

The cell is visible as "Dilemma" before the player reaches it, but the specific dilemma text is not revealed until the player lands on it.

Resolution:

1. Draw one dilemma from the appropriate tier deck.
2. Reveal its title and prompt.
3. Show all cards in hand that meet or exceed the required rank.
4. The player chooses one eligible card to resolve the dilemma, or chooses to fail intentionally.
5. If the player resolves the dilemma:
   - The chosen card remains in hand.
   - Increase the chosen card's rank by 1, unless it is already an Ace.
   - Mark the Dilemma as solved.
   - Unlock the next branch.
6. If the player cannot resolve the dilemma, or chooses to fail:
   - Remove one random card among the highest-rank cards in the player's hand.
   - Move the player to the first cell after the last solved Dilemma.
   - If no Dilemma has been solved, move the player back to cell 1.
   - Randomize and obscure the current branch again.
   - The failed dilemma is forgotten. A new dilemma of the same tier is drawn next time.

### Revelation

The Revelation is the final cell. It is not resolved with one card. Instead, it checks the combined score of the player's strongest suit and whether that suit contains its Ace.

Resolution:

1. Add the rank values of all Orbs in hand.
2. Add the rank values of all Daggers in hand.
3. Add the rank values of all Abysses in hand.
4. Add the rank values of all Candles in hand.
5. Find the highest suit total.
6. If multiple suits are tied for highest, only tied suits can become the Revelation suit.
7. A strong Revelation is possible only if the Revelation suit has a total higher than 34 and the player holds the Ace of that suit.
8. If several tied highest suits meet both requirements, the player chooses which one becomes the Revelation suit.
9. If the leading suit does not exceed 34, or if it exceeds 34 but has no Ace, the Revelation is weak.

On a strong Revelation, present two narrative choices:

- Embrace the Revelation suit.
- Refuse the Revelation suit.

These choices do not change mechanics. They only change the ending text.

On a weak Revelation, show a lesser ending: the seeker reaches the threshold but cannot fully comprehend what has been found.

## Card Merging

The player may merge cards outside cell resolution.

Merge rule:

- Two cards of the same suit and same rank may become one card of the same suit at the next rank.
- Two 6 of Orbs become one 7 of Orbs.
- Two Kings of Abysses become one Ace of Abysses.
- Aces cannot be merged.

Merging is optional.

Merging gives the player stronger single cards for future dilemmas, but usually lowers the final combined score of that suit. For example, two 8 of Candles have a Revelation value of 16, while one 9 of Candles has a Revelation value of 9. This is intentional tension.

## Dilemma Outcome Logic

Every Dilemma has four possible narrative outcomes, one for each suit. The mechanical result is always the same:

- The Dilemma is passed.
- The chosen card upgrades by 1 rank if possible.
- The seeker proceeds.

The difference is purely in the philosophical interpretation.

| Suit Used | Outcome Mode |
| --- | --- |
| Orbs | The seeker resolves the dilemma through reason, improvement, universal dignity, reform, or faith in human progress. |
| Daggers | The seeker resolves the dilemma through power, hierarchy, prudence, necessary cruelty, or clear-eyed distrust. |
| Abysses | The seeker resolves the dilemma by accepting meaninglessness, cosmic scale, despair, or the collapse of human consolation. |
| Candles | The seeker resolves the dilemma through endurance, tragic hope, personal duty, disciplined suffering, or light kept despite darkness. |

## Sample Dilemmas

The final game should contain more dilemmas than the player sees in one session. Each tier should have at least 5 dilemmas. The first implementation should target 25 dilemmas total: 5 per tier.

### Tier I: Threshold 6

Title: The Cave and the Kindly Lie

Prompt: A sick friend asks whether the shadows on the wall are all that exist. You know enough to wound them, but not enough to heal them.

Outcomes:

- Orbs: You teach gently, trusting that even painful clarity can become freedom.
- Daggers: You preserve the useful illusion, for truth without strength is merely another weapon.
- Abysses: You say the shadows are shadows, and that the fire too may be a shadow.
- Candles: You sit beside them and tell only the part of truth that can be carried tonight.

### Tier II: Threshold 8

Title: The Just City and the Necessary Lie

Prompt: A city may be kept peaceful by a founding myth. Without it, factions will tear the square apart.

Outcomes:

- Orbs: You seek institutions strong enough to survive without sacred fraud.
- Daggers: You keep the myth, since order is the mother of every softer virtue.
- Abysses: You expose the myth and watch the city reveal what it always was.
- Candles: You keep the city from burning while refusing to worship the lie.

### Tier III: Threshold 10

Title: The Chain and the Crown

Prompt: A ruler offers stability in exchange for obedience. The crowd asks whether freedom is worth hunger.

Outcomes:

- Orbs: You argue that dignity cannot be postponed forever in the name of bread.
- Daggers: You accept the bargain, knowing hunger makes philosophers brief.
- Abysses: You see both crown and crowd as arrangements of fear beneath an indifferent sky.
- Candles: You refuse easy purity and choose the burden that lets the weak survive.

### Tier IV: Threshold Queen

Title: The Oracle Who Speaks Clearly

Prompt: The oracle gives an answer with no ambiguity, no poetry, and no escape. It condemns your favorite hope.

Outcomes:

- Orbs: You test the oracle against reason and rebuild hope from what survives.
- Daggers: You use the oracle as advantage, because a harsh fact is still a tool.
- Abysses: You accept the sentence and feel the universe become colder but cleaner.
- Candles: You bow to the fact and ask what duty remains after consolation dies.

### Tier V: Threshold King

Title: The Gods Laugh at Virtue

Prompt: You glimpse a cosmos in which the virtuous suffer, the vicious flourish, and no judge waits beyond the stars.

Outcomes:

- Orbs: You answer that justice must be made precisely because it is not guaranteed.
- Daggers: You answer that virtue without power is a song sung for the conqueror.
- Abysses: You answer nothing. The laughter is older than language.
- Candles: You answer by lifting the next stone, since meaning may begin where proof ends.

## Revelation Endings

At the Revelation, use the player's dominant suit to determine the ending family.

### Orbs Revelation

- Embrace: The seeker accepts a vision of progress, reform, and human dignity as the only answer worthy of the terror seen.
- Refuse: The seeker sees the beauty of progress but refuses to let hope become blindness.

### Daggers Revelation

- Embrace: The seeker accepts that power, order, and hierarchy shape the world before ideals can name it.
- Refuse: The seeker understands the blade but will not kneel to it.

### Abysses Revelation

- Embrace: The seeker accepts the void without disguise and lets every consolation fall away.
- Refuse: The seeker looks into the void and denies it the right to be the whole truth.

### Candles Revelation

- Embrace: The seeker accepts burden-bearing hope as the last noble answer before darkness.
- Refuse: The seeker honors the flame but refuses to mistake endurance for explanation.

### Weak Revelation

If no leading suit both exceeds 34 and contains its Ace, the seeker arrives but cannot fully comprehend the revelation. The ending should feel incomplete, quiet, and slightly uncanny rather than punitive.

## State Rules

The implementation should track:

- Current local player account name.
- Current cell position.
- Current branch number.
- Solved Dilemmas.
- Procedural cell contents for the active branch.
- Revealed or obscured state of procedural cells.
- Player hand.
- Available merges.
- Random seed for session reproducibility.
- Dilemma history for the session.
- Final Revelation suit and result.

The prototype should autosave per local user account after completed Dilemma outcomes only. Each user has one overwritten autosave slot. There is no manual save action.

## Procedural Safety Rules

To preserve the intended tone:

- Do not generate more than 2 Lose cells in a branch.
- Do not generate more than 1 Retreat cell in a branch by default.
- Do not generate a Retreat cell as the first procedural cell after a Dilemma.
- Do not generate an Advance cell as the last procedural cell before a Dilemma.
- Do not generate Sage, Temptation, Echo, or Relic encounters on the 1st branch.
- Do not allow an Advance cell to skip past an unsolved Dilemma.
- Do not allow a Retreat cell to move before the current branch start.
- Do not reveal specific Dilemma prompts before the Dilemma cell is reached.
- Do not remove cards from a suit the player does not have unless the cell explicitly says it can strike any suit.
- Do not create direct player elimination.

## Balance Notes

The first playtest should tune these values:

- Strong Revelation requirement: dominant suit total must be higher than 34 and contain its Ace.
- Branch length: start at 8 procedural cells plus 1 Dilemma.
- Starting hand: start at 5 low-tier cards.
- Hand limit: start at 15 cards.
- Dilemma thresholds: 6, 8, 10, Queen, King.
- Branch generation: start with 3 Encounter, 2 Lose, 1 Rest, 1 Advance, 1 Retreat.
- High-rank Encounter rewards: keep Jack through King rare; never spawn Ace from Encounter rewards.

Expected pressure:

- The player should usually have at least one possible answer to early dilemmas.
- The third dilemma should be the first point where failure feels meaningfully possible.
- The fourth and fifth dilemmas should feel like spikes.
- Merging should be tempting, but never automatic.
- Losing a high card should hurt.
- The weak Revelation should be possible, while the strong Revelation should feel earned and uncommon.

## Open Tuning Questions For Playtesting

No design question blocks implementation, but these values should be validated after a prototype exists:

- Is 46 cells the right length for a 10 to 15 minute session?
- Is "over 34 plus Ace" the right strong Revelation threshold?
- Does optional merging create meaningful tension, or does it feel like an obvious trap?
- Are loss cells too punishing when they hit the player's strongest suit?
- Should failed dilemmas remove the highest-rank card before or after retreat?
- Should the weak Revelation be treated as a loss, a lesser ending, or a prompt to replay?
