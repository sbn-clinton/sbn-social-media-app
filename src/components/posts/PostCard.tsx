import Image from "next/image";
import { Card } from "../ui/card";
import { AiOutlineComment } from "react-icons/ai";
import { getPosts } from "../../../server/postsAction";
import { User2Icon } from "lucide-react";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import { formatDistanceToNow } from "date-fns";
import { getLoggedInUser } from "../../../server/action";
import LikeButton from "./LikesButton";

const PostCard = async () => {
  const posts = await getPosts();
  const user = await getLoggedInUser();

  return (
    <>
      {posts?.map((post) => (
        <Card
          key={post.$id}
          className="flex flex-col gap-4 w-full bg-white bg-opacity-85 px-4 md:px-8 py-2 md:py-4 font-sans h-fit"
        >
          <div className="flex justify-between items-center gap-2  ">
            {post.creator.imageUrl ? (
              <div className="relative md:w-14 md:h-14 w-10 h-10">
                <Image
                  src={post.creator.imageUrl}
                  alt="logo"
                  fill
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="relative md:w-14 md:h-14 w-10 h-10">
                <User2Icon className="w-full h-full" />
              </div>
            )}

            <div className="flex flex-col gap-1 md:gap-2 flex-grow">
              <h1 className="md:text-lg font-bold">{post.creator.username}</h1>
              <p className="text-xs md:text-sm text-slate-600">
                {post.creator.bio}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xs md:text-sm text-slate-600">
                {formatDistanceToNow(new Date(post.$createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 w-full" />
          <div className="flex flex-col gap-7 md:gap-10">
            <div className="flex- flex-col space-y-4 md:space-y-6 w-full">
              <p className="text-xs md:text-sm text-slate-800 text-start break-all">
                {post.content}
              </p>

              {post.imageUrl && typeof post.imageUrl === "string" && (
                <div className="w-full h-44 md:h-60 relative">
                  <Image
                    src={post.imageUrl}
                    alt="profile"
                    fill
                    className="rounded-lg absolute"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <AiOutlineComment className="md:w-6 md:h-6 w-4 h-4 text-slate-800" />
                <p className="text-xs md:text-sm text-slate-600">Comment</p>
              </div>
              <div className="flex gap-2 items-center">
                <LikeButton postId={post.$id} userId={user?.accountId} />
              </div>
            </div>
            {user && <CommentForm postId={post.$id} />}
            <CommentCard postId={post.$id} />
          </div>
        </Card>
      ))}
    </>
  );
};

export default PostCard;
