import { LogOutIcon } from "lucide-react";

const LogoutButton = () => {
  return (
    <div className="flex items-center justify-center gap-2 w-full bg-inherit border-0 shadow-none hover:bg-inherit font-sans">
      <span className=" text-sm md:text-base text-slate-600 hidden md:block">
        Logout
      </span>
      <LogOutIcon className="w-4 h-4 md:w-6 md:h-6 text-[#4C68D5]" />
    </div>
  );
};

export default LogoutButton;
