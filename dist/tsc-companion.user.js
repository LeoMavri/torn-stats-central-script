// ==UserScript==
// @name         TSC Companion - Next
// @namespace    TSC
// @version      next-20
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
// @connect      api.torn.com
// @connect      tsc.diicot.cc
// @grant        GM.xmlHttpRequest
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const r=document.createElement("style");r.textContent=o,document.head.append(r)})(" body{--tsc-bg-color: #f0f0f0;--tsc-alt-bg-color: #fff;--tsc-border-color: #ccc;--tsc-input-color: #ccc;--tsc-text-color: #000;--tsc-hover-color: #ddd;--tsc-glow-color: #ffb6c1}body.dark-mode{--tsc-bg-color: #333;--tsc-alt-bg-color: #383838;--tsc-border-color: #444;--tsc-input-color: #504f4f;--tsc-text-color: #ccc;--tsc-hover-color: #555;--tsc-glow-color: #ffb6c1}.tsc-loader{content:url(https://www.torn.com/images/v2/main/ajax-loader.gif)}body.dark-mode .tsc-loader{content:url(https://www.torn.com/images/v2/main/ajax-loader-white.gif)}table.tsc-stat-table{border-collapse:collapse;width:100%;background-color:var(--tsc-bg-color);color:var(--tsc-text-color)}table.tsc-stat-table th,table.tsc-stat-table td{padding:4px;border:1px solid var(--tsc-border-color);color:var(--tsc-text-color);text-align:center}table.tsc-stat-table th{background-color:var(--tsc-bg-color);color:var(--tsc-text-color)}.tsc-faction-spy{margin-right:2px;margin-left:auto;padding:3px 5px;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;color:var(--tsc-text-color);text-wrap:nowrap}.tsc-chain-spy{display:flex;align-items:center;height:.7rem;margin-left:2px;padding:3px;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;font-size:.6rem;color:var(--tsc-text-color);text-wrap:nowrap}.tsc-company-spy{display:inline;margin-left:5px;padding:3px 5px;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;color:var(--tsc-text-color);text-wrap:nowrap}.tsc-faction-war{display:flex;justify-content:space-around;align-items:center;height:15px;padding:3px;background-color:var(--tsc-alt-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);color:var(--tsc-text-color);text-wrap:nowrap;vertical-align:middle}.tsc-abroad-spy{display:inline;margin-left:2px;padding:3px 4px;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;color:var(--tsc-text-color);text-wrap:nowrap}.tsc-points-market-spy{display:inline;margin-left:5px;padding:3px 5px;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;font-size:.6rem;color:var(--tsc-text-color);text-wrap:nowrap;vertical-align:middle}.tsc-accordion{margin:10px 0;padding:10px;background-color:var(--tsc-bg-color);border:1px solid var(--tsc-border-color);border-radius:5px}.tsc-header{display:flex;justify-content:space-between;align-items:center;margin-top:10px;margin-bottom:10px;font-size:1.2em;font-weight:700}.tsc-header-username{display:inline;font-style:italic}.tsc-setting-entry{display:flex;align-items:center;gap:5px;margin-top:10px;margin-bottom:5px}.tsc-key-input{width:120px;padding-left:5px;background-color:var(--tsc-input-color);color:var(--tsc-text-color)}.tsc-button{padding:5px 10px;transition:background-color .5s;background-color:var(--tsc-bg-color);cursor:pointer;border:1px solid var(--tsc-border-color);border-radius:5px;color:var(--tsc-text-color)}.tsc-button:hover{transition:background-color .5s;background-color:var(--tsc-hover-color)}.tsc-blur{filter:blur(3px);transition:filter 2s}.tsc-blur:focus,.tsc-blur:active{filter:blur(0);transition-duration:.5s}.tsc-glow{animation:glow 1s infinite alternate;border-width:3px}@keyframes glow{0%{border-color:var(--tsc-border-color)}to{border-color:var(--tsc-glow-color)}} ");

