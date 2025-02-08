"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CloudUpload, Loader } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";
import { getLoggedInUser } from "../../../server/action";
import { Models } from "node-appwrite";
import { CreatePost } from "../../../server/postsAction";

export function CreatePostForm() {
  const [content, setContent] = useState("");
  const [user, setUser] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await getLoggedInUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputElement = fileInputRef.current;

    console.log("Input element:", inputElement);
    console.log("Input element files:", inputElement?.files);

    if (!inputElement) {
      console.error("File input element not found.");
    }

    const file = inputElement?.files?.[0];
    console.log("Selected file:", file);

    const formData = {
      content: content,
      file: file,
      creator: user?.$id,
    };

    setIsLoading(true);
    try {
      const response = await CreatePost(formData);
      if (response?.success === true) {
        console.log("Post created successfully");
        router.refresh();
        router.push("/profile");
        setContent("");
        if (inputElement) {
          inputElement.value = "";
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-inherit" asChild>
        <FaPaperPlane className="md:w-6 md:h-6 h-5 w-5 text-[#4C68D5] animate-bounce duration-1000" />
      </DialogTrigger>
      <DialogContent className="w-[90%] md:max-w-md mx-auto rounded-2xl">
        <DialogTitle>Create Post</DialogTitle>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="relative flex items-center justify-center gap-2 border-2 py-2 rounded-xl border-dotted">
            <CloudUpload className="md:w-6 md:h-6 h-6 w-6 text-slate-600" />
            <p className="text-xs md:text-sm text-slate-600">
              Upload a profile picture
            </p>
            <input
              type="file"
              accept="image/*"
              id="profile-picture"
              ref={fileInputRef}
              className="absolute top-0 left-0 right-0 bottom-0 opacity-0"
            />
          </div>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something..."
            className="w-full text-xs md:text-sm"
          />

          <Button
            className="w-full bg-[#4C68D5] hover:bg-[#4C68D5]/80]"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? " Creating..." : "Create Post"}
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
