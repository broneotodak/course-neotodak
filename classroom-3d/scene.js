// Three.js and OrbitControls are pinned to r170 / 0.170.0, vendored under ./vendor/.
// No remote resources, telemetry, live student data, or services are used here.
import * as THREE from './vendor/three.module.min.js';
import { OrbitControls } from './vendor/OrbitControls.js';
import { strings, sceneText } from './strings.js';

const $ = id => document.getElementById(id);
const stage = $('stage'), canvas = $('world');
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
let reduced = motionQuery.matches, language = 'en';
try { language = localStorage.getItem('classroom-3d-language') === 'bm' ? 'bm' : 'en'; } catch {}
const hashStop=()=>Math.max(0,Math.min(9,Math.trunc(Number(location.hash.slice(1))||1)-1));
let copy = strings[language], index = hashStop();
let playing = !reduced, exploring = false, ended = false, failed = false;
let clock = 0, elapsed = 0, previousTime = 0, fly = null, dirty = true, uiDirty = true;
const duration = 8, labelNodes = [], routes = [], drawTimes = [], frameTimes = [];
const P = { bg: 0x14152a, panel: 0x1f2140, line: 0x4a4d8a, ink: 0xf2f2ff, soft: 0x9a9cc9, pink: 0xff6ba8, cyan: 0x5be7ff, green: 0x7cff6b, road: 0x202239, dark: 0x101222, stone: 0x35385b, warm: 0xf2c5a1, lilac: 0x807ccb };
const accents = ['#5be7ff', '#ff6ba8', '#5be7ff', '#5be7ff', '#7cff6b', '#ff6ba8', '#f2f2ff', '#7cff6b', '#5be7ff', '#ff6ba8'];
const materialCache = new Map();
const unit = new THREE.BoxGeometry(1, 1, 1), cylinder = new THREE.CylinderGeometry(1, 1, 1, 12);
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-30, 30, 20, -20, .1, 220);
camera.position.set(36, 32, 44);
const world = new THREE.Group(); scene.add(world);
const light = new THREE.DirectionalLight(0xffe5eb, 2.25); light.position.set(-15, 30, 20); scene.add(light);
scene.add(new THREE.HemisphereLight(0xbacaff, 0x36365d, 2.3));
const labels = $('labels');
const labelLines=document.createElementNS('http://www.w3.org/2000/svg','svg');
labelLines.classList.add('label-lines');labels.appendChild(labelLines);
let renderer, orbit;

function mat(color, unlit = false) {
  const key = `${color}:${unlit}`;
  if (!materialCache.has(key)) materialCache.set(key, unlit ? new THREE.MeshBasicMaterial({ color }) : new THREE.MeshLambertMaterial({ color, flatShading: true }));
  return materialCache.get(key);
}
function group(parent, x = 0, y = 0, z = 0) { const g = new THREE.Group(); g.position.set(x, y, z); parent.add(g); return g; }
function mesh(parent, geometry, x, y, z, sx, sy, sz, color, glow = false, dynamic = false) {
  const m = new THREE.Mesh(geometry, mat(color, glow)); m.position.set(x, y, z); m.scale.set(sx, sy, sz); m.userData.dynamic = dynamic; parent.add(m); return m;
}
function box(parent, x, y, z, sx, sy, sz, color, glow = false, dynamic = false) { return mesh(parent, unit, x, y, z, sx, sy, sz, color, glow, dynamic); }
function ring(parent, x, y, z, w, d, color) {
  box(parent,x,y,z-d/2,w,.045,.055,color,true); box(parent,x,y,z+d/2,w,.045,.055,color,true);
  box(parent,x-w/2,y,z,.055,.045,d,color,true); box(parent,x+w/2,y,z,.055,.045,d,color,true);
}
function plinth(x, z, w, d, color, height = .4) {
  const g = group(world, x, 0, z);
  box(g,.28,.02,.28,w+.45,.06,d+.45,P.dark);
  box(g,0,height/2,0,w,height,d,P.stone);
  box(g,0,height+.05,0,w-.16,.1,d-.16,P.panel);
  box(g,0,height/2,d/2+.02,w,.09,.04,color,true);
  return g;
}
function label(key, xyz, stops, color, priority = 1) {
  const el = document.createElement('div'); el.className = 'world-label';
  el.style.setProperty('--label-accent', color); el.innerHTML = '<div class="label-card"><span></span><small></small></div>';
  const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('stroke',color);line.setAttribute('stroke-opacity','.5');labelLines.appendChild(line);
  labels.appendChild(el); labelNodes.push({ key, point: new THREE.Vector3(...xyz), stops, el, line, priority });
}
function person(parent, x, y, z, shirt = P.cyan, scale = 1, turn = 0) {
  const g = group(parent,x,y,z); g.scale.setScalar(scale); g.rotation.y = turn;
  box(g,0,1.16,0,.46,.47,.42,P.warm);
  box(g,0,1.44,-.025,.5,.15,.46,P.dark);
  box(g,-.18,1.3,-.03,.12,.25,.45,P.dark);
  box(g,0,.72,0,.54,.5,.34,shirt);
  box(g,-.36,.76,.03,.17,.43,.2,P.warm); box(g,.36,.76,.03,.17,.43,.2,P.warm);
  box(g,-.16,.29,0,.19,.42,.23,P.line); box(g,.16,.29,0,.19,.42,.23,P.line);
  box(g,-.16,.08,.07,.23,.16,.36,P.ink); box(g,.16,.08,.07,.23,.16,.36,P.ink);
  return g;
}
function tree(x,z,size=1) {
  const g=group(world,x,.3,z); g.scale.setScalar(size);
  box(g,0,.52,0,.2,1,.2,P.lilac);
  box(g,0,1.45,0,.85,1.2,.85,0x428a89);box(g,0,2.04,0,.57,.4,.57,0x68bcb0);
  box(g,.23,.1,.2,1.2,.07,1,P.dark);
}
function lamp(x,z) {
  box(world,x,1.15,z,.12,2.3,.12,P.line);
  box(world,x,2.35,z,.36,.3,.36,P.cyan,true);
  box(world,x,.13,z,.4,.14,.4,P.soft);
}
function windows(g, x, y, z, cols, rows, color, spacing=.7) {
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) box(g,x+c*spacing,y+r*.65,z,.34,.28,.045,(r+2*c)%4===0?P.line:color,true);
}
function road(points,color=P.line,width=.1) {
  for(let i=1;i<points.length;i++) {
    const a = new THREE.Vector3(...points[i-1]), b = new THREE.Vector3(...points[i]);
    const d = b.clone().sub(a), mid = a.clone().add(b).multiplyScalar(.5);
    const m = box(world,mid.x,mid.y,mid.z,width,.025,d.length(),color,true);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),d.normalize());
  }
}

