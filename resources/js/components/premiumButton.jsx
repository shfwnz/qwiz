import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const premiumButton = () => {
    const [view, setView] = useState(0);

    return (
        <div className="items-center justify-center">
            <Button
                variant="outline"
                className="h-24 rounded-2xl justify-center"
                onClick={() => {
                    setView(1);
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
                className="h-24 rounded-2xl justify-center"
                onClick={() => {
                    setView(2);
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
                className="h-24 rounded-2xl justify-center"
                onClick={() => {
                    setView(3);
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
