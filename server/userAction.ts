"use server";
import { createAdminClient } from "@/lib/appwrite";
import { getLoggedInUser } from "./action";
import { ID, Query } from "node-appwrite";
import { sendMessageFormType } from "@/lib/types";
import { revalidatePath } from "next/cache";

 


export const getAllUser = async () => {
  try {
    const user = await getLoggedInUser();
    const { database } = await createAdminClient();
    const users = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USERS_COLLECTION_ID!,
      [
        Query.notEqual("accountId", user.$id),
      ]
    );
    if (!users) {
      throw new Error("No users found");
    }
    return users.documents;
  } catch (error) {
    console.log(error);
  }
};
export const getFewUsers = async () => {
  try {
    const user = await getLoggedInUser();
    const { database } = await createAdminClient();
    const users = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USERS_COLLECTION_ID!,
      [
        Query.notEqual("accountId", user.$id),
        Query.orderDesc("$createdAt"),
        Query.limit(3),
      ]
    );
    if (!users) {
      throw new Error("No users found");
    }
    return users.documents;
  } catch (error) {
    console.log(error);
  }
};

export const getUserbyId = async (accountId: string) => {
  try {
    const { database } = await createAdminClient();
    const user = await database.getDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USERS_COLLECTION_ID!,
      accountId
    );
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (formData: sendMessageFormType) => {
  const { message, receiver } = formData;
 
  const user = await getLoggedInUser();
  const sender = user.$id;


  if (!message || !receiver || !sender) {
    return
  }

  try {
    const { database } = await createAdminClient();
    const newMessage = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_MESSAGES_COLLECTION_ID!,
      ID.unique(),
      {
        message,
        receiver,
        sender,
        senderId: sender,
        receiverId: receiver,
      }
    );

    if (!newMessage) {
      throw new Error("Error creating Message");
    }
    revalidatePath("");
    return { success: true, data: newMessage };
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async (receiver: string, sender: string) => {
  try {
    const { database } = await createAdminClient();
    const messages = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_MESSAGES_COLLECTION_ID!,
      [ 
        Query.or([
          Query.and([Query.equal("senderId", sender), Query.equal("receiverId", receiver)]),
          Query.and([Query.equal("senderId", receiver), Query.equal("receiverId", sender)]),
        ]),

        
      ]
    );
    if (!messages) {
      throw new Error("No messages found");
    }
    return messages.documents;
  } catch (error) {
    console.log(error);
  }
};