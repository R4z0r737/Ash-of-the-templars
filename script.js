
import * as THREE from 'https://cdn.skypack.dev/three';

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

let keys = { w: false, a: false, s: false, d: false };
document.addEventListener('keydown', (e) => { if (e.key in keys) keys[e.key] = true; });
document.addEventListener('keyup', (e) => { if (e.key in keys) keys[e.key] = false; });

function animate() {
    requestAnimationFrame(animate);

    if (keys.w) cube.position.z -= 0.05;
    if (keys.s) cube.position.z += 0.05;
    if (keys.a) cube.position.x -= 0.05;
    if (keys.d) cube.position.x += 0.05;

    camera.lookAt(cube.position);
    renderer.render(scene, camera);
}
console.log("Diagnostic build loaded.");
animate();
