(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-470d8da4"],{"0a06":function(e,t,n){"use strict";var o=n("c532"),r=n("30b5"),i=n("f6b4"),s=n("5270"),a=n("4a7b");function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"===typeof e?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=a(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[s,void 0],n=Promise.resolve(e);this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));while(t.length)n=n.then(t.shift(),t.shift());return n},c.prototype.getUri=function(e){return e=a(this.defaults,e),r(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},o.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,n){return this.request(a(n||{},{method:e,url:t,data:(n||{}).data}))}})),o.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,n,o){return this.request(a(o||{},{method:e,url:t,data:n}))}})),e.exports=c},"0df6":function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},"1d2b":function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),o=0;o<n.length;o++)n[o]=arguments[o];return e.apply(t,n)}}},2444:function(e,t,n){"use strict";(function(t){var o=n("c532"),r=n("c8af"),i={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function a(){var e;return("undefined"!==typeof XMLHttpRequest||"undefined"!==typeof t&&"[object process]"===Object.prototype.toString.call(t))&&(e=n("b50d")),e}var c={adapter:a(),transformRequest:[function(e,t){return r(t,"Accept"),r(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(s(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"===typeof e)try{e=JSON.parse(e)}catch(t){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};o.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),o.forEach(["post","put","patch"],(function(e){c.headers[e]=o.merge(i)})),e.exports=c}).call(this,n("4362"))},"2d83":function(e,t,n){"use strict";var o=n("387f");e.exports=function(e,t,n,r,i){var s=new Error(e);return o(s,t,n,r,i)}},"2e67":function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},"30b5":function(e,t,n){"use strict";var o=n("c532");function r(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,(function(e,t){null!==e&&"undefined"!==typeof e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,(function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))})))})),i=s.join("&")}if(i){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},"387f":function(e,t,n){"use strict";e.exports=function(e,t,n,o,r){return e.config=t,n&&(e.code=n),e.request=o,e.response=r,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},3934:function(e,t,n){"use strict";var o=n("c532");e.exports=o.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function r(e){var o=e;return t&&(n.setAttribute("href",o),o=n.href),n.setAttribute("href",o),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=r(window.location.href),function(t){var n=o.isString(t)?r(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return function(){return!0}}()},"467f":function(e,t,n){"use strict";var o=n("2d83");e.exports=function(e,t,n){var r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(o("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},"4a7b":function(e,t,n){"use strict";var o=n("c532");e.exports=function(e,t){t=t||{};var n={},r=["url","method","data"],i=["headers","auth","proxy","params"],s=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],a=["validateStatus"];function c(e,t){return o.isPlainObject(e)&&o.isPlainObject(t)?o.merge(e,t):o.isPlainObject(t)?o.merge({},t):o.isArray(t)?t.slice():t}function u(r){o.isUndefined(t[r])?o.isUndefined(e[r])||(n[r]=c(void 0,e[r])):n[r]=c(e[r],t[r])}o.forEach(r,(function(e){o.isUndefined(t[e])||(n[e]=c(void 0,t[e]))})),o.forEach(i,u),o.forEach(s,(function(r){o.isUndefined(t[r])?o.isUndefined(e[r])||(n[r]=c(void 0,e[r])):n[r]=c(void 0,t[r])})),o.forEach(a,(function(o){o in t?n[o]=c(e[o],t[o]):o in e&&(n[o]=c(void 0,e[o]))}));var f=r.concat(i).concat(s).concat(a),l=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===f.indexOf(e)}));return o.forEach(l,u),n}},5270:function(e,t,n){"use strict";var o=n("c532"),r=n("c401"),i=n("2e67"),s=n("2444");function a(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){a(e),e.headers=e.headers||{},e.data=r(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),o.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]}));var t=e.adapter||s.adapter;return t(e).then((function(t){return a(e),t.data=r(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(a(e),t&&t.response&&(t.response.data=r(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},"5f02":function(e,t,n){"use strict";e.exports=function(e){return"object"===typeof e&&!0===e.isAxiosError}},6604:function(e,t,n){"use strict";n("e013")},"7a77":function(e,t,n){"use strict";function o(e){this.message=e}o.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},o.prototype.__CANCEL__=!0,e.exports=o},"7aac":function(e,t,n){"use strict";var o=n("c532");e.exports=o.isStandardBrowserEnv()?function(){return{write:function(e,t,n,r,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),o.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),o.isString(r)&&a.push("path="+r),o.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},"83b9":function(e,t,n){"use strict";var o=n("d925"),r=n("e683");e.exports=function(e,t){return e&&!o(t)?r(e,t):t}},"896c":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("h4",[e._v("Current Jobs ("+e._s(e.jobs.length)+")")]),n("b-table",{attrs:{"sticky-header":"",striped:"",hover:"",items:e.jobs},scopedSlots:e._u([{key:"cell(samples)",fn:function(t){return["No samples yet"!==t.value?n("a",{attrs:{href:t.value}},[e._v("download")]):n("a",[e._v(e._s(t.value))])]}},{key:"cell(rounded_model)",fn:function(t){return["Model not preprocessed yet"!==t.value?n("a",{attrs:{href:t.value}},[e._v("download")]):n("a",[e._v(e._s(t.value))])]}}])}),n("button",{staticClass:"m-3 btn btn-sm btn-danger float-right",on:{click:e.removeAllJobs}},[e._v(" Remove All ")]),n("button",{staticClass:"m-3 btn btn-sm btn-warning float-right",on:{click:function(t){e.showModal=!e.showModal}}},[e._v(" Remove Single Job ")]),n("button",{staticClass:"m-3 btn btn-sm btn-success float-right",on:{click:function(t){e.showAddModal=!e.showAddModal}}},[e._v(" Add Job ")]),n("b-modal",{attrs:{"ok-variant":"danger"},on:{ok:e.removeJob},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[n("h5",[e._v("Delete Job")]),e._v(" Enter ID of Job to delete "),n("b-form-input",{ref:"inputText1",attrs:{id:"inputText1",autofocus:""},model:{value:e.idToDelete,callback:function(t){e.idToDelete=t},expression:"idToDelete"}})],1),n("b-modal",{on:{ok:e.addJob},model:{value:e.showAddModal,callback:function(t){e.showAddModal=t},expression:"showAddModal"}},[n("h5",[e._v("Upload files for job")]),n("br"),n("span",[e._v("name for job")]),n("b-form-input",{ref:"inputText4",attrs:{id:"inputText4",autofocus:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),n("span",[e._v("model (SBML format)")]),n("b-form-file",{ref:"inputText2",attrs:{label:"model",accept:".xml",id:"inputText2",autofocus:""},model:{value:e.modelFile,callback:function(t){e.modelFile=t},expression:"modelFile"}}),n("span",[e._v("settings (JSON format)")]),n("b-form-file",{ref:"inputText3",attrs:{label:"settings",accept:".json",id:"inputText3",autofocus:""},model:{value:e.settingsFile,callback:function(t){e.settingsFile=t},expression:"settingsFile"}})],1)],1)])},r=[];n("b0c0");function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function a(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),e}var c=n("bc3a"),u=n.n(c),f=u.a.create({baseURL:"http://localhost:8080/api",headers:{"Content-type":"application/json"}}),l=function(){function e(){i(this,e)}return a(e,[{key:"getAll",value:function(){return f.get("/job")}},{key:"get",value:function(e){return f.get("/job/".concat(e))}},{key:"create",value:function(e){return console.log("send post with "+e.name),f.post("/job/"+e.name,e.form,{headers:{"Content-Type":"multipart/form-data"}})}},{key:"delete",value:function(e){return f.delete("/job/".concat(e))}},{key:"deleteAll",value:function(){return f.delete("/job")}},{key:"findByTitle",value:function(e){return f.get("/tutorials?title=".concat(e))}}]),e}(),d=new l,p={name:"jobs-list",data:function(){return{jobs:[],showModal:!1,showAddModal:!1,name:void 0,modelFile:void 0,settingsFile:void 0,idToDelete:void 0,timer:void 0}},methods:{getJobs:function(){var e=this;d.getAll().then((function(t){e.jobs=t.data.jobs})).catch((function(e){console.log(e)}))},refreshList:function(){this.getJobs()},removeJob:function(){var e=this;console.log("Removing ".concat(this.idToDelete)),d.delete(this.idToDelete).then((function(t){console.log(t.data),e.idToDelete=void 0,e.refreshList()})).catch((function(e){console.log(e)}))},addJob:function(){var e=this,t={name:this.name,form:new FormData};console.log("adding data with name "+this.name),t.form.append("model",this.modelFile),t.form.append("settings",this.settingsFile),d.create(t).then((function(t){e.name=void 0,e.settingsFile=void 0,e.modelFile=void 0,e.refreshList(),console.log(t.data)})).catch((function(e){console.log(e)}))},removeAllJobs:function(){var e=this;d.deleteAll().then((function(t){console.log(t.data),e.refreshList()})).catch((function(e){console.log(e)}))}},mounted:function(){this.getJobs(),this.timer=setInterval((function(){}),5e3)},beforeDestroy:function(){clearInterval(this.timer)}},h=p,m=(n("6604"),n("2877")),v=Object(m["a"])(h,o,r,!1,null,null,null);t["default"]=v.exports},"8df4":function(e,t,n){"use strict";var o=n("7a77");function r(e){if("function"!==typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new o(e),t(n.reason))}))}r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r((function(t){e=t}));return{token:t,cancel:e}},e.exports=r},b0c0:function(e,t,n){var o=n("83ab"),r=n("9bf2").f,i=Function.prototype,s=i.toString,a=/^\s*function ([^ (]*)/,c="name";o&&!(c in i)&&r(i,c,{configurable:!0,get:function(){try{return s.call(this).match(a)[1]}catch(e){return""}}})},b50d:function(e,t,n){"use strict";var o=n("c532"),r=n("467f"),i=n("7aac"),s=n("30b5"),a=n("83b9"),c=n("c345"),u=n("3934"),f=n("2d83");e.exports=function(e){return new Promise((function(t,n){var l=e.data,d=e.headers;o.isFormData(l)&&delete d["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";d.Authorization="Basic "+btoa(h+":"+m)}var v=a(e.baseURL,e.url);if(p.open(e.method.toUpperCase(),s(v,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var o="getAllResponseHeaders"in p?c(p.getAllResponseHeaders()):null,i=e.responseType&&"text"!==e.responseType?p.response:p.responseText,s={data:i,status:p.status,statusText:p.statusText,headers:o,config:e,request:p};r(t,n,s),p=null}},p.onabort=function(){p&&(n(f("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){n(f("Network Error",e,null,p)),p=null},p.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(f(t,e,"ECONNABORTED",p)),p=null},o.isStandardBrowserEnv()){var b=(e.withCredentials||u(v))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;b&&(d[e.xsrfHeaderName]=b)}if("setRequestHeader"in p&&o.forEach(d,(function(e,t){"undefined"===typeof l&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)})),o.isUndefined(e.withCredentials)||(p.withCredentials=!!e.withCredentials),e.responseType)try{p.responseType=e.responseType}catch(g){if("json"!==e.responseType)throw g}"function"===typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"===typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),n(e),p=null)})),l||(l=null),p.send(l)}))}},bc3a:function(e,t,n){e.exports=n("cee4")},c345:function(e,t,n){"use strict";var o=n("c532"),r=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(o.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=o.trim(e.substr(0,i)).toLowerCase(),n=o.trim(e.substr(i+1)),t){if(s[t]&&r.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}})),s):s}},c401:function(e,t,n){"use strict";var o=n("c532");e.exports=function(e,t,n){return o.forEach(n,(function(n){e=n(e,t)})),e}},c532:function(e,t,n){"use strict";var o=n("1d2b"),r=Object.prototype.toString;function i(e){return"[object Array]"===r.call(e)}function s(e){return"undefined"===typeof e}function a(e){return null!==e&&!s(e)&&null!==e.constructor&&!s(e.constructor)&&"function"===typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function c(e){return"[object ArrayBuffer]"===r.call(e)}function u(e){return"undefined"!==typeof FormData&&e instanceof FormData}function f(e){var t;return t="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer,t}function l(e){return"string"===typeof e}function d(e){return"number"===typeof e}function p(e){return null!==e&&"object"===typeof e}function h(e){if("[object Object]"!==r.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function m(e){return"[object Date]"===r.call(e)}function v(e){return"[object File]"===r.call(e)}function b(e){return"[object Blob]"===r.call(e)}function g(e){return"[object Function]"===r.call(e)}function y(e){return p(e)&&g(e.pipe)}function w(e){return"undefined"!==typeof URLSearchParams&&e instanceof URLSearchParams}function x(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function j(){return("undefined"===typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!==typeof window&&"undefined"!==typeof document)}function A(e,t){if(null!==e&&"undefined"!==typeof e)if("object"!==typeof e&&(e=[e]),i(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.call(null,e[r],r,e)}function E(){var e={};function t(t,n){h(e[n])&&h(t)?e[n]=E(e[n],t):h(t)?e[n]=E({},t):i(t)?e[n]=t.slice():e[n]=t}for(var n=0,o=arguments.length;n<o;n++)A(arguments[n],t);return e}function C(e,t,n){return A(t,(function(t,r){e[r]=n&&"function"===typeof t?o(t,n):t})),e}function k(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}e.exports={isArray:i,isArrayBuffer:c,isBuffer:a,isFormData:u,isArrayBufferView:f,isString:l,isNumber:d,isObject:p,isPlainObject:h,isUndefined:s,isDate:m,isFile:v,isBlob:b,isFunction:g,isStream:y,isURLSearchParams:w,isStandardBrowserEnv:j,forEach:A,merge:E,extend:C,trim:x,stripBOM:k}},c8af:function(e,t,n){"use strict";var o=n("c532");e.exports=function(e,t){o.forEach(e,(function(n,o){o!==t&&o.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[o])}))}},cee4:function(e,t,n){"use strict";var o=n("c532"),r=n("1d2b"),i=n("0a06"),s=n("4a7b"),a=n("2444");function c(e){var t=new i(e),n=r(i.prototype.request,t);return o.extend(n,i.prototype,t),o.extend(n,t),n}var u=c(a);u.Axios=i,u.create=function(e){return c(s(u.defaults,e))},u.Cancel=n("7a77"),u.CancelToken=n("8df4"),u.isCancel=n("2e67"),u.all=function(e){return Promise.all(e)},u.spread=n("0df6"),u.isAxiosError=n("5f02"),e.exports=u,e.exports.default=u},d925:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},e013:function(e,t,n){},e683:function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},f6b4:function(e,t,n){"use strict";var o=n("c532");function r(){this.handlers=[]}r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=r}}]);
//# sourceMappingURL=chunk-470d8da4.15943318.js.map