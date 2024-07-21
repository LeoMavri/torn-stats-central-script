// ==UserScript==
// @name         TSC Companion - Next
// @namespace    TSC
// @version      next-21
// @author       mavri [2402357]
// @description  The new and improved TSC Companion. Special thanks to Kwack [2190604]
// @copyright    2024, diicot.cc
// @icon         https://i.imgur.com/8eydsOA.png
// @downloadURL  https://github.com/LeoMavri/TSC-Companion/raw/next/dist/tsc-companion.user.js
// @updateURL    https://github.com/LeoMavri/TSC-Companion/raw/next/dist/tsc-companion.user.js
// @match        https://www.torn.com/profiles.php?*
// @match        https://www.torn.com/factions.php*
// @match        https://www.torn.com/joblist.php*
// @match        https://www.torn.com/index.php?page=people*
// @match        https://www.torn.com/pmarket.php
// @match        https://www.torn.com/loader.php?sid=attack&user2ID=*
// @connect      api.torn.com
// @connect      tsc.diicot.cc
// @grant        GM.xmlHttpRequest
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(r=>{if(typeof GM_addStyle=="function"){GM_addStyle(r);return}const o=document.createElement("style");o.textContent=r,document.head.append(o)})(" body{--tsc-bg-color: #f0f0f0;--tsc-alt-bg-color: #fff;--tsc-border-color: #ccc;--tsc-input-color: #ccc;--tsc-text-color: #000;--tsc-hover-color: #ddd;--tsc-glow-color: #ffb6c1}body.dark-mode{--tsc-bg-color: #333;--tsc-alt-bg-color: #383838;--tsc-border-color: #444;--tsc-input-color: #504f4f;--tsc-text-color: #ccc;--tsc-hover-color: #555;--tsc-glow-color: #ffb6c1}.tsc-loader{content:url(https://www.torn.com/images/v2/main/ajax-loader.gif)}body.dark-mode .tsc-loader{content:url(https://www.torn.com/images/v2/main/ajax-loader-white.gif)}table.tsc-stat-table{border-collapse:collapse;width:100%;background-color:var(--tsc-bg-color);color:var(--tsc-text-color)}table.tsc-stat-table th,table.tsc-stat-table td{padding:4px;border:1px solid var(--tsc-border-color);color:var(--tsc-text-color);text-align:center}table.tsc-stat-table th{background-color:var(--tsc-bg-color);color:var(--tsc-text-color)}.tsc-faction-spy{margin-right:2px;margin-left:auto;padding:3px 5px;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;color:var(--tsc-text-color);text-wrap:nowrap}.tsc-chain-spy{display:flex;align-items:center;height:.7rem;margin-left:2px;padding:3px;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;font-size:.6rem;color:var(--tsc-text-color);text-wrap:nowrap}.tsc-company-spy{display:inline;margin-left:5px;padding:3px 5px;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;color:var(--tsc-text-color);text-wrap:nowrap}.tsc-faction-war{display:flex;justify-content:space-around;align-items:center;height:15px;padding:3px;background-color:var(--tsc-alt-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);color:var(--tsc-text-color);text-wrap:nowrap;vertical-align:middle}.tsc-abroad-spy{display:inline;margin-left:2px;padding:3px 4px;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;color:var(--tsc-text-color);text-wrap:nowrap}.tsc-points-market-spy{display:inline;margin-left:5px;padding:3px 5px;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;font-size:.6rem;color:var(--tsc-text-color);text-wrap:nowrap;vertical-align:middle}.tsc-attack-spy{display:flex;align-items:center;height:.44rem;margin-left:2px;padding:3px;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;font-size:.6rem;color:var(--tsc-text-color);text-wrap:nowrap}.tsc-attack-mobile{flex:none!important;margin-right:3px!important}.tsc-accordion{margin:10px 0;padding:10px;background-color:var(--tsc-bg-color);border:1px solid var(--tsc-border-color);border-radius:5px}.tsc-header{display:flex;justify-content:space-between;align-items:center;margin-top:10px;margin-bottom:10px;font-size:1.2em;font-weight:700}.tsc-header-username{display:inline;font-style:italic}.tsc-setting-entry{display:flex;align-items:center;gap:5px;margin-top:10px;margin-bottom:5px}.tsc-key-input{width:120px;padding-left:5px;background-color:var(--tsc-input-color);color:var(--tsc-text-color)}.tsc-button{padding:5px 10px;transition:background-color .5s;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;color:var(--tsc-text-color)}.tsc-button:hover{transition:background-color .5s;background-color:var(--tsc-hover-color)}.tsc-blur{filter:blur(3px);transition:filter 2s}.tsc-blur:focus,.tsc-blur:active{filter:blur(0);transition-duration:.5s}.tsc-glow{animation:glow 1s infinite alternate;border-width:3px}@keyframes glow{0%{border-color:var(--tsc-border-color)}to{border-color:var(--tsc-glow-color)}} ");

