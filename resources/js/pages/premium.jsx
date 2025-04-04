import React from "react";
import PremiumButton from "@/components/premiumButton";
import { Button } from "@/components/ui/button";
import CryFrog from "../../../storage/app/public/cry-frog.png";

const premium = () => {
    return (
        <div className="flex flex-col max-w-full p-4 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3">
                <span className="capitalize text-3xl">
                    Oops! No Hearts Left!
                </span>
                <div className="bg-[#d9d9d9] flex items-end rounded-2xl w-full max-w-24 h-full min-h-24">
                    <img
                        className="rounded-2xl w-full max-w-20"
                        src={CryFrog}
                        alt="cry"
                    />
                </div>
                <span className="text-2xl">Subscribe to get more</span>
            </div>

            <div className="px-4">
                <PremiumButton />
            </div>

            <div className="w-full items-center flex flex-col justify-center gap-2 mt-4">
                <Button
                    variant="outline"
                    className="text-black text-2xl p-5 w-full max-w-screen bg-[#d9d9d9] uppercase lg:max-w-3xl"
                >
                    start free trial
                </Button>
                <Button className="text-2xl p-5 w-full max-w-screen lg:max-w-3xl capitalize">
                    No Thanks
                </Button>
            </div>
        </div>
    );
};

export default premium;
