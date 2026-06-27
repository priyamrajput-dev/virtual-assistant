import bg from "../assets/authBg.jpg";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";
import axios from "axios";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(userDataContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true },
      );
      console.log(result.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <form
        onSubmit={handleSignUp}
        className="
          w-[90%]
          max-w-125
          h-150
          bg-black/40
          backdrop-blur
          shadow-2xl
          rounded-2xl
          px-8
          flex
          flex-col
          justify-center
          gap-6
        "
      >
        <h1 className="text-white text-3xl font-semibold text-center mb-6">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter your Name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="
            w-full
            border-2
            border-white
            bg-transparent
            text-white
            placeholder:text-gray-300
            rounded-full
            px-6
            py-3
            text-lg
            outline-none
          "
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="
            w-full
            border-2
            border-white
            bg-transparent
            text-white
            placeholder:text-gray-300
            rounded-full
            px-6
            py-3
            text-lg
            outline-none
          "
        />

        {/* Password */}
        <div
          className="
            w-full
            border-2
            border-white
            rounded-full
            bg-transparent
            flex
            items-center
            px-6
          "
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="
              flex-1
              py-3
              bg-transparent
              text-white
              placeholder:text-gray-300
              outline-none
              text-lg
            "
          />
          {!showPassword && (
            <IoEye
              className="text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <IoEyeOff
              className="text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>
        {error.length > 0 && <p className="text-red-500">*{error}</p>}
        <button
          className="
            w-full
            bg-blue-500
            hover:bg-blue-600
            transition
            text-white
            font-semibold
            rounded-full
            py-3
            text-lg
            mt-4
          "
        >
          {loading ? "loading..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-300 cursor-pointer">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}
