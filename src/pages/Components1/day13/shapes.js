import * as THREE from 'three';

var geometry1 = new THREE.TorusKnotBufferGeometry(10, 3, 100, 16);
var material1 = new THREE.MeshNormalMaterial({ wireframe: true, depthTest: false, side: THREE.BackSide });
var torusKnot = new THREE.Mesh(geometry1, material1);

var geometry2 = new THREE.IcosahedronGeometry();
var material2 = makeMaterials()
var icosahedron = new THREE.Mesh(geometry2, material2);

let geometry3 = new THREE.ConeGeometry();
let material3 = makeMaterials()
let cone = new THREE.Mesh(geometry3, material3)

let geometry4 = new THREE.DodecahedronGeometry();
let material4 = makeMaterials()
let dodecahedron = new THREE.Mesh(geometry4,material4)

let geometry5 = new THREE.OctahedronGeometry();
let material5 = makeMaterials()
let octahedron = new THREE.Mesh(geometry5,material5)
 
function makeMaterials() {
    return new THREE.MeshNormalMaterial({ wireframe: true });
}

let shapesInner = {icosahedron,dodecahedron,octahedron,cone}
let shapesOuter = {torusKnot}
export {shapesInner,shapesOuter}
