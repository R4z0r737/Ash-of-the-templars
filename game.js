// Nahraj sem FBX soubory do kořene repozitáře podle domluvy.
import * as THREE from "three";
console.log("Ash of the Templars ready");
const scene=new THREE.Scene();scene.background=new THREE.Color(0x87ceeb);
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(renderer.domElement);
scene.add(new THREE.AmbientLight(0xffffff,2));
const ground=new THREE.Mesh(new THREE.PlaneGeometry(500,500),new THREE.MeshStandardMaterial({color:0x4caf50}));ground.rotation.x=-Math.PI/2;scene.add(ground);
camera.position.set(0,8,12);camera.lookAt(0,0,0);
function a(){requestAnimationFrame(a);renderer.render(scene,camera)}a();