// The island: a small district with a cutaway classroom, streets and chunky curbs.
box(world,0,-.67,0,47,1.15,33,P.dark);
box(world,0,-.08,0,47,.16,33,0x303351);
box(world,0,-.68,16.56,47,.18,.06,P.line);
box(world,23.54,-.68,0,.06,.18,33,P.line);
for(let x=-22;x<24;x+=2) for(let z=-15;z<16;z+=2) box(world,x,.014,z,.025,.02,.8,0x3e4160);
box(world,0,.035,-3.3,45,.06,2.4,P.road);
box(world,.4,.036,6,2.6,.06,16,P.road);
box(world,11,.037,5,2.2,.06,16,P.road);
for(let x=-21;x<23;x+=2.6) box(world,x,.077,-3.3,1,.025,.07,P.soft);
for(let z=-1;z<15;z+=2.2) { box(world,.4,.079,z,.07,.025,.8,P.soft); box(world,11,.079,z,.07,.025,.8,P.soft); }
for(let x=-21;x<22;x+=3) { box(world,x,.1,-4.55,2.7,.19,.16,P.line); box(world,x,.1,-2.05,2.7,.19,.16,P.line); }
for(let i=0;i<7;i++) box(world,-1.2+i*.47,.09,-3.3,.22,.04,1.7,P.ink);
[[ -22,-12],[-22,3],[-22,12],[-18,14],[-4,14],[21,-13],[21,0],[21,13],[-3,-14],[7,-14]].forEach(([x,z],i)=>tree(x,z,.8+i%3*.15));
[[-20,-1],[-3,-1],[1,-5],[10,-5],[20,-5],[9,13],[-2,12]].forEach(([x,z])=>lamp(x,z));

// Classroom: two rows of three stations, one hero screen, a wall and a projector.
const classroom = plinth(-11,5,18,12,P.pink,.42);
box(classroom,0,2,-5.8,18,3.2,.32,0x43486b);
box(classroom,-8.8,1.55,-1.8,.28,2.3,7.7,0x3b4061);
box(classroom,0,3.65,-5.8,18,.15,.43,P.lilac);
box(classroom,-8.8,2.8,-1.8,.36,.14,7.9,P.lilac);
for(let x=-7;x<9;x+=4) {box(classroom,x,2.2,-5.59,2.7,1.4,.05,P.dark);windows(classroom,x-.83,1.91,-5.53,3,2,P.cyan,.8);}
box(classroom,1.6,2.17,-5.47,5.9,2.3,.18,P.dark);
box(classroom,1.6,2.17,-5.35,5.55,1.99,.045,0x293957,true);
for(let r=0;r<3;r++) {
  box(classroom,-.5,2.63-r*.52,-5.30,.63,.14,.04,P.soft,true);
  for(let c=0;c<6;c++) box(classroom,.25+c*.43,2.63-r*.52,-5.30,.3,.22,.04,c<5-r?P.green:P.line,true);
  box(classroom,3.1,2.63-r*.52,-5.30,.77,.16,.04,P.cyan,true);
}
box(classroom,1.6,3.77,-5.3,1.6,.1,.3,P.ink);
box(classroom,1.6,3.35,-1.8,.6,.3,.85,P.ink);
box(classroom,1.6,3.65,-1.8,.08,.4,.08,P.line);
person(classroom,-2,.5,-4.3,P.pink,1.05,.25);
box(classroom,-3.1,1.05,-3.8,1.6,.12,1,P.lilac);
box(classroom,-3.1,.71,-3.8,.12,.6,.12,P.line);
let heroScreen;
function station(x,z,hero=false,shirt=P.cyan) {
  const g=group(classroom,x,.46,z);
  box(g,0,.87,0,3.3,.17,1.65,hero?0x666c91:0x525777);
  for(const dx of [-1.4,1.4]) for(const dz of [-.6,.6]) box(g,dx,.43,dz,.12,.78,.12,P.line);
  for(const [mx,c] of [[-.68,P.cyan],[.63,P.green]]) {
    box(g,mx,1.17,-.4,.13,.51,.13,P.soft);box(g,mx,.98,-.3,.6,.09,.4,P.line);
    box(g,mx,1.6,-.45,1.23,.86,.12,P.dark);
    box(g,mx,1.6,-.37,1.09,.69,.025,0x233149,true);
    if(mx<0){
      box(g,mx-.35,1.61,-.35,.24,.57,.01,P.line,true);
      for(let i=0;i<4;i++)box(g,mx+.12,1.8-i*.14,-.345,.48-i%2*.13,.035,.012,c,true);
      if(hero)heroScreen=new THREE.Vector3(-11+x+mx,.46+1.6,5+z-.3);
    }else{
      box(g,mx-.39,1.59,-.346,.035,.23,.015,P.ink,true);box(g,mx+.39,1.65,-.346,.035,.23,.015,P.ink,true);box(g,mx,1.66,-.34,.065,.065,.02,P.pink,true);
    }
  }
  box(g,-.4,.99,.28,1.2,.055,.4,P.dark);box(g,.58,.99,.28,.22,.06,.3,P.soft);
  for(let i=0;i<3;i++)box(g,-.4,.102+ .91,.17+i*.1,.98,.015,.02,P.line);
  box(g,1.34,.44,-.24,.35,.68,.65,P.dark);box(g,1.34,.65,.09,.15,.035,.018,P.cyan,true);
  box(g,0,.51,1.35,.75,.16,.72,P.line);box(g,0,.8,1.68,.78,.69,.13,P.line);box(g,0,.24,1.35,.12,.44,.12,P.soft);
  person(g,0,.17,1.35,shirt,.85,Math.PI);
  if(hero){ring(g,0,.07,.45,3.7,3.4,P.pink);box(g,1.34,.42,.1,.17,.15,.02,P.pink,true);}
}
station(-6,-1.9,false,P.lilac);station(-.7,-1.9,false,P.green);station(5,-1.9,false,P.pink);
station(-6,2.35,false,P.cyan);station(-.7,2.35,true,P.pink);station(5,2.35,false,P.lilac);
// A design board stands near the hero desk.
box(classroom,7.6,1.95,1.1,.15,2.9,2.8,P.line);
for(let r=0;r<2;r++)for(let c=0;c<2;c++)box(classroom,7.5,1.35+r*1.05,.5+c*1.2,.08,.8,.94,c?P.pink:P.cyan,true);
label('classroom',[-11,4,1],[0,1], '#ff6ba8',10);
label('hero',[-11.7,2.4,7.6],[1], '#5be7ff',9);
label('projector',[-9.4,3.75,-.3],[1,8], '#5be7ff',8);
label('board',[-3.2,3.5,6],[3], '#5be7ff',4);