(function () {
	'use strict';

	var be=Object.defineProperty;var Ee=(n,t,e)=>t in n?be(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var L=(n,t,e)=>(Ee(n,typeof t!="symbol"?t+"":t,e),e);class xe{constructor(t){L(this,"storageKey");this.storageKey=t;}get(t){return localStorage.getItem(`${this.storageKey}-${t}`)}set(t,e){localStorage.setItem(`${this.storageKey}-${t}`,e);}getToggle(t){return this.get(t)==="true"}getJSON(t){const e=this.get(t);return e===null?null:JSON.parse(e)}setJSON(t,e){this.set(t,JSON.stringify(e));}fullClear(){let t=0,e=[];for(let r=0;r<localStorage.length;r++){const s=localStorage.key(r);s!=null&&s.startsWith(this.storageKey)&&e.push(s);}for(let r of e)localStorage.removeItem(r),++t;return t}spyClear(){let t=0,e=[];for(let r=0;r<localStorage.length;r++){const s=localStorage.key(r);s!=null&&s.startsWith(`${this.storageKey}-spy`)&&e.push(s);}for(let r of e)localStorage.removeItem(r),++t;return t}}const d=new xe("kwack.mavri.tsc.rocks"),X={Colours:{Info:"#05668D",Warn:"#EDDEA4",Error:"#ff0000",Debug:"#5C415D"},Cache:{TSC:12*60*60*1e3,YATA:7*24*60*60*1e3,TornStats:7*24*60*60*1e3},API:{BaseUrl:"https://tsc.diicot.cc",Auth:"10000000-6000-0000-0009-000000000001"}},Te="###PDA-APIKEY###",j=Te.includes("PDA-APIKEY")===!1;class c{static info(t,...e){let r="%c",s=`color: ${X.Colours.Info}`;j&&(e=e.map(a=>JSON.stringify(a)),r="",s=""),console.info(`${r}[TSC Companion] ${t}`,s,...e);}static warn(t,...e){let r="%c",s=`color: ${X.Colours.Warn}`;j&&(e=e.map(a=>JSON.stringify(a)),r="",s=""),console.log(`${r}[TSC Companion] ${t}`,s,...e);}static error(t,...e){let r="%c",s=`color: ${X.Colours.Error}`;j&&(e=e.map(a=>JSON.stringify(a)),r="",s=""),console.error(`${r}[TSC Companion] ${t}`,s,...e);}static debug(t,...e){if(!d.getToggle("debug-logs"))return;let r="%c",s=`color: ${X.Colours.Debug}`;j&&(e=e.map(a=>JSON.stringify(a)),r="",s=""),console.log(`${r}[TSC Companion] ${t}`,s,...e);}}function z(n){switch(n){case 1:return "Invalid request";case 2:return "Maintenance";case 3:return "Invalid API Key";case 4:return "Internal Error";case 5:return "User Disabled";case 6:return "Cached Only";case 999:return "Service Down";default:return "Unknown error"}}const ge=12*60*60*1e3;function O(n){const t=d.getJSON(`spy-${n}`);if(t){if(t.insertedAt&&new Date().getTime()-new Date(t.insertedAt).getTime()<ge)return c.debug("Spy cache still valid"),Promise.resolve(t);c.debug("Spy cache expired, fetching new data"),d.setJSON(`spy-${n}`,null);}const e={apiKey:d.get("tsc-key")??"",userId:n};return new Promise((r,s)=>{(GM.xmlHttpRequest??GM.xmlhttpRequest)({method:"POST",url:"https://tsc.diicot.cc/next",timeout:3e4,headers:{Authorization:"10000000-6000-0000-0009-000000000001","x-requested-with":"XMLHttpRequest","Content-Type":"application/json"},data:JSON.stringify(e),onload(o){const i=JSON.parse(o.responseText);!("error"in i)&&i.success&&d.setJSON(`spy-${n}`,{...i,insertedAt:new Date().getTime()}),r(i);},onerror(o){c.debug("Data used: ",e),r({error:!0,message:`Failed to fetch spy ${o.statusText}`});},onabort(){r({error:!0,message:"Request aborted"});},ontimeout(){r({error:!0,message:"Request timed out"});}});})}async function Se(){if(d.get("tsc-key")===null)return {error:!0,message:"API Key not set"};const n=d.getJSON("user-data");if(n){if(n.insertedAt&&new Date().getTime()-new Date(n.insertedAt).getTime()<ge)return c.debug("User data cache still valid"),n;c.debug("User data cache expired, fetching new data"),d.setJSON("user-data",null);}const t=await fetch(`https://api.torn.com/user/?selections=basic&key=${d.get("tsc-key")}&comment=TSC-Next`);if(!t.ok)return {error:!0,message:t.statusText};const e=await t.json();return e.error?{error:!0,message:e.error.error}:(d.setJSON("user-data",{...e,insertedAt:new Date().getTime()}),e)}function E(n,t){return new Promise((e,r)=>{let s;if(document.querySelectorAll(n).length)return e(document.querySelector(n));const a=new MutationObserver(()=>{if(document.querySelectorAll(n).length)return a.disconnect(),s!=null&&clearTimeout(s),e(document.querySelector(n))});a.observe(document.body,{childList:!0,subtree:!0}),t&&(s=setTimeout(()=>{a.disconnect(),e(null);},t));})}const Ce=".settings-menu > .link > a:first-child";async function ee(){var t;const n=await E(Ce,15e3);return n===null?"":((t=n.href.match(/XID=(\d+)/))==null?void 0:t[1])??""}function b(n,t=2){return Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:t,minimumFractionDigits:t}).format(n)}function A(n){const{estimate:t,statInterval:e}=n.spy;let r=b(t.stats,1),s=`Estimate: ${b(t.stats,2)}`;return e!=null&&e.battleScore&&(r=`${b(BigInt(e.min),1)} - ${b(BigInt(e.max),1)}`,s+=`<br>Interval: ${b(BigInt(e.min),2)} - ${b(BigInt(e.max),2)}<br>Battle Score: ${b(e.battleScore,2)}`),{spyText:r,tooltipText:s}}function me(n){const{estimate:t,statInterval:e}=n.spy;let r="",s=`Estimate: ${b(t.stats)}`,a=`Estimate: ${new Date(t.lastUpdated).toLocaleDateString()}`;return e!=null&&e.battleScore&&(r=`${b(BigInt(e.min))} - ${b(BigInt(e.max))} / FF: ${e.fairFight}`,a+=`<br>Interval: ${new Date(e.lastUpdated).toLocaleDateString()}`),{longTextInterval:r,longTextEstimate:s,toolTipText:a}}function te(n){const t=new Date().getTime()-n.getTime(),e=Math.floor(t/(1e3*60)),r=Math.floor(e/60),s=Math.floor(r/24),a=Math.floor(s/30),o=Math.floor(a/12);if(o>0){const i=a%12;return `${o} year${o>1?"s":""}, ${i} month${i>1?"s":""}`}else if(a>0){const i=s%30;return `${a} month${a>1?"s":""}, ${i} day${i>1?"s":""}`}else if(s>0){const i=r%24;return `${s} day${s>1?"s":""}, ${i} hour${i>1?"s":""}`}else if(r>0){const i=e%60;return `${r} hour${r>1?"s":""}, ${i} minute${i>1?"s":""}`}else return `${e} minute${e>1?"s":""}`}class C{constructor({name:t,description:e,shouldRun:r,start:s}){L(this,"name");L(this,"description");L(this,"shouldRun");L(this,"start");this.name=t,this.description=e,this.shouldRun=r,this.start=s;}}const ve=".empty-block",Oe=new C({name:"Profile Page",description:"Shows a user's spy on their profile page",shouldRun:async function(){return d.getToggle(this.name)&&window.location.pathname==="/profiles.php"},start:async function(){const n=await E(ve,15e3);if(n===null){c.warn(`${this.name}: Could not find the empty block on the profile page`);return}if(!d.get("tsc-key"))return;const t=window.location.search.split("XID=")[1];if(!t){c.error(`${this.name}: Could not find the user's ID`);return}$(n).append($("<img>").addClass("tsc-loader")).css({display:"flex","justify-content":"center","align-items":"center"});const e=await O(t);if($(n).empty(),"error"in e||e.success!==!0){c.error(`${this.name}: Failed to fetch spy`,e),"error"in e?$(n).append($("<div>").text(e.message)):$(n).append($("<div>").text(z(e.code)));return}const{estimate:r,statInterval:s}=e.spy;let a=$("<table>").addClass("tsc-stat-table").attr("title",`Inteval: ${s!=null&&s.lastUpdated?new Date(s.lastUpdated).toLocaleString():"N/A"}<br>Estimate: ${new Date(r.lastUpdated).toLocaleString()}<br>Cache: ${new Date(e.insertedAt).toLocaleString()}`);if(s!=null&&s.battleScore){const{min:o,max:i,fairFight:u,lastUpdated:g}=s,{stats:m}=r;a.append($("<tr>").append($("<th>").text("Estimate")).append($("<th>").text("Interval")).append($("<th>").text("Int. Age")).append($("<th>").text("Fair Fight"))),a.append($("<tr>").append($("<td>").text(b(BigInt(m)))).append($("<td>").text(`${b(BigInt(o))} - ${b(BigInt(i))}`)).append($("<td>").text(te(new Date(g)))).append($("<td>").text(u)));}else {const{stats:o,lastUpdated:i}=r;a.append($("<tr>").append($("<th>").text("Estimate")).append($("<th>").text("Est. Age"))),a.append($("<tr>").append($("<td>").text(b(BigInt(o)))).append($("<td>").text(te(new Date(i)))));}$(n).append(a);}}),Ie=".faction-info-wrap.restyle.another-faction .table-body > li:nth-child(1)",De='[class*="userInfoBox"]',ke='a[href^="/profiles.php?XID="]',Re=new C({name:"Faction - Normal",description:"Shows a list of spies on the faction page",shouldRun:async function(){return d.getToggle(this.name)&&window.location.href.includes("factions.php?step=profile")},start:async function(){const n=await E(Ie,15e3);if(n===null){c.warn(`${this.name}: Failed to find element to append to.`);return}const t=$(n).parent()[0];$(t).children("li").each((e,r)=>{const s=$(r).find(De)[0];//! This is a bit of a hack, but it works for now
	if($(s).css("width","169px"),$(s).css("overflow","hidden"),$(s).css("text-overflow","ellipsis"),s===void 0){c.debug(`${this.name}: Failed to find the player's profile box.`,r);return}const a=$(s).find(ke)[0];if(a===void 0){c.debug(`${this.name}: Failed to find user's ID`,s);return}const o=a.href.split("XID=")[1];O(o).then(i=>{if("error"in i||i.success!==!0){c.warn(`${this.name}: Failed to find spy for ${o}`,i);return}const{spyText:u,tooltipText:g}=A(i);$(s).after($("<div>").addClass("tsc-faction-spy").text(u).attr("title",g));});});}}),ne=(n,t)=>Array.prototype.slice.call(n,t);let P=null;typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?P=self:typeof global<"u"?P=global:window&&(P=window);const _=P,K=P.document,se=["load","loadend","loadstart"],J=["progress","abort","error","timeout"],$e=n=>["returnValue","totalSize","position"].includes(n),U=function(n,t){for(let e in n){if($e(e))continue;const r=n[e];try{t[e]=r;}catch{}}return t},re=function(n,t,e){const r=s=>function(a){const o={};for(let i in a){if($e(i))continue;const u=a[i];o[i]=u===t?e:u;}return e.dispatchEvent(s,o)};for(let s of Array.from(n))e._has(s)&&(t[`on${s}`]=r(s));},Fe=function(n){if(K&&K.createEventObject!=null){const t=K.createEventObject();return t.type=n,t}try{return new Event(n)}catch{return {type:n}}},q=function(n){let t={};const e=s=>t[s]||[],r={};return r.addEventListener=function(s,a,o){t[s]=e(s),!(t[s].indexOf(a)>=0)&&(o=o===void 0?t[s].length:o,t[s].splice(o,0,a));},r.removeEventListener=function(s,a){if(s===void 0){t={};return}a===void 0&&(t[s]=[]);const o=e(s).indexOf(a);o!==-1&&e(s).splice(o,1);},r.dispatchEvent=function(){const s=ne(arguments),a=s.shift();n||(s[0]=U(s[0],Fe(a)),Object.defineProperty(s[0],"target",{writable:!1,value:this}));const o=r[`on${a}`];o&&o.apply(r,s);const i=e(a).concat(e("*"));for(let u=0;u<i.length;u++)i[u].apply(r,s);},r._has=s=>!!(t[s]||r[`on${s}`]),n&&(r.listeners=s=>ne(e(s)),r.on=r.addEventListener,r.off=r.removeEventListener,r.fire=r.dispatchEvent,r.once=function(s,a){var o=function(){return r.off(s,o),a.apply(null,arguments)};return r.on(s,o)},r.destroy=()=>t={}),r},ye=`\r
`,Le=function(n){return Object.entries(n).map(([r,s])=>`${r.toLowerCase()}: ${s}`).join(ye)},_e=function(n,t){const e=n.split(ye);t==null&&(t={});for(let r of e)if(/([^:]+):\s*(.+)/.test(r)){const s=RegExp.$1!=null?RegExp.$1.toLowerCase():void 0,a=RegExp.$2;t[s]==null&&(t[s]=a);}return t},Ae=function(n,t){switch(typeof n){case"object":return Le(n);case"string":return _e(n,t)}return []};var Y={convert:Ae};const H=q(!0),oe=n=>n===void 0?null:n,N=_.XMLHttpRequest,R=function(){const t=new N,e={};let r=null,s,a,o;var i=0;const u=function(){if(o.status=r||t.status,r!==-1&&(o.statusText=t.statusText),r!==-1){const f=Y.convert(t.getAllResponseHeaders());for(let p in f){const y=f[p];if(!o.headers[p]){const w=p.toLowerCase();o.headers[w]=y;}}return}},g=function(){if(!t.responseType||t.responseType==="text"){o.text=t.responseText,o.data=t.responseText;try{o.xml=t.responseXML;}catch{}}else t.responseType==="document"?(o.xml=t.responseXML,o.data=t.responseXML):o.data=t.response;"responseURL"in t&&(o.finalUrl=t.responseURL);},m=function(){l.status=o.status,l.statusText=o.statusText;},D=function(){"text"in o&&(l.responseText=o.text),"xml"in o&&(l.responseXML=o.xml),"data"in o&&(l.response=o.data),"finalUrl"in o&&(l.responseURL=o.finalUrl);},h=function(){s||l.dispatchEvent("load",{}),l.dispatchEvent("loadend",{}),s&&(l.readyState=0);},T=function(f){for(;f>i&&i<4;)l.readyState=++i,i===1&&l.dispatchEvent("loadstart",{}),i===2&&m(),i===4&&(m(),D()),l.dispatchEvent("readystatechange",{}),i===4&&(e.async===!1?h():setTimeout(h,0));},k=function(f){if(f!==4){T(f);return}const p=H.listeners("after");var y=function(){if(p.length>0){const w=p.shift();w.length===2?(w(e,o),y()):w.length===3&&e.async?w(e,o,y):y();}else T(4);};y();};var l=q();e.xhr=l,t.onreadystatechange=function(f){try{t.readyState===2&&u();}catch{}t.readyState===4&&(a=!1,u(),g()),k(t.readyState);};const I=function(){s=!0;};l.addEventListener("error",I),l.addEventListener("timeout",I),l.addEventListener("abort",I),l.addEventListener("progress",function(f){i<3?k(3):t.readyState<=3&&l.dispatchEvent("readystatechange",{});}),"withCredentials"in t&&(l.withCredentials=!1),l.status=0;for(let f of Array.from(J.concat(se)))l[`on${f}`]=null;if(l.open=function(f,p,y,w,B){i=0,s=!1,a=!1,e.headers={},e.headerNames={},e.status=0,e.method=f,e.url=p,e.async=y!==!1,e.user=w,e.pass=B,o={},o.headers={},k(1);},l.send=function(f){let p,y;for(p of ["type","timeout","withCredentials"])y=p==="type"?"responseType":p,y in l&&(e[p]=l[y]);e.body=f;const w=function(){re(J,t,l),l.upload&&re(J.concat(se),t.upload,l.upload),a=!0,t.open(e.method,e.url,e.async,e.user,e.pass);for(p of ["type","timeout","withCredentials"])y=p==="type"?"responseType":p,p in e&&(t[y]=e[p]);for(let v in e.headers){const F=e.headers[v];v&&t.setRequestHeader(v,F);}t.send(e.body);},B=H.listeners("before");var Q=function(){if(!B.length)return w();const v=function(S){if(typeof S=="object"&&(typeof S.status=="number"||typeof o.status=="number")){U(S,o),"data"in S||(S.data=S.response||S.text),k(4);return}Q();};v.head=function(S){U(S,o),k(2);},v.progress=function(S){U(S,o),k(3);};const F=B.shift();F.length===1?v(F(e)):F.length===2&&e.async?F(e,v):v();};Q();},l.abort=function(){r=-1,a?t.abort():l.dispatchEvent("abort",{});},l.setRequestHeader=function(f,p){const y=f!=null?f.toLowerCase():void 0,w=e.headerNames[y]=e.headerNames[y]||f;e.headers[w]&&(p=e.headers[w]+", "+p),e.headers[w]=p;},l.getResponseHeader=f=>oe(o.headers[f?f.toLowerCase():void 0]),l.getAllResponseHeaders=()=>oe(Y.convert(o.headers)),t.overrideMimeType&&(l.overrideMimeType=function(){t.overrideMimeType.apply(t,arguments);}),t.upload){let f=q();l.upload=f,e.upload=f;}return l.UNSENT=0,l.OPENED=1,l.HEADERS_RECEIVED=2,l.LOADING=3,l.DONE=4,l.response="",l.responseText="",l.responseXML=null,l.readyState=0,l.statusText="",l};R.UNSENT=0;R.OPENED=1;R.HEADERS_RECEIVED=2;R.LOADING=3;R.DONE=4;var V={patch(){N&&(_.XMLHttpRequest=R);},unpatch(){N&&(_.XMLHttpRequest=N);},Native:N,Xhook:R};function Ne(n,t){var e={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.indexOf(r)<0&&(e[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)t.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(e[r[s]]=n[r[s]]);return e}function Me(n,t,e,r){function s(a){return a instanceof e?a:new e(function(o){o(a);})}return new(e||(e=Promise))(function(a,o){function i(m){try{g(r.next(m));}catch(D){o(D);}}function u(m){try{g(r.throw(m));}catch(D){o(D);}}function g(m){m.done?a(m.value):s(m.value).then(i,u);}g((r=r.apply(n,[])).next());})}const M=_.fetch;function Pe(n){const t=["method","headers","body","mode","credentials","cache","redirect","referrer","referrerPolicy","integrity","keepalive","signal","url"];let e={};return t.forEach(r=>e[r]=n[r]),e}function ae(n){return n instanceof Headers?ie([...n.entries()]):Array.isArray(n)?ie(n):n}function ie(n){return n.reduce((t,[e,r])=>(t[e]=r,t),{})}const ce=function(n,t={headers:{}}){let e=Object.assign(Object.assign({},t),{isFetch:!0});if(n instanceof Request){const a=Pe(n),o=Object.assign(Object.assign({},ae(a.headers)),ae(e.headers));e=Object.assign(Object.assign(Object.assign({},a),t),{headers:o,acceptedRequest:!0});}else e.url=n;const r=H.listeners("before"),s=H.listeners("after");return new Promise(function(a,o){let i=a;const u=function(h){if(!s.length)return i(h);const T=s.shift();return T.length===2?(T(e,h),u(h)):T.length===3?T(e,h,u):u(h)},g=function(h){if(h!==void 0){const T=new Response(h.body||h.text,h);a(T),u(T);return}m();},m=function(){if(!r.length){D();return}const h=r.shift();if(h.length===1)return g(h(e));if(h.length===2)return h(e,g)},D=()=>Me(this,void 0,void 0,function*(){const{url:h,isFetch:T,acceptedRequest:k}=e,l=Ne(e,["url","isFetch","acceptedRequest"]);return n instanceof Request&&l.body instanceof ReadableStream&&(l.body=yield new Response(l.body).text()),M(h,l).then(I=>u(I)).catch(function(I){return i=o,u(I),o(I)})});m();})};var Z={patch(){M&&(_.fetch=ce);},unpatch(){M&&(_.fetch=M);},Native:M,Xhook:ce};const x=H;x.EventEmitter=q;x.before=function(n,t){if(n.length<1||n.length>2)throw "invalid hook";return x.on("before",n,t)};x.after=function(n,t){if(n.length<2||n.length>3)throw "invalid hook";return x.on("after",n,t)};x.enable=function(){V.patch(),Z.patch();};x.disable=function(){V.unpatch(),Z.unpatch();};x.XMLHttpRequest=V.Native;x.fetch=Z.Native;x.headers=Y.convert;x.enable();const le='[class^="warListItem"][class*="first-in-row"]',G='[class^="chain-attacks-list"]',He='[class^="honorWrap"]',W=async()=>{$("*[class='respect']").css("margin-left","32px !important"),$("*[class='attack-number']").css("min-width","45px !important"),$(`${G} li`).each(function(n,t){const e=$(t).find(He);for(let r=0;r<=1;r++){const s=e[r],a=$(s).find("a").attr("href");if(!a){c.warn("Faction - Chain: Failed to find ID.");return}const o=a.split("XID=")[1];O(o).then(i=>{if("error"in i||i.success!==!0){c.warn(`Faction - Chain: Failed to find spy for ${o}`,i);return}const{spyText:u,tooltipText:g}=A(i);$(s).find(".tsc-chain-spy").length>0||$(s).append($("<div>").addClass("tsc-chain-spy").text(u).attr("title",g));});}});},Be=new C({name:"Faction - Chain",description:"Shows spies on the chain page",shouldRun:async function(){return !d.getToggle(this.name)||!window.location.href.includes("factions.php?step=your")?!1:await E(le,15e3)!==null},start:async function(){let n=null;if(x.after(async(t,e)=>{if(t.url.includes("warID=chain")===!1)return;c.debug(`${this.name}: Found Chain War users request:`,t.url);const r=await E(G,15e3);if(!r){c.error(`${this.name}: Could not find attacks list (element did not show up in time)`);return}n!==null&&(n.disconnect(),n=null),await W(),n=new MutationObserver(async s=>{let a=!1;$(`${le} li`).each(function(o,i){a!==!0&&$(i).find(".tsc-chain-spy").length===0&&(a=!0,W());});}),n.observe(r,{childList:!0,subtree:!0});}),window.location.href.includes("war/chain")){if(!await E(G,15e3)){c.error(`${this.name}: Could not find attacks list (element did not show up in time)`);return}await W();}}}),Xe='ul[class^="employees-list"]',je='a[href^="/profiles.php?XID="]',Ue=new C({name:"Company Page",description:"Shows user spies on the company page",shouldRun:async function(){return d.getToggle(this.name)&&window.location.pathname==="/joblist.php"&&window.location.hash.includes("p=corpinfo")},start:async function(){const n=await E(Xe,15e3);if(n===null){c.warn(`${this.name}: Failed to find element to append to.`);return}c.debug(`${this.name}: Found users`,n),$(n).children("li").each((t,e)=>{const r=$(e).find(je)[0];if(r===void 0){c.debug(`${this.name}: Failed to find user's ID`,e);return}const s=r.href.split("XID=")[1];c.debug(`${this.name}: Found user ID`,s),O(s).then(a=>{if("error"in a||a.success!==!0){c.warn(`${this.name}: Failed to find spy for ${s}`,a);return}const{spyText:o,tooltipText:i}=A(a);$(r).after($("<div>").addClass("tsc-company-spy").text(o).attr("title",i));});});}}),qe='a[href^="/profiles.php?XID="]',de="div.member.icons.left",ue=async n=>{if(!await E(de,1e4)){c.error(`${n}: Could not find users`);return}$(de).each((e,r)=>{const s=$(r).find(qe)[0];if(!s){c.error(`${n}: Could not find the user's Href`);return}const a=s.href.split("XID=")[1];if(!a){c.error(`${n}: Could not find the user's ID`);return}if($(r).parent().find(".tsc-faction-war").length>0)return;const o=$("<div>").addClass("tsc-faction-war");o.append($("<img>").addClass("tsc-loader")),$(r).parent().append(o),O(a).then(i=>{if(o.empty(),"error"in i||i.success!==!0){c.warn(`${n}: Failed to find spy for ${a}`,i),"error"in i?$(o).append($("<span>").text(i.message)):$(o).append($("<span>").text(z(i.code)));return}const{longTextInterval:u,longTextEstimate:g,toolTipText:m}=me(i);o.attr("title",m).append($("<span>").text(g)),u!==""&&$(o).append($("<span>").text(u)),$(r).parent().append(o);});});},Ke=new C({name:"Faction - War",description:"Shows spies on the faction war page",shouldRun:async function(){return d.getToggle(this.name)&&window.location.href.includes("factions.php?step=")},start:async function(){x.after(async(n,t)=>{n.url.includes("&warID=rank")===!1&&n.url.includes("&warID=raid")===!1||(c.debug(`${this.name}: Found users request: ${n.url}`),await ue(this.name));}),(window.location.href.includes("/war/rank")||window.location.href.includes("/war/raid-"))&&await ue(this.name);}}),Je='ul[class^="users-list"]',We='a[href^="/profiles.php?XID="]',Ye=new C({name:"Abroad Page",description:"Shows user spies on the abroad people's page",shouldRun:async function(){return d.getToggle(this.name)&&window.location.pathname==="/index.php"&&window.location.search.includes("?page=people")},start:async function(){const n=await E(Je,15e3);if(n===null){c.warn(`${this.name}: Failed to find element to append to.`);return}c.debug(`${this.name}: Found users`,n),$(n).children("li").each((t,e)=>{const r=$(e).find(We)[0];if(r===void 0){c.debug(`${this.name}: Failed to find user's ID`,e);return}const s=r.href.split("XID=")[1];c.debug(`${this.name}: Found user ID`,s),O(s).then(a=>{if("error"in a||a.success!==!0){c.warn(`${this.name}: Failed to find spy for ${s}`,a);return}const{spyText:o,tooltipText:i}=A(a);$(r).append($("<div>").addClass("tsc-abroad-spy").text(o).attr("title",i).css("font-size","0.8em"));});});}}),Ge="div.points-market > div.chart-main-wrap > ul:nth-of-type(2)",ze='a[href^="/profiles.php?XID="]',Ve=new C({name:"Points Market",description:"Shows user spies on the points market",shouldRun:async function(){return d.getToggle(this.name)&&window.location.pathname==="/pmarket.php"},start:async function(){const n=await E(Ge,15e3);if(n===null){c.warn(`${this.name}: Failed to find element to append to.`);return}c.debug(`${this.name}: Found users`,n),$(n).children("li").each((t,e)=>{const r=$(e).find(ze)[0];if(r===void 0){c.debug(`${this.name}: Failed to find user's ID`,e);return}const s=r.href.split("XID=")[1];c.debug(`${this.name}: Found user ID`,s),O(s).then(a=>{if("error"in a||a.success!==!0){c.warn(`${this.name}: Failed to find spy for ${s}`,a);return}const{spyText:o,tooltipText:i}=A(a);$(r).after($("<div>").addClass("tsc-points-market-spy").text(o).attr("title",i));});});}}),Ze='a[href^="/profiles.php?XID="]',Qe='[class^="memberRowWp"]',et="div.member.icons.left",fe=async n=>{if(!await E(et,1e4)){c.error(`${n}: Could not find users`);return}$(Qe).each((e,r)=>{const s=$(r).find(Ze)[0];if(!s){c.error(`${n}: Could not find the user's Href`);return}const a=s.href.split("XID=")[1];if(!a){c.error(`${n}: Could not find the user's ID`);return}if($(r).find(".tsc-faction-war").length>0)return;c.debug(`${n}: Found user ${a}`);const o=$("<div>").addClass("tsc-faction-war");o.append($("<img>").addClass("tsc-loader")),$(r).append(o),O(a).then(i=>{if(o.empty(),"error"in i||i.success!==!0){c.warn(`${n}: Failed to find spy for ${a}`,i),"error"in i?$(o).append($("<span>").text(i.message)):$(o).append($("<span>").text(z(i.code)));return}const{longTextInterval:u,longTextEstimate:g,toolTipText:m}=me(i);o.attr("title",m).append($("<span>").text(g)),u!==""&&$(o).append($("<span>").text(u)),$(r).append(o);});});},tt=new C({name:"Faction - TT War",description:"Shows spies on the faction teritory war page",shouldRun:async function(){return d.getToggle(this.name)&&window.location.href.includes("factions.php?step=")},start:async function(){x.after(async(n,t)=>{n.url.includes("&step=getwarusers")!==!1&&(c.debug(`${this.name}: Found users request: ${n.url}`),await fe(this.name));}),/\/war\/\d+/.test(window.location.href)&&await fe(this.name);}}),pe='[class*="user-name"]',nt=new C({name:"Attack Page",description:"Shows a user's spy on their attack page",shouldRun:async function(){return d.getToggle(this.name)&&window.location.pathname==="/loader.php"},start:async function(){if(await E(pe)===null){c.debug("Could not find local name element");return}const t=new URLSearchParams(window.location.search).get("user2ID");if(t===null){c.debug("Could not find enemy ID");return}O(t).then(e=>{if("error"in e||e.success!==!0){c.warn(`${this.name}: Failed to find spy for ${t}`,e);return}const{spyText:r,tooltipText:s}=A(e);$(pe).eq(1).addClass("tsc-attack-mobile").after($("<div>").addClass("tsc-attack-spy").addClass("left").text(r).attr("title",s));});}}),we=Object.freeze(Object.defineProperty({__proto__:null,AbroadPage:Ye,AttackPage:nt,CompanyPage:Ue,FactionChain:Be,FactionNormal:Re,FactionTTWar:tt,FactionWar:Ke,PointsMarket:Ve,ProfilePage:Oe},Symbol.toStringTag,{value:"Module"})),st=".profile-wrapper",rt=".empty-block",he=new C({name:"Settings Panel",description:"Adds a settings panel to your own profile page.",shouldRun:async function(){var r;if(window.location.href.includes("profiles.php?XID=")===!1)return !1;const n=(r=window.location.href.match(/XID=(\d+)/))==null?void 0:r[1],t=await ee(),e=await E(rt,15e3);if(e===null)return c.warn(`${this.name}: Could not find the empty block on the profile page`),n===t;if(!d.get("tsc-key")){const s=$("<a>").attr("href",`https://www.torn.com/profiles.php?XID=${await ee()}`).text("your own profile");$(e).append($("<div>").html("Please enter your TSC API key on ").append(s).append(".")).css({display:"flex","justify-content":"center","align-items":"center"});}return n===t},start:async function(){var r;const n=await E(st,15e3);if(n===null){c.warn(`${this.name}: Failed to find element to append to.`);return}if((r=n.nextElementSibling)!=null&&r.classList.contains("tsc-accordion")){c.warn(`${this.name}: Element already exists`);return}const t=await Se(),e="error"in t?$("<div>").text("Welcome!"):$("<div>").html(`Hey, ${$("<div>").addClass("tsc-header-username").text(t.name).prop("outerHTML")}!`);$(n).after($("<details>").addClass("tsc-accordion").addClass(d.get("tsc-key")?"":"tsc-glow").append($("<summary>").text("TSC Settings")).append($("<div>").addClass("tsc-header").append(e),$("<p>").css("margin-top","5px").text("This is the settings panel for the Torn Spies Central script."),$("<p>").text("Here you can configure the settings to your liking. Please note that changes will be saved automatically."),$("<p>").css("margin-top","5px").text("Note: Currently, the script works best with honor bars turned off. If you have them on, all spies (except on the profile page) will be unreadable. You can manage this in Settings -> General Settings -> Honor Names -> Off"),$("<br>"),$("<div>").addClass("tsc-setting-entry").append($("<input>").attr("type","checkbox").attr("id","enabled").prop("checked",d.getToggle("enabled")).on("change",function(){d.set("enabled",$(this).prop("checked"));})).append($("<p>").text("Enable Script")),$("<div>").addClass("tsc-setting-entry").append($("<label>").attr("for","api-key").text("API Key"),$("<input>").attr("type","text").attr("id","api-key").attr("placeholder","Paste your key here...").addClass("tsc-key-input").addClass(d.get("tsc-key")?"tsc-blur":"").val(d.get("tsc-key")||"").on("change",function(){const s=$(this).val();if(typeof s=="string"){if(!/^[a-zA-Z0-9]{16}$/.test(s)){$(this).css("outline","1px solid red");return}$(this).css("outline","none"),s!==d.get("tsc-key")&&d.set("tsc-key",s);}})),$("<br>"),$("<p>").text("Feature toggles:"),Object.values(we).map(s=>$("<div>").append($("<div>").addClass("tsc-setting-entry").append($("<input>").attr("type","checkbox").attr("id",s.name).prop("checked",d.getToggle(s.name)).on("change",function(){d.set(s.name,$(this).prop("checked"));})).append($("<p>").text(s.name))).append($("<p>").text(s.description))),$("<br>"),$("<p>").text("The following buttons require a confirmation before anything is deleted.").css("margin-bottom","10px"),$("<button>").text("Clear cached spies").addClass("tsc-button").css("margin-right","10px").on("click",async function(){if(!confirm("Are you sure you want to clear cached spies?"))return;const a=d.spyClear();c.debug(`Cleared ${a} spies from cache.`);const o=$(this);o.animate({opacity:0},"slow",function(){o.text(`Cleared ${a} spies`);}).animate({opacity:1},"slow"),setTimeout(function(){o.animate({opacity:0},"slow",function(){o.text("Clear cached spies");}).animate({opacity:1},"slow");},3e3);}),$("<button>").text("Clear all cache").addClass("tsc-button").on("click",async function(){if(!confirm("Are you sure you want to clear all cache?"))return;const a=d.fullClear();c.debug(`Cleared ${a} items in cache.`);const o=$(this);o.animate({opacity:0},"slow",function(){o.text(`Cleared ${a} items`);}).animate({opacity:1},"slow"),setTimeout(function(){o.animate({opacity:0},"slow",function(){o.text("Clear all cache");}).animate({opacity:1},"slow");},3e3);}),$("<br>"),$("<br>"),$("<p>").text("Debug settings:"),$("<div>").addClass("tsc-setting-entry").append($("<input>").attr("type","checkbox").attr("id","debug-logs").prop("checked",d.getToggle("debug-logs")).on("change",function(){d.set("debug-logs",$(this).prop("checked"));})).append($("<p>").text("Extra debug logs"))));}});async function ot(){if(await he.shouldRun()===!0&&(c.info("Settings panel initialized"),await he.start()),d.getToggle("enabled")===!1){c.info("TSC is disabled");return}c.info("Starting TSC features...");for(const n of Object.values(we))if(await n.shouldRun()!==!1)try{await n.start(),c.info(`'${n.name}' started`);}catch(t){c.error(`Failed to start '${n.name}'`,t);}}ot().catch(n=>{c.error("TSC failed catastrophically:",n);});

})();