/* WINTER ARC 2.1 – Offline-Benchmark-Daten. Stand 03.11.2026.
   Gewichte sind redaktionell berichtete Werte, KEINE amtlichen Waageprotokolle.
   Regellimits sind offizielle maximale Einwaagegewichte, KEINE Ziel- oder Durchschnittswerte. */
const LEAGUE_PRO_URL='https://www.ifbbpro.com/rules/';
const NPC_URL='https://www.ifbbpro.com/npc-worldwide/rules/';

// IFBB Pro League Classic Physique, Pro Rules 2026-09-30.
export const PRO_CLASSIC=[
  [162.6,80.3],[165.1,82.6],[167.6,84.8],[170.2,87.1],[172.7,89.4],
  [175.3,92.5],[177.8,96.2],[180.3,99.3],[182.9,103.0],[185.4,106.1],
  [188.0,109.8],[190.5,112.9],[193.0,116.1],[195.6,119.3],
  [198.1,122.5],[200.7,125.6],[Infinity,128.8]
];
// NPC Worldwide Amateur Classic Physique, 2026-10-25 (not IFBB Pro League Pro rules).
export const NPC_CLASSIC=[
  [162.6,75.7],[165.1,78.0],[167.6,80.3],[170.2,82.6],[172.7,84.8],
  [175.3,88.0],[177.8,91.6],[180.3,94.8],[182.9,98.4],[185.4,101.6],
  [188.0,105.2],[190.5,108.4],[193.0,111.6],[195.6,114.8],
  [198.1,117.9],[200.7,121.1],[Infinity,124.3]
];
export function classicLimit(heightCm,chart=PRO_CLASSIC){
  const h=Number(heightCm);
  if(!Number.isFinite(h)||h<140||h>240)return null;
  for(const [upper,limit] of chart)if(h<=upper)return {weightKg:limit,upperHeightCm:Number.isFinite(upper)?upper:null,source:chart===PRO_CLASSIC?LEAGUE_PRO_URL:NPC_URL};
  return null;
}
export const ATHLETE_WEIGHTS=[
  {id:'urs-2025-stage',name:'Urs Kalecinski',heightCm:180.5,weightKg:118,phase:'stage',when:'Open-Debüt 2025',qualification:'ca. – redaktionell berichtet',source:'https://www.repone.de/news/national/urs-kalecinski-spricht-ueber-seine-comeback-plaene/',note:'Knapp 118 kg laut RepOne; kein öffentliches offizielles Wiegeprotokoll.'},
  {id:'urs-2026-off',name:'Urs Kalecinski',heightCm:180.5,weightKg:133.8,phase:'offseason',when:'Oktober 2026',qualification:'ca. – Selbstaussage',source:'https://fitnessvolt.com/urs-kalecinski-hints-2027-new-york-pro-and-pittsburgh-pro/',note:'Im Interview ungefähr 295 lb (≈133,8 kg), in einem Bericht wiedergegeben.'},
  {id:'arnold-1975-stage',name:'Arnold Schwarzenegger',heightCm:188.0,weightKg:106.6,phase:'stage',when:'Mr. Olympia 1975',qualification:'ca. – historischer Bericht',source:'https://thebarbell.com/1975-mr-olympia/',note:'235 lb im historischen Wettkampfbericht.'},
  {id:'lou-1975-stage',name:'Lou Ferrigno',heightCm:195.6,weightKg:121.6,phase:'stage',when:'Mr. Olympia 1975',qualification:'ca. – historischer Bericht',source:'https://thebarbell.com/1975-mr-olympia/',note:'268 lb im historischen Wettkampfbericht.'},
  {id:'dorian-1997-stage',name:'Dorian Yates',heightCm:179.1,weightKg:120.2,phase:'stage',when:'Mr. Olympia 1997',qualification:'ca. – historischer Bericht',source:'https://gmvbodybuilding.com/v-213c-download/',note:'265 lb in historischer Wettkampfübersicht.'},
  {id:'dorian-off',name:'Dorian Yates',heightCm:179.1,weightKg:138.3,phase:'offseason',when:'Historischer Offseason-Profilwert',qualification:'ca. – Profilangabe',source:'https://www.muscleandfitness.com/flexonline/the-heavy-duty-life-and-career-of-dorian-yates/',note:'305 lb, kein einzelnes Wettkampfdatum.'},
  {id:'ronnie-stage',name:'Ronnie Coleman',heightCm:180.3,weightKg:134.3,phase:'stage',when:'Karriere-Profilwert (Jahr nicht genannt)',qualification:'ca. – Profilangabe',source:'https://www.muscleandfitness.com/athlete/ronnie-coleman/',note:'296 lb Competition Weight; keiner konkreten offiziellen Einwaage zugeordnet.'},
  {id:'cbum-2018-stage',name:'Chris Bumstead',heightCm:182.9,weightKg:102.1,phase:'stage',when:'Classic Physique, Interview 2018',qualification:'ca. – Athleten-/Presseangabe',source:'https://www.muscleandfitness.com/athletes-celebrities/interviews/how-chris-bumstead-could-become-first-classic-physique-superstar/',note:'225 lb angegebenes Bühnengewicht; die historische Angabe ist nicht sein aktuelles Gewicht.'}
];

