import Alpine from 'alpinejs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { initAnimations } from './animation.js';
import { setupMagneticElements, setupParallaxElements } from './utils.js';
import * as THREE from 'three';

// GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// alpine.js
window.Alpine = Alpine;
Alpine.start();

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  
  setupMagneticElements();
  setupParallaxElements();
  
  initThreeJsBackground();
  
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    gsap.to(preloader, {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      onComplete: () => {
        preloader.style.display = 'none';
        animateHeroSection();
      }
    });
  } else {
    animateHeroSection();
  }
  
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

function animateHeroSection() {
  const heroText = document.querySelectorAll('.hero-text');
  const heroImg = document.querySelector('.hero-image');
  const heroCta = document.querySelector('.hero-cta');
  
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' }
  });
  
  tl.from(heroText, {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2
  })
  .from(heroImg, {
    scale: 0.8,
    opacity: 0,
    duration: 1
  }, '-=0.6')
  .from(heroCta, {
    y: 30,
    opacity: 0,
    duration: 0.8
  }, '-=0.4');
}

function initThreeJsBackground() {
  const canvas = document.getElementById('bg-canvas');
  
  if (!canvas) return;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1000;
  
  const posArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  camera.position.z = 2;
  
  function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0003;
    particlesMesh.rotation.y += 0.0005;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // window size changes
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
