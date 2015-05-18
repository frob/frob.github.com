(function ($) {
  $(document).ready(function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 640/480, 1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    renderer.setClearColor(0x000000, 0);
    $("#screen-wrapper").append(renderer.domElement);
    $("#screen-wrapper canvas").css( {
      "margin": "1em auto",
      "display": "block"
    });

    var geometry = new THREE.BoxGeometry(1,1,1);
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
    var cube = new THREE.Mesh(geometry, material);

    var fog = THREE.Fog(0x000000, 1, 5);
    var ambient = new THREE.AmbientLight( 0x101030 );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set( 0, 1, 0 );

    scene.add(cube);
    scene.fog = fog;
    scene.add(ambient);
    scene.add(directionalLight);

    camera.position.z = 2;
    var render = function () {
      requestAnimationFrame(render);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    render();
  });
})($)
