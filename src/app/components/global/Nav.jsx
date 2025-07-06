"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "../../hooks/UseAuth";
import { useGetSettingQuery } from "@/app/features/setting/settingApi";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token, loading, logout } = useAuth();
  const { data, isLoading } = useGetSettingQuery();

  const renderSkeleton = () => (
    <div className="hidden md:flex space-x-4 animate-pulse">
      <div className="bg-gray-700 h-6 w-24 rounded"></div>
      <div className="bg-gray-700 h-6 w-24 rounded"></div>
      <div className="bg-gray-700 h-6 w-24 rounded"></div>
      <div className="bg-gray-700 h-6 w-24 rounded"></div>
      <div className="bg-gray-700 h-6 w-24 rounded"></div>
    </div>
  );
  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-999 tracking-wide">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-around h-16">
          {/* Logo */}
          {isLoading ? (
            <div className="bg-gray-700 h-6 w-24 animate-pulse rounded"></div>
          ) : (
            <div className="flex-shrink-0">
              <Image
                src={
                  data?.logo && data.logo.trim() !== ""
                    ? data.logo
                    : "/assets/logo.png"
                }
                alt="Logo"
                width={80}
                height={100}
                priority
                className="h-[50px] w-[90px] mx-auto md:mx-0 bg-transparent"
                style={{
                  filter: "drop-shadow(0 0 3px rgba(255,255,255,0.4))",
                }}
              />
            </div>
          )}

          {/* Desktop Menu */}
          {loading ? (
            renderSkeleton()
          ) : (
            <div className="hidden md:flex space-x-4 text-xl">
              <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded">
                Home
              </Link>
              {!token && (
                <>
                  <Link
                    href="/cart"
                    className="hover:bg-gray-700 px-3 py-2 rounded"
                  >
                    Cart
                  </Link>
                  <Link
                    href="/trackOrder"
                    className="hover:bg-gray-700 px-3 py-2 rounded"
                  >
                    Track
                  </Link>
                </>
              )}

              <Link
                href="/products"
                className="hover:bg-gray-700 px-3 py-2 rounded"
              >
                Products
              </Link>
              {token?.isAdmin === false && (
                <Link
                  href="/about"
                  className="hover:bg-gray-700 px-3 py-2 rounded"
                >
                  About
                </Link>
              )}

              {token && (
                <Link
                  href="/profile"
                  className="hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Profile
                </Link>
              )}
              {token && token?.role === true && (
                <Link
                  href="/admin"
                  className="hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/contact"
                className="hover:bg-gray-700 px-3 py-2 rounded"
              >
                Contact
              </Link>
              {!token && (
                <Link
                  href="/signup"
                  className="hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Signup
                </Link>
              )}
              {!token && (
                <Link
                  href="/login"
                  className="hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Login
                </Link>
              )}
            </div>
          )}

          {/* Search */}
          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-900 text-sm px-4 py-2 rounded-l focus:outline-none focus:ring"
            />
            <button className="bg-teal-500 px-4 py-2 rounded-r hover:bg-teal-600">
              Search
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 flex flex-col items-center flex-wrap">
          <Link
            href="/"
            className="hover:bg-gray-700 px-3 py-2 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="hover:bg-gray-700 px-3 py-2 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
          {!token && (
            <>
              <Link
                href="/cart"
                className="hover:bg-gray-700 px-3 py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
              </Link>
              <Link
                href="/trackOrder"
                className="hover:bg-gray-700 px-3 py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Track
              </Link>
            </>
          )}
          {token && token?.role === false && (
            <Link
              href="/profile"
              className="hover:bg-gray-700 px-3 py-2 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
          )}
          {token?.role === true && (
            <Link
              href="/admin"
              className="hover:bg-gray-700 px-3 py-2 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          {!token && (
            <>
              <Link
                href="/signup"
                className="hover:bg-gray-700 px-3 py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Singup
              </Link>
              <Link
                href="/login"
                className="hover:bg-gray-700 px-3 py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}
          {token && (
            <button
              className="hover:bg-gray-700 px-3 py-2 rounded"
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
            >
              Log Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
