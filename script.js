import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg"), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.PlaneGeometry(10, 10, 128, 128);

const uniforms = {
  time: { value: 0.0 }
};

const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: `
    uniform float time;
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += 0.1 * sin(5.0 * pos.x + time) * cos(5.0 * pos.y + time);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    void main() {
      float brightness = 0.5 + 0.5 * sin(10.0 * vUv.x + 10.0 * vUv.y);
      vec3 color = vec3(0.8, 0.8, 1.0) * brightness;
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  wireframe: false
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

function animate() {
  requestAnimationFrame(animate);
  uniforms.time.value += 0.01;
  renderer.render(scene, camera);
}

animate();
