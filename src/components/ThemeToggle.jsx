import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "../contexts/ThemeContext"; // Use your custom context

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggle from your context

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "dark" ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">
        {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
      </span>
    </Button>
  );
};

export default ThemeToggle;
