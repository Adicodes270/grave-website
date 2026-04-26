(function() {
  var s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  s.onload = function() {
    var container = document.getElementById('particle-bg');
    var SEP = 150, AX = 38, AY = 52;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 355, 1220);

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    var pos = [], col = [];
    for (var ix = 0; ix < AX; ix++) {
      for (var iy = 0; iy < AY; iy++) {
        pos.push(ix * SEP - (AX * SEP) / 2, 0, iy * SEP - (AY * SEP) / 2);
        col.push(0.929, 0.910, 0.890);
      }
    }

    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));

    var mat = new THREE.PointsMaterial({ size: 7, vertexColors: true, transparent: true, opacity: 0.17, sizeAttenuation: true });
    scene.add(new THREE.Points(geo, mat));

    var count = 0, active = true;

    function animate() {
      if (!active) return;
      requestAnimationFrame(animate);
      var pa = geo.attributes.position.array;
      var i = 0;
      for (var ix = 0; ix < AX; ix++) {
        for (var iy = 0; iy < AY; iy++) {
          pa[i * 3 + 1] = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.08;
    }

    document.addEventListener('visibilitychange', function() {
      active = !document.hidden;
      if (active) animate();
    });

    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });

    animate();
  };
  document.head.appendChild(s);
})();

var navToggle = document.getElementById('nav-toggle');
var mobileMenu = document.getElementById('mobile-menu');
var iconMenu = document.getElementById('icon-menu');
var iconClose = document.getElementById('icon-close');
navToggle.addEventListener('click', function() {
  var open = mobileMenu.classList.toggle('open');
  iconMenu.style.display = open ? 'none' : 'block';
  iconClose.style.display = open ? 'block' : 'none';
});
document.querySelectorAll('.mobile-menu a').forEach(function(a) {
  a.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
    iconMenu.style.display = 'block';
    iconClose.style.display = 'none';
  });
});

var ro = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('vis'); ro.unobserve(e.target); }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -20px 0px' });
document.querySelectorAll('.rv').forEach(function(el) { ro.observe(el); });