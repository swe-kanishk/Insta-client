import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import EntrancePage from "./EntrancePage";
import { Loader2 } from "lucide-react";
import Logo from "./Logo";
import { useSelector } from "react-redux";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://insta-backend-flws.onrender.com/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex items-center justify-center">
        <EntrancePage />
        <div className="flex flex-col gap-8">
          <form
            onSubmit={signupHandler}
            className="shadow-md flex flex-col gap-2 px-8 pb-8 pt-4 border-1 rounded border-gray-400 border"
          >
            <div className="py-2">
              <div className="relative w-full left-[30%]">
                <Logo />
              </div>
              <p className="text-sm text-center text-gray-400 font-medium">
                Sign up to see photos and videos from your friends.
              </p>
            </div>
            <div>
              <span className="font-medium">Username</span>
              <Input
                type="text"
                name="username"
                value={input.username}
                onChange={changeEventHandler}
                className="focus-visible:ring-transparent my-2"
              />
            </div>
            <div>
              <span className="font-medium">Email</span>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="focus-visible:ring-transparent my-2"
              />
            </div>
            <div>
              <span className="font-medium">Password</span>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                className="focus-visible:ring-transparent my-2"
              />
            </div>
            {loading ? (
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button type="submit" className="mt-2">
                Signup
              </Button>
            )}
          </form>
          <div className="shadow-md flex gap-1 py-4 px-8 border-1 rounded border-gray-400 border items-center justify-center">
            Have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
