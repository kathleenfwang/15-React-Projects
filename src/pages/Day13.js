import React from "react"
import * as THREE from 'three';

export default class Day13 extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {
        this.startAnimate()
      
    }
startAnimate = () => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.refs.div.appendChild( renderer.domElement );
    camera.position.z = 5;
    var geometry2 = new THREE.TorusKnotBufferGeometry( 10, 3, 100, 16 );
    var material2 = new THREE.MeshNormalMaterial({wireframe:true,depthTest:false,side:THREE.BackSide});
    var torusKnot = new THREE.Mesh( geometry2, material2 );
    var geometry3 = new THREE.IcosahedronGeometry();
    var material3 = makeMaterials()
    var icosahedron = new THREE.Mesh( geometry3, material3 );
    let shapes = [torusKnot,icosahedron]
    function makeMaterials()  {
        return new THREE.MeshNormalMaterial({wireframe:true});
    }
    shapes.forEach((shape) => scene.add(shape))
    const animate = () => {
        requestAnimationFrame( animate );
        shapes.forEach((shape) =>{
            shape.rotation.x += 0.01
            shape.rotation.y += 0.01
        })
        renderer.render( scene, camera );
    }
    animate()
}
 
 
    render() {
        return(
            <div ref ="div">
            </div>
        )
    }
}