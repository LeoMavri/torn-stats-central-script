// ==UserScript==
// @name         TSC Companion - Next
// @namespace    TSC
// @version      next-13
// @author       mavri [2402357]
// @description  A very early version of the new TSC Companion. Special thanks to Kwack [2190604]
// @copyright    2024, diicot.cc
// @icon         https://i.imgur.com/8eydsOA.png
// @updateURL    https://github.com/LeoMavri/TSC-Companion/raw/next/dist/tsc-companion.user.js
// @match        https://www.torn.com/profiles.php?*
// @match        https://www.torn.com/factions.php*
// @match        https://www.torn.com/joblist.php*
// @connect      api.torn.com
// @connect      tsc.diicot.cc
// @grant        GM.xmlHttpRequest
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const r=document.createElement("style");r.textContent=o,document.head.append(r)})(" body{--tsc-bg-color: #f0f0f0;--tsc-alt-bg-color: #fff;--tsc-border-color: #ccc;--tsc-input-color: #ccc;--tsc-text-color: #000;--tsc-hover-color: #ddd}body.dark-mode{--tsc-bg-color: #333;--tsc-alt-bg-color: #383838;--tsc-border-color: #444;--tsc-input-color: #504f4f;--tsc-text-color: #ccc;--tsc-hover-color: #555}table.tsc-stat-table{width:100%;border-collapse:collapse;color:var(--tsc-text-color);background-color:var(--tsc-bg-color)}table.tsc-stat-table th,table.tsc-stat-table td{border:1px solid var(--tsc-border-color);color:var(--tsc-text-color);padding:4px;text-align:center}table.tsc-stat-table th{background-color:var(--tsc-bg-color);color:var(--tsc-text-color)}.tsc-faction-spy{background-color:var(--tsc-bg-color);color:var(--tsc-text-color);border:1px solid var(--tsc-border-color);border-radius:5px;padding:3px 5px;cursor:pointer;margin-left:auto;margin-right:2px}.tsc-chain-spy{background-color:var(--tsc-bg-color);color:var(--tsc-text-color);border:1px solid var(--tsc-border-color);font-size:10px;display:flex;vertical-align:middle;justify-content:center;align-items:center;width:200%;height:15px;border-radius:5px;padding:3px;margin-left:2px;cursor:pointer}.respect{margin-left:32px!important}.attack-number{min-width:45px!important}.tsc-company-spy{display:inline;background-color:var(--tsc-bg-color);color:var(--tsc-text-color);border:1px solid var(--tsc-border-color);border-radius:5px;padding:3px 5px;cursor:pointer;margin-left:5px}.tsc-faction-war{display:flex;background-color:var(--tsc-alt-bg-color);color:var(--tsc-text-color);border:1px solid var(--tsc-border-color);padding:3px;cursor:pointer;height:15px;vertical-align:middle;justify-content:space-around;align-items:center}.tsc-accordion{background-color:var(--tsc-bg-color);border:1px solid var(--tsc-border-color);border-radius:5px;margin:10px 0;padding:10px}.tsc-header{display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:1.2em;margin-top:10px;margin-bottom:10px}.tsc-header-username{font-style:italic;display:inline}.tsc-setting-entry{display:flex;align-items:center;gap:5px;margin-top:10px;margin-bottom:5px}.tsc-key-input{width:120px;padding-left:5px;background-color:var(--tsc-input-color);color:var(--tsc-text-color)}.tsc-button{background-color:var(--tsc-bg-color);color:var(--tsc-text-color);border:1px solid var(--tsc-border-color);transition:background-color .5s;border-radius:5px;padding:5px 10px;cursor:pointer}.tsc-button:hover{background-color:var(--tsc-hover-color);transition:background-color .5s}.tsc-blur{filter:blur(3px);transition:filter 2s}.tsc-blur:focus,.tsc-blur:active{transition-duration:.5s;filter:blur(0)} ");

