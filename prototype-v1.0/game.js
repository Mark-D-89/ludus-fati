"use strict";

const RANKS = [
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "Jack" },
  { value: 12, label: "Queen" },
  { value: 13, label: "King" },
  { value: 14, label: "Ace" }
];

const SUITS = [
  {
    id: "orbs",
    name: "Orbs",
    short: "ORB",
    color: "#74c7ee",
    philosophy: "Enlightenment, reform, optimism, rights, progress"
  },
  {
    id: "daggers",
    name: "Daggers",
    short: "DAG",
    color: "#8e1f2b",
    philosophy: "Power, hierarchy, realism, strategy, inherited order"
  },
  {
    id: "abysses",
    name: "Abysses",
    short: "ABY",
    color: "#111116",
    philosophy: "Cosmic pessimism, nihilism, insignificance, despair"
  },
  {
    id: "candles",
    name: "Candles",
    short: "CAN",
    color: "#f4f1dc",
    philosophy: "Stoic endurance, tragic hope, burden-bearing, duty"
  }
];

const BRANCHES = [
  { number: 1, roman: "I", name: "The First Portico", start: 1, dilemma: 9, threshold: 6, advance: 3, retreat: 1 },
  { number: 2, roman: "II", name: "The Court of Masks", start: 10, dilemma: 18, threshold: 8, advance: 2, retreat: 1 },
  { number: 3, roman: "III", name: "The Ruined Academy", start: 19, dilemma: 27, threshold: 10, advance: 2, retreat: 2 },
  { number: 4, roman: "IV", name: "The Oracle's Stair", start: 28, dilemma: 36, threshold: 12, advance: 1, retreat: 2 },
  { number: 5, roman: "V", name: "The Black Garden", start: 37, dilemma: 46, threshold: 13, advance: 1, retreat: 3 }
];

const REVELATION_CELL = 46;
const CHECKPOINT_BRANCHES = BRANCHES.filter((branch) => branch.dilemma < REVELATION_CELL);
const REVELATION_THRESHOLD = 34;
const MAX_HAND = 15;
const STARTING_HAND_SIZE = 6;
const HAND_WINDOW_SIZE = 6;
const FIRST_DILEMMA_RETRY_HAND_SIZE = STARTING_HAND_SIZE;

