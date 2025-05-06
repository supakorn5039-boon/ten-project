'use client';

import useProtectRoute from '@/hooks/useProtectRoute';

export default function Home() {
  const { isChecking } = useProtectRoute();

  if (isChecking) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">📊 Finance</h1>
          <p className="text-gray-500 mt-2">Welcome back! &apos;s an overview of your data.</p>
        </header>
      </div>
    </div>
  );
}
