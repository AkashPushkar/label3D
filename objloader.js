// 1. Creation of scene, camera and renderer objects

// scene object
var scene = new THREE.Scene;

// Camera object
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer object
var renderer = new THREE.WebGLRenderer();
// size which we want to render for is given the bracket
renderer.setSize(window.innerWidth, window.innerHeight);
// add renderer element to canvas
document.body.appendChild(renderer.domElement);


// Adding controls to the window
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;


// Adding light parameters to the window
var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

// var ambiLight = new THREE.AmbientLight(0x404040);
// ambiLight.position.set(100, 100, 100)
// scene.add(ambiLight);


// Loading material (MTLLoader) properties
// var mtlLoader = new THREE.MTLLoader();
// mtlLoader.setResourcePath('http://0.0.0.0:8000/obj%20data/');
// mtlLoader.setPath('http://0.0.0.0:8000/obj%20data/');
// mtlLoader.load('mesh.mtl', function (materials) {

//     materials.preload();

//     var objLoader = new THREE.OBJLoader();
//     objLoader.setMaterials(materials);
//     objLoader.setPath('http://0.0.0.0:8000/obj%20data/');
//     objLoader.load('mesh.obj', function (object) {

//         scene.add(object);
//         // object.position.y -= 60;
//         console.log('loaded done')

//     },
//     function(xhr){
//     	console.log('ongoing')
//     },

//     function(error){
//     	console.log('fail')
//     });

// });


var loader = new THREE.OBJLoader();

// load a resource
loader.load(
	// resource URL
	'http://0.0.0.0:8000/obj%20data/mesh.obj',
	// called when resource is loaded
	function ( object ) {
		// object.position.y -=60;
		scene.add( object );


	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


// Updating the frame everytime we change the frame
var animate = function(){
	requestAnimationFrame(animate);
	
	controls.update();
	renderer.render(scene, camera);
};

animate();
