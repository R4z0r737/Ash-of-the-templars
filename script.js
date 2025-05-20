
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

camera.position.set(0, 1.5, 3);
controls.update();

let mixer;
let avatar;
let clock = new THREE.Clock();
let actions = {};
let currentAction = null;
let move = { forward: false };

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 10, 10);
scene.add(light);

const loader = new GLTFLoader();
loader.load('https://models.readyplayer.me/682b7435afef277053209d35.glb', function (gltf) {
    avatar = gltf.scene;
    avatar.scale.set(1.5, 1.5, 1.5);
    scene.add(avatar);

    mixer = new THREE.AnimationMixer(avatar);

    const walkClip = new THREE.AnimationClip('Walk', -1, [
        new THREE.VectorKeyframeTrack('.position[z]', [0, 1], [0, -0.05]),
    ]);

    const idleClip = THREE.AnimationClip.findByName(gltf.animations, 'idle') || new THREE.AnimationClip('Idle', -1, []);
    actions['idle'] = mixer.clipAction(idleClip);
    actions['walk'] = mixer.clipAction(walkClip);

    actions['idle'].play();
    currentAction = actions['idle'];

    animate();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        move.forward = true;
        switchAction('walk');
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w') {
        move.forward = false;
        switchAction('idle');
    }
});

function switchAction(name) {
    if (currentAction !== actions[name]) {
        currentAction.fadeOut(0.2);
        currentAction = actions[name];
        currentAction.reset().fadeIn(0.2).play();
    }
}

function animate() {
    requestAnimationFrame(animate);
    let delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    if (avatar && move.forward) avatar.translateZ(-0.05);
    controls.update();
    renderer.render(scene, camera);
}
