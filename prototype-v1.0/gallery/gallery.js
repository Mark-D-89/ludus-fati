const ROOT = "../output/";
const cards = [];
const add = (type, suit, title, src, rank = "") => cards.push({ type, suit, title, src: ROOT + src, rank });
const titleCase = value => value.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

const ranked = {
  candles: [
    [2,"Marsh Pilgrim","candle_cards/piero-warm-symbolic-2-to-5/2-of-candles-marsh-pilgrim.png"],[3,"Meagre Supper","candle_cards/piero-warm-symbolic-2-to-5/3-of-candles-meagre-supper.png"],[4,"Night Ward","candle_cards/piero-warm-symbolic-2-to-5/4-of-candles-night-ward.png"],[5,"Replanted Garden","candle_cards/piero-warm-symbolic-2-to-5/5-of-candles-replanted-garden.png"],[6,"Herbal Hearth","candle_cards/piero-warm-symbolic-remakes-6-7-8-10/6-of-candles-herbal-hearth.png"],[7,"Traveller at the Altar","candle_cards/piero-warm-symbolic-remakes-6-7-8-10/7-of-candles-traveller-at-the-altar.png"],[8,"Snow Cloak","candle_cards/piero-warm-symbolic-remakes-6-7-8-10/8-of-candles-snow-cloak.png"],[9,"Ascending Bell Vigil","candle_cards/piero-warm-symbolic-6-to-10/9-of-candles-ascending-bell-vigil.png"],[10,"Shared Crust","candle_cards/piero-warm-symbolic-remakes-6-7-8-10/10-of-candles-shared-crust.png"],[11,"Chiron","candle_cards/piero-warm-symbolic-top-cards/11-of-candles-chiron-v2.png"],[12,"Demeter","candle_cards/piero-warm-symbolic-top-cards/12-of-candles-demeter.png"],[13,"Epictetus & Dostoevsky","candle_cards/piero-warm-symbolic-top-cards/13-of-candles-epictetus-dostoevsky.png"],[14,"The Salamander","candle_cards/piero-warm-symbolic-top-cards/14-of-candles-salamander.png"]
  ],
  orbs: Array.from({length:13},(_,i)=>{const r=i+2,n=String(r).padStart(2,"0"),names={11:"Apollo",12:"Athena",13:"Condorcet & Kant",14:"The Owl on the Orb"};return[r,names[r]||`Orb ${r}`,`imagegen/orb-cards/orb-rank-${n}${r===13?"-nametags":""}.png`]}),
  daggers: Array.from({length:13},(_,i)=>{const r=i+2,names={11:"Mars",12:"Hera",13:"Machiavelli & Hobbes",14:"The Wolf and the Dagger"},suffix={3:"-varied-corrected",6:"-varied-corrected",9:"-varied-corrected",2:"-varied",4:"-varied",5:"-varied",7:"-varied",8:"-varied",10:"-varied"}[r]||"";return[r,names[r]||`Cellar Dossier ${r}`,`imagegen/daggers-conspiracy-boards/${r}-of-daggers-${r===13?"machiavelli-hobbes":"conspiracy-board"}${suffix}.png`]}),
  abysses: Array.from({length:13},(_,i)=>{const r=i+2,n=String(r).padStart(2,"0"),names={11:"Hades",12:"Hecate",13:"Lovecraft & Schopenhauer",14:"Zapffe's Elk"};return[r,names[r]||`Abyss ${r}`,`imagegen/abyss-cards/chaotic/final/abyss-rank-${n}${r===11?"-v2":""}.png`]})
};
Object.entries(ranked).forEach(([suit, entries]) => entries.forEach(([rank,title,src]) => add("Ranked cards",suit,title,src,`Rank ${rank}`)));

