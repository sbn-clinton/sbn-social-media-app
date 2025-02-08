"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import { FaPaperPlane } from "react-icons/fa";
import { Button } from "../ui/button";
import { useState } from "react";
import { sendMessage } from "../../../server/userAction";
import { Models } from "node-appwrite";
import { User2Icon } from "lucide-react";

const ChatInput = ({ slug, user }: { slug: string; user: Models.Document }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);
    setIsLoading(true);
    const formData = {
      message: message,
      receiver: slug,
    };
    try {
      const response = await sendMessage(formData);
      console.log(response);
      if (response?.success === true) {
        console.log("Message sent successfully");
      }
      setMessage("");
    } catch (error) {
      console.log(error);
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

      <Card className="flex flex-grow  border-slate-300 w-full bg-inherit">
        <form
          onSubmit={handleMessage}
          className="flex border-none w-full bg-inherit "
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full rounded-lg rounded-e-none border-slate-300  p-2 text-sm outline-none bg-slate-100"
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-slate-100 border-none hover:bg-slate-100 shadow-none rounded-s-none"
          >
            <FaPaperPlane className="w-5 h-5 text-slate-800" />
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChatInput;