// GitHub: repository blocks joined like a branch graph.
const github=plinth(-17,-9.3,6,7,P.green);
box(github,0,2,0,4.5,3.1,4.8,0x383e5c);box(github,0,3.66,0,4.9,.28,5.1,P.lilac);
for(let i=0;i<3;i++){box(github,0,1.15+i*.74,2.5,3.7,.52,.25,P.dark);box(github,-1.4,1.15+i*.74,2.65,.18,.18,.04,P.green,true);box(github,.15,1.15+i*.74,2.65,2.1,.06,.04,P.soft,true);}
box(github,-.65,4.2,0,.14,1,.14,P.green,true);box(github,.7,4.47,0,.14,.5,.14,P.green,true);box(github,0,4.28,0,1.4,.14,.14,P.green,true);
[[-.65,3.87],[-.65,4.72],[.7,4.72]].forEach(([x,y])=>box(github,x,y,0,.36,.36,.36,P.green,true));
label('github',[-17,5,-9],[0,4], '#7cff6b',5);

// Recording store: stacked, faceted database drums, all on Todak's side.
const recording=plinth(-9,-9.3,6,7,P.pink);
for(let n=0;n<3;n++) {
  mesh(recording,cylinder,0,1+n*.98,0,2.1,.76,2.1,0x535879);
  mesh(recording,cylinder,0,1.37+n*.98,0,2.13,.08,2.13,n===2?P.pink:P.line,true);
  for(let j=0;j<4;j++)box(recording,-1.12+j*.72,1+n*.98,1.83,.27,.15,.07,P.pink,true);
}
label('recording',[-9,4.4,-9],[0,5], '#ff6ba8',7);

// Rented asset services, represented as three GPU tiles and a geometric sculpture.
const assets=plinth(-1.1,-9.3,6,7,P.cyan);
box(assets,0,1.55,0,4.7,2.1,4.6,P.stone);box(assets,0,2.69,0,5,.2,4.8,P.lilac);
for(let i=0;i<3;i++){box(assets,-1.38+i*1.38,1.52,2.34,1.05,1.1,.11,P.dark);mesh(assets,cylinder,-1.38+i*1.38,1.54,2.42,.36,.08,.36,P.cyan,true).rotation.x=Math.PI/2;}
const sculpture=box(assets,0,3.6,0,1.15,1.15,1.15,P.cyan);sculpture.rotation.set(.3,Math.PI/4,.25);
label('assets',[-1.1,4.6,-9],[0,3], '#5be7ff',4);

// Kay server: visible racks, collector, publisher desk and an orderly build queue.
const kay=plinth(6.7,-9.3,6,7,P.ink);
box(kay,0,.67,0,5.1,.4,5.2,P.line);
for(let j=0;j<3;j++) {
  box(kay,-1.5+j*1.5,2.4,0,1.18,3.2,3.7,P.panel);
  for(let i=0;i<6;i++){box(kay,-1.5+j*1.5,1.14+i*.48,1.91,1,.27,.09,P.line);box(kay,-1.78+j*1.5,1.14+i*.48,1.98,.12,.1,.03,i%2?P.green:P.cyan,true);}
}
box(kay,0,4.09,0,5,.2,4.1,P.lilac);
for(let i=0;i<4;i++)box(kay,-1.65+i*1.08,.93,2.78,.6,.47,.65,P.ink);
label('kay',[6.7,4.8,-9],[0,5,6], '#f2f2ff',6);

// Mac mini in a cutaway IT room. The physical gate is the tunnel, not student access.
const mac=plinth(15,-9.3,7,7,P.cyan);
box(mac,0,1.7,-3.1,7,2.6,.2,P.stone);box(mac,3.35,1.7,-.6,.2,2.6,5.2,P.stone);
box(mac,0,3.08,-3.1,7,.12,.3,P.lilac);
box(mac,.2,1.2,-.2,4.2,.18,2.8,P.lilac);
for(const x of [-1.5,1.9])box(mac,x,.7,-.2,.17,1,.17,P.line);
box(mac,.2,1.64,-.2,2.4,.68,2.2,0xd5def0);box(mac,.2,1.32,-.2,2.1,.12,1.9,P.dark);
box(mac,.85,1.54,.92,.12,.07,.015,P.green,true);
box(mac,.2,1.987,-.2,.37,.018,.37,P.soft);
for(let i=0;i<2;i++){box(mac,-2.3+i*4.65,1.6,2.92,.34,2.4,.38,P.line);box(mac,-2.3+i*4.65,2.88,2.92,.47,.18,.51,P.cyan,true);}
box(mac,0,2.84,2.92,4.65,.22,.3,P.line);
for(let i=0;i<8;i++)box(mac,-2+i*.57,.97,2.92,.19,.14,.21,i%2?P.dark:P.pink,true);
box(mac,-2.78,1.35,2.3,.82,.78,.08,P.dark);box(mac,-2.78,1.35,2.36,.52,.12,.06,P.pink,true);
label('mac',[15,3.8,-9],[0,6], '#5be7ff',9);
label('tunnel',[15,2.6,-5.7],[6], '#ff6ba8',10);