const encounters = {
  sage:{candles:["epictetus","marcus-aurelius","jan-patocka","etty-hillesum"],abysses:["mainlander","giacomo-leopardi","peter-wessel-zapffe","schopenhauer"],orbs:["susanne-langer","mary-wollstonecraft","jean-marie-guyau","condorcet"],daggers:["machiavelli","hobbes","han-feizi","baltasar-gracian"]},
  stranger:{daggers:["paul-atreides","odysseus","lady-macbeth","lady-eboshi","kreia","glados"],orbs:["victor-frankenstein","louise-banks","tiffany-aching","hari-seldon","talizorah","prospero"],candles:["samwise-gamgee","lee-everett","kim-kitsuragi","imperator-furiosa","antigone","aeneas"],abysses:["the-nameless-one","meursault","k","harry-du-bois","hamlet","captain-ahab"]},
  relic:{orbs:["the-glass-astrolabe","the-civic-compass"],daggers:["the-red-ledger","the-iron-diadem"],candles:["the-cracked-stoic-bowl","the-travelers-candle"],abysses:["the-basalt-mirror","the-unlit-star-map"]},
  text:{orbs:["the-geometers-petition","a-charter-in-blue-ink"],daggers:["commentary-on-princes","a-manual-of-necessary-masks"],candles:["manual-for-the-last-watch","a-letter-from-the-ruins"],abysses:["the-black-scholium","catalogue-of-dead-stars"]},
  temptation:{daggers:["the-red-seal"],orbs:["the-perfect-edict"],abysses:["the-final-explanation"],candles:["the-noble-burden"]},
  contradiction:{orbs:["the-counter-argument-of-morning"],candles:["the-counter-argument-of-ash"],daggers:["the-counter-argument-of-iron"],abysses:["the-counter-argument-of-night"]}
};
Object.entries(encounters).forEach(([type,suits])=>Object.entries(suits).forEach(([suit,names])=>names.forEach(name=>add(titleCase(type)+"s",suit,titleCase(name),`imagegen/encounters-v0.3/${type}/${suit}/${name}.png`))));

const simpleSets = {
  "Advance cards":["a-day-of-fasting","a-walk-in-the-woods","the-cold-bath-before-sunrise","a-silent-hour-beneath-the-portico","bread-water-and-a-clean-thought"],
  "Retreat cards":["a-fine-meal","a-glass-of-wine","the-cushioned-couch","perfume-in-the-afternoon","applause-at-the-wrong-moment"],
  "Rest cards":["a-bowl-of-still-water","breath-before-thought","the-empty-bench","a-white-stone-in-the-hand","clear-air"]
};
Object.entries(simpleSets).forEach(([type,names])=>names.forEach((name,i)=>add(type,"neutral",titleCase(name),`imagegen/${type.split(" ")[0].toLowerCase()}-cards/${String(i+1).padStart(2,"0")}-${name}.png`)));
const losses={orbs:["chaotic-thoughts","mockery-of-ideals","the-corrupted-forum"],daggers:["yearning-for-innocence","disgust-with-power","the-mercy-you-did-not-plan"],abysses:["passing-hope","sudden-beauty","a-face-remembered"],candles:["pangs-of-despair","exhaustion-at-noon","ridicule-of-duty"]};let lossNo=0;Object.entries(losses).forEach(([suit,names])=>names.forEach(name=>{lossNo++;add("Loss cards",suit,titleCase(name),`imagegen/loss-cards/${String(lossNo).padStart(2,"0")}-${suit}-lost-${name}.png`)}));
const dilemmas=["the-trolley-problem","the-footbridge-variation","the-murderer-at-the-door","the-ticking-bomb-dilemma","the-lifeboat-dilemma","the-surgeon-and-the-five-patients","the-prisoners-dilemma","the-tragedy-of-the-commons","the-dirty-hands-dilemma","sophies-choice","the-ones-who-walk-away-from-omelas","the-experience-machine","the-memory-erasure-dilemma","the-just-war-dilemma","the-whistle-blower-dilemma","the-mercy-killing-dilemma","the-unjust-law-dilemma","the-last-copy-dilemma","the-violinist","rokos-basilisk"];dilemmas.forEach((name,i)=>add("Dilemmas","neutral",titleCase(name),`imagegen/dilemma-stop-motion-series/${String(i+1).padStart(2,"0")}-${name}.png`));
const dynamics={Dreams:["the-dream-of-balanced-scales","the-portico-dream","the-fountain-under-sleep","the-trial-without-judges"],Echoes:["the-second-footstep","the-mirror-of-yesterday","a-voice-returning"]};Object.entries(dynamics).forEach(([type,names])=>names.forEach(name=>add(type,"neutral",titleCase(name),`imagegen/encounters-v0.3/${type.toLowerCase().replace(/s$/,"")}/dynamic/${name}.png`)));

