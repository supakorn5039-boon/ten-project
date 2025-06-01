'use client';

import { navItems } from '@/constants/NavConst';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Sidebar = () => {
    const currentPath = usePathname();
    const router = useRouter();

    const checkActiveRoute = (route: string) => currentPath === route;

    const logoutHandler = () => {
        Cookies.remove('token');
        router.push('/login');
    };

    return (
        <aside className="sidebar fixed top-0 bottom-0 z-50 h-full w-[260px] bg-black flex flex-col">
            <div className="flex items-center justify-center p-4">
                <Link href="/" className="text-2xl font-extrabold gradient-color hover:scale-105 duration-300">
                    FINANCE
                </Link>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <PerfectScrollbar className="flex-1 px-4 py-2">
                    <nav className="space-y-3">
                        {navItems.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`group flex items-center gap-3 rounded p-3 font-medium transition-all duration-200 ${
                                    checkActiveRoute(href) ? 'bg-green-sub text-white' : 'text-white hover:bg-gray-800'
                                }`}
                            >
                                <Icon size={22} />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </nav>
                </PerfectScrollbar>

                <div className="p-4">
                    <button
                        onClick={logoutHandler}
                        className="group flex items-center gap-2 rounded p-3 font-medium transition-all duration-200 text-white hover:bg-gray-800 w-full"
                    >
                        <FiLogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
