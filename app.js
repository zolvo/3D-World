// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


function main() {
  // scene camera renderer - 3 must!
  const canvas = document.querySelector("#c");

  const fov = 75;
  // const aspect = 2;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const near = 0.1;
  const far = 2000;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 1;

  const renderer = new THREE.WebGLRenderer({ canvas });

  new THREE.OrbitControls(camera, canvas);

  const scene = new THREE.Scene();
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    "https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg",
    //"https://oc-demo-site.squarespace.com/s/purple-office.jpeg",
    () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt.texture;
    }
  );

  function render() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
