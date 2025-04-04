import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const premiumButton = () => {
    const [view, setView] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    return (
        <div className="flex flex-wrap gap-2 items-center justify-center">
            <Button
                variant="outline"
                className={`h-24 rounded-2xl justify-center ${
                    isClicked === 1 ? "border-8 border-[#1F4A86]" : ""
                }`}
                onClick={() => {
                    setView(1);
                    setIsClicked(1);
                    console.log("Button 1 clicked");
                }}
            >
                <div className="grid grid-cols-4 gap-4 items-center">
                    <span className="material-symbols-outlined">
                        {view === 1 ? "task_alt" : "circle"}
                    </span>
                    <span className="col-span-2">Unlimited Hearts/Month</span>
                    <span>3</span>
                </div>
            </Button>
            <Button
                variant="outline"
                className={`h-24 rounded-2xl justify-center ${
                    isClicked === 2 ? "border-8 border-[#1F4A86]" : ""
                }`}
                onClick={() => {
                    setView(2);
                    setIsClicked(2);
                    console.log("Button 2 clicked");
                }}
            >
                <div className="grid grid-cols-4 gap-4 items-center">
                    <span className="material-symbols-outlined">
                        {view === 2 ? "task_alt" : "circle"}
                    </span>
                    <span className="col-span-2">Unlimited Hearts/Month</span>
                    <span>3</span>
                </div>
            </Button>
            <Button
                variant="outline"
                className={`h-24 rounded-2xl justify-center ${
                    isClicked === 3 ? "border-8 border-[#1F4A86]" : ""
                }`}
                onClick={() => {
                    setView(3);
                    setIsClicked(3);
                    console.log("Button 3 clicked");
                }}
            >
                <div className="grid grid-cols-4 gap-4 items-center">
                    <span className="material-symbols-outlined">
                        {view === 3 ? "task_alt" : "circle"}
                    </span>
                    <span className="col-span-2">Unlimited Hearts/Month</span>
                    <span>3</span>
                </div>
            </Button>
        </div>
    );
};

export default premiumButton;
