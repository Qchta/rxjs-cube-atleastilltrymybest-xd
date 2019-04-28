import * as THREE from 'three';
import { TrackballControls } from 'three-trackballcontrols-ts'
import { of, from } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Cubie } from './cubie'
import { Cube } from './cube'
import { Layer } from './layer'

import './style.css'


const canvas: HTMLCanvasElement = document.querySelector("#canvas > canvas") as HTMLCanvasElement;

let renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera();
let controls = new TrackballControls(camera, renderer.domElement);

let cube: Cube;

configCamera();
configControls();
configRenderer();
createCube();
animate();

function configCamera() {
  camera.position.set(300, 300, 300);
  camera.position.x = 7;
  camera.position.y = 7;
  camera.position.z = 7;

  let axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
}

function configControls() {
  controls.rotateSpeed = 5.0;
}

function configRenderer() {
  renderer.setSize(400, 400);
  renderer.setClearColor(new THREE.Color("gray"));
}

function createCube() {
  cube = new Cube();
  scene.add(cube.getMesh());
}

function animate() {
  window.requestAnimationFrame(() => animate());
  controls.update();
  renderer.render(scene, camera);
}

function rotate(layer: Layer, clockwise: boolean) {
  from(cube.cubies).pipe(
    filter(qb => qb.currentState.layers.has(layer)),

  ).forEach(qb => qb.rotate(layer, clockwise));
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  switch (keyCode) {
    case 70:
      rotate(Layer.FRONT, true); break;
    case 66:
      rotate(Layer.BACK, true); break;
    case 82:
      rotate(Layer.RIGHT, true); break;
    case 76:
      rotate(Layer.LEFT, true); break;
    case 85:
      rotate(Layer.UP, true); break;
    case 68:
      rotate(Layer.DOWN, true); break;
  }
};