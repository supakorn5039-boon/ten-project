'use client';

import { ToastProvider } from '@/components/Ui/Toast/Toast';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
