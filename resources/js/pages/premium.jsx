import React from "react";
import PremiumButton from "@/components/premiumButton";
import { Button } from "@/components/ui/button";
import CryFrog from "../../../storage/app/public/cry-frog.png";

const premium = () => {
    return (
        <div className="flex flex-col max-w-full p-4 items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <span>Oops! No Hearts Left!</span>
                <div className="bg-[#d9d9d9] flex items-end rounded-2xl w-full max-w-28 h-full min-h-28">
                    <img
                        className="rounded-2xl w-full max-w-24"
                        src={CryFrog}
                        alt="cry"
                    />
                </div>
                <span>Subscribe to get more</span>
            </div>

            <PremiumButton />

            <div className="w-full items-center flex flex-col justify-center gap-2 mt-2">
                <Button
                    variant="outline"
                    className="text-black w-full max-w-screen bg-[#d9d9d9] uppercase"
                >
                    start free trial
                </Button>
                <Button className="w-full max-w-screen capitalize">
                    No Thanks
                </Button>
            </div>
        </div>
    );
};

export default premium;
