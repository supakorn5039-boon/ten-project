'use client';

import Modal from '@/components/Ui/modal/Modal';
import { PAGE_TITLES } from '@/constants/pageTitle';
import { usePageTitle } from '@/hooks/usePageTitle';
import React, { useState } from 'react';
import ExpensesBreakdown from './ExpensesBreakdown';
import GoalsForms from './form/GoalsForms';
import RecentTransaction from './RecentTransaction';
import Statistics from './Statistics';
import TopSection from './TopSection';

export default function OverviewIndex(): React.ReactElement {
    const [goals, setGoals] = useState<boolean>(false);

    usePageTitle(PAGE_TITLES.OVERVIEW);

    return (
        <div>
            <TopSection setGoals={setGoals} />
            <div className="flex gap-4">
                <div className="w-1/3 mt-[1rem]">
                    <RecentTransaction />
                </div>
                <div className="w-2/3">
                    <Statistics />
                    <ExpensesBreakdown />
                </div>
            </div>
            <Modal size="max-w-md" isOpen={goals} onClose={() => setGoals(false)}>
                <GoalsForms />
            </Modal>
        </div>
    );
}
