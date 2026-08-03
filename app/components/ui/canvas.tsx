// @ts-nocheck

export const renderCanvas = function () {
  const canvasEl = document.getElementById("canvas");
  if (!canvasEl) return () => {};
  
  const ctx = canvasEl.getContext("2d");
  if (!ctx) return () => {};

  let animationFrameId: number | null = null;
  let running = true;

  const config = {
    friction: 0.5,
    trails: 80,
    size: 50,
    dampening: 0.025,
    tension: 0.99,
  };

  const pos = { x: 0, y: 0 };
  let lines: Line[] = [];

  class Oscillator {
    constructor(options) {
      this.phase = options.phase || 0;
      this.offset = options.offset || 0;
      this.frequency = options.frequency || 0.001;
      this.amplitude = options.amplitude || 1;
      this.val = 0;
    }
    update() {
      this.phase += this.frequency;
      this.val = this.offset + Math.sin(this.phase) * this.amplitude;
      return this.val;
    }
  }

  const f = new Oscillator({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });

  class Node {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
    }
  }

  class Line {
    constructor(options) {
      this.spring = options.spring + 0.1 * Math.random() - 0.05;
      this.friction = config.friction + 0.01 * Math.random() - 0.005;
      this.nodes = [];
      for (let i = 0; i < config.size; i++) {
        const node = new Node();
        node.x = pos.x;
        node.y = pos.y;
        this.nodes.push(node);
      }
    }
    update() {
      let springFactor = this.spring;
      let node = this.nodes[0];
      node.vx += (pos.x - node.x) * springFactor;
      node.vy += (pos.y - node.y) * springFactor;
      
      for (let i = 0; i < this.nodes.length; i++) {
        node = this.nodes[i];
        if (i > 0) {
          const prevNode = this.nodes[i - 1];
          node.vx += (prevNode.x - node.x) * springFactor;
          node.vy += (prevNode.y - node.y) * springFactor;
          node.vx += prevNode.vx * config.dampening;
          node.vy += prevNode.vy * config.dampening;
        }
        node.vx *= this.friction;
        node.vy *= this.friction;
        node.x += node.vx;
        node.y += node.vy;
        springFactor *= config.tension;
      }
    }
    draw() {
      let node = this.nodes[0];
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      let i;
      for (i = 1; i < this.nodes.length - 2; i++) {
        const curr = this.nodes[i];
        const next = this.nodes[i + 1];
        const xc = 0.5 * (curr.x + next.x);
        const yc = 0.5 * (curr.y + next.y);
        ctx.quadraticCurveTo(curr.x, curr.y, xc, yc);
      }
      const last = this.nodes[i];
      const nextLast = this.nodes[i + 1];
      ctx.quadraticCurveTo(last.x, last.y, nextLast.x, nextLast.y);
      ctx.stroke();
      ctx.closePath();
    }
  }

  function resizeCanvas() {
    if (!canvasEl) return;
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
  }

  function initLines() {
    lines = [];
    for (let i = 0; i < config.trails; i++) {
      lines.push(new Line({ spring: 0.45 + (i / config.trails) * 0.025 }));
    }
  }

  function updateMouseCoords(e) {
    if (e.touches && e.touches.length > 0) {
      pos.x = e.touches[0].clientX;
      pos.y = e.touches[0].clientY;
    } else {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }
  }

  let mouseHasMoved = false;

  function onFirstInteraction(e) {
    document.removeEventListener("mousemove", onFirstInteraction);
    document.removeEventListener("touchstart", onFirstInteraction);
    
    document.addEventListener("mousemove", updateMouseCoords);
    document.addEventListener("touchmove", updateMouseCoords, { passive: true });
    
    updateMouseCoords(e);
    initLines();
    mouseHasMoved = true;
    
    if (running) {
      render();
    }
  }

  function render() {
    if (!running) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",100%,50%,0.025)";
    ctx.lineWidth = 10;

    for (let i = 0; i < config.trails; i++) {
      const line = lines[i];
      if (line) {
        line.update();
        line.draw();
      }
    }

    animationFrameId = window.requestAnimationFrame(render);
  }

  pos.x = window.innerWidth / 2;
  pos.y = window.innerHeight / 2;

  document.addEventListener("mousemove", onFirstInteraction);
  document.addEventListener("touchstart", onFirstInteraction);
  window.addEventListener("resize", resizeCanvas);
  
  if (window.screen && window.screen.orientation) {
    window.screen.orientation.addEventListener("change", resizeCanvas);
  }

  resizeCanvas();

  canvasEl.pauseAnimation = () => {
    running = false;
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  canvasEl.resumeAnimation = () => {
    if (!running) {
      running = true;
      if (mouseHasMoved) {
        render();
      }
    }
  };

  return () => {
    running = false;
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }
    document.removeEventListener("mousemove", onFirstInteraction);
    document.removeEventListener("touchstart", onFirstInteraction);
    document.removeEventListener("mousemove", updateMouseCoords);
    document.removeEventListener("touchmove", updateMouseCoords);
    window.removeEventListener("resize", resizeCanvas);
    if (window.screen && window.screen.orientation) {
      window.screen.orientation.removeEventListener("change", resizeCanvas);
    }
    
    delete canvasEl.pauseAnimation;
    delete canvasEl.resumeAnimation;
  };
};
