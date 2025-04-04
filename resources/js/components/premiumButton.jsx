import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const premiumButton = () => {
    const [selectedOption, setSelectedOption] = useState(0);

    const options = [
        { id: 1, label: "+20 Hearts Every Days/Month", price: "$1" },
        { id: 2, label: "Unlimited Hearts/Month", price: "$5" },
        { id: 3, label: "Unlimited Hearts/Year", price: "$40" },
    ];

    const handleButtonClick = (id) => {
        setSelectedOption(id);
        console.log(`Button ${id} clicked`);
    };

    return (
        <div className="flex flex-wrap gap-2 items-center justify-center">
            {options.map((option) => (
                <Button
                    key={option.id}
                    variant="outline"
                    className={`h-24 w-full max-w-96 rounded-2xl bg-[#1F2937] text-white justify-center ${
                        selectedOption === option.id
                            ? "border-8 rounded-2xl border-[#1F4A86]"
                            : ""
                    }`}
                    onClick={() => handleButtonClick(option.id)}
                >
                    <div className="w-full grid grid-cols-4 gap-4 items-center">
                        <span className="material-symbols-outlined">
                            {selectedOption === option.id
                                ? "task_alt"
                                : "circle"}
                        </span>
                        <span className="col-span-2">{option.label}</span>
                        <span>{option.price}</span>
                    </div>
                </Button>
            ))}
        </div>
    );
};

export default premiumButton;
