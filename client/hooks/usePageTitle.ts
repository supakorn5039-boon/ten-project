import { useEffect } from 'react';

export const usePageTitle = (title: string, prefix: string = '') => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = `${prefix}${title}`;

        return () => {
            document.title = previousTitle;
        };
    }, [title, prefix]);
};
