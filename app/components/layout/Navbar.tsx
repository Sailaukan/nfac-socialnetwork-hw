'use client'

import { UserContext } from "@/app/contexts/PostContext";
import Link from "next/link";
import { useContext } from "react";

const Navbar = () => {

    const { user, setUser } = useContext(UserContext);

    const handleTheme = () => {
        setUser({
            ...user,
            darkTheme:!user.darkTheme
        })
    }

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm dark:bg-gray-900">
            <div className="flex items-center space-x-6">
                <Link href="/main" className="text-lg font-medium text-gray-900 dark:text-gray-100" prefetch={false}>
                    Main
                </Link>
                <Link
                    href="profile"
                    className="text-lg font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    prefetch={false}
                >
                    Profile
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    onClick={handleTheme}
                    className="px-3 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100"
                >
                    {user.darkTheme ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
            <div className="flex items-center space-x-4" />
        </header>
    )
}

export default Navbar;