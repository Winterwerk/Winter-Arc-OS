(() => {
  let started=false;
  function failed(error) {
    if(started)return;
    let box=document.getElementById('startup-error');
    if(!box){
      box=document.createElement('section');box.id='startup-error';box.style.cssText='padding:24px;max-width:640px;margin:auto';
      box.innerHTML='<h2>Die App konnte nicht starten</h2><p>Deine gespeicherten Daten werden nicht gelöscht. Bitte sichere sie und sende die Fehlermeldung weiter.</p><pre style="white-space:pre-wrap;overflow-wrap:anywhere"></pre><button id="startup-export">Lokale Daten sichern</button> <button id="startup-retry">Erneut laden</button>';
      document.body.appendChild(box);
      box.querySelector('#startup-retry').onclick=()=>location.reload();
      box.querySelector('#startup-export').onclick=()=>{
        try{const data={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/winter.?arc|winterwerk/i.test(k))data[k]=localStorage.getItem(k)}
          const url=URL.createObjectURL(new Blob([JSON.stringify({format:'winterarc-raw-recovery',data},null,2)],{type:'application/json'}));
          const a=document.createElement('a');a.href=url;a.download='winterarc-rohdaten-sicherung.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
        }catch(e){box.querySelector('pre').textContent='Datensicherung: '+e.message}
      };
    }
    box.querySelector('pre').textContent='Version 3.0.0 · '+String(error?.message||error);
  }
  if('serviceWorker' in navigator){
    let requested=false;
    navigator.serviceWorker.addEventListener('controllerchange',()=>{if(requested)location.reload()});
    navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(r=>{
      const offer=()=>{if(!r.waiting||document.getElementById('ww-update'))return;const b=document.createElement('section');b.id='ww-update';b.className='ww-update';b.innerHTML='<p>Eine neue Version ist bereit. Deine gespeicherten Eingaben bleiben erhalten.</p><button>Update laden</button>';b.querySelector('button').onclick=()=>{requested=true;r.waiting?.postMessage({type:'ACTIVATE_UPDATE'})};document.body.append(b)};
      offer();r.addEventListener('updatefound',()=>r.installing?.addEventListener('statechange',offer));r.update();
    }).catch(console.warn);
  }
  const timeout=setTimeout(()=>failed('Start dauert ungewöhnlich lange. Verbindung prüfen und erneut laden.'),15000);
  import('./app.js?v=3.0.0').then(()=>{
    started=true;clearTimeout(timeout);document.getElementById('startup-error')?.remove();
    return import('./focus-ui.js?v=3.0.0').catch(console.warn);
  }).catch(e=>{clearTimeout(timeout);failed(e)});
})();
