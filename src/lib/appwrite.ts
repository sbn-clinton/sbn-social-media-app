// src/lib/server/appwrite.js
"use server";
import { Client, Account, Databases, Users, Storage, Avatars } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!);

  const session = (await cookies()).get("appwrite-session");
  if (!session || !session.value) {
    return;
  } 
  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}


export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_PROJECT_API_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get storage() {
      return new Storage(client);
    },
    get database() {
      return new Databases(client);
    },
    get users() {
      return new Users(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
}
