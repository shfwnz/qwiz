<<<<<<< HEAD
import React, { useState } from "react";
import PremiumButton from "@/components/premiumButton";
import { Button } from "@/components/ui/button";
import CryFrog from "../../../storage/app/public/cry-frog.png";
import SuprisedCar from "../../../storage/app/public/suprised-car-removebg.png";

const premium = () => {
    const [selectedPremiumOption, setSelectedPremiumOption] = useState(0);

    const handleOptionSelect = (id) => {
        setSelectedPremiumOption(id);
        console.log(`Option ${id} selected`);
    };

    const getValueByOption = () => {
        switch (selectedPremiumOption) {
            case 1:
                return {
                    img: SuprisedCar,
                    title: "Good Choice!",
                    detailImg: "Car Suprised",
                };
            case 2:
                return {
                    img: SuprisedCar,
                    title: "Great Value!",
                    detailImg: "Car Suprised",
                };
            case 3:
                return {
                    img: SuprisedCar,
                    title: "Best Deal!",
                    detailImg: "Car Suprised",
                };
            default:
                return {
                    img: CryFrog,
                    title: "Oops! No Hearts Left",
                    detailImg: "Cry Frog",
                };
        }
    };

    return (
        <div className="h-screen flex flex-col max-w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3">
                <span className="capitalize text-3xl">
                    {getValueByOption().title}
                </span>
                <div
                    className={`flex items-end rounded-2xl w-full max-w-24 h-full min-h-24 ${
                        selectedPremiumOption > 0
                            ? "bg-[#e7e4df]"
                            : "bg-[#d9d9d9]"
                    }`}
                >
                    <img
                        className="rounded-2xl w-full max-w-20"
                        src={getValueByOption().img}
                        alt={getValueByOption().detailImg}
                    />
                </div>
                <span className="text-2xl">
                    {selectedPremiumOption > 0
                        ? "More Hearts, More Fun"
                        : "Subscribe to get more"}
                </span>
            </div>

            <div className="px-4">
                <PremiumButton onSelect={handleOptionSelect} />
            </div>

            <div className="w-full items-center flex flex-col justify-center gap-2 mt-4">
                <Button
                    variant="outline"
                    className="text-black text-2xl p-5 w-full max-w-screen bg-[#d9d9d9] uppercase lg:max-w-3xl"
                >
                    {selectedPremiumOption > 0
                        ? "subscribe now"
                        : "start free trial"}
                </Button>
                <Button className="text-2xl p-5 w-full max-w-screen lg:max-w-3xl capitalize">
                    No Thanks
                </Button>
            </div>
        </div>
    );
};

export default premium;
=======
import { useEffect, useMemo, useState } from "react";
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
    return <Particles id="tsparticles" className="absolute top-0 left-0 w-full h-full -z-10" options={options} />;
  }

  return <></>;
};

export default ParticlesBackground;
>>>>>>> tuanbeliau-main
