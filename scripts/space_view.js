const loader = new THREE.TextureLoader();
const earth_texture = loader.load("../assets/images/texture_earth-5400x2700.jpg");
const moon_texture = loader.load("../assets/images/texture_moon-2048x1024.jpg");
const stars = loader.load("../assets/images/stars-1920x1080.jpg");

// Scene
const scene = new THREE.Scene();
scene.background = stars;

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);

camera.position.set(-1, 10, 70);

scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


// Earth Mesh
const earth_geometry = new THREE.SphereGeometry(10, 32, 32);
const earth_material = new THREE.MeshPhongMaterial({ map: earth_texture });
const earth = new THREE.Mesh(earth_geometry, earth_material);
earth.position.set(0, 0, -20)


// Moon Mesh
const moon_geometry = new THREE.SphereGeometry(5, 32, 32);
const moon_material = new THREE.MeshPhongMaterial({ map: moon_texture });
const moon = new THREE.Mesh(moon_geometry, moon_material);


// Light
const light = new THREE.AmbientLight(0xffffff, 2, 0, 2);
light.position.set(30, 10, 10);

moon.position.x = -30
earth.add(moon);

scene.add(light, earth, moon);

function RenderRenderer() {
    
    earth.rotation.y += 0.001;
    
    moon.rotateX += 0.1    
    renderer.render(scene, camera);

    requestAnimationFrame(RenderRenderer);
}

RenderRenderer();