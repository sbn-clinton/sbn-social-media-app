import Image from "next/image";
import { Card } from "./ui/card";
import Link from "next/link";
import { Home, User, User2Icon } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { getLoggedInUser } from "../../server/action";

const LeftSideBar = async () => {
  const user = await getLoggedInUser();

  return (
    <Card className="md:w-[20%] hidden md:block fixed top-28 left-24  w-full bg-inherit border-b-0 font-sans h-fit ">
      <div className="flex flex-col  justify-start gap-y-5   border-b-0">
        <div className="flex flex-col items-start justify-start px-6 py-10 gap-y-4 bg-inherit">
          {user?.imageUrl ? (
            <div className="relative w-16 h-16 rounded-full md">
              <Image
                src={user?.imageUrl}
                alt="img"
                fill
                className="rounded-full"
              />
            </div>
          ) : (
            <Card className="flex justify-center items-center h-16 w-16 rounded-full font-extrabold text-white bg-slate-800 text-4xl">
              <User2Icon className="w-full h-full" />
            </Card>
          )}

          <div className="flex flex-col gap-1 text-start">
            <h1 className="font-bold text-lg text-slate-900">
              {user?.fullName}
            </h1>
            <p className="text-sm text-slate-500">{user?.bio}</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start px-6 py-8 gap-y-4 ">
          <Link
            href={"/"}
            className="flex flex-row items-center gap-x-2  text-slate-800 "
          >
            <Home className="w-6 h-6" />
            <span className="text-sm text-slate-500">Home</span>
          </Link>
          <hr className="border bg-gray-600 w-full" />
          <Link
            href={"/profile"}
            className="flex flex-row items-center gap-x-2  text-slate-800 "
          >
            <User className="w-6 h-6" />
            <span className="text-sm text-slate-500">Profile</span>
          </Link>
          <hr className="border bg-gray-600 w-full" />
          <Link
            href={"/messages"}
            className="flex flex-row items-center gap-x-2  text-slate-800 "
          >
            <FaTelegramPlane className="w-6 h-6" />
            <span className="text-sm text-slate-500">Messages</span>
          </Link>
          <hr className="border bg-gray-600 w-full" />
        </div>
      </div>
    </Card>
  );
};

export default LeftSideBar;
