import {Disclosure, DisclosureButton, DisclosurePanel, } from "@headlessui/react";
import {Bars3Icon, XMarkIcon, } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { NavItem } from "../../models/NavItems";
import logo from "../libs/Logo-RM2.png";

const openRoutes: NavItem[] = [
    { name: "SignIn", path: "/sign-in", current: false },
    { name: "SignUp", path: "/sign-up", current: false },
];

const secureRoutes: NavItem[] = [
    { name: "Movies", path: "/movies", current: false },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export function NavBar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleOnLogOut = () => {
        logout();
        navigate("/sign-in", { replace: true });
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        classNames(
            isActive
                ? "bg-emerald-400/10 text-emerald-400"
                : "text-gray-300 hover:bg-white/5 hover:text-white",
            "rounded-lg px-3 py-2 text-sm font-medium transition-colors"
        );

    const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        classNames(
            isActive
                ? "bg-emerald-400/10 text-emerald-400"
                : "text-gray-300 hover:bg-white/5 hover:text-white",
            "block rounded-lg px-3 py-2 text-base font-medium transition-colors"
        );

    const routes = isAuthenticated ? secureRoutes : openRoutes;

    return (
        <Disclosure
            as="nav"
            className="relative bg-[#080a0b] border-b border-white/10"
        >
            {({ close }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">

                            {/* Logo */}
                            <div
                                className="flex shrink-0 cursor-pointer items-center gap-3"
                                onClick={() =>
                                    navigate(
                                        isAuthenticated
                                            ? "/movies"
                                            : "/sign-in"
                                    )
                                }
                            >
                                <img
                                    alt="CineSnap Logo"
                                    src={logo}
                                    className="h-11 w-auto object-contain"
                                />
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden sm:flex sm:items-center sm:gap-2">
                                {routes.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.path}
                                        className={navLinkClass}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>

                            {/* Desktop Logout */}
                            <div className="hidden sm:flex sm:items-center">
                                {isAuthenticated && (
                                    <button
                                        type="button"
                                        onClick={handleOnLogOut}
                                        className="rounded-lg border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                                    >
                                        Logout
                                    </button>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="flex sm:hidden">
                                <DisclosureButton
                                    className="inline-flex items-center justify-center rounded-lg p-2 text-gray-300 transition hover:bg-white/10 hover:text-white focus:outline-none"
                                    aria-label="Toggle navigation menu"
                                >
                                    <Bars3Icon
                                        aria-hidden="true"
                                        className="block size-6 group-data-open:hidden"
                                    />
                                    <XMarkIcon
                                        aria-hidden="true"
                                        className="hidden size-6 group-data-open:block"
                                    />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <DisclosurePanel className="border-t border-white/10 sm:hidden">
                        <div className="space-y-1 px-4 py-3">
                            {routes.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as={NavLink}
                                    to={item.path}
                                    onClick={() => close()}
                                    className={mobileNavLinkClass}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}

                            {isAuthenticated && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        close();
                                        handleOnLogOut();
                                    }}
                                    className="mt-2 block w-full rounded-lg px-3 py-2 text-left text-base font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}