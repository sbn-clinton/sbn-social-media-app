const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#F5F5F5] font-sans">
      {children}
    </div>
  );
};

export default authLayout;
