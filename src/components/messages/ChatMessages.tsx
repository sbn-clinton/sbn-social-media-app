import Image from "next/image";
import { Card } from "../ui/card";
// import ChatInput from "./ChatInput";

const ChatMessages = ({ slug }: { slug: string }) => {
  console.log(slug);
  return (
    <Card className="flex flex-col gap-4 p-4 border-slate-300 w-full bg-inherit flex-1 border-none shadow-none">
      <div className="flex flex-col h-full w-full gap-5 bg-inherit">
        <div className="flex gap-2 items-start justify-start">
          <div className="relative w-5 h-5 md:w-10 md:h-10">
            <Image src={"/images/friends1.png"} alt="img" fill />
          </div>
          <div className="flex flex-col gap-1 md:gap-2 p-2 md:p-3 bg-slate-200 rounded-xl rounded-b-xl rounded-s-none w-fit">
            <p className="text-xs md:text-sm text-slate-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos, totam odio architecto rerum enim soluta perspiciatis
              minus fuga laboriosam delectus asperiores obcaecati velit.
            </p>
            <p className="text-xs md:text-sm text-slate-500 text-end">
              1:00 PM
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-start justify-end">
          <div className="flex flex-col gap-1 md:gap-2 p-2 md:p-3 bg-blue-400  rounded-xl rounded-b-xl rounded-tr-none w-fit">
            <p className="text-xs md:text-sm text-slate-200">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos, totam odio architecto rerum enim soluta perspiciatis
              minus fuga laboriosam delectus asperiores obcaecati velit
              voluptates quam laudantium quaerat doloribus blanditiis autem
            </p>
            <p className="text-xs md:text-sm text-slate-200 text-end">
              3:05 PM
            </p>
          </div>
          <div className="relative w-5 h-5 md:w-10 md:h-10">
            <Image src={"/images/sidebar-image.png"} alt="img" fill />
          </div>
        </div>
        <div className="flex gap-2 items-start justify-start">
          <div className="relative w-5 h-5 md:w-10 md:h-10">
            <Image src={"/images/friends1.png"} alt="img" fill />
          </div>
          <div className="flex flex-col gap-1 md:gap-2 p-2 md:p-3 bg-slate-200 rounded-xl rounded-b-xl rounded-s-none w-fit">
            <p className="text-xs md:text-sm text-slate-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos, totam odio architecto rerum enim soluta perspiciatis
              minus fuga laboriosam delectus asperiores obcaecati velit.
            </p>
            <p className="text-xs md:text-sm text-slate-500 text-end">
              1:00 PM
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-start justify-end">
          <div className="flex flex-col gap-1 md:gap-2 p-2 md:p-3 bg-blue-400  rounded-xl rounded-b-xl rounded-tr-none w-fit">
            <p className="text-xs md:text-sm text-slate-200">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos, totam odio architecto rerum enim soluta perspiciatis
              minus fuga laboriosam delectus asperiores obcaecati velit
              voluptates quam laudantium quaerat doloribus blanditiis autem
            </p>
            <p className="text-xs md:text-sm text-slate-200 text-end">
              3:05 PM
            </p>
          </div>
          <div className="relative w-5 h-5 md:w-10 md:h-10">
            <Image src={"/images/sidebar-image.png"} alt="img" fill />
          </div>
        </div>
        <div className="flex gap-2 items-start justify-start">
          <div className="relative w-5 h-5 md:w-10 md:h-10">
            <Image src={"/images/friends1.png"} alt="img" fill />
          </div>
          <div className="flex flex-col gap-1 md:gap-2 p-2 md:p-3 bg-slate-200 rounded-xl rounded-b-xl rounded-s-none w-fit">
            <p className="text-xs md:text-sm text-slate-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos, totam odio architecto rerum enim soluta perspiciatis
              minus fuga laboriosam delectus asperiores obcaecati velit.
            </p>
            <p className="text-xs md:text-sm text-slate-500 text-end">
              1:00 PM
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-start justify-end">
          <div className="flex flex-col gap-1 md:gap-2 p-2 md:p-3 bg-blue-400  rounded-xl rounded-b-xl rounded-tr-none w-fit">
            <p className="text-xs md:text-sm text-slate-200">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos, totam odio architecto rerum enim soluta perspiciatis
              minus fuga laboriosam delectus asperiores obcaecati velit
              voluptates quam laudantium quaerat doloribus blanditiis autem
            </p>
            <p className="text-xs md:text-sm text-slate-200 text-end">
              3:05 PM
            </p>
          </div>
          <div className="relative w-5 h-5 md:w-10 md:h-10">
            <Image src={"/images/sidebar-image.png"} alt="img" fill />
          </div>
        </div>
      </div>
      {/* <ChatInput /> */}
    </Card>
  );
};

export default ChatMessages;
