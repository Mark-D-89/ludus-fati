# Encounter additions v0.4 — image-generation prompt set

Source: `prototype-v0.4/game.js`  
Manifest: `additions-v0.4-manifest.json`  
Generation path: built-in image generation, one call per asset.  
Input-image role: the manifest's `reference_path` was used only as a suit-style reference. Its character, pose, props, and setting were explicitly excluded from copying.

Each final prompt combined the shared frame, the matching suit directive, and one card scene below.

## Shared frame

```text
Use case: stylized-concept
Asset type: production game Encounter illustration
Composition/framing: vertical 2:3 stylized environmental figure or philosopher illustration; defining action and symbolic props readable at thumbnail size; flattened illustrative depth.
Style/medium: decidedly non-photorealistic handmade game illustration; visible suit-appropriate gouache, print marks, ink, and paper grain; limited palette; strong silhouette; mature philosophical fantasy; cohesive with the input style reference.
Constraints: one finished illustration only; no card frame; no title plaque; no embedded text; no readable writing; no letters; no numerals; no UI; no logos; no watermark; no split panels; no photorealistic faces, skin, hands, or materials; no actor likeness; no lens effects; no glossy 3D rendering; no anime; no clutter; no duplicate limbs or objects.
```

## Suit directives

### Orbs

```text
Blue / Orb: precise civic engraving fused with geometric gouache and illuminated-diagram design. Use simplified anatomy, crisp graphic faces, flat measured planes, pale civic blue, academic navy, sapphire, white, soft gold and silver. Favor circles, concentric rings, symmetry, grids, diagrams, glass-like geometry and calm order. Mood of humane reason, communication, good faith and measured optimism; never jagged or chaotic.
```

### Daggers

```text
Red / Dagger: angular expressionist woodcut fused with a limited-palette screenprint. Use simplified silhouettes, carved facial planes and bold color blocks in crimson, burgundy, rust, black, gold and dark silver. Favor triangles, diagonals, slashes, sharp asymmetry, leverage and aggressive framing. Reduce iron, leather, dark wood, brass and scarlet cloth to graphic textures. Mood of severity, rivalry, command and cold clarity.
```

### Abysses

```text
Black / Abyss: surreal charcoal-and-ink monotype with torn-paper negative space and distressed collage logic. Let figures dissolve into symbolic silhouettes and broken marks. Use pitch black, deep violet, ash grey, corpse-white, rust and dim silver; torn edges, inward spirals, black circles, collapsing perspective, smoke and dissolving contours. Mood of cosmic insignificance, alienation, decay and cold lucidity.
```

### Candles

```text
White / Candle: humble secular tempera fused with softly carved woodcut and luminous gouache. Use simplified rounded human forms in candle white, ivory, warm cream, pale gold, amber, smoke grey and muted brown. Favor repaired edges, shelter, road, bowl, memory, hands helping and a modest practical light in a cold field. Mood of tenderness, faithful labor, sorrow with warmth and hope without guarantee. No halo, nimbus, aureole, mandorla or religious iconography.
```

## Stranger scenes

### Louise Banks — `stranger/orbs/louise-banks.png`

```text
Create “Stranger: Louise Banks,” the linguist from Arrival / Story of Your Life. A thoughtful contemporary linguist in a practical dark field suit stands inside a vast first-contact chamber before a translucent circular barrier. On the far side, mist suggests an immense nonhuman presence while one large circular ink-like logogram floats against the glass. She raises one simplified hand toward it, patient and attentive rather than afraid. The logogram is purely abstract and contains no characters. Mood: language widening the shape of a life.
```

### Tali'Zorah — `stranger/orbs/talizorah.png`

```text
Create “Stranger: Tali'Zorah,” the quarian engineer from Mass Effect. A slender masked alien engineer in a practical hooded environmental suit kneels inside the observation bay of a migrant starship, opening a failing life-support mechanism with careful gloved hands. Her opaque faceplate holds only a faint suggestion of eyes. Beyond a circular window, a scattered fleet crosses deep blue space; concentric diagnostic rings and repaired conduits turn survival engineering into an orderly civic diagram. Mood: technical intelligence, responsibility and hope carried by a displaced people.
```

