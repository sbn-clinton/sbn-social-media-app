"use client";

import { LogOutIcon } from "lucide-react";
import { signOut } from "../../server/action";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await signOut();
    if (response?.success === true) {
      router.refresh();
      router.push("/login");
    }
  };
  return (
    <div className="flex justify-end gap-2 w-full bg-inherit border-0 shadow-none hover:bg-inherit font-sans">
      <span
        onClick={handleLogout}
        className=" text-sm md:text-base text-slate-600 hidden md:block cursor-pointer"
      >
        Logout
      </span>
      <LogOutIcon
        onClick={handleLogout}
        className="w-4 h-4 md:w-6 md:h-6 text-[#4C68D5]"
      />
    </div>
  );
};

export default LogoutButton;
