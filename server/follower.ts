"use server"

import { createAdminClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { ID } from "node-appwrite";

export const checkFollowBack = async (userId: string, otherUserId: string) => {
  try {
  const { database } = await createAdminClient();

    const isFollowing = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FOLLOWERS_COLLECTION_ID!,
      [
        Query.equal("followerId", userId),
        Query.equal("followingId", otherUserId),
      ]
    );

    const isFollowedBy = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FOLLOWERS_COLLECTION_ID!,
      [
        Query.equal("followerId", otherUserId),
        Query.equal("followingId", userId),
      ]
    );

    return {
      isFollowing: isFollowing.documents.length > 0,
      isFollowedBy: isFollowedBy.documents.length > 0,
    };
  } catch (error) {
    console.error("Error checking follow back:", error);
    return { isFollowing: false, isFollowedBy: false };
  }
};

export const followUser = async (followerId: string, followingId: string) => {
  if (!followerId || !followingId) {
    throw new Error("Invalid user IDs");
  }

  const { database } = await createAdminClient();
  try {
    const response = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FOLLOWERS_COLLECTION_ID!,
      ID.unique(),
      { followerId, followingId }
    );
    return { status: 200, message: response };
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
};




export const unfollowUser = async (followerId: string, followingId: string) => {
  try {
  const { database } = await createAdminClient();

    // First, get the document ID for this follow relation
    // ship
    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FOLLOWERS_COLLECTION_ID!,
      [
        Query.equal("followerId", followerId),
        Query.equal("followingId", followingId),
      ]
    );

    if (response.documents.length === 0) {
      throw new Error("Follow relationship not found");
    }

    const followId = response.documents[0].$id; // Get the document ID

    // Now, delete the document using the ID
    await database.deleteDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FOLLOWERS_COLLECTION_ID!,
      followId
    );

    return { success: true };
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return { success: false, error };
  }
};



export const isFollowing = async (followerId: string, followingId: string) => {
  try {
    const { database } = await createAdminClient();
    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FOLLOWERS_COLLECTION_ID!,
      [
        Query.equal("followerId", followerId),
        Query.equal("followingId", followingId),
      ]
    );
    
    return response.documents.length > 0 ? response.documents[0].$id : null;
  } catch (error) {
    console.error("Error checking follow status:", error);
    return null;
  }
};

export const getFollowers = async (userId: string) => {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FOLLOWERS_COLLECTION_ID!,
      [Query.equal("followingId", userId)]
    );
    return response.documents.map(doc => ({ id: doc.$id, followerId: doc.followerId }));

  } catch (error) {
    console.error("Error fetching followers:", error);
    return [];
  }
};

export const getFollowing = async (userId: string) => {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FOLLOWERS_COLLECTION_ID!,
      [Query.equal("followerId", userId)]
    );
    return response.documents.map(doc => doc.followingId);
  } catch (error) {
    console.error("Error fetching following users:", error);
    return [];
  }
};


export const getFollowersWithDetails = async (userId: string) => {
  try {
    const { database } = await createAdminClient();

    // Fetch the followers list
    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FOLLOWERS_COLLECTION_ID!,
      [Query.equal("followingId", userId)] // Get users following the given userId
    );

    // Extract follower IDs
    const followerIds = response.documents.map((doc) => doc.followerId);

    // Fetch user details from the Users collection
    const followersDetails = await Promise.all(
      followerIds.map(async (followerId) => {
        return await database.getDocument(
          process.env.APPWRITE_DATABASE_ID!,
          process.env.APPWRITE_USERS_COLLECTION_ID!, // Your Users collection ID
          followerId // Fetch user details using user ID
        );
      })
    );

    return followersDetails; // Return full user details
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw error;
  }
};



export const getFollowCounts = async (userId: string) => {
  const { database } = await createAdminClient();
  try {
    // Fetch followers count (people following me)
    const followersResponse = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FOLLOWERS_COLLECTION_ID!,
      [Query.equal("followingId", userId)] // Where followingId == userId
    );

    // Fetch following count (people I am following)
    const followingResponse = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FOLLOWERS_COLLECTION_ID!,
      [Query.equal("followerId", userId)]  // Where followerId == userId
    );

    return {
      followersCount: followersResponse.total, // Number of people following me
      followingCount: followingResponse.total, // Number of people I am following
    };
  } catch (error) {
    console.error("Error fetching follow counts:", error);
    throw error;
  }
};