### Hari Seldon — `stranger/orbs/hari-seldon.png`

```text
Create “Stranger: Hari Seldon,” the mathematician of Foundation. An elderly future historian-mathematician stands before a vast circular projection charting the rise and collapse of a galactic empire as elegant curves, concentric epochs and falling geometric towers. He marks a small bright refuge on the long decline with a compass-like pointer. Futuristic robes and architecture are restrained, scholarly and timeless. Mood: calm foresight preserving humane possibility inside civilizational collapse.
```

### Tiffany Aching — `stranger/orbs/tiffany-aching.png`

```text
Create “Stranger: Tiffany Aching,” the young chalk-country witch from Terry Pratchett's Discworld novels. A practical adolescent rural witch in a plain dark blue dress, sturdy boots and an unadorned pointed hat stands on a windswept chalk hillside. One hand holds a heavy iron frying pan low at her side while the other parts a translucent ring of fairy glamour, revealing sheep, a dry-stone wall and an ancient white horse cut into the ordinary landscape beneath it. No school uniform, castle classroom, ornate wand, franchise mark or readable text. Mood: intelligence rooted in attention, work and care for ordinary people.
```

### Paul Atreides — `stranger/daggers/paul-atreides.png`

```text
Create “Stranger: Paul Atreides,” the desert heir from Dune. A young desert ruler in a dark stillsuit and restrained hood stands over a tactical relief map of dunes, one hand hovering above a tiny imperial throne while branching future paths cut across the red sky like sharp lines. His prescient eyes are graphic blue-within-blue, his expression controlled and burdened; a crysknife stays sheathed. Mood: mastery of fear turning into dangerous historical command.
```

### Kreia — `stranger/daggers/kreia.png`

```text
Create “Stranger: Kreia,” the blind exiled mentor from Knights of the Old Republic II. An elderly woman in layered dark robes stands in a ruined stone academy, blank pale eyes turned inward. One hand is hidden in her sleeve while fine red threads extend from the other toward broken masks, a small pawn and distant silhouettes, suggesting manipulation through teaching. No glowing swords. Mood: austere mentorship, concealed leverage and contempt for dependence.
```

### GLaDOS — `stranger/daggers/glados.png`

```text
Create “Stranger: GLaDOS,” the suspended artificial intelligence from Portal. A large white-and-black mechanical intelligence hangs from thick cables inside a buried test chamber, its single amber eye angled down with clinical poise. Movable wall panels, a weighted cube-like test object, sharp red hazard diagonals and a tiny empty observation chair turn the room into a system of leverage. No franchise logos or readable signs. Mood: courteous control, experiment as domination, humor made cold.
```

### Lady Eboshi — `stranger/daggers/lady-eboshi.png`

```text
Create “Stranger: Lady Eboshi,” the iron-town ruler from Princess Mononoke. A composed Japanese woman in practical late-medieval clothing stands on an ironworks rampart, raising a compact hand cannon toward an immense forest silhouette beyond the walls. Below her, workers and outcasts are sheltered by angular roofs while red furnace light cuts through black smoke. Her face shows protective resolve and ruthless calculation. Mood: care armed with industrial power, command that saves and wounds at once.
```

### K — `stranger/abysses/k.png`

```text
Create “Stranger: K,” the replicant officer from Blade Runner 2049. A solitary young synthetic detective in a long dark coat stands in falling amber snow before an enormous ruined statue face. A small wooden toy horse rests in his gloved hand while a pale implanted memory of a childhood room fractures behind him like torn translucent paper. His identity is generic and graphic, not an actor likeness. Mood: a borrowed memory becoming more human than certainty.
```

### The Nameless One — `stranger/abysses/the-nameless-one.png`