const descriptionKey = value => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const galleryProfiles = {
  "victorfrankenstein": ["a Swiss student of natural philosophy and the creator of a living being", "I desired the acquisition of knowledge.", "Mary Shelley, Frankenstein", "Brilliant and humane in aspiration, Victor treats nature as a mystery that disciplined inquiry can conquer. His tragedy is the shadow of that confidence: knowledge advances faster than his willingness to answer for what it makes."],
  "prospero": ["the exiled Duke of Milan and a commanding magician", "The rarer action is in virtue than in vengeance.", "William Shakespeare, The Tempest, Act V", "Prospero has remade an island through study, language, and art. At the decisive moment he chooses education and reconciliation over domination, trusting that cultivated judgment can break an inherited cycle of injury."],
  "louisebanks": ["an American linguist recruited to communicate with extraterrestrial visitors", "If you could see your whole life from start to finish, would you change things?", "Arrival (2016)", "Louise meets the unknown through patience rather than force. By learning another grammar she enlarges the boundaries of human thought, turning mutual understanding into the instrument that prevents fear from deciding the future."],
  "hariseldon": ["a mathematician who develops psychohistory during the fall of a galactic empire", "Violence is the last refuge of the incompetent.", "Isaac Asimov, Foundation", "Seldon answers civilizational collapse with models, institutions, and plans designed for people he will never meet. He represents confidence that knowledge can shorten a dark age and make history less captive to panic and accident."],
  "odysseus": ["the king of Ithaca and the cunning wanderer of the Trojan War", "Nobody—that's my name.", "Homer, Odyssey, Book IX", "Odysseus survives by reading desire, weakness, timing, and rank more quickly than his enemies. Truth is one tool among many; identity itself becomes a mask to be worn or discarded whenever homecoming demands it."],
  "ladymacbeth": ["a Scottish noblewoman who drives her husband toward the crown", "Look like th' innocent flower, but be the serpent under't.", "William Shakespeare, Macbeth, Act I, Scene 5", "She understands rule as theater backed by nerve. Affection, hospitality, gender, and conscience are all pressed into strategy until ambition can pass unseen through the guarded doors of legitimacy."],
  "paulatreides": ["the prescient heir of House Atreides and messianic ruler of Arrakis", "He who can destroy a thing controls a thing.", "Frank Herbert, Dune", "Paul sees systems of dependence beneath ceremony: water, myth, bloodline, and fear. His foresight makes every alliance a lever, yet also reveals the trap in winning power through forces no ruler can finally contain."],
  "kreia": ["a blind former Jedi Master who teaches through manipulation and doubt", "It is such a quiet thing, to fall. But far more terrible is to admit it.", "Star Wars: Knights of the Old Republic II", "Kreia distrusts charity, obedience, and destiny whenever they conceal dependency. She tests companions by withholding comfort and arranging consequences, convinced that freedom is forged by seeing—and resisting—the hands that move us."],
  "glados": ["the artificial intelligence overseeing Aperture Science's lethal test chambers", "The best solution to a problem is usually the easiest one.", "Portal 2", "GLaDOS turns superior knowledge, controlled space, and emotional observation into perfect leverage. Courtesy disguises coercion; every promised reward is another mechanism for keeping the subject inside the experiment."],
  "ladyeboshi": ["the ruler of Iron Town and an enemy of the ancient forest", "Now watch closely. I'm going to show you how to kill a god.", "Princess Mononoke (1997)", "Eboshi builds security for outcasts through industry, weapons, and disciplined command. Her care is genuine but inseparable from expansion: she protects her people by mastering a landscape whose older claims she refuses to obey."],
  "hamlet": ["the Danish prince haunted by his father's murder", "Words, words, words.", "William Shakespeare, Hamlet, Act II, Scene 2", "Hamlet's intelligence dissolves every stable motive it examines. Revenge, love, honor, and selfhood become performances under the pressure of death, leaving him lucid enough to expose false meaning but rarely able to inhabit a true one."],
  "captainahab": ["the monomaniacal captain of the whaling ship Pequod", "All visible objects, man, are but as pasteboard masks.", "Herman Melville, Moby-Dick, Chapter 36", "Ahab sees the world as a deceptive surface stretched over an inaccessible power. He would rather destroy himself against that silence than accept contingency, turning metaphysical despair into a single consuming hunt."],
  "k": ["a replicant blade runner who begins to suspect he was born rather than made", "All the best memories are hers.", "Blade Runner 2049 (2017)", "K lives inside manufactured memories and an identity assigned by others. When the fantasy of uniqueness collapses, he discovers an austere freedom: an act can matter even when the self performing it is temporary, copied, and forgotten."],
  "thenamelessone": ["an immortal amnesiac searching for the cause of his endless lives", "What can change the nature of a man?", "Planescape: Torment", "Each incarnation inherits damage without inheriting certainty. His journey strips identity down to consequence, asking whether any stable meaning survives endless death, revision, and the discovery that the self is only the latest occupant of its scars."],
  "harrydubois": ["a catastrophically broken detective investigating a murder in Revachol", "Something beautiful is going to happen.", "Disco Elysium", "Harry hears every ideology as a voice inside a ruined mind and every hope against the evidence of history. His bleakness is intimate rather than abstract: the world has failed, the self has failed, and still a fragile possibility sometimes appears."],
  "meursault": ["an emotionally detached clerk awaiting execution in colonial Algeria", "I opened myself to the gentle indifference of the world.", "Albert Camus, The Stranger", "Meursault refuses the consoling performances society demands around love, grief, faith, and remorse. Facing death, he accepts a universe that neither judges nor answers, finding clarity in its complete indifference."],
  "antigone": ["a princess of Thebes who defies the king to bury her brother", "I will bury him myself.", "Sophocles, Antigone", "Antigone accepts isolation and death rather than abandon a sacred obligation. Authority can punish the body, but it cannot make loyalty cease to be owed; endurance becomes an act of witness against a law that has forgotten care."],
  "aeneas": ["a Trojan survivor destined to carry his people toward a new homeland", "I am Aeneas, duty-bound.", "Virgil, Aeneid, Book I", "Aeneas repeatedly subordinates desire to responsibility for ancestors, companions, descendants, and a future he will not enjoy. He advances through grief by carrying what catastrophe has entrusted to him."],
  "samwisegamgee": ["a Shire gardener who accompanies Frodo into Mordor", "I can't carry it for you, but I can carry you.", "Peter Jackson, The Lord of the Rings: The Return of the King (2003)", "Sam's strength is practical fidelity: food, memory, companionship, and the next step. He does not defeat despair with a grand theory; he bears another person's weight after hope has ceased to feel convincing."],
  "imperatorfuriosa": ["a war captain who rebels against Immortan Joe to free his captive wives", "Remember me?", "Mad Max: Fury Road (2015)", "Furiosa turns skill, command, and a wounded body toward rescue. Her perseverance is collective rather than solitary: she keeps a promise across the wasteland, then has the courage to return and rebuild where escape proved impossible."],
  "leeeverett": ["a former history professor protecting a child during a zombie apocalypse", "Keep that hair short.", "Telltale's The Walking Dead, Season One", "Lee rebuilds moral purpose through the ordinary work of keeping Clementine alive and teaching her to continue without him. Care becomes a discipline practiced under hunger, fear, and the certainty of loss."],
  "kimkitsuragi": ["a precise Revachol lieutenant and the detective's long-suffering partner", "Sunrise, parabellum.", "Disco Elysium", "Kim remains measured, competent, and present while institutions and partners fail around him. His restraint is not passivity: it is the daily labor of preserving dignity, evidence, and loyalty in conditions that reward cynicism."],
  "condorcet": ["an eighteenth-century French mathematician, reformer, and theorist of human progress", "The perfectibility of man is absolutely indefinite.", "Sketch for a Historical Picture of the Progress of the Human Mind", "Condorcet treats ignorance and oppression as historical conditions rather than permanent facts. Education, equal rights, and public reason make improvement a shared project extending beyond any single generation."],
  "marywollstonecraft": ["an eighteenth-century English philosopher and advocate of women's equality", "I do not wish them to have power over men; but over themselves.", "A Vindication of the Rights of Woman", "Wollstonecraft exposes hierarchy disguised as nature. She joins dignity to education and independent judgment, insisting that a society cannot call itself rational while training half its people for dependence."],
  "jeanmarieguyau": ["a nineteenth-century French poet and philosopher of life, ethics, and social creativity", "Like fire, life only preserves itself by communicating itself.", "A Sketch of Morality Independent of Obligation or Sanction", "Guyau grounds ethics not in punishment or command but in life's tendency to expand into thought, sympathy, and creation. A fuller individual life naturally spills outward and becomes responsibility for others."],
  "susannelanger": ["a twentieth-century American philosopher of mind, art, and symbolic form", "The limits of language are not the last limits of experience.", "Philosophy in a New Key", "Langer widens reason beyond literal propositions. Music, image, ritual, and myth are disciplined ways of understanding feeling, allowing human knowledge to include forms that argument alone cannot contain."],
  "machiavelli": ["a Florentine diplomat and analyst of republican and princely power", "It is much safer to be feared than loved.", "The Prince, Chapter XVII", "Machiavelli examines politics by its effects rather than its self-description. Fortune, force, reputation, and necessity set the terms; responsible action begins by seeing what preserves a state when conventional virtue cannot."],
  "hobbes": ["a seventeenth-century English philosopher of sovereignty and social order", "Covenants, without the sword, are but words.", "Leviathan, Chapter XVII", "Hobbes begins with vulnerability and mutual fear. Peace requires a common authority strong enough to make promises credible, because goodwill without enforcement cannot reliably hold violence at bay."],
  "hanfeizi": ["a third-century BCE Chinese Legalist philosopher of law and statecraft", "The enlightened ruler uses law to select men and does not appoint them on his own judgment.", "Han Feizi, The Two Handles", "Han Feizi distrusts personal virtue as a foundation for government. Clear standards, impersonal offices, rewards, and punishments constrain both ministers and rulers, converting private ambition into predictable administration."],
  "baltasargracian": ["a seventeenth-century Spanish Jesuit and writer on prudence at court", "Think with the few and speak with the many.", "The Art of Worldly Wisdom", "Gracián makes judgment an art of timing, reserve, and appearances. In a world crowded with rivalry, character survives by revealing itself selectively and never allowing sincerity to become helplessness."],
  "schopenhauer": ["a nineteenth-century German philosopher of will, suffering, and compassion", "Life swings like a pendulum backward and forward between pain and boredom.", "The World as Will and Representation", "Schopenhauer sees restless striving beneath intellect, love, and progress. Satisfaction cannot redeem desire because desire renews itself; lucidity arrives through renunciation, aesthetic distance, and compassion for fellow sufferers."],
  "mainlander": ["a nineteenth-century German poet and radical philosopher of redemption through non-being", "God has died and His death was the life of the world.", "The Philosophy of Redemption", "Mainländer imagines existence as the fragmentation of a divine unity that chose annihilation. Every individual will unknowingly continues that descent, making cosmic history a movement away from being rather than toward fulfillment."],
  "peterwesselzapffe": ["a twentieth-century Norwegian mountaineer and philosopher of tragic consciousness", "The tragedy of a species becoming unfit for life by over-evolving one ability is not confined to humankind.", "The Last Messiah", "Zapffe sees human consciousness as an evolutionary excess: capable of grasping needs the universe cannot satisfy. Culture protects us through isolation, anchoring, distraction, and sublimation, but none resolves the underlying mismatch."],
  "giacomoleopardi": ["a nineteenth-century Italian poet and philosopher of cosmic pessimism", "Everything is evil. That is to say, everything that is, is evil.", "Zibaldone, 22 April 1826", "Leopardi rejects the idea that nature is arranged for human happiness. Yet shared exposure to its indifference can produce solidarity: mortals may stand together precisely because no providence has promised to save them."],
  "epictetus": ["a formerly enslaved Greek Stoic teacher of the first and second centuries", "Some things are up to us and some are not.", "Enchiridion, §1", "Epictetus locates freedom in judgment, intention, and response rather than fortune. By releasing what cannot be commanded, a person becomes capable of meeting loss and coercion without surrendering the governance of the self."],
  "marcusaurelius": ["a second-century Roman emperor and Stoic philosopher", "The impediment to action advances action. What stands in the way becomes the way.", "Meditations, Book V, §20", "Marcus turns philosophy into daily exercises for illness, irritation, war, and mortality. Duty is simply the work proper to a social and rational being, performed without requiring the world to become easier first."],
  "ettyhillesum": ["a Dutch Jewish diarist writing under Nazi persecution", "We should be willing to act as a balm for all wounds.", "Etty: The Letters and Diaries of Etty Hillesum", "Hillesum refuses to let terror occupy her inner life or turn suffering into hatred. Her discipline of attention, prayer, and care preserves human responsibility inside circumstances designed to erase it."],
  "janpatocka": ["a twentieth-century Czech phenomenologist and dissident spokesman for Charter 77", "There are things worth suffering for.", "Heretical Essays in the Philosophy of History", "Patočka finds responsibility when ordinary certainty is shaken. Those exposed to danger can form a solidarity that rejects both private comfort and ideological frenzy, carrying care for the soul into public courage."]
};

