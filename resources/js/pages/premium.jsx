import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const premium = () => {
    const [view, setView] = useState(0);

    return (
        <div className="flex items-center justify-center">
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
                        {view === 1
                            ? "radio_button_checked"
                            : "radio_button_unchecked"}
                    </span>
                    <span className="col-span-2">Unlimited Hearts/Month</span>
                    <span>3</span>
                </div>
            </Button>
        </div>
    );
};

export default premium;
