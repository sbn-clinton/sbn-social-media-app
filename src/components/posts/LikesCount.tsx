import { getLikesCount } from "../../../server/postsAction";

const LikesCount = async ({ postId }: { postId: string }) => {
  const likes = await getLikesCount(postId);
  return <span className="text-xs text-gray-500">{likes}</span>;
};

export default LikesCount;
