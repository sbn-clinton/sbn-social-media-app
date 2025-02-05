import { BsThreeDots } from "react-icons/bs";
import { Card } from "../ui/card";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import Image from "next/image";

const MyPostCard = () => {
  return (
    <div className="space-y-4">
      <Card className="flex flex-col gap-4 w-full bg-white bg-opacity-85 px-8 py-4 font-sans h-fit">
        <div className="flex justify-between items-center gap-2  ">
          <div className="relative h-10 w-10 md:w-14 md:h-14">
            <Image src={"/images/sidebar-image.png"} alt="logo" fill />
          </div>
          <div className="flex flex-col gap-1 md:gap-2 flex-grow">
            <h1 className="md:text-lg font-bold">Robert Fox</h1>
            <p className="text-xs md:text-sm text-slate-600">
              Software Engineer
            </p>
          </div>
          <div className="flex flex-col items-end">
            <BsThreeDots />
            <p className="text-xs md:text-sm text-slate-600">3 day ago</p>
          </div>
        </div>
        <hr className="border-b-1 border-slate-200 w-full" />
        <div className="flex flex-col gap-7 md:gap-10">
          <div className="flex- flex-col space-y-4 md:space-y-6 w-full">
            <p className="text-xs md:text-sm text-slate-600 text-start">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              molestie, urna vel ultricies tincidunt, purus nisi aliquam risus,
              id egestas risus nisl eget quam. Donec euismod, nisl eu mollis
              consectetur
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <AiOutlineComment className="md:w-6 md:h-6 h-4 w-4 text-slate-800" />
              <p className="text-xs md:text-sm text-slate-600">Comment</p>
            </div>
            <div className="flex gap-2 items-center">
              <AiOutlineLike className="md:w-6 md:h-6 h-4 w-4 text-slate-800" />
              <p className="text-xs md:text-sm text-slate-600">Like</p>
            </div>
          </div>
        </div>
      </Card>
      <Card className="flex flex-col gap-4 w-full bg-white bg-opacity-85 px-8 py-4 font-sans h-fit">
        <div className="flex justify-between items-center gap-2  ">
          <div className="relative h-10 w-10 md:w-14 md:h-14">
            <Image src={"/images/sidebar-image.png"} alt="logo" fill />
          </div>
          <div className="flex flex-col gap-1 md:gap-2 flex-grow">
            <h1 className="md:text-lg font-bold">Jacob Jones</h1>
            <p className="text-xs md:text-sm text-slate-600">Sales Manager</p>
          </div>
          <div className="flex flex-col items-end">
            <BsThreeDots />
            <p className="text-xs md:text-sm text-slate-600">1 day ago</p>
          </div>
        </div>
        <hr className="border-b-1 border-slate-200 w-full" />
        <div className="flex flex-col gap-7 md:gap-10">
          <div className="flex- flex-col space-y-4 md:space-y-6 w-full">
            <p className="text-xs md:text-sm text-slate-600 text-start">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              molestie, urna vel ultricies tincidunt, purus nisi aliquam risus,
              id egestas risus nisl eget quam. Donec euismod, nisl eu mollis
              consectetur
            </p>
            <div className="relative w-full h-44 md:h-60">
              <Image
                src={"/images/Media.png"}
                alt="profile"
                fill
                className="rounded-lg absolute"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <AiOutlineComment className="md:w-6 md:h-6 h-4 w-4 text-slate-800" />
              <p className="text-xs md:text-sm text-slate-600">Comment</p>
            </div>
            <div className="flex gap-2 items-center">
              <AiOutlineLike className="md:w-6 md:h-6 h-4 w-4 text-slate-800" />
              <p className="text-xs md:text-sm text-slate-600">Like</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyPostCard;
