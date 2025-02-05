"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";

const BottomBar = () => {
  const pathname = usePathname();

  console.log(pathname);

  // Hide component if pathname matches /messages/{any-slug-or-id}
  const isMessagePage = /^\/messages\/[^/]+$/.test(pathname);

  return (
    <nav
      className={`bottom-0 left-0 w-full px-6 bg-inherit backdrop-blur-sm bg-opacity-25 z-50 md:hidden ${
        isMessagePage ? "hidden" : "fixed"
      }`}
    >
      <div className="flex justify-between items-center mx-auto p-3">
        <Link href={"/"} className="flex justify-center items-center">
          <AiFillHome className="w-6 h-6 text-[#4C68D5]" />
        </Link>
        <div className="flex justify-center items-center">
          <BsBellFill className="w-6 h-6 text-[#4C68D5]" />
        </div>
        <Link href={"/messages"} className="flex justify-center items-center">
          <FaPaperPlane className="w-5 h-5 text-[#4C68D5]" />
        </Link>
        <Link
          href={"/profile"}
          className="flex justify-center items-center relative w-6 h-6"
        >
          <Image src={"/images/sidebar-image.png"} alt="logo" fill />
        </Link>
      </div>
    </nav>
  );
};

export default BottomBar;
