'use client';

import { PAGE_TITLES } from '@/constants/pageTitle';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function OverviewIndex(): React.ReactElement {
    usePageTitle(PAGE_TITLES.OVERVIEW);

    return <div>OverviewIndex</div>;
}
