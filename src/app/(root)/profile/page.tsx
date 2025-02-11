import MyDetails from "@/components/profile/MyDetails";
import { getLoggedInUser } from "../../../../server/action";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await getLoggedInUser();
  if (!user) redirect("/login");
  return (
    <div className="flex flex-col gap-10 w-full px-4 md:px-0 py-12 md:py-0">
      <MyDetails />
    </div>
  );
};

export default ProfilePage;
