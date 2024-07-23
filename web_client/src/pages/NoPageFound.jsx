import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const NoPageFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-white">
      <div className="max-w-7xl shadow bg-background rounded-3xl p-10 flex flex-col justify-center items-center">
        <img src="/media/logo.png" alt="Logo" />
        <h1 className="text-4xl font-bold text-white mt-4">
          Oops, page not found!
        </h1>
        <p className="text-white mt-4">
          The page you're looking for doesn't seem to exist. Let's get you back
          on track.
        </p>
        <Button
          className="mt-10 w-64 rounded-lg"
          variant={"outlined"}
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NoPageFound;
