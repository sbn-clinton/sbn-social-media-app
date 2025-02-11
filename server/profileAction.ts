"use server";

import { profileFormType } from "@/lib/types";

import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";


export const EditProfileAction = async (formData: profileFormType) => {
  const { fullName, username, bio, imageId,userId, file } = formData;

  try {
   

   const newImageId = await storeImage(file);

   const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_IMAGES_BUCKET_ID}/files/${newImageId}/view?project=${process.env.APPWRITE_PROJECT_ID}&mode=admin`;

   if (!imageUrl || typeof imageUrl !== "string") {
    
    await deleteImage(newImageId);
    throw new Error("Image upload failed.");
  }

   if (imageUrl) {
     await deleteImage(imageId);
   }
   const { database } = await createAdminClient();

    await database.updateDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USERS_COLLECTION_ID!,
    userId,
    {
      fullName,
      username,
      bio,
      imageId: newImageId,
      imageUrl,
    }
  );

  console.log("User updated successfully:", );
  return { success: true };


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return { success: false, error: error.message };
  }
}

export const storeImage = async (file: File | null) => {
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