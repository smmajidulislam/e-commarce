import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-red-200 to-red-300 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-md w-full text-center">
        {/* Error Icon (SVG X-mark) */}
        <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100 border-4 border-red-400">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-3">
          Payment Failed!
        </h1>

        <p className="text-gray-700 text-base md:text-lg mb-6">
          আপনার পেমেন্ট ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন বা সহায়তা
          নিন।
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition">
            <Link href="/profile">Try Again</Link>
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg transition">
            <Link href="/">Go Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
