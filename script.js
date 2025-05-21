
import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader';

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 4);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

let avatar, mixer, clock = new THREE.Clock();
let move = { w: false, a: false, s: false, d: false };

const loader = new GLTFLoader();
loader.load('https://models.readyplayer.me/682b7435afef277053209d35.glb', function (gltf) {
    avatar = gltf.scene;
    avatar.scale.set(1.5, 1.5, 1.5);
    scene.add(avatar);

    // Vytvoření mixeru s jednoduchým loopem
    mixer = new THREE.AnimationMixer(avatar);
    animate();
});

document.addEventListener('keydown', (e) => { if (e.key in move) move[e.key] = true; });
document.addEventListener('keyup', (e) => { if (e.key in move) move[e.key] = false; });

function animate() {
    requestAnimationFrame(animate);

    let delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    if (avatar) {
        if (move.w) avatar.position.z -= 0.05;
        if (move.s) avatar.position.z += 0.05;
        if (move.a) avatar.position.x -= 0.05;
        if (move.d) avatar.position.x += 0.05;
    }

    camera.lookAt(avatar ? avatar.position : new THREE.Vector3(0, 1.5, 0));
    renderer.render(scene, camera);
}
