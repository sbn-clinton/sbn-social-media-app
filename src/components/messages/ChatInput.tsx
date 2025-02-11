"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import { FaPaperPlane } from "react-icons/fa";
import { Button } from "../ui/button";
import { useState } from "react";
import { sendMessage } from "../../../server/userAction";
import { Models } from "node-appwrite";
import { User2Icon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";

const ChatInput = ({ slug, user }: { slug: string; user: Models.Document }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message || !user || !slug) {
      return;
    }
    setIsLoading(true);
    const formData = {
      message: message,
      receiver: slug,
    };
    try {
      const response = await sendMessage(formData);

      if (response?.success === true) {
        router.refresh();
      }
      setMessage("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        description: error.message,
        action: <ToastAction altText="Try again">x</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-between w-full md:w-[40%] fixed bottom-0 md:bottom-0 bg-inherit left-0 right-0 px-4 py-4 mx-auto z-50">
      {user?.imageUrl ? (
        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full">
          <Image src={user.imageUrl} alt="img" fill className="rounded-full" />
        </div>
      ) : (
        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full">
          <User2Icon className="w-full h-full rounded-full" />
        </div>
      )}

      <Card className="flex items-center border-slate-300 w-full bg-inherit ">
        <form
          onSubmit={handleMessage}
          className="flex items-center border-none w-full bg-inherit"
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="w-full h-[40px] max-h-[120px] resize-none overflow-hidden rounded-lg rounded-e-none  px-3 py-2 text-sm outline-none bg-white"
            style={{ minHeight: "40px" }}
            rows={1}
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-white hover:bg-slate-100 shadow-none rounded-s-none h-full "
          >
            <FaPaperPlane className="w-5 h-5 text-slate-800" />
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChatInput;
