import Image from "next/image";
import { Card } from "../ui/card";
import MyPostCard from "./MyPostCard";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa";
import { EditProfile } from "./EditProfile";

const MyDetails = () => {
  return (
    <Card className="flex flex-col gap-7 w-full bg-white bg-opacity-85 px-4 py-4 font-sans h-fit">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <div className="relative h-16 w-16 md:h-24 md:w-24">
          <Image src={"/images/sidebar-image.png"} alt="logo" fill />
          <div className="flex gap-2 items-center absolute top-2 -right-4">
            <EditProfile />
          </div>
        </div>

        <div className="flex flex-col gap-1 md:gap-2 flex-grow">
          <h1 className="md:text-lg font-bold">
            Robert Fox{" "}
            <span className="text-xs md:text-sm text-slate-600">
              (robert.fox@sbn.com)
            </span>
          </h1>
          <p className="text-xs md:text-sm text-slate-600 text-center">
            Software Engineer
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2 items-center">
          <FaRegNewspaper className="md:w-6 md:h-6 h-4 w-4 text-slate-800" />
          <p className="text-xs md:text-sm text-slate-600">
            <span className="font-bold text-sm md:text-base">8</span> Posts
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <BsPeopleFill className="md:w-6 md:h-6 h-4 w-4 text-slate-800" />
          <p className="text-xs md:text-sm text-slate-600">
            <span className="font-bold text-sm md:text-base">18</span> Followers
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <BsPeople className="md:w-6 md:h-6 h-4 w-4 text-slate-800" />
          <p className="text-xs md:text-sm text-slate-600">
            <span className="font-bold text-sm md:text-base">18</span> Following
          </p>
        </div>
      </div>
      <hr className="border-b-1 border-slate-200 w-full" />
      <MyPostCard />
    </Card>
  );
};

export default MyDetails;
