import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: { value: "#111827" },
      },
      fpsLimit: 60,
      particles: {
        color: { value: "#ffffff" },
        move: {
          direction: "bottom",
          enable: true,
          outModes: { default: "out" },
          speed: 1,
        },
        number: {
          density: { enable: true },
          value: 200,
        },
        opacity: { value: { min: 0.3, max: 0.7 } },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return <Particles id="tsparticles" className="absolute top-0 left-0 w-full -z-10" options={options} />;
  }

  return <></>;
};

export default React.memo(ParticlesBackground);