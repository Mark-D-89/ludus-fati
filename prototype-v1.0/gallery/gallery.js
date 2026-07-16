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
function render(){visible=cards.filter(c=>(activeType==="all"||c.type===activeType)&&(activeSuit==="all"||c.suit===activeSuit));gallery.innerHTML="";typeOrder.forEach(type=>{const group=visible.filter(c=>c.type===type);if(!group.length)return;const section=document.createElement("section");section.className="gallery-section";section.innerHTML=`<header class="section-heading"><h2>${type}</h2><span>${group.length} works</span></header><div class="card-grid"></div>`;const grid=section.querySelector(".card-grid");group.forEach(card=>{const button=document.createElement("button");button.className="card";button.innerHTML=`<div class="art"><img src="${card.src}" alt="${card.title}" loading="lazy"></div><div class="card-copy"><strong>${card.title}</strong><span>${titleCase(card.suit)}${card.rank?` · ${card.rank}`:""}</span>${card.description?`<p>${card.description}</p>`:""}</div>`;button.onclick=()=>openCard(card);grid.append(button)});gallery.append(section)});count.textContent=`${visible.length} of ${cards.length} works`;empty.hidden=visible.length>0}
function openCard(card){dialog.dataset.index=visible.indexOf(card);document.querySelector("#viewer-image").src=card.src;document.querySelector("#viewer-image").alt=card.title;document.querySelector("#viewer-title").textContent=card.title;document.querySelector("#viewer-meta").textContent=`${card.type} · ${titleCase(card.suit)}${card.rank?` · ${card.rank}`:""}`;document.querySelector("#viewer-description").textContent=card.description;dialog.showModal()}
function move(delta){const i=(Number(dialog.dataset.index)+delta+visible.length)%visible.length;openCard(visible[i])}document.querySelector(".close").onclick=()=>dialog.close();document.querySelector(".previous").onclick=()=>move(-1);document.querySelector(".next").onclick=()=>move(1);dialog.onclick=e=>{if(e.target===dialog)dialog.close()};addEventListener("keydown",e=>{if(!dialog.open)return;if(e.key==="ArrowLeft")move(-1);if(e.key==="ArrowRight")move(1)});applyGameDescriptions().catch(error=>console.error(error)).finally(render);
