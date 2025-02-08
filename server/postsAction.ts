"use server";

import { createAdminClient } from "@/lib/appwrite";
import { createCommentFormType, createPostFormType, editPostFormType } from "@/lib/types";
import { ID, Query } from "node-appwrite";
import { getLoggedInUser } from "./action";



export const CreatePost = async (formData: createPostFormType) => {
  const { content, file } = formData;

  if (!file) {
    try {

  
  
      const user = await getLoggedInUser();
  
      if (!user) {
        throw new Error("User not found");
      }
  
      const { database } = await createAdminClient();
      const newPost = await database.createDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_POSTS_COLLECTION_ID!,
        ID.unique(),
        {
          content,
          
          creator: user.$id,
        }
      );
  
      if (!newPost) {
        
        throw new Error("Error creating Post");
      }
  
  
      return { success: true, data: newPost };
    } catch (error) {
      console.log(error);
    }

  }

  try {

    const newImageId = await storeImage(file);

   

    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_IMAGES_BUCKET_ID}/files/${newImageId}/view?project=${process.env.APPWRITE_PROJECT_ID}&mode=admin`;

    if (!imageUrl || typeof imageUrl !== "string") {
      console.error("❌ Image upload failed, invalid URL:", imageUrl);
      await deleteImage(newImageId);
      throw new Error("Image upload failed.");
    }

    if (!imageUrl) {
      await deleteImage(newImageId);
    }


    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    const { database } = await createAdminClient();
    const newPost = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_POSTS_COLLECTION_ID!,
      ID.unique(),
      {
        content,
        imageUrl: imageUrl ? imageUrl : null,
        imageId: newImageId,
        creator: user.$id,
      }
    );

    if (!newPost) {
      await deleteImage(newImageId);
      throw new Error("Error creating Post");
    }


    return { success: true, data: newPost };
  } catch (error) {
    console.log(error);
  }
};

export const storeImage = async (file: File | null | undefined) => {
  try {
    const { storage } = await createAdminClient();

    if (!file) {
      console.error("❌ No file selected.");
      return null;
    }

    console.log("📤 Uploading file:", file);

    // Upload file
    const uploadedFile = await storage.createFile(
      process.env.APPWRITE_IMAGES_BUCKET_ID!,
      ID.unique(),
      file
    );

    console.log("✅ File upload response:", uploadedFile);

    // Ensure the response has an $id
    if (!uploadedFile || !uploadedFile.$id) {
      console.error("❌ File upload failed: No file ID returned.");
      return null;
    }

   
    return uploadedFile.$id;
  } catch (error) {
    console.error("❌ Error uploading file:", error);
    return null;
  }
};

export const deleteImage = async (fileId: string | null) => {
  if (!fileId) {
    console.error("❌ No file ID provided.");
    return;
  }
  try {
    const { storage } = await createAdminClient();
     storage.deleteFile(process.env.APPWRITE_IMAGES_BUCKET_ID!, fileId);
    console.log("File deleted successfully:", fileId);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

export const getPosts = async () => {
  try {
    const { database } = await createAdminClient();
    const posts = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_POSTS_COLLECTION_ID!,
      [
        Query.orderDesc("$createdAt"),
      ]
    );
    if (!posts) {
      throw new Error("No posts found");
    }
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};

export const CreateComment = async (formData: createCommentFormType) => {
  const { comment, postId, creator } = formData;

  try {
    const { database } = await createAdminClient();
    const newComment = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_COMMENTS_COLLECTION_ID!,
      ID.unique(),
      {
        comment,
        creator,
        postId,
        
      }
    );

    if (!newComment) {
      throw new Error("Error creating Comment");
    }

    return { success: true, data: newComment };
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (postId: string) => {
  try {
    const { database } = await createAdminClient();
    const comments = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_COMMENTS_COLLECTION_ID!,
      [
        Query.equal("postId", postId),
      ]
    );
    if (!comments) {
      throw new Error("No comments found");
    }
    return comments.documents;
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByUser = async () => {
  try {

    const user = await getLoggedInUser();


    const { database } = await createAdminClient();
    const posts = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_POSTS_COLLECTION_ID!,
      [
        Query.equal("creator", user.$id),
        Query.orderDesc("$createdAt"),
      ]
    );
    if (!posts) {
      throw new Error("No posts found");
    }
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId: string, imageId: string) => {
  try {
    const { database } = await createAdminClient();
    const post = await database.deleteDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_POSTS_COLLECTION_ID!,
      postId
     
    );
    if (!post) {
      throw new Error("Post not found");
    }

    if (post) {
      await deleteImage(imageId);
    }
   
    return { success: true, data: post };
  } catch (error) {
    console.log(error);
  }
};


export const updatePost = async (formData: editPostFormType) => {
  const { content, file, postId, creator, imageId } = formData;

  if (!file) {
    try {
  
      const user = await getLoggedInUser();
  
      if (!user) {
        throw new Error("User not found");
      }
  
      const { database } = await createAdminClient();
      const newPost = await database.updateDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_POSTS_COLLECTION_ID!,
        postId,
        {
          content,
          creator,
          
        }
      );
  
      if (!newPost) {
        
        throw new Error("Error creating Post");
      }
  
  
      return { success: true, data: newPost };
    } catch (error) {
      console.log(error);
    }

  }

  try {

    const newImageId = await storeImage(file);

    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_IMAGES_BUCKET_ID}/files/${newImageId}/view?project=${process.env.APPWRITE_PROJECT_ID}&mode=admin`;

    if (!imageUrl || typeof imageUrl !== "string") {
      console.error("❌ Image upload failed, invalid URL:", imageUrl);
      await deleteImage(newImageId);
      throw new Error("Image upload failed.");
    }

    if (!imageUrl) {
      await deleteImage(newImageId);
    }


    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    const { database } = await createAdminClient();
    const newPost = await database.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_POSTS_COLLECTION_ID!,
      postId,
      {
        content,
        imageUrl,
        imageId: newImageId,
        creator,
      }
    );

    if (!newPost) {
      await deleteImage(newImageId);
      
      throw new Error("Error creating Post");
    }

    if (newPost) {
      await deleteImage(imageId);
    }


    return { success: true, data: newPost };
  } catch (error) {
    console.log(error);
  }
};  