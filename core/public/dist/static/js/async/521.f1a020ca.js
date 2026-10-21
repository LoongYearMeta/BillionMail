"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["521"],{8624(e,t,a){a.r(t),a.d(t,{default:()=>q});var l=a(8123),r=a(6616);let n=Object.assign(Object.assign({},a(2894).A.props),{trigger:String,xScrollable:Boolean,onScroll:Function,contentClass:String,contentStyle:[Object,String],size:Number,yPlacement:{type:String,default:"right"},xPlacement:{type:String,default:"bottom"}}),o=(0,l.defineComponent)({name:"Scrollbar",props:n,setup(){let e=(0,l.ref)(null);return Object.assign(Object.assign({},{scrollTo:(...t)=>{var a;null==(a=e.value)||a.scrollTo(t[0],t[1])},scrollBy:(...t)=>{var a;null==(a=e.value)||a.scrollBy(t[0],t[1])}}),{scrollbarInstRef:e})},render(){return(0,l.h)(r.A,Object.assign({ref:"scrollbarInstRef"},this.$props),this.$slots)}});var i=a(923),c=a(2184),s=a(5018),d=a(2189),u=a(6169);let m=(0,u.nY)("editDomainStore",()=>{let e=(0,l.ref)(!1),t=(0,l.ref)(""),a=(0,l.ref)(""),r=(0,l.ref)("0"),n=(0,l.ref)("B");return{hasGotDomainConfiguration:e,domainTit:t,hostname:a,quota:r,unit:n,mailboxes:(0,l.ref)(0),catch_email:(0,l.ref)("")}});function v(){let e=m();return{...(0,u.bP)(e)}}var p=a(8105);let f={fetchOptions:{loading:"Loading... Please wait.",successMessage:!0}};async function b(e){let{domainTit:t,hostname:a,quota:l,unit:r,mailboxes:n,catch_email:o,hasGotDomainConfiguration:i}=v();if(!i.value)try{let c=await d.K.get("/domains/list",{params:{keyword:e,page:1,page_size:1}});if((0,p.Gv)(c)){let{list:e}=c,s=(0,p.JB)(e[0].quota,!0,2).split(" ");t.value=e[0].domain,a.value=e[0].a_record,l.value=s[0],r.value=s[1],n.value=e[0].mailboxes,o.value=e[0].email,i.value=!0}}catch(e){console.warn(e)}}async function h(){let{domainTit:e,hostname:t,quota:a,unit:l,mailboxes:r,catch_email:n}=v(),o=function(e,t){switch(t){case"KB":return 1024*e;case"MB":return 1024*e*1024;case"GB":return 1024*e*1048576;case"TB":return 1024*e*0x40000000;default:return e}}(Number(a.value),l.value);try{await d.K.post("/domains/update",{domain:e.value,mailboxes:r.value,mailboxQuota:o,quota:o,rateLimit:1,active:1,email:n.value,hostname:t.value},f)}catch(e){console.warn(e)}}function x(){let{hasGotDomainConfiguration:e}=v();e.value=!1}var g=a(7347),C=a(655),N=a(5605),V=a(1831),w=a(8167),y=a(4396),B=a(5719),_=a(330);let k={class:"content-wrapper"},E={class:"page-tit mb-5"},S={class:"left-tit"},A={class:"tit-content"},$={class:"flex-1"},D={class:"mb-12px text-desc"},R={class:"flex-1"},z={class:"mb-12px text-desc"},j={class:"flex gap-16px"},O={class:"flex-1"},T={class:"w-80px"},U={class:"flex-1"},L={class:"mb-12px text-desc"},M=(0,l.defineComponent)({__name:"DomainConfiguration",setup(e){let{domainTit:t,hostname:a,quota:r,unit:n,mailboxes:o,catch_email:i}=v(),c=(0,_.t)().params.domain,s=(0,l.ref)([{label:"B",value:"B"},{label:"KB",value:"KB"},{label:"MB",value:"MB"},{label:"GB",value:"GB"},{label:"TB",value:"TB"}]);return b(c),(e,c)=>{let d=B.A,u=y.Ay,m=w.A,v=V.A,p=N.A,f=C.Ay,b=g.Ay;return(0,l.openBlock)(),(0,l.createElementBlock)("div",k,[(0,l.createElementVNode)("div",null,[(0,l.createVNode)(f,null,{default:(0,l.withCtx)(()=>[(0,l.createElementVNode)("div",E,[(0,l.createElementVNode)("div",S,[c[6]||(c[6]=(0,l.createElementVNode)("div",{class:"back-tool"},[(0,l.createElementVNode)("i",{class:"i-cuida:mail-outline text-28px"})],-1)),(0,l.createElementVNode)("span",A,(0,l.toDisplayString)(e.$t("domain.edit.domainConfiguration.title")),1)])]),(0,l.createVNode)(p,null,{default:(0,l.withCtx)(()=>[(0,l.createVNode)(u,{label:e.$t("domain.edit.domainConfiguration.domain")},{default:(0,l.withCtx)(()=>[(0,l.createVNode)(d,{value:(0,l.unref)(t),"onUpdate:value":c[0]||(c[0]=e=>(0,l.isRef)(t)?t.value=e:null),disabled:!0},null,8,["value"])]),_:1},8,["label"]),(0,l.createVNode)(u,{label:"Hostname"},{default:(0,l.withCtx)(()=>[(0,l.createVNode)(d,{value:(0,l.unref)(a),"onUpdate:value":c[1]||(c[1]=e=>(0,l.isRef)(a)?a.value=e:null)},null,8,["value"])]),_:1}),(0,l.createVNode)(u,{label:e.$t("domain.edit.domainConfiguration.catchAll")},{default:(0,l.withCtx)(()=>[(0,l.createElementVNode)("div",$,[(0,l.createElementVNode)("div",D," * "+(0,l.toDisplayString)(e.$t("domain.edit.domainConfiguration.catchAllDesc")),1),(0,l.createVNode)(d,{value:(0,l.unref)(i),"onUpdate:value":c[2]||(c[2]=e=>(0,l.isRef)(i)?i.value=e:null)},null,8,["value"])])]),_:1},8,["label"]),(0,l.createVNode)(u,{label:e.$t("domain.edit.domainConfiguration.domainQuota")},{default:(0,l.withCtx)(()=>[(0,l.createElementVNode)("div",R,[(0,l.createElementVNode)("div",z," * "+(0,l.toDisplayString)(e.$t("domain.edit.domainConfiguration.domainQuotaDesc")),1),(0,l.createElementVNode)("div",j,[(0,l.createElementVNode)("div",O,[(0,l.createVNode)(d,{value:(0,l.unref)(r),"onUpdate:value":c[3]||(c[3]=e=>(0,l.isRef)(r)?r.value=e:null)},null,8,["value"])]),(0,l.createElementVNode)("div",T,[(0,l.createVNode)(m,{value:(0,l.unref)(n),"onUpdate:value":c[4]||(c[4]=e=>(0,l.isRef)(n)?n.value=e:null),options:(0,l.unref)(s)},null,8,["value","options"])])])])]),_:1},8,["label"]),(0,l.createVNode)(u,{label:e.$t("domain.edit.domainConfiguration.mailboxCount")},{default:(0,l.withCtx)(()=>[(0,l.createElementVNode)("div",U,[(0,l.createElementVNode)("div",L," * "+(0,l.toDisplayString)(e.$t("domain.edit.domainConfiguration.mailboxCountDesc")),1),(0,l.createVNode)(v,{value:(0,l.unref)(o),"onUpdate:value":c[5]||(c[5]=e=>(0,l.isRef)(o)?o.value=e:null),class:"w-full","show-button":!1},null,8,["value"])])]),_:1},8,["label"])]),_:1})]),_:1}),(0,l.createVNode)(b,{type:"primary",class:"w-100% mt-5",onClick:(0,l.unref)(h)},{icon:(0,l.withCtx)(()=>[...c[7]||(c[7]=[(0,l.createElementVNode)("i",{class:"i-mingcute:save-2-line text-5"},null,-1)])]),default:(0,l.withCtx)(()=>[(0,l.createTextVNode)(" "+(0,l.toDisplayString)(e.$t("domain.edit.save")),1)]),_:1},8,["onClick"])])])}}});var P=a(1765);let K=(0,P.default)(M,[["__scopeId","data-v-9d7c9dd8"]]),G={class:"wrapper"},I={class:"dynamic-content"},Q=(0,l.defineComponent)({__name:"index",setup(e){let t=(0,_.t)().params.domain;return(0,s.o)(x),(e,a)=>{let r=(0,l.resolveComponent)("router-link"),n=c.A,s=i.Ay;return(0,l.openBlock)(),(0,l.createElementBlock)("div",G,[(0,l.createVNode)(s,{class:"mb-20px"},{default:(0,l.withCtx)(()=>[(0,l.createVNode)(n,null,{default:(0,l.withCtx)(()=>[(0,l.createVNode)(r,{to:"/domain"},{default:(0,l.withCtx)(()=>[(0,l.createTextVNode)((0,l.toDisplayString)(e.$t("domain.edit.breadcrumb.domain")),1)]),_:1})]),_:1}),(0,l.createVNode)(n,null,{default:(0,l.withCtx)(()=>[(0,l.createTextVNode)((0,l.toDisplayString)((0,l.unref)(t)),1)]),_:1}),(0,l.createVNode)(n,null,{default:(0,l.withCtx)(()=>[(0,l.createTextVNode)((0,l.toDisplayString)(e.$t("domain.edit.breadcrumb.editDomain")),1)]),_:1})]),_:1}),(0,l.createElementVNode)("div",I,[(0,l.createVNode)(o,{style:{height:"100%"}},{default:(0,l.withCtx)(()=>[(0,l.createVNode)(K)]),_:1})])])}}}),q=(0,P.default)(Q,[["__scopeId","data-v-9dad3a9b"]])},923(e,t,a){a.d(t,{s7:()=>u,Ay:()=>v});var l=a(8123),r=a(2894),n=a(1945),o=a(7580),i=a(8667),c=a(1125),s=a(6005);let d=(0,s.cB)("breadcrumb",`
 white-space: nowrap;
 cursor: default;
 line-height: var(--n-item-line-height);
