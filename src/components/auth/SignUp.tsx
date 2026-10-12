import { ChangeEvent, useState } from "react";
import { User, UserRole } from "../../models/User";
import AuthService from "../../service/AuthService";
import { useAuth } from "./AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import logo from "../libs/Logo-RM2.png";

export const SignUp = () => {
    const [user, setUser] = useState<User>({
        userId: "",
        name: "",
        email: "",
        password: "",
        role: UserRole.ADMIN
    });

    const handleReset = () => {
        setUser({
            userId: "",
            name: "",
            email: "",
            password: "",
            role: UserRole.ADMIN
        });
    };

    // Get context
    useAuth();
    const navigate = useNavigate();

    // Catch input values
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleOnSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            await AuthService.signUp(user);
            handleReset();
            navigate("/sign-in");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#080a0b] text-white">

            {/* Background image */}
            <div
                className="absolute inset-0 scale-105 bg-cover bg-center opacity-25 blur-sm"
                style={{
                    backgroundImage:
                        "url('https://img.magnific.com/free-photo/movie-background-collage_23-2149876009.jpg?semt=ais_hybrid&w=740&q=80')"
                }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#080a0b]/95 via-[#080a0b]/85 to-emerald-950/40" />

            {/* Emerald glow effects */}
            <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
            <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-[120px]" />

            {/* Main layout */}
            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 py-10 sm:px-8 lg:px-12">

                <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

                    {/* LEFT SIDE - COMPANY LOGO AND BRANDING */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

                        <img
                            src={logo}
                            alt="MySeat Company Logo"
                            className="mb-8 w-40 object-contain drop-shadow-[0_0_25px_rgba(52,211,153,0.2)] sm:w-52 lg:w-60"
                        />

                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                                Your Movie Experience
                            </span>
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            Welcome to
                            <span className="mt-2 block text-emerald-400">
                                MySeat
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-base leading-7 text-gray-400 sm:text-lg">
                            Create your account and get ready to explore movies,
                            discover exciting shows, and enjoy your next cinema
                            experience.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                                <p className="text-sm font-semibold text-white">
                                    Discover
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Amazing movies
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                                <p className="text-sm font-semibold text-white">
                                    Explore
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Upcoming shows
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                                <p className="text-sm font-semibold text-white">
                                    Enjoy
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Cinema moments
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - SIGN UP FORM */}
                    <div className="flex w-full justify-center lg:justify-end">
                        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#101314]/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-9">

                            {/* Form heading */}
                            <div className="mb-8">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                                    Get Started
                                </p>

                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                                    Create Account
                                </h2>

                                <p className="mt-2 text-sm text-gray-400">
                                    Enter your details to register with MySeat.
                                </p>
                            </div>

                            <form className="space-y-5" onSubmit={handleOnSubmit}>

                                {/* User ID */}
                                <div>
                                    <label
                                        htmlFor="user-id"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        User ID
                                    </label>

                                    <input
                                        id="user-id"
                                        name="userId"
                                        type="text"
                                        value={user.userId}
                                        onChange={handleOnChange}
                                        required
                                        placeholder="Enter your user ID"
                                        className="block w-full rounded-xl border border-white/10 bg-[#080a0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                    />
                                </div>

                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={user.name}
                                        onChange={handleOnChange}
                                        required
                                        placeholder="Enter your name"
                                        className="block w-full rounded-xl border border-white/10 bg-[#080a0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={user.email}
                                        onChange={handleOnChange}
                                        required
                                        placeholder="Enter your email"
                                        className="block w-full rounded-xl border border-white/10 bg-[#080a0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Password
                                    </label>

                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={user.password}
                                        onChange={handleOnChange}
                                        required
                                        placeholder="Create a password"
                                        className="block w-full rounded-xl border border-white/10 bg-[#080a0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                    />
                                </div>

                                {/* Role */}
                                <div>
                                    <label
                                        htmlFor="role"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Role
                                    </label>

                                    <input
                                        id="role"
                                        name="role"
                                        type="text"
                                        value={user.role}
                                        onChange={handleOnChange}
                                        required
                                        className="block w-full rounded-xl border border-white/10 bg-[#080a0b] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="space-y-3 pt-2">
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-[#080a0b] shadow-lg shadow-emerald-400/10 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#101314]"
                                    >
                                        Sign Up
                                    </button>

                                    <button
                                        type="reset"
                                        onClick={handleReset}
                                        className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400/30"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>

                            {/* Sign in link */}
                            <p className="mt-7 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
                                Already a member?{" "}
                                <Link
                                    to="/sign-in"
                                    className="font-semibold text-emerald-400 underline-offset-4 transition hover:text-emerald-300 hover:underline"
                                >
                                    Login Here
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};