(this["webpackJsonpreact-front"]=this["webpackJsonpreact-front"]||[]).push([[0],{64:function(e,t,c){},84:function(e,t,c){},85:function(e,t,c){},91:function(e,t,c){},94:function(e,t,c){"use strict";c.r(t);var n=c(0),s=c.n(n),a=c(11),i=c.n(a),r=(c(84),c(64),c(26)),o=c(149),l=c(150),j=c(142),b=c(151),h=c(147),d=c(148),x=(c(85),c(66)),u=c(158),O=c(146),m=c(144),p=c(145),v=c(143),f=c(157),g=c(155),C=c(159),S=c(2);function y(e){var t=Object(n.useState)(e.starting_value),c=Object(r.a)(t,2),s=c[0],a=c[1];return Object(S.jsx)("textarea",{type:"text",name:"user_prompt",value:s,fullWidth:!0,onChange:function(t){t.target.value.startsWith(e.starting_value)&&(a(t.target.value),e.onValueChange(t))}})}function P(e){var t=s.a.useState(e.value),c=Object(r.a)(t,2),n=c[0],a=c[1];return Object(S.jsxs)("div",{children:[Object(S.jsx)(C.a,{id:"demo-simple-select-label",children:"Classe"}),Object(S.jsxs)(g.a,{labelId:"SCP-Class",id:"scpClassSelect",value:n,onChange:function(t){a(t.target.value),e.onClassChange(t)},children:[Object(S.jsx)(f.a,{value:0,children:"Safe"}),Object(S.jsx)(f.a,{value:1,children:"Euclide"}),Object(S.jsx)(f.a,{value:2,children:"Keter"}),Object(S.jsx)(f.a,{value:3,children:"Thomiel"})]})]})}function N(){var e=s.a.useState(!1),t=Object(r.a)(e,2),c=t[0],n=t[1],a=s.a.useState(""),i=Object(r.a)(a,2),o=i[0],l=i[1],b=s.a.useState(0),h=Object(r.a)(b,2),d=h[0],x=h[1],f=function(){n(!1)};return Object(S.jsxs)("div",{children:[Object(S.jsx)(j.a,{variant:"contained",color:"primary",onClick:function(){n(!0)},fullWidth:!0,children:Object(S.jsx)("h3",{children:"Submit a prompt !"})}),Object(S.jsxs)(u.a,{fullWidth:!0,maxWidth:"sm",open:c,onClose:f,"aria-labelledby":"form-dialog-title",children:[Object(S.jsx)(v.a,{id:"form-dialog-title",children:"Submit your SCP idea !"}),Object(S.jsxs)(m.a,{children:[Object(S.jsx)(p.a,{children:"Describe your SCP :"}),Object(S.jsx)(y,{starting_value:"SCP 104 is ",onValueChange:function(e){l(e.target.value)}}),Object(S.jsx)("br",{}),Object(S.jsx)("br",{}),Object(S.jsx)(P,{onClassChange:function(e){console.log(e.target.value),x(e.target.value)},value:d})]}),Object(S.jsxs)(O.a,{children:[Object(S.jsx)(j.a,{onClick:f,color:"primary",children:"Cancel"}),Object(S.jsx)(j.a,{onClick:function(){var e="https://thisscpdoesnotexist.pythonanywhere.com/add_prompt/?prompt="+o+"&class="+d.toString()+"&ip="+Math.floor(100*Math.random()).toString();fetch(e,{mode:"no-cors"}),console.log("fetched"),f()},color:"primary",children:"Submit"})]})]})]})}var k=Object(h.a)({root:{maxWidth:500},title:{fontSize:14},Card:{marginBottom:"-50%"}});function w(e){var t=k();t.root,e.scpClass;return Object(S.jsx)(d.a,{item:!0,xs:12,sm:6,md:3,children:Object(S.jsx)(o.a,{className:t.root,children:Object(S.jsxs)(l.a,{children:[Object(S.jsx)(x.a,{bg:"Keter"==e.scpClass?"danger":"Euclid"==e.scpClass?"warning":"success",children:e.scpClass}),Object(S.jsx)("br",{}),Object(S.jsx)("br",{}),e.prompt,Object(S.jsx)(b.a,{children:Object(S.jsxs)(j.a,{size:"small",onClick:function(){fetch("https://thisscpdoesnotexist.pythonanywhere.com/vote/?n=0&ip="+Math.floor(100*Math.random()).toString())},children:[Object(S.jsx)("strong",{children:"Votes !"})," (",e.votes,")"]})})]})})})}function _(e){var t=e.pollingItems.map((function(e){return Object(S.jsx)(w,{prompt:e.prompt,scpClass:e.scpClass,votes:e.votes})}));return Object(S.jsx)("div",{className:"poll-list",children:Object(S.jsx)(d.a,{container:!0,spacing:3,children:t})})}var M=function(){var e=Object(n.useState)([]),t=Object(r.a)(e,2),c=t[0],s=t[1];return Object(n.useEffect)((function(){fetch("https://thisscpdoesnotexist.pythonanywhere.com/get_poll/").then((function(e){return e.json()})).then((function(e){s(e.poll)}))}),[]),Object(S.jsxs)("div",{className:"CurrentPoll",children:[Object(S.jsx)("strong",{children:"Current Poll :"}),Object(S.jsx)("br",{}),Object(S.jsx)("br",{}),Object(S.jsx)(_,{pollingItems:c}),Object(S.jsx)("br",{}),Object(S.jsx)("br",{}),Object(S.jsx)(N,{className:"openDialogBtn"})]})},E=c(154);function I(e){return e.data.map((function(e,t){return Object(S.jsxs)(E.a.Item,{eventKey:t.toString(),children:[Object(S.jsx)(E.a.Header,{children:Object(S.jsx)("strong",{children:e.prompt})}),Object(S.jsx)(E.a.Body,{children:Object(S.jsx)("div",{dangerouslySetInnerHTML:{__html:e.text}})})]})}))}var T=function(){var e=Object(n.useState)([]),t=Object(r.a)(e,2),c=t[0],s=t[1];return Object(n.useEffect)((function(){fetch("http://thisscpdoesnotexist.pythonanywhere.com/past_scps/").then((function(e){return e.json()})).then((function(e){s(e.scps),console.log("in fetch"),console.log(c)}))}),[]),console.log("bbbbbbb"),console.log(c),Object(S.jsxs)("div",{className:"PastScp",children:[Object(S.jsx)("h2",{children:" List of Past SCPs"}),Object(S.jsx)(E.a,{children:Object(S.jsx)(I,{data:c})})]})},B=(c(90),c(91),c(23)),D=c(13);Object(D.f)((function(e){return Object(S.jsx)("div",{className:"navigation",children:Object(S.jsx)("nav",{class:"navbar navbar-expand navbar-dark bg-dark",children:Object(S.jsxs)("div",{class:"container",children:[Object(S.jsx)(B.b,{class:"navbar-brand",to:"/",children:"This SCP Does Not Exist !"}),Object(S.jsx)("div",{children:Object(S.jsxs)("ul",{class:"navbar-nav ml-auto",children:[Object(S.jsx)("li",{class:"nav-item  ".concat("/"===e.location.pathname?"active":""),children:Object(S.jsx)(B.b,{class:"nav-link",to:"/",children:"Poll"})}),Object(S.jsx)("li",{class:"nav-item  ".concat("/list"===e.location.pathname?"active":""),children:Object(S.jsx)(B.b,{class:"nav-link",to:"/list",children:"List SCPs"})}),Object(S.jsx)("li",{class:"nav-item  ".concat("/about"===e.location.pathname?"active":""),children:Object(S.jsx)(B.b,{class:"nav-link",to:"/about",children:"About"})})]})})]})})})}));var F=function(){return Object(S.jsx)("div",{className:"App",children:"Made using the power of GPT-3"})};var W=function(){return Object(S.jsx)("div",{className:"Footer navbar fixed-bottom",children:"Made by Retronyme and Filouface"})},L=c(152),A=c(153),G=c(72),K=c(69),V=Object(h.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function z(){var e=V();return Object(S.jsx)("div",{className:e.root,children:Object(S.jsx)(L.a,{position:"static",children:Object(S.jsx)(A.a,{children:Object(S.jsxs)(d.a,{container:!0,spacing:3,children:[Object(S.jsx)(d.a,{item:!0,xs:12,sm:3,children:Object(S.jsx)(j.a,{color:"inherit",children:Object(S.jsx)(G.a,{variant:"h5",className:e.title,children:"This SCP Does Not Exist"})})}),Object(S.jsx)(d.a,{item:!0,sm:5,children:Object(S.jsx)("h1",{children:Object(S.jsx)(K.a,{date:Date.now()+36e5})})}),Object(S.jsx)(d.a,{item:!0,xs:12,sm:1,children:Object(S.jsx)(B.b,{to:"/",children:Object(S.jsx)(j.a,{color:"inherit",children:Object(S.jsx)("strong",{children:"Poll"})})})}),Object(S.jsx)(d.a,{item:!0,xs:12,sm:1,children:Object(S.jsx)(B.b,{to:"/list",children:Object(S.jsx)(j.a,{color:"inherit",children:Object(S.jsx)("strong",{children:"Past SCPs"})})})}),Object(S.jsx)(d.a,{item:!0,xs:12,sm:1,children:Object(S.jsx)(B.b,{to:"/about",children:Object(S.jsx)(j.a,{color:"inherit",children:Object(S.jsx)("strong",{children:"About"})})})})]})})})})}var H=function(){return Object(S.jsx)("div",{className:"App",children:Object(S.jsxs)(B.a,{children:[Object(S.jsx)(z,{}),Object(S.jsx)("br",{}),Object(S.jsxs)(D.c,{children:[Object(S.jsx)(D.a,{path:"/",exact:!0,component:M}),Object(S.jsx)(D.a,{path:"/list",exact:!0,component:T}),Object(S.jsx)(D.a,{path:"/about",exact:!0,component:F})]}),Object(S.jsx)(W,{})]})})},J=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,160)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),n(e),s(e),a(e),i(e)}))};i.a.render(Object(S.jsx)(s.a.StrictMode,{children:Object(S.jsx)(H,{})}),document.getElementById("root")),J()}},[[94,1,2]]]);
//# sourceMappingURL=main.7a2cce87.chunk.js.map