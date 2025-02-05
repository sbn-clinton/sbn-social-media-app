import Image from "next/image";
import { Card } from "../ui/card";
import { FaPaperPlane } from "react-icons/fa";
import { Button } from "../ui/button";

const ChatInput = () => {
  return (
    <div className="flex flex-row gap-2 items-center justify-between w-full md:w-[40%] fixed bottom-0 md:bottom-0 bg-inherit left-0 right-0 px-4 py-4 mx-auto z-50">
      <div className="relative w-8 h-8 md:w-12 md:h-12">
        <Image src={"/images/sidebar-image.png"} alt="img" fill />
      </div>
      <Card className="flex flex-grow  border-slate-300 w-full bg-inherit ">
        <input
          type="text"
          placeholder="Type your message here..."
          className="w-full rounded-lg rounded-e-none border-slate-300  p-2 text-sm outline-none bg-slate-100"
        />
        <Button className="bg-slate-100 border-none hover:bg-slate-100 shadow-none rounded-s-none">
          <FaPaperPlane className="w-5 h-5 text-slate-800" />
        </Button>
      </Card>
    </div>
  );
};

export default ChatInput;
