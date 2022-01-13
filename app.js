function main() {
  // scene camera renderer - 3 must!
  const canvas = document.querySelector("#c");

  const fov = 50;
  // const aspect = 2;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const near = 0.1;
  const far = 2000;

  //   const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  //   camera.position.z = 1;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  const renderer = new THREE.WebGLRenderer({ canvas });

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  renderer.setSize(width, height);

  const scene = new THREE.Scene();
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    "https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg",
    () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt.texture;
      //   scene.background = texture;
    }
  );

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
