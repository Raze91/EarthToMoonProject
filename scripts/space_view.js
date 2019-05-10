const loader = new THREE.TextureLoader();
const earth_texture = loader.load("../assets/images/texture_earth-5400x2700.jpg");
const moon_texture = loader.load("../assets/images/texture_moon-2048x1024.jpg");
const stars = loader.load("../assets/images/stars-1920x1080.jpg");

const axis = new THREE.Vector3(0, 1, 0).normalize();

// Scene
const scene = new THREE.Scene();
scene.background = stars;

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);

camera.position.set(-1, 10, 60);

scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// Orbit Controls

const controls = new THREE.OrbitControls( camera , renderer.domElement);

// Earth Mesh
const earth_geometry = new THREE.SphereGeometry(15, 32, 32);
const earth_material = new THREE.MeshPhongMaterial({ map: earth_texture });
const earth = new THREE.Mesh(earth_geometry, earth_material);
earth.position.set(0, 0, 0)


// Moon Mesh
const moon_geometry = new THREE.SphereGeometry(5, 32, 32);
const moon_material = new THREE.MeshPhongMaterial({ map: moon_texture });
const moon = new THREE.Mesh(moon_geometry, moon_material);
moon.position.set(-40, 0, 0);


// Light
const ambientLight = new THREE.AmbientLight(0xffffff, .5, 0, 2);

const directionnalLight = new THREE.DirectionalLight(0xffffff, 2, 0, 2);
directionnalLight.position.set(50, 0, 30);
directionnalLight.castShadow = true;

scene.add(ambientLight, directionnalLight, earth, moon);

function animate() {
    requestAnimationFrame(animate);
    render();
  }

  var quaternion = new THREE.Quaternion();
  function render() {
    earth.rotation.y += 0.001;
    moon.rotation.y += 0.001;

    quaternion.setFromAxisAngle(axis, -0.008);
    moon.position.applyQuaternion(quaternion);

    renderer.render(scene, camera);
  }

animate();