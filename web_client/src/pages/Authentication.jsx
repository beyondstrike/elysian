import React, { useState } from "react";
import TextField from "../components/TextField";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";

const Authentication = ({ isRegister }) => {
  const { register, login } = useUser();

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const message = isRegister
        ? await register(displayName, email, password)
        : await login(email, password);
      toast.success(message);
      navigate("/");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background py-20">
      <div className="w-full max-w-7xl rounded-3xl shadow-xl grid md:grid-cols-2 bg-white overflow-hidden h-full">
        <div className="hidden md:flex flex-col items-center justify-center text-white bg-primary px-8 py-16 relative">
          <img
            className="absolute left-8 top-8 h-10 object-contain"
            src="/media/logo.png"
            alt="logo"
          />
          <img
            className="w-80 object-contain"
            src="/media/illustration.png"
            alt="illustration"
          />
          <h1 className="font-semibold text-2xl">Welcome aboard my friend</h1>
          <span className="text-sm font-normal">
            just a couple of clicks and we start
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-primary pb-10">
            {isRegister ? "Register" : "Login"}
          </h2>
          <form onSubmit={onSubmit} className="w-full max-w-sm mt-8">
            <div className="flex flex-col space-y-10">
              <div className="flex flex-col space-y-4">
                {isRegister && (
                  <TextField
                    type="text"
                    placeholder="Display Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    icon={
                      <PermIdentityOutlinedIcon className="absolute left-2 top-2 text-gray-500" />
                    }
                    required
                  />
                )}
                <TextField
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={
                    <EmailOutlinedIcon className="absolute left-2 top-2 text-gray-500" />
                  }
                  required
                />
                <TextField
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={
                    <LockOutlinedIcon className="absolute left-2 top-2 text-gray-500" />
                  }
                  required
                />
                {!isRegister && (
                  <Button
                    disabled={loading}
                    type="button"
                    variant="text"
                    className={"self-start text-sm ml-auto"}
                  >
                    Forgot password?
                  </Button>
                )}
              </div>
              <Button disabled={loading} type="submit">
                {loading ? "Loading..." : isRegister ? "Register" : "Login"}
              </Button>
            </div>
            <div className="flex items-center gap-2 w-2/3 mx-auto text-center py-2 text-sm">
              <div className="flex-1 bg-[#E6E9FA] h-[1px]" />
              Or
              <div className="flex-1 bg-[#E6E9FA] h-[1px]" />
            </div>
            <div className="flex items-center gap-4">
              <Button
                disabled={loading}
                className={"flex-1 flex items-center justify-center gap-2"}
                variant="outlined"
                type="button"
              >
                <img className="h-6 w-6" src="/media/google.png" alt="google" />
                Google
              </Button>
              <Button
                disabled={loading}
                className={"flex-1 flex items-center justify-center gap-2"}
                variant="outlined"
                type="button"
              >
                <img
                  className="h-6 w-6"
                  src="/media/facebook.png"
                  alt="facebook"
                />
                Facebook
              </Button>
            </div>
            <h3 className="py-4 text-center font-semibold text-sm">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </h3>
            <Button
              disabled={loading}
              onClick={() => navigate(isRegister ? "/login" : "/register")}
              variant="outlined"
              type="button"
            >
              {isRegister ? "Login" : "Register"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
