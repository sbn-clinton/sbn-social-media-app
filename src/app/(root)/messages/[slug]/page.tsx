import BackButton from "@/components/BackButton";
import ChatInput from "@/components/messages/ChatInput";
import ChatMessages from "@/components/messages/ChatMessages";

const MessagePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  return (
    <div className="flex flex-col gap-10 w-full min-h-full  px-4 md:px-0 py-4 md:py-0 items-center  ">
      <BackButton />
      <ChatMessages slug={slug} />
      <ChatInput />
    </div>
  );
};

export default MessagePage;
