import React from "react";
import PremiumButton from "@/components/premiumButton";

const premium = () => {
    return (
        <div className="grid grid-rows-3 h-screen w-screen">
            <div>Welcome</div>
            <div>
                <PremiumButton />
            </div>
            <div>Button</div>
        </div>
    );
};

export default premium;
