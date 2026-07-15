(() => {
  const scene = document.querySelector("#scene");
  const look = document.querySelector("#look");
  const canvas = document.querySelector("#motes");
  const pauseButton = document.querySelector("#toggle-motion");
  const restartButton = document.querySelector("#restart-motion");
  const status = document.querySelector("#motion-status");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const context = canvas.getContext("2d", { alpha: true });

  let paused = false;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let lastFrame = performance.now();
  let motes = [];
  let glints = [];

  function resizeCanvas() {
    const bounds = scene.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    seedAtmosphere();
  }

  function seedAtmosphere() {
    const moteCount = Math.max(22, Math.round((width * height) / 26000));
    const glintCount = Math.max(10, Math.round(width / 80));

    motes = Array.from({ length: moteCount }, (_, index) => ({
      x: (index * 131.7 + Math.random() * width) % width,
      y: Math.random() * height,
      radius: .35 + Math.random() * 1.25,
      drift: 2 + Math.random() * 7,
      rise: 1 + Math.random() * 5,
      phase: Math.random() * Math.PI * 2,
      alpha: .08 + Math.random() * .27
    }));

    glints = Array.from({ length: glintCount }, () => ({
      x: Math.random() * width,
      y: height * (.58 + Math.random() * .29),
      length: 5 + Math.random() * 19,
      phase: Math.random() * Math.PI * 2,
      speed: .55 + Math.random() * 1.15
    }));
  }

  function drawAtmosphere(now) {
    context.clearRect(0, 0, width, height);

    for (const mote of motes) {
      const flicker = .48 + Math.sin(now * .00055 + mote.phase) * .36;
      context.beginPath();
      context.fillStyle = `rgba(210, 246, 250, ${mote.alpha * flicker})`;
      context.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
      context.fill();
    }

    context.lineCap = "round";
    for (const glint of glints) {
      const shimmer = Math.max(0, Math.sin(now * .001 * glint.speed + glint.phase));
      if (shimmer < .66) continue;
      context.beginPath();
      context.strokeStyle = `rgba(191, 241, 251, ${(shimmer - .66) * .34})`;
      context.lineWidth = .7;
      context.moveTo(glint.x, glint.y);
      context.lineTo(glint.x + glint.length * shimmer, glint.y);
      context.stroke();
    }
  }

  function animate(now) {
    const elapsed = Math.min((now - lastFrame) / 1000, .05);
    lastFrame = now;

    if (!paused && !reduceMotion.matches) {
      for (const mote of motes) {
        mote.x += mote.drift * elapsed;
        mote.y -= mote.rise * elapsed;
        if (mote.x > width + 3) mote.x = -3;
        if (mote.y < -3) mote.y = height + 3;
      }
    }

    drawAtmosphere(now);
    requestAnimationFrame(animate);
  }

  function setPaused(nextPaused) {
    paused = nextPaused;
    scene.classList.toggle("is-paused", paused);
    pauseButton.setAttribute("aria-pressed", String(paused));
    pauseButton.querySelector("span").textContent = paused ? "Continue journey" : "Pause journey";
    status.textContent = paused
      ? "The panoramic journey is paused."
      : "The panoramic journey is playing.";
  }

  function restart() {
    const wasPaused = paused;
    scene.classList.remove("is-paused");
    scene.classList.remove("is-restarting");

    // Replacing the animation-bearing nodes' animation names for one frame restarts every CSS timeline together.
    const animated = scene.querySelectorAll(
      ".world, .orb-aura, .orb-aura__ring, .atmosphere, .light-sweep, .birds, .quote-card, .journey__track i"
    );
    animated.forEach((element) => { element.style.animationName = "none"; });
    void scene.offsetWidth;
    animated.forEach((element) => { element.style.animationName = ""; });
    scene.classList.add("is-restarting");

    window.setTimeout(() => scene.classList.remove("is-restarting"), 9200);
    setPaused(wasPaused);
    status.textContent = wasPaused
      ? "The journey returned to the Western Portico and remains paused."
      : "The journey restarted at the Western Portico.";
  }

  pauseButton.addEventListener("click", () => setPaused(!paused));
  restartButton.addEventListener("click", restart);

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !event.repeat) {
      event.preventDefault();
      setPaused(!paused);
    }
    if (event.key.toLowerCase() === "r" && !event.repeat) restart();
  });

  scene.addEventListener("pointermove", (event) => {
    if (reduceMotion.matches) return;
    const x = (event.clientX / width - .5) * -.75;
    const y = (event.clientY / height - .5) * -.48;
    look.style.setProperty("--look-x", `${x}vw`);
    look.style.setProperty("--look-y", `${y}vh`);
  }, { passive: true });

  scene.addEventListener("pointerleave", () => {
    look.style.setProperty("--look-x", "0vw");
    look.style.setProperty("--look-y", "0vh");
  });

  reduceMotion.addEventListener("change", () => {
    if (reduceMotion.matches) {
      status.textContent = "Reduced motion is enabled; the city is shown as a still panorama.";
    } else {
      status.textContent = paused
        ? "The panoramic journey is paused."
        : "The panoramic journey is playing.";
    }
  });

  window.addEventListener("resize", resizeCanvas, { passive: true });
  resizeCanvas();
  if (reduceMotion.matches) {
    status.textContent = "Reduced motion is enabled; the city is shown as a still panorama.";
  }
  requestAnimationFrame(animate);
})();
