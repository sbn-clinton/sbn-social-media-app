"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaPaperPlane, FaUsers } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLoggedInUser } from "../../server/action";
import { Models } from "node-appwrite";
import { User2Icon } from "lucide-react";

const BottomBar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<Models.Document | null>(null);

  // Hide component if pathname matches /messages/{any-slug-or-id}
  const isMessagePage = /^\/messages\/[^/]+$/.test(pathname);

  useEffect(() => {
    const getUser = async () => {
      const response = await getLoggedInUser();
      setUser(response);
    };
    getUser();
  }, []);

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
        <Link href={"/messages"} className="flex justify-center items-center">
          <FaPaperPlane className="w-5 h-5 text-[#4C68D5]" />
        </Link>
        <Link href={"/users"} className="flex justify-center items-center">
          <FaUsers className="w-6 h-6 text-[#4C68D5]" />
        </Link>
        {user?.imageUrl ? (
          <Link
            href={"/profile"}
            className="flex justify-center items-center relative w-7 h-7"
          >
            <Image
              src={user.imageUrl}
              alt="profile image"
              fill
              className="rounded-full"
            />
          </Link>
        ) : (
          <Link
            href={"/profile"}
            className="flex justify-center items-center relative w-6 h-6"
          >
            <User2Icon className="w-6 h-6 text-[#4C68D5]" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default BottomBar;
