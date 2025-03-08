import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  
  document.querySelectorAll('.reveal-text').forEach(text => {
    const textContent = text.textContent;
    text.innerHTML = '';
    
    const wrapper = document.createElement('span');
    wrapper.innerHTML = textContent;
    text.appendChild(wrapper);
    
    gsap.from(wrapper, {
      y: '100%',
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 90%',
      }
    });
  });
  
  const horizontalSections = document.querySelectorAll('.horizontal-scroll-section');
  horizontalSections.forEach(section => {
    const items = section.querySelector('.horizontal-items');
    
    if (!items) return;
    
    const itemsWidth = items.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    // apply only when width is larger than viewport
    if (itemsWidth > viewportWidth) {
      gsap.to(items, {
        x: -(itemsWidth - viewportWidth + 100),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${itemsWidth}`,
          pin: true,
          scrub: 1,
        }
      });
    }
  });
  
  document.querySelectorAll('.parallax-img').forEach(img => {
    gsap.to(img, {
      y: '15%',
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  });
  
  
  // 计数器动画
  document.querySelectorAll('.counter').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: 'power2.out'
        });
      }
    });
  });
  
  // 图片显示效果
  document.querySelectorAll('.image-reveal').forEach(container => {
    const img = container.querySelector('img');
    if (!img) return;
    
    gsap.set(container, { autoAlpha: 1 });
    gsap.set(img, { scale: 1.3 });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      }
    });
    
    tl.to(container, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1,
      ease: 'power4.inOut'
    })
    .to(img, {
      scale: 1,
      duration: 1.4,
      ease: 'power2.out'
    }, '-=0.8');
  });
  
  document.querySelectorAll('.split-text').forEach(text => {
    const content = text.textContent;
    let html = '';
    
    for (let i = 0; i < content.length; i++) {
      if (content[i] === ' ') {
        html += ' ';
      } else {
        html += `<span class="char">${content[i]}</span>`;
      }
    }
    
    text.innerHTML = html;
    
    gsap.from(text.querySelectorAll('.char'), {
      opacity: 0,
      y: 20,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: 'back.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 90%',
      }
    });
  });
  setupCardTilt();
}

// 3D卡片悬停效果
function setupCardTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleY = (x - centerX) / 20;
      const angleX = (centerY - y) / 20;
      
      gsap.to(card, {
        rotationX: angleX,
        rotationY: angleY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power1.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

