'use client';

import { useAuthStore } from '@/store/useAuthStore';

export default function Header() {
    const { username } = useAuthStore();

    return (
        <header className={`z-40`}>
            <div className="shadow-sm">
                <div className="relative flex w-full items-center p-4 dark:bg-black">
                    <div className="flex items-center space-x-1.5 sm:flex-1 lg:space-x-2">
                        <p className="text-lg font-bold">Hello {username}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
