"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    getUser();
  }, [pathname]);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/login");
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          FinanceFlow
        </Link>

        {/* Nav Links */}
        <div className="space-x-4 flex items-center">
          <Link
            href="/"
            className={`hover:underline transition-colors duration-200 ${
              pathname === "/"
                ? "font-semibold text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`hover:underline transition-colors duration-200 ${
                  pathname === "/dashboard"
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 dark:text-red-400 hover:underline transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 dark:text-gray-300 hover:underline transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-gray-700 dark:text-gray-300 hover:underline transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="px-2 py-1 rounded text-sm border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
