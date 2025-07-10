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

    
  useEffect(() => {
    setMounted(true);
  }, []);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get("/auth/me");
                setUser(res.data);
            } catch {
                setUser(null); // not logged in
            }
        };
        getUser();
    }, [pathname]); // refetch on route change

    const handleLogout = async () => {
        await axios.post("/auth/logout");
        router.push("/login");
    };

    return (
        <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
                FinanceFlow
            </Link>

            <div className="space-x-4">
                <Link
                    href="/"
                    className={`hover:underline ${pathname === "/" ? "font-semibold text-blue-600" : ""}`}
                >
                    Home
                </Link>

                {user ? (
                    <>
                        <Link
                            href="/dashboard"
                            className={`hover:underline ${pathname === "/dashboard" ? "font-semibold text-blue-600" : ""
                                }`}
                        >
                            Dashboard
                        </Link>
                        <button onClick={handleLogout} className="text-red-500 hover:underline">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="hover:underline">
                            Login
                        </Link>
                        <Link href="/register" className="hover:underline">
                            Register
                        </Link>
                    </>
                )}
                {mounted && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-2 py-1 rounded text-sm border hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      )}
            </div>
        </nav>
    );
}
