import {localDate,displayDate,fmt} from './store.js';
export function lineChart(entries,unit='kg',options={}){
 const rows=entries.map(x=>({date:x.date||x.x,value:Number(x.value??x.y)})).filter(x=>Number.isFinite(x.value)&&!Number.isNaN(localDate(x.date).getTime())).sort((a,b)=>a.date.localeCompare(b.date));
 if(!rows.length)return '<div class="empty">Für diesen Verlauf liegen noch keine Messwerte vor.</div>';
 const W=760,H=265,L=50,R=23,T=26,B=39,ys=rows.map(x=>x.value);
 const low=Math.min(...ys),high=Math.max(...ys),margin=Math.max(.5,(high-low)*.22),min=low-margin,max=high+margin;
 const times=rows.map(x=>localDate(x.date).getTime()),lo=times[0],hi=times[times.length-1];
 // Always plot timestamps linearly; a one-day-only series is centered.
 const xx=n=>hi===lo?W/2:L+(n-lo)/(hi-lo)*(W-L-R);
 const yy=v=>T+(max-v)/(max-min)*(H-T-B);
 const points=rows.map((r,i)=>`${xx(times[i]).toFixed(1)},${yy(r.value).toFixed(1)}`).join(' ');
 const ticks=Array.from({length:4},(_,i)=>min+(max-min)*i/3);
 const grids=ticks.map(v=>`<line x1="${L}" x2="${W-R}" y1="${yy(v).toFixed(1)}" y2="${yy(v).toFixed(1)}" stroke="var(--line)" stroke-dasharray="3 6"/><text x="${L-8}" y="${(yy(v)+4).toFixed(1)}" text-anchor="end" class="plot-label">${fmt(v,1)}</text>`).join('');
 const dots=rows.map((r,i)=>`<circle cx="${xx(times[i]).toFixed(1)}" cy="${yy(r.value).toFixed(1)}" r="${i===rows.length-1?5.5:3.5}" fill="var(--accent)" stroke="var(--panel)" stroke-width="2"><title>${displayDate(r.date)} · ${fmt(r.value)} ${unit}</title></circle>`).join('');
 let trend='';
 if(options.trend&&rows.length>=3){const smooth=rows.map(r=>{const limit=localDate(r.date).getTime()-6*86400000;const near=rows.filter(x=>{const t=localDate(x.date).getTime();return t>=limit&&t<=localDate(r.date).getTime()});return {date:r.date,value:near.reduce((a,x)=>a+x.value,0)/near.length}});trend=`<polyline points="${smooth.map((r,i)=>`${xx(times[i]).toFixed(1)},${yy(r.value).toFixed(1)}`).join(' ')}" fill="none" stroke="var(--teal)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 4"/>`}
 return `<div class="plot-wrap"><svg class="plot" viewBox="0 0 ${W} ${H}" role="img" aria-label="${unit}-Zeitverlauf mit ${rows.length} Datenpunkten"><title>${unit}-Zeitverlauf</title>${grids}${rows.length>1?`<polyline fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${points}"/>`:''}${trend}${dots}<text x="${L}" y="${H-7}" class="plot-label">${displayDate(rows[0].date)}</text><text x="${W-R}" text-anchor="end" y="${H-7}" class="plot-label">${displayDate(rows[rows.length-1].date)}</text></svg><div class="plot-foot"><span>Start <strong>${fmt(rows[0].value)} ${unit}</strong></span><span>Zuletzt <strong>${fmt(rows[rows.length-1].value)} ${unit}</strong></span></div>${options.trend&&rows.length>=3?'<p class="micro">Gestrichelte Linie: Durchschnitt der Messungen der vergangenen 7 Kalendertage (nicht ausreichend für eine verlässliche Körperkompositionsanalyse).</p>':''}</div>`;
}
export function barChart(items){if(!items.length)return '<div class="empty">Keine Daten.</div>';
 const max=Math.max(...items.map(x=>Number(x.value)||0),1);
 return `<div class="bars">${items.map(i=>`<div class="bar-row"><span>${i.label}</span><div class="bar-track"><div style="width:${Math.min(100,(i.value/max)*100)}%"></div></div><b>${fmt(i.value,1)}</b></div>`).join('')}</div>`;
}
