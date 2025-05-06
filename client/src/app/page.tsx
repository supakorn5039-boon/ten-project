'use client';

import useProtectRoute from '@/hooks/useProtectRoute';
import Cookies from 'js-cookie';

export default function Home() {
  const { isChecking } = useProtectRoute();

  const role = Cookies.get('role');

  if (isChecking) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            📊 Dashboard <span className="capitalize">({role})</span>
          </h1>
          <p className="text-gray-500 mt-2">Welcome back! &apos;s an overview of your data.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700">Total Tasks</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700">Completed</h2>
            <p className="text-3xl font-bold text-green-500 mt-2">8</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700">Pending</h2>
            <p className="text-3xl font-bold text-yellow-500 mt-2">4</p>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Your Dashboard Project
        </footer>
      </div>
    </div>
  );
}
