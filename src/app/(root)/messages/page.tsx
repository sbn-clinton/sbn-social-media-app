import UserCard from "@/components/messages/UserCard";
import { getLoggedInUser } from "../../../../server/action";
import { redirect } from "next/navigation";

const MessagesPage = async () => {
  const user = await getLoggedInUser();
  if (!user) redirect("/login");
  return (
    <div className="flex flex-col gap-10 w-full px-4 md:px-0 py-10 md:py-0">
      <UserCard />
    </div>
  );
};

export default MessagesPage;