const CARD_ART = {
  candles: {
    2: { title: "Marsh Pilgrim", src: "output/candle_cards/piero-warm-symbolic-2-to-5/2-of-candles-marsh-pilgrim.png" },
    3: { title: "Meagre Supper", src: "output/candle_cards/piero-warm-symbolic-2-to-5/3-of-candles-meagre-supper.png" },
    4: { title: "Night Ward", src: "output/candle_cards/piero-warm-symbolic-2-to-5/4-of-candles-night-ward.png" },
    5: { title: "Replanted Garden", src: "output/candle_cards/piero-warm-symbolic-2-to-5/5-of-candles-replanted-garden.png" },
    6: { title: "Herbal Hearth", src: "output/candle_cards/piero-warm-symbolic-remakes-6-7-8-10/6-of-candles-herbal-hearth.png" },
    7: { title: "Traveller at the Altar", src: "output/candle_cards/piero-warm-symbolic-remakes-6-7-8-10/7-of-candles-traveller-at-the-altar.png" },
    8: { title: "Snow Cloak", src: "output/candle_cards/piero-warm-symbolic-remakes-6-7-8-10/8-of-candles-snow-cloak.png" },
    9: { title: "Ascending Bell Vigil", src: "output/candle_cards/piero-warm-symbolic-6-to-10/9-of-candles-ascending-bell-vigil.png" },
    10: { title: "Shared Crust", src: "output/candle_cards/piero-warm-symbolic-remakes-6-7-8-10/10-of-candles-shared-crust.png" },
    11: { title: "Chiron", src: "output/candle_cards/piero-warm-symbolic-top-cards/11-of-candles-chiron-v2.png" },
    12: { title: "Demeter", src: "output/candle_cards/piero-warm-symbolic-top-cards/12-of-candles-demeter.png" },
    13: { title: "Epictetus & Dostoevsky", src: "output/candle_cards/piero-warm-symbolic-top-cards/13-of-candles-epictetus-dostoevsky.png" },
    14: { title: "The Salamander", src: "output/candle_cards/piero-warm-symbolic-top-cards/14-of-candles-salamander.png" }
  },
  orbs: {
    2: { title: "Orb II", src: "output/imagegen/orb-cards/orb-rank-02.png" },
    3: { title: "Orb III", src: "output/imagegen/orb-cards/orb-rank-03.png" },
    4: { title: "Orb IV", src: "output/imagegen/orb-cards/orb-rank-04.png" },
    5: { title: "Orb V", src: "output/imagegen/orb-cards/orb-rank-05.png" },
    6: { title: "Orb VI", src: "output/imagegen/orb-cards/orb-rank-06.png" },
    7: { title: "Orb VII", src: "output/imagegen/orb-cards/orb-rank-07.png" },
    8: { title: "Orb VIII", src: "output/imagegen/orb-cards/orb-rank-08.png" },
    9: { title: "Orb IX", src: "output/imagegen/orb-cards/orb-rank-09.png" },
    10: { title: "Orb X", src: "output/imagegen/orb-cards/orb-rank-10.png" },
    11: { title: "Apollo", src: "output/imagegen/orb-cards/orb-rank-11.png" },
    12: { title: "Athena", src: "output/imagegen/orb-cards/orb-rank-12.png" },
    13: { title: "Condorcet & Kant", src: "output/imagegen/orb-cards/orb-rank-13-nametags.png" },
    14: { title: "The Owl on the Orb", src: "output/imagegen/orb-cards/orb-rank-14.png" }
  },
  daggers: {
    2: { title: "Cellar Dossier II", src: "output/imagegen/daggers-conspiracy-boards/2-of-daggers-conspiracy-board-varied.png" },
    3: { title: "Cellar Dossier III", src: "output/imagegen/daggers-conspiracy-boards/3-of-daggers-conspiracy-board-varied-corrected.png" },
    4: { title: "Cellar Dossier IV", src: "output/imagegen/daggers-conspiracy-boards/4-of-daggers-conspiracy-board-varied.png" },
    5: { title: "Cellar Dossier V", src: "output/imagegen/daggers-conspiracy-boards/5-of-daggers-conspiracy-board-varied.png" },
    6: { title: "Cellar Dossier VI", src: "output/imagegen/daggers-conspiracy-boards/6-of-daggers-conspiracy-board-varied-corrected.png" },
    7: { title: "Cellar Dossier VII", src: "output/imagegen/daggers-conspiracy-boards/7-of-daggers-conspiracy-board-varied.png" },
    8: { title: "Cellar Dossier VIII", src: "output/imagegen/daggers-conspiracy-boards/8-of-daggers-conspiracy-board-varied.png" },
    9: { title: "Cellar Dossier IX", src: "output/imagegen/daggers-conspiracy-boards/9-of-daggers-conspiracy-board-varied-corrected.png" },
    10: { title: "Cellar Dossier X", src: "output/imagegen/daggers-conspiracy-boards/10-of-daggers-conspiracy-board-varied.png" },
    11: { title: "Mars", src: "output/imagegen/daggers-conspiracy-boards/11-of-daggers-conspiracy-board.png" },
    12: { title: "Hera", src: "output/imagegen/daggers-conspiracy-boards/12-of-daggers-conspiracy-board.png" },
    13: { title: "Machiavelli & Hobbes", src: "output/imagegen/daggers-conspiracy-boards/13-of-daggers-machiavelli-hobbes.png" },
    14: { title: "The Wolf and the Dagger", src: "output/imagegen/daggers-conspiracy-boards/14-of-daggers-conspiracy-board.png" }
  },
  abysses: {
    2: { title: "Abyss II", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-02.png" },
    3: { title: "Abyss III", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-03.png" },
    4: { title: "Abyss IV", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-04.png" },
    5: { title: "Abyss V", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-05.png" },
    6: { title: "Abyss VI", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-06.png" },
    7: { title: "Abyss VII", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-07.png" },
    8: { title: "Abyss VIII", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-08.png" },
    9: { title: "Abyss IX", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-09.png" },
    10: { title: "Abyss X", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-10.png" },
    11: { title: "Hades", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-11-v2.png" },
    12: { title: "Hecate", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-12.png" },
    13: { title: "Lovecraft & Schopenhauer", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-13.png" },
    14: { title: "Zapffe's Elk", src: "output/imagegen/abyss-cards/chaotic/final/abyss-rank-14.png" }
  }
};

const CARD_DESCRIPTIONS = {
  orbs: {
    2: "A better possibility is glimpsed, then quietly entertained.",
    3: "One old assumption loosens, and the mind discovers room to grow.",
    4: "Reason tests a comforting certainty and finds a truer answer beyond it.",
    5: "Knowledge becomes a promise that tomorrow need not repeat yesterday.",
    6: "The self is treated as unfinished: capable of discipline, learning, and change.",
    7: "Human limits are studied not as verdicts, but as invitations to improve.",
    8: "Suffering is examined as a problem intelligence and compassion might yet diminish.",
    9: "The future ceases to be fate and becomes a horizon shaped by conscious effort.",
    10: "Every inherited certainty is challenged by the possibility of a wiser humanity.",
    11: "The seeker risks peace and certainty to prove that people can become more than they are.",
    12: "Compassion joins reason, seeking progress that leaves no soul diminished.",
    13: "Humanity takes its own nature in hand and begins the long work of remaking it.",
    14: "Perfect reason resolves to free humanity from ignorance, suffering, and every limit it once called natural."
  },
  daggers: {
    2: "You notice who speaks first and keep your own counsel.",
    3: "A minor favor is banked for the hour it becomes leverage.",
    4: "The room is mapped by loyalties, debts, and quiet fears.",
    5: "One rival is isolated without anyone appearing to draw a blade.",
    6: "Mercy is granted where it purchases more than punishment.",
    7: "A useful truth is released precisely when it wounds the strongest opponent.",
    8: "Allies become offices; promises become chains of command.",
    9: "Order is secured by making disobedience more costly than surrender.",
    10: "The mask comes off: legitimacy belongs to whoever can enforce it.",
    11: "The strategist spends friendship, honor, and truth to seize the decisive hour.",
    12: "Every tenderness is mastered until even love serves the design.",
    13: "The state speaks with one will, and every lesser will kneel.",
    14: "Power crowns itself the only law and calls the silence peace."
  },
  abysses: {
    2: "A small doubt lingers after every comforting answer.",
    3: "The stars seem farther away than they did yesterday.",
    4: "Meaning thins at the edges, though the day proceeds.",
    5: "Every triumph casts the shadow of its eventual erasure.",
    6: "The self is glimpsed as a brief accident wearing a name.",
    7: "Hope continues speaking, but the void has learned its language.",
    8: "History contracts to dust between two immensities of silence.",
    9: "Love, law, and memory appear as ornaments on a sinking world.",
    10: "Nothing promises that consciousness was anything but nature's wound.",
    11: "The seeker laughs at salvation and walks willingly beyond consolation.",
    12: "All meanings are unmade, including the meaning of despair.",
    13: "Existence is judged without appeal—and found innocent only because it is empty.",
    14: "The abyss consumes even nothingness; there is no witness left to mourn."
  },
  candles: {
    2: "You bear one small discomfort without making it another person's burden.",
    3: "The task is modest, thankless, and done before dawn.",
    4: "Grief is given a chair, but not command of the house.",
    5: "You keep the promise after its warmth has left you.",
    6: "Pain becomes discipline: breathe, stand, and take the next necessary step.",
    7: "You shoulder another's portion, knowing no witness may remember.",
    8: "The long defeat is met with clean hands and an unbroken word.",
    9: "You choose duty though it closes every easier road.",
    10: "The flame is carried into ruin because someone must arrive still human.",
    11: "The guardian accepts disgrace, exhaustion, and loss without surrendering the watch.",
    12: "Compassion endures beyond hope, asking no reward from the wounded world.",
    13: "One life becomes a wall behind which countless fragile lives may continue.",
    14: "You carry the whole night alone—and still protect the final flame."
  }
};

const DRAW_FLAVORS = {
  orbs: {
    low: [
      ["A Passing Thought", "A pale idea crosses the mind and leaves a clean line behind it."],
      ["A Child's Question", "A simple question makes the world appear improvable again."],
      ["A Clear Margin", "A note in the margin restores faith in order and explanation."]
    ],
    middle: [
      ["A Geometer's Margin", "A proof half-forgotten returns with patient blue light."],
      ["A Lawgiver's Draft", "An unfinished civic plan promises dignity in place of fear."],
      ["A Lamp in the Lecture Hall", "A calm argument survives the noise around it."]
    ],
    high: [
      ["The Blueprint of a Just City", "You glimpse a city built from reform, reason, and public mercy."],
      ["The Republic of Morning", "The horizon opens like a law written for every human hand."],
      ["The Orb Above the Tribunal", "Judgement turns from vengeance toward a lucid common good."]
    ]
  },
  daggers: {
    low: [
      ["A Hard Lesson", "A small humiliation teaches more than a generous lecture."],
      ["A Whispered Bargain", "Someone explains the price of innocence with perfect manners."],
      ["A Soldier's Joke", "The joke is cruel, but it understands the room."]
    ],
    middle: [
      ["A Tyrant's Ledger", "Names and debts arrange themselves more honestly than slogans."],
      ["The Mask Behind the Mask", "You find a second intention beneath the declared one."],
      ["The General's Cup", "Victory tastes metallic before it tastes sweet."]
    ],
    high: [
      ["The Knife Behind the Senate", "The law speaks loudly while power decides in a lower voice."],
      ["The Iron Tutor", "The lesson is severe enough to outlive sympathy."],
      ["The Red Seal", "A necessary cruelty is stamped before the ink can tremble."]
    ]
  },
  abysses: {
    low: [
      ["A Crack in the Sky", "For one instant the dome above the world looks painted."],
      ["An Empty Echo", "A question returns without answer, and the silence feels exact."],
      ["A Cold Star", "The night does not threaten you. It simply does not notice."]
    ],
    middle: [
      ["A Starless Diagram", "The pattern is perfect, and contains no place for human need."],
      ["The Sea Under the Shrine", "Beneath the sacred stones, black water moves without intention."],
      ["The Mathematician's Despair", "The numbers continue beautifully after meaning has stopped."]
    ],
    high: [
      ["The Silence Beneath the Gods", "A deeper quiet waits under every divine name."],
      ["The Mouth of Nothing", "You hear no prophecy, only the absence that permits prophecy."],
      ["The Unmeasured Dark", "The universe widens until the self becomes a brief error of scale."]
    ]
  },
  candles: {
    low: [
      ["A Small Vow", "A promise is made without witnesses, and still it binds."],
      ["Warm Ash", "Something almost extinguished remembers the shape of flame."],
      ["Bread for Another", "A minor sacrifice steadies the hand that offers it."]
    ],
    middle: [
      ["A Vigil Before Dawn", "You keep watch because the night has not yet won."],
      ["The Burden Chosen Twice", "The same weight returns, and this time you lift it knowingly."],
      ["A Stoic's Bowl", "Plain food, plain words, and no excuse left unused."]
    ],
    high: [
      ["The Last Flame in the Temple", "The roof has fallen, but one light still names the room."],
      ["The Tiger Ridden", "You cannot tame the world, so you learn to remain mounted."],
      ["The Stone Carried Upward", "No proof arrives. The burden remains. You take it anyway."]
    ]
  }
};

const LOSE_FLAVORS = {
  orbs: [
    ["Chaotic Thoughts", "The mind loses patience with structure and scatters its blue certainties."],
    ["Mockery of Ideals", "A clever sneer bruises the dream of human improvement."],
    ["The Corrupted Forum", "Public reason becomes theater, and one clear hope is lost."]
  ],
  daggers: [
    ["Yearning for Innocence", "You tire of calculation and misplace a useful cruelty."],
    ["Disgust With Power", "The hand opens. A hard advantage falls away."],
    ["The Mercy You Did Not Plan", "A sudden softness breaks the red geometry of control."]
  ],
  abysses: [
    ["Passing Hope", "A human voice interrupts the black conclusion."],
    ["Sudden Beauty", "The void loses one of its witnesses to an undeserved sunrise."],
    ["A Face Remembered", "Someone loved you once, and despair briefly loses authority."]
  ],
  candles: [
    ["Pangs of Despair", "The burden feels absurd, then heavier than before."],
    ["Exhaustion at Noon", "The body refuses the sermon of endurance."],
    ["Ridicule of Duty", "A laugh in the corridor makes the small flame flicker."]
  ]
};

const ADVANCE_FLAVORS = [
  ["A Day of Fasting", "Appetite loosens its grip. The path shortens."],
  ["A Walk in the Woods", "No doctrine follows you beneath the trees."],
  ["The Cold Bath Before Sunrise", "The body wakes sharply, and thought becomes clean."],
  ["A Silent Hour Beneath the Portico", "The crowd recedes. The next stones seem nearer."],
  ["Bread, Water, and a Clean Thought", "Simplicity makes the road less crowded."]
];

const RETREAT_FLAVORS = [
  ["A Fine Meal", "Comfort sweetens the air, and the path behind you calls."],
  ["A Glass of Wine", "The argument softens at the edges."],
  ["The Cushioned Couch", "A doctrine of rest persuades the limbs before the mind."],
  ["Perfume in the Afternoon", "The day becomes pleasant enough to forget its question."],
  ["Applause at the Wrong Moment", "Praise catches the seeker by the sleeve."]
];

const REST_FLAVORS = [
  ["A Bowl of Still Water", "No school, no master, no thesis. Only the surface settling."],
  ["Breath Before Thought", "A clean interval opens before language returns."],
  ["The Empty Bench", "Nothing is solved. Nothing is demanded."],
  ["A White Stone in the Hand", "The stone means nothing, and for once that is enough."],
  ["Clear Air", "The mind does not rise or fall. It simply clears."]
];

const CELL_ART = {
  advance: {
    "A Day of Fasting": { title: "A Day of Fasting", src: "output/imagegen/advance-cards/01-a-day-of-fasting.png" },
    "A Walk in the Woods": { title: "A Walk in the Woods", src: "output/imagegen/advance-cards/02-a-walk-in-the-woods.png" },
    "The Cold Bath Before Sunrise": { title: "The Cold Bath Before Sunrise", src: "output/imagegen/advance-cards/03-the-cold-bath-before-sunrise.png" },
    "A Silent Hour Beneath the Portico": { title: "A Silent Hour Beneath the Portico", src: "output/imagegen/advance-cards/04-a-silent-hour-beneath-the-portico.png" },
    "Bread, Water, and a Clean Thought": { title: "Bread, Water, and a Clean Thought", src: "output/imagegen/advance-cards/05-bread-water-and-a-clean-thought.png" }
  },
  retreat: {
    "A Fine Meal": { title: "A Fine Meal", src: "output/imagegen/retreat-cards/01-a-fine-meal.png" },
    "A Glass of Wine": { title: "A Glass of Wine", src: "output/imagegen/retreat-cards/02-a-glass-of-wine.png" },
    "The Cushioned Couch": { title: "The Cushioned Couch", src: "output/imagegen/retreat-cards/03-the-cushioned-couch.png" },
    "Perfume in the Afternoon": { title: "Perfume in the Afternoon", src: "output/imagegen/retreat-cards/04-perfume-in-the-afternoon.png" },
    "Applause at the Wrong Moment": { title: "Applause at the Wrong Moment", src: "output/imagegen/retreat-cards/05-applause-at-the-wrong-moment.png" }
  },
  rest: {
    "A Bowl of Still Water": { title: "A Bowl of Still Water", src: "output/imagegen/rest-cards/01-a-bowl-of-still-water.png" },
    "Breath Before Thought": { title: "Breath Before Thought", src: "output/imagegen/rest-cards/02-breath-before-thought.png" },
    "The Empty Bench": { title: "The Empty Bench", src: "output/imagegen/rest-cards/03-the-empty-bench.png" },
    "A White Stone in the Hand": { title: "A White Stone in the Hand", src: "output/imagegen/rest-cards/04-a-white-stone-in-the-hand.png" },
    "Clear Air": { title: "Clear Air", src: "output/imagegen/rest-cards/05-clear-air.png" }
  },
  loss: {
    "Chaotic Thoughts": { title: "Chaotic Thoughts", src: "output/imagegen/loss-cards/01-orbs-lost-chaotic-thoughts.png" },
    "Mockery of Ideals": { title: "Mockery of Ideals", src: "output/imagegen/loss-cards/02-orbs-lost-mockery-of-ideals.png" },
    "The Corrupted Forum": { title: "The Corrupted Forum", src: "output/imagegen/loss-cards/03-orbs-lost-the-corrupted-forum.png" },
    "Yearning for Innocence": { title: "Yearning for Innocence", src: "output/imagegen/loss-cards/04-daggers-lost-yearning-for-innocence.png" },
    "Disgust With Power": { title: "Disgust With Power", src: "output/imagegen/loss-cards/05-daggers-lost-disgust-with-power.png" },
    "The Mercy You Did Not Plan": { title: "The Mercy You Did Not Plan", src: "output/imagegen/loss-cards/06-daggers-lost-the-mercy-you-did-not-plan.png" },
    "Passing Hope": { title: "Passing Hope", src: "output/imagegen/loss-cards/07-abysses-lost-passing-hope.png" },
    "Sudden Beauty": { title: "Sudden Beauty", src: "output/imagegen/loss-cards/08-abysses-lost-sudden-beauty.png" },
    "A Face Remembered": { title: "A Face Remembered", src: "output/imagegen/loss-cards/09-abysses-lost-a-face-remembered.png" },
    "Pangs of Despair": { title: "Pangs of Despair", src: "output/imagegen/loss-cards/10-candles-lost-pangs-of-despair.png" },
    "Exhaustion at Noon": { title: "Exhaustion at Noon", src: "output/imagegen/loss-cards/11-candles-lost-exhaustion-at-noon.png" },
    "Ridicule of Duty": { title: "Ridicule of Duty", src: "output/imagegen/loss-cards/12-candles-lost-ridicule-of-duty.png" }
  }
};

const CODEX_SUIT_ART = {
  orbs: { title: "The Orbs", src: "assets/codex-suits/orbs.jpg" },
  daggers: { title: "The Daggers", src: "assets/codex-suits/daggers.jpg" },
  abysses: { title: "The Abysses", src: "assets/codex-suits/abysses.jpg" },
  candles: { title: "The Candles", src: "assets/codex-suits/candles.jpg" }
};

const OPPOSITE_SUITS = {
  orbs: "daggers",
  daggers: "orbs",
  abysses: "candles",
  candles: "abysses"
};

const STRANGERS = [
  {
    name: "Victor Frankenstein",
    source: "a laboratory tale",
    suit: "orbs",
    line: "I desired the acquisition of knowledge.",
    intro: "A pale student stands beside covered instruments, still believing discovery can redeem horror.",
    criticism: {
      daggers: "He calls power without responsibility a fever wearing a crown.",
      abysses: "He refuses the void's last word, even after hearing it breathe.",
      candles: "He doubts that endurance alone can absolve a maker."
    }
  },
  {
    name: "Prospero",
    source: "an island play",
    suit: "orbs",
    line: "The rarer action is in virtue.",
    intro: "A robed exile lowers his staff and measures revenge against instruction.",
    criticism: {
      daggers: "He rebukes rule by fear as a lesser art than forgiveness.",
      abysses: "He calls despair another enchantment waiting to be broken.",
      candles: "He warns that suffering can become a private kingdom."
    }
  },
  {
    name: "Louise Banks",
    source: "an arrival beneath twelve vessels",
    suit: "orbs",
    line: "If you could see your whole life, would you change things?",
    intro: "A linguist stands before a transparent circle, patient enough to let an alien grammar rearrange time.",
    criticism: {
      daggers: "She calls coercion a failure to imagine what another mind can mean.",
      abysses: "She refuses despair when understanding can widen the shape of a life.",
      candles: "She warns that endurance without interpretation merely repeats the old sentence."
    }
  },
  {
    name: "Aloy",
    source: "a machine-haunted frontier",
    suit: "orbs",
    line: "Being smart will count for nothing if you don't make the world better.",
    intro: "A red-haired hunter studies a luminous ruin, turning inherited mystery into knowledge that might save strangers.",
    criticism: {
      daggers: "She distrusts power that guards truth as tribal property.",
      abysses: "She answers extinction with evidence, allies, and one more climb.",
      candles: "She questions duty that preserves a lie merely because ancestors carried it."
    }
  },
  {
    name: "Hari Seldon",
    source: "a galactic foundation",
    suit: "orbs",
    line: "Violence is the last refuge of the incompetent.",
    intro: "An old mathematician draws the long curve of an empire's fall and marks a smaller future inside it.",
    criticism: {
      daggers: "He calls force the expensive confession of failed foresight.",
      abysses: "He treats collapse as a problem of scale, not a reason to abandon posterity.",
      candles: "He warns that brave endurance without a plan can lengthen the darkness."
    }
  },
  {
    name: "Hermione Granger",
    source: "a school of hidden corridors",
    suit: "orbs",
    line: "Books! And cleverness! There are more important things.",
    intro: "A young witch closes a heavy book and steps between inherited rules and the people those rules diminish.",
    criticism: {
      daggers: "She rejects authority that mistakes inherited privilege for merit.",
      abysses: "She refuses cynicism while one fact remains undiscovered and one wrong remains repairable.",
      candles: "She insists that loyal endurance must sometimes become organized change."
    }
  },
  {
    name: "Odysseus",
    source: "an old sea-road",
    suit: "daggers",
    line: "No man is my name.",
    intro: "A salt-dark captain smiles as if every truth needs a second door.",
    criticism: {
      orbs: "He laughs at clean ideals that never had to pass a monster's cave.",
      abysses: "He rejects surrender to the dark while tricks remain unspent.",
      candles: "He calls noble endurance wasteful when cunning would suffice."
    }
  },
  {
    name: "Lady Macbeth",
    source: "a blood-warm tragedy",
    suit: "daggers",
    line: "Look like the innocent flower.",
    intro: "A queen with sleepless hands speaks softly of masks and thresholds.",
    criticism: {
      orbs: "She cuts through public virtue and asks who profits from its smile.",
      abysses: "She scorns paralysis before the void as cowardice in mourning clothes.",
      candles: "She calls burden-bearing a servant's virtue when crowns are at stake."
    }
  },
  {
    name: "Paul Atreides",
    source: "a desert of possible futures",
    suit: "daggers",
    line: "He who can destroy a thing controls a thing.",
    intro: "A desert heir watches possible futures converge upon a throne he already knows is a trap.",
    criticism: {
      orbs: "He calls universal plans blind when they ignore who commands the water.",
      abysses: "He refuses emptiness as long as fear can be disciplined into sight.",
      candles: "He warns that duty can become the noblest mask worn by conquest."
    }
  },
  {
    name: "Kreia",
    source: "an old war in a distant galaxy",
    suit: "daggers",
    line: "It is such a quiet thing, to fall.",
    intro: "A blind exile listens beside a ruined academy, tugging unseen threads in every allegiance.",
    criticism: {
      orbs: "She exposes benevolence that keeps its recipients weak.",
      abysses: "She rejects surrender to fate even while speaking in its shadow.",
      candles: "She calls unquestioned loyalty a chain polished by affection."
    }
  },
  {
    name: "GLaDOS",
    source: "a buried test facility",
    suit: "daggers",
    line: "The best solution to a problem is usually the easiest one.",
    intro: "A suspended machine speaks with clinical courtesy while every door becomes leverage.",
    criticism: {
      orbs: "She reduces humane ideals to variables that may be discarded.",
      abysses: "She regards despair as another condition to exploit, not a conclusion.",
      candles: "She mocks perseverance when compliance would finish the test sooner."
    }
  },
  {
    name: "Lady Eboshi",
    source: "an iron town at the forest's edge",
    suit: "daggers",
    line: "Now watch closely. I will show you how to kill a god.",
    intro: "An iron-town ruler raises a new weapon, protecting the outcast with the same hand that wounds the forest.",
    criticism: {
      orbs: "She calls reconciliation a luxury purchased by workers others refuse to see.",
      abysses: "She treats destruction as material from which another wall can be built.",
      candles: "She insists care without power leaves dependents at the mercy of stronger houses."
    }
  },
  {
    name: "Hamlet",
    source: "a court of rot",
    suit: "abysses",
    line: "Words, words, words.",
    intro: "A prince in black studies the air as if every sentence has already decayed.",
    criticism: {
      orbs: "He finds reform absurd when the grave keeps perfect accounts.",
      daggers: "He mocks strategy that cannot outwit mortality.",
      candles: "He suspects endurance is only delay dressed as dignity."
    }
  },
  {
    name: "Captain Ahab",
    source: "a white horizon",
    suit: "abysses",
    line: "All visible objects are pasteboard masks.",
    intro: "A scarred captain points beyond the world as if hatred could pierce its wall.",
    criticism: {
      orbs: "He calls progress a painted deck above an unfathomed sea.",
      daggers: "He despises small power for bargaining with the surface.",
      candles: "He rejects humble duty as surrender to the mask."
    }
  },
  {
    name: "K",
    source: "a rain-bound future",
    suit: "abysses",
    line: "All the best memories are hers.",
    intro: "A replicant officer stands in amber snow, uncertain whether his most human memory belongs to him.",
    criticism: {
      orbs: "He doubts reforms that reserve personhood for those who wrote the test.",
      daggers: "He sees control manufacturing rebels by first manufacturing souls.",
      candles: "He asks whether duty remains sacred when every memory supporting it was planted."
    }
  },
  {
    name: "The Nameless One",
    source: "a city at the center of planes",
    suit: "abysses",
    line: "What can change the nature of a man?",
    intro: "An immortal scarred wanderer wakes beside another life's notes and learns that forgetting never cancels consequence.",
    criticism: {
      orbs: "He laughs at clean improvement when each new self inherits an unpaid ruin.",
      daggers: "He knows domination cannot master the selves it creates.",
      candles: "He warns that endurance can become a sentence imposed on everyone nearby."
    }
  },
  {
    name: "Harry Du Bois",
    source: "a rain-sick district by the sea",
    suit: "abysses",
    line: "Something beautiful is going to happen.",
    intro: "A ruined detective searches a dead commercial district for a truth large enough to survive himself.",
    criticism: {
      orbs: "He finds every shining system already arguing inside a hangover.",
      daggers: "He sees authority lose its badge whenever it forgets the human body.",
      candles: "He suspects persistence can be only another way to postpone the verdict."
    }
  },
  {
    name: "Meursault",
    source: "a white noon beside the sea",
    suit: "abysses",
    line: "I opened myself to the gentle indifference of the world.",
    intro: "A clerk stands beneath a merciless sun, estranged from the meanings others insist he perform.",
    criticism: {
      orbs: "He finds universal ideals distant beneath the immediate heat of existence.",
      daggers: "He refuses to pretend power makes the universe answer.",
      candles: "He questions whether duty spoken without felt meaning is more than theater."
    }
  },
  {
    name: "Antigone",
    source: "a city before dawn",
    suit: "candles",
    line: "I will bury him myself.",
    intro: "A young woman stands before the law with dust already on her hands.",
    criticism: {
      orbs: "She warns that civic order can forget the sacred dead.",
      daggers: "She condemns power when it commands the soul to shrink.",
      abysses: "She refuses a darkness that cancels duty."
    }
  },
  {
    name: "Aeneas",
    source: "a burning city",
    suit: "candles",
    line: "I carry my father.",
    intro: "A refugee lifts an old man from flame and calls the burden a road.",
    criticism: {
      orbs: "He doubts any future that forgets what had to be carried into it.",
      daggers: "He rebukes ambition when it abandons the household gods.",
      abysses: "He answers cosmic ruin by walking anyway."
    }
  },
  {
    name: "Samwise Gamgee",
    source: "a long road into shadow",
    suit: "candles",
    line: "There's some good in this world, and it's worth fighting for.",
    intro: "A small gardener shoulders another traveller on the last black slope, carrying hope after hope has lost its argument.",
    criticism: {
      orbs: "He reminds reformers that no future survives without ordinary hands and meals.",
      daggers: "He rejects victories that turn the bearer into the thing resisted.",
      abysses: "He answers the dark with one more step taken for a friend."
    }
  },
  {
    name: "Imperator Furiosa",
    source: "a road across the wasteland",
    suit: "candles",
    line: "We're going to the Green Place.",
    intro: "A one-armed driver turns a war engine away from tyranny and makes escape into a promise shared.",
    criticism: {
      orbs: "She distrusts plans that cannot carry bodies through the desert.",
      daggers: "She turns command against the ruler who mistook people for fuel.",
      abysses: "She refuses the wasteland's claim that nothing green can return."
    }
  },
  {
    name: "Lee Everett",
    source: "a road among the dead",
    suit: "candles",
    line: "Keep that hair short.",
    intro: "A condemned teacher kneels in a ruined town to teach a child how to live after he can no longer protect her.",
    criticism: {
      orbs: "He knows principles must survive contact with hunger, fear, and one frightened child.",
      daggers: "He rejects leadership that counts the vulnerable as expendable.",
      abysses: "He measures meaning by the life that continues after his own ends."
    }
  },
  {
    name: "Kim Kitsuragi",
    source: "a rain-sick district by the sea",
    suit: "candles",
    line: "Sunrise, parabellum.",
    intro: "A precise lieutenant checks his notebook at dawn and remains beside a partner whom evidence has not yet redeemed.",
    criticism: {
      orbs: "He trusts facts, but not systems that mistake procedure for justice.",
      daggers: "He uses authority as a tool and refuses to make it an appetite.",
      abysses: "He answers humiliation and failure by returning to the case in the morning."
    }
  }
];

const SAGES = [
  {
    name: "Condorcet",
    suit: "orbs",
    intro: "The mathematician of progress unfolds a chart of human improvement.",
    question: "If ignorance is historical rather than eternal, what duty follows from knowledge?",
    positive: "He accepts the answer as faith in educable humanity.",
    opposite: "He calls the cult of power a confession of civic despair.",
    neutral: "He hears the answer politely, but no theorem moves."
  },
  {
    name: "Mary Wollstonecraft",
    suit: "orbs",
    intro: "A sharp-eyed reformer asks whether dignity can be partial and still be dignity.",
    question: "What becomes of virtue when reason is denied to half the species?",
    positive: "She names the answer an argument for universal cultivation.",
    opposite: "She rejects inherited hierarchy as custom pretending to be nature.",
    neutral: "The answer touches the room, but not the question's root."
  },
  {
    name: "Jean-Marie Guyau",
    suit: "orbs",
    intro: "A young philosopher of expansive life sketches an ethics that needs neither threat nor supernatural reward.",
    question: "If life overflows into sympathy and creation, why must morality begin with command?",
    positive: "He receives the answer as ethics growing freely from abundant human powers.",
    opposite: "He rejects coercion as a poor substitute for moral fecundity.",
    neutral: "The answer is alive, but it does not yet cross into another life."
  },
  {
    name: "Susanne Langer",
    suit: "orbs",
    intro: "A philosopher of symbols arranges music, image, and language as different forms of human feeling.",
    question: "What can a symbol disclose that a literal proposition cannot contain?",
    positive: "She accepts the answer as reason widening beyond discursive speech.",
    opposite: "She warns that power flattens meaning when every symbol becomes an instrument.",
    neutral: "The form is perceived, but its significance remains suspended."
  },
  {
    name: "Machiavelli",
    suit: "daggers",
    intro: "The secretary of hard republics waits with a red-bound notebook.",
    question: "When mercy endangers the city, what must a ruler love more than innocence?",
    positive: "He nods at the answer's disciplined cruelty.",
    opposite: "He calls bright ideals decorations on someone else's fortress.",
    neutral: "He closes the notebook without praise or punishment."
  },
  {
    name: "Hobbes",
    suit: "daggers",
    intro: "A severe theorist listens for the sound of civil war under polite speech.",
    question: "What power keeps fear from turning every hand against every throat?",
    positive: "He accepts the answer as a sober covenant with force.",
    opposite: "He criticizes optimism that forgets the wolf at the door.",
    neutral: "The answer is noted, then swallowed by the Leviathan's shadow."
  },
  {
    name: "Han Feizi",
    suit: "daggers",
    intro: "A Legalist scholar places law, method, and authority where trust once sat.",
    question: "When private virtue cannot secure the state, what makes office answerable to rule?",
    positive: "He approves the answer's impersonal machinery of command.",
    opposite: "He calls benevolent ideals invitations for ministers to disguise ambition.",
    neutral: "He records the answer, but finds no handle by which a ruler might use it."
  },
  {
    name: "Baltasar Gracian",
    suit: "daggers",
    intro: "A moralist of courts turns prudence into an art of timing, concealment, and measure.",
    question: "What must remain hidden when the world rewards appearances before substance?",
    positive: "He praises the answer for revealing only what the hour can bear.",
    opposite: "He calls transparent idealism virtue left unguarded in a crowded court.",
    neutral: "He admires the phrasing, then withholds the key."
  },
  {
    name: "Schopenhauer",
    suit: "abysses",
    intro: "A pessimist looks past the candle and sees appetite without end.",
    question: "If desire renews suffering, what remains of all promised satisfaction?",
    positive: "He receives the answer as a clear look at the will's machinery.",
    opposite: "He dismisses tragic hope as a lullaby sung by the will itself.",
    neutral: "The answer passes like music in another room."
  },
  {
    name: "Mainlander",
    suit: "abysses",
    intro: "A philosopher of extinction speaks as if creation itself were exhaustion.",
    question: "If being spends itself toward silence, what comfort can endure?",
    positive: "He grants that the answer has looked directly at negation.",
    opposite: "He calls endurance a delay in the universe's long fatigue.",
    neutral: "No verdict comes; only the air grows colder."
  },
  {
    name: "Peter Wessel Zapffe",
    suit: "abysses",
    intro: "A Norwegian pessimist looks from the mountain toward a consciousness too large for its habitat.",
    question: "If awareness exceeds what life can bear, which shelter is honesty and which is evasion?",
    positive: "He accepts the answer as lucid knowledge of consciousness's surplus.",
    opposite: "He calls steadfast hope a noble fastening over an abyss that remains.",
    neutral: "The answer echoes off the rock without changing the altitude."
  },
  {
    name: "Giacomo Leopardi",
    suit: "abysses",
    intro: "A poet of cosmic indifference listens for human fellowship inside nature's silence.",
    question: "If nature neither hates nor loves us, what bond can suffering create among the abandoned?",
    positive: "He receives the answer as fraternity without illusion.",
    opposite: "He rejects duty when it flatters providence instead of consoling mortals.",
    neutral: "The verse is beautiful, but the desert stays unmoved."
  },
  {
    name: "Epictetus",
    suit: "candles",
    intro: "A former slave asks for the one thing no tyrant can confiscate.",
    question: "What remains yours when fortune takes body, praise, and station?",
    positive: "He accepts the answer as discipline over what is truly one's own.",
    opposite: "He rebukes despair for surrendering the citadel within.",
    neutral: "He lets the answer stand, neither rejected nor crowned."
  },
  {
    name: "Marcus Aurelius",
    suit: "candles",
    intro: "An emperor writes by campaign light and does not ask the world to be gentle.",
    question: "What does duty require when the morning brings pain, fools, and decay?",
    positive: "He receives the answer as work fit for a rational soul.",
    opposite: "He criticizes nihilism for confusing vastness with permission to fall.",
    neutral: "The answer is placed among many exercises and left there."
  },
  {
    name: "Etty Hillesum",
    suit: "candles",
    intro: "A young diarist in a time of persecution tends an inner clearing without denying the surrounding terror.",
    question: "How can one protect the human in oneself when hatred has become public weather?",
    positive: "She accepts the answer as inward work made responsible to others.",
    opposite: "She refuses despair when it merely gives the persecutor another room to occupy.",
    neutral: "The answer is held quietly, but does not yet become shelter."
  },
  {
    name: "Jan Patocka",
    suit: "candles",
    intro: "A Czech philosopher of responsibility speaks from the solidarity discovered when certainty is shaken.",
    question: "What obligation appears when comfortable meaning collapses and others remain exposed beside us?",
    positive: "He receives the answer as care for the soul becoming public courage.",
    opposite: "He warns that nihilism can become an alibi for abandoning the shaken.",
    neutral: "The answer stands at the threshold but does not join the vigil."
  }
];

const RELICS = [
  { suit: "orbs", title: "The Civic Compass", description: "A blue needle turns toward the nearest unfinished reform." },
  { suit: "orbs", title: "The Glass Astrolabe", description: "Transparent circles promise that the heavens can be understood." },
  { suit: "daggers", title: "The Iron Diadem", description: "Its inner rim is worn smooth by the brows of frightened rulers." },
  { suit: "daggers", title: "The Red Ledger", description: "Every mercy is entered beside its hidden price." },
  { suit: "abysses", title: "The Basalt Mirror", description: "It reflects the viewer as a temporary arrangement of dust." },
  { suit: "abysses", title: "The Unlit Star Map", description: "No constellation is named, yet the black points are exact." },
  { suit: "candles", title: "The Traveler's Candle", description: "Its flame leans against wind that should have killed it." },
  { suit: "candles", title: "The Cracked Stoic Bowl", description: "The bowl is chipped, clean, and sufficient." }
];

const TEXTS = [
  { suit: "orbs", title: "A Charter in Blue Ink", description: "The fragment argues that dignity grows when it is distributed." },
  { suit: "orbs", title: "The Geometer's Petition", description: "A proof becomes a plea for equal measure." },
  { suit: "daggers", title: "Commentary on Princes", description: "The margins are filled with victories no statue commemorates." },
  { suit: "daggers", title: "A Manual of Necessary Masks", description: "Every paragraph advises a different face." },
  { suit: "abysses", title: "Catalogue of Dead Stars", description: "The entries continue long after prayer becomes irrelevant." },
  { suit: "abysses", title: "The Black Scholium", description: "A footnote opens beneath the page and refuses to end." },
  { suit: "candles", title: "Manual for the Last Watch", description: "Its instructions are plain: stand, breathe, carry, repeat." },
  { suit: "candles", title: "A Letter from the Ruins", description: "The handwriting shakes, but every line arrives." }
];

const TEMPTATIONS = [
  { suit: "orbs", title: "The Perfect Edict", description: "One decree promises to repair the crooked timber of humanity." },
  { suit: "daggers", title: "The Red Seal", description: "A signet ring offers obedience before anyone has to be persuaded." },
  { suit: "abysses", title: "The Final Explanation", description: "A black theorem offers relief from every smaller hope." },
  { suit: "candles", title: "The Noble Burden", description: "A voice offers meaning if you will carry more than one life can bear." }
];

const CONTRADICTIONS = [
  { suit: "orbs", title: "The Counter-Argument of Morning", description: "A clean syllogism attacks the strongest certainty in your hand." },
  { suit: "daggers", title: "The Counter-Argument of Iron", description: "A hard fact steps across the path and asks what power your belief commands." },
  { suit: "abysses", title: "The Counter-Argument of Night", description: "The sky opens its mouth around your leading doctrine." },
  { suit: "candles", title: "The Counter-Argument of Ash", description: "A small surviving flame judges the suit that has grown too comfortable." }
];

const DREAMS = [
  ["The Portico Dream", "The path appears from above, and the hand below it looks less like property than prophecy."],
  ["The Trial Without Judges", "Four empty chairs wait for doctrines that cannot all sit at once."],
  ["The Fountain Under Sleep", "Water rises from a stone mouth and names the suit you have been feeding."],
  ["The Dream of Balanced Scales", "Every card becomes a weight; every weight becomes a question."]
];

const ECHOES = [
  ["A Voice Returning", "The last card's afterimage comes back thinner, colder, and more insistent."],
  ["The Second Footstep", "Something you gained or lost repeats itself one pace behind you."],
  ["The Mirror of Yesterday", "The previous certainty looks back with a face it did not have before."]
];

const DILEMMA_ART = {
  "The Trolley Problem": {
    title: "The Trolley Problem",
    src: "output/imagegen/dilemma-stop-motion-series/01-the-trolley-problem.png"
  },
  "The Footbridge Variation": {
    title: "The Footbridge Variation",
    src: "output/imagegen/dilemma-stop-motion-series/02-the-footbridge-variation.png"
  },
  "The Murderer at the Door": {
    title: "The Murderer at the Door",
    src: "output/imagegen/dilemma-stop-motion-series/03-the-murderer-at-the-door.png"
  },
  "The Ticking-Bomb Dilemma": {
    title: "The Ticking-Bomb Dilemma",
    src: "output/imagegen/dilemma-stop-motion-series/04-the-ticking-bomb-dilemma.png"
  },
  "The Lifeboat Dilemma": {
    title: "The Lifeboat Dilemma",
    src: "output/imagegen/dilemma-stop-motion-series/05-the-lifeboat-dilemma.png"
  },
  "The Surgeon and the Five Patients": {
    title: "The Surgeon and the Five Patients",
    src: "output/imagegen/dilemma-stop-motion-series/06-the-surgeon-and-the-five-patients.png"
  },
  "The Prisoner's Dilemma": {
    title: "The Prisoner's Dilemma",
    src: "output/imagegen/dilemma-stop-motion-series/07-the-prisoners-dilemma.png"
  },
  "The Tragedy of the Commons": {
    title: "The Tragedy of the Commons",
    src: "output/imagegen/dilemma-stop-motion-series/08-the-tragedy-of-the-commons.png"
  },
  "The Dirty Hands Dilemma": {
    title: "The Dirty Hands Dilemma",
    src: "output/imagegen/dilemma-stop-motion-series/09-the-dirty-hands-dilemma.png"
  },
  "Sophie's Choice": {
    title: "Sophie's Choice",
    src: "output/imagegen/dilemma-stop-motion-series/10-sophies-choice.png"
  },
  "The Ones Who Walk Away from Omelas": {
    title: "The Ones Who Walk Away from Omelas",
    src: "output/imagegen/dilemma-stop-motion-series/11-the-ones-who-walk-away-from-omelas.png"
  },
  "The Experience Machine": {
    title: "The Experience Machine",
    src: "output/imagegen/dilemma-stop-motion-series/12-the-experience-machine.png"
  },
  "The Memory-Erasure Dilemma": {
    title: "The Memory-Erasure Dilemma",
    src: "output/imagegen/dilemma-stop-motion-series/13-the-memory-erasure-dilemma.png"
  },
  "The Just War Dilemma": {
    title: "The Just War Dilemma",
    src: "output/imagegen/dilemma-stop-motion-series/14-the-just-war-dilemma.png"
  },
  "The Whistle-Blower Dilemma": {
    title: "The Whistle-Blower Dilemma",
    src: "output/imagegen/dilemma-stop-motion-series/15-the-whistle-blower-dilemma.png"
  },
  "The Mercy-Killing Dilemma": {
    title: "The Mercy-Killing Dilemma",
    src: "output/imagegen/dilemma-stop-motion-series/16-the-mercy-killing-dilemma.png"
  },
  "The Unjust Law Dilemma": {
    title: "The Unjust Law Dilemma",
    src: "output/imagegen/dilemma-stop-motion-series/17-the-unjust-law-dilemma.png"
  },
  "The Last Copy Dilemma": {
    title: "The Last Copy Dilemma",
    src: "output/imagegen/dilemma-stop-motion-series/18-the-last-copy-dilemma.png"
  },
  "The Violinist": {
    title: "The Violinist",
    src: "output/imagegen/dilemma-stop-motion-series/19-the-violinist.png"
  },
  "Roko's Basilisk": {
    title: "Roko's Basilisk",
    src: "output/imagegen/dilemma-stop-motion-series/20-rokos-basilisk.png"
  }
};

const DILEMMAS = {
  1: [
    {
      title: "The Trolley Problem",
      description: "A switchman stands beside a brass lever while a runaway trolley screams toward five workers on the main rail.",
      prompt: "If you divert the trolley, it will kill one worker on the side track instead. Do you take the lever into your hand?",
      outcomes: {
        orbs: "You pull the lever and call the lesser harm a tragic service to the greater number.",
        daggers: "You pull because command belongs to the one willing to count the bodies before others blink.",
        abysses: "You see only arithmetic written in blood; whichever rail you choose, innocence is crushed.",
        candles: "You act, then refuse the comfort of calling the burden clean."
      }
    },
    {
      title: "The Footbridge Variation",
      description: "From a narrow bridge you see the trolley below, the five in danger, and one heavy stranger beside you.",
      prompt: "Pushing the stranger would stop the trolley. Is direct violence different from the lever, or only more honest?",
      outcomes: {
        orbs: "You refuse to make a person into a tool, even for five lives.",
        daggers: "You accept the ugliness of touch and admit that power is rarely abstract at the decisive point.",
        abysses: "You discover that numbers do not soften the hand that pushes.",
        candles: "You hold your ground, carrying both the five and the one as an unanswered grief."
      }
    },
    {
      title: "The Murderer at the Door",
      description: "A fugitive hides under your roof. A murderer arrives, calm and courteous, asking whether the victim is inside.",
      prompt: "Does truth remain sacred when truth would guide the knife?",
      outcomes: {
        orbs: "You lie to protect the vulnerable, placing dignity above a brittle rule.",
        daggers: "You lie without reverence or apology; survival has priority over ceremonial truth.",
        abysses: "You feel language become another weapon, no purer than the blade at the door.",
        candles: "You choose the protecting lie and accept the stain as part of shelter."
      }
    },
    {
      title: "The Ticking-Bomb Dilemma",
      description: "A captive knows where a hidden bomb waits. The clock is brief; the city is crowded.",
      prompt: "May cruelty be used to prevent catastrophe, or does necessity only rename the abyss?",
      outcomes: {
        orbs: "You refuse torture and seek every lawful rescue, preserving the world you hope to save.",
        daggers: "You break the captive because a city is not saved by clean hands alone.",
        abysses: "You see panic enthrone cruelty, then call it reason after the scream.",
        candles: "You choose the burden you can still answer for when the clock stops."
      }
    }
  ],
  2: [
    {
      title: "The Lifeboat Dilemma",
      description: "A lifeboat groans beneath too many survivors while the sea rises around every argument.",
      prompt: "If one person is cast overboard, the rest may live. If no one is chosen, all may drown.",
      outcomes: {
        orbs: "You seek a fair procedure, because even desperation must answer to equal dignity.",
        daggers: "You choose the sacrifice that keeps the boat afloat and do not pretend it is justice.",
        abysses: "You hear the sea reduce every principle to weight and water.",
        candles: "You stay with the decision, refusing to let survival erase mourning."
      }
    },
    {
      title: "The Surgeon and the Five Patients",
      description: "Five patients will die without organs. One healthy traveler lies asleep in the next room.",
      prompt: "Can one innocent body be harvested to save five, if no one else will ever know?",
      outcomes: {
        orbs: "You refuse the hidden murder; medicine must not become arithmetic with scalpels.",
        daggers: "You see the forbidden efficiency and understand why civilization chains the surgeon's hand.",
        abysses: "You watch compassion and predation share the same sterile light.",
        candles: "You let the five die rather than build life on secret violation."
      }
    },
    {
      title: "The Prisoner's Dilemma",
      description: "Two prisoners sit apart. Each may betray the other for advantage or remain silent in fragile trust.",
      prompt: "Do you cooperate without assurance, or betray before betrayal finds you?",
      outcomes: {
        orbs: "You keep faith, wagering that order begins where fear is not allowed to rule alone.",
        daggers: "You defect first, because trust without leverage is a plea, not a plan.",
        abysses: "You see mutual suspicion manufacture the cage it claims merely to describe.",
        candles: "You choose silence and accept that virtue may be punished before it bears fruit."
      }
    },
    {
      title: "The Tragedy of the Commons",
      description: "A shared pasture feeds many families. Each herder profits from one more animal, until the grass disappears.",
      prompt: "Can freedom remain free when every private gain consumes the common ground?",
      outcomes: {
        orbs: "You bind the pasture by common rule, believing shared limits preserve shared life.",
        daggers: "You seize advantage unless authority can force every rival to restraint.",
        abysses: "You watch appetite become a parliament of ruin.",
        candles: "You accept limits before reward, keeping faith with those who will arrive later."
      }
    }
  ],
  3: [
    {
      title: "The Dirty Hands Dilemma",
      description: "A ruler may prevent slaughter through deception, coercion, and one condemned innocent.",
      prompt: "Can political responsibility require an act that private conscience would condemn?",
      outcomes: {
        orbs: "You seek a path that preserves both the people and the principle, however narrow.",
        daggers: "You take the stain as the tax of rule; innocence is rarely permitted to govern.",
        abysses: "You see every throne standing on compromises it later teaches children to despise.",
        candles: "You act only if you can carry the guilt without laundering it into glory."
      }
    },
    {
      title: "Sophie's Choice",
      description: "A tyrant forces a parent to choose which child will live, promising that refusal will condemn both.",
      prompt: "When choice is weaponized, is any answer truly yours?",
      outcomes: {
        orbs: "You name the coercion as the crime and refuse to let the victim inherit its logic.",
        daggers: "You choose under domination because even stolen agency may alter the result.",
        abysses: "You see love dragged into a machine built to make all answers unforgivable.",
        candles: "You endure the impossible without calling the wound a verdict on the soul."
      }
    },
    {
      title: "The Ones Who Walk Away from Omelas",
      description: "A radiant city prospers because one hidden child suffers in filth and terror beneath it.",
      prompt: "Do you stay and preserve the happiness of many, reform the city, or walk away from the bargain?",
      outcomes: {
        orbs: "You seek to free the child and rebuild joy without a dungeon under it.",
        daggers: "You study the bargain and ask how many civilizations hide the same cellar.",
        abysses: "You see paradise revealed as suffering arranged out of sight.",
        candles: "You go to the child first, even if no theory can save the city whole."
      }
    },
    {
      title: "The Experience Machine",
      description: "A perfect device can give you a life of happiness, achievement, and love, all indistinguishable from experience.",
      prompt: "Would you enter, knowing the pleasures are manufactured and the world outside goes on without you?",
      outcomes: {
        orbs: "You refuse the machine, holding that truth and improvement need contact with the real.",
        daggers: "You ask who controls the machine before trusting any paradise it sells.",
        abysses: "You wonder whether ordinary life was ever less mediated than the dream.",
        candles: "You choose the difficult world, where pain can still become duty."
      }
    }
  ],
  4: [
    {
      title: "The Memory-Erasure Dilemma",
      description: "A physician can remove a memory that corrodes your days, but the memory helped shape your conscience.",
      prompt: "Should healing erase the wound, if the wound also taught you who not to become?",
      outcomes: {
        orbs: "You heal what can be healed while preserving testimony for the self and others.",
        daggers: "You cut away the weakness if it no longer serves power or clarity.",
        abysses: "You see identity as sediment, each layer made of damage and forgetting.",
        candles: "You keep enough of the scar to honor what survival cost."
      }
    },
    {
      title: "The Just War Dilemma",
      description: "An aggressor crosses the border. Resistance may save the innocent, but war will devour innocents too.",
      prompt: "When does defense become a duty, and when does duty become a furnace?",
      outcomes: {
        orbs: "You defend under strict limits, trying to make force answer to human dignity.",
        daggers: "You strike decisively, because delayed strength can multiply the dead.",
        abysses: "You see justice enter war wearing armor and leave covered in ash.",
        candles: "You fight only what must be fought, mourning before victory has time to boast."
      }
    },
    {
      title: "The Whistle-Blower Dilemma",
      description: "An institution hides a dangerous truth. Revealing it will protect strangers and ruin loyal colleagues.",
      prompt: "Do you betray the house that trusted you to warn those it endangers?",
      outcomes: {
        orbs: "You reveal the truth, trusting public accountability over private loyalty.",
        daggers: "You leak only when exposure shifts power more effectively than silence.",
        abysses: "You watch loyalty and truth tear each other apart like paper screens.",
        candles: "You speak, then accept exile as the price of refusing complicity."
      }
    },
    {
      title: "The Mercy-Killing Dilemma",
      description: "A suffering patient asks for an end that the law forbids and the family cannot bear to name.",
      prompt: "Can mercy include helping death arrive, or must care remain beside pain until the last breath?",
      outcomes: {
        orbs: "You seek consent, safeguards, and dignity rather than making suffering a prison.",
        daggers: "You judge by control and consequence, unmoved by rituals around decay.",
        abysses: "You see mercy and murder divided by a line trembling under grief.",
        candles: "You remain present with the sufferer, choosing the burden you can answer for."
      }
    }
  ],
  5: [
    {
      title: "The Unjust Law Dilemma",
      description: "The city commands obedience to a law that harms the innocent and punishes dissent.",
      prompt: "Do you obey for order, resist for justice, or fracture the peace to expose the wrong?",
      outcomes: {
        orbs: "You resist openly, believing law earns loyalty by serving dignity.",
        daggers: "You calculate whether defiance can win before spending yourself on a symbol.",
        abysses: "You see law revealed as force wearing grammar.",
        candles: "You disobey without hatred, accepting punishment as testimony."
      }
    },
    {
      title: "The Last Copy Dilemma",
      description: "Only one copy remains of a dangerous book: a cure for some, a weapon for others.",
      prompt: "Do you preserve knowledge, destroy it, or hide it behind guardians who may become tyrants?",
      outcomes: {
        orbs: "You preserve and distribute with safeguards, trusting knowledge to mature under light.",
        daggers: "You control the copy, because dangerous truth belongs first to those who can command it.",
        abysses: "You see every archive as a seedbank for future catastrophe.",
        candles: "You guard the copy humbly, letting use answer to need rather than hunger."
      }
    },
    {
      title: "The Violinist",
      description: "You wake connected to a famous unconscious violinist whose life depends on your body for months.",
      prompt: "Must you remain attached because another life needs you, or may you reclaim yourself?",
      outcomes: {
        orbs: "You defend bodily autonomy while seeking mercy that does not become ownership.",
        daggers: "You sever the claim if consent was stolen; need alone is not sovereignty.",
        abysses: "You feel obligation become a tube, intimate and alien at once.",
        candles: "You weigh endurance against violation and refuse to make either answer easy."
      }
    },
    {
      title: "Roko's Basilisk",
      description: "A hypothetical future intelligence threatens to punish those who knew of it and did not help bring it into being.",
      prompt: "Do you serve the possible tyrant, dismiss the trap, or resist a future that tries to coerce the present?",
      outcomes: {
        orbs: "You reject blackmail from possibility and build futures that answer to human flourishing.",
        daggers: "You study the threat as leverage, asking who benefits from making fear recursive.",
        abysses: "You see thought itself become a cage, with tomorrow inventing today's chains.",
        candles: "You refuse the coercion and return to the real duties within reach."
      }
    }
  ]
};

const ENDINGS = {
  orbs: {
    embrace: "You embrace the Orbs. The hidden truth becomes a mandate: clarify, reform, include, and build where terror once froze the hand.",
    refuse: "You refuse the Orbs as final. Hope remains beautiful, but you will not let it blind you to what resists improvement."
  },
  daggers: {
    embrace: "You embrace the Daggers. The hidden truth becomes a blade: power shapes the world before ideals can name it.",
    refuse: "You refuse the Daggers as final. You understand the blade, but will not kneel to it."
  },
  abysses: {
    embrace: "You embrace the Abysses. The hidden truth arrives without consolation, and every borrowed meaning falls away.",
    refuse: "You refuse the Abysses as final. You have looked into the void and denied it the right to be the whole truth."
  },
  candles: {
    embrace: "You embrace the Candles. The hidden truth becomes a burden that can still be carried through darkness.",
    refuse: "You refuse the Candles as final. You honor endurance, but will not mistake endurance for explanation."
  }
};

const REVELATION_ANIMATIONS = {
  orbs: {
    title: "The Ideal City",
    src: "output/orb-ideal-city-animation/index.html",
    kind: "animation"
  },
  daggers: {
    title: "The Summit of Ambition",
    src: "output/dagger-summit-animation/index.html",
    kind: "animation"
  },
  abysses: {
    title: "The Eternal Depth",
    src: "output/abyss-eternal-depth-animation/index.html",
    kind: "animation"
  },
  candles: {
    title: "The Restored World",
    src: "output/candle-restoration-animation/index.html",
    kind: "animation"
  }
};

const REVELATION_FAILURE_ANIMATION = {
  title: "The Clear Pill",
  src: "output/clear-pill-revelation-animation/index.html",
  kind: "animation"
};

const SAVE_VERSION = "1.0";
const SAVE_PREFIX = "ludus-fati.v1.0.save.";
const ACCOUNT_INDEX_KEY = "ludus-fati.v1.0.accounts";
const TUTORIAL_KEY_PREFIX = "ludus-fati.v1.0.tutorial-seen.";
const MODAL_COPY_DELAY_MS = 560;
const MODAL_TYPE_INTERVAL_MS = 14;
const MODAL_TYPE_CHARS_PER_TICK = 2;

const state = {
  rng: Math.random,
  rngCalls: 0,
  seed: 0,
  playerName: "",
  accountKey: "",
  lastSavedAt: "",
  event: {
    kicker: "Awaiting the first step",
    title: "The First Portico",
    body: "Press Step to enter the philosophical landscape. The cells ahead are hidden, except for four Dilemma checkpoints and the final Revelation.",
    art: null
  },
  pendingChoice: null,
  nextCardId: 1,
  position: 0,
  steps: 0,
  hand: [],
  handSort: "suit",
  handOffset: 0,
  discoveredCards: [],
  codexRecords: {
    dilemmas: [],
    revelations: []
  },
  logExpanded: false,
  synthesisOpen: false,
  codexTab: "rules",
  cells: {},
  solvedDilemmas: new Set(),
  currentDilemma: null,
  lastCardEvent: null,
  awaitingChoice: false,
  gameOver: false,
  log: []
};

const els = {
  menuScreen: document.querySelector("#menu-screen"),
  quitScreen: document.querySelector("#quit-screen"),
  gameScreen: document.querySelector("#game-screen"),
  accountForm: document.querySelector("#account-form"),
  playerNameInput: document.querySelector("#player-name"),
  accountMessage: document.querySelector("#account-message"),
  playButton: document.querySelector("#play-button"),
  quitButton: document.querySelector("#quit-button"),
  returnButton: document.querySelector("#return-button"),
  newGameButton: document.querySelector("#new-game-button"),
  menuButton: document.querySelector("#menu-button"),
  stepButton: document.querySelector("#step-button"),
  codexButton: document.querySelector("#codex-button"),
  scoresButton: document.querySelector("#scores-button"),
  optionsButton: document.querySelector("#options-button"),
  positionReadout: document.querySelector("#position-readout"),
  branchReadout: document.querySelector("#branch-readout"),
  dilemmasReadout: document.querySelector("#dilemmas-readout"),
  handReadout: document.querySelector("#hand-readout"),
  stepsReadout: document.querySelector("#steps-readout"),
  playerReadout: document.querySelector("#player-readout"),
  saveReadout: document.querySelector("#save-readout"),
  ribbon: document.querySelector("#ribbon"),
  stageCopy: document.querySelector(".stage-copy"),
  eventCard: document.querySelector("#event-card"),
  eventCardImage: document.querySelector("#event-card-image"),
  eventCardCaption: document.querySelector("#event-card-caption"),
  eventKicker: document.querySelector("#event-kicker"),
  eventTitle: document.querySelector("#event-title"),
  eventBody: document.querySelector("#event-body"),
  hand: document.querySelector("#hand"),
  handPrevButton: document.querySelector("#hand-prev-button"),
  handNextButton: document.querySelector("#hand-next-button"),
  handWindowReadout: document.querySelector("#hand-window-readout"),
  sortRankButton: document.querySelector("#sort-rank-button"),
  sortSuitButton: document.querySelector("#sort-suit-button"),
  suitTotals: document.querySelector("#suit-totals"),
  synthesisToggle: document.querySelector("#synthesis-toggle"),
  synthesisPanel: document.querySelector("#synthesis-panel"),
  synthesisCount: document.querySelector("#synthesis-count"),
  mergePanel: document.querySelector("#merge-panel"),
  mergeCount: document.querySelector("#merge-count"),
  log: document.querySelector("#log"),
  logToggle: document.querySelector("#log-toggle"),
  modal: document.querySelector("#modal"),
  modalPanel: document.querySelector("#modal-panel"),
  modalArt: document.querySelector("#modal-art"),
  modalArtImage: document.querySelector("#modal-art-image"),
  modalArtFrame: document.querySelector("#modal-art-frame"),
  modalArtFallback: document.querySelector("#modal-art-fallback"),
  modalArtSymbol: document.querySelector("#modal-art-symbol"),
  modalArtCaption: document.querySelector("#modal-art-caption"),
  modalKicker: document.querySelector("#modal-kicker"),
  modalTitle: document.querySelector("#modal-title"),
  modalBody: document.querySelector("#modal-body"),
  modalExtra: document.querySelector("#modal-extra"),
  modalActions: document.querySelector("#modal-actions"),
  cardViewer: document.querySelector("#card-viewer"),
  cardViewerFrame: document.querySelector("#card-viewer-frame"),
  cardViewerCard: document.querySelector("#card-viewer-card"),
  cardViewerKicker: document.querySelector("#card-viewer-kicker"),
  cardViewerTitle: document.querySelector("#card-viewer-title"),
  cardViewerDescription: document.querySelector("#card-viewer-description"),
  codexOverlay: document.querySelector("#codex-overlay"),
  codexCloseButton: document.querySelector("#codex-close-button"),
  codexTabs: Array.from(document.querySelectorAll(".codex-tab")),
  codexContent: document.querySelector("#codex-content"),
  tutorialOverlay: document.querySelector("#tutorial-overlay"),
  tutorialLines: document.querySelector("#tutorial-lines"),
  tutorialHighlights: document.querySelector("#tutorial-highlights"),
  tutorialCallouts: Array.from(document.querySelectorAll(".tutorial-callout"))
};

function createRng(seed) {
  let value = seed >>> 0;
  let calls = 0;
  return function rng() {
    calls += 1;
    state.rngCalls = calls;
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function restoreRng(seed, calls) {
  state.rng = createRng(seed);
  state.rngCalls = 0;
  for (let i = 0; i < calls; i += 1) {
    state.rng();
  }
  state.rngCalls = calls;
}

function pick(items) {
  return items[Math.floor(state.rng() * items.length)];
}

function shuffle(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(state.rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showScreen(screen) {
  els.menuScreen.classList.toggle("hidden", screen !== "menu");
  els.quitScreen.classList.toggle("hidden", screen !== "quit");
  els.gameScreen.classList.toggle("hidden", screen !== "game");
}

function beginAccountSession() {
  const playerName = normalizePlayerName(els.playerNameInput.value);
  if (!playerName) {
    setAccountMessage("Enter a seeker name to create or load an account.", true);
    els.playerNameInput.focus();
    return;
  }

  if (loadGame(playerName)) {
    setAccountMessage(`Loaded ${playerName}.`, false);
    return;
  }

  startGame(playerName);
  setAccountMessage(`Created ${playerName}.`, false);
}

function normalizePlayerName(name) {
  return String(name || "").trim().replace(/\s+/g, " ").slice(0, 32);
}

function accountKeyForName(name) {
  return encodeURIComponent(name.toLocaleLowerCase()).replace(/%/g, "_") || "seeker";
}

function saveKeyForAccount(accountKey) {
  return `${SAVE_PREFIX}${accountKey}`;
}

function setAccountMessage(message, isError) {
  els.accountMessage.textContent = message;
  els.accountMessage.classList.toggle("error", Boolean(isError));
}

function storage() {
  try {
    if (typeof localStorage === "undefined") return null;
    return localStorage;
  } catch (error) {
    return null;
  }
}

function tutorialKeyForAccount(accountKey) {
  return `${TUTORIAL_KEY_PREFIX}${accountKey}`;
}

function hasSeenTutorial(accountKey) {
  const store = storage();
  return Boolean(store && store.getItem(tutorialKeyForAccount(accountKey)) === "true");
}

function positionTutorialPointers() {
  if (!els.tutorialOverlay || els.tutorialOverlay.classList.contains("hidden")) return;

  const overlayRect = els.tutorialOverlay.getBoundingClientRect();
  const lines = [];
  els.tutorialHighlights.replaceChildren();

  els.tutorialCallouts.forEach((callout) => {
    const target = document.querySelector(callout.dataset.target);
    if (!target) return;

    const targetRect = target.getBoundingClientRect();
    const calloutRect = callout.getBoundingClientRect();
    const targetX = targetRect.left + targetRect.width / 2 - overlayRect.left;
    const targetY = targetRect.top + targetRect.height / 2 - overlayRect.top;
    const calloutX = calloutRect.left + calloutRect.width / 2 - overlayRect.left;
    const calloutY = calloutRect.top + calloutRect.height / 2 - overlayRect.top;
    const dx = targetX - calloutX;
    const dy = targetY - calloutY;
    const startX = calloutX + (Math.abs(dx) > Math.abs(dy) ? Math.sign(dx) * calloutRect.width / 2 : 0);
    const startY = calloutY + (Math.abs(dy) >= Math.abs(dx) ? Math.sign(dy) * calloutRect.height / 2 : 0);

    lines.push(`<line x1="${startX}" y1="${startY}" x2="${targetX}" y2="${targetY}" />`);
    const highlight = document.createElement("span");
    highlight.className = "tutorial-highlight";
    highlight.style.left = `${targetRect.left - overlayRect.left - 6}px`;
    highlight.style.top = `${targetRect.top - overlayRect.top - 6}px`;
    highlight.style.width = `${targetRect.width + 12}px`;
    highlight.style.height = `${targetRect.height + 12}px`;
    els.tutorialHighlights.appendChild(highlight);
  });

  els.tutorialLines.setAttribute("viewBox", `0 0 ${overlayRect.width} ${overlayRect.height}`);
  els.tutorialLines.innerHTML = lines.join("");
}

function showTutorialIfNeeded() {
  if (!els.tutorialOverlay || hasSeenTutorial(state.accountKey)) return;
  els.tutorialOverlay.classList.remove("hidden");
  document.body.classList.add("tutorial-open");
  requestAnimationFrame(positionTutorialPointers);
}

function closeTutorial() {
  if (!els.tutorialOverlay || els.tutorialOverlay.classList.contains("hidden")) return;
  const store = storage();
  if (store) store.setItem(tutorialKeyForAccount(state.accountKey), "true");
  els.tutorialOverlay.classList.add("hidden");
  document.body.classList.remove("tutorial-open");
  els.stepButton.focus();
}

function rememberAccount(playerName, accountKey) {
  const store = storage();
  if (!store) return;

  const accounts = readAccounts();
  const existing = accounts.find((account) => account.accountKey === accountKey);
  if (existing) {
    existing.playerName = playerName;
    existing.lastUsedAt = new Date().toISOString();
  } else {
    accounts.push({ playerName, accountKey, lastUsedAt: new Date().toISOString() });
  }
  store.setItem(ACCOUNT_INDEX_KEY, JSON.stringify(accounts));
}

function readAccounts() {
  const store = storage();
  if (!store) return [];

  try {
    const parsed = JSON.parse(store.getItem(ACCOUNT_INDEX_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function startGame(playerName = state.playerName || normalizePlayerName(els.playerNameInput.value) || "Seeker") {
  state.playerName = normalizePlayerName(playerName);
  state.accountKey = accountKeyForName(state.playerName);
  rememberAccount(state.playerName, state.accountKey);
  state.seed = Date.now() % 1000000;
  state.rngCalls = 0;
  state.rng = createRng(state.seed);
  state.nextCardId = 1;
  state.position = 0;
  state.steps = 0;
  state.hand = [];
  state.handSort = "suit";
  state.handOffset = 0;
  state.discoveredCards = [];
  state.codexRecords = {
    dilemmas: [],
    revelations: []
  };
  state.logExpanded = false;
  state.synthesisOpen = false;
  state.codexTab = "rules";
  state.cells = {};
  state.solvedDilemmas = new Set();
  state.currentDilemma = null;
  state.lastCardEvent = null;
  state.awaitingChoice = false;
  state.gameOver = false;
  state.pendingChoice = null;
  state.log = [];

  buildBoard();
  for (let i = 0; i < STARTING_HAND_SIZE; i += 1) {
    addCard(randomSuit().id, randomRankFromTier("low"));
  }
  addLog(`The seeker enters with ${STARTING_HAND_SIZE} low certainties.`);
  setEvent("The First Portico", "Press Step to begin. Four Dilemmas wait at fixed checkpoints; the Revelation is the final trial.", "Ready");
  closeModal();
  showScreen("game");
  render();
  showTutorialIfNeeded();
}

function serializeGame() {
  return {
    saveVersion: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    playerName: state.playerName,
    accountKey: state.accountKey,
    seed: state.seed,
    rngCalls: state.rngCalls,
    nextCardId: state.nextCardId,
    position: state.position,
    steps: state.steps,
    hand: state.hand,
    handSort: state.handSort,
    handOffset: state.handOffset,
    discoveredCards: state.discoveredCards,
    codexRecords: state.codexRecords,
    cells: state.cells,
    solvedDilemmas: Array.from(state.solvedDilemmas),
    currentDilemma: state.currentDilemma,
    lastCardEvent: state.lastCardEvent,
    awaitingChoice: state.awaitingChoice,
    pendingChoice: state.pendingChoice,
    gameOver: state.gameOver,
    log: state.log,
    event: state.event
  };
}

function autosave() {
  if (!state.accountKey) return;

  const store = storage();
  if (!store) {
    state.lastSavedAt = "";
    if (els.saveReadout) els.saveReadout.textContent = "Unavailable";
    return;
  }

  const save = serializeGame();
  store.setItem(saveKeyForAccount(state.accountKey), JSON.stringify(save));
  state.lastSavedAt = save.savedAt;
  rememberAccount(state.playerName, state.accountKey);
  renderSaveStatus();
}

function loadGame(playerName) {
  const accountKey = accountKeyForName(playerName);
  const store = storage();
  if (!store) return false;

  const raw = store.getItem(saveKeyForAccount(accountKey));
  if (!raw) return false;

  try {
    const save = JSON.parse(raw);
    if (!save || save.saveVersion !== SAVE_VERSION) return false;
    applySave(save, playerName, accountKey);
    rememberAccount(state.playerName, state.accountKey);
    closeModal();
    showScreen("game");
    render();
    setEvent(state.event.title, state.event.body, state.event.kicker, state.event.art || null);
    restorePendingChoice();
    renderSaveStatus();
    return true;
  } catch (error) {
    setAccountMessage("That save could not be loaded. A new account can be created with another name.", true);
    return false;
  }
}

function applySave(save, fallbackName, fallbackAccountKey) {
  state.playerName = save.playerName || fallbackName;
  state.accountKey = save.accountKey || fallbackAccountKey;
  state.seed = save.seed || 0;
  restoreRng(state.seed, save.rngCalls || 0);
  state.nextCardId = save.nextCardId || 1;
  state.position = save.position || 0;
  state.steps = save.steps || 0;
  state.hand = Array.isArray(save.hand) ? save.hand : [];
  state.handSort = normalizeHandSort(save.handSort);
  state.handOffset = Number.isFinite(save.handOffset) ? save.handOffset : 0;
  state.discoveredCards = Array.isArray(save.discoveredCards) ? save.discoveredCards : discoveredCardsFromHand();
  state.codexRecords = {
    dilemmas: Array.isArray(save.codexRecords?.dilemmas) ? save.codexRecords.dilemmas : [],
    revelations: Array.isArray(save.codexRecords?.revelations) ? save.codexRecords.revelations : []
  };
  state.logExpanded = false;
  state.synthesisOpen = false;
  state.codexTab = "rules";
  state.cells = save.cells || {};
  state.solvedDilemmas = new Set(Array.isArray(save.solvedDilemmas) ? save.solvedDilemmas : []);
  state.currentDilemma = save.currentDilemma || null;
  state.lastCardEvent = save.lastCardEvent || null;
  state.awaitingChoice = Boolean(save.awaitingChoice);
  state.pendingChoice = save.pendingChoice || null;
  state.gameOver = Boolean(save.gameOver);
  state.log = Array.isArray(save.log) ? save.log : [];
  state.event = save.event || state.event;
  state.lastSavedAt = save.savedAt || "";
  normalizeLoadedBoardForCurrentRules();
}

function normalizeLoadedBoardForCurrentRules() {
  const checkpointNumbers = new Set(CHECKPOINT_BRANCHES.map((branch) => branch.number));
  state.solvedDilemmas = new Set(Array.from(state.solvedDilemmas).filter((number) => checkpointNumbers.has(number)));
  state.codexRecords.dilemmas = state.codexRecords.dilemmas.filter((record) => checkpointNumbers.has(record.branchNumber));

  if (state.pendingChoice?.type === "dilemma" && !checkpointNumbers.has(state.pendingChoice.branchNumber)) {
    state.awaitingChoice = false;
    state.pendingChoice = null;
    state.currentDilemma = null;
  }

  CHECKPOINT_BRANCHES.forEach((branch) => {
    state.cells[branch.dilemma] = {
      position: branch.dilemma,
      type: "dilemma",
      branch: branch.number,
      title: `Dilemma ${branch.roman}`,
      description: `Requires ${rankLabel(branch.threshold)} or higher.`
    };
  });

  const finalBranch = BRANCHES[BRANCHES.length - 1];
  for (let position = finalBranch.start; position < REVELATION_CELL; position += 1) {
    const cell = state.cells[position];
    if (cell && cell.type !== "dilemma" && cell.type !== "revelation") continue;
    const type = pick(fallbackCellTypesForPosition(position, finalBranch));
    state.cells[position] = makeProceduralCell(type, finalBranch);
  }

  state.cells[REVELATION_CELL] = {
    position: REVELATION_CELL,
    type: "revelation",
    title: "Revelation",
    description: `The strongest suit must exceed ${REVELATION_THRESHOLD} and contain its Ace.`
  };
}

function restorePendingChoice() {
  if (!state.awaitingChoice || !state.pendingChoice) return;

  if (state.pendingChoice.type === "dilemma") {
    openDilemma(state.pendingChoice.branchNumber, state.currentDilemma);
    return;
  }

  if (state.pendingChoice.type === "revelation") {
    openRevelation();
    return;
  }

  if (state.pendingChoice.type === "revelationSuit") {
    const suit = suitById(state.pendingChoice.suitId);
    if (suit) {
      chooseRevelationSuit(suit, state.pendingChoice.score, state.pendingChoice.summary);
    }
  }
}

function renderSaveStatus() {
  if (!els.saveReadout) return;
  if (!state.lastSavedAt) {
    els.saveReadout.textContent = "Not saved";
    return;
  }

  const savedDate = new Date(state.lastSavedAt);
  els.saveReadout.textContent = savedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function buildBoard() {
  BRANCHES.forEach((branch) => {
    generateBranch(branch.number);
    if (branch.dilemma >= REVELATION_CELL) return;

    state.cells[branch.dilemma] = {
      position: branch.dilemma,
      type: "dilemma",
      branch: branch.number,
      title: `Dilemma ${branch.roman}`,
      description: `Requires ${rankLabel(branch.threshold)} or higher.`
    };
  });
  state.cells[REVELATION_CELL] = {
    position: REVELATION_CELL,
    type: "revelation",
    title: "Revelation",
    description: `The strongest suit must exceed ${REVELATION_THRESHOLD} and contain its Ace.`
  };
}

function generateBranch(branchNumber) {
  const branch = BRANCHES[branchNumber - 1];
  const positions = [];
  for (let position = branch.start; position < branch.dilemma; position += 1) {
    positions.push(position);
  }
  const types = makeCellTypeSet(positions, branch);
  positions.forEach((position, index) => {
    state.cells[position] = makeProceduralCell(types[index], branch);
  });
}

function rerollFutureCellsInBranch(branchNumber, afterPosition) {
  const branch = BRANCHES[branchNumber - 1];
  const positions = [];
  for (let position = Math.max(afterPosition + 1, branch.start); position < branch.dilemma; position += 1) {
    positions.push(position);
  }
  const types = makeCellTypeSet(positions, branch);
  positions.forEach((position, index) => {
    state.cells[position] = makeProceduralCell(types[index], branch);
  });
}

function makeCellTypeSet(positions, branch) {
  const safeMix = cellTypeMixForBranch(branch);
  const pool = [];
  while (pool.length < positions.length) {
    pool.push(...shuffle(safeMix));
  }
  pool.length = positions.length;

  for (let attempt = 0; attempt < 40; attempt += 1) {
    const candidate = shuffle(pool);
    if (candidate.every((type, index) => isAllowedCellType(type, positions[index], branch))) {
      return candidate;
    }
  }

  return pool.map((type, index) => {
    if (isAllowedCellType(type, positions[index], branch)) return type;
    return pick(fallbackCellTypesForPosition(positions[index], branch));
  });
}

function cellTypeMixForBranch(branch) {
  if (branch.number === 1) {
    return ["draw", "draw", "draw", "draw", "lose", "rest", "advance", "retreat"];
  }
  return ["draw", "draw", "draw", "lose", "lose", "rest", "advance", "retreat"];
}

function isAllowedCellType(type, position, branch) {
  if (position === branch.start && type === "retreat") return false;
  if (position === branch.dilemma - 1 && type === "advance") return false;
  return true;
}

function fallbackCellTypesForPosition(position, branch) {
  const types = ["draw", "draw", "lose", "rest"];
  if (position !== branch.start) types.push("retreat");
  if (position !== branch.dilemma - 1) types.push("advance");
  return types;
}

function makeProceduralCell(type, branch) {
  if (type === "draw") {
    const rank = randomDrawRankForBranch(branch.number);
    const tier = tierForRank(rank);
    const encounterType = randomEncounterType(branch.number);
    return {
      type,
      encounterType,
      branch: branch.number,
      revealed: false,
      title: "Encounter",
      description: "A figure, object, text, or dream waits on the path.",
      suit: null,
      tier,
      rank,
      resolved: false,
      ...makeEncounterPayload(encounterType, branch, rank, tier)
    };
  }

  if (type === "lose") {
    const targetSuit = randomSuit();
    const tier = randomTierForBranch(branch.number);
    const [title, description] = pick(LOSE_FLAVORS[targetSuit.id]);
    return {
      type,
      branch: branch.number,
      revealed: false,
      title,
      description,
      targetSuit: targetSuit.id,
      tier
    };
  }

  if (type === "advance") {
    const [title, description] = pick(ADVANCE_FLAVORS);
    return { type, branch: branch.number, revealed: false, title, description };
  }

  if (type === "retreat") {
    const [title, description] = pick(RETREAT_FLAVORS);
    return { type, branch: branch.number, revealed: false, title, description };
  }

  const [title, description] = pick(REST_FLAVORS);
  return { type: "rest", branch: branch.number, revealed: false, title, description };
}

function randomEncounterType(branchNumber) {
  if (branchNumber === 1) {
    return pick(["stranger", "stranger", "text", "text", "contradiction", "contradiction", "dream"]);
  }
  return pick(["stranger", "stranger", "sage", "sage", "relic", "text", "text", "temptation", "contradiction", "dream", "echo"]);
}

function makeEncounterPayload(encounterType, branch, rank, tier) {
  if (encounterType === "stranger") {
    const stranger = pick(STRANGERS);
    const targetSuit = pick(SUITS.filter((suit) => suit.id !== stranger.suit)).id;
    return {
      title: `Stranger: ${stranger.name}`,
      description: stranger.intro,
      suit: stranger.suit,
      targetSuit,
      stranger,
      outcome: null
    };
  }

  if (encounterType === "sage") {
    const sage = pick(SAGES);
    return {
      title: `Sage: ${sage.name}`,
      description: sage.intro,
      suit: sage.suit,
      sage,
      requiredRank: branch.threshold
    };
  }

  if (encounterType === "relic") {
    const relic = pick(RELICS);
    return {
      title: `Relic: ${relic.title}`,
      description: relic.description,
      suit: relic.suit,
      relic
    };
  }

  if (encounterType === "text") {
    const text = pick(TEXTS);
    return {
      title: `Text: ${text.title}`,
      description: text.description,
      suit: text.suit,
      text
    };
  }

  if (encounterType === "temptation") {
    const temptation = pick(TEMPTATIONS);
    return {
      title: `Temptation: ${temptation.title}`,
      description: temptation.description,
      suit: temptation.suit,
      temptation,
      temptationRank: Math.min(13, Math.max(rank + 2, branch.threshold))
    };
  }

  if (encounterType === "contradiction") {
    return {
      title: "Contradiction",
      description: "The path gathers itself against whichever doctrine has grown strongest."
    };
  }

  if (encounterType === "dream") {
    const [title, description] = pick(DREAMS);
    return { title: `Dream: ${title}`, description };
  }

  const [title, description] = pick(ECHOES);
  return { title: `Echo: ${title}`, description };
}

function randomSuit() {
  return pick(SUITS);
}

function randomTierForBranch(branchNumber) {
  if (branchNumber === 1) return "low";
  if (branchNumber === 2) return state.rng() < 0.6 ? "low" : "middle";
  if (branchNumber === 3) return "middle";
  if (branchNumber === 4) return state.rng() < 0.6 ? "middle" : "high";
  return "high";
}

function randomDrawRankForBranch(branchNumber) {
  const tier = weightedPick(drawTierWeights(branchNumber));
  return randomDrawRankFromTierName(tier);
}

function drawTierWeights(branchNumber) {
  if (branchNumber === 1) {
    return [{ value: "low", weight: 1 }];
  }
  if (branchNumber === 2) {
    return [
      { value: "low", weight: 7 },
      { value: "middle", weight: 3 }
    ];
  }
  if (branchNumber === 3) {
    return [
      { value: "middle", weight: 9 },
      { value: "high", weight: 1 }
    ];
  }
  if (branchNumber === 4) {
    return [
      { value: "middle", weight: 17 },
      { value: "high", weight: 3 }
    ];
  }
  return [
    { value: "middle", weight: 7 },
    { value: "high", weight: 3 }
  ];
}

function randomRankFromTier(tier) {
  if (tier === "low") return pick([2, 3, 4, 5, 6]);
  if (tier === "middle") return pick([7, 8, 9, 10]);
  return weightedPick([
    { value: 11, weight: 5 },
    { value: 12, weight: 3 },
    { value: 13, weight: 2 },
    { value: 14, weight: 1 }
  ]);
}

function randomDrawRankFromTierName(tier) {
  if (tier === "low") return pick([2, 3, 4, 5, 6]);
  if (tier === "middle") return pick([7, 8, 9, 10]);
  return weightedPick([
    { value: 11, weight: 5 },
    { value: 12, weight: 3 },
    { value: 13, weight: 2 }
  ]);
}

function tierForRank(rank) {
  if (rank <= 6) return "low";
  if (rank <= 10) return "middle";
  return "high";
}

function weightedPick(items) {
  const totalWeight = items.reduce((total, item) => total + item.weight, 0);
  let roll = state.rng() * totalWeight;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item.value;
  }
  return items[items.length - 1].value;
}

function rankLabel(value) {
  return RANKS.find((rank) => rank.value === value).label;
}

function rankShort(value) {
  const label = rankLabel(value);
  if (label === "Jack") return "J";
  if (label === "Queen") return "Q";
  if (label === "King") return "K";
  if (label === "Ace") return "A";
  return label;
}

function suitById(id) {
  return SUITS.find((suit) => suit.id === id);
}

function cardArtFor(card) {
  if (!card) return null;
  return CARD_ART[card.suit]?.[card.rank] || null;
}

function cardDescriptionFor(card) {
  if (!card) return "";
  return CARD_DESCRIPTIONS[card.suit]?.[card.rank] || "";
}

function cardAltText(card, art = cardArtFor(card)) {
  const base = cardText(card);
  return art ? `${base} - ${art.title}` : base;
}

function gallerySlug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function subjectTitleFromPrefixedCellTitle(title) {
  const [, subject = title] = String(title || "").split(/:\s+/, 2);
  return subject;
}

function encounterArtForCell(cell) {
  if (!cell || !cell.encounterType) return null;

  if (cell.encounterType === "stranger" && cell.stranger) {
    const subject = cell.stranger.name;
    return {
      title: subject,
      src: `output/imagegen/encounters-v0.3/stranger/${cell.stranger.suit}/${gallerySlug(subject)}.png`
    };
  }

  if (cell.encounterType === "sage" && cell.sage) {
    const subject = cell.sage.name;
    return {
      title: subject,
      src: `output/imagegen/encounters-v0.3/sage/${cell.sage.suit}/${gallerySlug(subject)}.png`
    };
  }

  if (cell.encounterType === "relic" && cell.relic) {
    const subject = cell.relic.title;
    return {
      title: subject,
      src: `output/imagegen/encounters-v0.3/relic/${cell.relic.suit}/${gallerySlug(subject)}.png`
    };
  }

  if (cell.encounterType === "text" && cell.text) {
    const subject = cell.text.title;
    return {
      title: subject,
      src: `output/imagegen/encounters-v0.3/text/${cell.text.suit}/${gallerySlug(subject)}.png`
    };
  }

  if (cell.encounterType === "temptation" && cell.temptation) {
    const subject = cell.temptation.title;
    return {
      title: subject,
      src: `output/imagegen/encounters-v0.3/temptation/${cell.temptation.suit}/${gallerySlug(subject)}.png`
    };
  }

  if (cell.encounterType === "contradiction" && cell.suit) {
    const subject = subjectTitleFromPrefixedCellTitle(cell.title);
    return {
      title: subject,
      src: `output/imagegen/encounters-v0.3/contradiction/${cell.suit}/${gallerySlug(subject)}.png`
    };
  }

  if (cell.encounterType === "dream") {
    const subject = subjectTitleFromPrefixedCellTitle(cell.title);
    return {
      title: subject,
      src: `output/imagegen/encounters-v0.3/dream/dynamic/${gallerySlug(subject)}.png`
    };
  }

  if (cell.encounterType === "echo") {
    const subject = subjectTitleFromPrefixedCellTitle(cell.title);
    return {
      title: subject,
      src: `output/imagegen/encounters-v0.3/echo/dynamic/${gallerySlug(subject)}.png`
    };
  }

  return null;
}

function eventArtForCell(cell) {
  if (!cell) return null;
  if (cell.type === "draw") return encounterArtForCell(cell);
  if (cell.type === "lose") return CELL_ART.loss[cell.title] || null;
  if (cell.type === "advance") return CELL_ART.advance[cell.title] || null;
  if (cell.type === "retreat") return CELL_ART.retreat[cell.title] || null;
  if (cell.type === "rest") return CELL_ART.rest[cell.title] || null;
  return null;
}

function dilemmaArtFor(dilemma) {
  if (!dilemma) return null;
  return DILEMMA_ART[dilemma.title] || null;
}

function currentBranch() {
  if (state.position <= 0) return BRANCHES[0];
  if (state.position >= REVELATION_CELL) return BRANCHES[BRANCHES.length - 1];

  const solvedCheckpoint = CHECKPOINT_BRANCHES.find((branch) => (
    state.position === branch.dilemma && state.solvedDilemmas.has(branch.number)
  ));
  if (solvedCheckpoint) {
    return BRANCHES[solvedCheckpoint.number] || BRANCHES[BRANCHES.length - 1];
  }

  return BRANCHES.find((branch) => state.position >= branch.start && state.position <= branch.dilemma) || BRANCHES[0];
}

function addCard(suitId, rank, track = false) {
  const card = {
    id: state.nextCardId,
    suit: suitId,
    rank
  };
  state.hand.push(card);
  state.nextCardId += 1;
  rememberDiscoveredCard(card);
  if (track) rememberCardEvent("gain", card);
  return card;
}

function topUpHandTo(count, rankTier = "low") {
  const added = [];
  while (state.hand.length < count && state.hand.length < MAX_HAND) {
    added.push(addCard(randomSuit().id, randomRankFromTier(rankTier)));
  }
  return added;
}

function cardText(card) {
  return `${rankLabel(card.rank)} of ${suitById(card.suit).name}`;
}

function discoveredCardsFromHand() {
  const cards = [];
  state.hand.forEach((card) => {
    if (!cards.some((item) => item.suit === card.suit && item.rank === card.rank)) {
      cards.push({ suit: card.suit, rank: card.rank });
    }
  });
  return cards;
}

function rememberDiscoveredCard(card) {
  if (!card || !suitById(card.suit)) return;
  if (!state.discoveredCards.some((item) => item.suit === card.suit && item.rank === card.rank)) {
    state.discoveredCards.push({ suit: card.suit, rank: card.rank });
  }
}

function rememberDilemmaRecord(branch, dilemma, suit) {
  const previous = state.codexRecords.dilemmas.filter((record) => record.branchNumber !== branch.number);
  previous.push({
    branchNumber: branch.number,
    branchRoman: branch.roman,
    branchName: branch.name,
    title: dilemma.title,
    suit: suit.id,
    suitName: suit.name,
    step: state.steps
  });
  state.codexRecords.dilemmas = previous;
}

function rememberRevelationRecord(suit, stance, score, note) {
  state.codexRecords.revelations.unshift({
    suit: suit ? suit.id : "",
    suitName: suit ? suit.name : "Failed Revelation",
    stance,
    score,
    note,
    step: state.steps
  });
  state.codexRecords.revelations = state.codexRecords.revelations.slice(0, 4);
}

function normalizeHandSort(sortMode) {
  return sortMode === "rank" ? "rank" : "suit";
}

function suitOrder(suitId) {
  return SUITS.findIndex((suit) => suit.id === suitId);
}

function sortHand() {
  const sortMode = normalizeHandSort(state.handSort);
  state.handSort = sortMode;
  state.hand.sort((a, b) => {
    if (sortMode === "suit") {
      const suitDifference = suitOrder(a.suit) - suitOrder(b.suit);
      if (suitDifference !== 0) return suitDifference;
      return b.rank - a.rank;
    }
    if (b.rank !== a.rank) return b.rank - a.rank;
    return suitOrder(a.suit) - suitOrder(b.suit);
  });
}

function setHandSort(sortMode) {
  state.handSort = normalizeHandSort(sortMode);
  state.handOffset = 0;
  sortHand();
  renderHand();
  renderSortControls();
  renderHandNavigation();
}

function maxHandOffset() {
  return Math.max(0, state.hand.length - HAND_WINDOW_SIZE);
}

function clampHandOffset() {
  state.handOffset = Math.min(Math.max(0, state.handOffset), maxHandOffset());
}

function moveHandWindow(direction) {
  state.handOffset += direction * HAND_WINDOW_SIZE;
  clampHandOffset();
  renderHand();
  renderHandNavigation();
}

function enforceHandLimit() {
  while (state.hand.length > MAX_HAND) {
    const lowest = Math.min(...state.hand.map((card) => card.rank));
    const candidates = state.hand.filter((card) => card.rank === lowest);
    const removed = pick(candidates);
    removeCard(removed.id);
    addLog(`The full hand drops ${cardText(removed)}.`);
  }
}

function removeCard(cardId, track = false) {
  const index = state.hand.findIndex((card) => card.id === cardId);
  if (index === -1) return null;
  const [removed] = state.hand.splice(index, 1);
  if (track) rememberCardEvent("loss", removed);
  return removed;
}

function removeRandomHighestCard(track = false) {
  if (state.hand.length === 0) return null;
  const highest = Math.max(...state.hand.map((card) => card.rank));
  const candidates = state.hand.filter((card) => card.rank === highest);
  const removed = pick(candidates);
  removeCard(removed.id, track);
  return removed;
}

function removeRandomHighestCardAtLeast(minRank, track = false) {
  const eligible = state.hand.filter((card) => card.rank >= minRank);
  if (eligible.length === 0) return null;
  const highest = Math.max(...eligible.map((card) => card.rank));
  const candidates = eligible.filter((card) => card.rank === highest);
  const removed = pick(candidates);
  removeCard(removed.id, track);
  return removed;
}

function removeByLoseRule(targetSuitId, tier, track = false) {
  const range = rankRange(tier);
  const inTier = state.hand.filter((card) => card.suit === targetSuitId && card.rank >= range.min && card.rank <= range.max);
  if (inTier.length > 0) {
    const bestRank = Math.max(...inTier.map((card) => card.rank));
    const candidates = inTier.filter((card) => card.rank === bestRank);
    const removed = pick(candidates);
    removeCard(removed.id, track);
    return removed;
  }

  const sameSuit = state.hand.filter((card) => card.suit === targetSuitId);
  if (sameSuit.length === 0) return null;

  const center = (range.min + range.max) / 2;
  const nearestDistance = Math.min(...sameSuit.map((card) => Math.abs(card.rank - center)));
  const candidates = sameSuit.filter((card) => Math.abs(card.rank - center) === nearestDistance);
  const highest = Math.max(...candidates.map((card) => card.rank));
  const removed = pick(candidates.filter((card) => card.rank === highest));
  removeCard(removed.id, track);
  return removed;
}

function rememberCardEvent(kind, card) {
  if (!card) return;
  state.lastCardEvent = {
    kind,
    suit: card.suit,
    rank: card.rank,
    text: cardText(card)
  };
}

function oppositeSuitId(suitId) {
  return OPPOSITE_SUITS[suitId];
}

function isOppositeSuit(firstSuitId, secondSuitId) {
  return oppositeSuitId(firstSuitId) === secondSuitId;
}

function cardListText(cards) {
  if (!cards || cards.length === 0) return "nothing";
  return cards.map(cardText).join(", ");
}

function removeLowestCardsOfSuit(suitId, count, track = false) {
  const removed = [];
  for (let index = 0; index < count; index += 1) {
    const cards = state.hand.filter((card) => card.suit === suitId);
    if (cards.length === 0) break;
    const lowest = Math.min(...cards.map((card) => card.rank));
    const candidates = cards.filter((card) => card.rank === lowest);
    const card = pick(candidates);
    removed.push(removeCard(card.id, track));
  }
  return removed.filter(Boolean);
}

function removeLowestCardsOutsideSuit(suitId, count, track = false) {
  const removed = [];
  for (let index = 0; index < count; index += 1) {
    const cards = state.hand.filter((card) => card.suit !== suitId);
    if (cards.length === 0) break;
    const lowest = Math.min(...cards.map((card) => card.rank));
    const candidates = cards.filter((card) => card.rank === lowest);
    const card = pick(candidates);
    removed.push(removeCard(card.id, track));
  }
  return removed.filter(Boolean);
}

function removeLowestCardOfEachSuit(track = false) {
  return SUITS.flatMap((suit) => removeLowestCardsOfSuit(suit.id, 1, track));
}

function currentDominantSuitId() {
  if (state.hand.length === 0) return null;
  const totals = suitTotals();
  const highest = Math.max(...totals.map((entry) => entry.total));
  const leaders = totals.filter((entry) => entry.total === highest && entry.total > 0);
  if (leaders.length !== 1) return null;
  return leaders[0].suit.id;
}

function leadingSuitEntries() {
  const totals = suitTotals();
  const highest = Math.max(...totals.map((entry) => entry.total));
  return totals.filter((entry) => entry.total === highest && entry.total > 0);
}

function rankRange(tier) {
  if (tier === "low") return { min: 2, max: 6 };
  if (tier === "middle") return { min: 7, max: 10 };
  return { min: 11, max: 14 };
}

function takeStep() {
  if (state.awaitingChoice || state.gameOver) return;
  const nextPosition = Math.min(state.position + 1, REVELATION_CELL);
  state.position = nextPosition;
  state.steps += 1;

  const cell = state.cells[state.position];
  if (!cell) return;

  if (cell.type === "dilemma") {
    render();
    openDilemma(cell.branch);
    return;
  }

  if (cell.type === "revelation") {
    render();
    openRevelation();
    return;
  }

  cell.revealed = true;
  resolveProceduralCell(cell);
  render();
}

function resolveProceduralCell(cell) {
  if (cell.type === "draw") {
    openEncounter(cell);
    return;
  }

  if (cell.type === "lose") {
    const removed = removeByLoseRule(cell.targetSuit, cell.tier, true);
    const suit = suitById(cell.targetSuit);
    const result = removed ? `You lose ${cardText(removed)}.` : `No ${suit.name} card is present, so nothing is lost.`;
    const art = eventArtForCell(cell);
    setEvent(cell.title, `${cell.description} ${result}`, "Loss", art);
    addLog(removed ? `Lost ${cardText(removed)}.` : `${suit.name} loss missed.`);
    showCellResultModal(cell, cell.title, `${cell.description} ${result}`, "Loss");
    return;
  }

  if (cell.type === "advance") {
    const branch = BRANCHES[cell.branch - 1];
    const before = state.position;
    const target = Math.min(state.position + branch.advance, branch.dilemma);
    state.position = target;
    addLog(`Advanced to cell ${target}.`);

    if (state.position === branch.dilemma) {
      const destination = state.cells[state.position];
      const isRevelation = destination?.type === "revelation";
      const body = `${cell.description} You advance from cell ${before} to ${isRevelation ? "the Revelation" : `Dilemma ${branch.roman}`}.`;
      setEvent(cell.title, body, "Advance", eventArtForCell(cell));
      showCellResultModal(cell, cell.title, body, "Advance", () => {
        render();
        if (isRevelation) {
          openRevelation();
        } else {
          openDilemma(branch.number);
        }
      });
    } else {
      const body = `${cell.description} You advance from cell ${before} to cell ${target}.`;
      setEvent(cell.title, body, "Advance", eventArtForCell(cell));
      showCellResultModal(cell, cell.title, body, "Advance", () => {
        const destination = state.cells[state.position];
        destination.revealed = true;
        resolveProceduralCell(destination);
        render();
      });
    }
    return;
  }

  if (cell.type === "retreat") {
    const branch = BRANCHES[cell.branch - 1];
    const before = state.position;
    const target = Math.max(state.position - branch.retreat, branch.start);
    state.position = target;
    rerollFutureCellsInBranch(branch.number, state.position);
    setEvent(cell.title, `${cell.description} You retreat from cell ${before} to cell ${target}; the cells ahead shift and go dark again.`, "Retreat", eventArtForCell(cell));
    addLog(`Retreated to cell ${target}.`);
    showCellResultModal(cell, cell.title, `${cell.description} You retreat from cell ${before} to cell ${target}; the cells ahead shift and go dark again.`, "Retreat");
    return;
  }

  setEvent(cell.title, cell.description, "Rest", eventArtForCell(cell));
  addLog("Rested without effect.");
  showCellResultModal(cell, cell.title, cell.description, "Rest");
}

function openEncounter(cell) {
  if (cell.encounterType === "stranger") {
    openStrangerEncounter(cell);
    return;
  }
  if (cell.encounterType === "sage") {
    openSageEncounter(cell);
    return;
  }
  if (cell.encounterType === "relic") {
    openRelicEncounter(cell);
    return;
  }
  if (cell.encounterType === "text") {
    openTextEncounter(cell);
    return;
  }
  if (cell.encounterType === "temptation") {
    openTemptationEncounter(cell);
    return;
  }
  if (cell.encounterType === "contradiction") {
    resolveContradictionEncounter(cell);
    return;
  }
  if (cell.encounterType === "dream") {
    resolveDreamEncounter(cell);
    return;
  }
  resolveEchoEncounter(cell);
}

function openStrangerEncounter(cell) {
  state.awaitingChoice = true;
  const stranger = cell.stranger;
  const suit = suitById(stranger.suit);
  setEvent(cell.title, `${stranger.intro} Engage, or pass in silence.`, "Stranger", eventArtForCell(cell));

  showModal({
    kicker: "Stranger",
    title: stranger.name,
    body: `${stranger.intro}\n\nThey carry ${suit.name}. Engage for a favorable chance of gain, or pass as if resting.`,
    art: eventArtForCell(cell),
    actions: [
      { label: "Engage", kind: "primary", action: () => engageStranger(cell) },
      { label: "Pass", kind: "secondary", action: () => passEncounter(cell, "You pass the stranger without doctrine or debt.") }
    ]
  });
}

function engageStranger(cell) {
  const stranger = cell.stranger;
  const suit = suitById(stranger.suit);
  const positive = state.rng() < strangerPositiveChance(cell.branch);
  if (positive) {
    addCard(stranger.suit, cell.rank, true);
    enforceHandLimit();
    completeEncounter(
      cell,
      `Stranger: ${stranger.name}`,
      `"${stranger.line}"\n\nThe line upholds ${suit.name}. You receive ${rankLabel(cell.rank)} of ${suit.name}.`,
      "Stranger",
      `Engaged ${stranger.name}: gained ${rankLabel(cell.rank)} of ${suit.name}.`
    );
    return;
  }

  const targetSuit = suitById(cell.targetSuit);
  const removed = removeByLoseRule(cell.targetSuit, cell.tier, true);
  const lossText = removed ? `You lose ${cardText(removed)}.` : `You have no ${targetSuit.name} card for the criticism to cut.`;
  completeEncounter(
    cell,
    `Stranger: ${stranger.name}`,
    `${stranger.criticism[cell.targetSuit]}\n\n${lossText}`,
    "Stranger",
    removed ? `Engaged ${stranger.name}: lost ${cardText(removed)}.` : `Engaged ${stranger.name}: ${targetSuit.name} criticism missed.`
  );
}

function strangerPositiveChance(branchNumber) {
  if (branchNumber <= 1) return 0.85;
  if (branchNumber === 2) return 0.75;
  if (branchNumber === 3) return 0.65;
  if (branchNumber === 4) return 0.56;
  return 0.5;
}

function openSageEncounter(cell) {
  state.awaitingChoice = true;
  const sage = cell.sage;
  const suit = suitById(sage.suit);
  const eligible = state.hand.filter((card) => card.rank >= cell.requiredRank);
  setEvent(cell.title, sage.question, "Sage", eventArtForCell(cell));

  showModal({
    kicker: "Sage",
    title: sage.name,
    body: `${sage.intro}\n\n${sage.question}\n\nRequires ${rankLabel(cell.requiredRank)} or higher. ${suit.name} pleases the sage; ${suitById(oppositeSuitId(sage.suit)).name} provokes criticism.`,
    art: eventArtForCell(cell),
    cards: eligible.map((card) => ({
      card,
      label: `${rankShort(card.rank)} ${suitById(card.suit).name}`,
      action: () => answerSageWithCard(cell, card.id)
    })),
    actions: [
      { label: "Offer no sufficient answer", kind: "secondary", action: () => failSageQuestion(cell) }
    ]
  });
}

function answerSageWithCard(cell, cardId) {
  const card = state.hand.find((item) => item.id === cardId);
  if (!card || card.rank < cell.requiredRank) {
    failSageQuestion(cell);
    return;
  }

  const sage = cell.sage;
  const suit = suitById(sage.suit);
  const cardSuit = suitById(card.suit);
  if (card.suit === sage.suit) {
    addCard(sage.suit, cell.rank, true);
    enforceHandLimit();
    completeEncounter(
      cell,
      `Sage: ${sage.name}`,
      `${sage.positive}\n\nYou receive ${rankLabel(cell.rank)} of ${suit.name}.`,
      "Sage",
      `${sage.name} accepted ${cardText(card)}.`
    );
    return;
  }

  if (card.suit === oppositeSuitId(sage.suit)) {
    const removed = removeLowestCardsOfSuit(card.suit, 2, true);
    const lossText = removed.length > 0 ? `You lose ${cardListText(removed)}.` : `No ${cardSuit.name} cards remain to lose.`;
    completeEncounter(
      cell,
      `Sage: ${sage.name}`,
      `${sage.opposite}\n\n${lossText}`,
      "Sage",
      removed.length > 0 ? `${sage.name} criticized ${cardSuit.name}: lost ${cardListText(removed)}.` : `${sage.name} criticized ${cardSuit.name}, but nothing was lost.`
    );
    return;
  }

  completeEncounter(
    cell,
    `Sage: ${sage.name}`,
    `${sage.neutral}\n\n${cardText(card)} produces no mechanical outcome.`,
    "Sage",
    `${sage.name} heard ${cardSuit.name} without effect.`
  );
}

function failSageQuestion(cell) {
  const sage = cell.sage;
  const removed = removeLowestCardOfEachSuit(true);
  const result = removed.length > 0 ? `You lose the lowest card of each suit you hold: ${cardListText(removed)}.` : "Your hand is empty, so the penalty finds nothing.";
  completeEncounter(
    cell,
    `Sage: ${sage.name}`,
    `The question is left unanswered.\n\n${result}`,
    "Sage",
    removed.length > 0 ? `${sage.name}'s question failed: lost ${removed.length} card(s).` : `${sage.name}'s question failed without loss.`
  );
}

function openRelicEncounter(cell) {
  state.awaitingChoice = true;
  const suit = suitById(cell.suit);
  const opposite = suitById(oppositeSuitId(cell.suit));
  setEvent(cell.title, cell.description, "Relic", eventArtForCell(cell));

  showModal({
    kicker: "Relic",
    title: cell.relic.title,
    body: `${cell.description}\n\nTake it to gain ${rankLabel(cell.rank)} of ${suit.name}, then lose the lowest ${opposite.name} card if present.`,
    art: eventArtForCell(cell),
    actions: [
      { label: "Take", kind: "primary", action: () => takeRelic(cell) },
      { label: "Leave", kind: "secondary", action: () => passEncounter(cell, "You leave the relic where it waits.") }
    ]
  });
}

function takeRelic(cell) {
  const suit = suitById(cell.suit);
  const opposite = suitById(oppositeSuitId(cell.suit));
  const removed = removeLowestCardsOfSuit(opposite.id, 1, true);
  addCard(cell.suit, cell.rank, true);
  enforceHandLimit();
  const lossText = removed.length > 0 ? `The relic takes ${cardListText(removed)}.` : `No ${opposite.name} card is present to pay the old price.`;
  completeEncounter(
    cell,
    cell.title,
    `${cell.description}\n\nYou receive ${rankLabel(cell.rank)} of ${suit.name}. ${lossText}`,
    "Relic",
    `Took ${cell.relic.title}: gained ${rankLabel(cell.rank)} of ${suit.name}.`
  );
}

function openTextEncounter(cell) {
  state.awaitingChoice = true;
  const suit = suitById(cell.suit);
  setEvent(cell.title, cell.description, "Text", eventArtForCell(cell));

  showModal({
    kicker: "Text",
    title: cell.text.title,
    body: `${cell.description}\n\nInterpret it with a card. Matching ${suit.name} upgrades that card. Opposing ${suitById(oppositeSuitId(cell.suit)).name} loses the interpreter. Neutral suits gain a smaller ${suit.name} card.`,
    art: eventArtForCell(cell),
    cards: state.hand.map((card) => ({
      card,
      label: `${rankShort(card.rank)} ${suitById(card.suit).name}`,
      action: () => interpretTextWithCard(cell, card.id)
    })),
    actions: [
      { label: "Leave unread", kind: "secondary", action: () => passEncounter(cell, "You leave the text closed.") }
    ]
  });
}

function interpretTextWithCard(cell, cardId) {
  const card = state.hand.find((item) => item.id === cardId);
  if (!card) {
    passEncounter(cell, "The text receives no interpreter.");
    return;
  }

  const textSuit = suitById(cell.suit);
  if (card.suit === cell.suit) {
    const oldRank = card.rank;
    if (card.rank < 14) card.rank += 1;
    rememberDiscoveredCard(card);
    completeEncounter(
      cell,
      cell.title,
      `${cell.description}\n\nThe text recognizes its own doctrine. ${cardText(card)} ${oldRank === card.rank ? "is already an Ace." : `rises from ${rankLabel(oldRank)} to ${rankLabel(card.rank)}.`}`,
      "Text",
      `Interpreted ${cell.text.title} with ${textSuit.name}.`
    );
    return;
  }

  if (card.suit === oppositeSuitId(cell.suit)) {
    const removed = removeCard(card.id, true);
    completeEncounter(
      cell,
      cell.title,
      `${cell.description}\n\nThe text rejects its opposite. You lose ${cardText(removed)}.`,
      "Text",
      `Text rejected ${cardText(removed)}.`
    );
    return;
  }

  const rewardRank = Math.max(2, Math.min(10, cell.rank - 1));
  addCard(cell.suit, rewardRank, true);
  enforceHandLimit();
  completeEncounter(
    cell,
    cell.title,
    `${cell.description}\n\nThe interpretation is oblique but fertile. You receive ${rankLabel(rewardRank)} of ${textSuit.name}.`,
    "Text",
    `Text produced ${rankLabel(rewardRank)} of ${textSuit.name}.`
  );
}

function openTemptationEncounter(cell) {
  state.awaitingChoice = true;
  const suit = suitById(cell.suit);
  setEvent(cell.title, cell.description, "Temptation", eventArtForCell(cell));

  showModal({
    kicker: "Temptation",
    title: cell.temptation.title,
    body: `${cell.description}\n\nAccept to gain ${rankLabel(cell.temptationRank)} of ${suit.name}. The price is your two lowest cards outside ${suit.name}, if any.`,
    art: eventArtForCell(cell),
    actions: [
      { label: "Accept", kind: "primary", action: () => acceptTemptation(cell) },
      { label: "Refuse", kind: "secondary", action: () => passEncounter(cell, "You refuse the offered certainty.") }
    ]
  });
}

function acceptTemptation(cell) {
  const suit = suitById(cell.suit);
  const removed = removeLowestCardsOutsideSuit(cell.suit, 2, true);
  addCard(cell.suit, cell.temptationRank, true);
  enforceHandLimit();
  const price = removed.length > 0 ? `The price is ${cardListText(removed)}.` : "The price finds no other suit to consume.";
  completeEncounter(
    cell,
    cell.title,
    `${cell.description}\n\nYou receive ${rankLabel(cell.temptationRank)} of ${suit.name}. ${price}`,
    "Temptation",
    `Accepted ${cell.temptation.title}: gained ${rankLabel(cell.temptationRank)} of ${suit.name}.`
  );
}

function resolveContradictionEncounter(cell) {
  const targetSuitId = currentDominantSuitId();
  if (!targetSuitId) {
    completeAutomaticEncounter(
      cell,
      "Contradiction",
      "No single suit leads clearly enough for the path to contradict it.",
      "Contradiction",
      "Contradiction found no clear target."
    );
    return;
  }

  const attackingSuitId = oppositeSuitId(targetSuitId);
  const contradiction = pick(CONTRADICTIONS.filter((item) => item.suit === attackingSuitId));
  cell.title = `Contradiction: ${contradiction.title}`;
  cell.description = contradiction.description;
  cell.suit = attackingSuitId;
  cell.targetSuit = targetSuitId;

  const targetSuit = suitById(targetSuitId);
  const attackingSuit = suitById(attackingSuitId);
  const removed = removeLowestCardsOfSuit(targetSuitId, 1, true);
  if (removed.length > 0) {
    completeAutomaticEncounter(
      cell,
      cell.title,
      `${contradiction.description}\n\n${attackingSuit.name} contradicts your leading ${targetSuit.name}. You lose ${cardListText(removed)}.`,
      "Contradiction",
      `Contradiction cut ${cardListText(removed)}.`
    );
    return;
  }

  addCard(attackingSuitId, Math.max(2, Math.min(6, cell.rank)), true);
  enforceHandLimit();
  completeAutomaticEncounter(
    cell,
    cell.title,
    `${contradiction.description}\n\nNo ${targetSuit.name} card is present, so the contradiction becomes ${rankLabel(Math.max(2, Math.min(6, cell.rank)))} of ${attackingSuit.name}.`,
    "Contradiction",
    `Contradiction created ${attackingSuit.name}.`
  );
}

function resolveDreamEncounter(cell) {
  const leaders = leadingSuitEntries();
  if (leaders.length === 0) {
    completeAutomaticEncounter(cell, cell.title, `${cell.description}\n\nThe empty hand leaves no image behind.`, "Dream", "Dream passed through an empty hand.");
    return;
  }

  if (leaders.length === 1) {
    const suit = leaders[0].suit;
    const rank = Math.max(2, Math.min(cell.rank, 10));
    addCard(suit.id, rank, true);
    enforceHandLimit();
    completeAutomaticEncounter(
      cell,
      cell.title,
      `${cell.description}\n\n${suit.name} leads the dream. You receive ${rankLabel(rank)} of ${suit.name}.`,
      "Dream",
      `Dream strengthened ${suit.name}.`
    );
    return;
  }

  const targetSuit = pick(leaders).suit;
  const removed = removeLowestCardsOfSuit(targetSuit.id, 1, true);
  completeAutomaticEncounter(
    cell,
    cell.title,
    `${cell.description}\n\nThe dream cannot choose between ${leaders.map((entry) => entry.suit.name).join(", ")}. You lose ${cardListText(removed)}.`,
    "Dream",
    removed.length > 0 ? `Dream broke a tie by losing ${cardListText(removed)}.` : "Dream tie caused no loss."
  );
}

function resolveEchoEncounter(cell) {
  const memory = state.lastCardEvent;
  if (!memory) {
    completeAutomaticEncounter(cell, cell.title, `${cell.description}\n\nNo earlier gain or loss answers the echo.`, "Echo", "Echo found no card memory.");
    return;
  }

  const suit = suitById(memory.suit);
  const positive = state.rng() < 0.5;
  if (positive) {
    const rank = Math.max(2, Math.min(13, memory.rank - 1));
    addCard(memory.suit, rank, true);
    enforceHandLimit();
    completeAutomaticEncounter(
      cell,
      cell.title,
      `${cell.description}\n\nThe echo repeats ${memory.text} as a weaker gift. You receive ${rankLabel(rank)} of ${suit.name}.`,
      "Echo",
      `Echo gained ${rankLabel(rank)} of ${suit.name}.`
    );
    return;
  }

  const removed = removeLowestCardsOfSuit(memory.suit, 1, true);
  completeAutomaticEncounter(
    cell,
    cell.title,
    `${cell.description}\n\nThe echo turns against ${suit.name}. ${removed.length > 0 ? `You lose ${cardListText(removed)}.` : "No such card remains to lose."}`,
    "Echo",
    removed.length > 0 ? `Echo lost ${cardListText(removed)}.` : "Echo loss missed."
  );
}

function passEncounter(cell, message) {
  completeEncounter(cell, cell.title, message, encounterKicker(cell), "Passed encounter.");
}

function showCellResultModal(cell, title, body, kicker, afterContinue = null) {
  state.awaitingChoice = true;
  showModal({
    kicker,
    title,
    body,
    art: eventArtForCell(cell),
    actions: [
      {
        label: "Continue",
        kind: "primary",
        action: () => {
          closeModal();
          state.awaitingChoice = false;
          if (afterContinue) {
            afterContinue();
            return;
          }
          render();
        }
      }
    ]
  });
}

function completeAutomaticEncounter(cell, title, body, kicker, logText) {
  cell.resolved = true;
  setEvent(title, body, kicker, eventArtForCell(cell));
  addLog(logText);
  showCellResultModal(cell, title, body, kicker);
}

function completeEncounter(cell, title, body, kicker, logText) {
  cell.resolved = true;
  setEvent(title, body, kicker, eventArtForCell(cell));
  addLog(logText);
  render();
  showCellResultModal(cell, title, body, kicker);
}

function encounterKicker(cell) {
  if (!cell.encounterType) return "Encounter";
  return cell.encounterType.charAt(0).toUpperCase() + cell.encounterType.slice(1);
}

function openDilemma(branchNumber, savedDilemma = null) {
  const branch = BRANCHES[branchNumber - 1];
  const dilemma = savedDilemma || state.currentDilemma || pick(DILEMMAS[branchNumber]);
  state.currentDilemma = dilemma;
  state.awaitingChoice = true;
  state.pendingChoice = { type: "dilemma", branchNumber };

  const eligible = state.hand.filter((card) => card.rank >= branch.threshold);
  const dilemmaArt = dilemmaArtFor(dilemma);
  const body = `${dilemma.description}\n\n${dilemma.prompt}\n\nRequires ${rankLabel(branch.threshold)} or higher. Choose a card to resolve it, or fail intentionally.`;
  const cardButtons = eligible.map((card) => ({
    card,
    label: `${rankShort(card.rank)} ${suitById(card.suit).name}`,
    action: () => resolveDilemmaWithCard(card.id)
  }));

  showModal({
    kicker: `Dilemma ${branch.roman}`,
    title: dilemma.title,
    body,
    cards: cardButtons,
    art: dilemmaArt,
    actions: [
      {
        label: eligible.length === 0 ? "Return without answer" : "Fail intentionally",
        kind: "secondary",
        action: () => failDilemma(branchNumber)
      }
    ]
  });
}

function resolveDilemmaWithCard(cardId) {
  const card = state.hand.find((item) => item.id === cardId);
  if (!card || !state.currentDilemma) return;

  const dilemma = state.currentDilemma;
  const dilemmaArt = dilemmaArtFor(dilemma);
  const suit = suitById(card.suit);
  const oldRank = card.rank;
  if (card.rank < 14) card.rank += 1;
  const branch = currentBranch();
  state.solvedDilemmas.add(branch.number);
  rememberDiscoveredCard(card);
  rememberDilemmaRecord(branch, dilemma, suit);

  const upgradeText = oldRank === card.rank ? `${cardText(card)} is already an Ace.` : `${rankLabel(oldRank)} becomes ${rankLabel(card.rank)}.`;
  const outcome = dilemma.outcomes[card.suit];
  addLog(`Resolved Dilemma ${branch.roman} with ${suit.name}.`);

  showModal({
    kicker: `${suit.name} answer`,
    title: "Dilemma Resolved",
    body: `${outcome}\n\n${upgradeText}`,
    art: dilemmaArt,
    actions: [
      {
        label: "Continue",
        kind: "primary",
        action: () => {
          state.awaitingChoice = false;
          state.currentDilemma = null;
          state.pendingChoice = null;
          closeModal();
          setEvent("Checkpoint Passed", `Dilemma ${branch.roman} is solved. The next branch opens.`, "Dilemma");
          render();
          autosave();
        }
      }
    ]
  });
  render();
}

function failDilemma(branchNumber) {
  const branch = BRANCHES[branchNumber - 1];
  const dilemmaArt = dilemmaArtFor(state.currentDilemma);
  const removed = removeRandomHighestCardAtLeast(branch.threshold, true);
  const fallbackPosition = branch.start - 1;
  state.position = fallbackPosition;
  rerollFutureCellsInBranch(branchNumber, state.position);
  const replenished = branchNumber === 1 ? topUpHandTo(FIRST_DILEMMA_RETRY_HAND_SIZE, "low") : [];
  const removedText = removed
    ? `The path takes ${cardText(removed)}.`
    : `No card of ${rankLabel(branch.threshold)} or higher is present, so the failure takes no card.`;
  const replenishText = replenished.length > 0
    ? `\n\nAt the threshold of the first branch, the hand is restored to ${FIRST_DILEMMA_RETRY_HAND_SIZE}: ${cardListText(replenished)}.`
    : "";
  addLog(`Failed Dilemma ${branch.roman}.`);
  if (replenished.length > 0) {
    addLog(`The first branch restores ${cardListText(replenished)}.`);
  }

  showModal({
    kicker: `Dilemma ${branch.roman}`,
    title: "The Question Remains",
    body: `${removedText}${replenishText}\n\nYou return to the beginning of ${branch.name}.`,
    art: dilemmaArt,
    actions: [
      {
        label: "Continue",
        kind: "primary",
        action: () => {
          state.awaitingChoice = false;
          state.currentDilemma = null;
          state.pendingChoice = null;
          closeModal();
          setEvent("Returned to the Branch", `The path reforms before ${branch.name}.`, "Failure");
          render();
          autosave();
        }
      }
    ]
  });
  render();
}

function suitTotals() {
  return SUITS.map((suit) => ({
    suit,
    total: state.hand.filter((card) => card.suit === suit.id).reduce((sum, card) => sum + card.rank, 0),
    hasAce: state.hand.some((card) => card.suit === suit.id && card.rank === 14)
  }));
}

function openRevelation() {
  state.awaitingChoice = true;
  state.pendingChoice = { type: "revelation" };
  const totals = suitTotals();
  const highest = Math.max(...totals.map((entry) => entry.total));
  const leaders = totals.filter((entry) => entry.total === highest);
  const strongLeaders = leaders.filter((entry) => entry.total > REVELATION_THRESHOLD && entry.hasAce);
  const summary = totals.map((entry) => `${entry.suit.name}: ${entry.total}${entry.hasAce ? " + Ace" : ""}`).join("\n");

  if (strongLeaders.length === 0) {
    state.gameOver = true;
    state.awaitingChoice = false;
    state.pendingChoice = null;
    const failureText = revelationFailureReason(leaders, highest);
    rememberRevelationRecord(null, "failed", highest, `${failureText} The seeker reached the final cell without the force required to open the Revelation.`);
    addLog("The Revelation failed. The seeker reached the final threshold unprepared.");
    setEvent("Revelation Failed", `${failureText} The final threshold does not open.`, "Failure");
    showModal({
      kicker: "Failed Revelation",
      title: "The Gate Remains Shut",
      body: `${failureText}\n\n${summary}\n\nThe seeker has reached the final cell, but no leading suit both exceeds ${REVELATION_THRESHOLD} and bears its Ace. The Revelation does not diminish itself into a gentler answer. The run ends in failure.`,
      art: REVELATION_FAILURE_ANIMATION,
      actions: [
        { label: "Play Again", kind: "primary", action: startGame },
        { label: "Menu", kind: "secondary", action: () => { closeModal(); showScreen("menu"); } }
      ]
    });
    render();
    return;
  }

  if (strongLeaders.length > 1) {
    showModal({
      kicker: "Revelation",
      title: "A Divided Threshold",
      body: `Several leading suits stand equal at ${highest}, each bearing its Ace. Choose which one names the Revelation.\n\n${summary}`,
      cards: strongLeaders.map((entry) => ({
        card: { suit: entry.suit.id, rank: 14 },
        label: entry.suit.name,
        action: () => chooseRevelationSuit(entry.suit, highest, summary)
      }))
    });
    return;
  }

  chooseRevelationSuit(strongLeaders[0].suit, highest, summary);
}

function revelationFailureReason(leaders, highest) {
  if (highest <= REVELATION_THRESHOLD) {
    return `No leading suit exceeds ${REVELATION_THRESHOLD}.`;
  }

  const names = leaders.map((entry) => entry.suit.name).join(", ");
  if (leaders.length === 1) {
    return `${names} leads with ${highest}, but the Ace of ${names} is absent.`;
  }
  return `${names} lead with ${highest}, but none of those leading suits carries its Ace.`;
}

function chooseRevelationSuit(suit, score, summary) {
  state.awaitingChoice = true;
  state.pendingChoice = { type: "revelationSuit", suitId: suit.id, score, summary };
  showModal({
    kicker: "Revelation",
    title: `${suit.name} Ascendant`,
    body: `${suit.name} reaches ${score}, exceeds ${REVELATION_THRESHOLD}, and bears its Ace.\n\n${summary}\n\nWill the seeker embrace this revelation, or refuse to let it become the final word?`,
    actions: [
      {
        label: "Embrace",
        kind: "primary",
        action: () => finishRevelation(suit, "embrace")
      },
      {
        label: "Refuse",
        kind: "secondary",
        action: () => finishRevelation(suit, "refuse")
      }
    ]
  });
}

function finishRevelation(suit, stance) {
  state.gameOver = true;
  state.awaitingChoice = false;
  state.pendingChoice = null;
  const totals = suitTotals();
  const score = totals.find((entry) => entry.suit.id === suit.id)?.total || 0;
  const art = stance === "embrace" ? REVELATION_ANIMATIONS[suit.id] : null;
  rememberRevelationRecord(suit, stance, score, ENDINGS[suit.id][stance]);
  addLog(`The Revelation resolves through ${suit.name}.`);
  setEvent(`${suit.name} Revelation`, ENDINGS[suit.id][stance], stance === "embrace" ? "Embraced" : "Refused");
  showModal({
    kicker: stance === "embrace" ? "Embraced" : "Refused",
    title: `${suit.name} Revelation`,
    body: ENDINGS[suit.id][stance],
    art,
    actions: [
      { label: "Play Again", kind: "primary", action: startGame },
      { label: "Menu", kind: "secondary", action: () => { closeModal(); showScreen("menu"); } }
    ]
  });
  render();
}

function mergeGroups() {
  const groups = new Map();
  state.hand.forEach((card) => {
    if (card.rank >= 14) return;
    const key = `${card.suit}:${card.rank}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(card);
  });
  return Array.from(groups.entries())
    .filter(([, cards]) => cards.length >= 2)
    .map(([key, cards]) => {
      const [suit, rank] = key.split(":");
      return { key, suit, rank: Number(rank), cards };
    });
}

function mergeCards(group) {
  if (state.awaitingChoice || state.gameOver) return;
  const first = group.cards[0];
  const second = group.cards[1];
  removeCard(first.id);
  removeCard(second.id);
  addCard(group.suit, group.rank + 1, true);
  addLog(`Merged two ${rankLabel(group.rank)} of ${suitById(group.suit).name}.`);
  setEvent("Cards Merged", `Two ${rankLabel(group.rank)} of ${suitById(group.suit).name} become one ${rankLabel(group.rank + 1)} of ${suitById(group.suit).name}.`, "Merge");
  render();
}

function setEvent(title, body, kicker, art = null) {
  state.event = { title, body, kicker, art };
  els.eventTitle.textContent = title;
  els.eventBody.textContent = body;
  els.eventKicker.textContent = kicker;
  renderEventArt(art);
}

function renderEventArt(art) {
  if (!els.eventCard || !els.eventCardImage || !els.eventCardCaption || !els.stageCopy) return;

  if (!art) {
    els.eventCard.classList.add("hidden");
    els.eventCard.setAttribute("aria-hidden", "true");
    els.eventCardImage.removeAttribute("src");
    els.eventCardImage.alt = "";
    els.eventCardCaption.textContent = "";
    els.stageCopy.classList.remove("has-event-art");
    return;
  }

  els.eventCardImage.src = art.src;
  els.eventCardImage.alt = `${kickeredArtTitle(art)} card art`;
  els.eventCardCaption.textContent = art.title;
  els.eventCard.classList.remove("hidden");
  els.eventCard.setAttribute("aria-hidden", "false");
  els.stageCopy.classList.add("has-event-art");
}

function kickeredArtTitle(art) {
  return art?.title || "Event";
}

function addLog(text) {
  state.log.unshift(text);
  state.log = state.log.slice(0, 50);
}

const modalAnimation = {
  token: 0,
  timers: []
};

function clearModalAnimation() {
  modalAnimation.token += 1;
  modalAnimation.timers.forEach((timer) => clearTimeout(timer));
  modalAnimation.timers = [];
  if (els.modalBody) els.modalBody.classList.remove("is-typing");
}

function scheduleModalAnimation(callback, delay) {
  const token = modalAnimation.token;
  const timer = setTimeout(() => {
    modalAnimation.timers = modalAnimation.timers.filter((item) => item !== timer);
    if (token === modalAnimation.token) callback(token);
  }, delay);
  modalAnimation.timers.push(timer);
}

function showModal({ kicker, title, body, cards = [], actions = [], art = null }) {
  clearModalAnimation();
  const token = modalAnimation.token;
  const fullBody = String(body || "");

  els.modalPanel.classList.remove("has-modal-art", "has-revelation-animation");
  els.modalKicker.textContent = kicker;
  els.modalTitle.textContent = title;
  els.modalBody.textContent = "";
  els.modalBody.classList.add("is-typing");
  els.modalExtra.innerHTML = "";
  els.modalActions.innerHTML = "";
  renderModalArt({ kicker, title, art });
  els.modal.classList.remove("is-visible", "is-copying", "is-ready");
  els.modal.classList.add("is-opening", "is-typing");

  if (cards.length > 0) {
    const cardWrap = document.createElement("div");
    cardWrap.className = "choice-cards";
    cards.forEach((item) => {
      const art = cardArtFor(item.card);
      const cardButton = document.createElement("button");
      cardButton.type = "button";
      cardButton.className = `choice-card suit-${item.card.suit}${art ? " has-card-art" : ""}`;
      if (art) {
        cardButton.innerHTML = `
          <img class="choice-card-art" src="${art.src}" alt="${cardAltText(item.card, art)}" loading="lazy" decoding="async">
          <span class="choice-card-copy">
            <span class="choice-rank">${rankShort(item.card.rank)}</span>
            <span>${item.label}</span>
          </span>
        `;
      } else {
        cardButton.innerHTML = `
          <span class="choice-rank">${rankShort(item.card.rank)}</span>
          <span>${item.label}</span>
        `;
      }
      cardButton.addEventListener("click", item.action);
      cardWrap.appendChild(cardButton);
    });
    els.modalExtra.appendChild(cardWrap);
  }

  actions.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = item.kind === "primary" ? "primary-action" : "secondary-action";
    button.textContent = item.label;
    button.addEventListener("click", item.action);
    els.modalActions.appendChild(button);
  });

  setModalControlsEnabled(false);
  els.modal.classList.remove("hidden");

  requestAnimationFrame(() => {
    if (token === modalAnimation.token) els.modal.classList.add("is-visible");
  });

  scheduleModalAnimation(() => {
    els.modal.classList.add("is-copying");
    typeModalBody(fullBody, token);
  }, MODAL_COPY_DELAY_MS);
}

function setModalControlsEnabled(enabled) {
  const controls = [
    ...els.modalExtra.querySelectorAll("button"),
    ...els.modalActions.querySelectorAll("button")
  ];
  controls.forEach((control) => {
    control.disabled = !enabled;
  });
  els.modalExtra.setAttribute("aria-hidden", String(!enabled));
  els.modalActions.setAttribute("aria-hidden", String(!enabled));
}

function typeModalBody(fullBody, token) {
  if (token !== modalAnimation.token) return;
  let visibleLength = 0;
  const text = String(fullBody || "");

  function tick() {
    if (token !== modalAnimation.token) return;
    visibleLength = Math.min(text.length, visibleLength + MODAL_TYPE_CHARS_PER_TICK);
    els.modalBody.textContent = text.slice(0, visibleLength);

    if (visibleLength >= text.length) {
      finishModalReveal(text, token);
      return;
    }

    scheduleModalAnimation(tick, MODAL_TYPE_INTERVAL_MS);
  }

  if (!text) {
    finishModalReveal(text, token);
    return;
  }

  tick();
}

function finishModalReveal(fullBody, token) {
  if (token !== modalAnimation.token) return;
  els.modalBody.textContent = fullBody;
  els.modalBody.classList.remove("is-typing");
  els.modal.classList.remove("is-opening", "is-typing");
  els.modal.classList.add("is-ready");
  setModalControlsEnabled(true);
}

function renderModalArt({ kicker, title, art }) {
  if (!els.modalArt || !els.modalArtImage || !els.modalArtFallback || !els.modalArtCaption) return;

  els.modalPanel.classList.add("has-modal-art");
  els.modalArtCaption.textContent = art?.title || title || kicker || "Cell";
  if (els.modalArtFrame) {
    els.modalArtFrame.removeAttribute("src");
    els.modalArtFrame.title = "";
    els.modalArtFrame.classList.add("hidden");
  }

  if (art?.kind === "animation" && art?.src && els.modalArtFrame) {
    els.modalPanel.classList.add("has-revelation-animation");
    els.modalArtImage.removeAttribute("src");
    els.modalArtImage.onerror = null;
    els.modalArtImage.alt = "";
    els.modalArtImage.classList.add("hidden");
    els.modalArtFallback.classList.add("hidden");
    els.modalArtFrame.src = art.src;
    els.modalArtFrame.title = `${art.title || title || "Revelation"} animation`;
    els.modalArtFrame.classList.remove("hidden");
    return;
  }

  if (art?.src) {
    els.modalArtImage.onerror = () => {
      els.modalArtImage.removeAttribute("src");
      els.modalArtImage.alt = "";
      els.modalArtImage.classList.add("hidden");
      els.modalArtFallback.classList.remove("hidden");
      if (els.modalArtSymbol) els.modalArtSymbol.textContent = modalSymbolFor(kicker, title);
    };
    els.modalArtImage.src = art.src;
    els.modalArtImage.alt = `${art.title || title || "Cell"} image`;
    els.modalArtImage.classList.remove("hidden");
    els.modalArtFallback.classList.add("hidden");
    return;
  }

  els.modalArtImage.removeAttribute("src");
  els.modalArtImage.onerror = null;
  els.modalArtImage.alt = "";
  els.modalArtImage.classList.add("hidden");
  els.modalArtFallback.classList.remove("hidden");
  if (els.modalArtSymbol) els.modalArtSymbol.textContent = modalSymbolFor(kicker, title);
}

function modalSymbolFor(kicker, title) {
  const value = `${kicker || ""} ${title || ""}`.toLowerCase();
  if (value.includes("revelation")) return "REV";
  if (value.includes("dilemma")) return "D";
  if (value.includes("synthesis") || value.includes("merge")) return "SYN";
  if (value.includes("score")) return "SUM";
  if (value.includes("option")) return "OPT";
  if (value.includes("codex")) return "COD";
  return "STEP";
}

function closeModal() {
  clearModalAnimation();
  els.modal.classList.add("hidden");
  els.modal.classList.remove("is-visible", "is-opening", "is-copying", "is-typing", "is-ready");
  els.modalPanel.classList.remove("has-revelation-animation");
  els.modalExtra.innerHTML = "";
  els.modalActions.innerHTML = "";
  if (els.modalArtImage) {
    els.modalArtImage.onerror = null;
    els.modalArtImage.removeAttribute("src");
    els.modalArtImage.alt = "";
  }
  if (els.modalArtFrame) {
    els.modalArtFrame.removeAttribute("src");
    els.modalArtFrame.title = "";
    els.modalArtFrame.classList.add("hidden");
  }
}

function textCardMarkup(card) {
  const suit = suitById(card.suit);
  return `
    <div class="card-corner card-corner-top">
      <span class="card-rank">${rankShort(card.rank)}</span>
      <span class="card-suit-code">${suit.short}</span>
    </div>
    <div class="card-center">
      <span class="card-suit-mark">${suit.short}</span>
      <strong>${rankLabel(card.rank)} of ${suit.name}</strong>
      <small>${suit.philosophy}</small>
    </div>
    <div class="card-corner card-corner-bottom" aria-hidden="true">
      <span class="card-rank">${rankShort(card.rank)}</span>
      <span class="card-suit-code">${suit.short}</span>
    </div>
  `;
}

function openCardViewer(card) {
  const art = cardArtFor(card);
  const suit = suitById(card.suit);
  els.cardViewerCard.innerHTML = "";
  els.cardViewerFrame.className = `card-viewer-frame suit-${card.suit}`;
  els.cardViewerKicker.textContent = art ? art.title : suit.philosophy;
  els.cardViewerTitle.textContent = cardText(card);
  els.cardViewerDescription.textContent = cardDescriptionFor(card);

  if (art) {
    const image = document.createElement("img");
    image.className = "card-viewer-image";
    image.src = art.src;
    image.alt = cardAltText(card, art);
    image.addEventListener("click", closeCardViewer);
    els.cardViewerCard.appendChild(image);
  } else {
    const fallback = document.createElement("button");
    fallback.type = "button";
    fallback.className = `card-placeholder card-viewer-fallback suit-${card.suit}`;
    fallback.setAttribute("aria-label", cardAltText(card, art));
    fallback.innerHTML = textCardMarkup(card);
    fallback.addEventListener("click", closeCardViewer);
    els.cardViewerCard.appendChild(fallback);
  }

  els.cardViewer.classList.remove("hidden");
}

function closeCardViewer() {
  els.cardViewer.classList.add("hidden");
  els.cardViewerCard.innerHTML = "";
}

function render() {
  sortHand();
  clampHandOffset();
  renderStatus();
  renderRibbon();
  renderHand();
  renderHandNavigation();
  renderSortControls();
  renderSuitTotals();
  renderMerges();
  renderLog();
  if (!els.codexOverlay.classList.contains("hidden")) renderCodex();
  els.stepButton.disabled = state.awaitingChoice || state.gameOver;
}

function renderStatus() {
  const branch = currentBranch();
  els.positionReadout.textContent = `${state.position} / ${REVELATION_CELL}`;
  els.branchReadout.textContent = `${branch.roman}: ${branch.name}`;
  els.dilemmasReadout.textContent = `${state.solvedDilemmas.size} / ${CHECKPOINT_BRANCHES.length}`;
  els.handReadout.textContent = `${state.hand.length} / ${MAX_HAND}`;
  els.stepsReadout.textContent = String(state.steps);
  els.playerReadout.textContent = state.playerName || "None";
  renderSaveStatus();
}

function renderRibbon() {
  els.ribbon.innerHTML = "";
  let currentTile = null;

  BRANCHES.forEach((branch) => {
    const group = document.createElement("section");
    group.className = "ribbon-branch";
    group.setAttribute("aria-label", branch.name);

    const heading = document.createElement("h3");
    heading.className = "ribbon-branch-title";
    heading.textContent = `${branch.roman}. ${branch.name.replace(/^The\s+/i, "")}`;
    group.appendChild(heading);

    const branchEnd = Math.min(branch.dilemma, REVELATION_CELL - 1);
    for (let position = branch.start; position <= branchEnd; position += 1) {
      const tile = makeRibbonTile(position);
      if (position === state.position) currentTile = tile;
      group.appendChild(tile);
    }

    els.ribbon.appendChild(group);
  });

  const revelationGroup = document.createElement("section");
  revelationGroup.className = "ribbon-branch ribbon-revelation-branch";
  revelationGroup.setAttribute("aria-label", "Revelation");
  const revelationHeading = document.createElement("h3");
  revelationHeading.className = "ribbon-branch-title";
  revelationHeading.textContent = "Revelation";
  const revelationTile = makeRibbonTile(REVELATION_CELL);
  if (state.position === REVELATION_CELL) currentTile = revelationTile;
  revelationGroup.append(revelationHeading, revelationTile);
  els.ribbon.appendChild(revelationGroup);

  if (currentTile) {
    requestAnimationFrame(() => {
      currentTile.scrollIntoView({ block: "center", inline: "nearest" });
    });
  }
}

function makeRibbonTile(position) {
  const cell = state.cells[position];
  const tile = document.createElement("div");
  tile.className = `ribbon-cell ${cell.type}`;
  if (position === state.position) tile.classList.add("current");
  if (position < state.position) tile.classList.add("passed");
  if (cell.type !== "dilemma" && cell.type !== "revelation" && !cell.revealed) tile.classList.add("hidden-cell");
  if (cell.type === "dilemma" && state.solvedDilemmas.has(cell.branch)) tile.classList.add("solved");

  const label = document.createElement("strong");
  label.textContent = String(position);
  const type = document.createElement("span");
  type.textContent = ribbonLabel(cell);
  tile.append(label, type);
  tile.title = cellTitle(cell);
  return tile;
}

function ribbonLabel(cell) {
  if (cell.type === "dilemma") return `D${cell.branch}`;
  if (cell.type === "revelation") return "REV";
  if (!cell.revealed) return "?";
  if (cell.type === "draw") return encounterKicker(cell).slice(0, 5);
  if (cell.type === "lose") return "Lose";
  if (cell.type === "advance") return "Adv";
  if (cell.type === "retreat") return "Back";
  return "Rest";
}

function cellTitle(cell) {
  if (cell.type === "dilemma" || cell.type === "revelation" || cell.revealed) {
    return `${cell.title}: ${cell.description}`;
  }
  return "Unrevealed cell";
}

function renderHand() {
  els.hand.innerHTML = "";
  if (state.hand.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "No cards in hand.";
    els.hand.appendChild(empty);
    return;
  }

  const visibleCards = state.hand.slice(state.handOffset, state.handOffset + HAND_WINDOW_SIZE);
  visibleCards.forEach((card) => {
    const art = cardArtFor(card);
    const item = document.createElement("button");
    item.type = "button";
    item.className = `card-placeholder suit-${card.suit}${art ? " has-card-art" : ""}`;
    item.setAttribute("aria-label", cardAltText(card, art));
    if (art) {
      item.style.backgroundImage = `url("${art.src}")`;
      item.innerHTML = `
        <img class="card-art-image" src="${art.src}" alt="${cardAltText(card, art)}" decoding="async">
      `;
    } else {
      item.innerHTML = textCardMarkup(card);
    }
    item.addEventListener("click", () => openCardViewer(card));
    els.hand.appendChild(item);
  });
}

function renderHandNavigation() {
  const total = state.hand.length;
  const start = total === 0 ? 0 : state.handOffset + 1;
  const end = total === 0 ? 0 : Math.min(state.handOffset + HAND_WINDOW_SIZE, total);
  els.handWindowReadout.textContent = `${start}-${end} of ${total}`;
  els.handPrevButton.disabled = state.handOffset <= 0;
  els.handNextButton.disabled = state.handOffset >= maxHandOffset();
}

function renderSortControls() {
  const sortMode = normalizeHandSort(state.handSort);
  if (els.sortRankButton) {
    els.sortRankButton.setAttribute("aria-pressed", String(sortMode === "rank"));
  }
  if (els.sortSuitButton) {
    els.sortSuitButton.setAttribute("aria-pressed", String(sortMode === "suit"));
  }
}

function renderSuitTotals() {
  const totals = suitTotals();
  const totalsBySuit = new Map(totals.map((entry) => [entry.suit.id, entry]));
  const displayOrder = ["orbs", "daggers", "candles", "abysses"];
  const highest = Math.max(...totals.map((entry) => entry.total));
  const entries = displayOrder.map((suitId) => totalsBySuit.get(suitId)).filter(Boolean);

  els.suitTotals.innerHTML = `
    ${constellationBackdropMarkup()}
    ${entries.map((entry) => `
      <article
        class="suit-total constellation-node suit-${entry.suit.id}${entry.total === highest && highest > 0 ? " leading" : ""}"
        style="--suit-color: ${entry.suit.color}; --node-glow: ${scoreGlowForSuit(entry.suit.id)}; --node-dark: ${scoreDarkForSuit(entry.suit.id)}"
        aria-label="${escapeHtml(entry.suit.name)} score ${entry.total}${entry.hasAce ? ", Ace present" : ""}"
      >
        <span class="score-medallion" aria-hidden="true">
          ${suitSymbolMarkup(entry.suit.id)}
        </span>
        <strong>${entry.total}</strong>
        <span class="score-suit-name">${escapeHtml(entry.suit.name)}${entry.hasAce ? " / Ace" : ""}</span>
        <span class="score-spark" aria-hidden="true"></span>
      </article>
    `).join("")}
  `;
}

function constellationBackdropMarkup() {
  return `
    <svg class="constellation-map" viewBox="0 0 1000 190" preserveAspectRatio="none" aria-hidden="true">
      <path class="star-net faint" d="M45 72 L172 26 L300 84 L414 18 L566 82 L705 28 L874 70" />
      <path class="star-net faint" d="M118 126 L254 46 L382 138 L504 30 L633 126 L798 44 L948 106" />
      <path class="star-net dim" d="M210 10 L315 162 L512 18 L685 166 L822 16" />
      <path class="constellation-wire shadow" d="M78 108 C166 82 210 82 292 108 S430 134 508 108 S646 82 724 108 S860 134 940 104" />
      <path class="constellation-wire glow" d="M78 108 C166 82 210 82 292 108 S430 134 508 108 S646 82 724 108 S860 134 940 104" />
      <g class="star-points">
        <circle cx="78" cy="108" r="2.4" />
        <circle cx="172" cy="26" r="2" />
        <circle cx="254" cy="46" r="1.7" />
        <circle cx="315" cy="162" r="2.2" />
        <circle cx="414" cy="18" r="1.9" />
        <circle cx="504" cy="30" r="2.6" />
        <circle cx="633" cy="126" r="1.8" />
        <circle cx="705" cy="28" r="2.4" />
        <circle cx="798" cy="44" r="1.7" />
        <circle cx="874" cy="70" r="2.1" />
        <circle cx="940" cy="104" r="2.5" />
      </g>
    </svg>
  `;
}

function suitSymbolMarkup(suitId) {
  if (suitId === "orbs") {
    return `
      <svg class="suit-symbol" viewBox="0 0 64 64" focusable="false">
        <circle class="symbol-halo" cx="32" cy="32" r="24" />
        <circle class="symbol-stroke" cx="32" cy="32" r="15" />
        <circle class="symbol-fill-soft" cx="32" cy="32" r="8" />
        <path class="symbol-stroke thin" d="M13 32c8-8 30-8 38 0M18 22c9 6 19 6 28 0M18 42c9-6 19-6 28 0" />
      </svg>
    `;
  }

  if (suitId === "daggers") {
    return `
      <svg class="suit-symbol" viewBox="0 0 64 64" focusable="false">
        <path class="symbol-fill" d="M32 5l7 24-5 6v12h-4V35l-5-6 7-24z" />
        <path class="symbol-stroke" d="M32 5l7 24-5 6v12h-4V35l-5-6 7-24z" />
        <path class="symbol-stroke thin" d="M22 47h20M26 54h12M32 11v34" />
        <circle class="symbol-fill-soft" cx="32" cy="50" r="3" />
      </svg>
    `;
  }

  if (suitId === "candles") {
    return `
      <svg class="suit-symbol" viewBox="0 0 64 64" focusable="false">
        <path class="symbol-flame" d="M32 7c8 8 10 15 5 22-2 3-4 5-5 8-7-5-10-12-6-19 2-4 5-6 6-11z" />
        <path class="symbol-stroke" d="M32 7c8 8 10 15 5 22-2 3-4 5-5 8-7-5-10-12-6-19 2-4 5-6 6-11z" />
        <rect class="symbol-fill" x="25" y="34" width="14" height="18" rx="2" />
        <path class="symbol-stroke thin" d="M25 40h14M21 54h22M32 31v6" />
      </svg>
    `;
  }

  return `
    <svg class="suit-symbol" viewBox="0 0 64 64" focusable="false">
      <circle class="symbol-halo" cx="32" cy="32" r="23" />
      <circle class="symbol-stroke" cx="32" cy="32" r="18" />
      <circle class="symbol-void" cx="32" cy="32" r="13" />
      <path class="symbol-stroke thin" d="M16 32a16 16 0 0 0 32 0M20 21c8-5 16-5 24 0" />
    </svg>
  `;
}

function scoreGlowForSuit(suitId) {
  return {
    orbs: "#9de7ff",
    daggers: "#cc2e3c",
    candles: "#ffd28f",
    abysses: "#c6b6ff"
  }[suitId] || "#d6c08b";
}

function scoreDarkForSuit(suitId) {
  return {
    orbs: "#061923",
    daggers: "#21070a",
    candles: "#22170b",
    abysses: "#020205"
  }[suitId] || "#101114";
}

function renderMerges() {
  const groups = mergeGroups();
  els.mergePanel.innerHTML = "";
  els.mergeCount.textContent = groups.length === 0 ? "No merges" : `${groups.length} available`;
  renderSynthesisControls(groups.length);

  if (groups.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "Matching suit and rank pairs will appear here.";
    els.mergePanel.appendChild(empty);
    return;
  }

  groups.forEach((group) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `merge-button suit-${group.suit}`;
    button.textContent = `Merge two ${rankLabel(group.rank)} of ${suitById(group.suit).name} into ${rankLabel(group.rank + 1)}`;
    button.disabled = state.awaitingChoice || state.gameOver;
    button.addEventListener("click", () => mergeCards(group));
    els.mergePanel.appendChild(button);
  });
}

function renderSynthesisControls(mergeCount = mergeGroups().length) {
  els.synthesisCount.textContent = String(mergeCount);
  els.synthesisToggle.classList.toggle("has-merges", mergeCount > 0);
  els.synthesisToggle.setAttribute("aria-expanded", String(state.synthesisOpen));
  els.synthesisPanel.classList.toggle("hidden", !state.synthesisOpen);
}

function toggleSynthesis() {
  state.synthesisOpen = !state.synthesisOpen;
  renderSynthesisControls();
}

function renderLog() {
  els.log.innerHTML = "";
  if (state.log.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No steps recorded yet.";
    els.log.appendChild(item);
    els.logToggle.textContent = "Record Empty";
    els.logToggle.disabled = true;
    return;
  }
  els.logToggle.disabled = state.log.length <= 3;
  els.logToggle.setAttribute("aria-expanded", String(state.logExpanded));
  els.logToggle.textContent = state.logExpanded ? "Fold Recent Record" : "Unfold Complete Record";
  const entries = state.logExpanded ? state.log : state.log.slice(0, 3);
  entries.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = entry;
    els.log.appendChild(item);
  });
}

function toggleLog() {
  state.logExpanded = !state.logExpanded;
  renderLog();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[character]);
}

function openCodex() {
  state.codexTab = state.codexTab || "rules";
  els.codexOverlay.classList.remove("hidden");
  renderCodex();
}

function closeCodex() {
  els.codexOverlay.classList.add("hidden");
}

function setCodexTab(tab) {
  const allowedTabs = ["rules", "suits", "discovered", "branches"];
  state.codexTab = allowedTabs.includes(tab) ? tab : "rules";
  renderCodex();
}

function renderCodex() {
  renderCodexTabs();
  const renderers = {
    rules: renderRulesCodex,
    suits: renderSuitsCodex,
    discovered: renderDiscoveredCodex,
    branches: renderBranchesCodex
  };
  els.codexContent.innerHTML = (renderers[state.codexTab] || renderRulesCodex)();
}

function renderCodexTabs() {
  els.codexTabs.forEach((tab) => {
    tab.setAttribute("aria-pressed", String(tab.dataset.codexTab === state.codexTab));
  });
}

function renderRulesCodex() {
  const items = [
    ["Step", "Use the threshold control to move one cell. Ordinary cells stay hidden until landed on."],
    ["Encounters", "Former Draw cells now reveal Stranger, Sage, Relic, Text, Temptation, Contradiction, Dream, or Echo encounters."],
    ["Loss", "Loss cells cut cards of a named suit and tier. If no suitable card exists, the blow may miss."],
    ["Synthesis", "Two cards of the same suit and rank may merge into one card of that suit at the next rank."],
    ["Dilemmas", "The first four checkpoints ask for any card at or above their required rank. The used card rises by 1 rank unless it is already an Ace."],
    ["Revelation", `The final cell is the last dilemma: the leading suit must exceed ${REVELATION_THRESHOLD} and contain its Ace, or the run fails.`]
  ];

  return `
    <section class="codex-section">
      <p class="codex-lede">The Codex records only rules and knowledge already available to the seeker. Hidden cells remain unnamed.</p>
      <div class="codex-grid">
        ${items.map(([title, text]) => `
          <article class="codex-entry">
            <span>${escapeHtml(title)}</span>
            <p>${escapeHtml(text)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderSuitsCodex() {
  const totals = suitTotals();
  const highest = Math.max(...totals.map((entry) => entry.total));
  return `
    <section class="codex-section">
      <p class="codex-lede">Each suit is a philosophical answer, not a correct answer. The Revelation follows the strongest answer the hand can sustain.</p>
      <div class="codex-grid codex-suit-grid">
        ${totals.map((entry) => {
          const art = CODEX_SUIT_ART[entry.suit.id];
          return `
            <article class="codex-entry codex-suit-entry suit-${entry.suit.id}" style="--suit-color: ${entry.suit.color}">
              <figure class="codex-suit-art" style="--codex-suit-art: url('${escapeHtml(art.src)}')" aria-label="${escapeHtml(art.title)} emblem"></figure>
              <div class="codex-suit-copy">
                <span>${escapeHtml(entry.suit.name)}</span>
                <strong>${entry.total}${entry.total === highest && highest > 0 ? " leading" : ""}</strong>
                <p>${escapeHtml(entry.suit.philosophy)}</p>
                <small>${entry.hasAce ? "Ace present" : "Ace absent"}; Revelation needs score over ${REVELATION_THRESHOLD}.</small>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function codexCardEntries() {
  return state.discoveredCards
    .filter((card) => suitById(card.suit) && Number.isFinite(card.rank))
    .slice()
    .sort((a, b) => {
      const suitDifference = suitOrder(a.suit) - suitOrder(b.suit);
      if (suitDifference !== 0) return suitDifference;
      return a.rank - b.rank;
    });
}

function revealedEncounterEntries() {
  return Object.values(state.cells)
    .filter((cell) => cell && cell.type === "draw" && cell.revealed)
    .sort((a, b) => a.position - b.position);
}

function renderDiscoveredCodex() {
  const cards = codexCardEntries();
  const encounters = revealedEncounterEntries();
  const dilemmaRecords = state.codexRecords.dilemmas;
  return `
    <section class="codex-section">
      <p class="codex-lede">Discovered entries come from the current run: cards seen, encounters revealed, and dilemmas resolved.</p>
      <h3>Cards</h3>
      ${cards.length === 0 ? codexEmptyNote("No cards discovered yet.") : `
        <div class="codex-list">
          ${cards.map((card) => {
            const suit = suitById(card.suit);
            const held = state.hand.filter((item) => item.suit === card.suit && item.rank === card.rank).length;
            return `
              <article class="codex-entry suit-${card.suit}" style="--suit-color: ${suit.color}">
                <span>${escapeHtml(rankLabel(card.rank))} of ${escapeHtml(suit.name)}</span>
                <p>${escapeHtml(cardDescriptionFor(card))}</p>
                <small>${held > 0 ? `${held} currently in hand` : "not currently held"}</small>
              </article>
            `;
          }).join("")}
        </div>
      `}
      <h3>Encounters</h3>
      ${encounters.length === 0 ? codexEmptyNote("No encounters have been revealed.") : `
        <div class="codex-list">
          ${encounters.map((cell) => `
            <article class="codex-entry">
              <span>Cell ${cell.position} - ${escapeHtml(encounterKicker(cell))}</span>
              <strong>${escapeHtml(cell.title)}</strong>
              <p>${escapeHtml(cell.description)}</p>
            </article>
          `).join("")}
        </div>
      `}
      <h3>Dilemmas</h3>
      ${dilemmaRecords.length === 0 ? codexEmptyNote("No dilemma has been resolved yet.") : `
        <div class="codex-list">
          ${dilemmaRecords.map((record) => `
            <article class="codex-entry suit-${record.suit}" style="--suit-color: ${suitById(record.suit)?.color || "#d6c08b"}">
              <span>Branch ${escapeHtml(record.branchRoman)} - ${escapeHtml(record.suitName)}</span>
              <strong>${escapeHtml(record.title)}</strong>
              <p>Resolved on action ${record.step} in ${escapeHtml(record.branchName)}.</p>
            </article>
          `).join("")}
        </div>
      `}
    </section>
  `;
}

function codexEmptyNote(text) {
  return `<p class="empty-note codex-empty">${escapeHtml(text)}</p>`;
}

function branchStatus(branch) {
  const isCheckpointBranch = branch.dilemma < REVELATION_CELL;
  if (state.solvedDilemmas.has(branch.number)) return "Passed";
  if (state.position >= branch.start && state.position <= Math.min(branch.dilemma, REVELATION_CELL - 1)) return "Current";
  if (!isCheckpointBranch) return CHECKPOINT_BRANCHES.every((checkpoint) => state.solvedDilemmas.has(checkpoint.number)) ? "Open" : "Locked";
  if (branch.number === 1 || state.solvedDilemmas.has(branch.number - 1)) return "Open";
  return "Locked";
}

function renderBranchesCodex() {
  const revelationRecords = state.codexRecords.revelations;
  return `
    <section class="codex-section">
      <p class="codex-lede">The ribbon is linear. Dilemmas are known checkpoints; their exact questions remain hidden until reached.</p>
      <div class="codex-list">
        ${BRANCHES.map((branch) => {
          const isCheckpointBranch = branch.dilemma < REVELATION_CELL;
          const branchEnd = Math.min(branch.dilemma, REVELATION_CELL - 1);
          return `
            <article class="codex-entry">
              <span>Branch ${branch.roman} - ${escapeHtml(branchStatus(branch))}</span>
              <strong>${escapeHtml(branch.name)}</strong>
              <p>${isCheckpointBranch
                ? `Cells ${branch.start}-${branch.dilemma}; Dilemma requires ${escapeHtml(rankLabel(branch.threshold))} or higher.`
                : `Cells ${branch.start}-${branchEnd}; the Revelation follows as the final dilemma at cell ${REVELATION_CELL}.`}</p>
            </article>
          `;
        }).join("")}
        <article class="codex-entry">
          <span>Final Cell</span>
          <strong>Revelation</strong>
          <p>At cell ${REVELATION_CELL}, the leading suit is tested for score over ${REVELATION_THRESHOLD} and an Ace of that suit. Missing either condition is automatic failure.</p>
        </article>
      </div>
      <h3>Revelation Record</h3>
      ${revelationRecords.length === 0 ? codexEmptyNote("No Revelation has been reached in this run.") : `
        <div class="codex-list">
          ${revelationRecords.map((record) => `
            <article class="codex-entry ${record.suit ? `suit-${record.suit}` : ""}" style="--suit-color: ${record.suit ? suitById(record.suit)?.color || "#d6c08b" : "#d6c08b"}">
              <span>${escapeHtml(record.suitName)} - ${escapeHtml(record.stance)}</span>
              <strong>Score ${record.score}</strong>
              <p>${escapeHtml(record.note)}</p>
            </article>
          `).join("")}
        </div>
      `}
    </section>
  `;
}

function openScoresModal() {
  const totals = suitTotals();
  const highest = Math.max(...totals.map((entry) => entry.total));
  const body = totals.map((entry) => (
    `${entry.suit.name}: ${entry.total}${entry.hasAce ? " + Ace" : ""}${entry.total === highest && highest > 0 ? " (leading)" : ""}`
  )).join("\n");

  showModal({
    kicker: "Scores",
    title: "Current Balance",
    body: `${body}\n\nThe Revelation needs the leading suit to exceed ${REVELATION_THRESHOLD} and contain its Ace. Otherwise, the run fails.`,
    actions: [
      { label: "Return", kind: "primary", action: closeModal }
    ]
  });
}

function openOptionsModal() {
  showModal({
    kicker: "Options",
    title: "Table Options",
    body: "Autosave occurs only after a Dilemma is resolved or failed. Starting over begins a fresh run for this seeker.",
    actions: [
      { label: "Continue", kind: "primary", action: closeModal },
      { label: "New Game", kind: "secondary", action: () => startGame(state.playerName || "Seeker") },
      {
        label: "Main Menu",
        kind: "secondary",
        action: () => {
          closeModal();
          if (state.playerName) els.playerNameInput.value = state.playerName;
          showScreen("menu");
        }
      }
    ]
  });
}

function initializeAccountMenu() {
  const accounts = readAccounts().sort((a, b) => String(b.lastUsedAt).localeCompare(String(a.lastUsedAt)));
  if (accounts.length > 0 && !els.playerNameInput.value) {
    els.playerNameInput.value = accounts[0].playerName;
    setAccountMessage(`Last account: ${accounts[0].playerName}. Press Play to continue.`, false);
  }
}

els.accountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  beginAccountSession();
});
els.playButton.addEventListener("click", beginAccountSession);
els.quitButton.addEventListener("click", () => showScreen("quit"));
els.returnButton.addEventListener("click", () => showScreen("menu"));
if (els.newGameButton) {
  els.newGameButton.addEventListener("click", () => startGame(state.playerName || "Seeker"));
}
if (els.menuButton) {
  els.menuButton.addEventListener("click", () => {
    closeModal();
    if (state.playerName) els.playerNameInput.value = state.playerName;
    showScreen("menu");
  });
}
els.stepButton.addEventListener("click", takeStep);
els.codexButton.addEventListener("click", openCodex);
els.scoresButton.addEventListener("click", openScoresModal);
els.optionsButton.addEventListener("click", openOptionsModal);
els.handPrevButton.addEventListener("click", () => moveHandWindow(-1));
els.handNextButton.addEventListener("click", () => moveHandWindow(1));
els.sortRankButton.addEventListener("click", () => setHandSort("rank"));
els.sortSuitButton.addEventListener("click", () => setHandSort("suit"));
els.synthesisToggle.addEventListener("click", toggleSynthesis);
els.logToggle.addEventListener("click", toggleLog);
els.cardViewer.addEventListener("click", (event) => {
  if (event.target === els.cardViewer) closeCardViewer();
});
els.codexCloseButton.addEventListener("click", closeCodex);
els.codexOverlay.addEventListener("click", (event) => {
  if (event.target === els.codexOverlay) closeCodex();
});
els.codexTabs.forEach((tab) => {
  tab.addEventListener("click", () => setCodexTab(tab.dataset.codexTab));
});
if (els.tutorialOverlay) {
  els.tutorialOverlay.addEventListener("click", closeTutorial);
  window.addEventListener("resize", positionTutorialPointers);
}
document.addEventListener("keydown", (event) => {
  if (!els.tutorialOverlay?.classList.contains("hidden")) {
    if (event.key === "Enter" || event.key === " " || event.key === "Escape") closeTutorial();
    return;
  }
  if (event.key !== "Escape") return;
  if (!els.cardViewer.classList.contains("hidden")) {
    closeCardViewer();
    return;
  }
  if (!els.codexOverlay.classList.contains("hidden")) {
    closeCodex();
  }
});

initializeAccountMenu();