(function () {
	'use strict';

	var fe=Object.defineProperty;var pe=(o,t,e)=>t in o?fe(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var k=(o,t,e)=>(pe(o,typeof t!="symbol"?t+"":t,e),e);class he{constructor(t){k(this,"storageKey");this.storageKey=t;}get(t){return localStorage.getItem(`${this.storageKey}-${t}`)}set(t,e){localStorage.setItem(`${this.storageKey}-${t}`,e);}getToggle(t){return this.get(t)==="true"}getJSON(t){const e=this.get(t);return e===null?null:JSON.parse(e)}setJSON(t,e){this.set(t,JSON.stringify(e));}fullClear(){let t=0;for(let e=0;e<localStorage.length;e++){const s=localStorage.key(e);s!=null&&s.startsWith(this.storageKey)&&(localStorage.removeItem(s),++t);}return t}spyClear(){let t=0;for(let e=0;e<localStorage.length;e++){const s=localStorage.key(e);s!=null&&s.startsWith(`${this.storageKey}-spy`)&&(localStorage.removeItem(s),++t);}return t}}const d=new he("kwack.mavri.tsc.rocks"),B={Colours:{Info:"#05668D",Warn:"#EDDEA4",Error:"#ff0000",Debug:"#5C415D"}},ge="###PDA-APIKEY###",j=ge.includes("PDA-APIKEY")===!1;class c{static info(t,...e){let s="%c",n=`color: ${B.Colours.Info}`;j&&(e=e.map(a=>JSON.stringify(a)),s="",n=""),console.info(`${s}[TSC Companion] ${t}`,n,...e);}static warn(t,...e){let s="%c",n=`color: ${B.Colours.Warn}`;j&&(e=e.map(a=>JSON.stringify(a)),s="",n=""),console.log(`${s}[TSC Companion] ${t}`,n,...e);}static error(t,...e){let s="%c",n=`color: ${B.Colours.Error}`;j&&(e=e.map(a=>JSON.stringify(a)),s="",n=""),console.error(`${s}[TSC Companion] ${t}`,n,...e);}static debug(t,...e){if(!d.getToggle("debug-logs"))return;let s="%c",n=`color: ${B.Colours.Debug}`;j&&(e=e.map(a=>JSON.stringify(a)),s="",n=""),console.log(`${s}[TSC Companion] ${t}`,n,...e);}}const ce=12*60*60*1e3;function H(o){const t=d.getJSON(`spy-${o}`);if(t){if(t.insertedAt&&new Date().getTime()-new Date(t.insertedAt).getTime()<ce)return c.debug("Spy cache still valid"),Promise.resolve(t);c.debug("Spy cache expired, fetching new data"),d.setJSON(`spy-${o}`,null);}return new Promise((e,s)=>{(GM.xmlHttpRequest??GM.xmlhttpRequest)({method:"POST",url:"https://tsc.diicot.cc/stats/update",timeout:15e3,headers:{Authorization:"10000000-6000-0000-0009-000000000001","x-requested-with":"XMLHttpRequest","Content-Type":"application/json"},data:JSON.stringify({apiKey:d.get("tsc-key")??"",userId:o}),onload(a){const r=JSON.parse(a.responseText);!("error"in r)&&r.success&&d.setJSON(`spy-${o}`,{...r,insertedAt:new Date().getTime()}),e(r);},onerror(a){c.debug("Failed to fetch spy: ",a),e({error:!0,message:`Failed to fetch spy: ${a.statusText}`});},onabort(){e({error:!0,message:"Request aborted"});},ontimeout(){e({error:!0,message:"Request timed out"});}});})}async function me(){if(d.get("tsc-key")===null)return {error:!0,message:"API Key not set"};const o=d.getJSON("user-data");if(o){if(o.insertedAt&&new Date().getTime()-new Date(o.insertedAt).getTime()<ce)return c.debug("User data cache still valid"),o;c.debug("User data cache expired, fetching new data"),d.setJSON("user-data",null);}const t=await fetch(`https://api.torn.com/user/?selections=basic&key=${d.get("tsc-key")}&comment=TSC-Next`);if(!t.ok)return {error:!0,message:t.statusText};const e=await t.json();return e.error?{error:!0,message:e.error.error}:(d.setJSON("user-data",{...e,insertedAt:new Date().getTime()}),e)}function D(o,t){return new Promise((e,s)=>{let n;if(document.querySelectorAll(o).length)return e(document.querySelector(o));const a=new MutationObserver(()=>{if(document.querySelectorAll(o).length)return a.disconnect(),n!=null&&clearTimeout(n),e(document.querySelector(o))});a.observe(document.body,{childList:!0,subtree:!0}),t&&(n=setTimeout(()=>{a.disconnect(),e(null);},t));})}function E(o,t=2){return Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:t,minimumFractionDigits:t}).format(o)}function G(o){const{estimate:t,statInterval:e}=o.spy;let s=E(t.stats,1),n=`Estimate: ${E(t.stats,2)}`;return e!=null&&e.battleScore&&(s=`${E(BigInt(e.min),1)} - ${E(BigInt(e.max),1)}`,n+=`<br>Interval: ${E(BigInt(e.min),2)} - ${E(BigInt(e.max),2)}<br>Battle Score: ${E(e.battleScore,2)}`),{spyText:s,tooltipText:n}}function ye(o){const{estimate:t,statInterval:e}=o.spy;let s="",n=`Estimate: ${E(t.stats)}`,a=`Estimate: ${new Date(t.lastUpdated).toLocaleDateString()}`;return e!=null&&e.battleScore&&(s=`${E(BigInt(e.min))} - ${E(BigInt(e.max))} / FF: ${e.fairFight}`,a+=`<br>Interval: ${new Date(e.lastUpdated).toLocaleDateString()}`),{longTextInterval:s,longTextEstimate:n,toolTipText:a}}class F{constructor({name:t,description:e,shouldRun:s,start:n}){k(this,"name");k(this,"description");k(this,"shouldRun");k(this,"start");this.name=t,this.description=e,this.shouldRun=s,this.start=n;}}const $e=".empty-block",be=new F({name:"Profile Page",description:"Shows a user's spy on their profile page",shouldRun:async function(){return d.getToggle(this.name)&&window.location.pathname==="/profiles.php"},start:async function(){const o=await D($e,15e3);if(o===null){c.warn(`${this.name}: Could not find the empty block on the profile page`);return}const t=window.location.search.split("XID=")[1],e=await H(t);if("error"in e||e.success!==!0){c.error(`${this.name}: Failed to fetch spy`,e);return}const{estimate:s,statInterval:n}=e.spy;$(o).append($("<table>").addClass("tsc-stat-table").attr("title",`Inteval: ${n!=null&&n.lastUpdated?new Date(n.lastUpdated).toLocaleString():"N/A"}<br>Estimate: ${new Date(s.lastUpdated).toLocaleString()}<br>Cache: ${new Date(e.insertedAt).toLocaleString()}`).append($("<tr>").append($("<th>").text("Estimated Stats")).append($("<th>").text("Min")).append($("<th>").text("Max")).append($("<th>").text("Battle Score")).append($("<th>").text("Fair Fight"))).append($("<tr>").append($("<td>").text(E(BigInt(s.stats)))).append($("<td>").text(n!=null&&n.battleScore?E(BigInt(n.min)):"N/A")).append($("<td>").text(n!=null&&n.battleScore?E(BigInt(n.max)):"N/A")).append($("<td>").text(n!=null&&n.battleScore?E(n.battleScore):"N/A")).append($("<td>").text(n!=null&&n.battleScore?n.fairFight:"N/A"))));}}),we=".faction-info-wrap.restyle.another-faction .table-body > li:nth-child(1)",Ee='[class*="userInfoBox"]',xe='a[href^="/profiles.php?XID="]',Se=new F({name:"Faction - Normal",description:"Shows a list of spies on the faction page",shouldRun:async function(){return d.getToggle(this.name)&&window.location.href.includes("factions.php?step=profile")},start:async function(){const o=await D(we,15e3);if(o===null){c.warn(`${this.name}: Failed to find element to append to.`);return}const t=$(o).parent()[0];$(t).children("li").each((e,s)=>{const n=$(s).find(Ee)[0];//! This is a bit of a hack, but it works for now
	if($(n).css("width","169px"),$(n).css("overflow","hidden"),$(n).css("text-overflow","ellipsis"),n===void 0){c.debug(`${this.name}: Failed to find the player's profile box.`,s);return}const a=$(n).find(xe)[0];if(a===void 0){c.debug(`${this.name}: Failed to find user's ID`,n);return}const r=a.href.split("XID=")[1];H(r).then(l=>{if("error"in l||l.success!==!0){c.warn(`${this.name}: Failed to find spy for ${r}`,l);return}const{spyText:u,tooltipText:m}=G(l);$(n).after($("<div>").addClass("tsc-faction-spy").text(u).attr("title",m));});});}}),q='[class^="warListItem"][class*="first-in-row"]',Z='[class^="chain-attacks-list"]',Te='[class^="honorWrap"]',Ce=new F({name:"Faction - Chain",description:"Shows spies on the chain page",shouldRun:async function(){return !d.getToggle(this.name)||!window.location.href.includes("factions.php?step=your")?!1:await D(q)!==null},start:async function(){let o=null;const t=document.querySelector(q),e=new MutationObserver(async s=>{if(s.length===0)return;const n=document.querySelector(q);if(!(n!=null&&n.classList.contains("act")))return;c.debug(`${this.name}: Chain is active`),o!==null&&(o.disconnect(),o=null);const a=await D(Z,15e3);if(!a){c.debug(`${this.name}: Could not find attacks list (element did not show up in time)`);return}const r=async()=>{$(`${Z} li`).each(function(l,u){const m=$(u).find(Te);for(let g=0;g<=1;g++){const x=m[g];if($(x).parent().find(".tsc-chain-spy").length>0)continue;const f=$(x).find("a").attr("href");if(!f){c.warn("Faction - Chain: Failed to find ID.");return}const b=f.split("XID=")[1];H(b).then(S=>{if("error"in S||S.success!==!0){c.warn(`Faction - Chain: Failed to find spy for ${b}`,S);return}const{spyText:i,tooltipText:v}=G(S);$(x).append($("<div>").addClass("tsc-chain-spy").text(i).attr("title",v));});}});};o=new MutationObserver(async l=>{let u=!1;$(`${q} li`).each(function(m,g){$(g).find(".tsc-chain-spy").length===0&&u===!1&&(u=!0,r());});}),await r(),o.observe(a,{childList:!0,subtree:!0});});if(!t){c.error(`${this.name}: Could not find element`);return}e.observe(t,{attributes:!0,attributeFilter:["class"]});}}),ve="#mainContainer > div.content-wrapper.spring > div.employees-wrap > ul",Oe='a[href^="/profiles.php?XID="]',De=new F({name:"Company Page",description:"Shows a user spies on the company page",shouldRun:async function(){return d.getToggle(this.name)&&window.location.pathname==="/joblist.php"&&window.location.hash.includes("p=corpinfo")},start:async function(){const o=await D(ve,15e3);if(o===null){c.warn(`${this.name}: Failed to find element to append to.`);return}c.debug(`${this.name}: Found users`,o),$(o).children("li").each((t,e)=>{const s=$(e).find(Oe)[0];if(s===void 0){c.debug(`${this.name}: Failed to find user's ID`,e);return}const n=s.href.split("XID=")[1];c.debug(`${this.name}: Found user ID`,n),H(n).then(a=>{if("error"in a||a.success!==!0){c.warn(`${this.name}: Failed to find spy for ${n}`,a);return}const{spyText:r,tooltipText:l}=G(a);$(s).after($("<div>").addClass("tsc-company-spy").text(r).attr("title",l));});});}}),Q=(o,t)=>Array.prototype.slice.call(o,t);let _=null;typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?_=self:typeof global<"u"?_=global:window&&(_=window);const I=_,J=_.document,ee=["load","loadend","loadstart"],K=["progress","abort","error","timeout"],le=o=>["returnValue","totalSize","position"].includes(o),X=function(o,t){for(let e in o){if(le(e))continue;const s=o[e];try{t[e]=s;}catch{}}return t},te=function(o,t,e){const s=n=>function(a){const r={};for(let l in a){if(le(l))continue;const u=a[l];r[l]=u===t?e:u;}return e.dispatchEvent(n,r)};for(let n of Array.from(o))e._has(n)&&(t[`on${n}`]=s(n));},Re=function(o){if(J&&J.createEventObject!=null){const t=J.createEventObject();return t.type=o,t}try{return new Event(o)}catch{return {type:o}}},U=function(o){let t={};const e=n=>t[n]||[],s={};return s.addEventListener=function(n,a,r){t[n]=e(n),!(t[n].indexOf(a)>=0)&&(r=r===void 0?t[n].length:r,t[n].splice(r,0,a));},s.removeEventListener=function(n,a){if(n===void 0){t={};return}a===void 0&&(t[n]=[]);const r=e(n).indexOf(a);r!==-1&&e(n).splice(r,1);},s.dispatchEvent=function(){const n=Q(arguments),a=n.shift();o||(n[0]=X(n[0],Re(a)),Object.defineProperty(n[0],"target",{writable:!1,value:this}));const r=s[`on${a}`];r&&r.apply(s,n);const l=e(a).concat(e("*"));for(let u=0;u<l.length;u++)l[u].apply(s,n);},s._has=n=>!!(t[n]||s[`on${n}`]),o&&(s.listeners=n=>Q(e(n)),s.on=s.addEventListener,s.off=s.removeEventListener,s.fire=s.dispatchEvent,s.once=function(n,a){var r=function(){return s.off(n,r),a.apply(null,arguments)};return s.on(n,r)},s.destroy=()=>t={}),s},ue=`\r
`,Le=function(o){return Object.entries(o).map(([s,n])=>`${s.toLowerCase()}: ${n}`).join(ue)},ke=function(o,t){const e=o.split(ue);t==null&&(t={});for(let s of e)if(/([^:]+):\s*(.+)/.test(s)){const n=RegExp.$1!=null?RegExp.$1.toLowerCase():void 0,a=RegExp.$2;t[n]==null&&(t[n]=a);}return t},Ie=function(o,t){switch(typeof o){case"object":return Le(o);case"string":return ke(o,t)}return []};var W={convert:Ie};const M=U(!0),ne=o=>o===void 0?null:o,N=I.XMLHttpRequest,R=function(){const t=new N,e={};let s=null,n,a,r;var l=0;const u=function(){if(r.status=s||t.status,s!==-1&&(r.statusText=t.statusText),s!==-1){const p=W.convert(t.getAllResponseHeaders());for(let h in p){const y=p[h];if(!r.headers[h]){const w=h.toLowerCase();r.headers[w]=y;}}return}},m=function(){if(!t.responseType||t.responseType==="text"){r.text=t.responseText,r.data=t.responseText;try{r.xml=t.responseXML;}catch{}}else t.responseType==="document"?(r.xml=t.responseXML,r.data=t.responseXML):r.data=t.response;"responseURL"in t&&(r.finalUrl=t.responseURL);},g=function(){i.status=r.status,i.statusText=r.statusText;},x=function(){"text"in r&&(i.responseText=r.text),"xml"in r&&(i.responseXML=r.xml),"data"in r&&(i.response=r.data),"finalUrl"in r&&(i.responseURL=r.finalUrl);},f=function(){n||i.dispatchEvent("load",{}),i.dispatchEvent("loadend",{}),n&&(i.readyState=0);},b=function(p){for(;p>l&&l<4;)i.readyState=++l,l===1&&i.dispatchEvent("loadstart",{}),l===2&&g(),l===4&&(g(),x()),i.dispatchEvent("readystatechange",{}),l===4&&(e.async===!1?f():setTimeout(f,0));},S=function(p){if(p!==4){b(p);return}const h=M.listeners("after");var y=function(){if(h.length>0){const w=h.shift();w.length===2?(w(e,r),y()):w.length===3&&e.async?w(e,r,y):y();}else b(4);};y();};var i=U();e.xhr=i,t.onreadystatechange=function(p){try{t.readyState===2&&u();}catch{}t.readyState===4&&(a=!1,u(),m()),S(t.readyState);};const v=function(){n=!0;};i.addEventListener("error",v),i.addEventListener("timeout",v),i.addEventListener("abort",v),i.addEventListener("progress",function(p){l<3?S(3):t.readyState<=3&&i.dispatchEvent("readystatechange",{});}),"withCredentials"in t&&(i.withCredentials=!1),i.status=0;for(let p of Array.from(K.concat(ee)))i[`on${p}`]=null;if(i.open=function(p,h,y,w,P){l=0,n=!1,a=!1,e.headers={},e.headerNames={},e.status=0,e.method=p,e.url=h,e.async=y!==!1,e.user=w,e.pass=P,r={},r.headers={},S(1);},i.send=function(p){let h,y;for(h of ["type","timeout","withCredentials"])y=h==="type"?"responseType":h,y in i&&(e[h]=i[y]);e.body=p;const w=function(){te(K,t,i),i.upload&&te(K.concat(ee),t.upload,i.upload),a=!0,t.open(e.method,e.url,e.async,e.user,e.pass);for(h of ["type","timeout","withCredentials"])y=h==="type"?"responseType":h,h in e&&(t[y]=e[h]);for(let O in e.headers){const L=e.headers[O];O&&t.setRequestHeader(O,L);}t.send(e.body);},P=M.listeners("before");var z=function(){if(!P.length)return w();const O=function(C){if(typeof C=="object"&&(typeof C.status=="number"||typeof r.status=="number")){X(C,r),"data"in C||(C.data=C.response||C.text),S(4);return}z();};O.head=function(C){X(C,r),S(2);},O.progress=function(C){X(C,r),S(3);};const L=P.shift();L.length===1?O(L(e)):L.length===2&&e.async?L(e,O):O();};z();},i.abort=function(){s=-1,a?t.abort():i.dispatchEvent("abort",{});},i.setRequestHeader=function(p,h){const y=p!=null?p.toLowerCase():void 0,w=e.headerNames[y]=e.headerNames[y]||p;e.headers[w]&&(h=e.headers[w]+", "+h),e.headers[w]=h;},i.getResponseHeader=p=>ne(r.headers[p?p.toLowerCase():void 0]),i.getAllResponseHeaders=()=>ne(W.convert(r.headers)),t.overrideMimeType&&(i.overrideMimeType=function(){t.overrideMimeType.apply(t,arguments);}),t.upload){let p=U();i.upload=p,e.upload=p;}return i.UNSENT=0,i.OPENED=1,i.HEADERS_RECEIVED=2,i.LOADING=3,i.DONE=4,i.response="",i.responseText="",i.responseXML=null,i.readyState=0,i.statusText="",i};R.UNSENT=0;R.OPENED=1;R.HEADERS_RECEIVED=2;R.LOADING=3;R.DONE=4;var V={patch(){N&&(I.XMLHttpRequest=R);},unpatch(){N&&(I.XMLHttpRequest=N);},Native:N,Xhook:R};function Fe(o,t){var e={};for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&t.indexOf(s)<0&&(e[s]=o[s]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,s=Object.getOwnPropertySymbols(o);n<s.length;n++)t.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(o,s[n])&&(e[s[n]]=o[s[n]]);return e}function Ne(o,t,e,s){function n(a){return a instanceof e?a:new e(function(r){r(a);})}return new(e||(e=Promise))(function(a,r){function l(g){try{m(s.next(g));}catch(x){r(x);}}function u(g){try{m(s.throw(g));}catch(x){r(x);}}function m(g){g.done?a(g.value):n(g.value).then(l,u);}m((s=s.apply(o,t||[])).next());})}const A=I.fetch;function Ae(o){const t=["method","headers","body","mode","credentials","cache","redirect","referrer","referrerPolicy","integrity","keepalive","signal","url"];let e={};return t.forEach(s=>e[s]=o[s]),e}function oe(o){return o instanceof Headers?se([...o.entries()]):Array.isArray(o)?se(o):o}function se(o){return o.reduce((t,[e,s])=>(t[e]=s,t),{})}const re=function(o,t={headers:{}}){let e=Object.assign(Object.assign({},t),{isFetch:!0});if(o instanceof Request){const a=Ae(o),r=Object.assign(Object.assign({},oe(a.headers)),oe(e.headers));e=Object.assign(Object.assign(Object.assign({},a),t),{headers:r,acceptedRequest:!0});}else e.url=o;const s=M.listeners("before"),n=M.listeners("after");return new Promise(function(a,r){let l=a;const u=function(f){if(!n.length)return l(f);const b=n.shift();return b.length===2?(b(e,f),u(f)):b.length===3?b(e,f,u):u(f)},m=function(f){if(f!==void 0){const b=new Response(f.body||f.text,f);a(b),u(b);return}g();},g=function(){if(!s.length){x();return}const f=s.shift();if(f.length===1)return m(f(e));if(f.length===2)return f(e,m)},x=()=>Ne(this,void 0,void 0,function*(){const{url:f,isFetch:b,acceptedRequest:S}=e,i=Fe(e,["url","isFetch","acceptedRequest"]);return o instanceof Request&&i.body instanceof ReadableStream&&(i.body=yield new Response(i.body).text()),A(f,i).then(v=>u(v)).catch(function(v){return l=r,u(v),r(v)})});g();})};var Y={patch(){A&&(I.fetch=re);},unpatch(){A&&(I.fetch=A);},Native:A,Xhook:re};const T=M;T.EventEmitter=U;T.before=function(o,t){if(o.length<1||o.length>2)throw "invalid hook";return T.on("before",o,t)};T.after=function(o,t){if(o.length<2||o.length>3)throw "invalid hook";return T.on("after",o,t)};T.enable=function(){V.patch(),Y.patch();};T.disable=function(){V.unpatch(),Y.unpatch();};T.XMLHttpRequest=V.Native;T.fetch=Y.Native;T.headers=W.convert;T.enable();const _e='a[href^="/profiles.php?XID="]',Me='[class*="userInfoBox"]',ae="div.member.icons.left",He=new F({name:"Faction - War",description:"Shows spies on the faction war page",shouldRun:async function(){return d.getToggle(this.name)&&window.location.href.includes("factions.php?step=")},start:async function(){T.after(async(o,t)=>{if(o.url.includes("faction_wars.php?redirect=false&step=getwarusers&")===!1)return;if(!await D(ae,1e4)){c.error(`${this.name}: Could not find users`);return}$(ae).each((s,n)=>{c.debug("element",n);const a=$(n).find(_e)[0];if(!a){c.error(`${this.name}: Could not find the user's Href`);return}const r=a.href.split("XID=")[1];if(!r){c.error(`${this.name}: Could not find the user's ID`);return}if(!$(n).find(Me)[0]){c.debug(`${this.name}: Could not find member's info box.`);return}H(r).then(u=>{if("error"in u||u.success!==!0){c.warn(`${this.name}: Failed to find spy for ${r}`,u);return}const{longTextInterval:m,longTextEstimate:g,toolTipText:x}=ye(u),f=$("<div>").addClass("tsc-faction-war").attr("title",x).append($("<span>").text(g));m!==""&&$(f).append($("<span>").text(m)),$(n).parent().append(f);});});});}}),de=Object.freeze(Object.defineProperty({__proto__:null,CompanyPage:De,FactionChain:Ce,FactionNormal:Se,FactionWar:He,ProfilePage:be},Symbol.toStringTag,{value:"Module"})),Pe=".profile-wrapper",Be='[class^="menu-value___"]',ie=new F({name:"Settings Panel",description:"Adds a settings panel to your own profile page.",shouldRun:async function(){var s,n;if(window.location.href.includes("profiles.php?XID=")===!1)return !1;const o=await D(Be,15e3);if(o===null)return c.warn(`${this.name}: Failed to find name element.`),!1;const t=(s=window.location.href.match(/XID=(\d+)/))==null?void 0:s[1],e=(n=o.href.match(/XID=(\d+)/))==null?void 0:n[1];return t===null||e===null?(c.warn(`${this.name}: Failed to find page ID or name ID.`),!1):t!==e?(c.warn(`${this.name}: Page ID does not match name ID.`),!1):!0},start:async function(){var s;const o=await D(Pe,15e3);if(o===null){c.warn(`${this.name}: Failed to find element to append to.`);return}if((s=o.nextElementSibling)!=null&&s.classList.contains("tsc-accordion")){c.warn(`${this.name}: Element already exists`);return}const t=await me(),e="error"in t?$("<div>").text("Welcome!"):$("<div>").html(`Hey, ${$("<div>").addClass("tsc-header-username").text(t.name).prop("outerHTML")}!`);$(o).after($("<details>").addClass("tsc-accordion").append($("<summary>").text("TSC Settings")).append($("<div>").addClass("tsc-header").append(e),$("<p>").css("margin-top","5px").text("This is the settings panel for the Torn Spies Central script."),$("<p>").text("Here you can configure the settings to your liking. Please note that changes will be saved automatically."),$("<p>").css("margin-top","5px").text("Note: Currently, the script works best with honor bars turned off. If you have them on, all spies (except on the profile page) will be unreadable. You can manage this in Settings -> General Settings -> Honor Names -> Off"),$("<br>"),$("<div>").addClass("tsc-setting-entry").append($("<input>").attr("type","checkbox").attr("id","enabled").prop("checked",d.getToggle("enabled")).on("change",function(){d.set("enabled",$(this).prop("checked"));})).append($("<p>").text("Enable Script")),$("<div>").addClass("tsc-setting-entry").append($("<label>").attr("for","api-key").text("API Key"),$("<input>").attr("type","text").attr("id","api-key").attr("placeholder","Paste your key here...").addClass("tsc-key-input").addClass("tsc-blur").val(d.get("tsc-key")||"").on("change",function(){const n=$(this).val();if(typeof n=="string"){if(!/^[a-zA-Z0-9]{16}$/.test(n)){$(this).css("outline","1px solid red");return}$(this).css("outline","none"),n!==d.get("tsc-key")&&d.set("tsc-key",n);}})),$("<br>"),$("<p>").text("Feature toggles:"),Object.values(de).map(n=>$("<div>").append($("<div>").addClass("tsc-setting-entry").append($("<input>").attr("type","checkbox").attr("id",n.name).prop("checked",d.getToggle(n.name)).on("change",function(){d.set(n.name,$(this).prop("checked"));})).append($("<p>").text(n.name))).append($("<p>").text(n.description))),$("<br>"),$("<p>").text("The following buttons require a confirmation before anything is deleted.").css("margin-bottom","10px"),$("<button>").text("Clear cached spies").addClass("tsc-button").css("margin-right","10px").on("click",async function(){if(!confirm("Are you sure you want to clear cached spies?"))return;const a=d.spyClear();c.debug(`Cleared ${a} spies from cache.`);const r=$(this);r.animate({opacity:0},"slow",function(){r.text(`Cleared ${a} spies`);}).animate({opacity:1},"slow"),setTimeout(function(){r.animate({opacity:0},"slow",function(){r.text("Clear cached spies");}).animate({opacity:1},"slow");},3e3);}),$("<button>").text("Clear all cache").addClass("tsc-button").on("click",async function(){if(!confirm("Are you sure you want to clear all cache?"))return;const a=d.fullClear();c.debug(`Cleared ${a} items in cache.`);const r=$(this);r.animate({opacity:0},"slow",function(){r.text(`Cleared ${a} items`);}).animate({opacity:1},"slow"),setTimeout(function(){r.animate({opacity:0},"slow",function(){r.text("Clear all cache");}).animate({opacity:1},"slow");},3e3);}),$("<br>"),$("<br>"),$("<p>").text("Debug settings:"),$("<div>").addClass("tsc-setting-entry").append($("<input>").attr("type","checkbox").attr("id","debug-logs").prop("checked",d.getToggle("debug-logs")).on("change",function(){d.set("debug-logs",$(this).prop("checked"));})).append($("<p>").text("Extra debug logs"))));}});async function je(){if(await ie.shouldRun()===!0&&(c.info("Settings panel feature started"),await ie.start()),d.getToggle("enabled")===!1){c.info("TSC is disabled");return}c.info("Starting TSC features...");for(const o of Object.values(de)){if(await o.shouldRun()===!1){c.debug(`${o.name} feature not applicable`);continue}try{await o.start(),c.info(`${o.name} feature started`);}catch(t){c.error(`Failed to start '${o.name}'`,t);}}}je().catch(o=>{c.error("TSC failed catastrophically:",o);});

})();