(function () {
	'use strict';

	var $e=Object.defineProperty;var ye=(n,t,e)=>t in n?$e(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var L=(n,t,e)=>ye(n,typeof t!="symbol"?t+"":t,e);class we{constructor(t){L(this,"storageKey");this.storageKey=t;}get(t){return localStorage.getItem(`${this.storageKey}-${t}`)}set(t,e){localStorage.setItem(`${this.storageKey}-${t}`,e);}getToggle(t){return this.get(t)==="true"}getJSON(t){const e=this.get(t);return e===null?null:JSON.parse(e)}setJSON(t,e){this.set(t,JSON.stringify(e));}fullClear(){let t=0,e=[];for(let o=0;o<localStorage.length;o++){const s=localStorage.key(o);s!=null&&s.startsWith(this.storageKey)&&e.push(s);}for(let o of e)localStorage.removeItem(o),++t;return t}spyClear(){let t=0,e=[];for(let o=0;o<localStorage.length;o++){const s=localStorage.key(o);s!=null&&s.startsWith(`${this.storageKey}-spy`)&&e.push(s);}for(let o of e)localStorage.removeItem(o),++t;return t}}const u=new we("kwack.mavri.tsc.rocks"),X={Colours:{Info:"#05668D",Warn:"#EDDEA4",Error:"#ff0000",Debug:"#5C415D"}},be="###PDA-APIKEY###",j=be.includes("PDA-APIKEY")===!1;class l{static info(t,...e){let o="%c",s=`color: ${X.Colours.Info}`;j&&(e=e.map(r=>JSON.stringify(r)),o="",s=""),console.info(`${o}[TSC Companion] ${t}`,s,...e);}static warn(t,...e){let o="%c",s=`color: ${X.Colours.Warn}`;j&&(e=e.map(r=>JSON.stringify(r)),o="",s=""),console.log(`${o}[TSC Companion] ${t}`,s,...e);}static error(t,...e){let o="%c",s=`color: ${X.Colours.Error}`;j&&(e=e.map(r=>JSON.stringify(r)),o="",s=""),console.error(`${o}[TSC Companion] ${t}`,s,...e);}static debug(t,...e){if(!u.getToggle("debug-logs"))return;let o="%c",s=`color: ${X.Colours.Debug}`;j&&(e=e.map(r=>JSON.stringify(r)),o="",s=""),console.log(`${o}[TSC Companion] ${t}`,s,...e);}}function fe(n){switch(n){case 1:return "Invalid request";case 2:return "Maintenance";case 3:return "Invalid API Key";case 4:return "Internal Error";case 5:return "User Disabled";case 6:return "Cached Only";case 999:return "Service Down";default:return "Unknown error"}}const pe=12*60*60*1e3;function R(n){const t=u.getJSON(`spy-${n}`);if(t){if(t.insertedAt&&new Date().getTime()-new Date(t.insertedAt).getTime()<pe)return l.debug("Spy cache still valid"),Promise.resolve(t);l.debug("Spy cache expired, fetching new data"),u.setJSON(`spy-${n}`,null);}const e={apiKey:u.get("tsc-key")??"",userId:n};return new Promise((o,s)=>{(GM.xmlHttpRequest??GM.xmlhttpRequest)({method:"POST",url:"https://tsc.diicot.cc/next",timeout:3e4,headers:{Authorization:"10000000-6000-0000-0009-000000000001","x-requested-with":"XMLHttpRequest","Content-Type":"application/json"},data:JSON.stringify(e),onload(a){const i=JSON.parse(a.responseText);!("error"in i)&&i.success&&u.setJSON(`spy-${n}`,{...i,insertedAt:new Date().getTime()}),o(i);},onerror(a){l.debug("Data used: ",e),o({error:!0,message:`Failed to fetch spy ${a.statusText}`});},onabort(){o({error:!0,message:"Request aborted"});},ontimeout(){o({error:!0,message:"Request timed out"});}});})}async function Ee(){if(u.get("tsc-key")===null)return {error:!0,message:"API Key not set"};const n=u.getJSON("user-data");if(n){if(n.insertedAt&&new Date().getTime()-new Date(n.insertedAt).getTime()<pe)return l.debug("User data cache still valid"),n;l.debug("User data cache expired, fetching new data"),u.setJSON("user-data",null);}const t=await fetch(`https://api.torn.com/user/?selections=basic&key=${u.get("tsc-key")}&comment=TSC-Next`);if(!t.ok)return {error:!0,message:t.statusText};const e=await t.json();return e.error?{error:!0,message:e.error.error}:(u.setJSON("user-data",{...e,insertedAt:new Date().getTime()}),e)}function x(n,t){return new Promise((e,o)=>{let s;if(document.querySelectorAll(n).length)return e(document.querySelector(n));const r=new MutationObserver(()=>{if(document.querySelectorAll(n).length)return r.disconnect(),s!=null&&clearTimeout(s),e(document.querySelector(n))});r.observe(document.body,{childList:!0,subtree:!0}),t&&(s=setTimeout(()=>{r.disconnect(),e(null);},t));})}const xe=".settings-menu > .link > a:first-child";async function Q(){var t;const n=await x(xe,15e3);return n===null?"":((t=n.href.match(/XID=(\d+)/))==null?void 0:t[1])??""}function b(n,t=2){return Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:t,minimumFractionDigits:t}).format(n)}function H(n){const{estimate:t,statInterval:e}=n.spy;let o=b(t.stats,1),s=`Estimate: ${b(t.stats,2)}`;return e!=null&&e.battleScore&&(o=`${b(BigInt(e.min),1)} - ${b(BigInt(e.max),1)}`,s+=`<br>Interval: ${b(BigInt(e.min),2)} - ${b(BigInt(e.max),2)}<br>Battle Score: ${b(e.battleScore,2)}`),{spyText:o,tooltipText:s}}function Te(n){const{estimate:t,statInterval:e}=n.spy;let o="",s=`Estimate: ${b(t.stats)}`,r=`Estimate: ${new Date(t.lastUpdated).toLocaleDateString()}`;return e!=null&&e.battleScore&&(o=`${b(BigInt(e.min))} - ${b(BigInt(e.max))} / FF: ${e.fairFight}`,r+=`<br>Interval: ${new Date(e.lastUpdated).toLocaleDateString()}`),{longTextInterval:o,longTextEstimate:s,toolTipText:r}}function ee(n){const t=new Date().getTime()-n.getTime(),e=Math.floor(t/(1e3*60)),o=Math.floor(e/60),s=Math.floor(o/24),r=Math.floor(s/30),a=Math.floor(r/12);if(a>0){const i=r%12;return `${a} year${a>1?"s":""}, ${i} month${i>1?"s":""}`}else if(r>0){const i=s%30;return `${r} month${r>1?"s":""}, ${i} day${i>1?"s":""}`}else if(s>0){const i=o%24;return `${s} day${s>1?"s":""}, ${i} hour${i>1?"s":""}`}else if(o>0){const i=e%60;return `${o} hour${o>1?"s":""}, ${i} minute${i>1?"s":""}`}else return `${e} minute${e>1?"s":""}`}class k{constructor({name:t,description:e,shouldRun:o,start:s}){L(this,"name");L(this,"description");L(this,"shouldRun");L(this,"start");this.name=t,this.description=e,this.shouldRun=o,this.start=s;}}const Se=".empty-block",Ce=new k({name:"Profile Page",description:"Shows a user's spy on their profile page",shouldRun:async function(){return u.getToggle(this.name)&&window.location.pathname==="/profiles.php"},start:async function(){const n=await x(Se,15e3);if(n===null){l.warn(`${this.name}: Could not find the empty block on the profile page`);return}if(!u.get("tsc-key"))return;const t=window.location.search.split("XID=")[1];if(!t){l.error(`${this.name}: Could not find the user's ID`);return}$(n).append($("<img>").addClass("tsc-loader")).css({display:"flex","justify-content":"center","align-items":"center"});const e=await R(t);if($(n).empty(),"error"in e||e.success!==!0){l.error(`${this.name}: Failed to fetch spy`,e),"error"in e?$(n).append($("<div>").text(e.message)):$(n).append($("<div>").text(fe(e.code)));return}const{estimate:o,statInterval:s}=e.spy;let r=$("<table>").addClass("tsc-stat-table").attr("title",`Inteval: ${s!=null&&s.lastUpdated?new Date(s.lastUpdated).toLocaleString():"N/A"}<br>Estimate: ${new Date(o.lastUpdated).toLocaleString()}<br>Cache: ${new Date(e.insertedAt).toLocaleString()}`);if(s!=null&&s.battleScore){const{min:a,max:i,fairFight:d,lastUpdated:m}=s,{stats:g}=o;r.append($("<tr>").append($("<th>").text("Estimate")).append($("<th>").text("Interval")).append($("<th>").text("Int. Age")).append($("<th>").text("Fair Fight"))),r.append($("<tr>").append($("<td>").text(b(BigInt(g)))).append($("<td>").text(`${b(BigInt(a))} - ${b(BigInt(i))}`)).append($("<td>").text(ee(new Date(m)))).append($("<td>").text(d)));}else {const{stats:a,lastUpdated:i}=o;r.append($("<tr>").append($("<th>").text("Estimate")).append($("<th>").text("Est. Age"))),r.append($("<tr>").append($("<td>").text(b(BigInt(a)))).append($("<td>").text(ee(new Date(i)))));}$(n).append(r);}}),ve=".faction-info-wrap.restyle.another-faction .table-body > li:nth-child(1)",Oe='[class*="userInfoBox"]',ke='a[href^="/profiles.php?XID="]',De=new k({name:"Faction - Normal",description:"Shows a list of spies on the faction page",shouldRun:async function(){return u.getToggle(this.name)&&window.location.href.includes("factions.php?step=profile")},start:async function(){const n=await x(ve,15e3);if(n===null){l.warn(`${this.name}: Failed to find element to append to.`);return}const t=$(n).parent()[0];$(t).children("li").each((e,o)=>{const s=$(o).find(Oe)[0];//! This is a bit of a hack, but it works for now
	if($(s).css("width","169px"),$(s).css("overflow","hidden"),$(s).css("text-overflow","ellipsis"),s===void 0){l.debug(`${this.name}: Failed to find the player's profile box.`,o);return}const r=$(s).find(ke)[0];if(r===void 0){l.debug(`${this.name}: Failed to find user's ID`,s);return}const a=r.href.split("XID=")[1];R(a).then(i=>{if("error"in i||i.success!==!0){l.warn(`${this.name}: Failed to find spy for ${a}`,i);return}const{spyText:d,tooltipText:m}=H(i);$(s).after($("<div>").addClass("tsc-faction-spy").text(d).attr("title",m));});});}}),te=(n,t)=>Array.prototype.slice.call(n,t);let M=null;typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?M=self:typeof global<"u"?M=global:window&&(M=window);const _=M,K=M.document,ne=["load","loadend","loadstart"],J=["progress","abort","error","timeout"],he=n=>["returnValue","totalSize","position"].includes(n),q=function(n,t){for(let e in n){if(he(e))continue;const o=n[e];try{t[e]=o;}catch{}}return t},se=function(n,t,e){const o=s=>function(r){const a={};for(let i in r){if(he(i))continue;const d=r[i];a[i]=d===t?e:d;}return e.dispatchEvent(s,a)};for(let s of Array.from(n))e._has(s)&&(t[`on${s}`]=o(s));},Ie=function(n){if(K&&K.createEventObject!=null){const t=K.createEventObject();return t.type=n,t}try{return new Event(n)}catch{return {type:n}}},U=function(n){let t={};const e=s=>t[s]||[],o={};return o.addEventListener=function(s,r,a){t[s]=e(s),!(t[s].indexOf(r)>=0)&&(a=a===void 0?t[s].length:a,t[s].splice(a,0,r));},o.removeEventListener=function(s,r){if(s===void 0){t={};return}r===void 0&&(t[s]=[]);const a=e(s).indexOf(r);a!==-1&&e(s).splice(a,1);},o.dispatchEvent=function(){const s=te(arguments),r=s.shift();n||(s[0]=q(s[0],Ie(r)),Object.defineProperty(s[0],"target",{writable:!1,value:this}));const a=o[`on${r}`];a&&a.apply(o,s);const i=e(r).concat(e("*"));for(let d=0;d<i.length;d++)i[d].apply(o,s);},o._has=s=>!!(t[s]||o[`on${s}`]),n&&(o.listeners=s=>te(e(s)),o.on=o.addEventListener,o.off=o.removeEventListener,o.fire=o.dispatchEvent,o.once=function(s,r){var a=function(){return o.off(s,a),r.apply(null,arguments)};return o.on(s,a)},o.destroy=()=>t={}),o},me=`\r
`,Re=function(n){return Object.entries(n).map(([o,s])=>`${o.toLowerCase()}: ${s}`).join(me)},Fe=function(n,t){const e=n.split(me);t==null&&(t={});for(let o of e)if(/([^:]+):\s*(.+)/.test(o)){const s=RegExp.$1!=null?RegExp.$1.toLowerCase():void 0,r=RegExp.$2;t[s]==null&&(t[s]=r);}return t},Le=function(n,t){switch(typeof n){case"object":return Re(n);case"string":return Fe(n,t)}return []};var G={convert:Le};const P=U(!0),oe=n=>n===void 0?null:n,A=_.XMLHttpRequest,I=function(){const t=new A,e={};let o=null,s,r,a;var i=0;const d=function(){if(a.status=o||t.status,o!==-1&&(a.statusText=t.statusText),o!==-1){const f=G.convert(t.getAllResponseHeaders());for(let p in f){const y=f[p];if(!a.headers[p]){const w=p.toLowerCase();a.headers[w]=y;}}return}},m=function(){if(!t.responseType||t.responseType==="text"){a.text=t.responseText,a.data=t.responseText;try{a.xml=t.responseXML;}catch{}}else t.responseType==="document"?(a.xml=t.responseXML,a.data=t.responseXML):a.data=t.response;"responseURL"in t&&(a.finalUrl=t.responseURL);},g=function(){c.status=a.status,c.statusText=a.statusText;},C=function(){"text"in a&&(c.responseText=a.text),"xml"in a&&(c.responseXML=a.xml),"data"in a&&(c.response=a.data),"finalUrl"in a&&(c.responseURL=a.finalUrl);},h=function(){s||c.dispatchEvent("load",{}),c.dispatchEvent("loadend",{}),s&&(c.readyState=0);},T=function(f){for(;f>i&&i<4;)c.readyState=++i,i===1&&c.dispatchEvent("loadstart",{}),i===2&&g(),i===4&&(g(),C()),c.dispatchEvent("readystatechange",{}),i===4&&(e.async===!1?h():setTimeout(h,0));},D=function(f){if(f!==4){T(f);return}const p=P.listeners("after");var y=function(){if(p.length>0){const w=p.shift();w.length===2?(w(e,a),y()):w.length===3&&e.async?w(e,a,y):y();}else T(4);};y();};var c=U();e.xhr=c,t.onreadystatechange=function(f){try{t.readyState===2&&d();}catch{}t.readyState===4&&(r=!1,d(),m()),D(t.readyState);};const O=function(){s=!0;};c.addEventListener("error",O),c.addEventListener("timeout",O),c.addEventListener("abort",O),c.addEventListener("progress",function(f){i<3?D(3):t.readyState<=3&&c.dispatchEvent("readystatechange",{});}),"withCredentials"in t&&(c.withCredentials=!1),c.status=0;for(let f of Array.from(J.concat(ne)))c[`on${f}`]=null;if(c.open=function(f,p,y,w,B){i=0,s=!1,r=!1,e.headers={},e.headerNames={},e.status=0,e.method=f,e.url=p,e.async=y!==!1,e.user=w,e.pass=B,a={},a.headers={},D(1);},c.send=function(f){let p,y;for(p of ["type","timeout","withCredentials"])y=p==="type"?"responseType":p,y in c&&(e[p]=c[y]);e.body=f;const w=function(){se(J,t,c),c.upload&&se(J.concat(ne),t.upload,c.upload),r=!0,t.open(e.method,e.url,e.async,e.user,e.pass);for(p of ["type","timeout","withCredentials"])y=p==="type"?"responseType":p,p in e&&(t[y]=e[p]);for(let v in e.headers){const F=e.headers[v];v&&t.setRequestHeader(v,F);}t.send(e.body);},B=P.listeners("before");var Z=function(){if(!B.length)return w();const v=function(S){if(typeof S=="object"&&(typeof S.status=="number"||typeof a.status=="number")){q(S,a),"data"in S||(S.data=S.response||S.text),D(4);return}Z();};v.head=function(S){q(S,a),D(2);},v.progress=function(S){q(S,a),D(3);};const F=B.shift();F.length===1?v(F(e)):F.length===2&&e.async?F(e,v):v();};Z();},c.abort=function(){o=-1,r?t.abort():c.dispatchEvent("abort",{});},c.setRequestHeader=function(f,p){const y=f!=null?f.toLowerCase():void 0,w=e.headerNames[y]=e.headerNames[y]||f;e.headers[w]&&(p=e.headers[w]+", "+p),e.headers[w]=p;},c.getResponseHeader=f=>oe(a.headers[f?f.toLowerCase():void 0]),c.getAllResponseHeaders=()=>oe(G.convert(a.headers)),t.overrideMimeType&&(c.overrideMimeType=function(){t.overrideMimeType.apply(t,arguments);}),t.upload){let f=U();c.upload=f,e.upload=f;}return c.UNSENT=0,c.OPENED=1,c.HEADERS_RECEIVED=2,c.LOADING=3,c.DONE=4,c.response="",c.responseText="",c.responseXML=null,c.readyState=0,c.statusText="",c};I.UNSENT=0;I.OPENED=1;I.HEADERS_RECEIVED=2;I.LOADING=3;I.DONE=4;var z={patch(){A&&(_.XMLHttpRequest=I);},unpatch(){A&&(_.XMLHttpRequest=A);},Native:A,Xhook:I};function _e(n,t){var e={};for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&t.indexOf(o)<0&&(e[o]=n[o]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,o=Object.getOwnPropertySymbols(n);s<o.length;s++)t.indexOf(o[s])<0&&Object.prototype.propertyIsEnumerable.call(n,o[s])&&(e[o[s]]=n[o[s]]);return e}function Ae(n,t,e,o){function s(r){return r instanceof e?r:new e(function(a){a(r);})}return new(e||(e=Promise))(function(r,a){function i(g){try{m(o.next(g));}catch(C){a(C);}}function d(g){try{m(o.throw(g));}catch(C){a(C);}}function m(g){g.done?r(g.value):s(g.value).then(i,d);}m((o=o.apply(n,[])).next());})}const N=_.fetch;function Ne(n){const t=["method","headers","body","mode","credentials","cache","redirect","referrer","referrerPolicy","integrity","keepalive","signal","url"];let e={};return t.forEach(o=>e[o]=n[o]),e}function re(n){return n instanceof Headers?ae([...n.entries()]):Array.isArray(n)?ae(n):n}function ae(n){return n.reduce((t,[e,o])=>(t[e]=o,t),{})}const ie=function(n,t={headers:{}}){let e=Object.assign(Object.assign({},t),{isFetch:!0});if(n instanceof Request){const r=Ne(n),a=Object.assign(Object.assign({},re(r.headers)),re(e.headers));e=Object.assign(Object.assign(Object.assign({},r),t),{headers:a,acceptedRequest:!0});}else e.url=n;const o=P.listeners("before"),s=P.listeners("after");return new Promise(function(r,a){let i=r;const d=function(h){if(!s.length)return i(h);const T=s.shift();return T.length===2?(T(e,h),d(h)):T.length===3?T(e,h,d):d(h)},m=function(h){if(h!==void 0){const T=new Response(h.body||h.text,h);r(T),d(T);return}g();},g=function(){if(!o.length){C();return}const h=o.shift();if(h.length===1)return m(h(e));if(h.length===2)return h(e,m)},C=()=>Ae(this,void 0,void 0,function*(){const{url:h,isFetch:T,acceptedRequest:D}=e,c=_e(e,["url","isFetch","acceptedRequest"]);return n instanceof Request&&c.body instanceof ReadableStream&&(c.body=yield new Response(c.body).text()),N(h,c).then(O=>d(O)).catch(function(O){return i=a,d(O),a(O)})});g();})};var V={patch(){N&&(_.fetch=ie);},unpatch(){N&&(_.fetch=N);},Native:N,Xhook:ie};const E=P;E.EventEmitter=U;E.before=function(n,t){if(n.length<1||n.length>2)throw "invalid hook";return E.on("before",n,t)};E.after=function(n,t){if(n.length<2||n.length>3)throw "invalid hook";return E.on("after",n,t)};E.enable=function(){z.patch(),V.patch();};E.disable=function(){z.unpatch(),V.unpatch();};E.XMLHttpRequest=z.Native;E.fetch=V.Native;E.headers=G.convert;E.enable();const ce='[class^="warListItem"][class*="first-in-row"]',Y='[class^="chain-attacks-list"]',Me='[class^="honorWrap"]',W=async()=>{$("*[class='respect']").css("margin-left","32px !important"),$("*[class='attack-number']").css("min-width","45px !important"),$(`${Y} li`).each(function(n,t){const e=$(t).find(Me);for(let o=0;o<=1;o++){const s=e[o],r=$(s).find("a").attr("href");if(!r){l.warn("Faction - Chain: Failed to find ID.");return}const a=r.split("XID=")[1];R(a).then(i=>{if("error"in i||i.success!==!0){l.warn(`Faction - Chain: Failed to find spy for ${a}`,i);return}const{spyText:d,tooltipText:m}=H(i);$(s).find(".tsc-chain-spy").length>0||$(s).append($("<div>").addClass("tsc-chain-spy").text(d).attr("title",m));});}});},Pe=new k({name:"Faction - Chain",description:"Shows spies on the chain page",shouldRun:async function(){return !u.getToggle(this.name)||!window.location.href.includes("factions.php?step=your")?!1:await x(ce,15e3)!==null},start:async function(){let n=null;if(E.after(async(t,e)=>{if(t.url.includes("warID=chain")===!1)return;l.debug(`${this.name}: Found Chain War users request:`,t.url);const o=await x(Y,15e3);if(!o){l.error(`${this.name}: Could not find attacks list (element did not show up in time)`);return}n!==null&&(n.disconnect(),n=null),await W(),n=new MutationObserver(async s=>{let r=!1;$(`${ce} li`).each(function(a,i){r!==!0&&$(i).find(".tsc-chain-spy").length===0&&(r=!0,W());});}),n.observe(o,{childList:!0,subtree:!0});}),window.location.href.includes("war/chain")){if(!await x(Y,15e3)){l.error(`${this.name}: Could not find attacks list (element did not show up in time)`);return}await W();}}}),He='ul[class^="employees-list"]',Be='a[href^="/profiles.php?XID="]',Xe=new k({name:"Company Page",description:"Shows user spies on the company page",shouldRun:async function(){return u.getToggle(this.name)&&window.location.pathname==="/joblist.php"&&window.location.hash.includes("p=corpinfo")},start:async function(){const n=await x(He,15e3);if(n===null){l.warn(`${this.name}: Failed to find element to append to.`);return}l.debug(`${this.name}: Found users`,n),$(n).children("li").each((t,e)=>{const o=$(e).find(Be)[0];if(o===void 0){l.debug(`${this.name}: Failed to find user's ID`,e);return}const s=o.href.split("XID=")[1];l.debug(`${this.name}: Found user ID`,s),R(s).then(r=>{if("error"in r||r.success!==!0){l.warn(`${this.name}: Failed to find spy for ${s}`,r);return}const{spyText:a,tooltipText:i}=H(r);$(o).after($("<div>").addClass("tsc-company-spy").text(a).attr("title",i));});});}}),je='a[href^="/profiles.php?XID="]',qe='[class*="userInfoBox"]',le="div.member.icons.left",ue=async n=>{if(!await x(le,1e4)){l.error(`${n}: Could not find users`);return}$(le).each((e,o)=>{const s=$(o).find(je)[0];if(!s){l.error(`${n}: Could not find the user's Href`);return}const r=s.href.split("XID=")[1];if(!r){l.error(`${n}: Could not find the user's ID`);return}if(!$(o).find(qe)[0]){l.debug(`${n}: Could not find member's info box.`);return}if($(o).parent().find(".tsc-faction-war").length>0)return;const i=$("<div>").addClass("tsc-faction-war");i.append($("<img>").addClass("tsc-loader")),$(o).parent().append(i),R(r).then(d=>{if(i.empty(),"error"in d||d.success!==!0){l.warn(`${n}: Failed to find spy for ${r}`,d),"error"in d?$(i).append($("<span>").text(d.message)):$(i).append($("<span>").text(fe(d.code)));return}const{longTextInterval:m,longTextEstimate:g,toolTipText:C}=Te(d);i.attr("title",C).append($("<span>").text(g)),m!==""&&$(i).append($("<span>").text(m)),$(o).parent().append(i);});});},Ue=new k({name:"Faction - War",description:"Shows spies on the faction war page",shouldRun:async function(){return u.getToggle(this.name)&&window.location.href.includes("factions.php?step=")},start:async function(){E.after(async(n,t)=>{n.url.includes("&warID=rank")!==!1&&(l.debug(`${this.name}: Found Ranked War users request: ${n.url}`),await ue(this.name));}),window.location.href.includes("/war/rank")&&await ue(this.name);}}),Ke='ul[class^="users-list"]',Je='a[href^="/profiles.php?XID="]',We=new k({name:"Abroad Page",description:"Shows user spies on the abroad people's page",shouldRun:async function(){return u.getToggle(this.name)&&window.location.pathname==="/index.php"&&window.location.search.includes("?page=people")},start:async function(){const n=await x(Ke,15e3);if(n===null){l.warn(`${this.name}: Failed to find element to append to.`);return}l.debug(`${this.name}: Found users`,n),$(n).children("li").each((t,e)=>{const o=$(e).find(Je)[0];if(o===void 0){l.debug(`${this.name}: Failed to find user's ID`,e);return}const s=o.href.split("XID=")[1];l.debug(`${this.name}: Found user ID`,s),R(s).then(r=>{if("error"in r||r.success!==!0){l.warn(`${this.name}: Failed to find spy for ${s}`,r);return}const{spyText:a,tooltipText:i}=H(r);$(o).append($("<div>").addClass("tsc-abroad-spy").text(a).attr("title",i).css("font-size","0.8em"));});});}}),Ge="div.points-market > div.chart-main-wrap > ul:nth-of-type(2)",Ye='a[href^="/profiles.php?XID="]',ze=new k({name:"Points Market",description:"Shows user spies on the points market",shouldRun:async function(){return u.getToggle(this.name)&&window.location.pathname==="/pmarket.php"},start:async function(){const n=await x(Ge,15e3);if(n===null){l.warn(`${this.name}: Failed to find element to append to.`);return}l.debug(`${this.name}: Found users`,n),$(n).children("li").each((t,e)=>{const o=$(e).find(Ye)[0];if(o===void 0){l.debug(`${this.name}: Failed to find user's ID`,e);return}const s=o.href.split("XID=")[1];l.debug(`${this.name}: Found user ID`,s),R(s).then(r=>{if("error"in r||r.success!==!0){l.warn(`${this.name}: Failed to find spy for ${s}`,r);return}const{spyText:a,tooltipText:i}=H(r);$(o).after($("<div>").addClass("tsc-points-market-spy").text(a).attr("title",i));});});}}),ge=Object.freeze(Object.defineProperty({__proto__:null,AbroadPage:We,CompanyPage:Xe,FactionChain:Pe,FactionNormal:De,FactionWar:Ue,PointsMarket:ze,ProfilePage:Ce},Symbol.toStringTag,{value:"Module"})),Ve=".profile-wrapper",Ze=".empty-block",de=new k({name:"Settings Panel",description:"Adds a settings panel to your own profile page.",shouldRun:async function(){var o;if(window.location.href.includes("profiles.php?XID=")===!1)return !1;const n=(o=window.location.href.match(/XID=(\d+)/))==null?void 0:o[1],t=await Q(),e=await x(Ze,15e3);if(e===null)return l.warn(`${this.name}: Could not find the empty block on the profile page`),n===t;if(!u.get("tsc-key")){const s=$("<a>").attr("href",`https://www.torn.com/profiles.php?XID=${await Q()}`).text("your own profile");$(e).append($("<div>").html("Please enter your TSC API key on ").append(s).append(".")).css({display:"flex","justify-content":"center","align-items":"center"});}return n===t},start:async function(){var o;const n=await x(Ve,15e3);if(n===null){l.warn(`${this.name}: Failed to find element to append to.`);return}if((o=n.nextElementSibling)!=null&&o.classList.contains("tsc-accordion")){l.warn(`${this.name}: Element already exists`);return}const t=await Ee(),e="error"in t?$("<div>").text("Welcome!"):$("<div>").html(`Hey, ${$("<div>").addClass("tsc-header-username").text(t.name).prop("outerHTML")}!`);$(n).after($("<details>").addClass("tsc-accordion").addClass(u.get("tsc-key")?"":"tsc-glow").append($("<summary>").text("TSC Settings")).append($("<div>").addClass("tsc-header").append(e),$("<p>").css("margin-top","5px").text("This is the settings panel for the Torn Spies Central script."),$("<p>").text("Here you can configure the settings to your liking. Please note that changes will be saved automatically."),$("<p>").css("margin-top","5px").text("Note: Currently, the script works best with honor bars turned off. If you have them on, all spies (except on the profile page) will be unreadable. You can manage this in Settings -> General Settings -> Honor Names -> Off"),$("<br>"),$("<div>").addClass("tsc-setting-entry").append($("<input>").attr("type","checkbox").attr("id","enabled").prop("checked",u.getToggle("enabled")).on("change",function(){u.set("enabled",$(this).prop("checked"));})).append($("<p>").text("Enable Script")),$("<div>").addClass("tsc-setting-entry").append($("<label>").attr("for","api-key").text("API Key"),$("<input>").attr("type","text").attr("id","api-key").attr("placeholder","Paste your key here...").addClass("tsc-key-input").addClass(u.get("tsc-key")?"tsc-blur":"").val(u.get("tsc-key")||"").on("change",function(){const s=$(this).val();if(typeof s=="string"){if(!/^[a-zA-Z0-9]{16}$/.test(s)){$(this).css("outline","1px solid red");return}$(this).css("outline","none"),s!==u.get("tsc-key")&&u.set("tsc-key",s);}})),$("<br>"),$("<p>").text("Feature toggles:"),Object.values(ge).map(s=>$("<div>").append($("<div>").addClass("tsc-setting-entry").append($("<input>").attr("type","checkbox").attr("id",s.name).prop("checked",u.getToggle(s.name)).on("change",function(){u.set(s.name,$(this).prop("checked"));})).append($("<p>").text(s.name))).append($("<p>").text(s.description))),$("<br>"),$("<p>").text("The following buttons require a confirmation before anything is deleted.").css("margin-bottom","10px"),$("<button>").text("Clear cached spies").addClass("tsc-button").css("margin-right","10px").on("click",async function(){if(!confirm("Are you sure you want to clear cached spies?"))return;const r=u.spyClear();l.debug(`Cleared ${r} spies from cache.`);const a=$(this);a.animate({opacity:0},"slow",function(){a.text(`Cleared ${r} spies`);}).animate({opacity:1},"slow"),setTimeout(function(){a.animate({opacity:0},"slow",function(){a.text("Clear cached spies");}).animate({opacity:1},"slow");},3e3);}),$("<button>").text("Clear all cache").addClass("tsc-button").on("click",async function(){if(!confirm("Are you sure you want to clear all cache?"))return;const r=u.fullClear();l.debug(`Cleared ${r} items in cache.`);const a=$(this);a.animate({opacity:0},"slow",function(){a.text(`Cleared ${r} items`);}).animate({opacity:1},"slow"),setTimeout(function(){a.animate({opacity:0},"slow",function(){a.text("Clear all cache");}).animate({opacity:1},"slow");},3e3);}),$("<br>"),$("<br>"),$("<p>").text("Debug settings:"),$("<div>").addClass("tsc-setting-entry").append($("<input>").attr("type","checkbox").attr("id","debug-logs").prop("checked",u.getToggle("debug-logs")).on("change",function(){u.set("debug-logs",$(this).prop("checked"));})).append($("<p>").text("Extra debug logs"))));}});async function Qe(){if(await de.shouldRun()===!0&&(l.info("Settings panel initialized"),await de.start()),u.getToggle("enabled")===!1){l.info("TSC is disabled");return}l.info("Starting TSC features...");for(const n of Object.values(ge))if(await n.shouldRun()!==!1)try{await n.start(),l.info(`'${n.name}' started`);}catch(t){l.error(`Failed to start '${n.name}'`,t);}}Qe().catch(n=>{l.error("TSC failed catastrophically:",n);});

})();