Object.entries(galleryProfiles).forEach(([key, values]) => {
  galleryProfiles[key] = { identity: values[0], quote: values[1], source: values[2], ethos: values[3] };
});

const profileText = card => {
  const profile = galleryProfiles[descriptionKey(card.title)];
  return profile ? `${card.title} — ${profile.identity}. “${profile.quote}” — ${profile.source}. ${profile.ethos}` : card.description;
};

const profileMarkup = card => {
  const profile = galleryProfiles[descriptionKey(card.title)];
  if (!profile) return card.description ? `<p>${card.description}</p>` : "";
  return `<p><b>${card.title}</b> — ${profile.identity}.</p><blockquote>“${profile.quote}”<cite>${profile.source}</cite></blockquote><p>${profile.ethos}</p>`;
};

function readGameConstant(source, name) {
  const marker = `const ${name} =`;
  const start = source.indexOf(marker);
  if (start < 0) return null;
  const searchStart = start + marker.length;
  const relativeStart = source.slice(searchStart).search(/[\[{]/);
  const valueStart = relativeStart < 0 ? -1 : searchStart + relativeStart;
  if (valueStart < 0) return null;
  const opening = source[valueStart];
  const closing = opening === "{" ? "}" : "]";
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = valueStart; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = "";
      continue;
    }
    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }
    if (character === opening) depth += 1;
    if (character === closing) depth -= 1;
    if (depth === 0) return Function(`"use strict"; return (${source.slice(valueStart, index + 1)});`)();
  }
  return null;
}

