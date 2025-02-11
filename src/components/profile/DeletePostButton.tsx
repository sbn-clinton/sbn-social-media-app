"use client";

import { Loader, Trash2Icon } from "lucide-react";
import { deletePost } from "../../../server/postsAction";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeletePostButton = ({
  id,
  creator,
  imageId,
}: {
  id: string;
  creator: string;
  imageId: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!creator || !id) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await deletePost(id, imageId);
      if (response?.success === true) {
        console.log("Post deleted successfully");
        router.refresh();
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      className="flex items-center gap-2 cursor-pointer"
      disabled={isLoading}
    >
      {isLoading && (
        <div className="flex justify-center items-center w-full ">
          <Loader className="mr-2 h-4 w-4 animate-spin text-red-500 self-center" />
        </div>
      )}
      {!isLoading && (
        <>
          <Trash2Icon className="md:w-5 md:h-5 h-5 w-5 text-red-500" />
        </>
      )}
    </button>
  );
};

export default DeletePostButton;
