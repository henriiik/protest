import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as THREE from 'three';

function Hello(props: { name: string }) {
    return <div>Hello, {props.name}</div>;
}

let appContainer = document.getElementById("left");
if (appContainer) {
    ReactDOM.render(<Hello name="World!" />, appContainer)
} else {
    let elem = document.createElement('p');
    elem.innerText = 'Could not find #left element.';
    document.body.appendChild(elem);
}


let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.Renderer;
let geometry: THREE.BoxGeometry, material: THREE.Material, mesh: THREE.Mesh;

function init(container: HTMLElement) {
    let bound = container.getBoundingClientRect();
    let width = bound.width;
    let height = bound.height;

    scene = new THREE.Scene();

    let ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1).normalize();
    scene.add(directionalLight);

    camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
    camera.position.z = 100;

    geometry = new THREE.BoxGeometry(20, 20, 20);
    material = new THREE.MeshLambertMaterial({ color: 0x99ccff });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    scene.background = new THREE.Color(0xffffff)

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    canvasContainer.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}

let canvasContainer = document.getElementById("right");
if (canvasContainer) {
    init(canvasContainer);
    animate();
} else {
    let elem = document.createElement('p');
    elem.innerText = 'Could not find #right element.';
    document.body.appendChild(elem);
}
