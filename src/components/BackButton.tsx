"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      size={"icon"}
      variant={"outline"}
      onClick={() => router.back()}
      className=" fixed top-1 left-1 bg-inherit backdrop-blur-sm bg-opacity-25 z-50 md:hidden"
    >
      <ChevronLeft className="w-5 h-5 text-slate-800" />
    </Button>
  );
};

export default BackButton;