// The course site is a small arcade: the showcase on the ground floor, journey above.
const course=plinth(5,3,7.3,6.5,P.cyan);
box(course,0,1.6,0,6.3,2.3,5.5,P.stone);box(course,0,2.91,0,6.7,.3,5.9,P.lilac);
box(course,0,3.66,-.35,4.9,1.2,4.3,P.panel);box(course,0,4.35,-.35,5.2,.18,4.6,P.cyan);
for(let i=0;i<3;i++) {
  const a=group(course,-1.95+i*1.95,.46,2.15);
  box(a,0,.78,0,1.2,1.5,.82,P.dark);box(a,0,1.09,.44,.96,.65,.025,[P.pink,P.cyan,P.green][i],true);
  box(a,0,.63,.54,1.1,.1,.34,P.line);box(a,-.22,.71,.57,.11,.14,.11,P.ink);box(a,.2,.69,.57,.12,.05,.12,P.pink,true);
  box(a,0,1.6,0,1.32,.22,1,P.lilac);
}
windows(course,-1.6,3.65,1.84,5,1,P.cyan,.8);
label('course',[5,5.2,3],[0,6], '#5be7ff',10);

// Three real chairs, one small AI report stand, and Neo's explicit bypass lever.
const review=plinth(4.7,11,8,5.7,P.green);
for(let i=0;i<3;i++) {
 const x=-2.5+i*2.5;
 box(review,x,.94,-.7,1.06,.2,.9,P.line);box(review,x,1.43,-1.1,1.12,1.1,.16,i===1?P.pink:P.lilac);
 box(review,x,.66,-.7,.14,.47,.14,P.soft);person(review,x,.65,-.7,[P.cyan,P.pink,P.green][i],.8,0);
 box(review,x,1.06,.7,1.5,.12,.86,P.lilac);box(review,x,.72,.7,.15,.6,.15,P.line);
}
box(review,-3.4,1.17,1.6,.43,1.25,.43,P.line);box(review,-3.4,1.93,1.6,.94,1.06,.12,P.ink);
for(let i=0;i<3;i++)box(review,-3.4,2.2-i*.2,1.68,.61,.045,.02,P.line,true);
box(review,.75,1.2,.7,.33,.12,.45,P.dark);
const lever=box(review,.75,1.45,.7,.1,.53,.1,P.pink,true);lever.rotation.z=-.4;
box(review,.86,1.72,.7,.3,.15,.2,P.pink,true);
box(review,3.6,1.3,1.2,.18,1.7,.18,P.green);box(review,3.6,2.21,1.2,.4,.2,.4,P.green,true);
label('review',[4.7,3,11],[0,7], '#7cff6b',9);

// Stores street: separate shop fronts, rather than implying every game goes everywhere.
const stores=plinth(16,5.3,7.3,18.7,P.green);
const storeNames=copy.storeNames;
for(let i=0;i<5;i++) {
 const z=-7.1+i*3.55,c=[P.green,P.cyan,P.pink,P.soft,P.ink][i];
 box(stores,.7,1.31,z,4.9,1.8,2.65,P.stone);box(stores,.7,2.32,z,5.25,.22,2.97,c);
 box(stores,-1.82,1.44,z,.035,1.05,1.8,P.dark);
 box(stores,-1.86,1.49,z,.03,.67,1.29,c,true);
 box(stores,-2.19,2.09,z,.9,.16,2.3,P.lilac);
 for(let k=0;k<4;k++)box(stores,-2.19,2.18,z-.86+k*.57,.85,.025,.27,c,true);
 // Canvas sign uses short names; the HTML review inset carries the full readable ladder.
 const c2=document.createElement('canvas');c2.width=512;c2.height=96;
 const ctx=c2.getContext('2d');ctx.fillStyle='#14152a';ctx.fillRect(0,0,512,96);ctx.fillStyle='#f2f2ff';ctx.font='bold 34px monospace';ctx.textAlign='center';ctx.fillText(storeNames[i],256,60);
 const tex=new THREE.CanvasTexture(c2);tex.colorSpace=THREE.SRGBColorSpace;
 const sign=new THREE.Mesh(new THREE.PlaneGeometry(3.9,.73),new THREE.MeshBasicMaterial({map:tex}));sign.position.set(.7,2.84,z+1.37);stores.add(sign);sign.userData.dynamic=true;
}
label('stores',[16,3.5,7],[0,7], '#7cff6b',8);

// The paths are also readable when motion is reduced or paused.
road([[-11.7,.14,8],[.4,.14,8],[.4,.14,-3.3],[6.7,.14,-3.3],[6.7,.14,-7]],P.pink,.075);
road([[6.7,.15,-7],[6.7,.15,-4.3],[-9,.15,-4.3],[-9,.15,-7]],P.pink,.075);
road([[6.7,.16,-9.3],[15,.16,-9.3],[15,.16,-3.2],[10.4,.16,-3.2],[10.4,.16,8],[8,.16,11]],P.ink,.08);
road([[8,.14,11],[11,.14,11],[11,.14,3],[7,.14,3]],P.green,.08);
road([[-17,.14,-7],[-17,.14,-3],[.5,.14,-3],[.5,.14,7]],P.green,.075);

// Collapse every static primitive into geometry/material batches. No realtime shadows,
// external textures or postprocessing: the model keeps the draw-call count small.
function batchStatics() {
 world.updateMatrixWorld(true);
 const batches=new Map(), originals=[];
 world.traverse(m=>{
  if(!m.isMesh||m.userData.dynamic)return;
  const key=m.geometry.uuid+':'+m.material.uuid;
  if(!batches.has(key))batches.set(key,{geometry:m.geometry,material:m.material,matrices:[]});
  batches.get(key).matrices.push(m.matrixWorld.clone()); originals.push(m);
 });
 for(const m of originals)m.removeFromParent();
 for(const b of batches.values()){
  const m=new THREE.InstancedMesh(b.geometry,b.material,b.matrices.length);
  b.matrices.forEach((matrix,i)=>m.setMatrixAt(i,matrix));m.computeBoundingSphere();scene.add(m);
 }
}
batchStatics();

