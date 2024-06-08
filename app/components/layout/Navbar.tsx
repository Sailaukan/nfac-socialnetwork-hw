import Link from "next/link";

const Navbar = () => {
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
            <div className="flex items-center space-x-4" />
        </header>
    )
}

export default Navbar;