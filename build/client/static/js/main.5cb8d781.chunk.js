(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{10:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(3),r=n.n(c),l=(n(9),n(1));var s=function(e){return o.a.createElement("div",{class:"flexbox-horizontal"},o.a.createElement("button",{onClick:function(){return e.ChangeEntityType("Category")}},"Categories"),o.a.createElement("button",{onClick:function(){return e.ChangeEntityType("Banner")}},"Banners"))};var i=function(e){var t,n="http://127.0.0.1:8080",c=Object(a.useState)([]),r=Object(l.a)(c,2),s=r[0],i=r[1],u=Object(a.useState)([""]),E=Object(l.a)(u,2),f=E[0],b=E[1],d=Object(a.useState)(!1),m=Object(l.a)(d,2),h=m[0],p=m[1];function g(){fetch(n+"/search/"+f+"/",{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){return i(e)})).catch((function(e){return console.log("Error "+e)}))}return h!==e.updateCommand&&p(e.updateCommand),Object(a.useEffect)((function(){g()}),[f]),Object(a.useEffect)((function(){!0===h&&g(),e.UpdateList(!1)}),[h]),e.entityType!==f&&("categories"===e.entityType&&b("categories"),"banners"===e.entityType&&b("banners"),g(),t=""),o.a.createElement("div",{class:"flexbox-vertical"},o.a.createElement("l1",{class:"center-text"},f),o.a.createElement("input",{type:"text",value:t,onChange:function(e){t=e.target.value;fetch(n+"/search/"+f+"/"+t,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){return i(e)})).catch((function(e){return console.log("Error "+e)}))},placeholder:"enter name..."})," ",s.map((function(t){return o.a.createElement("l1",{key:t.id,onClick:function(){return e.DisplayEntity(t.id)}},t.name)}))," ",o.a.createElement("button",{onClick:function(){return e.ChangeWorkMode("CREATE")}},"Create"))};var u=function(e){var t="http://127.0.0.1:8080",n=Object(a.useState)(),c=Object(l.a)(n,2),r=c[0],s=c[1],i=Object(a.useState)(""),u=Object(l.a)(i,2),E=u[0],f=u[1],b=Object(a.useState)(""),d=Object(l.a)(b,2),m=d[0],h=d[1],p=Object(a.useState)(""),g=Object(l.a)(p,2),j=g[0],y=g[1],O=Object(a.useState)(""),v=Object(l.a)(O,2),C=v[0],T=v[1],x=Object(a.useState)(""),k=Object(l.a)(x,2),S=k[0],I=k[1];return e.workMode!==j&&y(e.workMode),e.categoryId!==r&&s(e.categoryId),Object(a.useEffect)((function(){"CREATE"===j?(s(),f(""),h("")):"EDIT"===j&&(s(e.categoryId),fetch(t+"/category/"+r,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){f(e.name),h(e.reqName),console.log(e)})).catch((function(e){return console.log("Error: "+e)})))}),[j,e.categoryId]),o.a.createElement("form",{class:"flexbox-vertical"},"EDIT"===j&&o.a.createElement("span",{class:"flex-horizontal"},o.a.createElement("label",{class:"bold-text"},"Category Id:"),o.a.createElement("label",null,r)),o.a.createElement("label",{class:"flex-horizontal"}),o.a.createElement("label",{class:"flex-horizontal"},o.a.createElement("l1",{class:"bold-text"},"Name"),o.a.createElement("input",{type:"text",value:E,onChange:function(e){f(e.target.value)}})),o.a.createElement("label",{class:"flex-horizontal"},o.a.createElement("l1",{class:"bold-text"},"Request Id"),o.a.createElement("input",{type:"text",value:m,onChange:function(e){h(e.target.value)}})),S&&o.a.createElement("div",{id:"bid-msg",class:"alert"},o.a.createElement("span",{class:"closebtn",onClick:function(){document.getElementById("bid-msg").style.display="none",I("")}},"\xd7"),o.a.createElement("strong",null,"Result:")," ",S),C&&o.a.createElement("div",{id:"error-msg",class:"alert"},o.a.createElement("span",{class:"closebtn",onClick:function(){document.getElementById("error-msg").style.display="none",T("")}},"\xd7"),o.a.createElement("strong",null,"Error!")," ",C),o.a.createElement("div",{class:"flexbox-horizontal"},o.a.createElement("button",{onClick:function(n){var a,o;n.preventDefault(),"EDIT"===j?(a="PUT",o=r):(o=null,a="POST");var c={method:a,headers:{"Content-Type":"application/json"},body:JSON.stringify({id:o,name:E,reqName:m})};fetch(t+"/category",c).then((function(t){if(!t.ok)return t.json();e.UpdateList(!0,"CREATE",r)})).then((function(e){T(e.response)})).catch((function(e){return console.log("Error: "+e)}))}},e.workMode),o.a.createElement("button",{onClick:function(n){n.preventDefault(),fetch(t+"/category/"+r,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then((function(t){if(!t.ok)return t.json();e.UpdateList(!0,"DELETE")})).then((function(e){T(e.response)})).catch((function(e){return console.log("Error: "+e)}))}},"DELETE"),o.a.createElement("button",{onClick:function(e){e.preventDefault();fetch(t+"/bid/"+m,{method:"POST",headers:{"Content-Type":"application/json"}}).then((function(e){if(!e.ok)throw new Error(e.status);return e.json()})).then((function(e){return I(e.response)})).catch((function(e){console.log("Error: "+e),I("no banners to show")}))}},"REQUEST")))};var E=function(e){var t="http://127.0.0.1:8080",n=Object(a.useState)(),c=Object(l.a)(n,2),r=c[0],s=c[1],i=Object(a.useState)(""),u=Object(l.a)(i,2),E=u[0],f=u[1],b=Object(a.useState)(""),d=Object(l.a)(b,2),m=d[0],h=d[1],p=Object(a.useState)(),g=Object(l.a)(p,2),j=g[0],y=g[1],O=Object(a.useState)(),v=Object(l.a)(O,2),C=v[0],T=v[1],x=Object(a.useState)([]),k=Object(l.a)(x,2),S=k[0],I=k[1],w=Object(a.useState)(""),D=Object(l.a)(w,2),L=D[0],z=D[1],R=Object(a.useState)(""),U=Object(l.a)(R,2),M=U[0],A=U[1];return e.workMode!==M&&A(e.workMode),e.bannerId!==r&&s(e.bannerId),Object(a.useEffect)((function(){"CREATE"===M?(s(""),y(),f(""),h(""),T(""),document.getElementById("cat-select").value="none"):"EDIT"===M&&(s(e.bannerId),fetch(t+"/banner/"+r,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){f(e.name),y(e.category.name),h(e.price),T(e.content)})).catch((function(e){return console.log("Error: "+e)})));fetch(t+"/categories",{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){I(e)})).catch((function(e){return console.log("Error: "+e)}))}),[M,e.bannerId]),Object(a.useEffect)((function(){console.log("change category "+j)}),[j]),Object(a.useEffect)((function(){console.log("error message "+L)}),[L]),o.a.createElement("form",{class:"flexbox-vertical"},"EDIT"===M&&o.a.createElement("span",{class:"flex-horizontal"},o.a.createElement("label",{class:"bold-text"},"Id:"),o.a.createElement("label",null,r)),o.a.createElement("label",{class:"flexbox-horizontal"},o.a.createElement("l1",{class:"bold-text"},"Name"),o.a.createElement("input",{type:"text",value:E,onChange:function(e){f(e.target.value)}})),o.a.createElement("label",{class:"flexbox-horizontal"},o.a.createElement("l1",{class:"bold-text"},"Price"),o.a.createElement("input",{type:"number",value:m,onChange:function(e){h(e.target.value)}})),o.a.createElement("label",{class:"flexbox-horizontal"},o.a.createElement("l1",{class:"bold-text"},"Category"),o.a.createElement("select",{id:"cat-select",value:j,onChange:function(e){y(e.target.options[e.target.selectedIndex].text)}},o.a.createElement("option",{value:"none",selected:!0,disabled:!0,hidden:!0},"Select a Category"),S.map((function(e){return o.a.createElement("option",{key:e.id}," ",e.name)})))),o.a.createElement("span",{class:"flexbox-horizontal"},o.a.createElement("label",{class:"bold-text"},"Text"),o.a.createElement("textarea",{id:"banner-text-area",value:C,onChange:function(e){T(e.target.value)},rows:"3",cols:"20"})),L&&o.a.createElement("div",{id:"error-msg",class:"alert"},o.a.createElement("span",{class:"closebtn",onClick:function(e){document.getElementById("error-msg").style.display="none",z("")}},"\xd7"),o.a.createElement("strong",null,"Error!")," ",L),o.a.createElement("div",{class:"flexbox-horizontal"},o.a.createElement("button",{onClick:function(n){var a,o;n.preventDefault(),"EDIT"===M?(a="PUT",o=r):(a="POST",o=null);var c={method:a,headers:{"Content-Type":"application/json"},body:JSON.stringify({id:o,name:E,content:C,price:m})};fetch(t+"/banner/"+j,c).then((function(t){if(!t.ok)return t.json();e.UpdateList(!0,"CREATE",r)})).then((function(e){z(e.response)})).catch((function(e){return console.log("Error: "+e)}))}},e.workMode),o.a.createElement("button",{onClick:function(n){n.preventDefault();fetch(t+"/banner/"+r,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then((function(t){if(!t.ok)return t.json();e.UpdateList(!0,"DELETE")})).then((function(e){z(e.response)})).catch((function(e){return console.log("Error: "+e)}))}},"DELETE")))};var f=function(){var e,t=Object(a.useState)("categories"),n=Object(l.a)(t,2),c=n[0],r=n[1],f=Object(a.useState)("CREATE"),b=Object(l.a)(f,2),d=b[0],m=b[1],h=Object(a.useState)(""),p=Object(l.a)(h,2),g=p[0],j=p[1],y=Object(a.useState)(""),O=Object(l.a)(y,2),v=O[0],C=O[1],T=Object(a.useState)(!1),x=Object(l.a)(T,2),k=x[0],S=x[1];function I(e,t,n){S(e),("DELETE"===t||"CREATE"===t)&&m("CREATE"),"banners"===c?j():"categories"===c&&C()}return e="banners"===c?o.a.createElement(E,{bannerId:g,workMode:d,UpdateList:I}):o.a.createElement(u,{categoryId:v,workMode:d,UpdateList:I}),o.a.createElement("div",{class:"wrapper"},o.a.createElement("div",{class:"flexbox-horizontal"},o.a.createElement("div",{class:"flexbox-vertical"},o.a.createElement(s,{ChangeEntityType:function(e){r("Banner"===e?"banners":"categories"),m("CREATE")}}),o.a.createElement(i,{DisplayEntity:function(e){"categories"===c?C(e):"banners"===c&&j(e),m("EDIT")},ChangeWorkMode:function(e){m(e)},UpdateList:I,updateCommand:k,entityType:c})),e))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},4:function(e,t,n){e.exports=n(10)},9:function(e,t,n){}},[[4,1,2]]]);
//# sourceMappingURL=main.5cb8d781.chunk.js.map