import FriendsList from "@/components/messages/FriendsList";

const MessagesPage = () => {
  return (
    <div className="flex flex-col gap-10 w-full px-4 md:px-0 py-10 md:py-0">
      <FriendsList />
    </div>
  );
};

export default MessagesPage;
