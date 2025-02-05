import ButtomBar from "@/components/ButtomBar";
import LeftSideBar from "@/components/LeftSideBar";
import Navbar from "@/components/Navbar";
import RightSideBar from "@/components/RightSideBar";

const rootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-10  bg-[url('/images/grids.png')] w-full  min-h-screen font-sans ">
      <Navbar />
      <div className="flex flex-col gap-5 md:flex-row justify-between md:pt-28 md:px-28 py-8 md:pb-14">
        <LeftSideBar />
        <main className="md:w-[50%] mx-auto">{children}</main>
        <RightSideBar />
      </div>
      <ButtomBar />
    </div>
  );
};

export default rootLayout;
