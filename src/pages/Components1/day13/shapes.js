import * as THREE from 'three';
const basic = true, wireframe = true
let geometry1 = new THREE.TorusKnotBufferGeometry(10, 3, 100, 16);
let material1 = new THREE.MeshNormalMaterial({ wireframe: true, depthTest: false, side: THREE.BackSide });
let torusKnot = new THREE.Mesh(geometry1, material1);

let geometry2 = new THREE.IcosahedronGeometry();
let material2 = makeMaterials(basic,wireframe)
let icosahedron = new THREE.Mesh(geometry2, material2);

let geometry3 = new THREE.ConeGeometry();
let material3 = makeMaterials(basic,wireframe)
let cone = new THREE.Mesh(geometry3, material3)

let geometry4 = new THREE.DodecahedronGeometry();
let material4 = makeMaterials(basic,wireframe)
let dodecahedron = new THREE.Mesh(geometry4,material4)

let geometry5 = new THREE.OctahedronGeometry();
let material5 = makeMaterials(basic,wireframe)
let octahedron = new THREE.Mesh(geometry5,material5)

let geometry6 = new THREE.RingGeometry( 1, 5, 32 );
let material6 = new THREE.MeshNormalMaterial({wireframe:true,side: THREE.DoubleSide});
let ring = new THREE.Mesh( geometry6, material6 );

let geometry7 = new THREE.TetrahedronGeometry();
let material7 = makeMaterials(basic,wireframe)
let tetrahedron = new THREE.Mesh(geometry7,material7)

let geometry8 = new THREE.TorusGeometry( 10, 3, 16, 100 );
let material8 = makeMaterials()
let torus = new THREE.Mesh(geometry8,material8)
function CustomSinCurve( scale ) {

	THREE.Curve.call( this );

	this.scale = ( scale === undefined ) ? 1 : scale;

}

CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function ( t ) {

	let tx = t * 3 - 1.5;
	let ty = Math.sin( 2 * Math.PI * t );
	let tz = 0;

	return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

};

let path = new CustomSinCurve( 15 );
let geometry9 = new THREE.TubeGeometry( path, 20, 2, 8, false );
let material9 = makeMaterials()
let tube = new THREE.Mesh( geometry9, material9);

let x = 0, y = 0;

let heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

let meshFunc = function(u0, v0, pos) {
    pos.set (-100 + 200 * u0, 
    3 * Math.sin(20 * (u0 + v0)), 
    -100 + 200 * v0);
  };
let geometry10 = new THREE.ShapeGeometry( heartShape );
let material10 = makeMaterials()
let heart = new THREE.Mesh( geometry10, material10 ) ;

let geometry11 = new THREE.ParametricGeometry(meshFunc, 40, 40);
let material11 = makeMaterials()
let parametric = new THREE.Mesh( geometry11, material11 );
function makeMaterials(normal = true, wireframe = true) {
    return normal ? new THREE.MeshNormalMaterial({ wireframe}) : new THREE.MeshBasicMaterial({color:"whitesmoke", wireframe})
}

let shapesInner = {icosahedron,dodecahedron,octahedron,tetrahedron,cone}
let shapesOuter = {torusKnot,torus,tube,heart,parametric,ring}
export {shapesInner,shapesOuter}
