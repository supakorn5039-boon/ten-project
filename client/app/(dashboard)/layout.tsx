'use client';

import Header from '@/components/layouts/Header';
import Sidebar from '@/components/layouts/sidebar';
import useProtectRoute from '@/hooks/useProtectRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { isChecking } = useProtectRoute();

    if (isChecking) return null;

    return (
        <div className="relative">
            <Sidebar />
            <div className="main-content flex min-h-screen flex-col ml-[16rem]">
                <Header />
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}
