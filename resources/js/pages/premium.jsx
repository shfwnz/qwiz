import React from "react";
import { Button } from "@/components/ui/button";

const premium = () => {
    return (
        <div className="flex items-center justify-center">
            <Button
                variant="outline"
                className="h-24 rounded-2xl justify-center"
            >
                <div className="grid grid-cols-4 gap-4 items-center bg-yellow-400">
                    <span className="material-symbols-outlined">
                        radio_button_unchecked
                    </span>
                    <span className="col-span-2">Unlimited Hearts/Month</span>
                    <span>3</span>
                </div>
            </Button>
        </div>
    );
};

export default premium;
