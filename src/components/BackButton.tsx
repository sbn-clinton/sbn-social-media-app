"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="bg-inherit hover:bg-inherit  rounded-none shadow-none"
    >
      <ChevronLeft className="w-5 h-5 text-slate-900" />
    </button>
  );
};

export default BackButton;
