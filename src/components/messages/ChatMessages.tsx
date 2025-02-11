import Image from "next/image";
import { Card } from "../ui/card";
import { getLoggedInUser } from "../../../server/action";
import { getMessages } from "../../../server/userAction";
import { redirect } from "next/navigation";

const ChatMessages = async ({ slug }: { slug: string }) => {
  const reciever = slug;
  const user = await getLoggedInUser();
  const sender = user.accountId;

  if (!reciever || !sender) {
    redirect("/messages");
  }

  const messages = await getMessages(reciever, sender);

  return (
    <Card className="flex flex-col gap-4 p-4 border-slate-300 w-full bg-inherit flex-1 border-none shadow-none">
      <div className="flex flex-col h-full w-full gap-5 bg-inherit">
        {messages?.map((message) => {
          const isSender = message.senderId === sender;

          return (
            <div
              key={message.$id}
              className={`flex gap-2 items-start ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {!isSender && (
                <div className="relative w-5 h-5 md:w-10 md:h-10">
                  <Image
                    src={message.sender.imageUrl}
                    alt={message.sender.fullName}
                    fill
                    className="rounded-full"
                  />
                </div>
              )}

              <div
                className={`flex flex-col gap-1 md:gap-2 p-2 md:p-3 ${
                  isSender
                    ? "bg-blue-400 text-slate-200 rounded-xl rounded-b-xl rounded-tr-none"
                    : "bg-slate-200 text-slate-600 rounded-xl rounded-b-xl rounded-s-none"
                } w-fit`}
              >
                <p className="text-sm">{message.message}</p>
                <p className="text-xs md:text-sm text-end opacity-75">
                  {new Date(message.$createdAt).toLocaleTimeString()}
                </p>
              </div>

              {isSender && (
                <div className="relative w-5 h-5 md:w-10 md:h-10">
                  <Image
                    src={message.sender.imageUrl}
                    alt={message.sender.fullName}
                    fill
                    className="rounded-full"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ChatMessages;
