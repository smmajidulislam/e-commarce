import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-red-200 to-red-300 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 max-w-md w-full text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
          Order Cancelled
        </h1>
        <p className="text-gray-700 text-base md:text-lg mb-6">
          আপনার অর্ডারটি বাতিল করা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা হোম
          পেইজে ফিরে যান।
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
