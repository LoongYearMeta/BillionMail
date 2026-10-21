"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["219"],{4694(e,t,n){n.r(t),n.d(t,{default:()=>w});var a=n(5605),i=n(7347),l=n(5962),o=n(4396),s=n(5719),r=n(8123),d=n(2806),c=n(5979),u=n(8105),p=n(8036),f=n(1360),h=n(330);let m={class:"login-container"},v={class:"login-card"},g=["src","title","alt"],y=(0,r.defineComponent)({__name:"index",setup(e){let{t}=(0,f.s9)(),n=(0,h.n)(),y=(0,c.kH)(),w=(0,r.useTemplateRef)("formRef"),b=(0,r.ref)(!1),k=(0,r.ref)(""),C=(0,r.ref)(!1),V=(0,r.reactive)({username:"",password:"",validate_code:"",validate_code_id:""}),_={username:{required:!0,message:t("login.validation.usernameRequired"),trigger:["blur","input"]},password:{required:!0,message:t("login.validation.passwordRequired"),trigger:["blur","input"]},validate_code:{required:!0,trigger:["blur","input"],message:t("login.validation.captchaRequired")}},N=async()=>{try{C.value=!0;let e=await (0,p.uY)();(0,u.Gv)(e)&&(b.value=e.mustValidateCode,e.mustValidateCode&&(k.value=e.validateCodeBase64,V.validate_code_id=e.validateCodeId))}finally{C.value=!1}},x=(0,r.ref)(!1),z=async()=>{try{var e;await (null==(e=w.value)?void 0:e.validate()),x.value=!0;let t=await (0,p.iD)((0,r.toRaw)(V));(0,u.Gv)(t)&&(y.setLoginInfo({token:t.token,refresh_token:t.refresh_token,ttl:t.ttl}),setTimeout(()=>{n.push("/")},1e3))}catch{N()}finally{x.value=!1}};return N(),(e,n)=>{let c=s.A,u=o.Ay,p=l.A,f=i.Ay,h=a.A;return(0,r.openBlock)(),(0,r.createElementBlock)("div",m,[(0,r.createElementVNode)("div",v,[n[4]||(n[4]=(0,r.createElementVNode)("div",{class:"logo-container"},[(0,r.createElementVNode)("div",{class:"logo"},[(0,r.createElementVNode)("img",{class:"w-full",src:d})])],-1)),n[5]||(n[5]=(0,r.createElementVNode)("h2",{class:"login-title"},"BillionMail",-1)),(0,r.createVNode)(h,{ref_key:"formRef",ref:w,size:"large",model:(0,r.unref)(V),rules:_},{default:(0,r.withCtx)(()=>[(0,r.createVNode)(u,{"show-label":!1,path:"username"},{default:(0,r.withCtx)(()=>[(0,r.createVNode)(c,{value:(0,r.unref)(V).username,"onUpdate:value":n[0]||(n[0]=e=>(0,r.unref)(V).username=e),placeholder:(0,r.unref)(t)("login.form.usernamePlaceholder")},null,8,["value","placeholder"])]),_:1}),(0,r.createVNode)(u,{"show-label":!1,path:"password"},{default:(0,r.withCtx)(()=>[(0,r.createVNode)(c,{value:(0,r.unref)(V).password,"onUpdate:value":n[1]||(n[1]=e=>(0,r.unref)(V).password=e),class:"password-input",type:"password","show-password-on":"click",placeholder:(0,r.unref)(t)("login.form.passwordPlaceholder"),onKeyup:(0,r.withKeys)(z,["enter"])},null,8,["value","placeholder"])]),_:1}),(0,r.unref)(b)?((0,r.openBlock)(),(0,r.createBlock)(u,{key:0,"show-label":!1,path:"validate_code"},{default:(0,r.withCtx)(()=>[(0,r.createVNode)(c,{value:(0,r.unref)(V).validate_code,"onUpdate:value":n[2]||(n[2]=e=>(0,r.unref)(V).validate_code=e),class:"flex-1",placeholder:(0,r.unref)(t)("login.form.captcha"),"input-props":{spellcheck:!1},onKeydown:(0,r.withKeys)(z,["enter"])},null,8,["value","placeholder"]),(0,r.createVNode)(p,{size:"small",show:(0,r.unref)(C)},{default:(0,r.withCtx)(()=>[(0,r.createElementVNode)("div",{class:"code",onClick:n[3]||(n[3]=e=>N())},[(0,r.createElementVNode)("img",{class:"w-full h-full",src:(0,r.unref)(k),title:(0,r.unref)(t)("login.form.changeCaptcha"),alt:(0,r.unref)(t)("login.form.captcha")},null,8,g)])]),_:1},8,["show"])]),_:1})):(0,r.createCommentVNode)("",!0),(0,r.createVNode)(u,{"show-label":!1,"show-feedback":!1},{default:(0,r.withCtx)(()=>[(0,r.createVNode)(f,{type:"primary",size:"large",class:"font-bold",loading:(0,r.unref)(x),disabled:(0,r.unref)(x),block:!0,onClick:z},{default:(0,r.withCtx)(()=>[(0,r.createTextVNode)((0,r.toDisplayString)((0,r.unref)(t)("login.form.loginButton")),1)]),_:1},8,["loading","disabled"])]),_:1})]),_:1},8,["model"])])])}}}),w=(0,n(1765).default)(y,[["__scopeId","data-v-77db3384"]])},2806(e,t,n){e.exports=n.p+"static/image/logo.3b07dac3.png"},5962(e,t,n){n.d(t,{A:()=>v});var a=n(368),i=n(1861),l=n(8123),o=n(7928),s=n(2894),r=n(1945),d=n(7580),c=n(6005),u=n(5919),p=n(5603);let f=(0,c.c)([(0,c.c)("@keyframes spin-rotate",`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),(0,c.cB)("spin-container",`
 position: relative;
 `,[(0,c.cB)("spin-body",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[(0,p.v)()])]),(0,c.cB)("spin-body",`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),(0,c.cB)("spin",`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[(0,c.cM)("rotate",`
 animation: spin-rotate 2s linear infinite;
 `)]),(0,c.cB)("spin-description",`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),(0,c.cB)("spin-content",`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[(0,c.cM)("spinning",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),h={small:20,medium:18,large:16},m=Object.assign(Object.assign({},s.A.props),{contentClass:String,contentStyle:[Object,String],description:String,stroke:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},strokeWidth:Number,rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),v=(0,l.defineComponent)({name:"Spin",props:m,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=(0,r.Ay)(e),o=(0,s.A)("Spin","-spin",f,u.A,e,t),p=(0,l.computed)(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=o.value,{opacitySpinning:l,color:s,textColor:r}=i;return{"--n-bezier":n,"--n-opacity-spinning":l,"--n-size":"number"==typeof t?(0,a.Cw)(t):i[(0,c.cF)("size",t)],"--n-color":s,"--n-text-color":r}}),m=n?(0,d.R)("spin",(0,l.computed)(()=>{let{size:t}=e;return"number"==typeof t?String(t):t[0]}),p,e):void 0,v=(0,i.A)(e,["spinning","show"]),g=(0,l.ref)(!1);return(0,l.watchEffect)(t=>{let n;if(v.value){let{delay:a}=e;if(a){n=window.setTimeout(()=>{g.value=!0},a),t(()=>{clearTimeout(n)});return}}g.value=v.value}),{mergedClsPrefix:t,active:g,mergedStrokeWidth:(0,l.computed)(()=>{let{strokeWidth:t}=e;if(void 0!==t)return t;let{size:n}=e;return h["number"==typeof n?"medium":n]}),cssVars:n?void 0:p,themeClass:null==m?void 0:m.themeClass,onRender:null==m?void 0:m.onRender}},render(){var e,t;let{$slots:n,mergedClsPrefix:a,description:i}=this,s=n.icon&&this.rotate,r=(i||n.description)&&(0,l.h)("div",{class:`${a}-spin-description`},i||(null==(e=n.description)?void 0:e.call(n))),d=n.icon?(0,l.h)("div",{class:[`${a}-spin-body`,this.themeClass]},(0,l.h)("div",{class:[`${a}-spin`,s&&`${a}-spin--rotate`],style:n.default?"":this.cssVars},n.icon()),r):(0,l.h)("div",{class:[`${a}-spin-body`,this.themeClass]},(0,l.h)(o.A,{clsPrefix:a,style:n.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,class:`${a}-spin`}),r);return null==(t=this.onRender)||t.call(this),n.default?(0,l.h)("div",{class:[`${a}-spin-container`,this.themeClass],style:this.cssVars},(0,l.h)("div",{class:[`${a}-spin-content`,this.active&&`${a}-spin-content--spinning`,this.contentClass],style:this.contentStyle},n),(0,l.h)(l.Transition,{name:"fade-in-transition"},{default:()=>this.active?d:null})):d}})}}]);