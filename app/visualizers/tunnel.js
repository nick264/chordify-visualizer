const THREE = require('three')

class Tunnel {
  constructor(canvas) {

}

var ww = window.innerWidth,
  wh = window.innerHeight;
var curve;
var opts = {
  radius: 1.5,
  segments: 400,
  scale: 0.1,
  radiusSegments: 25
};

var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
  antialias: true
});
renderer.setSize(ww, wh);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.0001, 1000);
var controls = new THREE.OrbitControls(camera);
camera.position.z = 50;
camera.position.x = 100;
camera.position.y = 100;

/* ==================== */
/* ===== ON RESIZE ==== */
/* ==================== */
window.addEventListener("resize", function() {
  ww = window.innerWidth;
  wh = window.innerHeight;
  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, wh);
});

/* ====================== */
/* === Path creation ==== */
/* ====================== */
var particles = new THREE.Object3D();
scene.add(particles);
var dotMap = new THREE.TextureLoader().load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/dotTexture.png");
var glowMap = new THREE.TextureLoader().load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/glow.png");
var pathPoints = [
  [935, 0],
  [1287, 251],
  [1007, 341],
  [785, 801],
  [506, 369],
  [0, 510],
  [42, 138],
  [618, 203]
];
var glows = new THREE.Object3D();
scene.add(glows);
var spriteMaterial = new THREE.SpriteMaterial({
  map: glowMap,
  color: 0xffffff,
  transparent: true,
  blending: THREE.AdditiveBlending
});

function createTube() {
  //Create the 'tube'
  var points = [];
  for (var i = 0; i < pathPoints.length; i++) {
    var x = pathPoints[i][0];
    var y = (Math.random() - 0.5) * 500;
    var z = pathPoints[i][1];
    points.push(new THREE.Vector3(x, y, z).multiplyScalar(opts.scale));
  }
  curve = new THREE.CatmullRomCurve3(points);
  curve.closed = true;
  curve.type = "catmullrom";
  curve.tension = 0.6;

  //Create the particles
  var geom = new THREE.Geometry();
  var geom2 = new THREE.Geometry();
  var geom3 = new THREE.Geometry();
  var frames = curve.computeFrenetFrames(opts.segments, true);
  var endPoint = curve.getPointAt(1);
  for (i = 0; i < opts.segments; i++) {
    var N = frames.normals[i];
    var B = frames.binormals[i];
    for (var j = 0; j < opts.radiusSegments; j++) {
      var index = i / opts.segments;
      // index += Math.random()*0.01;
      // index = Math.min(index, 1)
      var p = curve.getPointAt(index);
      var vertex = p.clone();
      var angle = Math.random() * Math.PI * 2;
      var angle = (j / opts.radiusSegments) * Math.PI * 2;
      var sin = Math.sin(angle);
      var cos = -Math.cos(angle);

      var normal = new THREE.Vector3();
      normal.x = (cos * N.x + sin * B.x);
      normal.y = (cos * N.y + sin * B.y);
      normal.z = (cos * N.z + sin * B.z);
      normal.normalize();

      var noiseIndex = ((noise.simplex3(p.x * 0.04, p.y * 0.04, p.z * 0.04)) + 1) / 2 * 360;

      vertex.x = p.x + opts.radius * normal.x;
      vertex.y = p.y + opts.radius * normal.y;
      vertex.z = p.z + opts.radius * normal.z;
      var color = new THREE.Color("hsl(" + noiseIndex + ",80%,50%)");
      geom.colors.push(color);
      // geom.vertices.push(vertex);
      var mat = spriteMaterial.clone();
      mat.color = color;
      var newSprite = new THREE.Sprite(mat);
      newSprite.position.set(vertex.x, vertex.y, vertex.z);
      newSprite.scale.set(0.25, 0.25, 0.25)
      glows.add(newSprite);

    var vertex = p.clone();
      vertex.x = p.x + opts.radius * 1.2 * normal.x;
      vertex.y = p.y + opts.radius * 1.2 * normal.y;
      vertex.z = p.z + opts.radius * 1.2 * normal.z;
      geom2.colors.push(new THREE.Color("hsl(" + noiseIndex + ",80%,50%)"));
      geom2.vertices.push(vertex);
      var vertex = p.clone();
      vertex.x = p.x + opts.radius * 1.5 * normal.x;
      vertex.y = p.y + opts.radius * 1.5 * normal.y;
      vertex.z = p.z + opts.radius * 1.5 * normal.z;
      geom3.colors.push(new THREE.Color("hsl(" + noiseIndex + ",80%,50%)"));
      geom3.vertices.push(vertex);
    }
  }
  var mat = new THREE.PointsMaterial({
    color: 0xffffff,
    map: dotMap,
    size: 0.1,
    transparent: true,
    vertexColors: THREE.VertexColors,
    sizeAttenuation: true
  });
  var dots = new THREE.Points(geom, mat.clone());
  particles.add(dots);
  mat.transparent = true;
  mat.opacity = 0.5;
  var dots = new THREE.Points(geom2, mat.clone());
  particles.add(dots);
  mat.opacity = 0.3;
  var dots = new THREE.Points(geom3, mat.clone());
  particles.add(dots);

  geom3.computeBoundingSphere();
  var radius = geom3.boundingSphere.radius;
  var center = geom3.boundingSphere.center;

  var geom = new THREE.Geometry();
  for (var i = 0; i < 4000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = (Math.random() - 0.5) * radius * 2;
    vertex.y = (Math.random() - 0.5) * radius * 2;
    vertex.z = (Math.random() - 0.5) * radius * 2;
    geom.colors.push(new THREE.Color("hsl(" + Math.floor(Math.random() * 80 + 150) + ",80%,50%)"));
    geom.vertices.push(vertex);
  }
  geom.translate(center.x, center.y, center.z);
  var mat = new THREE.PointsMaterial({
    size: 0.3,
    map: dotMap,
    vertexColors: THREE.VertexColors,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.7
  });
  var stars = new THREE.Points(geom, mat);
  particles.add(stars);
}

var interval = 0.02;
var progress = {
  z: 0
};

var cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
  color: 0xff0000
}));
scene.add(cube);

function render(a) {
  requestAnimationFrame(render);
  var tempProgress = progress.z;
  var p1 = curve.getPointAt(tempProgress);
  if (tempProgress + interval > 1) {
    tempProgress = tempProgress - 1;
  }
  var p2 = curve.getPointAt(tempProgress + interval);
  camera.position.set(p1.x, p1.y, p1.z);
  camera.lookAt(p2);
  cube.position.set(p1.x, p1.y, p1.z);

  renderer.render(scene, camera);

}

var animTl = new TimelineMax({
  paused: true,
  repeat: -1
});
animTl.to(progress, 60, {
  z: 1,
  ease: Linear.easeNone
});
createTube();
animTl.play();
requestAnimationFrame(render);