import CardBetween from '@/components/Ui/card/CardBetween';
import CardGrid from '@/components/Ui/card/CardGrid';
import CardLayout from '@/components/Ui/card/CardLayout';
import { GaugeChart } from '@/components/Ui/charts/GaugeChart';
import { useFormatDate } from '@/hooks/useFormatDate';
import Logo from '@/public/master-card.png';
import { COLORS } from '@/theme/COLORS';
import Image from 'next/image';
import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { PiMedalMilitary } from 'react-icons/pi';

export default function TopSection(): React.ReactElement {
    return (
        <CardGrid col={3}>
            <div>
                <h1 className="tesxt-lg">Total Balance</h1>
                <CardLayout className="mt-2 border border-gray-200 shadow-md">
                    <CardBetween>
                        <p className="text-base font-bold">240,399 ฿</p>

                        <p className="text-gray-400">All Accounts</p>
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
                <h1 className="tesxt-lg">Goals</h1>
                <CardLayout className="mt-2 border border-gray-200 shadow-md">
                    <CardBetween>
                        <div className="flex items-center">
                            <p className="text-base font-bold">23,000 ฿</p>
                            <button
                                className="ml-2 p-2 bg-gray-100 rounded-md"
                                onClick={() => {
                                    console.log('click');
                                }}
                            >
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
                                    <p>12,500 ฿</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <PiMedalMilitary size={20} color={COLORS.black} />
                                <div className="ml-2">
                                    <p className="text-gray-500">This month Target</p>
                                    <p>20,000 ฿</p>
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
                    <h1 className="tesxt-lg">Upcoming Bill</h1>
                    <p>View All</p>
                </CardBetween>
                <CardLayout className="mt-2 border border-gray-200 shadow-md"></CardLayout>
            </div>
        </CardGrid>
    );
}
