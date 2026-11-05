import {GROUPS,estimateMuscles} from './data.js';
import {weekStart,nextDate,isoToday,fmt,displayDate} from './store.js';
export function muscleLoad(workouts,selectedWeek=weekStart(isoToday())){
 const loads=Object.fromEntries(Object.keys(GROUPS).map(g=>[g,{direct:0,indirect:0,exercises:[]} ]));
 const end=nextDate(selectedWeek,7);
 for(const w of workouts||[]){if(w.date<selectedWeek||w.date>=end)continue;
  for(const s of w.sets||[]){for(const [group,credit] of estimateMuscles(s.exerciseId,s.exercise)){
   if(!loads[group])continue;
   if(credit===1)loads[group].direct+=1;else loads[group].indirect+=credit;
   loads[group].exercises.push({name:s.exercise,date:w.date,credit});
  }}
 }
 return loads;
}
const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function fill(muscle,loads,mode){if(mode==='measure')return '#28354b';const n=loads[muscle]?.direct||0;return n===0?'#273144':n<=2?'#445f84':n<=4?'#5586ad':n<=7?'#7eb1d9':'#d0e6ff'}
function piece(d,m,loads,mode){return `<path tabindex="0" role="button" class="muscle" aria-label="${GROUPS[m]} auswählen" data-muscle="${m}" d="${d}" fill="${fill(m,loads,mode)}" stroke="#101826" stroke-width="2"><title>${GROUPS[m]}: ${loads[m]?.direct||0} direkte Sätze</title></path>`}
export function silhouette(loads,mode='muscle',face='front'){
 const front=face==='front';const p=(d,m)=>piece(d,m,loads,mode);
 const outline='<path d="M121 19 Q151 6 181 19 L191 56 Q215 59 233 79 L264 159 L252 181 L240 176 L223 135 L208 192 L192 251 L185 353 L198 455 L175 460 L151 362 L128 362 L105 460 L82 455 L95 353 L88 251 L72 192 L57 135 L40 176 L28 181 L16 159 L47 79 Q66 60 88 56 Z" fill="#1b2839" stroke="#526985" stroke-width="2"/>';
 const common=[p('M79 61 Q57 61 45 81 L37 125 L56 131 L73 96 Z','delts'),p('M191 61 Q213 61 225 81 L233 125 L214 131 L197 96 Z','delts'),p('M43 126 L58 131 L45 180 L29 173 Z','forearms'),p('M227 131 L242 126 L256 173 L240 180 Z','forearms'),p('M98 365 L127 365 L113 446 L88 446 Z','calves'),p('M145 365 L174 365 L185 446 L160 446 Z','calves')];
 const ff=[p('M100 253 L134 255 L128 351 L99 351 Z','quads'),p('M137 255 L171 253 L173 351 L144 351 Z','quads'),p('M82 76 Q115 60 134 84 L133 137 Q107 144 74 125 Z','chest'),p('M136 84 Q155 60 188 76 L196 125 Q163 144 137 137 Z','chest'),p('M73 106 L58 132 L48 158 L65 167 L86 128 Z','biceps'),p('M197 106 L212 132 L222 158 L205 167 L184 128 Z','biceps'),p('M88 150 L183 150 L175 235 L95 235 Z','core')];
 const bb=[p('M118 55 L151 55 L178 82 L150 115 L91 82 Z','traps'),p('M83 97 L132 113 L126 214 L92 201 L72 143 Z','back'),p('M138 113 L187 97 L198 143 L178 201 L144 214 Z','back'),p('M70 110 L54 145 L58 165 L76 155 L86 125 Z','triceps'),p('M200 110 L216 145 L212 165 L194 155 L184 125 Z','triceps'),p('M93 235 L135 238 L128 295 L99 307 Z','glutes'),p('M135 238 L177 235 L171 307 L142 295 Z','glutes'),p('M101 305 L128 309 L125 359 L98 359 Z','hamstrings'),p('M144 309 L171 305 L174 359 L147 359 Z','hamstrings')];
 return `<svg class="atlas-svg" viewBox="0 0 280 476" role="group" aria-label="Interaktiver Muskelatlas ${front?'Vorderseite':'Rückseite'}"><title>Muskelatlas ${front?'vorne':'hinten'}</title>${outline}${[...common,...(front?ff:bb)].join('')}</svg>`;
}
export function atlasCard(state,ui){
 const loads=muscleLoad(state.workouts,ui.week),m=loads[ui.muscle]||{direct:0,indirect:0,exercises:[]};
 const measures={chest:[['chest','Brust']],delts:[['shoulders','Schultern']],traps:[['neck','Hals']],biceps:[['armLeftFlexed','Oberarm links, angespannt'],['armRightFlexed','Oberarm rechts, angespannt'],['armLeftRelaxed','Oberarm links, locker'],['armRightRelaxed','Oberarm rechts, locker']],triceps:[['armLeftFlexed','Oberarm links, angespannt'],['armRightFlexed','Oberarm rechts, angespannt']],back:[['chest','Brustumfang']],core:[['waistNatural','Taille'],['waist','Bauch (Nabelhöhe)']],glutes:[['hips','Hüfte']],quads:[['thighLeft','Oberschenkel links'],['thighRight','Oberschenkel rechts']],hamstrings:[['thighLeft','Oberschenkel links'],['thighRight','Oberschenkel rechts']],calves:[['calfLeft','Wade links'],['calfRight','Wade rechts']],forearms:[['forearmLeft','Unterarm links'],['forearmRight','Unterarm rechts']]};
 const measureRows=(measures[ui.muscle]||[]).map(([key,name])=>{const found=[...state.body].filter(x=>Number(x[key]||(key==='armRightFlexed'?x.arm:0))>0).sort((a,b)=>b.date.localeCompare(a.date))[0];const value=found?Number(found[key]||(key==='armRightFlexed'?found.arm:0)):0;return `<div class="metric-row"><span>${safe(name)}</span><strong>${value?fmt(value)+' cm':'–'}</strong><small>${found?displayDate(found.date):'Keine Messung'}</small></div>`}).join('');
 const exList=[...new Set(m.exercises.map(e=>e.name))].slice(0,6);
 return `<section class="panel atlas-panel"><div class="section-header"><div><span class="eyebrow">BODY INTELLIGENCE</span><h2>Dein Körperatlas</h2></div><span class="tag">${ui.mode==='muscle'?'Trainingsvolumen':'Körpermaße'}</span></div>
 <div class="segmented"><button data-atlas-mode="muscle" class="${ui.mode==='muscle'?'active':''}">Muskeln</button><button data-atlas-mode="measure" class="${ui.mode==='measure'?'active':''}">Umfänge</button></div>
 <div class="segmented"><button data-atlas-face="front" class="${ui.face==='front'?'active':''}">Vorne</button><button data-atlas-face="back" class="${ui.face==='back'?'active':''}">Hinten</button></div>
 ${ui.mode==='muscle'?`<div class="week-nav"><button class="icon-button" data-week="-7" aria-label="Vorherige Woche">‹</button><span>${displayDate(ui.week)} – ${displayDate(nextDate(ui.week,6))}</span><button class="icon-button" data-week="7" aria-label="Nächste Woche">›</button></div>`:''}
 <div class="atlas-layout"><div class="atlas-figure">${silhouette(loads,ui.mode,ui.face)}</div><div class="atlas-detail"><span class="eyebrow">AUSGEWÄHLTER BEREICH</span><h3>${GROUPS[ui.muscle]}</h3>${ui.mode==='muscle'?`<div class="hero-number">${fmt(m.direct,0)}<span> direkte Sätze</span></div><p>${fmt(m.indirect,1)} geschätzte indirekte Satzanteile</p>${exList.length?`<ul class="micro-list">${exList.map(x=>`<li>${safe(x)}</li>`).join('')}</ul>`:'<p>Keine erfassten Sätze.</p>'}`:`<div class="metric-list">${measureRows||'<p>Keine Messpunkte.</p>'}</div>`}</div></div>
 ${ui.mode==='muscle'?'<div class="atlas-legend"><span>0</span><i style="background:#273144"></i><i style="background:#445f84"></i><i style="background:#5586ad"></i><i style="background:#7eb1d9"></i><i style="background:#d0e6ff"></i><span>8+ Sätze</span></div><p class="micro">Farbintensität = dokumentierte direkte Arbeitssätze. Indirekte Sätze sind geschätzt. Keine Messung von Muskelwachstum oder Regeneration.</p>':'<p class="micro">Messungen sind nur so vergleichbar wie ihre Messbedingungen.</p>'}</section>`;
}
