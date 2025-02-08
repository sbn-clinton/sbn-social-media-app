"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import DeletePostButton from "./DeletePostButton";
import { EditPostForm } from "../posts/EditPostForm";

export function DropDown({
  postId,
  creator,
  content,
  imageId,
}: {
  postId: string;
  creator: string;
  content: string;
  imageId: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <BsThreeDots />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit flex flex-col gap-2 rounded-lg bg-white p-3 ">
        <EditPostForm
          postId={postId}
          creator={creator}
          content1={content}
          imageId={imageId}
        />
        <hr className="border-1 border-slate-200" />
        <DeletePostButton id={postId} creator={creator} imageId={imageId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