`,[(0,s.c)("ul",`
 list-style: none;
 padding: 0;
 margin: 0;
 `),(0,s.c)("a",`
 color: inherit;
 text-decoration: inherit;
 `),(0,s.cB)("breadcrumb-item",`
 font-size: var(--n-font-size);
 transition: color .3s var(--n-bezier);
 display: inline-flex;
 align-items: center;
 `,[(0,s.cB)("icon",`
 font-size: 18px;
 vertical-align: -.2em;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `),(0,s.c)("&:not(:last-child)",[(0,s.cM)("clickable",[(0,s.cE)("link",`
 cursor: pointer;
 `,[(0,s.c)("&:hover",`
 background-color: var(--n-item-color-hover);
 `),(0,s.c)("&:active",`
 background-color: var(--n-item-color-pressed); 
 `)])])]),(0,s.cE)("link",`
 padding: 4px;
 border-radius: var(--n-item-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 position: relative;
 `,[(0,s.c)("&:hover",`
 color: var(--n-item-text-color-hover);
 `,[(0,s.cB)("icon",`
 color: var(--n-item-text-color-hover);
 `)]),(0,s.c)("&:active",`
 color: var(--n-item-text-color-pressed);
 `,[(0,s.cB)("icon",`
 color: var(--n-item-text-color-pressed);
 `)])]),(0,s.cE)("separator",`
 margin: 0 8px;
 color: var(--n-separator-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 `),(0,s.c)("&:last-child",[(0,s.cE)("link",`
 font-weight: var(--n-font-weight-active);
 cursor: unset;
 color: var(--n-item-text-color-active);
 `,[(0,s.cB)("icon",`
 color: var(--n-item-text-color-active);
 `)]),(0,s.cE)("separator",`
 display: none;
 `)])])]),u=(0,i.D)("n-breadcrumb"),m=Object.assign(Object.assign({},r.A.props),{separator:{type:String,default:"/"}}),v=(0,l.defineComponent)({name:"Breadcrumb",props:m,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:a}=(0,n.Ay)(e),i=(0,r.A)("Breadcrumb","-breadcrumb",d,c.A,e,t);(0,l.provide)(u,{separatorRef:(0,l.toRef)(e,"separator"),mergedClsPrefixRef:t});let s=(0,l.computed)(()=>{let{common:{cubicBezierEaseInOut:e},self:{separatorColor:t,itemTextColor:a,itemTextColorHover:l,itemTextColorPressed:r,itemTextColorActive:n,fontSize:o,fontWeightActive:c,itemBorderRadius:s,itemColorHover:d,itemColorPressed:u,itemLineHeight:m}}=i.value;return{"--n-font-size":o,"--n-bezier":e,"--n-item-text-color":a,"--n-item-text-color-hover":l,"--n-item-text-color-pressed":r,"--n-item-text-color-active":n,"--n-separator-color":t,"--n-item-color-hover":d,"--n-item-color-pressed":u,"--n-item-border-radius":s,"--n-font-weight-active":c,"--n-item-line-height":m}}),m=a?(0,o.R)("breadcrumb",void 0,s,e):void 0;return{mergedClsPrefix:t,cssVars:a?void 0:s,themeClass:null==m?void 0:m.themeClass,onRender:null==m?void 0:m.onRender}},render(){var e;return null==(e=this.onRender)||e.call(this),(0,l.h)("nav",{class:[`${this.mergedClsPrefix}-breadcrumb`,this.themeClass],style:this.cssVars,"aria-label":"Breadcrumb"},(0,l.h)("ul",null,this.$slots))}})},2184(e,t,a){a.d(t,{A:()=>i});var l=a(8123),r=a(224),n=a(2221),o=a(923);let i=(0,l.defineComponent)({name:"BreadcrumbItem",props:{separator:String,href:String,clickable:{type:Boolean,default:!0},onClick:Function},slots:Object,setup(e,{slots:t}){let a=(0,l.inject)(o.s7,null);if(!a)return()=>null;let{separatorRef:i,mergedClsPrefixRef:c}=a,s=function(e=n.B?window:null){let t=()=>{let{hash:t,host:a,hostname:l,href:r,origin:n,pathname:o,port:i,protocol:c,search:s}=(null==e?void 0:e.location)||{};return{hash:t,host:a,hostname:l,href:r,origin:n,pathname:o,port:i,protocol:c,search:s}},a=(0,l.ref)(t()),r=()=>{a.value=t()};return(0,l.onMounted)(()=>{e&&(e.addEventListener("popstate",r),e.addEventListener("hashchange",r))}),(0,l.onUnmounted)(()=>{e&&(e.removeEventListener("popstate",r),e.removeEventListener("hashchange",r))}),a}(),d=(0,l.computed)(()=>e.href?"a":"span"),u=(0,l.computed)(()=>s.value.href===e.href?"location":null);return()=>{let{value:a}=c;return(0,l.h)("li",{class:[`${a}-breadcrumb-item`,e.clickable&&`${a}-breadcrumb-item--clickable`]},(0,l.h)(d.value,{class:`${a}-breadcrumb-item__link`,"aria-current":u.value,href:e.href,onClick:e.onClick},t),(0,l.h)("span",{class:`${a}-breadcrumb-item__separator`,"aria-hidden":"true"},(0,r.Nj)(t.separator,()=>{var t;return[null!=(t=e.separator)?t:i.value]})))}}})}}]);