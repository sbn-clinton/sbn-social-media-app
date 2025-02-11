import Image from "next/image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { User2Icon } from "lucide-react";
import { getFewUsers } from "../../server/userAction";
import { getLoggedInUser } from "../../server/action";
import FollowButton from "./messages/FollowButton";

const RightSideBar = async () => {
  const users = await getFewUsers();
  const currentUser = await getLoggedInUser();
  return (
    <Card className="md:w-[25%] hidden md:block fixed top-28 right-8 px-4 py-10 font-sans h-fit bg-inherit border-b-0">
      <div className="flex flex-col  justify-start gap-y-6   ">
        <p className="font-semibold text-lg text-slate-900">Other Users</p>
        <hr className="border-b-2 border-slate-200 w-full" />
        <div className="flex flex-col items-center gap-4">
          {users?.map((user) => (
            <div
              key={user.$id}
              className="flex flex-row gap-2 items-center justify-between w-full"
            >
              {user.imageUrl ? (
                <div className="relative w-10 h-10  rounded-full">
                  <Image
                    src={user.imageUrl}
                    alt="img"
                    fill
                    className="rounded-full"
                  />
                </div>
              ) : (
                <Card className="relative w-10 h-10 ">
                  <User2Icon className="w-full h-full" />
                </Card>
              )}

              <div className="flex flex-col flex-1">
                <h1 className=" font-bold">{user.username}</h1>
                <p className="text-xs  text-slate-500">{user.bio}</p>
              </div>
              <FollowButton user={user} currentUser={currentUser} />
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
