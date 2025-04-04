import React from "react";
import PremiumButton from "@/components/premiumButton";
import { Button } from "@/components/ui/button";

const premium = () => {
    return (
        <div className="flex flex-col max-w-full p-4 items-center justify-center">
            <div>Welcome</div>

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
