import ChatInput from "@/components/messages/ChatInput";
import ChatMessages from "@/components/messages/ChatMessages";
import FriendTopDetail from "@/components/messages/FriendTopDetail";
import { getLoggedInUser } from "../../../../../server/action";
import { redirect } from "next/navigation";

const MessagePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const user = await getLoggedInUser();
  if (!user) return redirect("/login");
  if (!slug) return redirect("/messages");
  return (
    <div className="flex flex-col gap-10 w-full min-h-full  px-4 md:px-0 py-4 md:py-0 items-center  ">
      <FriendTopDetail slug={slug} />
      <ChatMessages slug={slug} />
      <ChatInput slug={slug} user={user} />
    </div>
  );
};

export default MessagePage;
