# Image Gallery Scroll Animation

This project is an **interactive scroll-based image gallery** powered by **GSAP (GreenSock Animation Platform)** and **Lenis smooth scrolling**.
As you scroll, images animate from a 3D perspective into place, text headers fade dynamically, and a final image takes focus at the end of the sequence.

---

## Features

* **Smooth Scrolling** with [Lenis](https://github.com/studio-freight/lenis)
* **Scroll-based Animations** using [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
* **Split Text Animations** for intro and outro headers
* **3D Perspective Effects** on images
* **Responsive Layout** with optimized typography for desktop and mobile
* **Final Image Reveal** at the end of the gallery

---

## Technologies Used

* **HTML5** – Semantic structure
* **CSS3** – Layout & responsiveness
* **JavaScript (ES Modules)** – Animation logic
* **GSAP** – Core animation engine

  * ScrollTrigger
  * SplitText
* **Lenis** – Smooth scrolling

---

## How It Works

1. **Lenis** handles smooth scrolling while syncing frames with GSAP’s ticker.
2. Each image starts off-screen in **3D space** (`z: -1000`, `scale: 0`).
3. As you scroll, images transition into their final positions based on coordinates from `imageCoordinates.js`.
4. **Intro text fades out** mid-scroll.
5. **Final image fades in** as other images settle.
6. **Outro text fades in** towards the end.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/image-gallery-scroll-animation.git
cd image-gallery-scroll-animation
```

### 2. Install Dependencies

Make sure you have **Node.js** installed. Then install dependencies:

```bash
npm install gsap @studio-freight/lenis
```

### 3. Run the Project

Use a local development server (e.g., [Vite](https://vitejs.dev/), Live Server, or Parcel):

```bash
npm run dev
```

Then open:

```
http://localhost:3000
```

---

## Live Demo

[View Live Project](https://your-live-demo-link.com](https://sohamgoswami07.github.io/Background-Scroll-Trigger/))

---

## Responsive Design

* Desktop → Large typography, 50% header width
* Mobile (<768px) → Smaller fonts, 90% header width

---

## Customization

* Replace images inside `/images/` with your own.
* Update `constants/imageCoordinates.js` to adjust final positions.
* Edit `.intro-header h1` and `.outro-header h1` text inside `index.html`.

---

