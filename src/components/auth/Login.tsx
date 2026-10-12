import { ChangeEvent, useState } from "react";
import { SignIn } from "../../models/SignIn";
import { useAuth } from "./AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../service/AuthService";
import logo from "../libs/Logo-RM2.png";

export const LogIn = () => {
    const [signIn, setSignIn] = useState<SignIn>({
        email: "",
        password: "",
    });

    // Catch Input values
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignIn((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setSignIn({
            email: "",
            password: "",
        });
    };

    // Get context
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleOnSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const token = await AuthService.signIn(signIn);

        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));

            localStorage.setItem("USER_ROLE", payload.roles);
        }

        login(token);
        handleReset();
        navigate("/movies");
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080a0b] px-4 py-10 text-white sm:px-6">

            {/* Background Image */}
            <div
                className="absolute inset-0 scale-105 bg-cover bg-center opacity-30 blur-[3px]"
                style={{
                    backgroundImage:
                        "url('https://img.magnific.com/free-photo/movie-background-collage_23-2149876009.jpg?semt=ais_hybrid&w=740&q=80')",
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#080a0b]/95 via-[#080a0b]/80 to-emerald-950/50" />

            {/* Background Glow */}
            <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[130px]" />
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
        </div>

            {/* Login Card */}
            <div className="relative z-10 mx-auto w-full max-w-md">

                <div className="overflow-hidden rounded-3xl border border-neutral-700/70 bg-[#101314]/95 shadow-2xl shadow-black/50 backdrop-blur-xl">

                    {/* Logo and Heading */}
                    <div className="px-6 pb-6 pt-9 text-center sm:px-9 sm:pt-10">

                        <div className="mx-auto mb-6 flex h-20 items-center justify-center rounded-2xl border border-neutral-800 bg-[#080a0b] px-5">
                            <img
                                alt="MySeat Logo"
                                src={logo}
                                className="max-h-14 w-auto object-contain"
                            />
                        </div>

                        <div className="mb-3 flex items-center justify-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                                Welcome Back
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Login to{" "}
                            <span className="text-emerald-400">MySeat</span>
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-neutral-400">
                            Sign in to continue your movie experience.
                        </p>
                    </div>

                    {/* Login Form */}
                    <div className="px-6 pb-8 sm:px-9 sm:pb-9">

                        <form className="space-y-5" onSubmit={handleOnSubmit}>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-neutral-300"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.7}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                                            />
                                        </svg>
                                    </div>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={signIn.email}
                                        onChange={handleOnChange}
                                        placeholder="Enter your email"
                                        required
                                        className="block w-full rounded-xl border border-neutral-700 bg-[#080a0b] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-neutral-300"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.7}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7 10V7a5 5 0 0110 0v3m-12 0h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z"
                                            />
                                        </svg>
                                    </div>

                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={signIn.password}
                                        onChange={handleOnChange}
                                        placeholder="Enter your password"
                                        required
                                        className="block w-full rounded-xl border border-neutral-700 bg-[#080a0b] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                    />
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3.5 text-sm font-bold text-black shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#101314]"
                            >
                                Login to Your Account

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 12h14m-7-7l7 7-7 7"
                                    />
                                </svg>
                            </button>

                            {/* Reset Button */}
                            <button
                                type="reset"
                                onClick={handleReset}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm font-semibold text-neutral-300 transition hover:border-neutral-500 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 7h16M10 11v6m4-6v6M5 7l1 13h12l1-13M9 7V4h6v3"
                                    />
                                </svg>
                                Reset Form
                            </button>
                        </form>

                        {/* Register Link */}
                        <div className="mt-7 border-t border-neutral-800 pt-6 text-center">
                            <p className="text-sm text-neutral-400">
                                Don't have an account?{" "}
                                <Link
                                    to="/sign-Up"
                                    className="font-semibold text-emerald-400 underline-offset-4 transition hover:text-emerald-300 hover:underline"
                                >
                                    Register Here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-neutral-500">
                    MySeat · Your movie experience, made simple.
                </p>
            </div>
        </div>
    );
};