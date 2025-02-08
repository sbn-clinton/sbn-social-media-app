"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

import SearchBar from "./SearchBar";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  // Hide component only on small screens when pathname matches /messages/{any-slug-or-id}
  const isMessagePage = /^\/messages\/[^/]+$/.test(pathname);

  return (
    <nav
      className={`top-0 left-0 w-full bg-inherit backdrop-blur-sm bg-opacity-25 z-50 fixed md:fixed ${
        isMessagePage ? "hidden md:block" : ""
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        <Link
          href={"/"}
          className="w-[30%] md:w-1/5 flex items-center  gap-1 md:gap-2"
        >
          <div className="relative w-6 h-6 md:w-12 md:h-12">
            <Image src={"/images/nav-icons.png"} alt="logo" fill />
          </div>

          <h1 className="md:text-lg font-bold">SBN</h1>
        </Link>
        <div className="w-[60%] md:w-3/5">
          <SearchBar />
        </div>
        <div className="w-[10%] md:w-1/5">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
