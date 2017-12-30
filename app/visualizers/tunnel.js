const { TimelineMax, Linear } = require('gsap');
const noise = require('noisejs');
const THREE = require('three-js')(['OrbitControls']);

class Tunnel {
  constructor(canvas) {
    var ww = window.innerWidth,
      wh = window.innerHeight;
    this.curve = null
    this.opts = {
      radius: 1.5,
      segments: 400,
      scale: 0.1,
      radiusSegments: 25
    };

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    });
    this.renderer.setSize(ww, wh);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, ww / wh, 0.0001, 1000);
    var controls = new THREE.OrbitControls(this.camera);
    this.camera.position.z = 50;
    this.camera.position.x = 100;
    this.camera.position.y = 100;

    /* ==================== */
    /* ===== ON RESIZE ==== */
    /* ==================== */
    window.addEventListener("resize", function() {
      ww = window.innerWidth;
      wh = window.innerHeight;
      this.camera.aspect = ww / wh;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(ww, wh);
    });

    /* ====================== */
    /* === Path creation ==== */
    /* ====================== */
    this.particles = new THREE.Object3D();
    this.scene.add(this.particles);
    this.dotMap = new THREE.TextureLoader().load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/dotTexture.png");
    var glowMap = new THREE.TextureLoader().load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/glow.png");
    this.pathPoints = [
      [935, 0],
      [1287, 251],
      [1007, 341],
      [785, 801],
      [506, 369],
      [0, 510],
      [42, 138],
      [618, 203]
    ];
    this.glows = new THREE.Object3D();
    this.scene.add(this.glows);
    this.spriteMaterial = new THREE.SpriteMaterial({
      map: glowMap,
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    
    this.interval = 0.02;
    this.progress = {
      z: 0
    };

    this.cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
      color: 0xff0000
    }));
    this.scene.add(this.cube);
    
    
    var animTl = new TimelineMax({
      paused: true,
      repeat: -1
    });
    animTl.to(this.progress, 60, {
      z: 1,
      ease: Linear.easeNone
    });
    this.createTube();
    animTl.play();
    this.loop()
  }

  createTube() {
    //Create the 'tube'
    var points = [];
    for (var i = 0; i < this.pathPoints.length; i++) {
      var x = this.pathPoints[i][0];
      var y = (Math.random() - 0.5) * 500;
      var z = this.pathPoints[i][1];
      points.push(new THREE.Vector3(x, y, z).multiplyScalar(this.opts.scale));
    }
    this.curve = new THREE.CatmullRomCurve3(points);
    this.curve.closed = true;
    this.curve.type = "catmullrom";
    this.curve.tension = 0.6;

    //Create the particles
    var geom = new THREE.Geometry();
    var geom2 = new THREE.Geometry();
    var geom3 = new THREE.Geometry();
    var frames = this.curve.computeFrenetFrames(this.opts.segments, true);
    var endPoint = this.curve.getPointAt(1);
    for (i = 0; i < this.opts.segments; i++) {
      var N = frames.normals[i];
      var B = frames.binormals[i];
      for (var j = 0; j < this.opts.radiusSegments; j++) {
        var index = i / this.opts.segments;
        // index += Math.random()*0.01;
        // index = Math.min(index, 1)
        var p = this.curve.getPointAt(index);
        var vertex = p.clone();
        var angle = Math.random() * Math.PI * 2;
        var angle = (j / this.opts.radiusSegments) * Math.PI * 2;
        var sin = Math.sin(angle);
        var cos = -Math.cos(angle);

        var normal = new THREE.Vector3();
        normal.x = (cos * N.x + sin * B.x);
        normal.y = (cos * N.y + sin * B.y);
        normal.z = (cos * N.z + sin * B.z);
        normal.normalize();

        var noiseIndex = ((noise.simplex3(p.x * 0.04, p.y * 0.04, p.z * 0.04)) + 1) / 2 * 360;

        vertex.x = p.x + this.opts.radius * normal.x;
        vertex.y = p.y + this.opts.radius * normal.y;
        vertex.z = p.z + this.opts.radius * normal.z;
        var color = new THREE.Color("hsl(" + noiseIndex + ",80%,50%)");
        geom.colors.push(color);
        // geom.vertices.push(vertex);
        var mat = this.spriteMaterial.clone();
        mat.color = color;
        var newSprite = new THREE.Sprite(mat);
        newSprite.position.set(vertex.x, vertex.y, vertex.z);
        newSprite.scale.set(0.25, 0.25, 0.25)
        this.glows.add(newSprite);

      var vertex = p.clone();
        vertex.x = p.x + this.opts.radius * 1.2 * normal.x;
        vertex.y = p.y + this.opts.radius * 1.2 * normal.y;
        vertex.z = p.z + this.opts.radius * 1.2 * normal.z;
        geom2.colors.push(new THREE.Color("hsl(" + noiseIndex + ",80%,50%)"));
        geom2.vertices.push(vertex);
        var vertex = p.clone();
        vertex.x = p.x + this.opts.radius * 1.5 * normal.x;
        vertex.y = p.y + this.opts.radius * 1.5 * normal.y;
        vertex.z = p.z + this.opts.radius * 1.5 * normal.z;
        geom3.colors.push(new THREE.Color("hsl(" + noiseIndex + ",80%,50%)"));
        geom3.vertices.push(vertex);
      }
    }
    var mat = new THREE.PointsMaterial({
      color: 0xffffff,
      map: this.dotMap,
      size: 0.1,
      transparent: true,
      vertexColors: THREE.VertexColors,
      sizeAttenuation: true
    });
    var dots = new THREE.Points(geom, mat.clone());
    this.particles.add(dots);
    mat.transparent = true;
    mat.opacity = 0.5;
    var dots = new THREE.Points(geom2, mat.clone());
    this.particles.add(dots);
    mat.opacity = 0.3;
    var dots = new THREE.Points(geom3, mat.clone());
    this.particles.add(dots);

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
      map: this.dotMap,
      vertexColors: THREE.VertexColors,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7
    });
    var stars = new THREE.Points(geom, mat);
    this.particles.add(stars);
  }

  loop() {
    this.requestAnimFrame.call( window, this.loop.bind(this) );

    var tempProgress = this.progress.z;
    var p1 = this.curve.getPointAt(tempProgress);
    if (tempProgress + this.interval > 1) {
      tempProgress = tempProgress - 1;
    }
    var p2 = this.curve.getPointAt(tempProgress + this.interval);
    this.camera.position.set(p1.x, p1.y, p1.z);
    this.camera.lookAt(p2);
    this.cube.position.set(p1.x, p1.y, p1.z);

    this.renderer.render(this.scene, this.camera);
  }
  
  onBeat() {
    return null
  }
}

module.exports = Tunnel