```text
Create “Stranger: The Nameless One,” the immortal scarred wanderer from Planescape: Torment. A huge weathered man with symbolic scar-lines wakes on a stone slab in an impossible mortuary. Strips of old notes cling to his coat and dissolve into shadow; doorways fold into one another around a floating black circle, suggesting many previous selves and unpaid consequences. Scars are abstract carved marks, not gore. Mood: identity erased, consequence remaining, immortality as metaphysical sentence.
```

### Harry Du Bois — `stranger/abysses/harry-du-bois.png`

```text
Create “Stranger: Harry Du Bois,” the ruined detective from Disco Elysium. A disheveled middle-aged detective in an outdated coat stands in a flooded, abandoned commercial district by a grey sea. A broken mirror fragments his face into arguing silhouettes while a tiny distant apricot-colored light persists behind shuttered shops. No readable shop signs or text. Mood: self-destruction, political ghosts and one improbable promise of beauty.
```

### Meursault — `stranger/abysses/meursault.png`

```text
Create “Stranger: Meursault,” the estranged clerk from The Stranger. A plain young clerk in a light suit stands alone on a blinding beach at white noon. The sun is a huge empty black-edged disc; the sea, funeral road and courtroom collapse into one flattened heat-struck space around him. His face is calm, detached and unreadable; no weapon and no violence. Mood: immediate physical existence beneath the universe's gentle indifference.
```

### Samwise Gamgee — `stranger/candles/samwise-gamgee.png`

```text
Create “Stranger: Samwise Gamgee,” the steadfast gardener from The Lord of the Rings. A small weary gardener in a travel-worn cloak climbs the final black volcanic slope while supporting an exhausted companion whose face remains mostly hidden. A tiny remembered green garden and kitchen window glow faintly in the distance; a plain cooking pot hangs at his pack. No franchise emblems. Mood: friendship carrying hope after hope has lost its argument.
```

### Imperator Furiosa — `stranger/candles/imperator-furiosa.png`

```text
Create “Stranger: Imperator Furiosa,” the one-armed driver from Mad Max: Fury Road. A determined shaved-headed woman with a practical mechanical prosthetic arm steadies the wheel of a battered war vehicle turned away from a distant fortress. Behind her, rescued travellers shelter beneath pale cloth while a tiny green shoot appears in cracked earth near the tire. Her face is generic and graphic, not an actor likeness. Mood: fierce endurance redirecting machinery of tyranny toward shared escape.
```

### Lee Everett — `stranger/candles/lee-everett.png`

```text
Create “Stranger: Lee Everett,” the protective teacher from The Walking Dead game. A tired Black man in a worn shirt kneels in an abandoned roadside shelter, gently showing a young girl how to secure her short hair and pack a small satchel. The child is seen mostly from behind; a warm lantern, a bowl and a repaired door make the lesson practical and tender. Distant silhouettes of the dead remain abstract and non-graphic. Mood: preparing another life to continue when one's own protection must end.
```

### Kim Kitsuragi — `stranger/candles/kim-kitsuragi.png`

```text
Create “Stranger: Kim Kitsuragi,” the precise lieutenant from Disco Elysium. A slim middle-aged East Asian detective in an orange-brown bomber jacket stands at dawn beside a rain-slicked motor carriage, calmly checking a blank notebook while his disheveled partner is only a soft shadow beneath an awning. A small thermos and steady headlamp make warm practical circles in the cold street. No readable insignia or text. Mood: quiet competence, earned loyalty and returning to the case after humiliation.
```

## Sage scenes

### Jean-Marie Guyau — `sage/orbs/jean-marie-guyau.png`

```text
Create “Sage: Jean-Marie Guyau,” the young 19th-century French philosopher and poet of expansive life and ethics without sanction. A youthful moustached scholar in a simple late-19th-century coat teaches in an open garden pavilion. From an open blank notebook, branching vines, concentric circles and small figures helping one another expand outward like a living moral diagram, with no judge, throne or religious symbol present. Mood: life overflowing naturally into sympathy, creativity and social generosity rather than obeying threat.
```

### Susanne Langer — `sage/orbs/susanne-langer.png`

