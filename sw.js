/* WINTER ARC OS v2.1.0 – static assets only; private user data never enters Cache Storage */
const CACHE='winter-arc-os-v2.1.0';
const ASSETS=['./','./index.html','./style.css','./app.js','./data.js','./store.js','./atlas.js','./charts.js','./benchmarks.js','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('winter-arc-os-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 // No private JSON is requested or cached by the application. Network-first for navigation to receive updates.
 if(event.request.mode==='navigate'){
   event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy)).catch(()=>{})}return response}).catch(()=>caches.match('./index.html')));return;
 }
 event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{if(response.ok&&ASSETS.some(path=>url.pathname.endsWith(path.replace('./','')))){const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy)).catch(()=>{})}return response})));
});
