import React from "react";
import { Button } from "@/components/ui/button";

const premium = () => {
    return (
        <div className="flex items-center justify-center">
            <Button variant="outline">
                <div className="grid grid-cols-4 gap-4 items-center">
                    <div>
                        <span class="material-symbols-outlined font-[20]">
                            radio_button_unchecked
                        </span>
                    </div>
                    <div className="col-span-2">
                        <span>Unlimited Hearts/Month</span>
                    </div>
                    <div>3</div>
                </div>
            </Button>
        </div>
    );
};

export default premium;
