import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.fps(50);

  const nav = document.querySelector(".nav");
  const canvas = document.querySelector("canvas");
  const header = document.querySelector(".header");
  const contents = document.querySelector(".contents");
  const outro = document.querySelector(".outro-contents");
  const context = canvas.getContext("2d");

  const setCanvasSize = () => {
    const pixelRatio = window.devicePixelRatio || 1;
    const { innerWidth, innerHeight } = window;
  
    canvas.width = innerWidth * pixelRatio;
    canvas.height = innerHeight * pixelRatio;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
  
    // Reset then scale to avoid compounding transforms
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(pixelRatio, pixelRatio);
  };
  setCanvasSize();
  // Background frame rate
  const frameCount = 380;
  const currentFrame = (index) => `/Background/Background${(index).toString().padStart(4, "0")}.webp`;
  
  let images = [];
  let videoFrames = { frame : 0 };
  let imagesToLoad = frameCount;

  const onLoad = () => {
    imagesToLoad--;
    if (!imagesToLoad) {
      render();
      setScrollTrigger();
    }
  };

  for(let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.onload = onLoad;
    img.onerror = function() {
        onLoad.call(this);
    };
    img.src = currentFrame(i);
    images.push(img);
  }

  const render = () => {
    // Use CSS pixels (matches the scaled coordinate system)
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
  
    context.clearRect(0, 0, canvasWidth, canvasHeight);
  
    const img = images[videoFrames.frame];
    if (img && img.complete && img.naturalWidth > 0) {
      const imageAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = canvasWidth / canvasHeight;
  
      let drawWidth, drawHeight, drawX, drawY;
  
      // true "cover": fill the canvas, crop the overflow
      if (imageAspect < canvasAspect) {
        // image is narrower -> scale by width
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imageAspect;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      } else {
        // image is wider/taller -> scale by height
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imageAspect;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      }

      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }
  };

  gsap.set(contents, { transform: "translateZ(0px)", opacity: 0 });
  gsap.set(outro, { transform: "translateZ(0px)", opacity: 0 });

  const setScrollTrigger = () => {
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: () => "+=" + window.innerHeight * 5,  // function so it recalculates
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        videoFrames.frame = Math.round(progress * (frameCount - 1));
        render();
  
        // nav fade
        if (progress <= 0.1) {
          gsap.set(nav, { opacity: 1 - (progress / 0.1) });
        } else {
          gsap.set(nav, { opacity: 0 });
        }
  
        // header zoom/fade
        if (progress <= 0.25) {
          const zProgress = progress / 0.25;
          const translateZ = zProgress * 500;
          let opacity = 1;
          if (progress >= 0.2) {
            const fadeProgress = Math.min((progress - 0.2) / (0.25 - 0.2), 1);
            opacity = 1 - fadeProgress;
          }
          gsap.set(header, { transform: `translateZ(${translateZ}px)`, opacity });
        } else {
          gsap.set(header, { opacity: 0 });
        }

        // second content
        if (progress <= 0.65) {
          const scrollProgress = (progress - 0.35) / 0.3;
          const translateZ = -1000 + scrollProgress * 1500;
          let opacity = 0;
          if (progress > 0.35 && progress <= 0.4) {
            const fadeProgress = Math.min((progress - 0.35) / (0.4 - 0.35), 1);
            opacity = fadeProgress;
          } else if (progress > 0.4 && progress < 0.6) {
            opacity = 1;
          } else if (progress >= 0.6 && progress < 0.65) {
            const fadeProgress = Math.min((progress - 0.6) / (0.65 - 0.6), 1);
            opacity = 1 - fadeProgress;
          }
          gsap.set(contents, { transform: `translateZ(${translateZ}px)`, opacity: opacity });
        } else {
          gsap.set(contents, { transform: "translateZ(500px)", opacity: 0 });
        }

        // third content
        if (progress >= 0.75) {
          const scrollProgress = (progress - 0.75) / 0.25;
          const translateZ = -1000 + scrollProgress * 1000;
          let opacity = 1;
          if (progress <= 0.8) {
            const fadeProgress = Math.min((progress - 0.75) / (0.8 - 0.75), 1);
            opacity = fadeProgress;
          }
          gsap.set(outro, { transform: `translateZ(${translateZ}px)`, opacity });
        } else {
          gsap.set(outro, { transform: `translateZ(0px)`, opacity: 0 });
        }
      },
    });
  };

  window.addEventListener("resize", () => {
    setCanvasSize();
    render();
    ScrollTrigger.refresh();
  });
});
