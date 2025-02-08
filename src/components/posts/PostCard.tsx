import Image from "next/image";
import { Card } from "../ui/card";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { getPosts } from "../../../server/postsAction";
import { User2Icon } from "lucide-react";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import { formatDistanceToNow } from "date-fns";

const PostCard = async () => {
  const posts = await getPosts();

  return (
    <>
      {posts?.map((post) => (
        <Card
          key={post.$id}
          className="flex flex-col gap-4 w-full bg-white bg-opacity-85 px-8 py-4 font-sans h-fit"
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
              <p className="text-xs md:text-sm text-slate-600 text-start break-all">
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
                <AiOutlineLike className="md:w-6 md:h-6 w-4 h-4 text-slate-800" />
                <p className="text-xs md:text-sm text-slate-600">Like</p>
              </div>
            </div>
            <CommentForm postId={post.$id} />
            <CommentCard postId={post.$id} />
          </div>
        </Card>
      ))}
      {/* <Card className="flex flex-col gap-4 w-full bg-white bg-opacity-85 px-8 py-4 font-sans h-fit">
        <div className="flex justify-between items-center gap-2  ">
          <div className="relative md:w-14 md:h-14 w-10 h-10">
            <Image src={"/images/friends1.png"} alt="logo" fill />
          </div>
          <div className="flex flex-col gap-1 md:gap-2 flex-grow">
            <h1 className="md:text-lg font-bold">Jessica Jones</h1>
            <p className="text-xs md:text-sm text-slate-600">
              Graphic Designer
            </p>
          </div>
          <div className="flex flex-col items-end">
            <BsThreeDots />
            <p className="text-xs md:text-sm text-slate-600">3 day ago</p>
          </div>
        </div>
        <hr className="border-b-1 border-slate-200 w-full" />
        <div className="flex flex-col gap-7 md:gap-10">
          <div className="flex- flex-col space-y-4 md:space-y-6 w-full">
            <p className="text-xs md:text-sm text-slate-600 text-start">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              molestie, urna vel ultricies tincidunt, purus nisi aliquam risus,
              id egestas risus nisl eget quam. Donec euismod, nisl eu mollis
              consectetur
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <AiOutlineComment className="md:w-6 md:h-6 w-4 h-4 text-slate-800" />
              <p className="text-xs md:text-sm text-slate-600">Comment</p>
            </div>
            <div className="flex gap-2 items-center">
              <AiOutlineLike className="md:w-6 md:h-6 w-4 h-4 text-slate-800" />
              <p className="text-xs md:text-sm text-slate-600">Like</p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-3">
            <div className="relative w-8 h-8 md:w-14 md:h-14">
              <Image
                src={"/images/sidebar-image.png"}
                alt="logo"
                fill
                className="absolute"
              />
            </div>
            <Input
              placeholder="Share your thoughts here..."
              className="w-full"
            />
          </div>
          <Card className="flex flex-col gap-5 w-full bg-white bg-opacity-85 px-4 py-3 font-sans">
            <div className="flex justify-between items-center gap-2">
              <div className="relative md:w-10 md:h-10 w-8 h-8">
                <Image
                  src={"/images/friends1.png"}
                  alt="logo"
                  fill
                  className="rounded-lg absolute"
                />
              </div>
              <div className="flex flex-col gap-1 md:gap-2 flex-grow">
                <h1 className="text-sm md:text-base font-bold">Daniel Brown</h1>
                <p className="text-xs md:text-sm text-slate-600">
                  Digital Marketer
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xs md:text-sm text-slate-600">1 hours ago</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-start">
              <p className="text-xs md:text-sm text-slate-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                molestie, urna vel ultricies tincidunt, purus nisi aliquam
                risus,👏
              </p>
            </div>
          </Card>
          <Card className="flex flex-col gap-5 w-full bg-white bg-opacity-85 px-4 py-3 font-sans">
            <div className="flex justify-between items-center gap-2">
              <div className="relative md:w-10 md:h-10 w-8 h-8">
                <Image
                  src={"/images/friends2.png"}
                  alt="logo"
                  fill
                  className="rounded-lg absolute"
                />
              </div>
              <div className="flex flex-col gap-1 md:gap-2 flex-grow">
                <h1 className="text-sm md:text-base font-bold">
                  David Martinez
                </h1>
                <p className="text-xs md:text-sm text-slate-600">
                  Backend Developer
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xs md:text-sm text-slate-600">5 hours ago</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-start">
              <p className="text-xs md:text-sm text-slate-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                molestie, urna vel ultricies tincidunt, purus nisi aliquam
                risus,👏
              </p>
            </div>
          </Card>
        </div>
      </Card> */}
    </>
  );
};

export default PostCard;
