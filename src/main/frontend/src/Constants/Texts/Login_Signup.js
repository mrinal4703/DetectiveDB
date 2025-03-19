import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { clicksound } from "../../Resources/Sounds";
import { username } from "./constants";

const Login_Signup = ({ closeModal }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            let basic_game1=0;
            let basic_game2=0;
            let basic_game3=0;
            let basic_tutorial=0;
            let progress =0;
                await axios.post(`http://${username}/newgamer`, { email, password, basic_game1, basic_game2, basic_game3, basic_tutorial, progress});
            setEmail("");
            setPassword("");
            alert("Account created successfully! Please log in.");
            setIsLogin(true);
            closeModal(); // Close modal after successful signup
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Signup failed. Please try again.");
        }
    };

    const handleSignin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://${username}/login`, { email, password });

            console.log(response.data);
            localStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("loggedinuseremail", email);
            sessionStorage.setItem("loggedinuseremail", email);
            window.location.reload();
            setEmail("");
            setPassword("");
            closeModal(); // Close modal after successful login
        } catch (error) {
            console.error("Error logging in:", error);
            if (error.response && error.response.status === 401) {
                if (window.confirm("Wrong email or password. Please try again.")) {
                    setEmail("");
                    setPassword("");
                }
            } else {
                alert("An unexpected error occurred. Please try again later.");
                setEmail("");
                setPassword("");
            }
        }
    };

    // Prevent scrolling when modal is open
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        closeModal();
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={closeModal} // Clicking outside closes modal
        >
            <div
                className="bg-white lg15.6:p-9 p-6 rounded-lg shadow-lg lg15.6:w-[420px] w-96 relative"
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
                <button
                    className="absolute top-4 right-4 text-black lg15.6:text-3xl text-2xl"
                    onClick={handleClick}
                >
                    <IoClose />
                </button>

                <h2 className="lg15.6:text-3xl text-xl font-semibold text-center mb-4">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>
                <p className="text-center lg15.6:text-lg text-base text-gray-600 mb-4">
                    {isLogin ? "Login to your account to continue" : "Create a new account"}
                </p>

                <form onSubmit={isLogin ? handleSignin : handleSignup} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full lg15.6:text-lg text-base p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full lg15.6:text-lg text-base p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="lg15.6:px-5 lg15.6:py-2 px-3 py-1 bg-[#495f67] lg15.6:text-lg text-base text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in w-1/3 mx-auto"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <p className="text-center lg15.6:text-lg text-sm text-gray-600 mt-3">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        className="text-blue-500"
                        onClick={() => {
                            playClickSound();
                            setIsLogin(!isLogin);
                        }}
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </motion.div>
    );
};

export default Login_Signup;
