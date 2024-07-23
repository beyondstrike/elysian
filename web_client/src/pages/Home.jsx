import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";

const Home = () => {
  const { logout } = useUser();
  return (
    <div className="h-screen w-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background py-2 text-white">
        <Link href="/" className="flex items-center justify-center">
          <img
            src="/media/logo.png"
            alt="logo"
            className="h-8 w-8 object-contain"
          />
          <span className="sr-only">Elysian</span>
        </Link>
        <nav className="ml-auto flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            Services
          </Link>
          <Button
            variant={"outlined"}
            className={"w-auto rounded text-sm py-1 px-3"}
            onClick={logout}
          >
            Log out
          </Button>
        </nav>
      </header>
    </div>
  );
};

export default Home;
