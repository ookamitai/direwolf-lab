import { gsap } from 'gsap';

export function setupMagneticElements() {
  document.querySelectorAll('.magnetic-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 15; 
      
      gsap.to(item, {
        x: x / strength,
        y: y / strength,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

export function setupParallaxElements() {
  document.querySelectorAll('.parallax-element').forEach(element => {
    const speed = element.getAttribute('data-speed') || 0.1;
    const xOffset = element.getAttribute('data-x-offset') || 0;
    const yOffset = element.getAttribute('data-y-offset') || 0;
    
    window.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      
      gsap.to(element, {
        x: mouseX * speed * 100 + parseFloat(xOffset),
        y: mouseY * speed * 100 + parseFloat(yOffset),
        duration: 10,
        ease: 'power2.out'
      });
    });
  });
}

export function setupImageParallax() {
  const parallaxImages = document.querySelectorAll('.parallax-scroll-img');
  
  if (parallaxImages.length === 0) return;
  
  let currentScrollY = 0;
  let targetScrollY = 0;
  
  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  });
  
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
  
  function update() {
    currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);
    
    parallaxImages.forEach(img => {
      const speed = parseFloat(img.getAttribute('data-speed') || 0.15);
      const rect = img.parentElement.getBoundingClientRect();
      
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const yOffset = (currentScrollY - rect.top) * speed;
        img.style.transform = `translateY(${yOffset}px)`;
      }
    });
    
    requestAnimationFrame(update);
  }
  
  update();
}