```text
Create “Sage: Susanne Langer,” the 20th-century American philosopher of symbolic form, art and feeling. A composed middle-aged woman scholar in restrained 1940s clothing stands between a piano, an abstract sculpture and a chalkless geometric board. Musical arcs, a mask-like shape, a scientific spiral and a clear blue diagram become different symbolic forms arranged around her hands without turning into letters or notation. Mood: rational inquiry widening to include the forms through which art makes feeling intelligible.
```

### Han Feizi — `sage/daggers/han-feizi.png`

```text
Create “Sage: Han Feizi,” the Warring States Chinese Legalist philosopher of public standards, administrative technique and positional authority. An austere ancient Chinese scholar in layered dark red robes stands behind an exact model of a fortified state. He aligns three symbolic objects—a straight measuring rule, an official seal and a balanced mechanism—while ranks of ministers become sharp silhouettes below. Bamboo slips remain blank and purely patterned. Mood: impersonal government designed to survive private virtue and concealed ministerial ambition.
```

### Baltasar Gracian — `sage/daggers/baltasar-gracian.png`

```text
Create “Sage: Baltasar Gracian,” the 17th-century Spanish moralist and author of practical prudence. A sharp-eyed Baroque scholar in a plain black coat and narrow white collar stands at the edge of a crowded court. He holds a closed red pocket book while masked courtiers exchange sealed favors behind folding screens; a mirror, chess knight and half-drawn curtain symbolize timing, concealment and measured disclosure. No cross or religious imagery. Mood: prudence as the art of surviving a hostile world by revealing neither too early nor too much.
```

### Peter Wessel Zapffe — `sage/abysses/peter-wessel-zapffe.png`

```text
Create “Sage: Peter Wessel Zapffe,” the 20th-century Norwegian philosopher and mountaineer of surplus consciousness. A lean elderly Scandinavian mountaineer in simple cold-weather clothing sits on a high bare ridge, notebook closed beside him. His small human silhouette casts an impossibly vast many-eyed shadow of awareness across the mountain, while four abstract shelters—wall, anchor stone, carnival mask and sculpted peak—cling around the void as symbolic coping strategies, with no labels. Mood: human awareness grown beyond the habitat that produced it.
```

### Giacomo Leopardi — `sage/abysses/giacomo-leopardi.png`

```text
Create “Sage: Giacomo Leopardi,” the 19th-century Italian poet-philosopher of cosmic indifference and human solidarity. A slight young Italian poet in an early-19th-century dark coat stands on a barren volcanic slope beneath an indifferent star field. He bends toward a small pale broom flower growing from ash while several distant travellers huddle together against the wind; nature appears as a vast blind black circle and broken landscape, not a deity. Mood: nature's silence answered not by illusion but by fraternity among exposed mortals.
```

### Etty Hillesum — `sage/candles/etty-hillesum.png`

```text
Create “Sage: Etty Hillesum,” the young Dutch Jewish diarist who wrote about hatred, suffering and the preservation of an inner human life during Nazi persecution. A thoughtful young woman with dark wavy hair in simple 1940s clothing writes at a small Amsterdam desk by a night window. Outside, the street narrows under oppressive abstract shadows and barred geometry; inside, a plain lamp, bowl, worn books and a tiny green branch create an uncluttered inner clearing. Her face is grave, attentive and fully aware of the danger, never sentimentalized. No Nazi symbols or camp imagery. Mood: protecting the human within oneself without sacrificing knowledge of terror outside.
```

### Jan Patocka — `sage/candles/jan-patocka.png`

```text
Create “Sage: Jan Patocka,” the 20th-century Czech philosopher of responsibility, care for the soul and the solidarity of the shaken. An elderly Central European philosopher in a plain worn coat speaks to a small circle in a modest Prague apartment seminar. A deep crack of shaken certainty runs through floor and wall, yet the listeners steady one another across it; outside the window, cold civic buildings and interrogation-room light press inward. A plain table lamp and repaired chair provide modest warmth. No political logos or readable papers. Mood: responsibility and public courage discovered after comfortable meaning breaks.
```
