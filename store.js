import {createProgram74,PROGRAM_74_NAME,PROGRAM_74_LABELS} from './plan74.js?v=3.0.0';
import {DEFAULT_PLANS} from './data.js?v=3.0.0';
export const STORAGE_KEY='winterwerk_koerperschmiede_v3';
export const LEGACY_KEY='winterArcOS_v1';
export const clone=x=>JSON.parse(JSON.stringify(x));
export function freshState(){return {
 version:3,plans:createProgram74(),schedule:[],cycles:[],sleep:[],shiftEntries:[],supportDrafts:[],workouts:[],runs:[],body:[],duty:[],morning:{},draft:null,strengthEntries:[],restTimer:null,exerciseNotes:{},
 coach:{checkins:{},shifts:{},longPlans:{}},
 settings:{raceDate:'',goalPace:'5:30',raceName:'Halbmarathon',theme:'schmiede',onboarded:false,shiftMode:false,cycleMode:false,weeklyTarget:3,trainPhase:'aufbau',activeProgram:PROGRAM_74_NAME,programLabels:{...PROGRAM_74_LABELS},goal:'Offseason Mass',heightCm:null,autoRest:true,restSeconds:150,exerciseRest:{}},
 meta:{createdAt:new Date().toISOString(),migratedFromLegacy:false}
}}
export function migrate(raw){
 if(!raw||typeof raw!=='object'||![1,2,3].includes(Number(raw.version)))throw new Error('Nur Backups der Version 1, 2 oder 3 sind kompatibel.');
 if(!Array.isArray(raw.workouts)||!Array.isArray(raw.body)||!Array.isArray(raw.runs)||!raw.plans||!Object.keys(raw.plans).length||Object.keys(raw.plans).some(k=>!/^([A-Z]|[A-Z][0-9]+)$/.test(k)||!Array.isArray(raw.plans[k])))throw new Error('Backup unvollständig oder ungültig.');
 const defaults=freshState();
 const clean={...defaults,plans:clone(raw.plans),workouts:clone(raw.workouts),body:clone(raw.body),runs:clone(raw.runs),duty:clone(Array.isArray(raw.duty)?raw.duty:[]),morning:clone(raw.morning||{}),draft:clone(raw.draft||null),strengthEntries:clone(Array.isArray(raw.strengthEntries)?raw.strengthEntries:[]),restTimer:clone(raw.restTimer||null),exerciseNotes:clone(raw.exerciseNotes||{}),coach:{...defaults.coach,...clone(raw.coach||{})},settings:{...defaults.settings,...clone(raw.settings||{})},meta:{...defaults.meta,...clone(raw.meta||{}),migratedFromLegacy:Number(raw.version)===1||!!raw.meta?.migratedFromLegacy}};
 // Keep historical exercise IDs, names, notes and personal entries byte-for-byte as data, never create example sessions.
 if(Number(raw.version)===1)clean.settings.activeProgram='legacy-1.2';
 clean.settings.exerciseRest=clean.settings.exerciseRest&&typeof clean.settings.exerciseRest==='object'?clean.settings.exerciseRest:{};
 for(const key of ['schedule','cycles','sleep','shiftEntries','supportDrafts'])clean[key]=clone(Array.isArray(raw[key])?raw[key]:[]);
 clean.version=3;
 clean.meta.revision=Number(raw.meta?.revision)||0;
 if(Number(raw.version)<3){clean.settings.onboarded=false;clean.settings.activeProgram=raw.settings?.activeProgram||'Übernommener Plan';clean.settings.programLabels=clone(raw.settings?.programLabels||{});}
 return clean;
}
let loadedRevision=0;
export function readState(){
 for(const key of [STORAGE_KEY,'winterArcOS_v2',LEGACY_KEY]){
  const text=localStorage.getItem(key);if(text===null)continue;
  let parsed;try{parsed=JSON.parse(text)}catch{throw new Error('Gespeicherte Daten sind beschädigt. Bitte zuerst die Rohdaten sichern; es wird nichts überschrieben.')}
  const state=migrate(parsed);loadedRevision=key===STORAGE_KEY?state.meta.revision:0;
  state.meta.revision=loadedRevision;
  return {state,source:key};
 }
 loadedRevision=0;return {state:freshState(),source:'new'};
}
export function persist(state){
 const text=localStorage.getItem(STORAGE_KEY);let disk;
 try{disk=text?JSON.parse(text):null}catch{throw new Error('Daten beschädigt. Bitte Rohdaten sichern und neu laden.')}
 if((disk?.meta?.revision||0)!==loadedRevision)throw new Error('Die Daten wurden in einem anderen Fenster geändert. Bitte diese Seite neu laden.');
 const next=clone(state);next.meta.revision=loadedRevision+1;
 try{localStorage.setItem(STORAGE_KEY,JSON.stringify(next))}catch{throw new Error('Speichern fehlgeschlagen. Bitte Backup exportieren und Speicherplatz prüfen.')}
 loadedRevision=next.meta.revision;state.meta.revision=loadedRevision;return true;
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
