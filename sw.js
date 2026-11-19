const PREFIX='winterwerk-'+new URL(self.registration.scope).pathname+'-';
const CACHE=PREFIX+'3.0.0';
const ASSETS=['./','./index.html','./manifest.webmanifest','./brand-logo.png','./icon-180.png','./icon-192.png','./icon-512.png',...['boot.js','app.js','store.js','data.js','atlas.js','charts.js','lexicon.js','strength.js','benchmarks.js','library.js','training-tools.js','plan73.js','plan74.js','ww-model.js','focus-ui.js','style.css','focus-ui.css','ww.css'].map(x=>'./'+x+'?v=3.0.0')];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting()});
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const u=new URL(event.request.url);if(event.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 event.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(event.request);if(hit)return hit;try{return await fetch(event.request)}catch(e){if(event.request.mode==='navigate')return c.match('./index.html');throw e}}));});
