import { SearchIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SearchBar = () => {
  return (
    <Card className="flex gap-1 md:gap-2 w-[70%] items-center mx-auto px-2">
      <Button className="bg-inherit border-0 shadow-none px-0">
        <SearchIcon className="w-4 h-4 md:w-6 md:h-6 text-slate-900" />
      </Button>
      <Input
        placeholder="Search"
        className="w-full border-none focus:outline-none focus:ring-0 text-sm py-2 px-0"
      />
    </Card>
  );
};

export default SearchBar;
