import { cn } from "@/lib/utils";
import React from "react";

const Header = () => {
  return (
    <header className={cn("text-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-lg shadow-lg w-auto sm:max-w-xl")}>
      <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
        Convert your image to .webp format
      </h1>
      <p className="text-lg text-blue-200 mt-2">
        Easy and fast conversion with a click of a button!
      </p>
    </header>
  );
};

export default Header;
