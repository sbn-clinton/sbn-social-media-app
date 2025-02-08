import Image from "next/image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { FaPaperPlane } from "react-icons/fa";
import { getFewUsers } from "../../server/userAction";
import { User2Icon } from "lucide-react";

const RightSideBar = async () => {
  const users = await getFewUsers();
  return (
    <Card className="md:w-[25%] hidden md:block fixed top-28 right-8 px-4 py-10 font-sans h-fit bg-inherit border-b-0">
      <div className="flex flex-col  justify-start gap-y-6   ">
        <p className="font-semibold text-lg text-slate-900">Other Users</p>
        <hr className="border-b-2 border-slate-200 w-full" />
        <div className="flex flex-col items-center gap-4">
          {users?.map((user) => (
            <div
              key={user.$id}
              className="flex flex-row items-center justify-between gap-2 w-full"
            >
              {user.imageUrl ? (
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full">
                  <Image
                    src={user.imageUrl}
                    alt="profile"
                    fill
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full">
                  <User2Icon className="w-full h-full rounded-full" />
                </div>
              )}
              <div className="flex flex-col items-start gap-1 flex-1">
                <p className="text-sm text-slate-600">{user.username}</p>
                <p className="text-xs text-slate-500">{user.bio}</p>
              </div>
              <Button
                size={"icon"}
                className="bg-inherit border-none hover:bg-inherit"
                asChild
              >
                <Link href={`/messages/${user.$id}`} className="">
                  <FaPaperPlane className="w-5 h-5 text-slate-800" />
                </Link>
              </Button>
            </div>
          ))}
          <Button
            size={"sm"}
            variant={"outline"}
            className="w-full text-xs md:text-sm"
            asChild
          >
            <Link href={"/messages"} className="">
              View All
            </Link>
          </Button>
        </div>
        <hr className="border-b-2 border-slate-200 w-full" />
        <div className="flex flex-col items-center text-center gap-3">
          <p className="text-xs text-slate-600">
            © 2023 <span className="text-[#4C68D5] font-bold">SBN_DEV.</span>{" "}
            All rights reserved.
          </p>
          <div className="flex gap-1">
            <p className="text-xs text-slate-600">About</p>
            <p className="text-xs text-slate-600">Help</p>
            <p className="text-xs text-slate-600">Privacy & Terms</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RightSideBar;
