export const APP_VERSION='2.1.0';
export const PLAN_VERSION='WINTER ARC 5.2 · Oldschool Intensity';
export const GROUPS={
 chest:'Brust',back:'Rücken',delts:'Schultern',biceps:'Bizeps',triceps:'Trizeps',traps:'Trapez',
 core:'Rumpf',quads:'Quadrizeps',hamstrings:'Beinbeuger',glutes:'Gesäß',calves:'Waden',forearms:'Unterarme'
};
export const BODY_FIELDS=[
 ['weight','Gewicht','kg'],['neck','Hals','cm'],['shoulders','Schultern','cm'],['chest','Brust','cm'],
 ['waistNatural','Taille (schmalste Stelle)','cm'],['waist','Bauch (Nabelhöhe)','cm'],['hips','Hüfte / Gesäß','cm'],
 ['armLeftFlexed','Oberarm links (angespannt)','cm'],['armRightFlexed','Oberarm rechts (angespannt)','cm'],
 ['armLeftRelaxed','Oberarm links (locker)','cm'],['armRightRelaxed','Oberarm rechts (locker)','cm'],
 ['forearmLeft','Unterarm links','cm'],['forearmRight','Unterarm rechts','cm'],
 ['thighLeft','Oberschenkel links','cm'],['thighRight','Oberschenkel rechts','cm'],
 ['calfLeft','Wade links','cm'],['calfRight','Wade rechts','cm']
];
// direct=1, indirect=0.5: display heuristic, not physiological measurement.
export const MUSCLE_RULES={
 'chest-incline':[['chest',1],['triceps',.5],['delts',.5]],
 'chest-flat':[['chest',1],['triceps',.5],['delts',.5]],
 'chest-incline-db':[['chest',1],['triceps',.5],['delts',.5]],
 'chest-incline-machine':[['chest',1],['triceps',.5],['delts',.5]],
 'fly-a':[['chest',1]],'pec-deck':[['chest',1]],
 'row-supported':[['back',1],['biceps',.5],['traps',.5]],'row-c':[['back',1],['biceps',.5],['traps',.5]],
 'pulldown-a':[['back',1],['biceps',.5]],'pulldown-c':[['back',1],['biceps',.5]],
 'lateral-a':[['delts',1]],'lateral-b':[['delts',1]],'lateral-c':[['delts',1]],
 'reverse-fly':[['delts',1],['back',.5]], 'upright-sz':[['delts',1],['traps',.5]],
 'biceps-machine':[['biceps',1]],'biceps-b':[['biceps',1]],'hammer-c':[['biceps',1],['forearms',.5]],
 'preacher-a':[['biceps',1]],'preacher-c':[['biceps',1]],
 'triceps-unilateral':[['triceps',1]],'triceps-b':[['triceps',1]],'triceps-c':[['triceps',1]],
 'triceps-overhead':[['triceps',1]],'shrugs-a':[['traps',1]],'shrugs-c':[['traps',1]],
 'leg-press':[['quads',1],['glutes',.5]],'leg-press-light':[['quads',1],['glutes',.5]],
 'step-up':[['quads',1],['glutes',.5]],'split-squat':[['quads',1],['glutes',.5]],
 'leg-ext':[['quads',1]],'leg-ext-c':[['quads',1]],'leg-curl':[['hamstrings',1]],'leg-curl-c':[['hamstrings',1]],
 'glute-bridge':[['glutes',1]],'hip-abduction':[['glutes',1]],
 'calf-straight':[['calves',1]],'calf-bent':[['calves',1]],'calf-c':[['calves',1]],
 'pallof':[['core',1]],'sideplank':[['core',1]],'bird-dog':[['core',1]],
 'wrist-ext-c':[['forearms',1]],'wrist-ext-a':[['forearms',1]],'rotation-c':[['forearms',1]],
 'external-rotation-a':[['delts',.5]],'external-rotation-c':[['delts',.5]]
};
export function estimateMuscles(exerciseId,name=''){
 if(MUSCLE_RULES[exerciseId])return MUSCLE_RULES[exerciseId];
 const n=String(name).toLowerCase();
 if(/butterfly|pec.deck|flys?|fliegende/.test(n))return [['chest',1]];
 if(/bankdrück|brustpresse|schräg.*brust|incline/.test(n))return [['chest',1],['triceps',.5],['delts',.5]];
 if(/rudern|latzug|pulldown|high.row/.test(n))return [['back',1],['biceps',.5],['traps',.5]];
 if(/seitheben|upright/.test(n))return [['delts',1],['traps',.5]];
 if(/reverse.*(fly|butterfly)|rear.delt/.test(n))return [['delts',1],['back',.5]];
 if(/shrug|trapez/.test(n))return [['traps',1]];
 if(/hammer.*curl/.test(n))return [['biceps',1],['forearms',.5]];
 if(/bizeps|curl/.test(n))return [['biceps',1]];
 if(/trizeps/.test(n))return [['triceps',1]];
 if(/beinpresse|kniebeuge|step.up|split.squat/.test(n))return [['quads',1],['glutes',.5]];
 if(/beinstreck/.test(n))return [['quads',1]];
 if(/beinbeug|hamstring/.test(n))return [['hamstrings',1]];
 if(/waden|calf/.test(n))return [['calves',1]];
 if(/hip.thrust|glute|abduktion/.test(n))return [['glutes',1]];
 if(/pallof|plank|bird.dog|curl.up/.test(n))return [['core',1]];
 if(/unterarm|handgelenk|pronation|supination/.test(n))return [['forearms',1]];
 return [];
}
export const DEFAULT_PLANS={
 A:[
  {id:'chest-incline-db',name:'Schrägbank-Kurzhanteldrücken',sets:3,reps:'8–12',warmups:2,rir:'3 / 2 / 1–2',note:'15–30° Schrägbank. Kein erzwungenes Versagen mit schweren Kurzhanteln.'},
  {id:'row-supported',name:'Brustgestütztes Rudern',sets:2,reps:'8–12',warmups:1,rir:'2 / 1',note:'Rücken stabil, kontrolliert ziehen.'},
  {id:'chest-flat',name:'Flache Brustpresse',sets:2,reps:'8–12',rir:'2 / 1',note:'Geführte Bewegung; volle Kontrolle.'},
  {id:'pulldown-a',name:'Neutraler Latzug',sets:2,reps:'8–12',rir:'2 / 1',note:'Keine Schwungwiederholungen.'},
  {id:'upright-sz',name:'SZ-Upright Rows',sets:2,reps:'10–15',rir:'2 / 1–2',note:'Symptomverträglicher Bewegungsumfang.'},
  {id:'lateral-a',name:'Kabel-Seitheben',sets:2,reps:'12–20',rir:'1 / 0',note:'Nur letzter Satz optional technisches Muskelversagen nach Eingewöhnung.'},
  {id:'preacher-a',name:'Preacher Curls',sets:2,reps:'10–15',rir:'2 / 1',note:'Keine ruckartigen Bewegungen aus Streckposition.'},
  {id:'triceps-unilateral',name:'Einarmiges Trizepsdrücken',sets:2,reps:'10–15',rir:'2 / 1',note:'Kontrollierte Streckung.'},
  {id:'external-rotation-a',name:'Schulter-Außenrotation leicht',sets:2,reps:'12–15',rir:'3–4',note:'Leichter Zusatzblock für die Rotatorenmanschette.'}
 ],
 B:[
  {id:'leg-press',name:'Beinpresse',sets:3,reps:'10–15',warmups:2,rir:'3 / 2 / 2',note:'Becken bleibt am Polster, keine maximale Ausbelastung.'},
  {id:'leg-curl',name:'Beinbeuger (Gerätevariante)',sets:3,reps:'10–15',rir:'2 / 2 / 1',note:'Gerät exakt dokumentieren (liegend oder sitzend).'},
  {id:'split-squat',name:'Unterstützte Split Squats',sets:2,reps:'8–12',rir:'3 / 2',note:'Stabilität vor Last.'},
  {id:'glute-bridge',name:'Hip-Thrust-Maschine',sets:2,reps:'10–15',rir:'3 / 2',note:'Neutraler Rücken, keine Überstreckung.'},
  {id:'calf-straight',name:'Wadenheben – Knie gestreckt',sets:2,reps:'10–15',rir:'2 / 1',note:'3 Sekunden exzentrisch, kontrolliert.'},
  {id:'calf-bent',name:'Wadenheben – Knie gebeugt',sets:2,reps:'10–15',rir:'2 / 1',note:'3 Sekunden exzentrisch, kontrolliert.'},
  {id:'reverse-fly',name:'Reverse Pec Deck',sets:2,reps:'12–20',rir:'1 / 0',note:'Optionales technisches Versagen nur nach Eingewöhnung.'},
  {id:'pallof',name:'Pallof Press',sets:2,reps:'10 je Seite',rir:'Kontrolliert',note:'Antirotation, symptomverträglich.'},
  {id:'sideplank',name:'Side Plank',sets:2,reps:'15–25 s je Seite',rir:'Kontrolliert',note:'Sekunden ins Wiederholungsfeld eintragen.'}
 ],
 C:[
  {id:'pulldown-c',name:'Neutraler Latzug',sets:2,reps:'8–12',rir:'2 / 1',note:'Rückführung kontrollieren.'},
  {id:'chest-incline-machine',name:'Schrägbank-Brustpresse',sets:2,reps:'8–12',warmups:1,rir:'2 / 1',note:'Maschinen- und Kurzhantelleistungen getrennt vergleichen.'},
  {id:'row-c',name:'Brustgestütztes Rudern',sets:2,reps:'8–12',rir:'2 / 1',note:'Bewegung ohne Schwung.'},
  {id:'pec-deck',name:'Butterfly / Pec Deck',sets:2,reps:'12–15',rir:'1 / 0',note:'Nur letzter Satz optional technisches Versagen nach Eingewöhnung.'},
  {id:'lateral-c',name:'Kabel-Seitheben',sets:2,reps:'12–20',rir:'2 / 1',note:'Seitliche Schulter.'},
  {id:'preacher-c',name:'SZ-Preacher Curls',sets:2,reps:'10–15',rir:'2 / 1',note:'Bewegung kontrolliert.'},
  {id:'triceps-overhead',name:'Überkopf-Trizepsstrecken am Kabel',sets:2,reps:'10–15',rir:'2 / 1',note:'Keine schmerzhaften Endpositionen erzwingen.'},
  {id:'shrugs-c',name:'Geführte Shrugs',sets:2,reps:'10–15',rir:'2 / 1',note:'Ohne Kopf-/Rückenschwung.'},
  {id:'leg-ext-c',name:'Beinstrecker',sets:2,reps:'12–15',rir:'2 / 1',note:'Zweiter Quadrizepsreiz.'},
  {id:'leg-curl-c',name:'Beinbeuger (Gerätevariante)',sets:2,reps:'12–15',rir:'2 / 1',note:'Zweiter Hamstringreiz.'},
  {id:'rotation-c',name:'Unterarm-Pronation/Supination',sets:2,reps:'12 je Richtung',rir:'3–4',note:'Leichter Hebel, kontrolliert.'}
 ]
};
export const EXERCISE_LABELS={A:'Upper Mass & Width',B:'Lower Mass & Stability',C:'Upper Density & Arms'};
export const SHIFT_LABELS={early:'Frühdienst',day:'Tagesdienst',night:'Nachtdienst',postnight:'Ausruhtag nach Nacht',free:'Frei'};
export const STARTING_BODY={date:'2026-10-15',weight:103.9,neck:43,shoulders:118,chest:106,waistNatural:91,waist:100,hips:109,armLeftFlexed:40,armRightFlexed:40,armLeftRelaxed:37,armRightRelaxed:37.5,forearmLeft:32,forearmRight:31.5,thighLeft:64,thighRight:65,calfLeft:40.5,calfRight:41};
