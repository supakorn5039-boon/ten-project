'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useProtectRoute() {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState<boolean>(true);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.replace('/login');
        } else {
            setIsChecking(false);
        }
    }, [router]);

    return { isChecking };
}
