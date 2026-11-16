const CACHE='winter-arc-os-v2.4.2';
const ASSETS=["./", "./index.html", "./boot.js?v=2.4.2", "./manifest.webmanifest", "./benchmarks.js?v=2.4.2", "./lexicon.js?v=2.4.2", "./plan73.js?v=2.4.2", "./focus-ui.css?v=2.4.2", "./store.js?v=2.4.2", "./training-tools.js?v=2.4.2", "./charts.js?v=2.4.2", "./library.js?v=2.4.2", "./focus-ui.js?v=2.4.2", "./atlas.js?v=2.4.2", "./app.js?v=2.4.2", "./data.js?v=2.4.2", "./style.css?v=2.4.2", "./strength.js?v=2.4.2", "./icon-180.png", "./icon-192.png", "./icon-512.png"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('winter-arc-os-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.open(CACHE).then(c=>c.match('./index.html'))));return;}
 e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(e.request);if(hit)return hit;return fetch(e.request)}));
});
