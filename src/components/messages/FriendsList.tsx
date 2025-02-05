import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";

const FriendsList = () => {
  return (
    <div className="bg-inherit">
      <Card className="flex flex-col gap-4 p-4 border-slate-300 w-full bg-inherit rounded-b-none">
        <h1 className="md:text-xl font-bold">Chat Other Users</h1>
      </Card>
      <Card className="flex flex-col gap-6 p-4 border-slate-300 w-full bg-inherit rounded-t-none">
        <Link href={"/messages/1"} className="flex flex-row gap-4 items-center">
          <div className="relative w-8 h-8 md:w-12 md:h-12">
            <Image src={"/images/friends1.png"} alt="img" fill />
          </div>

          <div className="flex flex-col">
            <h1 className="md:text-lg font-bold">Maria Clinton</h1>
            <p className="text-xs md:text-sm text-slate-500">
              Software Engineer
            </p>
            <p className="text-xs md:text-sm text-slate-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.....
            </p>
          </div>
        </Link>
        <Link href={"/messages/2"} className="flex flex-row gap-4 items-center">
          <div className="relative w-8 h-8 md:w-12 md:h-12">
            <Image src={"/images/friends2.png"} alt="img" fill />
          </div>

          <div className="flex flex-col">
            <h1 className="md:text-lg font-bold">Luke Skywalker</h1>
            <p className="text-xs md:text-sm text-slate-500">
              Anaylst Engineer
            </p>
            <p className="text-xs md:text-sm text-slate-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.....
            </p>
          </div>
        </Link>
        <Link href={"/messages/2"} className="flex flex-row gap-4 items-center">
          <div className="relative w-8 h-8 md:w-12 md:h-12">
            <Image src={"/images/friends3.png"} alt="img" fill />
          </div>

          <div className="flex flex-col">
            <h1 className="md:text-lg font-bold">Shimmers Coat</h1>
            <p className="text-xs md:text-sm text-slate-500">
              Back End Developer
            </p>
            <p className="text-xs md:text-sm text-slate-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.....
            </p>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default FriendsList;
