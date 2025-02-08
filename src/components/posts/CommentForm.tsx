"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { Models } from "node-appwrite";
import { getLoggedInUser } from "../../../server/action";
import { FaPaperPlane } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CreateComment } from "../../../server/postsAction";
import { Card } from "../ui/card";
import { User2Icon } from "lucide-react";

const CommentForm = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState("");
  const [user, setUser] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      comment: comment,
      postId: postId,
      creator: user?.$id,
    };
    setIsLoading(true);
    try {
      const response = await CreateComment(formData);
      if (response?.success === true) {
        console.log("Comment created successfully");
        setComment("");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center gap-3">
      {user && (
        <>
          {user.imageUrl ? (
            <div className="relative w-8 h-8 md:w-12 md:h-12 rounded-full">
              <Image
                src={user?.imageUrl}
                alt="logo"
                fill
                className="absolute rounded-full"
              />
            </div>
          ) : (
            <Card className="relative w-8 h-8 md:w-12 md:h-12 rounded-full">
              <User2Icon className="w-full h-full" />
            </Card>
          )}
          <Card className="flex flex-1 ">
            <form
              onSubmit={handleSubmit}
              className="flex  justify-between w-full  pr-2"
            >
              <Input
                placeholder="Share your thoughts here..."
                className="w-full border-none focus:outline-none focus:ring-0 text-xs md:text-sm py-1 md:py-2 bg-inherit shadow-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button disabled={isLoading}>
                <FaPaperPlane className="text-[#4C68D5] w-4 h-4 md:w-6 md:h-6 " />
              </button>
            </form>
          </Card>
        </>
      )}
    </div>
  );
};

export default CommentForm;
