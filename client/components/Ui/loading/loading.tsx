export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="flex flex-col items-center space-y-4">
                <div className="size-16 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
                <h1 className="text-2xl font-extrabold gradient-color">Finance Tracker</h1>
                <p className="text-sm text-gray-400">Loading your dashboard...</p>
            </div>
        </div>
    );
}
