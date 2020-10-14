import * as THREE from 'three';

var geometry1 = new THREE.TorusKnotBufferGeometry(10, 3, 100, 16);
var material1 = new THREE.MeshNormalMaterial({ wireframe: true, depthTest: false, side: THREE.BackSide });
var torusKnot = new THREE.Mesh(geometry1, material1);

var geometry2 = new THREE.IcosahedronGeometry();
var material2 = makeMaterials(false)
var icosahedron = new THREE.Mesh(geometry2, material2);

let geometry3 = new THREE.ConeGeometry();
let material3 = makeMaterials(false)
let cone = new THREE.Mesh(geometry3, material3)

let geometry4 = new THREE.DodecahedronGeometry();
let material4 = makeMaterials(false)
let dodecahedron = new THREE.Mesh(geometry4,material4)

let geometry5 = new THREE.OctahedronGeometry();
let material5 = makeMaterials(false)
let octahedron = new THREE.Mesh(geometry5,material5)

var geometry6 = new THREE.RingGeometry( 1, 5, 32 );
var material6 = new THREE.MeshNormalMaterial({wireframe:true,side: THREE.DoubleSide});
var ring = new THREE.Mesh( geometry6, material6 );

var geometry7 = new THREE.TetrahedronGeometry(false);
var material7 = makeMaterials()
let tetrahedron = new THREE.Mesh(geometry7,material7)

var geometry8 = new THREE.TorusGeometry( 10, 3, 16, 100 );
let material8 = makeMaterials()
let torus = new THREE.Mesh(geometry8,material8)
function CustomSinCurve( scale ) {

	THREE.Curve.call( this );

	this.scale = ( scale === undefined ) ? 1 : scale;

}

CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function ( t ) {

	var tx = t * 3 - 1.5;
	var ty = Math.sin( 2 * Math.PI * t );
	var tz = 0;

	return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

};

var path = new CustomSinCurve( 15 );
var geometry9 = new THREE.TubeGeometry( path, 20, 2, 8, false );
var material9 = makeMaterials()
var tube = new THREE.Mesh( geometry9, material9);

function makeMaterials(wireframe = true) {
    return new THREE.MeshNormalMaterial({ wireframe: wireframe });
}

let shapesInner = {icosahedron,dodecahedron,octahedron,tetrahedron,cone}
let shapesOuter = {torusKnot,torus,ring,tube}
export {shapesInner,shapesOuter}
