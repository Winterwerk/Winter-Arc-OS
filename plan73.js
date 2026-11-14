/* WINTER ARC 7.3 — opt-in five-session personal program.
   No state is changed simply by importing this module.
   This is a training template, not a medical clearance or an automatically optimal volume. */
export const PROGRAM_73_NAME='WINTER ARC 7.3 · Maximum Hypertrophy & Grip';
export const PROGRAM_73_LABELS={A:'Upper A · Obere Brust & Rücken',B:'Lower A · Beine & Unterarme',C:'Chest & Back · Flachbank',D:'Lower B · Beine & Core',E:'Delts, Arms & Grip'};
// name | sets | repetition/hold range | stable exercise catalog ID | RIR guidance | warm-up sets | concise technique note | hold-in-seconds?
const EXERCISES={
 A:[
 ['Schrägbank-Kurzhanteldrücken',2,'6–10','chest-incline-db','2 / 1–2',3,'Bank 15–30°, kontrolliertes Absenken.'],
 ['Sitzendes Kabelrudern',2,'8–12','row-cable','2 / 1',2,'Rumpf ruhig halten; Ellenbogen kontrolliert zurückführen.'],
 ['Enger Untergriff-Latzug',2,'8–12','wa73-lat-supinated','2 / 1–2',1,'Ellenbogen nach unten führen, ohne Oberkörperschwung.'],
 ['Pec Deck / Butterfly',1,'12–15','wa73-pec-deck','1–2',1,'Brust ansteuern, Schultern nicht überstrecken.'],
 ['Sitzendes Kurzhantel-Schulterdrücken',2,'8–12','db-shoulder-press','2 / 2',2,'Rumpf und Rücken stabil, kontrolliert drücken.'],
 ['Einarmiges Kabel-Seitheben',2,'12–20','lateral-a','2 / 1',1,'Ellenbogen kontrolliert seitlich führen.'],
 ['Kabelcurls mit gerader Stange',1,'10–15','curl-cable','1–2',1,'Keine Schwungbewegung aus Schulter und Rumpf.'],
 ['Trizepsdrücken am Seil',1,'10–15','triceps-rope','1–2',1,'Oberarme möglichst ruhig halten.']
 ],
 B:[
 ['45°-Beinpresse',2,'8–12','leg-press','3 / 2',3,'Becken anlehnen, nur so tief wie kontrollierbar.'],
 ['Beinstrecker',2,'10–15','leg-extension-machine','2 / 1',1,'Bewegung ohne Schwung ausführen.'],
 ['Liegender Beinbeuger',2,'10–15','leg-curl-lying','2 / 1–2',1,'Hüfte am Polster, kontrollierte negative Phase.'],
 ['Stehendes Wadenheben',2,'10–15','calf-stand','2 / 1',1,'Kontrolliert strecken und absenken, nicht federn.'],
 ['Pallof Press',2,'10–15','pallof','kontrolliert',0,'Rumpf gegen Rotation stabilisieren.'],
 ['Wrist Curls',2,'12–20','wrist-curl','2 / 1',1,'Unterarme abstützen, nur Handgelenke beugen.'],
 ['Reverse Wrist Curls',2,'15–25','wa73-reverse-wrist','2 / 1',1,'Leicht beginnen; Handgelenke kontrolliert strecken.']
 ],
 C:[
 ['Flachbank-Langhanteldrücken',2,'6–10','barbell-bench','2 / 1–2',3,'Sicherheitsablagen/Spotter, kontrollierte Tiefe.'],
 ['Einarmiger Kabel-Latzug',2,'10–15','lat-single','2 / 1',1,'Ellenbogen kontrolliert nach unten ziehen.'],
 ['Einarmiges Kabelrudern zur Hüfte',2,'10–15','wa73-lat-row-hip','2 / 1–2',1,'Ellenbogen zur Hüfte, ohne Oberkörperrotation.'],
 ['Einarmiges Kurzhantelrudern mit Abstützung',1,'8–12','row-db','1–2',1,'Stabil abstützen, nicht aus dem Rücken reißen.'],
 ['Pec Deck / Butterfly',2,'12–20','wa73-pec-deck','2 / 1',0,'Brustspannung und reproduzierbarer Bewegungsumfang.'],
 ['Straight-Arm Pulldown',1,'12–20','straight-arm-pulldown','1–2',0,'Ellbogenwinkel stabil, Schulter führt die Bewegung.'],
 ['Reverse Pec Deck',2,'12–20','reverse-fly','2 / 1',1,'Hintere Schulter kontrolliert belasten.']
 ],
 D:[
 ['Hack Squat',2,'8–12','hack-squat','3 / 2',3,'Rumpf abgestützt, Beckenbewegung kontrollieren.'],
 ['Liegender Beinbeuger',2,'10–15','leg-curl-lying','2 / 1',1,'Stabile Hüfte, kein Schwung.'],
 ['Hip Thrust',2,'8–15','hip-thrust-bar','2 / 2',2,'Hüfte strecken, LWS nicht überstrecken.'],
 ['Beinstrecker',2,'12–15','leg-extension-machine','2 / 1',0,'Kontrollierter Bewegungsumfang.'],
 ['Adduktorenmaschine',2,'12–20','wa73-adductors','2 / 1–2',1,'Position stabil halten.'],
 ['Stehendes Wadenheben',2,'10–20','calf-stand','2 / 1',0,'Absenken kontrollieren, nicht federn.'],
 ['Hängendes Knieheben',2,'10–20','hanging-knee','kontrolliert',0,'Becken kontrolliert einrollen, keinen Schwung.']
 ],
 E:[
 ['Einarmiges Kabel-Seitheben',2,'12–20','lateral-a','2 / 1',1,'Seitliche Schulter ohne Oberkörperschwung.'],
 ['SZ-Upright Rows',2,'10–15','wa73-upright-ez','2 / 2',1,'Nur im schmerzfreien Bewegungsumfang anheben.'],
 ['Einarmiges Kabel-Reverse-Fly',1,'12–20','rear-delt-cable','1–2',0,'Hintere Schulter ansteuern, Schulter nicht hochziehen.'],
 ['SZ-Preacher Curls',2,'8–12','preacher-a','2 / 1',1,'Keine ruckartige Streckung am unteren Ende.'],
 ['Schrägbank-Kurzhantelcurls',1,'10–15','curl-incline','1–2',1,'Oberarm zurück, keine Schulterbewegung.'],
 ['Hammer Curls',2,'10–15','hammer-curl','2 / 1',1,'Neutralgriff, Ellenbogen ruhig halten.'],
 ['Overhead-Kabel-Trizepsstrecken',2,'10–15','triceps-overhead','2 / 1',1,'Oberarme stabil über Kopf.'],
 ['Trizepsdrücken am Seil',1,'10–15','triceps-rope','1–2',0,'Ohne Körperschwung strecken.'],
 ['Schwere Kurzhantel-Shrugs',2,'10–15','shrug-db','2 / 1',1,'Schultern aufwärts ziehen, nicht kreisen.'],
 ['Farmer\'s Holds',2,'20–40 s','wa73-farmers-hold','Haltereserve',1,'Aufrecht und stabil stehen; Last vor Kontrollverlust absetzen.',true]
 ]
};
export function createProgram73(){return Object.fromEntries(Object.entries(EXERCISES).map(([day,rows])=>[day,rows.map(([name,sets,reps,catalogId,rir,warmups,note,timeBased],i)=>({id:`wa73-${day}-${String(i+1).padStart(2,'0')}`,catalogId,name,sets,reps,rir,warmups,note,timeBased:!!timeBased}))]));}
export const CUSTOM_73_GUIDES={
 'db-shoulder-press':{focus:'Vordere und seitliche Schulter · Trizeps unterstützt',cues:['Sitz und Lehne stabil einstellen; Füße sicher aufstellen.','Kurzhanteln kontrolliert drücken, ohne ins Hohlkreuz auszuweichen.','Schmerzarmer Bewegungsumfang und gleichmäßige Wiederholungen.'],avoid:'Keine ruckartigen Maximalversuche.'},
 'wrist-curl':{focus:'Handgelenkbeuger · Unterarmunterseite',cues:['Unterarme mit Handflächen nach oben auf einer Bank abstützen.','Handgelenke kontrolliert beugen und strecken.','Mit leichtem Gewicht starten, nicht in die Dehnung fallen lassen.'],avoid:'Nicht durch schmerzhaften Ellenbogen- oder Handgelenkzug trainieren.'},
 'straight-arm-pulldown':{focus:'Latissimus · Schulterextension',cues:['Ellbogen leicht gebeugt halten und Winkel wenig ändern.','Arme aus der Schulter kontrolliert Richtung Oberschenkel ziehen.','Rumpf bleibt ruhig; keine Schwungbewegung.'],avoid:'Nicht durch starkes Rundmachen oder Überstrecken des Rückens kompensieren.'},
 'hack-squat':{focus:'Quadrizeps · Gesäß unterstützt',cues:['Rücken und Becken an der Geräteauflage halten.','Knie kontrolliert beugen, Fersen auf der Plattform lassen.','Nur so tief wie bei stabiler Beckenposition beschwerdearm möglich.'],avoid:'Keine extreme Tiefe erzwingen, wenn Becken unter Last einrollt.'},
 'hip-thrust-bar':{focus:'Gesäßmuskulatur · Hüftstreckung',cues:['Oberen Rücken stabil an der Bank positionieren.','Hüfte kontrolliert heben, nicht aus der LWS überstrecken.','Oben Gesäß anspannen und wieder kontrolliert senken.'],avoid:'Kein starkes Hohlkreuz am oberen Punkt.'},
 'hanging-knee':{focus:'Gerader Bauchmuskel · Hüftbeuger unterstützen',cues:['Ruhig hängen und Schulterposition kontrollieren.','Knie anheben und Becken leicht einrollen.','Ohne Schwung absenken.'],avoid:'Bei Rücken- oder Griffproblemen Belastung reduzieren bzw. abstützen.'},
 'hammer-curl':{focus:'Brachioradialis · Brachialis · Bizeps',cues:['Kurzhanteln neutral greifen, Daumen zeigt nach oben.','Ellenbogen nahe am Körper halten.','Gewicht ohne Oberkörperschwung bewegen.'],avoid:'Keine ruckartigen Lastwechsel am Ellenbogen.'},
 'wa73-lat-supinated':{focus:'Latissimus · Bizeps als Helfer',cues:['Griff etwas enger und supiniert, solange Handgelenke beschwerdearm bleiben.','Ellenbogen nach unten führen, nicht mit Oberkörperschwung ziehen.','Gewicht kontrolliert zurückführen.'],avoid:'Nicht mit schmerzhaft verdrehten Handgelenken trainieren.'},
 'wa73-pec-deck':{focus:'Brustmuskulatur',cues:['Sitzposition so einstellen, dass die Arme symmetrisch geführt werden.','Brust bewegt die Arme zueinander, Schultern nicht hochziehen.','Kontrolliert öffnen, ohne die Schulter überzustrecken.'],avoid:'Keine schmerzhafte Extremdehnung.'},
 'wa73-lat-row-hip':{focus:'Latissimus · unterstützend Bizeps',cues:['Kabelgriff zur Hüfte führen, Ellenbogen bleibt eher nahe am Körper.','Oberkörper nicht ins Rudern hineinrotieren.','Bewegung kontrolliert und möglichst gleichmäßig je Seite ausführen.'],avoid:'Nicht aus der Lendenwirbelsäule beschleunigen.'},
 'wa73-reverse-wrist':{focus:'Handgelenkstrecker · Unterarmoberseite',cues:['Unterarme stabil auf Bank oder Oberschenkeln abstützen.','Handrücken kontrolliert anheben und wieder ablassen.','Sehr kleine Gewichte wählen; Steigerungen langsam vornehmen.'],avoid:'Bei stechenden Handgelenk- oder Ellenbogenschmerzen stoppen.'},
 'wa73-adductors':{focus:'Adduktoren · innere Oberschenkel',cues:['Sitz und Bewegungsweite angenehm einstellen.','Beine kontrolliert zusammenführen.','Ohne Hüft- oder Rumpfschwung zurückführen.'],avoid:'Keine erzwungene Hüftdehnung.'},
 'wa73-upright-ez':{focus:'Seitlicher Deltamuskel · oberer Trapez',cues:['SZ-Stange mit angenehmer Griffweite halten.','Ellbogen nur bis in den schmerzfreien Bereich anheben.','Keine ruckartige Schulterbewegung.'],avoid:'Bei Schulter-Einklemmgefühl eine andere Übung auswählen.'},
 'wa73-farmers-hold':{focus:'Fingerbeuger · statische Griffkraft · Trapez',cues:['Schwere Kurzhanteln stabil seitlich halten.','Aufrecht stehen, nicht seitlich kippen oder ins Hohlkreuz gehen.','Nach 20–40 Sekunden kontrolliert abstellen.'],avoid:'Nicht bis zum unkontrollierten Fallenlassen trainieren.'}
};
