"use client";

import { Models } from "node-appwrite";
import { useEffect, useState } from "react";
import {
  checkFollowBack,
  followUser,
  unfollowUser,
} from "../../../server/follower";
import { Button } from "../ui/button";

const FollowButton = ({
  user,
  currentUser,
}: {
  user: Models.Document;
  currentUser: Models.Document;
}) => {
  const [loading, setLoading] = useState(false);
  const [followStatus, setFollowStatus] = useState({
    isFollowing: false,
    isFollowedBy: false,
  });
  const userId = currentUser.$id;
  const otherUserId = user.$id;

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const status = await checkFollowBack(userId, otherUserId);
      setFollowStatus(status);
    };
    fetchFollowStatus();
  }, [userId, otherUserId]);

  const handleFollow = async () => {
    setLoading(true);
    try {
      await followUser(userId, otherUserId);
      setFollowStatus((prev) => ({ ...prev, isFollowing: true }));
    } catch (error) {
      alert("Error following user");
      console.log(error);
    }
    setLoading(false);
  };

  const handleUnfollow = async () => {
    setLoading(true);
    try {
      await unfollowUser(userId, otherUserId);
      setFollowStatus((prev) => ({ ...prev, isFollowing: false }));
    } catch (error) {
      alert("Error unfollowing user");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Button
      size={"sm"}
      disabled={loading}
      onClick={followStatus.isFollowing ? handleUnfollow : handleFollow}
      className={`p-2 rounded-md text-xs text-white ${
        followStatus.isFollowing
          ? "bg-red-500"
          : followStatus.isFollowedBy
          ? "bg-green-500"
          : "bg-blue-500"
      }`}
    >
      {loading
        ? "Loading..."
        : followStatus.isFollowing
        ? "Unfollow"
        : followStatus.isFollowedBy
        ? "Follow Back"
        : "Follow"}
    </Button>
  );
};

export default FollowButton;
