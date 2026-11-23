import {mkdirSync,readdirSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
const P=readFileSync(join(I,id,'program.bin')),B=readFileSync(join(I,id,'input.bin'));
let pc=0,st=0,ip=0,ex=0,a=0,b=0;
const S:number[]=[],C:number[]=[],M=new Int32Array(256),U=Buffer.alloc(65536);
let ul=0;
const u=(n:number)=>{if(S.length<n)throw 2};
const o=()=>{if(S.length>255)throw 3};
const pop=()=>{if(!S.length)throw 2;return S.pop() as number};
const bin=()=>{b=pop();a=pop()};
const fit=(n:number)=>{if(pc+n>P.length)throw 9};
const imm=()=>P[pc+1]|P[pc+2]<<8;
const off=()=>imm()<<16>>16;
const ps=(v:number)=>S.push(v);
try{for(;;){
if(st++>=1e6)throw 10;
if(pc<0||pc>=P.length)throw 9;
switch(P[pc]){
case 0:throw 0;
case 1:fit(2);o();ps(P[pc+1]<<24>>24);pc+=2;break;
case 2:fit(5);o();ps(P[pc+1]|P[pc+2]<<8|P[pc+3]<<16|P[pc+4]<<24);pc+=5;break;
case 3:pop();pc++;break;
case 4:u(1);o();ps(S[S.length-1]);pc++;break;
case 5:u(2);a=S[S.length-1];S[S.length-1]=S[S.length-2];S[S.length-2]=a;pc++;break;
case 6:u(2);o();ps(S[S.length-2]);pc++;break;
case 7:u(3);a=S[S.length-3];S[S.length-3]=S[S.length-2];S[S.length-2]=S[S.length-1];S[S.length-1]=a;pc++;break;
case 16:bin();ps(a+b|0);pc++;break;
case 17:bin();ps(a-b|0);pc++;break;
case 18:bin();ps(Math.imul(a,b));pc++;break;
case 19:bin();if(!b)throw 4;ps(a/b|0);pc++;break;
case 20:bin();if(!b)throw 4;ps(a%b);pc++;break;
case 21:bin();if(!b)throw 4;ps((a>>>0)/(b>>>0)|0);pc++;break;
case 22:bin();if(!b)throw 4;ps((a>>>0)%(b>>>0)|0);pc++;break;
case 23:ps(-pop()|0);pc++;break;
case 24:bin();ps(a&b);pc++;break;
case 25:bin();ps(a|b);pc++;break;
case 26:bin();ps(a^b);pc++;break;
case 27:ps(~pop());pc++;break;
case 28:bin();ps(a<<(b&31));pc++;break;
case 29:bin();ps(a>>(b&31));pc++;break;
case 30:bin();ps((a>>>(b&31))|0);pc++;break;
case 32:bin();ps(a===b?1:0);pc++;break;
case 33:bin();ps(a<b?1:0);pc++;break;
case 34:bin();ps((a>>>0)<(b>>>0)?1:0);pc++;break;
case 48:fit(3);pc=pc+3+off();break;
case 49:fit(3);a=pop();pc=pc+3+(a===0?off():0);break;
case 50:fit(3);a=pop();pc=pc+3+(a!==0?off():0);break;
case 51:fit(3);if(C.length>63)throw 7;b=imm();C.push(pc+3);pc=b;break;
case 52:if(!C.length)throw 8;pc=C.pop() as number;break;
case 64:a=pop();if(a<0||a>255)throw 6;ps(M[a]);pc++;break;
case 65:a=pop();b=pop();if(a<0||a>255)throw 6;M[a]=b;pc++;break;
case 80:{const t=String(pop());if(ul+t.length>65536)throw 11;ul+=U.write(t,ul);pc++;break;}
case 81:a=pop();if(ul>=65536)throw 11;U[ul++]=a&255;pc++;break;
case 82:o();ps(ip<B.length?B[ip++]:-1);pc++;break;
case 83:throw pop()&255;
default:throw 5;
}
}}catch(e){ex=e as number;}
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,'stdout.bin'),U.subarray(0,ul));
writeFileSync(join(O,id,'exit.txt'),ex+'\n');
}
