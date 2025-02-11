import { Card } from "../ui/card";
// import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import Image from "next/image";
import { getPostsByUser } from "../../../server/postsAction";
import { User2Icon } from "lucide-react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { CreatePostForm } from "../posts/CreatePostForm";
import { EditPostForm } from "../posts/EditPostForm";
import DeletePostButton from "./DeletePostButton";

const MyPostCard = async () => {
  const posts = await getPostsByUser();

  return (
    <div className="space-y-4">
      {posts?.length ? (
        posts.map((post) => (
          <Card
            key={post.$id}
            className="flex flex-col gap-4 w-full bg-white bg-opacity-85 md:px-8 px-4 py-2 md:py-4 font-sans h-fit"
          >
            <div className="flex justify-between items-center gap-2  ">
              {post.creator.imageUrl ? (
                <div className="relative h-10 w-10 md:w-14 md:h-14">
                  <Image
                    src={post.creator.imageUrl}
                    alt="logo"
                    fill
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="relative h-10 w-10 md:w-14 md:h-14">
                  <User2Icon className="w-full h-full" />
                </div>
              )}

              <div className="flex flex-col gap-1 md:gap-2 flex-grow">
                <h1 className="md:text-lg font-bold">
                  {post.creator.username}
                </h1>
                <p className="text-xs md:text-sm text-slate-600">
                  {post.creator.bio}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex gap-2 items-center">
                  <EditPostForm
                    postId={post.$id}
                    creator={post.creator}
                    content1={post.content}
                    imageId={post.imageId}
                  />
                  <DeletePostButton
                    id={post.$id}
                    creator={post.creator}
                    imageId={post.imageId}
                  />
                </div>

                <p className="text-xs md:text-sm text-slate-600">
                  {formatDistanceToNow(new Date(post.$createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <hr className="border-b-1 border-slate-200 w-full" />
            <div className="flex flex-col gap-7 md:gap-10">
              <div className="flex flex-col space-y-4 md:space-y-6 w-full">
                <p className="text-xs md:text-sm text-slate-800 text-start break-all">
                  {post.content}
                </p>
                {post.imageUrl && (
                  <div className="relative w-full h-44 md:h-60">
                    <Image
                      src={post.imageUrl}
                      alt="profile"
                      fill
                      className="rounded-lg absolute"
                    />
                  </div>
                )}
              </div>
              {/* <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <AiOutlineComment className="md:w-6 md:h-6 h-4 w-4 text-slate-800" />
                  <p className="text-xs md:text-sm text-slate-600">Comment</p>
                </div>
                <div className="flex gap-2 items-center">
                  <AiOutlineLike className="md:w-6 md:h-6 h-4 w-4 text-slate-800" />
                  <p className="text-xs md:text-sm text-slate-600">Like</p>
                </div>
              </div> */}
            </div>
          </Card>
        ))
      ) : (
        <Card className="flex flex-col gap-2 md:gap-4 w-full bg-white bg-opacity-85  md:px-8 px-4 py-2 md:py-4 font-sans h-fit items-center justify-center text-center">
          <h1 className="md:text-lg font-bold text-black">No Posts Yet</h1>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs md:text-sm text-slate-600">Tap</p>
            <CreatePostForm />
            <p className="text-xs md:text-sm text-slate-600">
              to create your first post
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MyPostCard;
