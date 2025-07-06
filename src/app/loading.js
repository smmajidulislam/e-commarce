export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-200 via-rose-200 to-orange-200 text-gray-800 p-6">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-pink-500 border-b-orange-500 border-l-teal-400 animate-spin"></div>
      </div>
      <p className="text-xl md:text-2xl font-semibold animate-pulse text-center">
        Loading, please wait...
      </p>
    </div>
  );
}
