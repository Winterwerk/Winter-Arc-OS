/* WINTER ARC OS 2.4 – non-destructive UI enhancement.
 * Keeps app.js, training state and localStorage data unchanged.
 * Existing app renders normally; this module enhances its DOM.
 */
(() => {
  'use strict';
  const FOCUS_KEY = 'winterarc-focus-24';
  const INDEX_KEY = 'winterarc-focus-exercise-24';
  const isFocus = () => sessionStorage.getItem(FOCUS_KEY) === '1';
  const isTraining = () => location.hash.replace('#', '') === 'training';
  const html = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let pending = false;
  let lastRoot = null;

  function sidebar() {
    if (!document.querySelector('.wa-sidebar')) {
      const aside = document.createElement('aside');
      aside.className = 'wa-sidebar';
      aside.id = 'wa-sidebar';
      aside.setAttribute('aria-label', 'Seitenmenü');
      aside.innerHTML = `
        <div class="wa-sidebar-brand"><div><strong>WINTER ARC</strong><small>BODY & STRENGTH OS</small></div><button type="button" data-wa-close-menu aria-label="Menü schließen">×</button></div>
        <nav class="wa-sidebar-items" aria-label="Hauptnavigation">
          <button data-tab="home" type="button"><span>⌂</span> Übersicht</button>
          <button data-tab="training" type="button"><span>▤</span> Training</button>
          <button data-tab="body" type="button"><span>◉</span> Körper</button>
          <button data-tab="analyze" type="button"><span>↗</span> Analyse</button>
          <button data-tab="more" type="button"><span>⚙</span> Mehr & Einstellungen</button>
        </nav>
        <div class="wa-sidebar-foot">WINTER ARC OS · LOCAL FIRST</div>`;
      document.body.appendChild(aside);
      const backdrop = document.createElement('button');
      backdrop.type = 'button';
      backdrop.className = 'wa-sidebar-backdrop';
      backdrop.setAttribute('aria-label', 'Menü schließen');
      backdrop.dataset.waCloseMenu = '';
      document.body.appendChild(backdrop);
    }
    document.querySelectorAll('.wa-sidebar-items [data-tab]').forEach(b => {
      const current = location.hash.replace('#','') || 'home';
      b.classList.toggle('active',b.dataset.tab === current);
      if (b.dataset.tab === current) b.setAttribute('aria-current','page');
      else b.removeAttribute('aria-current');
    });
  }

  function currentExerciseData() {
    const section = [...document.querySelectorAll('#app main section')].find(s=>s.querySelector('article.exercise'));
    if (!section) return null;
    const exercises = [...section.querySelectorAll('article.exercise')];
    if (!exercises.length) return null;
    const selected = Math.max(0, Math.min(exercises.length - 1, Number(sessionStorage.getItem(INDEX_KEY)) || 0));
    const count = exercises.reduce((n,el)=>n+el.querySelectorAll('.set-row:not(.warm) input[data-set-check]').length,0);
    const done = exercises.reduce((n,el)=>n+el.querySelectorAll('.set-row:not(.warm) input[data-set-check]:checked').length,0);
    return {section,exercises,selected,count,done};
  }


  // A conservative, readable target; never writes suggested numbers into the log.
  function nextSetSuggestion(last,name,repRange){
    const m=String(last||'').match(/([0-9]+(?:[.,][0-9]+)?)\s*kg\s*×\s*(\d+)\s*\(RIR\s*(\d+|[–-])\)/i);
    const range=String(repRange||'').match(/(\d+)\s*[–-]\s*(\d+)/);
    if(!m||!range)return null;
    const weight=Number(m[1].replace(',','.')),reps=Number(m[2]),rir=m[3]==='–'||m[3]==='-'?null:Number(m[3]),upper=Number(range[2]),lower=Number(range[1]);
    if(!Number.isFinite(weight)||!weight||!Number.isFinite(reps)||!Number.isFinite(upper)||upper<lower)return null;
    const isMain=/Flachbank-Langhantel|45.?.-Beinpresse|Sitzendes Kabelrudern|Untergriff-Latzug|Hack Squat/i.test(name);
    const add=/Flachbank-Langhantel/i.test(name)?2.5:/45.?.-Beinpresse/i.test(name)?5:/Hack Squat/i.test(name)?2.5:0;
    let line='',reason='';
    if(reps>=upper && rir!==null && rir>=1){
      line=add?`${(weight+add).toLocaleString('de-DE')} kg · ${lower}–${Math.min(lower+2,upper)} Wdh.`:`Nächste verfügbare Gewichtsstufe · ${lower}–${Math.min(lower+2,upper)} Wdh.`;
      reason='Oberer Wiederholungsbereich erreicht. Nur steigern, wenn Technik und Bewegungsumfang vergleichbar bleiben.';
    }else if(reps<lower){
      line=`${weight.toLocaleString('de-DE')} kg · mindestens ${lower} Wdh.`;
      reason='Zuletzt unter dem Zielbereich. Gewicht, Pausen und Erholung überprüfen; gegebenenfalls leichter trainieren.';
    }else if(rir===0){
      line=`${weight.toLocaleString('de-DE')} kg · ${Math.min(reps,upper)} Wdh.`;
      reason='Zuletzt keine Reserve: dieselbe Leistung sauberer bestätigen, nicht automatisch erhöhen.';
    }else{
      line=`${weight.toLocaleString('de-DE')} kg · ${Math.min(upper,reps+1)} Wdh.`;
      reason='Gleiches Gewicht, möglichst eine saubere Wiederholung mehr bei ähnlicher RIR.';
    }
    return {line,reason,kind:isMain?'MAIN LIFT':'DOUBLE PROGRESSION'};
  }

  function decorateTraining(data) {
    const {section,exercises,selected,count,done} = data;
    section.classList.add('wa-focus-section');
    if (section.dataset.focusIndex === String(selected) && section.querySelector('.wa-focus-top')) return;
    section.dataset.focusIndex = String(selected);
    section.querySelectorAll('.wa-focus-added').forEach(node=>node.remove());
    for (let i=0;i<exercises.length;i++) exercises[i].classList.toggle('wa-active-exercise',i===selected);
    const article = exercises[selected];
    const name = article.querySelector('.exercise-head h3')?.textContent?.trim() || 'Aktuelle Übung';
    const focus = article.querySelector('.exercise-info strong')?.textContent?.trim() || 'Zielmuskel gemäß Übungsbeschreibung';
    const cues = [...article.querySelectorAll('.exercise-info li')].slice(0,3).map(x=>x.textContent.trim());
    const alert = article.querySelector('.exercise-info p')?.textContent?.trim() || '';
    const last = article.querySelector('.exercise-head small')?.textContent?.trim() || '';
    const range = article.querySelector('.exercise-head .tag')?.textContent?.trim() || '';
    const suggestion = /Farmer.s Holds/i.test(name)?null:nextSetSuggestion(last,name,range);
    const root = document.createElement('div');
    root.className = 'wa-focus-added wa-focus-top';
    root.innerHTML = `<div class="wa-focus-heading"><button type="button" class="wa-focus-icon" data-wa-menu aria-label="Seitenmenü öffnen">☰</button><strong>WINTER ARC</strong><button type="button" class="wa-focus-exit" data-wa-exit-focus>Übersicht</button></div>
      <div class="wa-focus-progress-meta"><span>ÜBUNG ${selected+1} / ${exercises.length}</span><span>${done} / ${count} SÄTZE</span></div>
      <div class="wa-focus-progress-bar"><span style="width:${count?Math.min(100,Math.round(done/count*100)):0}%"></span></div>
      <div class="wa-focus-kicker">JETZT TRAINIEREN</div><h1 class="wa-focus-title">${html(name)}</h1>
      <div class="wa-focus-target"><span>ZIELMUSKEL</span><strong>${html(focus)}</strong></div>
      ${last?`<div class="wa-focus-last">Letztes Training: ${html(last)}</div>`:''}
      <div class="wa-focus-tips"><strong>ⓘ Ausführung & Muskelgefühl</strong><ul>${cues.length?cues.map(t=>`<li>${html(t)}</li>`).join(''):'<li>Gewicht kontrollieren und die Bewegung sauber ausführen.</li>'}</ul>${alert?`<small>${html(alert)}</small>`:''}</div>
      ${suggestion?`<div class="wa-focus-suggestion"><span>${html(suggestion.kind)} · UNVERBINDLICHER VORSCHLAG</span><strong>${html(suggestion.line)}</strong><small>${html(suggestion.reason)}</small></div>`:''}`;
    section.prepend(root);
    const footer = document.createElement('div');
    footer.className='wa-focus-added wa-focus-bottom';
    const entries = exercises.map((ex,i)=>{
      const nm=ex.querySelector('.exercise-head h3')?.textContent?.trim()||`Übung ${i+1}`;
      const total=ex.querySelectorAll('.set-row:not(.warm) input[data-set-check]').length;
      const ok=ex.querySelectorAll('.set-row:not(.warm) input[data-set-check]:checked').length;
      return `<button type="button" data-wa-go="${i}" class="wa-focus-queue-item ${i===selected?'active':''}"><span class="wa-queue-n">${String(i+1).padStart(2,'0')}</span><span class="wa-queue-name">${html(nm)}</span><span class="wa-queue-progress">${ok}/${total}</span></button>`;
    });
    footer.innerHTML=`<div class="wa-focus-paging"><button type="button" data-wa-prev ${selected===0?'disabled':''}>← Zurück</button><button type="button" data-wa-toggle-queue>☷ Übungen</button><button type="button" class="wa-focus-next" data-wa-next ${selected===exercises.length-1?'disabled':''}>Weiter →</button></div>
    <div class="wa-focus-queue" id="wa-focus-queue" hidden><div class="wa-queue-header">TRAININGSABLAUF <span>${exercises.length} Übungen</span></div>${entries.join('')}</div>
    <div class="wa-focus-finish"><button type="button" data-wa-finish>Training abschließen</button><p>Nur abgehakte Arbeitssätze werden gespeichert. Die Satzwerte bleiben bei einem Seitenwechsel erhalten.</p></div>`;
    section.appendChild(footer);
    const savedOpen = sessionStorage.getItem('wa-queue-open')==='1';
    footer.querySelector('.wa-focus-queue').hidden=!savedOpen;
  }

  function enhance() {
    sidebar();
    const app = document.getElementById('app');
    const topbar = app?.querySelector('.topbar');
    if (topbar && !topbar.querySelector('[data-wa-menu]')) {
      const btn = document.createElement('button');
      btn.type='button';btn.dataset.waMenu='';btn.className='wa-top-menu';
      btn.textContent='☰';btn.setAttribute('aria-label','Menü öffnen');
      topbar.prepend(btn);
    }
    const homeButton = app?.querySelector('.dash-hero [data-start-day]');
    if (homeButton && homeButton.textContent !== 'Workout starten →') homeButton.textContent = 'Workout starten →';
    const training = isTraining();
    if(!training || !isFocus()){
      app?.querySelectorAll('.wa-focus-added').forEach(n=>n.remove());
      app?.querySelectorAll('.wa-focus-section').forEach(n=>{n.classList.remove('wa-focus-section');delete n.dataset.focusIndex;});
      app?.querySelectorAll('.wa-active-exercise').forEach(n=>n.classList.remove('wa-active-exercise'));
    }
    document.body.classList.toggle('wa-focus',training && isFocus());
    const trainingContainer = training && app?.querySelector('.container');
    if (trainingContainer && !isFocus() && !trainingContainer.querySelector('[data-wa-start-focus]')) {
      const entry = document.createElement('div');
      entry.className='wa-start-area';
      entry.innerHTML='<button type="button" class="primary wa-start-button" data-wa-start-focus>▶ Workout starten</button><p>Im Fokusmodus siehst du jeweils eine Übung. Die komplette Reihenfolge bleibt über „Übungen“ erreichbar.</p>';
      trainingContainer.prepend(entry);
    }
    if (training && isFocus()) {
      const data = currentExerciseData();
      if (data) decorateTraining(data);
    }
  }

  function schedule() {
    if (pending) return;
    pending=true;
    requestAnimationFrame(()=>{pending=false;observer.disconnect();try{enhance();}finally{if(app)observer.observe(app,{childList:true,subtree:true});}});
  }

  document.addEventListener('click', event=>{
    const target=event.target.closest('button');
    if (!target) return;
    if (target.hasAttribute('data-wa-menu')) {
      event.preventDefault();event.stopPropagation();document.body.classList.add('wa-sidebar-open');return;
    }
    if (target.hasAttribute('data-wa-close-menu')) {
      event.preventDefault();event.stopPropagation();document.body.classList.remove('wa-sidebar-open');return;
    }
    if (target.closest('.wa-sidebar-items')) {
      document.body.classList.remove('wa-sidebar-open');
      // Let the original app.js handle data-tab, preserving its navigation.
      return;
    }
    if (target.matches('[data-start-day]')) {
      sessionStorage.setItem(FOCUS_KEY,'1');sessionStorage.setItem(INDEX_KEY,'0');sessionStorage.setItem('wa-queue-open','0');return;
    }
    if (target.hasAttribute('data-wa-start-focus')) {
      event.preventDefault();event.stopPropagation();sessionStorage.setItem(FOCUS_KEY,'1');sessionStorage.setItem(INDEX_KEY,'0');schedule();return;
    }
    if (target.hasAttribute('data-wa-exit-focus')) {
      event.preventDefault();event.stopPropagation();sessionStorage.setItem(FOCUS_KEY,'0');schedule();return;
    }
    if (target.hasAttribute('data-wa-toggle-queue')) {
      event.preventDefault();event.stopPropagation();
      const q=document.getElementById('wa-focus-queue');if(q){q.hidden=!q.hidden;sessionStorage.setItem('wa-queue-open',q.hidden?'0':'1');}return;
    }
    if (target.hasAttribute('data-wa-prev')||target.hasAttribute('data-wa-next')||target.hasAttribute('data-wa-go')) {
      event.preventDefault();event.stopPropagation();const data=currentExerciseData();if(!data)return;
      const index=target.hasAttribute('data-wa-prev')?data.selected-1:target.hasAttribute('data-wa-next')?data.selected+1:Number(target.dataset.waGo);
      if(index<0||index>=data.exercises.length)return;
      sessionStorage.setItem(INDEX_KEY,String(index));
      if(target.hasAttribute('data-wa-go'))sessionStorage.setItem('wa-queue-open','0');
      // Clear the decoration only; the original app's controls and values remain intact.
      data.section.dataset.focusIndex='';
      schedule();window.scrollTo({top:0,behavior:'instant'});return;
    }
    if (target.hasAttribute('data-wa-finish')) {
      event.preventDefault();event.stopPropagation();document.getElementById('save-workout')?.click();return;
    }
  },true);

  document.addEventListener('keydown', event=>{
    if(event.key==='Escape')document.body.classList.remove('wa-sidebar-open');
  });
  const observer=new MutationObserver(schedule);
  const app=document.getElementById('app');
  if(app)observer.observe(app,{childList:true,subtree:true});
  window.addEventListener('hashchange',schedule);
  schedule();
})();
