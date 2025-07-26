/**
 * @name [textmode.js] Three.js Example
 * @description A simple example of using textmode.js with Three.js.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/textmode.js
 *
 * This example demonstrates how to use textmode.js with Three.js.
 */

import { textmode } from '../../dist/textmode.esm.js';

export const createSketch = (THREE) => {
  let textmodifier = null;

  // Three.js scene components
  let scene, camera, renderer, canvas;
  let cube, torus, sphere;

  const init = async () => {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x001122);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    // Get the canvas reference
    canvas = renderer.domElement;

    // Create geometries and materials
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const torusGeometry = new THREE.TorusGeometry(0.7, 0.3, 16, 100);
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

    // Create materials with different colors
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xff4444 });
    const torusMaterial = new THREE.MeshPhongMaterial({ color: 0x44ff44 });
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x4444ff });

    // Create meshes
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-2, 0, 0);
    cube.castShadow = true;
    scene.add(cube);

    torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(0, 0, 0);
    torus.castShadow = true;
    scene.add(torus);

    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(2, 0, 0);
    sphere.castShadow = true;
    scene.add(sphere);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Attach textmode post-processing
    textmodifier = await textmode.create(canvas, { renderMode: 'manual'});

    window.addEventListener('resize', onWindowResize);

    // Start animation loop
    animate();
  };

  const animate = () => {
    requestAnimationFrame(animate);

    // Rotate objects
    const time = Date.now() * 0.001;

    cube.rotation.x = time;
    cube.rotation.y = time * 0.5;

    torus.rotation.x = time * 0.7;
    torus.rotation.y = time * 0.3;

    sphere.rotation.x = time * 0.3;
    sphere.rotation.z = time * 0.8;

    // Animate camera
    camera.position.x = Math.sin(time * 0.5) * 3;
    camera.position.y = Math.sin(time * 0.3) * 2;
    camera.lookAt(0, 0, 0);

    // Render scene
    renderer.render(scene, camera);

    // Render textmode
    textmodifier.render();
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // Initialize the sketch
  init().catch(console.error);
};
