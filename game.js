import * as THREE from "three";
const scene=new THREE.Scene();scene.background=new THREE.Color(0x87ceeb);
const camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.1,1000);
const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setSize(innerWidth,innerHeight);document.body.appendChild(renderer.domElement);
scene.add(new THREE.AmbientLight(0xffffff,2));const sun=new THREE.DirectionalLight(0xffffff,2);sun.position.set(10,20,10);scene.add(sun);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(300,300),new THREE.MeshStandardMaterial({color:0x3f9b3f}));ground.rotation.x=-Math.PI/2;scene.add(ground);
const player=new THREE.Group();
const body=new THREE.Mesh(new THREE.BoxGeometry(1.2,1.8,.8),new THREE.MeshStandardMaterial({color:0x222222}));body.position.y=2;
const head=new THREE.Mesh(new THREE.SphereGeometry(.35),new THREE.MeshStandardMaterial({color:0xd5c1a3}));head.position.y=3.3;
const sword=new THREE.Mesh(new THREE.BoxGeometry(.1,1.8,.1),new THREE.MeshStandardMaterial({color:0xc0c0c0}));sword.position.set(.8,2,0);
player.add(body,head,sword);scene.add(player);
const keys={};addEventListener('keydown',e=>keys[e.key.toLowerCase()]=true);addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
function update(){let s=.15;if(keys.w)player.position.z-=s;if(keys.s)player.position.z+=s;if(keys.a)player.position.x-=s;if(keys.d)player.position.x+=s;camera.position.set(player.position.x,8,player.position.z+12);camera.lookAt(player.position.x,2.5,player.position.z);}
function loop(){requestAnimationFrame(loop);update();renderer.render(scene,camera);}loop();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});