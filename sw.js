/* WINTER ARC OS 2.4.1 UI – static assets only; private user data never enters Cache Storage */
const CACHE='winter-arc-os-v2.4.1';
const ASSETS=['./','./index.html','./style.css','./focus-ui.css','./app.js','./focus-ui.js','./plan73.js','./data.js','./store.js','./atlas.js','./charts.js','./benchmarks.js','./lexicon.js','./strength.js','./library.js','./training-tools.js','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('winter-arc-os-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){
   event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy)).catch(()=>{})}return response}).catch(()=>caches.match('./index.html')));return;
 }
 event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{if(response.ok&&ASSETS.some(path=>url.pathname.endsWith(path.replace('./','')))){const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy)).catch(()=>{})}return response})));
});
