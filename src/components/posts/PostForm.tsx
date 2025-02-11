"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { AiTwotonePicture } from "react-icons/ai";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { Loader, User2Icon } from "lucide-react";
import { CreatePost } from "../../../server/postsAction";
import { useRouter } from "next/navigation";
import { getLoggedInUser } from "../../../server/action";
import { Models } from "node-appwrite";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [user, setUser] = useState<Models.Document | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await getLoggedInUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputElement = fileInputRef.current;

    if (!inputElement) {
      console.error("File input element not found.");
    }

    const file = inputElement?.files?.[0];
    console.log("Selected file:", file);

    if (!content || !user) {
      toast({
        variant: "destructive",
        description: "Please fill in all the required fields or Login.",
        action: <ToastAction altText="Try again">x</ToastAction>,
      });
      return;
    }

    const formData = {
      content: content,
      file: file,
    };

    setIsLoading(true);
    try {
      const response = await CreatePost(formData);
      if (response?.success === true) {
        console.log("Post created successfully");
        router.refresh();
        setContent("");
        if (inputElement) {
          inputElement.value = "";
        }
      }
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
    <Card className="flex flex-row justify-between gap-4 w-full bg-white bg-opacity-85 px-4 py-4 md:py-8 font-sans">
      {user?.imageUrl ? (
        <div className="relative md:w-12 md:h-12 w-10 h-10 rounded-full">
          <Image
            src={user?.imageUrl}
            alt="logo"
            fill
            className="rounded-full"
          />
        </div>
      ) : (
        <Card className="relative md:w-12 md:h-12 w-10 h-10">
          <User2Icon className="w-full h-full" />
        </Card>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-1 flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind"
          className="w-full border-none h-[40px] max-h-[120px] resize-none overflow-hidden focus:outline-none focus:ring-0 text-xs md:text-sm py-2 bg-inherit"
        />
        <hr className="w-full border-1 border-gray-300" />
        <div className="flex flex-row justify-between gap-2">
          <div className="flex  gap-2 relative items-center">
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="w-full border-none text-xs md:text-sm focus:outline-none focus:ring-0  absolute top-0 left-0 right-0 bottom-0 opacity-0"
            />

            <AiTwotonePicture className="w-6 h-6 text-slate-800 md:w-7 md:7" />
            <p className="text-xs md:text-sm text-slate-600">Add Media</p>
          </div>

          <Button
            className="bg-[#4C68D5] hover:bg-[#4C68D5]/80 py-1 md:py-2  rounded-full font-bold text-sm md:text-base"
            disabled={isLoading}
          >
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {!isLoading && "Post"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PostForm;