// Matched prompt/reply/copy cycles: every illustrated prompt has a recording copy.
function route(type, points, stops, phase=0, speed=8, shape='cube') {
 const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),false,'centripetal');
 routes.push({type,curve,stops,phase,speed,shape});
}
const student=[-11.7,1.8,9],desk=[-11.7,2.5,7.05],collector=[6.7,2.4,-8],store=[-9,3.8,-9];
for(let i=0;i<3;i++) {
 route('prompt',[student,[-11.7,3.2,8],desk],[0,1,2,3,4,5],i/3,6);
 route('prompt',[desk,[-12.6,3.3,8.1],student],[0,1,2,3,4,5],i/3+.5,6);
 route('prompt',[student,[-8,4.3,6],[.4,4.8,0],collector,[0,5,-9],store],[0,1,2,3,4,5],i/3,6);
 route('asset',[[-1.1,3.5,-9],[-2,5,-3],desk,[-3.5,3.3,6]],[0,3],i/3,7);
 route('code',[desk,[-9.4,3.1,6.6],[-10.3,2.4,7.05]],[0,4],i/3,4);
 route('code',[desk,[-14,4.2,2],[-17,4.2,-9]],[0,4],i/3,7);
 route('build',[[6.7,1.5,-6.5],[10,2,-5.7],[15,2,-5.7],[15,2.4,-9.3],[12,5,-5],[10,4,6],[4.7,2.5,11]],[0,6],i/3,9);
 route('build',[[4.7,2.5,11],[4.7,3.5,7],[5,3,3]],[0,6],i/3,9);
}
route('build',[[6.7,3,-9],[4,5,-3],[4.7,3.3,11]],[0,7],0,6,'page');
route('prompt',[store,[-4,5,-1],[-9.4,2.8,-.2]],[0,5,8],0,7);
const packetColors={prompt:P.pink,asset:P.cyan,code:P.green,build:P.ink};
const packetBatches={};
for(const [type,color] of Object.entries(packetColors)) {
 const count=routes.filter(r=>r.type===type).length;
 const m=new THREE.InstancedMesh(unit,mat(color,true),count);m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);m.frustumCulled=false;scene.add(m);packetBatches[type]=m;
}
// Approved games walk along the publishing street as little cartridge characters.
const walkers=[];
for(let i=0;i<3;i++) {
 const g=group(scene); const color=[P.cyan,P.pink,P.green][i];
 box(g,0,.89,0,.65,.84,.32,color,false,true);box(g,0,1.01,.18,.4,.36,.02,P.dark,true,true);
 const l=box(g,-.2,.26,0,.16,.48,.18,P.ink,false,true),r=box(g,.2,.26,0,.16,.48,.18,P.ink,false,true);
 walkers.push({g,l,r,phase:i/3});
}
const projectorPulse = new THREE.InstancedMesh(unit,mat(P.green,true),5);
projectorPulse.frustumCulled=false;scene.add(projectorPulse);
const packetDummy=new THREE.Object3D();
function animateWorld(t) {
 const counters={prompt:0,asset:0,code:0,build:0};
 for(const r of routes) {
  const active=r.stops.includes(index), f=(t/r.speed+r.phase)%1;
  const p=r.curve.getPoint(f);packetDummy.position.copy(p);
  packetDummy.rotation.set(f*2,f*3,.3);
  const s=active?.27:0;packetDummy.scale.set(s,r.shape==='page'?s*1.8:s,r.shape==='page'?s*.18:s);packetDummy.updateMatrix();
  packetBatches[r.type].setMatrixAt(counters[r.type]++,packetDummy.matrix);
 }
 Object.values(packetBatches).forEach(m=>m.instanceMatrix.needsUpdate=true);
 for(const w of walkers) {
  w.g.visible=index===0||index===7;
  const f=(t/15+w.phase)%1;w.g.position.set(12.8,.4,12-f*14);w.g.rotation.y=-Math.PI/2;
  w.l.rotation.x=reduced?0:Math.sin(t*7+w.phase*6)*.45;w.r.rotation.x=-w.l.rotation.x;
 }
 projectorPulse.visible=index===8;
 for(let i=0;i<5;i++){
  packetDummy.position.set(-10.75+i*.43,2.17,-.285);
  packetDummy.rotation.set(0,0,0);
  packetDummy.scale.set(.3,.22,.04);
  packetDummy.updateMatrix();projectorPulse.setMatrixAt(i,packetDummy.matrix);
  projectorPulse.setColorAt(i,new THREE.Color((reduced||i<Math.floor(t%4)+1)?P.green:P.line));
 }
 projectorPulse.instanceMatrix.needsUpdate=true;
 if(projectorPulse.instanceColor)projectorPulse.instanceColor.needsUpdate=true;
}

