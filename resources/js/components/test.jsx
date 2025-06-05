import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Simple = () => {
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
        color: { value: "#111827" }, // Latar belakang hitam
      },
      fpsLimit: 60,
      particles: {
        color: { value: "#ffffff" }, // Partikel putih
        move: {
          direction: "bottom", // Partikel jatuh ke bawah
          enable: true,
          outModes: { default: "out" }, // Partikel menghilang di bawah
          speed: 1, // Kecepatan lambat agar efek seperti salju
        },
        number: {
          density: { enable: true },
          value: 200, // Lebih banyak partikel agar terlihat seperti salju
        },
        opacity: { value: { min: 0.3, max: 0.7 } }, // Efek transparansi
        shape: { type: "circle" }, // Bentuk bulat
        size: { value: { min: 1, max: 3 } }, // Ukuran partikel kecil
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return <Particles id="tsparticles" className="absolute top-0 left-0 w-full z-10" options={options} />;
  }

  return <></>;
};

export default Simple;