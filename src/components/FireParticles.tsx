import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export function FireParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          color: { value: ["#FF6D00", "#D32F2F", "#FFB300"] },
          links: { enable: false },
          move: {
            direction: "top",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 2,
            straight: false,
          },
          number: { density: { enable: true, area: 800 }, value: 80 },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
}
