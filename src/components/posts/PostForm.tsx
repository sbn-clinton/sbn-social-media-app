import Image from "next/image";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { AiTwotonePicture } from "react-icons/ai";
import { Button } from "../ui/button";

const PostForm = () => {
  return (
    <Card className="flex flex-row justify-between gap-4 w-full bg-white bg-opacity-85 px-4 py-4 md:py-8 font-sans">
      <div className="relative md:w-12 md:h-12 w-10 h-10">
        <Image src={"/images/sidebar-image.png"} alt="logo" fill />
      </div>
      <form className="flex flex-col gap-3 flex-1">
        <input
          type="text"
          placeholder="What's on your mind"
          className="w-full border-none focus:outline-none focus:ring-0 text-xs md:text-sm py-2 bg-inherit"
        />
        <hr className="w-full border-1 border-gray-300" />
        <div className="flex flex-row justify-between gap-2">
          <div className="flex  gap-2 relative items-center">
            <Input
              type="file"
              className="w-full border-none text-xs md:text-sm focus:outline-none focus:ring-0  absolute top-0 left-0 right-0 bottom-0 opacity-0"
            />

            <AiTwotonePicture className="w-6 h-6 text-slate-800 md:w-7 md:7" />
            <p className="text-xs md:text-sm text-slate-600">Add Media</p>
          </div>

          <Button className="bg-[#4C68D5] hover:bg-[#4C68D5]/80 py-1 md:py-2  rounded-full font-bold text-sm md:text-base">
            Post
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PostForm;
