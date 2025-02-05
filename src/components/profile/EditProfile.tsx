import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CloudUpload, Edit } from "lucide-react";
import { Textarea } from "../ui/textarea";

export function EditProfile() {
  return (
    <Dialog>
      <DialogTrigger className="bg-inherit" asChild>
        <Edit className="md:w-6 md:h-6 h-4 w-4 text-slate-600" />
      </DialogTrigger>
      <DialogContent className="w-[90%] md:max-w-md mx-auto rounded-2xl">
        <DialogTitle>Edit Profile</DialogTitle>
        <form className="flex flex-col gap-4 w-full">
          <div className="relative flex items-center justify-center gap-2 border-2 py-2 rounded-xl border-dotted">
            <CloudUpload className="md:w-6 md:h-6 h-6 w-6 text-slate-600" />
            <p className="text-xs md:text-sm text-slate-600">
              Upload a profile picture
            </p>
            <input
              type="file"
              className="absolute top-0 left-0 right-0 bottom-0 opacity-0"
            />
          </div>
          <Input placeholder="Name" className="w-full" />
          <Input placeholder="Username" className="w-full" />
          <Textarea placeholder="Bio" className="w-full" />
          <Button className="w-full">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
