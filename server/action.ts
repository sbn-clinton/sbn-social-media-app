"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { signInFormType, signUpFormType } from "@/lib/types";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

export const SignUpWithEmail = async (formData: signUpFormType) => {

  const { email, password, username, fullName} = formData

  const name = fullName

  try {
    const { account, database } = await createAdminClient();
    const newUserAccount = await account.create(ID.unique(), email, password, name);

  if (!newUserAccount) {
    throw new Error("Error creating Account");
    }
   
    const newUser = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USERS_COLLECTION_ID!,
      newUserAccount.$id,
      {
        fullName,
        username,
        email,
        accountId: newUserAccount.$id,
      }
      );
  
      if (!newUser) {
        throw new Error("Error creating User");
      }

      const session = await account.createEmailPasswordSession(email, password);

      (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
    
      return { success: true}
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.log(error);
    return { success: false, error: error.message };
  }
 

}

export const signInWithEmail = async (formData: signInFormType) => {
  const { email, password} = formData;

  try {
    const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);

  (await cookies()).set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  return { success: true}

  } catch (error) {
    console.log(error);
  }
}

export const getLoggedInUser = async () => {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return console.log("No session found");
  try {
    const {database} = await createAdminClient();
    const {account} =   sessionClient
    const user = await account.get();
    const userDoc = await database.getDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USERS_COLLECTION_ID!,
      user.$id
    );
    if (!userDoc) { throw new Error("User not found");}
    return parseStringify(userDoc)
  } catch (error) {
    console.log(error);
  }
   
}

export const signOut = async () => {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return null;
  try {
    const { account } = sessionClient;

  (await cookies()).delete("appwrite-session");
  await account.deleteSession("current");
  return { success: true }
  } catch (error) {
    console.log(error);
  }
};