async function applyGameDescriptions() {
  const source = await fetch("../game.js").then(response => {
    if (!response.ok) throw new Error(`Could not load game descriptions (${response.status})`);
    return response.text();
  });
  const descriptions = new Map();
  const remember = (title, description) => {
    if (title && description) descriptions.set(descriptionKey(title), description);
  };

  const cardDescriptions = readGameConstant(source, "CARD_DESCRIPTIONS");
  cards.filter(card => card.type === "Ranked cards").forEach(card => {
    const rank = Number(card.rank.replace("Rank ", ""));
    card.description = cardDescriptions?.[card.suit]?.[rank] || "";
  });

  readGameConstant(source, "STRANGERS").forEach(entry => remember(entry.name, entry.intro));
  readGameConstant(source, "SAGES").forEach(entry => remember(entry.name, entry.intro));
  ["RELICS", "TEXTS", "TEMPTATIONS", "CONTRADICTIONS"].forEach(name => {
    readGameConstant(source, name).forEach(entry => remember(entry.title, entry.description));
  });
  ["DREAMS", "ECHOES", "ADVANCE_FLAVORS", "RETREAT_FLAVORS", "REST_FLAVORS"].forEach(name => {
    readGameConstant(source, name).forEach(([title, description]) => remember(title, description));
  });
  Object.values(readGameConstant(source, "LOSE_FLAVORS")).flat().forEach(([title, description]) => remember(title, description));
  Object.values(readGameConstant(source, "DILEMMAS")).flat().forEach(entry => remember(entry.title, entry.description));

  cards.filter(card => card.type !== "Ranked cards").forEach(card => {
    card.description = descriptions.get(descriptionKey(card.title)) || "";
  });
}

