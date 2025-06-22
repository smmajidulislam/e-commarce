"use client";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-8">
        {/* Left - Logo & Description */}
        <div className="flex-1 min-w-[200px]">
          <Link href="/" className="inline-block mb-2">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/logo.png" //
                alt="MyShop Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold">Baraz</span>
            </div>
          </Link>
          <p className="text-sm text-gray-400 mt-2">
            Discover quality products at unbeatable prices. Shop smart, live
            better.
          </p>
        </div>

        {/* Middle - Navigation Links */}
        <div className="flex-1 min-w-[200px] hidden md:block">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right - Newsletter Form */}
        <div className="flex-1 min-w-[200px] hidden lg:block">
          <h3 className="text-lg font-semibold mb-2">Subscribe</h3>
          <p className="text-sm text-gray-400 mb-3">
            Get the latest updates and offers.
          </p>
          <form className="flex flex-col sm:flex-row items-start gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="px-3 py-2 w-full sm:w-auto flex-1 rounded bg-white text-black text-sm"
            />
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright bottom line */}
      <div className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