const views=[
 {target:[0,0,0],offset:[36,32,44],height:32,width:57},
 {target:[-11,1.3,4],offset:[15,17,24],height:16,width:24},
 {target:heroScreen.toArray(),offset:[.5,1.1,7],height:3.2,width:6},
 {target:heroScreen.toArray(),offset:[.15,.9,7],height:3.2,width:6},
 {target:heroScreen.toArray(),offset:[.7,1,7],height:3.2,width:6},
 {target:[-2.5,1,-4],offset:[24,26,34],height:25,width:41},
 {target:[10,1,-3.7],offset:[22,24,34],height:23,width:33},
 {target:[12,1.3,6],offset:[18,21,29],height:23,width:29},
 {target:[-10,1.2,2],offset:[12,13,21],height:14,width:23},
 {target:[0,0,0],offset:[36,32,44],height:32,width:57}
];
let width=1,height=1,viewHeight=32;
function fitHeight(view) { return Math.max(view.height,view.width/(width/height))*(width<560?1.12:1.05); }
function setFrustum(h) {
 viewHeight=h;const aspect=width/height;
 camera.left=-h*aspect/2;camera.right=h*aspect/2;camera.top=h/2;camera.bottom=-h/2;camera.updateProjectionMatrix();
}
function flyTo(instant=false) {
 if(!orbit)return;
 const view=views[index],target=new THREE.Vector3(...view.target),offset=new THREE.Vector3(...view.offset);
 if(width<560&&(index===0||index===9))offset.y=65;
 const position=target.clone().add(offset);
 orbit.enableDamping=false;orbit.update();orbit.enableDamping=!reduced;
 const toHeight=fitHeight(view);
 if(instant||reduced){camera.position.copy(position);orbit.target.copy(target);camera.zoom=1;setFrustum(toHeight);camera.lookAt(target);fly=null;}
 else fly={from:camera.position.clone(),to:position,fromTarget:orbit.target.clone(),target,fromHeight:viewHeight/camera.zoom,toHeight,t:0};
 camera.zoom=1;camera.updateProjectionMatrix();dirty=true;uiDirty=true;
}
function resize() {
 width=stage.clientWidth;height=stage.clientHeight;
 if(renderer) {
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,width<560?1.5:1.65));renderer.setSize(width,height,false);
  if(exploring)setFrustum(viewHeight);else flyTo(true);
 }
 dirty=true;uiDirty=true;
 $('orbit-hint').textContent=reduced?copy.reduced:exploring?copy.resume:width<560?copy.touch:copy.orbit;
}
function updateLabels() {
 const placed=[];
 if(!exploring)for(const id of ['route','review','dashboard']){
  const el=$(id);if(el.classList.contains('show')){
   const r=el.getBoundingClientRect(),s=stage.getBoundingClientRect();placed.push({left:r.left-s.left,right:r.right-s.left,top:r.top-s.top,bottom:r.bottom-s.top});
  }
 }
 const ordered=[...labelNodes].sort((a,b)=>b.priority-a.priority);
 camera.updateMatrixWorld();
 for(const label of ordered) {
  const {el,line}=label;line.style.display='none';
  if(!label.stops.includes(index)||([2,3,4,9].includes(index)&&!exploring)){el.hidden=true;continue;}
  const p=label.point.clone().project(camera);
  let x=(p.x*.5+.5)*width,y=(-p.y*.5+.5)*height;
  const mobile=width<560;
  // Overview keeps the model readable on a phone; focused stops reveal their detail.
  if(mobile&&index===0&&!['classroom','mac','course','stores'].includes(label.key)){el.hidden=true;continue;}
  el.classList.toggle('detail',index!==0);el.hidden=false;
  const w=el.offsetWidth,h=el.offsetHeight;
  const anchorX=x,anchorY=y+10;
  let rect={left:x-w/2,right:x+w/2,top:y-h,bottom:y};
  const collides=r=>placed.some(b=>r.left<b.right+8&&r.right>b.left-8&&r.top<b.bottom+7&&r.bottom>b.top-7);
  // Give nearby signs a second row instead of silently dropping important buildings.
  if(index===0){
   y=Math.max(y,h+55);rect={left:x-w/2,right:x+w/2,top:y-h,bottom:y};
   const candidates=[];
   for(let row=-3;row<=3;row++)for(let col=-2;col<=2;col++)candidates.push([col*(w*.6+12),row*(h+10)]);
   candidates.sort((a,b)=>Math.hypot(...a)-Math.hypot(...b));
   if(collides(rect))for(const [dx,dy] of candidates){
    const candidate={left:rect.left+dx,right:rect.right+dx,top:rect.top+dy,bottom:rect.bottom+dy};
    if(candidate.left>8&&candidate.right<width-8&&candidate.top>49&&candidate.bottom<height-38&&!collides(candidate)){x+=dx;y+=dy;rect=candidate;break;}
   }
  }
  if(index===6&&label.key==='mac'&&collides(rect)){
   y-=h+10;rect={left:x-w/2,right:x+w/2,top:y-h,bottom:y};
  }
  const collision=collides(rect);
  if(p.z< -1||p.z>1||rect.left<8||rect.right>width-8||rect.top<49||rect.bottom>height-34||collision){el.hidden=true;continue;}
  el.style.transform=`translate(${Math.round(x-w/2)}px,${Math.round(y-h)}px)`;placed.push(rect);
  line.setAttribute('x1',x);line.setAttribute('y1',y);line.setAttribute('x2',anchorX);line.setAttribute('y2',anchorY);line.style.display='';
 }
}
function createWorkbench() {
 const s=copy.screen,design=index===3;
 $('workbench').dataset.desk=design?'design':'build';
 $('workbench').innerHTML=`<div class="screen-title"><b>${s.title}</b><span>${s.week}</span></div>
 <div class="screen-grid"><aside class="sidebar"><h3>${s.steps}</h3>${s.stepList.map(t=>`<div class="step-item">${t}</div>`).join('')}<div class="side-links"><span>${s.board}</span><span>${s.links}</span><span>${s.journey}</span></div><div class="side-actions">${s.actions.map(t=>`<span>${t}</span>`).join('')}</div></aside>
 <div class="code-pane"><div class="file-tab">${design?sceneText.folder:sceneText.file}</div><pre>${sceneText.code}</pre><div class="design-art"><div class="art-card"><i class="pixel-art"></i></div><div class="art-card"><i class="pixel-art"></i></div><div class="art-card"><i class="pixel-art"></i></div></div><div class="file-tree">${s.files.join('<br>')}</div></div>
 <div class="desks"><section class="desk ${design?'active':''}" style="--desk-color:var(--cyan)"><header>${s.design}<em>${design?s.active:s.closed}</em></header><h3>${sceneText.designName}</h3><p>${s.designPrompt}</p><p class="reply">${s.designReply}</p></section><section class="desk ${design?'':'active'}" style="--desk-color:var(--green)"><header>${s.build}<em>${design?s.closed:s.active}</em></header><h3>${sceneText.buildName}</h3><p>${s.buildPrompt}</p><p class="reply">${s.buildReply}</p></section></div>
 <div class="godot"><div class="godot-title">${s.live}</div><div class="pong"><span class="score">${sceneText.score}</span><i class="paddle left"></i><i class="paddle right"></i><i class="ball"></i></div><div class="game-caption">${s.keys}<br>${design?s.assets:s.code}</div></div></div>
 <i class="screen-packet prompt"></i><i class="screen-packet response"></i><i class="screen-packet output"></i><i class="screen-packet recorded"></i>
 <div class="screen-footer"><span>${s.saved}</span><span>${s.note}</span></div>`;
}
function buildInsets() {
 createWorkbench();
 const d=copy.dashboard;
 $('dashboard').innerHTML=`<p class="inset-kicker">${d.subtitle}</p><h2>${d.title}</h2><table class="dashboard-table"><thead><tr><th></th>${d.columns.map(t=>`<th>${t}</th>`).join('')}</tr></thead><tbody>${d.rows.map((t,i)=>`<tr><td>${t}</td><td><span class="progress-blocks">${Array.from({length:5},(_,j)=>`<i class="${j>4-i?'off':''}"></i>`).join('')}</span></td><td>${i===2?d.progress:d.ready}</td><td>${i===2?'—':d.open}</td></tr>`).join('')}</tbody></table><div class="private-note">${d.footer}</div><div class="journey-line"><p>${d.journey}</p><b>${d.trail.join(' → ')}</b></div>`;
 const r=copy.reviewPanel;
 $('review').innerHTML=`<div class="inset-kicker">${r.title}</div><b>${r.ai}</b><div class="chair-labels">${r.chairs.map(t=>`<span>${t}</span>`).join('')}</div><p><b>${r.bypass}</b> · ${r.note}</p><ul class="ladder">${r.ladder.map(t=>`<li>${t}</li>`).join('')}</ul><p>${r.planned}</p><p>${r.update}</p>`;
 const take=copy.takehome;
 $('takehome').innerHTML=`<div class="inset-kicker">${take.title}</div><div class="game-cards">${take.cards.map((t,i)=>`<div class="game-card" style="--card-color:${['var(--cyan)','var(--pink)','var(--green)'][i]}"><div class="pixel-art"></div><span>${t}</span></div>`).join('')}</div><p>${take.footer}</p><div class="takehome-links"><a href="/">${take.link} ↗</a><a href="/documentation/demo/try/">${take.demoLink} ↗</a></div>`;
}
function setLanguage(lang) {
 language=lang;copy=strings[lang];
 try{localStorage.setItem('classroom-3d-language',lang);}catch{}
 document.documentElement.lang=lang==='bm'?'ms':'en';document.title=copy.pageTitle;
 document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=copy[el.dataset.i18n]);
 $('lang-en').setAttribute('aria-pressed',String(lang==='en'));$('lang-bm').setAttribute('aria-pressed',String(lang==='bm'));
 document.querySelector('.language').setAttribute('aria-label',copy.language);
 canvas.setAttribute('aria-label',copy.sceneLabel);$('controls').setAttribute('aria-label',copy.chapters);
 for(const l of labelNodes){l.el.querySelector('span').textContent=copy.names[l.key];l.el.querySelector('small').textContent=copy.details[l.key];}
 $('legend').innerHTML=copy.legend.map((t,i)=>`<span><i style="--c:${['var(--pink)','var(--cyan)','var(--green)','var(--ink)'][i]}"></i>${t}</span>`).join('');
 $('stops').innerHTML=copy.stops.map((s,i)=>`<button class="stop-button" type="button" data-stop="${i}" aria-label="${copy.stop} ${i+1}: ${s.title}" title="${s.title}"><i></i></button>`).join('');
 buildInsets();updateUI();dirty=true;
}
function updateUI() {
 const s=copy.stops[index];
 $('chapter').textContent=s.tag;$('title').textContent=s.title;$('caption-1').textContent=s.lines[0];$('caption-2').textContent=s.lines[1];
 document.documentElement.style.setProperty('--accent',accents[index]);
 $('count').textContent=String(index+1).padStart(2,'0');
 for(const b of document.querySelectorAll('[data-stop]')) {
  const n=Number(b.dataset.stop);b.classList.toggle('visited',n<index);
  b.disabled=failed;
  if(n===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');
 }
 $('previous').disabled=failed||index===0;$('next').disabled=failed||index===9;
 $('play').disabled=failed||reduced;
 for(const [id,label] of [['previous',copy.previous],['next',copy.next],['play',playing?copy.pause:ended?copy.replay:copy.play]]){$(id).setAttribute('aria-label',label);$(id).title=label;}
 if(reduced){$('play').setAttribute('aria-label',copy.reduced);$('play').title=copy.reduced;}
 $('play').innerHTML=playing?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" stroke-width="3"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z" fill="currentColor" stroke="none"/></svg>';
 $('status').textContent=ended?copy.finished:exploring?copy.exploring:playing?copy.touring:copy.paused;
 $('orbit-hint').textContent=reduced?copy.reduced:exploring?copy.resume:width<560?copy.touch:copy.orbit;
 const p=index===5?copy.recordingPanel:copy.buildPanel;
 $('route').innerHTML=`<p class="inset-kicker">${p.title}</p><div class="route-steps">${p.steps.map(t=>`<span>${t}</span>`).join('')}</div><p>${p.note}</p>`;
 createWorkbench();uiDirty=true;
}
function updateInsets() {
 const settled=!fly||fly.t>.74,show=settled&&!exploring&&!failed;
 for(const [id,visible] of [['workbench',index>=2&&index<=4],['route',index===5||index===6],['review',index===7],['dashboard',index===8],['takehome',index===9]]) {
  const el=$(id),on=show&&visible;el.classList.toggle('show',on);el.setAttribute('aria-hidden',String(!on));el.inert=!on;
 }
 uiDirty=false;
}
function go(n,manual=false) {
 if(failed)return;
 index=Math.max(0,Math.min(9,n));elapsed=0;ended=false;
 if(exploring&&manual)playing=!reduced;
 exploring=false;
 try{history.replaceState(null,'',`#${index+1}`);}catch{}
 flyTo();updateUI();
}
function setPlaying(value) {
 if(failed||reduced)return;
 if(value&&ended){index=0;ended=false;elapsed=0;flyTo();}
 if(value&&exploring){exploring=false;flyTo();}
 playing=value;previousTime=0;updateUI();dirty=true;
}
function onExplore() {
 if(failed)return;
 if(!exploring){exploring=true;playing=false;fly=null;updateUI();}dirty=true;
}
function fail() {
 failed=true;playing=false;$('loading').hidden=true;$('fallback').hidden=false;
 document.querySelectorAll('#controls button').forEach(b=>b.disabled=true);
 $('status').textContent=copy.paused;canvas.tabIndex=-1;
 document.querySelectorAll('.inset').forEach(el=>{el.classList.remove('show');el.inert=true;});
}
$('lang-en').addEventListener('click',()=>setLanguage('en'));$('lang-bm').addEventListener('click',()=>setLanguage('bm'));
$('previous').addEventListener('click',()=>go(index-1,true));$('next').addEventListener('click',()=>go(index+1,true));
$('overview').addEventListener('click',()=>{playing=false;exploring=false;go(0,true);});
$('play').addEventListener('click',()=>setPlaying(!playing));
$('stops').addEventListener('click',e=>{const b=e.target.closest('[data-stop]');if(b)go(Number(b.dataset.stop),true);});
window.addEventListener('keydown',e=>{
 if(e.altKey||e.ctrlKey||e.metaKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
 if(e.key==='ArrowRight'){e.preventDefault();go(index+1,true);}
 else if(e.key==='ArrowLeft'){e.preventDefault();go(index-1,true);}
 else if(e.code==='Space'&&!e.target.closest('button,a')){e.preventDefault();setPlaying(!playing);}
});
// Canvas gestures always orbit. Horizontal swipes on the caption/control area step
// the tour, so a single gesture can never both move the camera and change a stop.
for(const el of [$('story'),$('controls')]) {
 let start=null;
 el.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'&&!e.target.closest('button'))start={x:e.clientX,y:e.clientY};});
 el.addEventListener('pointerup',e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.6)go(index+(dx<0?1:-1),true);});
 el.addEventListener('pointercancel',()=>start=null);
}
window.addEventListener('hashchange',()=>go(hashStop()));
motionQuery.addEventListener('change',e=>{reduced=e.matches;if(reduced){playing=false;flyTo(true);}if(orbit)orbit.enableDamping=!reduced;updateUI();dirty=true;});
document.addEventListener('visibilitychange',()=>{previousTime=0;dirty=true;});
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();fail();});
setLanguage(language);

