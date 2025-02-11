import Image from "next/image";
import { Card } from "../ui/card";
import MyPostCard from "./MyPostCard";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa";
import { EditProfile } from "./EditProfile";
import { getLoggedInUser } from "../../../server/action";
import { User2Icon } from "lucide-react";
import { getPostsByUser } from "../../../server/postsAction";
import { getFollowCounts } from "../../../server/follower";
import { redirect } from "next/navigation";

const MyDetails = async () => {
  const user = await getLoggedInUser();
  if (!user) redirect("/login");
  const posts = await getPostsByUser();
  const totalPosts = posts?.length;
  const counts = await getFollowCounts(user.$id);
  return (
    <Card className="flex flex-col gap-7 w-full bg-white bg-opacity-85 px-4 py-4 font-sans h-fit">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <div className="relative">
          {user.imageUrl ? (
            <div className=" h-16 w-16 md:h-24 md:w-24 rounded-full">
              <Image
                src={user.imageUrl}
                alt="logo"
                fill
                className="rounded-full"
              />
            </div>
          ) : (
            <Card className="flex justify-center items-center h-16 w-16 rounded-full font-extrabold text-white bg-slate-800 text-4xl">
              <User2Icon className="w-full h-full" />
            </Card>
          )}
          <div className="flex gap-2 items-center absolute top-2 -right-4">
            <EditProfile
              fullName={user.fullName}
              username={user.username}
              bio={user?.bio}
              imageId={user?.imageId}
              userId={user?.$id}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 md:gap-2 text-center">
          <h1 className="md:text-lg font-bold">
            {user.fullName} {}
          </h1>
          <p className="text-xs md:text-sm text-slate-600 ">({user.email})</p>
          <p className="text-xs md:text-sm text-slate-600 text-center">
            {user.bio}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1 md:gap-2 items-center">
          <FaRegNewspaper className="md:w-6 md:h-6 h-4 w-4 text-slate-800" />
          <p className="text-xs md:text-sm text-slate-600">
            <span className="font-bold text-sm md:text-base">{totalPosts}</span>
            Posts
          </p>
        </div>

        <div className="flex gap-1 md:gap-2 items-center">
          <BsPeopleFill className="md:w-6 md:h-6 h-4 w-4 text-slate-800" />
          <p className="text-xs md:text-sm text-slate-600">
            <span className="font-bold text-sm md:text-base">
              {counts.followersCount}
            </span>
            Followers
          </p>
        </div>
        <div className="flex gap-1 md:gap-2  items-center">
          <BsPeople className="md:w-6 md:h-6 h-4 w-4 text-slate-800" />
          <p className="text-xs md:text-sm text-slate-600">
            <span className="font-bold text-sm md:text-base">
              {counts.followingCount}
            </span>
            Following
          </p>
        </div>
      </div>
      <hr className="border-b-1 border-slate-200 w-full" />
      <MyPostCard />
    </Card>
  );
};

export default MyDetails;
