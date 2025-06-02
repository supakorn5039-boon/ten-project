'use client';

import { PAGE_TITLES } from '@/constants/pageTitle';
import { usePageTitle } from '@/hooks/usePageTitle';
import React from 'react';
import TopSection from './TopSection';

export default function OverviewIndex(): React.ReactElement {
    usePageTitle(PAGE_TITLES.OVERVIEW);

    return (
        <div>
            <TopSection />
        </div>
    );
}
