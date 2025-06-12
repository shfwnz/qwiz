import React, { useState } from 'react';
import PremiumButton from '@/components/premium-button';
import { Button } from '@/components/ui/button';
import CryFrog from '../../../public/images/cry-frog.png';
import SuprisedCar from '../../../public/images/suprised-car-removebg.png';
import Footer from '@/components/layouts/footer.jsx';

const premium = () => {
    const [selectedPremiumOption, setSelectedPremiumOption] = useState(0);

    const handleOptionSelect = id => {
        setSelectedPremiumOption(id);
        console.log(`Option ${id} selected`);
    };

    const getValueByOption = () => {
        switch (selectedPremiumOption) {
            case 1:
                return {
                    img: SuprisedCar,
                    title: 'Good Choice!',
                    detailImg: 'Car Suprised',
                };
            case 2:
                return {
                    img: SuprisedCar,
                    title: 'Great Value!',
                    detailImg: 'Car Suprised',
                };
            case 3:
                return {
                    img: SuprisedCar,
                    title: 'Best Deal!',
                    detailImg: 'Car Suprised',
                };
            default:
                return {
                    img: CryFrog,
                    title: 'Oops! No Hearts Left',
                    detailImg: 'Cry Frog',
                };
        }
    };

    return (
        <div className="container mx-auto max-w-7xl">
            <div className="h-screen flex flex-col w-full items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-3">
                    <span className="capitalize text-3xl">
                        {getValueByOption().title}
                    </span>
                    <div
                        className={`flex items-end rounded-2xl w-full max-w-24 h-full min-h-24 ${
                            selectedPremiumOption > 0
                                ? 'bg-[#e7e4df]'
                                : 'bg-[#d9d9d9]'
                        }`}
                    >
                        <img
                            className="rounded-2xl w-full max-w-20"
                            src={getValueByOption().img}
                            alt={getValueByOption().detailImg}
                        />
                    </div>
                    <span className="text-2xl">
                        {selectedPremiumOption > 0
                            ? 'More Hearts, More Fun'
                            : 'Subscribe to get more'}
                    </span>
                </div>

                <div className="px-4">
                    <PremiumButton onSelect={handleOptionSelect} />
                </div>

                <div className="w-full items-center flex flex-col justify-center gap-2 mt-4">
                    <Button
                        variant="outline"
                        className="text-xl p-5 w-full max-w-screen uppercase lg:max-w-3xl"
                    >
                        {selectedPremiumOption > 0
                            ? 'subscribe now'
                            : 'start free trial'}
                    </Button>
                    <Button className="text-2xl p-5 w-full max-w-screen lg:max-w-3xl capitalize">
                        No Thanks
                    </Button>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default premium;
