import { User2Icon } from "lucide-react";
import { getComments } from "../../../server/postsAction";
import { Card } from "../ui/card";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const CommentCard = async ({ postId }: { postId: string }) => {
  const comments = await getComments(postId);
  console.log(comments);
  return (
    <>
      {comments?.map((comment) => (
        <Card
          key={comment.$id}
          className="flex flex-col gap-2 md:gap-4 w-full bg-white bg-opacity-85 p-2 md:px-4 md:py-3 font-sans"
        >
          <div className="flex justify-between items-center gap-2">
            {comment.creator.imageUrl ? (
              <div className="relative md:w-8 md:h-8 w-6 h-6 rounded-full">
                <Image
                  src={comment.creator.imageUrl}
                  alt="logo"
                  fill
                  className="rounded-full"
                />
              </div>
            ) : (
              <Card className="relative md:w-8 md:h-8 w-6 h-6 rounded-full">
                <User2Icon className="w-full h-full" />
              </Card>
            )}

            <div className="flex flex-col gap-1 md:gap-2 flex-grow">
              <h1 className="text-sm md:text-base font-bold">
                {comment.creator.username}
              </h1>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xs md:text-sm text-slate-600">
                {formatDistanceToNow(new Date(comment.$createdAt), {
                  addSuffix: true,
                }).slice(0, 5)}
              </p>
            </div>
          </div>
          <div className="flex flex-col text-start">
            <p className="text-xs md:text-sm text-slate-600">
              {comment.comment}
            </p>
          </div>
        </Card>
      ))}
    </>
  );
};

export default CommentCard;
