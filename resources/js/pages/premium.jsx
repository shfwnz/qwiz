import React, { useState } from "react";
import PremiumButton from "@/components/premiumButton";
import { Button } from "@/components/ui/button";
import CryFrog from "../../../storage/app/public/cry-frog.png";
import SuprisedCar from "../../../storage/app/public/suprised-car.png";

const premium = () => {
    const [selectedPremiumOption, setSelectedPremiumOption] = useState(0);

    const handleOptionSelect = (id) => {
        setSelectedPremiumOption(id);
        console.log(`Option ${id} selected`);
    };

    const getValueByOption = () => {
        switch (selectedPremiumOption) {
            case 1:
                return { img: SuprisedCar, title: "Good Choice" };
            case 2:
                return { img: SuprisedCar, title: "Great Choice" };
            case 3:
                return { img: SuprisedCar, title: "Best Choice" };
            default:
                return { img: CryFrog, title: "Oops! No Hearts Left" };
        }
    };

    return (
        <div className="h-screen flex flex-col max-w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3">
                <span className="capitalize text-3xl">
                    {getValueByOption().title}
                </span>
                <div className="bg-[#d9d9d9] flex items-end rounded-2xl w-full max-w-24 h-full min-h-24">
                    <img
                        className="rounded-2xl w-full max-w-20"
                        src={getValueByOption().img}
                        alt="cry"
                    />
                </div>
                <span className="text-2xl">Subscribe to get more</span>
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
