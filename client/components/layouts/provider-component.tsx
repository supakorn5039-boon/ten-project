'use client';
import App from '@/App';
import Loading from '@/components/Ui/loading/loading';
import { Suspense, type HTMLAttributes } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '../Ui/Toast/Toast';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
        },
    },
});

const ProviderComponent = ({ children }: HTMLAttributes<HTMLElement>) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Loading />}>
                <ToastProvider />
                <App>{children}</App>
            </Suspense>
        </QueryClientProvider>
    );
};

export default ProviderComponent;
