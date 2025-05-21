
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls';

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 4);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 20, 0);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.target.set(0, 1.5, 0);
controls.update();

let loader = new GLTFLoader();
let avatar;
loader.load('https://models.readyplayer.me/682b7435afef277053209d35.glb', function(gltf) {
  avatar = gltf.scene;
  avatar.scale.set(1.5, 1.5, 1.5);
  avatar.position.set(0, 0, 0);
  scene.add(avatar);
});

let keys = {};
document.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

function animate() {
  requestAnimationFrame(animate);

  if (avatar) {
    if (keys['w']) avatar.position.z -= 0.05;
    if (keys['s']) avatar.position.z += 0.05;
    if (keys['a']) avatar.position.x -= 0.05;
    if (keys['d']) avatar.position.x += 0.05;
  }

  renderer.render(scene, camera);
}
animate();
