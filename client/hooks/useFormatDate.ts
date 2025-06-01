import { useMemo } from 'react';

export const useFormatDate = () => {
    return useMemo(() => {
        const date = new Date();
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });
    }, []);
};
