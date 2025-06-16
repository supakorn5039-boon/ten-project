import CardBetween from '@/components/Ui/card/CardBetween';
import CardGrid from '@/components/Ui/card/CardGrid';
import CardLayout from '@/components/Ui/card/CardLayout';
import { GaugeChart } from '@/components/Ui/charts/GaugeChart';
import { useFormatDate } from '@/hooks/useFormatDate';
import { FormatNumber } from '@/hooks/useFormatNumber';
import Logo from '@/public/master-card.png';
import { COLORS } from '@/theme/COLORS';
import Image from 'next/image';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { PiMedalMilitary } from 'react-icons/pi';
import { TbTargetArrow } from 'react-icons/tb';

type TopSectionProps = {
    setGoals: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TopSection({ setGoals }: TopSectionProps): React.ReactElement {
    const [target, setTarget] = useState<number>(12000);
    const [achieved, setAchieved] = useState<number>(20000);
    const handleOpenGoalForms = () => {
        setGoals(true);
    };

    return (
        <CardGrid col={3}>
            <div>
                <h1 className="text-lg">Total Balance</h1>
                <CardLayout className="mt-2 border border-gray-200 shadow-md h-[200px]">
                    <CardBetween>
                        <p className="text-base font-bold">240,399 ฿</p>

                        <p className="text-gray-700">All Accounts</p>
                    </CardBetween>
                    <hr className="my-2" />
                    <CardLayout className="!bg-green-sub py-2">
                        <CardBetween>
                            <div>
                                <p className="text-gray-200 font-semibold">Account Type</p>
                                <p className="text-white text-base font-bold">Credit Card</p>
                            </div>
                            <Image className="size-12 object-contain" src={Logo} alt="logo" priority />
                        </CardBetween>
                        <CardBetween className="text-gray-200">
                            <p>**** **** **** 1234</p>
                            <p className="text-base font-semibold">25,000 ฿</p>
                        </CardBetween>
                    </CardLayout>
                </CardLayout>
            </div>
            <div>
                <h1 className="text-lg">Goals</h1>
                <CardLayout className="mt-2 border border-gray-200 shadow-md h-[200px]">
                    <CardBetween>
                        <div className="flex items-center">
                            <p className="text-base font-bold">23,000 ฿</p>
                            <button className="ml-2 p-2 bg-gray-100 rounded-md" onClick={handleOpenGoalForms}>
                                <CiEdit color={COLORS.black} />
                            </button>
                        </div>
                        <p>{useFormatDate()}</p>
                    </CardBetween>
                    <hr className="my-2" />
                    <CardGrid col={2}>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <PiMedalMilitary size={20} color={COLORS.black} />
                                <div className="ml-2">
                                    <p className="text-gray-500">Target Achieved</p>
                                    <p>{FormatNumber(target)} ฿</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <TbTargetArrow size={20} color={COLORS.black} />
                                <div className="ml-2">
                                    <p className="text-gray-500">This month Target</p>
                                    <p>{FormatNumber(achieved)} ฿</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <GaugeChart achieved={12500} target={20000} />
                        </div>
                    </CardGrid>
                </CardLayout>
            </div>
            <div>
                <CardBetween>
                    <h1 className="text-lg">Upcoming Bill</h1>
                    <p>View All</p>
                </CardBetween>
                <CardLayout className="mt-2 border border-gray-200 shadow-md p-4 h-[200px]">
                    <div className="p-4 flex items-center gap-4 ">
                        <p className="w-[40px]">May</p>
                        <p className="flex-1">AIS , Phone Service</p>
                        <div className="border border-gray-200 p-2 rounded-lg">
                            <p className="text-center">1,590 ฿</p>
                        </div>
                    </div>
                    <div className="p-4 flex items-center gap-4 ">
                        <p className="w-[40px]">June</p>
                        <p className="flex-1">House Service</p>
                        <div className="border border-gray-200 p-2 rounded-lg">
                            <p className="text-center">2,000 ฿</p>
                        </div>
                    </div>
                </CardLayout>
            </div>
        </CardGrid>
    );
}
