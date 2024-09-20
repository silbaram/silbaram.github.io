"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[878],{5592:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(7294),a=n(1883);const o=e=>{let{siteTitle:t}=e;return r.createElement("header",{style:{background:"#20232a",marginBottom:"1.45rem"}},r.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"1.45rem 1.0875rem"}},r.createElement("h1",{style:{margin:0}},r.createElement(a.Link,{to:"/",style:{color:"white",textDecoration:"none"}},t))))};o.defaultProps={siteTitle:""};var l=o;var i=e=>{var t;let{children:n}=e;const o=(0,a.useStaticQuery)("3649515864");return r.createElement(r.Fragment,null,r.createElement(l,{siteTitle:(null===(t=o.site.siteMetadata)||void 0===t?void 0:t.title)||"Title"}),r.createElement("div",{style:{margin:"0 auto",maxWidth:"var(--size-content)",padding:"var(--size-gutter)"}},r.createElement("main",null,n),r.createElement("footer",{style:{marginTop:"var(--space-5)",fontSize:"var(--font-sm)"}},"© ",(new Date).getFullYear()," · Built with"," ","silbaram")))}},9357:function(e,t,n){var r=n(7294),a=n(1883);t.Z=function(e){var t,n;let{description:o,title:l,children:i}=e;const{site:c}=(0,a.useStaticQuery)("63159454"),d=o||c.siteMetadata.description,s=null===(t=c.siteMetadata)||void 0===t?void 0:t.title;return r.createElement(r.Fragment,null,r.createElement("title",null,s?`${l} | ${s}`:l),r.createElement("meta",{name:"description",content:d}),r.createElement("meta",{property:"og:title",content:l}),r.createElement("meta",{property:"og:description",content:d}),r.createElement("meta",{property:"og:type",content:"website"}),r.createElement("meta",{name:"twitter:card",content:"summary"}),r.createElement("meta",{name:"twitter:creator",content:(null===(n=c.siteMetadata)||void 0===n?void 0:n.author)||""}),r.createElement("meta",{name:"twitter:title",content:l}),r.createElement("meta",{name:"twitter:description",content:d}),i)}},4339:function(e,t,n){n.r(t),n.d(t,{Head:function(){return c}});var r=n(7294),a=n(1883),o=n(5592),l=n(9357);const i=()=>{const{0:e,1:t}=(0,r.useState)(""),{0:n,1:a}=(0,r.useState)(""),{0:o,1:l}=(0,r.useState)(""),i={container:{maxWidth:"800px",margin:"40px auto",padding:"20px",backgroundColor:"#f0f0f0",borderRadius:"8px",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)",fontFamily:"Arial, sans-serif"},title:{fontSize:"24px",fontWeight:"bold",marginBottom:"20px",color:"#333"},textarea:{width:"100%",height:"100px",padding:"10px",marginBottom:"20px",borderRadius:"4px",border:"1px solid #ccc",fontSize:"14px"},buttonContainer:{display:"flex",justifyContent:"space-between",marginBottom:"20px"},button:{padding:"10px 20px",borderRadius:"4px",border:"none",color:"white",cursor:"pointer",fontSize:"14px",fontWeight:"bold"},encodeButton:{backgroundColor:"#4CAF50"},decodeButton:{backgroundColor:"#2196F3"},resetButton:{backgroundColor:"#f44336"},resultContainer:{marginBottom:"20px"},resultTitle:{fontSize:"16px",fontWeight:"bold",marginBottom:"10px",color:"#333"},resultText:{backgroundColor:"white",padding:"10px",borderRadius:"4px",border:"1px solid #ccc",minHeight:"50px",wordBreak:"break-all"}};return r.createElement("div",{style:i.container},r.createElement("h1",{style:i.title},"URL Encoder / Decoder"),r.createElement("textarea",{value:e,onChange:e=>t(e.target.value),style:i.textarea,placeholder:"Enter text here"}),r.createElement("div",{style:i.buttonContainer},r.createElement("button",{onClick:()=>{const t=e.replace(/[^/:?#[\]@!$&'()*+,;=]/g,(e=>encodeURIComponent(e)));a(t)},style:{...i.button,...i.encodeButton}},"Encode"),r.createElement("button",{onClick:()=>{try{const t=decodeURIComponent(e.replace(/%(?![0-9A-Fa-f]{2})/g,"%25"));l(t)}catch(t){l("Unable to decode the text.")}},style:{...i.button,...i.decodeButton}},"Decode"),r.createElement("button",{onClick:()=>{t(""),a(""),l("")},style:{...i.button,...i.resetButton}},"Reset")),r.createElement("div",{style:i.resultContainer},r.createElement("h2",{style:i.resultTitle},"Encoded Result:"),r.createElement("div",{style:i.resultText},n)),r.createElement("div",{style:i.resultContainer},r.createElement("h2",{style:i.resultTitle},"Decoded Result:"),r.createElement("div",{style:i.resultText},o)))},c=()=>r.createElement(l.Z,{title:"A service that provides features that make it easier to view JSON formats."});t.default=()=>r.createElement(o.Z,null,r.createElement("div",null,r.createElement("h1",null,"JSON Formatter"),r.createElement(i,null)),r.createElement("br",null),r.createElement(a.Link,{to:"/"},"Go back to the homepage"))}}]);
//# sourceMappingURL=component---src-pages-web-apps-url-encoder-decoder-app-js-3652668dd55670a29378.js.map