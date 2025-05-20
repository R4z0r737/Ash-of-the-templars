
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 20, 10);
scene.add(light);

let avatar;
let move = { forward: false, back: false, left: false, right: false };

const loader = new GLTFLoader();
loader.load('https://models.readyplayer.me/682b7435afef277053209d35.glb', function (gltf) {
    avatar = gltf.scene;
    avatar.scale.set(1.4, 1.4, 1.4);
    avatar.position.set(0, 0, 0);
    scene.add(avatar);
    animate();
});

camera.position.set(0, 2, 5);

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') move.forward = true;
    if (event.key === 's') move.back = true;
    if (event.key === 'a') move.left = true;
    if (event.key === 'd') move.right = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w') move.forward = false;
    if (event.key === 's') move.back = false;
    if (event.key === 'a') move.left = false;
    if (event.key === 'd') move.right = false;
});

function animate() {
    requestAnimationFrame(animate);
    if (avatar) {
        if (move.forward) avatar.position.z -= 0.05;
        if (move.back) avatar.position.z += 0.05;
        if (move.left) avatar.position.x -= 0.05;
        if (move.right) avatar.position.x += 0.05;
    }
    renderer.render(scene, camera);
}
