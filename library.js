/* WINTER ARC OS 2.3 – offline exercise catalogue and editable 3-day program templates.
   Names and equipment labels are classifications, not interchangeable strength standards. */
import {DEFAULT_PLANS,EXERCISE_LABELS,MUSCLE_RULES,estimateMuscles} from './data.js';
import {EXERCISE_GUIDES} from './lexicon.js';

const added=[
 // id, name, group, equipment, secondary muscle credits
 ['barbell-bench','Langhantel-Bankdrücken','chest','Langhantel'],
 ['db-bench','Flachbank-Kurzhanteldrücken','chest','Kurzhantel'],
 ['smith-bench','Multipresse-Bankdrücken','chest','Multipresse'],
 ['cable-fly','Kabel-Flys','chest','Kabel'],
 ['incline-cable-fly','Schrägbank-Kabel-Flys','chest','Kabel'],
 ['pushup','Liegestütze','chest','Körpergewicht'],
 ['dip-assisted','Assistierte Dips','chest','Maschine'],
 ['chest-press-plate','Plate-Loaded Brustpresse','chest','Maschine'],
 ['landmine-press','Landmine Press','delts','Langhantel'],
 ['db-shoulder-press','Kurzhantel-Schulterdrücken','delts','Kurzhantel'],
 ['machine-shoulder-press','Schulterpresse Maschine','delts','Maschine'],
 ['front-raise','Frontheben','delts','Kurzhantel'],
 ['rear-delt-cable','Reverse Cable Fly','delts','Kabel'],
 ['facepull','Face Pull','delts','Kabel'],
 ['pullup','Klimmzug','back','Körpergewicht'],
 ['lat-wide','Latzug breit','back','Kabel'],
 ['lat-single','Einarmiger Latzug','back','Kabel'],
 ['row-cable','Sitzendes Kabelrudern','back','Kabel'],
 ['row-db','Kurzhantelrudern einarmig','back','Kurzhantel'],
 ['row-barbell','Langhantelrudern','back','Langhantel'],
 ['tbar-row','T-Bar-Rudern','back','Maschine'],
 ['straight-arm-pulldown','Straight Arm Pulldown','back','Kabel'],
 ['pull-over-machine','Pullover-Maschine','back','Maschine'],
 ['deadlift-barbell','Konventionelles Kreuzheben','back','Langhantel'],
 ['romanian-deadlift','Rumänisches Kreuzheben','hamstrings','Langhantel'],
 ['back-extension','Back Extensions','glutes','Körpergewicht'],
 ['shrug-db','Kurzhantel-Shrugs','traps','Kurzhantel'],
 ['shrug-bar','Langhantel-Shrugs','traps','Langhantel'],
 ['curl-bar','Langhantel-Curls','biceps','Langhantel'],
 ['curl-db','Kurzhantel-Curls','biceps','Kurzhantel'],
 ['curl-incline','Schrägbank-Curls','biceps','Kurzhantel'],
 ['curl-cable','Kabel-Curls','biceps','Kabel'],
 ['hammer-curl','Hammer Curls','biceps','Kurzhantel'],
 ['curl-spider','Spider Curls','biceps','Kurzhantel'],
 ['triceps-rope','Trizepsdrücken Seil','triceps','Kabel'],
 ['triceps-bar','Trizepsdrücken Stange','triceps','Kabel'],
 ['skullcrusher','French Press / Skull Crushers','triceps','Langhantel'],
 ['triceps-cross','Crossbody-Trizepsstrecken','triceps','Kabel'],
 ['close-grip-bench','Enges Bankdrücken','triceps','Langhantel'],
 ['back-squat','Langhantel-Kniebeuge','quads','Langhantel'],
 ['front-squat','Frontkniebeuge','quads','Langhantel'],
 ['goblet-squat','Goblet Squat','quads','Kurzhantel'],
 ['hack-squat','Hackenschmidt-Kniebeuge','quads','Maschine'],
 ['bulgarian-split','Bulgarian Split Squat','quads','Kurzhantel'],
 ['leg-extension-machine','Beinstrecker Maschine','quads','Maschine'],
 ['leg-curl-seated','Sitzender Beinbeuger','hamstrings','Maschine'],
 ['leg-curl-lying','Liegender Beinbeuger','hamstrings','Maschine'],
 ['rdl-db','Rumänisches Kreuzheben Kurzhanteln','hamstrings','Kurzhantel'],
 ['hip-thrust-bar','Hip Thrust Langhantel','glutes','Langhantel'],
 ['hip-abduction-machine','Hüftabduktion Maschine','glutes','Maschine'],
 ['calf-stand','Stehendes Wadenheben','calves','Maschine'],
 ['calf-seat','Sitzendes Wadenheben','calves','Maschine'],
 ['calf-smith','Wadenheben Multipresse','calves','Multipresse'],
 ['cable-crunch','Cable Crunches','core','Kabel'],
 ['hanging-knee','Hanging Knee Raises','core','Körpergewicht'],
 ['plank','Plank','core','Körpergewicht'],
 ['ab-wheel','Ab Wheel','core','Körpergewicht'],
 ['farmers-carry','Farmers Carry','forearms','Kurzhantel'],
 ['wrist-curl','Wrist Curls','forearms','Kurzhantel'],
 ['reverse-curl','Reverse Curls','forearms','Langhantel'],
 ['wa73-reverse-wrist','Reverse Wrist Curls','forearms','Kurzhantel'],
 ['wa73-farmers-hold',"Farmer's Holds",'forearms','Kurzhantel'],
 ['wa73-pec-deck','Pec Deck / Butterfly','chest','Maschine'],
 ['wa73-lat-supinated','Enger Untergriff-Latzug','back','Kabel'],
 ['wa73-lat-row-hip','Einarmiges Kabelrudern zur Hüfte','back','Kabel'],
 ['wa73-upright-ez','SZ-Upright Rows','delts','Langhantel'],
 ['wa73-adductors','Adduktorenmaschine','adductors','Maschine'],
 ['pendulum-squat','Pendulum Squat','quads','Maschine'],
 ['wa73-45-back-extensions','45°-Back-Extensions','glutes','Körpergewicht']
];
const extraCredits={adductors:[['adductors',1]],chest:[['chest',1],['triceps',.5],['delts',.5]],back:[['back',1],['biceps',.5]],delts:[['delts',1]],traps:[['traps',1]],biceps:[['biceps',1]],triceps:[['triceps',1]],quads:[['quads',1],['glutes',.5]],hamstrings:[['hamstrings',1],['glutes',.5]],glutes:[['glutes',1]],calves:[['calves',1]],core:[['core',1]],forearms:[['forearms',1]]};
const dedicated={
 'deadlift-barbell':[['back',1],['glutes',.5],['hamstrings',.5],['traps',.5]],'romanian-deadlift':[['hamstrings',1],['glutes',.5]],'rdl-db':[['hamstrings',1],['glutes',.5]],'back-extension':[['glutes',1],['hamstrings',.5]],'farmers-carry':[['forearms',1],['traps',.5]],'facepull':[['delts',1],['back',.5]],'pullup':[['back',1],['biceps',.5]],'close-grip-bench':[['triceps',1],['chest',.5]],'hip-thrust-bar':[['glutes',1]],'wa73-adductors':[['adductors',1]],'wa73-farmers-hold':[['forearms',1],['traps',.5]],'wa73-upright-ez':[['delts',1],['traps',.5]]
};
for(const [id,,group] of added)MUSCLE_RULES[id]=dedicated[id]||extraCredits[group];
function inferEquipment(id,name){const n=(name+' '+id).toLowerCase();if(/kurzhantel|dumbbell|db-|hammer curl/.test(n))return 'Kurzhantel';if(/kabel|cable|latzug|pulldown|seil/.test(n))return 'Kabel';if(/multipresse|smith/.test(n))return 'Multipresse';if(/langhantel|sz-|barbell|squat|deadlift/.test(n))return 'Langhantel';if(/plank|stütze|liegestütz|bird.dog/.test(n))return 'Körpergewicht';return 'Maschine'}
const existing=new Map();
for(const ex of Object.values(DEFAULT_PLANS).flat())existing.set(ex.id,{id:ex.id,name:ex.name,muscle:estimateMuscles(ex.id,ex.name)[0]?.[0]||'core',equipment:inferEquipment(ex.id,ex.name),defaultReps:ex.reps});
for(const [id,guide] of Object.entries(EXERCISE_GUIDES))if(!existing.has(id))existing.set(id,{id,name:guide.title,muscle:estimateMuscles(id,guide.title)[0]?.[0]||'core',equipment:inferEquipment(id,guide.title),defaultReps:'8–15'});
for(const [id,name,muscle,equipment] of added)existing.set(id,{id,name,muscle,equipment,defaultReps:muscle==='core'?'10–20':muscle==='calves'?'10–20':'8–12'});
export const EXERCISE_LIBRARY=[...existing.values()].sort((a,b)=>a.name.localeCompare(b.name,'de'));
export const EQUIPMENT=['Alle','Langhantel','Kurzhantel','Maschine','Kabel','Multipresse','Körpergewicht'];
export function findLibrary(id){return EXERCISE_LIBRARY.find(x=>x.id===id)||null}
export function libraryAlternatives(ex){const actual=findLibrary(ex.catalogId||ex.id);const primary=actual?.muscle||estimateMuscles(ex.id,ex.name).find(([_,n])=>n===1)?.[0];return primary?EXERCISE_LIBRARY.filter(x=>x.muscle===primary&&x.id!==(ex.catalogId||ex.id)):[]}
const item=(id,sets=2,reps='8–12')=>{const ex=findLibrary(id);if(!ex)throw new Error('Template exercise missing: '+id);return {id:ex.id,name:ex.name,sets,reps,warmups:0,rir:'2 / 1',note:'Vorlage: individuell anpassen.'}};
export const PROGRAM_TEMPLATES={
 fullbody:{name:'Ganzkörper 3×',labels:{A:'Ganzkörper 1',B:'Ganzkörper 2',C:'Ganzkörper 3'},description:'Drei unterschiedliche Ganzkörpereinheiten. Ausgangspunkt, kein individueller medizinischer Trainingsplan.',days:{A:[['leg-press',3],['chest-incline-db',3],['row-supported',3],['lateral-a',2],['curl-db',2],['triceps-rope',2]],B:[['back-squat',3],['pulldown-a',3],['db-bench',3],['leg-curl-seated',2],['calf-stand',2],['plank',2]],C:[['hack-squat',3],['machine-shoulder-press',3],['row-cable',3],['leg-curl-lying',2],['rear-delt-cable',2],['curl-cable',2]]}},
 upperlower:{name:'Upper / Lower (3 Tage)',labels:{A:'Upper 1',B:'Lower',C:'Upper 2'},description:'3-Tage-Vorlage: zwei Oberkörper- und ein Unterkörpertag; die Verteilung kann im nächsten Wochenzyklus manuell angepasst werden.',days:{A:[['chest-incline-db',3],['row-supported',3],['pulldown-a',2],['lateral-a',3],['preacher-a',2],['triceps-rope',2]],B:[['leg-press',3],['leg-curl-seated',3],['bulgarian-split',2],['calf-stand',3],['pallof',2]],C:[['barbell-bench',3],['row-cable',3],['pullup',2],['rear-delt-cable',3],['hammer-curl',2],['triceps-overhead',2]]}},
 ppl:{name:'Push / Pull / Legs',labels:{A:'Push',B:'Pull',C:'Legs'},description:'Klassische PPL-Vorlage mit einer Einheit pro Muster im A/B/C-Zyklus.',days:{A:[['chest-incline-db',3],['chest-flat',3],['machine-shoulder-press',2],['lateral-a',3],['triceps-rope',3]],B:[['pulldown-a',3],['row-supported',3],['rear-delt-cable',3],['curl-bar',3],['hammer-curl',2]],C:[['leg-press',3],['leg-curl-seated',3],['bulgarian-split',2],['calf-stand',3],['cable-crunch',2]]}},
 strength:{name:'Strength Foundations',labels:{A:'Bench / Pull',B:'Squat / Core',C:'Hinge / Press'},description:'Grundlagenorientierte Kraftvorlage. Technik, Belastbarkeit und passende Varianten prüfen.',days:{A:[['barbell-bench',3,'5–8'],['row-supported',3,'6–10'],['pulldown-a',2],['triceps-rope',2]],B:[['back-squat',3,'5–8'],['leg-curl-seated',3],['split-squat',2],['pallof',2]],C:[['deadlift-barbell',2,'4–6'],['db-shoulder-press',3,'6–10'],['pullup',3],['curl-db',2]]}}
};
export function templatePlans(key){const t=PROGRAM_TEMPLATES[key];if(!t)return null;return Object.fromEntries(['A','B','C'].map(day=>[day,t.days[day].map(([id,sets,reps])=>item(id,sets,reps||'8–12'))]));}
export function templateLabels(key){return PROGRAM_TEMPLATES[key]?.labels||EXERCISE_LABELS}
