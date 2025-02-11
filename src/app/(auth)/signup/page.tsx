import SignUpForm from "@/components/SignUpForm";
import Image from "next/image";
import { getLoggedInUser } from "../../../../server/action";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const user = await getLoggedInUser();
  if (user) redirect("/");
  return (
    <div className="flex flex-col items-center gap-14 md:gap-y-24  pt-16 bg-[#F5F5F5] w-full h-screen">
      <div className="flex items-center justify-center gap-3">
        <Image src="/images/auth-icons.png" alt="logo" width={20} height={20} />
        <h1 className="text-lg md:text-xl font-bold">SBN</h1>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
