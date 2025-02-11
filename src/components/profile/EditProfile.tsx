"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CloudUpload, Edit, Loader } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EditProfileAction } from "../../../server/profileAction";
import { ToastAction } from "../ui/toast";
import { toast } from "@/hooks/use-toast";

export function EditProfile({
  fullName,
  username,
  bio,
  imageId,
  userId,
}: {
  fullName: string;
  username: string;
  bio: string;
  imageId: string;
  userId: string;
}) {
  const [fullNameValue, setFullNameValue] = useState(fullName);
  const [usernameValue, setUsernameValue] = useState(username);
  const [bioValue, setBioValue] = useState(bio);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const [imageUrlValue, setImageUrlValue] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputElement = fileInputRef.current;

    if (!inputElement) {
      console.error("File input element not found.");
      return;
    }

    if (!inputElement.files?.length) {
      console.error("No file selected.");
      return;
    }

    const file = inputElement.files[0];
    console.log("Selected file:", file);

    if (!fullNameValue || !usernameValue || !userId) {
      toast({
        variant: "destructive",
        description: "Please fill in all the required fields.",
        action: <ToastAction altText="Try again">x</ToastAction>,
      });
      return;
    }

    const formData = {
      fullName: fullNameValue,
      username: usernameValue,
      bio: bioValue,
      imageId: imageId,
      file: file,
      userId: userId,
    };
    setIsLoading(true);
    try {
      const response = await EditProfileAction(formData);
      if (response?.success === true) {
        console.log("Profile updated successfully");
        router.refresh();
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-inherit" asChild>
        <Edit className="md:w-6 md:h-6 h-4 w-4 text-slate-600" />
      </DialogTrigger>
      <DialogContent className="w-[90%] md:max-w-md mx-auto rounded-2xl">
        <DialogTitle>Edit Profile</DialogTitle>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="relative flex items-center justify-center gap-2 border-2 py-2 rounded-xl border-dotted">
            <CloudUpload className="md:w-6 md:h-6 h-6 w-6 text-slate-600" />
            <p className="text-xs md:text-sm text-slate-600">
              Upload a profile picture
            </p>
            <input
              type="file"
              accept="image/*"
              id="profile-picture"
              ref={fileInputRef}
              className="absolute top-0 left-0 right-0 bottom-0 opacity-0"
            />
          </div>
          <Input
            value={fullNameValue}
            onChange={(e) => setFullNameValue(e.target.value)}
            placeholder="Name"
            className="w-full"
          />
          <Input
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
            placeholder="Username"
            className="w-full"
          />
          <Textarea
            value={bioValue || ""}
            onChange={(e) => setBioValue(e.target.value)}
            placeholder="Bio"
            className="w-full text-sm"
          />

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