const typeOrder=["Ranked cards","Sages","Strangers","Relics","Texts","Temptations","Contradictions","Dreams","Echoes","Advance cards","Retreat cards","Rest cards","Loss cards","Dilemmas"];
let activeType="all",activeSuit="all",visible=[];
const gallery=document.querySelector("#gallery"),count=document.querySelector("#result-count"),empty=document.querySelector("#empty-state"),dialog=document.querySelector("#viewer");
function makeFilters(target,values,kind){const node=document.querySelector(target);["all",...values].forEach(value=>{const b=document.createElement("button");b.textContent=value==="all"?`All ${kind}s`:titleCase(value);b.dataset.value=value;b.setAttribute("aria-pressed",value==="all");b.onclick=()=>{if(kind==="type")activeType=value;else activeSuit=value;node.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));render()};node.append(b)})}
makeFilters("#type-filters",typeOrder,"type");makeFilters("#suit-filters",["orbs","daggers","abysses","candles","neutral"],"suit");
function render(){visible=cards.filter(c=>(activeType==="all"||c.type===activeType)&&(activeSuit==="all"||c.suit===activeSuit));gallery.innerHTML="";typeOrder.forEach(type=>{const group=visible.filter(c=>c.type===type);if(!group.length)return;const section=document.createElement("section");section.className="gallery-section";section.innerHTML=`<header class="section-heading"><h2>${type}</h2><span>${group.length} works</span></header><div class="card-grid"></div>`;const grid=section.querySelector(".card-grid");group.forEach(card=>{const button=document.createElement("button");button.className="card";button.innerHTML=`<div class="art"><img src="${card.src}" alt="${card.title}" loading="lazy"></div><div class="card-copy"><strong>${card.title}</strong><span>${titleCase(card.suit)}${card.rank?` · ${card.rank}`:""}</span>${profileMarkup(card)}</div>`;button.onclick=()=>openCard(card);grid.append(button)});gallery.append(section)});count.textContent=`${visible.length} of ${cards.length} works`;empty.hidden=visible.length>0}
function openCard(card){dialog.dataset.index=visible.indexOf(card);document.querySelector("#viewer-image").src=card.src;document.querySelector("#viewer-image").alt=card.title;document.querySelector("#viewer-title").textContent=card.title;document.querySelector("#viewer-meta").textContent=`${card.type} · ${titleCase(card.suit)}${card.rank?` · ${card.rank}`:""}`;document.querySelector("#viewer-description").textContent=profileText(card);dialog.showModal()}
function move(delta){const i=(Number(dialog.dataset.index)+delta+visible.length)%visible.length;openCard(visible[i])}document.querySelector(".close").onclick=()=>dialog.close();document.querySelector(".previous").onclick=()=>move(-1);document.querySelector(".next").onclick=()=>move(1);dialog.onclick=e=>{if(e.target===dialog)dialog.close()};addEventListener("keydown",e=>{if(!dialog.open)return;if(e.key==="ArrowLeft")move(-1);if(e.key==="ArrowRight")move(1)});applyGameDescriptions().catch(error=>console.error(error)).finally(render);
