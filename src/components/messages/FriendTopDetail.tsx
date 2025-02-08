import { User2Icon } from "lucide-react";
import BackButton from "../BackButton";
import { Card } from "../ui/card";
import Image from "next/image";
import { getUserbyId } from "../../../server/userAction";

const FriendTopDetail = async ({ slug }: { slug: string }) => {
  const user = await getUserbyId(slug);

  return (
    <Card className="fixed top-1 right-0 left-0 md:hidden  z-50 px-2 bg-inherit border-none shadow-none">
      <Card className="flex flex-row gap-4 items-center w-full py-2 px-1 bg-inherit bg-opacity-10 backdrop-blur-md">
        <div className="flex flex-row items-center gap-2">
          <BackButton />
          {user?.imageUrl ? (
            <div className="relative w-8 h-8 md:w-12 md:h-12 rounded-full">
              <Image
                src={user.imageUrl}
                alt="img"
                fill
                className="rounded-full"
              />
            </div>
          ) : (
            <Card className="relative w-8 h-8 md:w-12 md:h-12">
              <User2Icon className="w-full h-full" />
            </Card>
          )}
        </div>
        <div className="flex flex-1 items-center">
          <h1 className="md:text-lg font-bold">{user?.username}</h1>
        </div>
      </Card>
    </Card>
  );
};

export default FriendTopDetail;
