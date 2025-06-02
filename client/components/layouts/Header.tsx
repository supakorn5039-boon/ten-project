'use client';

import { useFormatDate } from '@/hooks/useFormatDate';
import { selectUsername, useAuthStore } from '@/store/useAuthStore';
import { COLORS } from '@/theme/COLORS';
import { RiArrowRightDoubleLine } from 'react-icons/ri';

export default function Header() {
    const username = useAuthStore(selectUsername);
    const formatDate = useFormatDate();

    return (
        <header className={`z-40`}>
            <div className="shadow-sm">
                <div className="relative flex w-full items-center p-4 dark:bg-black">
                    <div className="flex items-center space-x-1.5 sm:flex-1 lg:space-x-2">
                        <p className="text-lg font-bold">Hello {username}</p>
                        <RiArrowRightDoubleLine color={COLORS['gray-light']} />
                        <p className="text-gray-light text-base">{formatDate}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