const htmlSafe=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const kg=x=>Number(x).toLocaleString('de-DE',{minimumFractionDigits:1,maximumFractionDigits:1});
const sign=x=>(x>0?'+':'')+kg(x);
const athletePhase=p=>p==='stage'?'Bühne / Wettkampf':'Offseason';

export function physiqueBenchmarks({heightCm=201,weightKg=null,phase='all'}={}){
 const height=Number(heightCm)||201;
 const w=Number(weightKg),hasWeight=weightKg!==null&&weightKg!==''&&Number.isFinite(w)&&w>0;
 const pro=classicLimit(height),npc=classicLimit(height,NPC_CLASSIC);
 const chosen=ATHLETE_WEIGHTS.filter(a=>phase==='all'||a.phase===phase).sort((a,b)=>a.name.localeCompare(b.name,'de')||a.weightKg-b.weightKg);
 const chartRow=([up,lim],idx)=>`<tr class="${pro?.upperHeightCm===(Number.isFinite(up)?up:null)?'is-mine':''}"><td>${idx===0?'bis '+kg(up)+' cm':Number.isFinite(up)?'über '+kg(PRO_CLASSIC[idx-1][0])+' bis '+kg(up)+' cm':'über 200,7 cm'}</td><td>${kg(lim)} kg</td><td>${kg(NPC_CLASSIC[idx][1])} kg</td></tr>`;
 return `<section class="panel section-gap" id="physique-benchmarks"><div class="section-header"><div><span class="eyebrow">PHYSIQUE BENCHMARKS · OFFLINE DATA</span><h2>Wettkampflimits & Profi-Vergleich</h2></div><span class="tag">QUELLENBASIERT</span></div>
 <p class="micro">Regelstand 2026 · Profiangaben sind historische oder datierte Momentaufnahmen. Kein Ranking der Muskelmasse und keine Empfehlung für ein Zielgewicht.</p>
 <div class="bench-profile"><form id="bench-height-form" class="bench-height-form"><label>Körpergröße (cm)<input name="heightCm" type="number" min="140" max="240" step="0.1" value="${htmlSafe(height)}" required></label><button class="subtle" type="submit">Aktualisieren</button></form><div class="bench-current"><span>Dein letztes protokolliertes Gewicht</span><strong>${hasWeight?kg(w)+' kg':'Noch kein Gewicht erfasst'}</strong></div></div>
 <div class="bench-standards"><div class="bench-standard"><span>IFBB Pro League</span><strong>Classic Physique · ${pro?kg(pro.weightKg)+' kg':'–'}</strong><small>Offizielle Gewichtsobergrenze bei ${kg(height)} cm</small>${hasWeight&&pro?`<span class="bench-diff">Differenz zum Limit: ${sign(pro.weightKg-w)} kg</span>`:''}<a href="${LEAGUE_PRO_URL}" target="_blank" rel="noopener noreferrer">Offizielle Pro-Regeln ↗</a></div><div class="bench-standard"><span>NPC Worldwide (Amateur)</span><strong>Classic Physique · ${npc?kg(npc.weightKg)+' kg':'–'}</strong><small>Anderer Verbandstatus, andere Tabelle</small>${hasWeight&&npc?`<span class="bench-diff">Differenz zum Limit: ${sign(npc.weightKg-w)} kg</span>`:''}<a href="${NPC_URL}" target="_blank" rel="noopener noreferrer">Offizielle Amateur-Regeln ↗</a></div></div>
 <div class="bench-classes"><div><strong>Men's Open</strong><small>Keine obere Körpergewichtsgrenze in der Pro-League-Open-Klasse.</small></div><div><strong>Men's 212</strong><small>Maximal 212 lb (≈96,2 kg), nicht größenabhängig.</small></div></div>
 <details class="bench-table-details"><summary>Offizielle Classic-Physique-Tabelle aller Größen anzeigen</summary><div class="bench-table-scroll"><table class="bench-table"><thead><tr><th>Größenbereich</th><th>Pro-Limit</th><th>NPC-Limit</th></tr></thead><tbody>${PRO_CLASSIC.map(chartRow).join('')}</tbody></table></div><p class="micro">Nur Wettbewerbs-Gewichtsobergrenzen, kein Normgewicht und kein Mindestgewicht. Die Gewichtsklasse des konkreten Wettbewerbs stets erneut bei der Organisation prüfen.</p></details>
 <div class="section-header bench-subhead"><div><span class="eyebrow">PRO ATHLETES</span><h3>Berichtete Körpergewichte</h3></div></div>
 <div class="bench-filters" role="group" aria-label="Gewichtsphase">${[['all','Alle'],['stage','Wettkampf'],['offseason','Offseason']].map(([id,label])=>`<button data-benchmark-phase="${id}" class="${phase===id?'active':''}" aria-pressed="${phase===id}">${label}</button>`).join('')}</div>
 <div class="bench-athletes">${chosen.map(a=>{const delta=hasWeight?`${sign(a.weightKg-w)} kg zum eigenen Gewicht`:'';const barMax=Math.max(150,a.weightKg,hasWeight?w:0);return `<article class="bench-athlete"><div class="bench-athlete-head"><div><strong>${htmlSafe(a.name)}</strong><small>${htmlSafe(a.when)} · ${athletePhase(a.phase)}</small></div><b>${kg(a.weightKg)} kg</b></div><div class="bench-plot" aria-label="Berichtetes Gewicht ${kg(a.weightKg)} Kilogramm${hasWeight?`, eigenes Gewicht ${kg(w)} Kilogramm`:''}"><span style="width:${(a.weightKg/barMax*100).toFixed(1)}%"></span>${hasWeight?`<i class="bench-own-marker" style="left:${(w/barMax*100).toFixed(1)}%" title="Eigenes Gewicht"></i>`:''}</div><div class="bench-meta"><span>${kg(a.heightCm)} cm · ${htmlSafe(a.qualification)}</span>${hasWeight?`<span>${delta}</span>`:''}</div><details><summary>Quelle & Einordnung</summary><p>${htmlSafe(a.note)}</p><a href="${htmlSafe(a.source)}" target="_blank" rel="noopener noreferrer">Originalquelle öffnen ↗</a></details></article>`}).join('')}</div>
 <p class="micro"><span class="bench-legend-dot"></span> Balken = berichtetes Athletengewicht${hasWeight?'; senkrechte Markierung = dein eigenes Gewicht':''}. Athleten unterscheiden sich in Größe, Fettanteil, Wettkampfform und Berichtszeitpunkt. Exaktes Gewicht von Mike Gaiera (Tren Twins) mangels belastbar zuordenbarer Quelle bewusst nicht aufgenommen.</p>
 <div class="notice warning"><strong>Keine Zielgewichte:</strong> Ein Limit ist nicht das erforderliche Bühnengewicht; berichtete Offseason-Werte sind nicht mit Wettkampfwerten vergleichbar. Weder Körperfettanteil noch Muskelmasse können aus Körpergewicht und Größe abgeleitet werden. Eine schnelle Gewichtszunahme ist nicht automatisch Muskelwachstum.</div>
 </section>`;
}
