"use strict";(self.webpackChunkreact_complete_guide=self.webpackChunkreact_complete_guide||[]).push([[488],{3488:(e,a,s)=>{s.r(a),s.d(a,{default:()=>m});var r=s(5043),t=s(3003),l=s(3216),i=s(5475),n=s(4902),o=s(4091),u=s(8419),d=s(3684),c=s(579);const m=function(e){let{triggerSnackbar:a}=e;const[s,m]=(0,r.useState)(""),[h,p]=(0,r.useState)(""),[v,g]=(0,r.useState)(""),[x,N]=(0,r.useState)(""),[j,f]=(0,r.useState)(""),[b,w]=(0,r.useState)(!1),y=(0,t.wA)(),P=(0,l.Zp)();return(0,c.jsxs)("div",{className:"signup-page-container",children:[(0,c.jsx)("div",{className:"video-container",children:(0,c.jsx)("video",{autoPlay:!0,muted:!0,loop:!0,children:(0,c.jsx)("source",{src:u,type:"video/mp4"})})}),(0,c.jsxs)("div",{className:"auth-form-container",children:[(0,c.jsx)("h2",{className:"auth-form-title",children:"SIGN UP"}),(0,c.jsx)("p",{className:"auth-form-subtitle",children:"Please Enter your Email, Password, and Confirm Password!"}),(0,c.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),s&&x&&j&&h&&v)try{const e=d.O.parse({email:s,password:x,firstName:h,lastName:v});if(x!==j)return void a("Passwords do not match.","error");w(!0),await y((0,n.E_)(e)).unwrap(),a("Account Created Successfully, Please Login","success"),w(!1),P("/login")}catch(o){var r,t,l,i;"email"===(null===(r=o.errors[0])||void 0===r?void 0:r.path[0])?a("Invalid email. Please enter a valid email.","error"):"password"===(null===(t=o.errors[0])||void 0===t?void 0:t.path[0])?a("Invalid password. Password must be at least 6 characters long.","error"):"firstName"===(null===(l=o.errors[0])||void 0===l?void 0:l.path[0])?a("First name is required and must be at least 2 characters long.","error"):"lastName"===(null===(i=o.errors[0])||void 0===i?void 0:i.path[0])?a("Last name is required and must be at least 2 characters long.","error"):a("Signup failed. Please try again.","error"),w(!1)}else a("Please fill in all fields.","error")},className:"auth-form",children:[(0,c.jsxs)("div",{className:"input-group",children:[(0,c.jsx)("input",{type:"text",value:h,onChange:e=>p(e.target.value),required:!0,className:"auth-input"}),(0,c.jsx)("label",{className:"auth-label",children:"FirstName"})]}),(0,c.jsxs)("div",{className:"input-group",children:[(0,c.jsx)("input",{type:"text",value:v,onChange:e=>g(e.target.value),required:!0,className:"auth-input"}),(0,c.jsx)("label",{className:"auth-label",children:"LastName"})]}),(0,c.jsxs)("div",{className:"input-group",children:[(0,c.jsx)("input",{type:"email",value:s,onChange:e=>m(e.target.value),required:!0,className:"auth-input"}),(0,c.jsx)("label",{className:"auth-label",children:"Email"})]}),(0,c.jsxs)("div",{className:"input-group",children:[(0,c.jsx)("input",{type:"password",value:x,onChange:e=>N(e.target.value),required:!0,className:"auth-input"}),(0,c.jsx)("label",{className:"auth-label",children:"Password"})]}),(0,c.jsxs)("div",{className:"input-group",children:[(0,c.jsx)("input",{type:"password",value:j,onChange:e=>f(e.target.value),required:!0,className:"auth-input"}),(0,c.jsx)("label",{className:"auth-label",children:"Confirm Password"})]}),(0,c.jsx)("div",{className:"auth-button-container",children:(0,c.jsx)("button",{type:"submit",className:"auth-button",children:"Sign Up"})}),(0,c.jsx)("div",{className:"form-links",children:(0,c.jsxs)("p",{children:["Already have an account? ",(0,c.jsx)(i.N_,{to:"/login",className:"auth-link",children:"Login"})]})})]}),(0,c.jsx)(o.A,{loading:b})]})]})}},4091:(e,a,s)=>{s.d(a,{A:()=>i});s(5043);var r=s(6840),t=s(1637),l=s(579);const i=e=>{let{loading:a}=e;return(0,l.jsx)("div",{children:(0,l.jsx)(r.A,{sx:{color:"#fff",zIndex:e=>e.zIndex.drawer+1},open:a,children:(0,l.jsx)(t.A,{color:"inherit"})})})}},3684:(e,a,s)=>{s.d(a,{$:()=>t,O:()=>l});var r=s(7665);const t=r.z.object({email:r.z.string().email(),password:r.z.string().min(6)}),l=r.z.object({email:r.z.string().email(),password:r.z.string().min(6),firstName:r.z.string().min(2),lastName:r.z.string().min(2)})},8419:(e,a,s)=>{e.exports=s.p+"static/media/form_video.03db0046203adf34c65b.mp4"}}]);
//# sourceMappingURL=488.b89c0f42.chunk.js.map