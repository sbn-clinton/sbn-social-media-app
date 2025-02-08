import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";
import { getAllUser } from "../../../server/userAction";
import { User2Icon } from "lucide-react";

const FriendsList = async () => {
  const users = await getAllUser();
  return (
    <div className="bg-inherit">
      <Card className="flex flex-col gap-4 p-4 border-slate-300 w-full bg-inherit rounded-b-none">
        <h1 className="md:text-xl font-bold">Chat Other Users</h1>
      </Card>
      <Card className="flex flex-col gap-6 p-4 border-slate-300 w-full bg-inherit rounded-t-none">
        {users?.map((user) => (
          <Link
            key={user.$id}
            href={`/messages/${user.$id}`}
            className="flex flex-row gap-4 items-center"
          >
            {user.imageUrl ? (
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

            <div className="flex flex-col">
              <h1 className="md:text-lg font-bold">{user.username}</h1>
              <p className="text-xs md:text-sm text-slate-500">{user.bio}</p>
            </div>
          </Link>
        ))}
      </Card>
    </div>
  );
};

export default FriendsList;
