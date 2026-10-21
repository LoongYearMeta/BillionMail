"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["244"],{1828(e,t,a){a.d(t,{A:()=>l,S:()=>i});var r=a(8123),o=a(3032),n=a(3090);let i={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},l=(0,r.defineComponent)({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:i,slots:Object,setup(e){let t=(0,r.inject)(n.v,null);return t||(0,o.$8)("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return(0,r.h)("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}})},831(e,t,a){a.d(t,{A:()=>O});var r=a(778),o=a(6500);let n=function(){return o.A.Date.now()};var i=a(4455),l=Math.max,s=Math.min;let d=function(e,t,a){var o,d,c,b,p,f,v=0,u=!1,h=!1,g=!0;if("function"!=typeof e)throw TypeError("Expected a function");function x(t){var a=o,r=d;return o=d=void 0,v=t,b=e.apply(r,a)}function m(e){var a=e-f,r=e-v;return void 0===f||a>=t||a<0||h&&r>=c}function y(){var e,a,r,o=n();if(m(o))return w(o);p=setTimeout(y,(e=o-f,a=o-v,r=t-e,h?s(r,c-a):r))}function w(e){return(p=void 0,g&&o)?x(e):(o=d=void 0,b)}function B(){var e,a=n(),r=m(a);if(o=arguments,d=this,f=a,r){if(void 0===p)return v=e=f,p=setTimeout(y,t),u?x(e):b;if(h)return clearTimeout(p),p=setTimeout(y,t),x(f)}return void 0===p&&(p=setTimeout(y,t)),b}return t=(0,i.A)(t)||0,(0,r.A)(a)&&(u=!!a.leading,c=(h="maxWait"in a)?l((0,i.A)(a.maxWait)||0,t):c,g="trailing"in a?!!a.trailing:g),B.cancel=function(){void 0!==p&&clearTimeout(p),v=0,o=f=d=p=void 0},B.flush=function(){return void 0===p?b:w(n())},B};var c=a(368),b=a(1861),p=a(1307),f=a(2853),v=a(8123),u=a(2e3),h=a(5616),g=a(364);let x=(0,g.c)(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[(0,g.c)("&::-webkit-scrollbar",{width:0,height:0})]),m=(0,v.defineComponent)({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){let e=(0,v.ref)(null),t=(0,h.h)();return x.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:g.r,ssr:t}),Object.assign({selfRef:e,handleWheel:function(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&0!==e.deltaY&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}},{scrollTo(...t){var a;null==(a=e.value)||a.scrollTo(...t)}})},render(){return(0,v.h)("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var y=a(2894),w=a(1945),B=a(7580),$=a(6297),z=a(5569),C=a(6005),S=a(224),T=a(8616),A=a(3090);let R=(0,C.cB)("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[(0,C.cM)("segment-type",[(0,C.cB)("tabs-rail",[(0,C.c)("&.transition-disabled",[(0,C.cB)("tabs-capsule",`
 transition: none;
 `)])])]),(0,C.cM)("top",[(0,C.cB)("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),(0,C.cM)("left",[(0,C.cB)("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),(0,C.cM)("left, right",`
 flex-direction: row;
 `,[(0,C.cB)("tabs-bar",`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),(0,C.cB)("tabs-tab",`
 padding: var(--n-tab-padding-vertical); 
 `)]),(0,C.cM)("right",`
 flex-direction: row-reverse;
 `,[(0,C.cB)("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),(0,C.cB)("tabs-bar",`
 left: 0;
 `)]),(0,C.cM)("bottom",`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[(0,C.cB)("tab-pane",`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),(0,C.cB)("tabs-bar",`
 top: 0;
 `)]),(0,C.cB)("tabs-rail",`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[(0,C.cB)("tabs-capsule",`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),(0,C.cB)("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[(0,C.cB)("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[(0,C.cM)("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),(0,C.c)("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),(0,C.cM)("flex",[(0,C.cB)("tabs-nav",`
 width: 100%;
 position: relative;
 `,[(0,C.cB)("tabs-wrapper",`
 width: 100%;
 `,[(0,C.cB)("tabs-tab",`
 margin-right: 0;
 `)])])]),(0,C.cB)("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[(0,C.cE)("prefix, suffix",`
 display: flex;
 align-items: center;
 `),(0,C.cE)("prefix","padding-right: 16px;"),(0,C.cE)("suffix","padding-left: 16px;")]),(0,C.cM)("top, bottom",[(0,C.c)(">",[(0,C.cB)("tabs-nav",[(0,C.cB)("tabs-nav-scroll-wrapper",[(0,C.c)("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),(0,C.c)("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),(0,C.cM)("shadow-start",[(0,C.c)("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),(0,C.cM)("shadow-end",[(0,C.c)("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),(0,C.cM)("left, right",[(0,C.cB)("tabs-nav-scroll-content",`
 flex-direction: column;
 `),(0,C.c)(">",[(0,C.cB)("tabs-nav",[(0,C.cB)("tabs-nav-scroll-wrapper",[(0,C.c)("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),(0,C.c)("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),(0,C.cM)("shadow-start",[(0,C.c)("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),(0,C.cM)("shadow-end",[(0,C.c)("&::after",`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),(0,C.cB)("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[(0,C.cB)("tabs-nav-y-scroll",`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[(0,C.c)("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `)]),(0,C.c)("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),(0,C.cB)("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),(0,C.cB)("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),(0,C.cB)("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),(0,C.cB)("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[(0,C.cM)("disabled",{cursor:"not-allowed"}),(0,C.cE)("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),(0,C.cE)("label",`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),(0,C.cB)("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[(0,C.c)("&.transition-disabled",`
 transition: none;
 `),(0,C.cM)("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),(0,C.cB)("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),(0,C.cB)("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[(0,C.c)("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),(0,C.c)("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),(0,C.c)("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),(0,C.c)("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),(0,C.c)("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),(0,C.cB)("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),(0,C.cM)("line-type, bar-type",[(0,C.cB)("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[(0,C.c)("&:hover",{color:"var(--n-tab-text-color-hover)"}),(0,C.cM)("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),(0,C.cM)("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),(0,C.cB)("tabs-nav",[(0,C.cM)("line-type",[(0,C.cM)("top",[(0,C.cE)("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-bar",`
 bottom: -1px;
 `)]),(0,C.cM)("left",[(0,C.cE)("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-bar",`
 right: -1px;
 `)]),(0,C.cM)("right",[(0,C.cE)("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-bar",`
 left: -1px;
 `)]),(0,C.cM)("bottom",[(0,C.cE)("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-bar",`
 top: -1px;
 `)]),(0,C.cE)("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),(0,C.cB)("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),(0,C.cB)("tabs-bar",`
 border-radius: 0;
 `)]),(0,C.cM)("card-type",[(0,C.cE)("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),(0,C.cB)("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),(0,C.cB)("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 `),(0,C.cB)("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[(0,C.cM)("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[(0,C.cE)("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),(0,C.C5)("disabled",[(0,C.c)("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),(0,C.cM)("closable","padding-right: 8px;"),(0,C.cM)("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),(0,C.cM)("disabled","color: var(--n-tab-text-color-disabled);")])]),(0,C.cM)("left, right",`
 flex-direction: column; 
 `,[(0,C.cE)("prefix, suffix",`
 padding: var(--n-tab-padding-vertical);
 `),(0,C.cB)("tabs-wrapper",`
 flex-direction: column;
 `),(0,C.cB)("tabs-tab-wrapper",`
 flex-direction: column;
 `,[(0,C.cB)("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),(0,C.cM)("top",[(0,C.cM)("card-type",[(0,C.cB)("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),(0,C.cE)("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[(0,C.cM)("active",`
 border-bottom: 1px solid #0000;
 `)]),(0,C.cB)("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),(0,C.cM)("left",[(0,C.cM)("card-type",[(0,C.cB)("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),(0,C.cE)("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[(0,C.cM)("active",`
 border-right: 1px solid #0000;
 `)]),(0,C.cB)("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),(0,C.cM)("right",[(0,C.cM)("card-type",[(0,C.cB)("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),(0,C.cE)("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[(0,C.cM)("active",`
 border-left: 1px solid #0000;
 `)]),(0,C.cB)("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),(0,C.cM)("bottom",[(0,C.cM)("card-type",[(0,C.cB)("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),(0,C.cE)("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[(0,C.cM)("active",`
 border-top: 1px solid #0000;
 `)]),(0,C.cB)("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),(0,C.cB)("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]);var M=a(4272),P=a(5570),E=a(5352),k=a(3518),L=a(1021),j=a(1828);let _=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},(0,k.c)(j.S,["displayDirective"])),W=(0,v.defineComponent)({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:_,setup(e){let{mergedClsPrefixRef:t,valueRef:a,typeRef:r,closableRef:o,tabStyleRef:n,addTabStyleRef:i,tabClassRef:l,addTabClassRef:s,tabChangeIdRef:d,onBeforeLeaveRef:c,triggerRef:b,handleAdd:p,activateTab:f,handleClose:u}=(0,v.inject)(A.v);return{trigger:b,mergedClosable:(0,v.computed)(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return void 0===t?o.value:t}),style:n,addStyle:i,tabClass:l,addTabClass:s,clsPrefix:t,value:a,type:r,handleClose(t){t.stopPropagation(),e.disabled||u(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable)return void p();let{name:t}=e,r=++d.id;if(t!==a.value){let{value:o}=c;o?Promise.resolve(o(e.name,a.value)).then(e=>{e&&d.id===r&&f(t)}):f(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:a,disabled:r,label:o,tab:n,value:i,mergedClosable:l,trigger:s,$slots:{default:d}}=this,c=null!=o?o:n;return(0,v.h)("div",{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?(0,v.h)("div",{class:`${t}-tabs-tab-pad`}):null,(0,v.h)("div",Object.assign({key:a,"data-name":a,"data-disabled":!!r||void 0},(0,v.mergeProps)({class:[`${t}-tabs-tab`,i===a&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,l&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:"click"===s?this.activateTab:void 0,onMouseenter:"hover"===s?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),(0,v.h)("span",{class:`${t}-tabs-tab__label`},e?(0,v.h)(v.Fragment,null,(0,v.h)("div",{class:`${t}-tabs-tab__height-placeholder`},"\xa0"),(0,v.h)(M.A,{clsPrefix:t},{default:()=>(0,v.h)(E.A,null)})):d?d():"object"==typeof c?c:(0,L.X)(null!=c?c:a)),l&&"card"===this.type?(0,v.h)(P.A,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:r}):null))}}),F=function(e,t,a){var o=!0,n=!0;if("function"!=typeof e)throw TypeError("Expected a function");return(0,r.A)(a)&&(o="leading"in a?!!a.leading:o,n="trailing"in a?!!a.trailing:n),d(e,t,{leading:o,maxWait:t,trailing:n})},N=Object.assign(Object.assign({},y.A.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),O=(0,v.defineComponent)({name:"Tabs",props:N,slots:Object,setup(e,{slots:t}){var a,r,o,n;let{mergedClsPrefixRef:i,inlineThemeDisabled:l}=(0,w.Ay)(e),s=(0,y.A)("Tabs","-tabs",R,T.A,e,i),d=(0,v.ref)(null),u=(0,v.ref)(null),h=(0,v.ref)(null),g=(0,v.ref)(null),x=(0,v.ref)(null),m=(0,v.ref)(null),S=(0,v.ref)(!0),M=(0,v.ref)(!0),P=(0,b.A)(e,["labelSize","size"]),E=(0,b.A)(e,["activeName","value"]),k=(0,v.ref)(null!=(r=null!=(a=E.value)?a:e.defaultValue)?r:t.default?null==(n=null==(o=(0,$.B)(t.default())[0])?void 0:o.props)?void 0:n.name:null),L=(0,p.A)(E,k),j={id:0},_=(0,v.computed)(()=>{if(e.justifyContent&&"card"!==e.type)return{display:"flex",justifyContent:e.justifyContent}});function W(){var e;let{value:t}=L;return null===t?null:null==(e=d.value)?void 0:e.querySelector(`[data-name="${t}"]`)}function N(e){let{value:t}=u;if(t)for(let a of e)t.style[a]=""}function O(){if("card"===e.type)return;let t=W();t?function(t){if("card"===e.type)return;let{value:a}=u;if(!a)return;let r="0"===a.style.opacity;if(t){let o=`${i.value}-tabs-bar--disabled`,{barWidth:n,placement:l}=e;if("true"===t.dataset.disabled?a.classList.add(o):a.classList.remove(o),["top","bottom"].includes(l)){if(N(["top","maxHeight","height"]),"number"==typeof n&&t.offsetWidth>=n){let e=Math.floor((t.offsetWidth-n)/2)+t.offsetLeft;a.style.left=`${e}px`,a.style.maxWidth=`${n}px`}else a.style.left=`${t.offsetLeft}px`,a.style.maxWidth=`${t.offsetWidth}px`;a.style.width="8192px",r&&(a.style.transition="none"),a.offsetWidth,r&&(a.style.transition="",a.style.opacity="1")}else{if(N(["left","maxWidth","width"]),"number"==typeof n&&t.offsetHeight>=n){let e=Math.floor((t.offsetHeight-n)/2)+t.offsetTop;a.style.top=`${e}px`,a.style.maxHeight=`${n}px`}else a.style.top=`${t.offsetTop}px`,a.style.maxHeight=`${t.offsetHeight}px`;a.style.height="8192px",r&&(a.style.transition="none"),a.offsetHeight,r&&(a.style.transition="",a.style.opacity="1")}}}(t):function(){if("card"===e.type)return;let{value:t}=u;t&&(t.style.opacity="0")}()}function H(){var e;let t=null==(e=x.value)?void 0:e.$el;if(!t)return;let a=W();if(!a)return;let{scrollLeft:r,offsetWidth:o}=t,{offsetLeft:n,offsetWidth:i}=a;r>n?t.scrollTo({top:0,left:n,behavior:"smooth"}):n+i>r+o&&t.scrollTo({top:0,left:n+i-o,behavior:"smooth"})}(0,v.watch)(L,()=>{j.id=0,O(),H()});let D=(0,v.ref)(null),V=0,X=null,q={value:[]},G=(0,v.ref)("next"),U=!0;function I(){let{value:e}=u;if(!e)return;U||(U=!1);let t="transition-disabled";e.classList.add(t),O(),e.classList.remove(t)}let Q=(0,v.ref)(null);function Y({transitionDisabled:e}){let t=d.value;if(!t)return;e&&t.classList.add("transition-disabled");let a=W();a&&Q.value&&(Q.value.style.width=`${a.offsetWidth}px`,Q.value.style.height=`${a.offsetHeight}px`,Q.value.style.transform=`translateX(${a.offsetLeft-(0,c.eV)(getComputedStyle(t).paddingLeft)}px)`,e&&Q.value.offsetWidth),e&&t.classList.remove("transition-disabled")}(0,v.watch)([L],()=>{"segment"===e.type&&(0,v.nextTick)(()=>{Y({transitionDisabled:!1})})}),(0,v.onMounted)(()=>{"segment"===e.type&&Y({transitionDisabled:!0})});let J=0,K=F(function(t){var a,r;if(0===t.contentRect.width&&0===t.contentRect.height||J===t.contentRect.width)return;J=t.contentRect.width;let{type:o}=e;if(("line"===o||"bar"===o)&&(U||(null==(a=e.justifyContent)?void 0:a.startsWith("space")))&&I(),"segment"!==o){let{placement:t}=e;et(("top"===t||"bottom"===t?null==(r=x.value)?void 0:r.$el:m.value)||null)}},64);(0,v.watch)([()=>e.justifyContent,()=>e.size],()=>{(0,v.nextTick)(()=>{let{type:t}=e;("line"===t||"bar"===t)&&I()})});let Z=(0,v.ref)(!1),ee=F(function(t){var a;let{target:r,contentRect:{width:o,height:n}}=t,i=r.parentElement.parentElement.offsetWidth,l=r.parentElement.parentElement.offsetHeight,{placement:s}=e;if(Z.value){let{value:e}=g;if(!e)return;"top"===s||"bottom"===s?i-o>e.$el.offsetWidth&&(Z.value=!1):l-n>e.$el.offsetHeight&&(Z.value=!1)}else"top"===s||"bottom"===s?i<o&&(Z.value=!0):l<n&&(Z.value=!0);et((null==(a=x.value)?void 0:a.$el)||null)},64);function et(t){if(!t)return;let{placement:a}=e;if("top"===a||"bottom"===a){let{scrollLeft:e,scrollWidth:a,offsetWidth:r}=t;S.value=e<=0,M.value=e+r>=a}else{let{scrollTop:e,scrollHeight:a,offsetHeight:r}=t;S.value=e<=0,M.value=e+r>=a}}let ea=F(e=>{et(e.target)},64);(0,v.provide)(A.v,{triggerRef:(0,v.toRef)(e,"trigger"),tabStyleRef:(0,v.toRef)(e,"tabStyle"),tabClassRef:(0,v.toRef)(e,"tabClass"),addTabStyleRef:(0,v.toRef)(e,"addTabStyle"),addTabClassRef:(0,v.toRef)(e,"addTabClass"),paneClassRef:(0,v.toRef)(e,"paneClass"),paneStyleRef:(0,v.toRef)(e,"paneStyle"),mergedClsPrefixRef:i,typeRef:(0,v.toRef)(e,"type"),closableRef:(0,v.toRef)(e,"closable"),valueRef:L,tabChangeIdRef:j,onBeforeLeaveRef:(0,v.toRef)(e,"onBeforeLeave"),activateTab:function(t){let a=L.value,r="next";for(let e of q.value){if(e===a)break;if(e===t){r="prev";break}}G.value=r,function(t){let{onActiveNameChange:a,onUpdateValue:r,"onUpdate:value":o}=e;a&&(0,z.T)(a,t),r&&(0,z.T)(r,t),o&&(0,z.T)(o,t),k.value=t}(t)},handleClose:function(t){let{onClose:a}=e;a&&(0,z.T)(a,t)},handleAdd:function(){let{onAdd:t}=e;t&&t(),(0,v.nextTick)(()=>{let e=W(),{value:t}=x;e&&t&&t.scrollTo({left:e.offsetLeft,top:0,behavior:"smooth"})})}}),(0,f.A)(()=>{O(),H()}),(0,v.watchEffect)(()=>{let{value:e}=h;if(!e)return;let{value:t}=i,a=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;S.value?e.classList.remove(a):e.classList.add(a),M.value?e.classList.remove(r):e.classList.add(r)});let er=(0,v.computed)(()=>{let{value:t}=P,{type:a}=e,r={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[a],o=`${t}${r}`,{self:{barColor:n,closeIconColor:i,closeIconColorHover:l,closeIconColorPressed:d,tabColor:b,tabBorderColor:p,paneTextColor:f,tabFontWeight:v,tabBorderRadius:u,tabFontWeightActive:h,colorSegment:g,fontWeightStrong:x,tabColorSegment:m,closeSize:y,closeIconSize:w,closeColorHover:B,closeColorPressed:$,closeBorderRadius:z,[(0,C.cF)("panePadding",t)]:S,[(0,C.cF)("tabPadding",o)]:T,[(0,C.cF)("tabPaddingVertical",o)]:A,[(0,C.cF)("tabGap",o)]:R,[(0,C.cF)("tabGap",`${o}Vertical`)]:M,[(0,C.cF)("tabTextColor",a)]:E,[(0,C.cF)("tabTextColorActive",a)]:k,[(0,C.cF)("tabTextColorHover",a)]:L,[(0,C.cF)("tabTextColorDisabled",a)]:j,[(0,C.cF)("tabFontSize",t)]:_},common:{cubicBezierEaseInOut:W}}=s.value;return{"--n-bezier":W,"--n-color-segment":g,"--n-bar-color":n,"--n-tab-font-size":_,"--n-tab-text-color":E,"--n-tab-text-color-active":k,"--n-tab-text-color-disabled":j,"--n-tab-text-color-hover":L,"--n-pane-text-color":f,"--n-tab-border-color":p,"--n-tab-border-radius":u,"--n-close-size":y,"--n-close-icon-size":w,"--n-close-color-hover":B,"--n-close-color-pressed":$,"--n-close-border-radius":z,"--n-close-icon-color":i,"--n-close-icon-color-hover":l,"--n-close-icon-color-pressed":d,"--n-tab-color":b,"--n-tab-font-weight":v,"--n-tab-font-weight-active":h,"--n-tab-padding":T,"--n-tab-padding-vertical":A,"--n-tab-gap":R,"--n-tab-gap-vertical":M,"--n-pane-padding-left":(0,c.Cq)(S,"left"),"--n-pane-padding-right":(0,c.Cq)(S,"right"),"--n-pane-padding-top":(0,c.Cq)(S,"top"),"--n-pane-padding-bottom":(0,c.Cq)(S,"bottom"),"--n-font-weight-strong":x,"--n-tab-color-segment":m}}),eo=l?(0,B.R)("tabs",(0,v.computed)(()=>`${P.value[0]}${e.type[0]}`),er,e):void 0;return Object.assign({mergedClsPrefix:i,mergedValue:L,renderedNames:new Set,segmentCapsuleElRef:Q,tabsPaneWrapperRef:D,tabsElRef:d,barElRef:u,addTabInstRef:g,xScrollInstRef:x,scrollWrapperElRef:h,addTabFixed:Z,tabWrapperStyle:_,handleNavResize:K,mergedSize:P,handleScroll:ea,handleTabsResize:ee,cssVars:l?void 0:er,themeClass:null==eo?void 0:eo.themeClass,animationDirection:G,renderNameListRef:q,yScrollElRef:m,handleSegmentResize:()=>{Y({transitionDisabled:!0})},onAnimationBeforeLeave:function(e){let t=D.value;if(t){V=e.getBoundingClientRect().height;let a=`${V}px`,r=()=>{t.style.height=a,t.style.maxHeight=a};X?(r(),X(),X=null):X=r}},onAnimationEnter:function(e){let t=D.value;if(t){let a=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${a}px`,t.style.height=`${Math.max(V,a)}px`};X?(X(),X=null,r()):X=r}},onAnimationAfterEnter:function(){let t=D.value;if(t){t.style.maxHeight="",t.style.height="";let{paneWrapperStyle:a}=e;if("string"==typeof a)t.style.cssText=a;else if(a){let{maxHeight:e,height:r}=a;void 0!==e&&(t.style.maxHeight=e),void 0!==r&&(t.style.height=r)}}},onRender:null==eo?void 0:eo.onRender},{syncBarPosition:()=>{O()}})},render(){let{mergedClsPrefix:e,type:t,placement:a,addTabFixed:r,addable:o,mergedSize:n,renderNameListRef:i,onRender:l,paneWrapperClass:s,paneWrapperStyle:d,$slots:{default:c,prefix:b,suffix:p}}=this;null==l||l();let f=c?(0,$.B)(c()).filter(e=>!0===e.type.__TAB_PANE__):[],h=c?(0,$.B)(c()).filter(e=>!0===e.type.__TAB__):[],g=!h.length,x="card"===t,y="segment"===t,w=!x&&!y&&this.justifyContent;i.value=[];let B=()=>{let t=(0,v.h)("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},w?null:(0,v.h)("div",{class:`${e}-tabs-scroll-padding`,style:"top"===a||"bottom"===a?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),g?f.map((e,t)=>(i.value.push(e.props.name),X((0,v.h)(W,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:0!==t&&(!w||"center"===w||"start"===w||"end"===w)}),e.children?{default:e.children.tab}:void 0)))):h.map((e,t)=>(i.value.push(e.props.name),0===t||w)?X(e):X(V(e))),!r&&o&&x?D(o,(g?f.length:h.length)!==0):null,w?null:(0,v.h)("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return(0,v.h)("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},x&&o?(0,v.h)(u.A,{onResize:this.handleTabsResize},{default:()=>t}):t,x?(0,v.h)("div",{class:`${e}-tabs-pad`}):null,x?null:(0,v.h)("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},z=y?"top":a;return(0,v.h)("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${n}-size`,w&&`${e}-tabs--flex`,`${e}-tabs--${z}`],style:this.cssVars},(0,v.h)("div",{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${z}`,`${e}-tabs-nav`]},(0,S.iQ)(b,t=>t&&(0,v.h)("div",{class:`${e}-tabs-nav__prefix`},t)),y?(0,v.h)(u.A,{onResize:this.handleSegmentResize},{default:()=>(0,v.h)("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},(0,v.h)("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},(0,v.h)("div",{class:`${e}-tabs-wrapper`},(0,v.h)("div",{class:`${e}-tabs-tab`}))),g?f.map((e,t)=>(i.value.push(e.props.name),(0,v.h)(W,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:0!==t}),e.children?{default:e.children.tab}:void 0))):h.map((e,t)=>(i.value.push(e.props.name),0===t)?e:V(e)))}):(0,v.h)(u.A,{onResize:this.handleNavResize},{default:()=>(0,v.h)("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(z)?(0,v.h)(m,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:B}):(0,v.h)("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},B()))}),r&&o&&x?D(o,!0):null,(0,S.iQ)(p,t=>t&&(0,v.h)("div",{class:`${e}-tabs-nav__suffix`},t))),g&&(this.animated&&("top"===z||"bottom"===z)?(0,v.h)("div",{ref:"tabsPaneWrapperRef",style:d,class:[`${e}-tabs-pane-wrapper`,s]},H(f,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):H(f,this.mergedValue,this.renderedNames)))}});function H(e,t,a,r,o,n,i){let l=[];return(e.forEach(e=>{let{name:r,displayDirective:o,"display-directive":n}=e.props,i=e=>o===e||n===e,s=t===r;if(void 0!==e.key&&(e.key=r),s||i("show")||i("show:lazy")&&a.has(r)){a.has(r)||a.add(r);let t=!i("if");l.push(t?(0,v.withDirectives)(e,[[v.vShow,s]]):e)}}),i)?(0,v.h)(v.TransitionGroup,{name:`${i}-transition`,onBeforeLeave:r,onEnter:o,onAfterEnter:n},{default:()=>l}):l}function D(e,t){return(0,v.h)(W,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:"object"==typeof e&&e.disabled})}function V(e){let t=(0,v.cloneVNode)(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function X(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}},3090(e,t,a){a.d(t,{v:()=>r});let r=(0,a(8667).D)("n-tabs")}}]);