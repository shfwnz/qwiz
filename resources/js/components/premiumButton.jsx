import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const premiumButton = () => {
    const [selectedOption, setSelectedOption] = useState(0);

    const options = [
        { id: 1, label: "+20 Hearts Daily/Month", price: "$1" },
        { id: 2, label: "Unlimited Hearts/Month", price: "$5" },
        { id: 3, label: "Unlimited Hearts/Year", price: "$40" },
    ];

    const handleButtonClick = (id) => {
        setSelectedOption(id);
        console.log(`Button ${id} clicked`);
    };

    return (
        <div className="flex flex-wrap gap-2 p-2.5 items-center justify-center">
            {options.map((option) => (
                <Button
                    key={option.id}
                    variant="outline"
                    className={`h-auto min-h-20 w-full max-w-screen lg:max-w-2xl  rounded-2xl bg-[#1F2937] justify-center ${
                        selectedOption === option.id
                            ? "border-4 border-[#1F4A86]"
                            : ""
                    }`}
                    onClick={() => handleButtonClick(option.id)}
                >
                    <div className="w-full grid grid-cols-4 gap-4 items-center justify-center">
                        <span className="material-symbols-outlined">
                            {selectedOption === option.id
                                ? "task_alt"
                                : "circle"}
                        </span>
                        <span className="col-span-2 text-xl">
                            {option.label}
                        </span>
                        <span className="text-xl">{option.price}</span>
                    </div>
                </Button>
            ))}
        </div>
    );
};

export default premiumButton;
