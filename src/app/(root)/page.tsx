import PostCard from "@/components/posts/PostCard";
import PostForm from "@/components/posts/PostForm";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 w-full px-4 md:px-0 py-10 md:py-0">
      <PostForm />
      <PostCard />
    </div>
  );
}
