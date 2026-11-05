import {DEFAULT_PLANS} from './data.js';
export const STORAGE_KEY='winterArcOS_v2';
export const LEGACY_KEY='winterArcOS_v1';
export const clone=x=>JSON.parse(JSON.stringify(x));
export function freshState(){return {
 version:2,plans:clone(DEFAULT_PLANS),workouts:[],runs:[],body:[],duty:[],morning:{},draft:null,
 coach:{checkins:{},shifts:{},longPlans:{}},
 settings:{raceDate:'2027-06-06',goalPace:'5:30',raceName:'Halbmarathon',trainPhase:'einstieg',activeProgram:'5.2',goal:'Offseason Mass',heightCm:201},
 meta:{createdAt:new Date().toISOString(),migratedFromLegacy:false}
}}
export function migrate(raw){
 if(!raw||typeof raw!=='object'||![1,2].includes(Number(raw.version)))throw new Error('Nur Backups der Version 1 oder 2 sind kompatibel.');
 if(!Array.isArray(raw.workouts)||!Array.isArray(raw.body)||!Array.isArray(raw.runs)||!raw.plans||!['A','B','C'].every(k=>Array.isArray(raw.plans[k])))throw new Error('Backup unvollständig oder ungültig.');
 const defaults=freshState();
 const clean={...defaults,plans:clone(raw.plans),workouts:clone(raw.workouts),body:clone(raw.body),runs:clone(raw.runs),duty:clone(Array.isArray(raw.duty)?raw.duty:[]),morning:clone(raw.morning||{}),draft:clone(raw.draft||null),coach:{...defaults.coach,...clone(raw.coach||{})},settings:{...defaults.settings,...clone(raw.settings||{})},meta:{...defaults.meta,...clone(raw.meta||{}),migratedFromLegacy:Number(raw.version)===1||!!raw.meta?.migratedFromLegacy}};
 // Keep historical exercise IDs, names, notes and personal entries byte-for-byte as data, never create example sessions.
 if(Number(raw.version)===1)clean.settings.activeProgram='legacy-1.2';
 clean.version=2;
 return clean;
}
export function readState(){
 let stored=null;
 try{stored=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(stored)return {state:migrate(stored),source:'v2'}}catch(e){console.warn('WINTER ARC v2 storage corrupted',e)}
 try{const old=JSON.parse(localStorage.getItem(LEGACY_KEY)||'null');if(old){const state=migrate(old);state.meta.migratedFromLegacy=true;state.meta.migrationDate=new Date().toISOString();localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return {state,source:'v1'}}}catch(e){console.warn('WINTER ARC v1 data could not be migrated',e)}
 return {state:freshState(),source:'new'};
}
export function persist(state){
 try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true}catch(e){alert('Speichern fehlgeschlagen. Speicherplatz und Browser-Einstellungen prüfen. Bitte Backup anlegen.');return false}
}
export function makeBackup(state){return JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2)}
export function isoToday(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
export function localDate(s){const [y,m,d]=String(s).split('-').map(Number);return y&&m&&d?new Date(y,m-1,d):new Date(NaN)}
export function dateISO(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
export function weekStart(d){let x=localDate(d);x.setDate(x.getDate()-(x.getDay()+6)%7);return dateISO(x)}
export function nextDate(iso,delta){const d=localDate(iso);d.setDate(d.getDate()+delta);return dateISO(d)}
export const safeNum=x=>{const n=Number(String(x??'').replace(',','.'));return Number.isFinite(n)?n:NaN};
export const fmt=(n,d=1)=>Number(n).toLocaleString('de-DE',{minimumFractionDigits:d,maximumFractionDigits:d});
export const displayDate=d=>/^\d{4}-\d{2}-\d{2}$/.test(d||'')?`${d.slice(8,10)}.${d.slice(5,7)}.${d.slice(0,4)}`:'–';
export const uniqueId=()=>`${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
export function latestBodyValue(body,key){return [...body].filter(b=>Number(b[key])>0).sort((a,b)=>b.date.localeCompare(a.date))[0]||null}
