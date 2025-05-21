
import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader';

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 20, 0);
scene.add(light);

const loader = new GLTFLoader();
let avatar, mixer, actions = {}, activeAction;
let clock = new THREE.Clock();

loader.load('https://models.readyplayer.me/682b7435afef277053209d35.glb', (gltf) => {
    avatar = gltf.scene;
    avatar.scale.set(1.5, 1.5, 1.5);
    scene.add(avatar);

    mixer = new THREE.AnimationMixer(avatar);

    // Fake walking animation (looped up/down motion)
    const walkTrack = new THREE.VectorKeyframeTrack('.position[y]', [0, 0.5], [0, 0.05]);
    const walkClip = new THREE.AnimationClip('Walk', -1, [walkTrack]);
    actions['walk'] = mixer.clipAction(walkClip);
    actions['walk'].play();

    activeAction = actions['walk'];
});

let keys = { w: false, a: false, s: false, d: false };
document.addEventListener('keydown', (e) => { if (e.key in keys) keys[e.key] = true; });
document.addEventListener('keyup', (e) => { if (e.key in keys) keys[e.key] = false; });

function animate() {
    requestAnimationFrame(animate);
    let delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    if (avatar) {
        if (keys.w) avatar.position.z -= 0.05;
        if (keys.s) avatar.position.z += 0.05;
        if (keys.a) avatar.position.x -= 0.05;
        if (keys.d) avatar.position.x += 0.05;
        camera.lookAt(avatar.position);
    }

    renderer.render(scene, camera);
}
animate();