try {
 // Check before constructing Three's renderer to keep unsupported WebGL a normal UI state.
 const gl=canvas.getContext('webgl2',{alpha:true,antialias:true,powerPreference:'high-performance'});
 if(!gl)fail();
 else {
  renderer=new THREE.WebGLRenderer({canvas,context:gl,alpha:true,antialias:true,powerPreference:'high-performance'});
  renderer.setClearColor(P.bg,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
  orbit=new OrbitControls(camera,canvas);orbit.target.set(0,0,0);orbit.enableDamping=!reduced;orbit.dampingFactor=.09;
  orbit.minPolarAngle=.18;orbit.maxPolarAngle=Math.PI/2-.045;orbit.minZoom=.5;orbit.maxZoom=5;orbit.enablePan=false;
  orbit.addEventListener('start',onExplore);orbit.addEventListener('change',()=>{dirty=true;});
  new ResizeObserver(resize).observe(stage);resize();flyTo(true);
  $('loading').hidden=true;canvas.dataset.ready='true';
 }
} catch { fail(); }

let frameNumber=0,lastLabelUpdate=0;
function frame(now) {
 requestAnimationFrame(frame);
 if(failed||document.hidden||!renderer)return;
 const delta=previousTime?Math.min((now-previousTime)/1000,.1):0;
 if(previousTime&&playing&&!reduced&&frameTimes.length<1800)frameTimes.push(now-previousTime);
 previousTime=now;
 const animate=playing&&!reduced;
 if(animate){clock+=delta;elapsed+=delta;dirty=true;}
 if(playing&&elapsed>=duration){
  if(index===9){playing=false;ended=true;updateUI();}
  else go(index+1);
 }
 // Reduced motion leaves navigation manual and the simulation completely still.
 if(fly) {
  fly.t=Math.min(1,fly.t+delta/1.65);const f=fly.t*fly.t*(3-2*fly.t);
  camera.position.lerpVectors(fly.from,fly.to,f);orbit.target.lerpVectors(fly.fromTarget,fly.target,f);
  setFrustum(THREE.MathUtils.lerp(fly.fromHeight,fly.toHeight,f));camera.lookAt(orbit.target);dirty=true;uiDirty=true;
  if(fly.t===1)fly=null;
 }else orbit.update();
 if(uiDirty)updateInsets();
 if(dirty){
  const begin=performance.now();animateWorld(clock);
  renderer.render(scene,camera);
  if(now-lastLabelUpdate>45||!animate){updateLabels();lastLabelUpdate=now;}
  if(index>=2&&index<=4){
   const pong=$('workbench').querySelector('.pong'), phase=clock*.8;
   pong.querySelector('.ball').style.left=`${12+(1-Math.abs((phase%2)-1))*74}%`;
   pong.querySelector('.ball').style.top=`${48+Math.sin(phase*2.5)*26}%`;
   pong.querySelector('.left').style.top=`${50+Math.sin(phase*2.5)*23}%`;
   pong.querySelector('.right').style.top=`${50+Math.sin(phase*2.5+1.4)*23}%`;
   const f=(clock/4)%1,wb=$('workbench');
   wb.querySelector('.prompt').style.cssText=`left:${18+f*43}%;top:${index===3?24:55}%;`;
   wb.querySelector('.response').style.cssText=`left:${61-f*43}%;top:${index===3?28:59}%;`;
   wb.querySelector('.output').style.cssText=`left:${index===3?60-f*27:60+f*24}%;top:${index===3?38:70}%;background:${index===3?'var(--cyan)':'var(--green)'};`;
   wb.querySelector('.recorded').style.cssText=`left:${61-f*53}%;top:${62+f*34}%;`;
  }
  const progress=document.querySelector('[aria-current="step"] i');if(progress)progress.style.transform=`scaleX(${Math.min(elapsed/duration,1)})`;
  if(drawTimes.length<1800)drawTimes.push(performance.now()-begin);
  dirty=false;frameNumber++;
 }
}
requestAnimationFrame(frame);
// Read-only local diagnostics for Chromium verification; no data leaves the page.
Object.defineProperty(window,'classroom3d',{value:{
 get state(){return {stop:index+1,language,playing,exploring,reduced,failed,transition:!!fly,frameNumber,activeDesk:index===3?'design':'build'};},
 get metrics(){return {frameTimes:[...frameTimes],drawTimes:[...drawTimes],calls:renderer?.info.render.calls,triangles:renderer?.info.render.triangles,geometries:renderer?.info.memory.geometries,textures:renderer?.info.memory.textures,pixelRatio:renderer?.getPixelRatio(),three:THREE.REVISION};}
}});
