"use client";

import { useState, useEffect } from "react";

import { Heart } from "lucide-react"; // Install lucide-react for icons
import {
  checkIfUserLiked,
  getLikesCount,
  toggleLike,
} from "../../../server/postsAction";

const LikeButton = ({ postId, userId }: { postId: string; userId: string }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const count = await getLikesCount(postId);
      setLikes(count);

      // Check if the user has liked the post
      const userLiked = await checkIfUserLiked(postId, userId);
      setLiked(userLiked);
    };

    fetchLikes();
  }, [postId, userId]);

  const handleToggleLike = async () => {
    try {
      const response = await toggleLike(postId, userId);
      setLikes((prev) => (response.liked ? prev + 1 : prev - 1));
      setLiked(response.liked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <button className="flex items-center gap-2 p-2" onClick={handleToggleLike}>
      <Heart
        className={`w-4 h-4 ${
          liked ? "text-red-500 fill-red-500" : "text-gray-500"
        }`}
      />
      <span>{likes}</span>
    </button>
  );
};

export default LikeButton;
