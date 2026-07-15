(() => {
  const scene = document.querySelector("#scene");
  const pauseButton = document.querySelector("#toggle-motion");
  const restartButton = document.querySelector("#restart-motion");
  const status = document.querySelector("#motion-status");
  const clock = document.querySelector("#now-clock");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;

  function updateClock() {
    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = `NOW ${new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(now)}`;
  }

  function setPaused(nextPaused) {
    paused = nextPaused;
    scene.classList.toggle("is-paused", paused);
    pauseButton.setAttribute("aria-pressed", String(paused));
    pauseButton.querySelector("span").textContent = paused ? "Continue" : "Pause";
    status.textContent = paused ? "The Clear Pill sequence is paused." : "The Clear Pill sequence is playing.";
  }

  function restart() {
    const wasPaused = paused;
    scene.classList.remove("is-paused");
    const animated = scene.querySelectorAll("*");
    animated.forEach((element) => { element.style.animationName = "none"; });
    void scene.offsetWidth;
    animated.forEach((element) => { element.style.animationName = ""; });
    setPaused(wasPaused);
    status.textContent = wasPaused
      ? "The Clear Pill sequence restarted and remains paused."
      : "The Clear Pill sequence restarted.";
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
    const x = (event.clientX / window.innerWidth - .5) * 10;
    const y = (event.clientY / window.innerHeight - .5) * 7;
    scene.style.setProperty("--pointer-x", `${x}px`);
    scene.style.setProperty("--pointer-y", `${y}px`);
  }, { passive: true });

  reduceMotion.addEventListener("change", () => {
    status.textContent = reduceMotion.matches
      ? "Reduced motion is enabled; the ordinary afternoon is shown as a still composition."
      : paused ? "The Clear Pill sequence is paused." : "The Clear Pill sequence is playing.";
  });

  updateClock();
  window.setInterval(updateClock, 1000);
  if (reduceMotion.matches) {
    status.textContent = "Reduced motion is enabled; the ordinary afternoon is shown as a still composition.";
  }
})();
