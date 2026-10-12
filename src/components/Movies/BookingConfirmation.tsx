import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

interface BookingState {
    showId: string;
    movieName: string;
    selectedSeats: string[];
    ticketCount: number;
    ticketPrice: number;
    totalAmount: number;
    paymentStatus: string;
}

interface PastBooking {
    id: string;
    movieName: string;
    seats: string[];
    date: string;
    amount: number;
}

export const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { isAuthenticated, user } = useAuth();
    const bookingData = location.state as BookingState | undefined;

    const [isCancelling, setIsCancelling] = useState(false);

    const [otherBookings, setOtherBookings] = useState<PastBooking[]>([
        {
            id: "B-9982",
            movieName: "Inception",
            seats: ["C4", "C5"],
            date: "Oct 12, 2026",
            amount: 24.00
        },
        {
            id: "B-4410",
            movieName: "The Dark Knight",
            seats: ["F12"],
            date: "Oct 18, 2026",
            amount: 12.00
        }
    ]);

    useEffect(() => {
        setOtherBookings((prev) => [...prev]);
    }, []);

    if (!isAuthenticated || !user) {
        return (
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080a0b] px-4 text-white">
                <div className="pointer-events-none absolute -top-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />

                <div className="relative w-full max-w-md rounded-3xl border border-neutral-800 bg-[#101314] p-8 text-center shadow-2xl">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.7}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5m5 5H3"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold">
                        Login Required
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-neutral-400">
                        Please log in to view your booking summaries and
                        account information.
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                        className="mt-7 w-full rounded-xl bg-emerald-400 px-5 py-3 font-bold text-black transition hover:bg-emerald-300"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    if (!bookingData) {
        return (
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080a0b] px-4 text-white">
                <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />

                <div className="relative w-full max-w-md rounded-3xl border border-neutral-800 bg-[#101314] p-8 text-center shadow-2xl">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.7}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3m0 4h.01M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold">
                        No Booking Found
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-neutral-400">
                        We couldn't find booking information for this page.
                        Choose a movie to start a new booking.
                    </p>

                    <button
                        onClick={() => navigate("/movies")}
                        className="mt-7 w-full rounded-xl bg-emerald-400 px-5 py-3 font-bold text-black transition hover:bg-emerald-300"
                    >
                        Browse Movies
                    </button>
                </div>
            </div>
        );
    }

    const handleCancelBooking = async () => {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking? A refund will be processed automatically."
        );

        if (confirmCancel) {
            try {
                setIsCancelling(true);

                await new Promise((resolve) => setTimeout(resolve, 1500));

                alert("Your booking has been successfully cancelled and refunded.");

                navigate("/movies");
            } catch (error) {
                console.error("Cancellation failed:", error);
                alert("Something went wrong. Please try again.");
            } finally {
                setIsCancelling(false);
            }
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#080a0b] px-4 py-8 text-white sm:px-6 lg:px-8">

            {/* Background Effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-700/10 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-6xl space-y-7">

                {/* Page Heading */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                                MySeat
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Your Booking{" "}
                            <span className="text-emerald-400">Dashboard</span>
                        </h1>

                        <p className="mt-3 text-sm text-neutral-400 sm:text-base">
                            Manage your bookings and view your movie ticket details.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/movies")}
                        className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-neutral-700 bg-[#101314] px-4 py-3 text-sm font-semibold text-neutral-300 transition hover:border-emerald-400/50 hover:text-emerald-400 sm:self-auto"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Browse Movies
                    </button>
                </div>

                {/* User Profile */}
                <header className="flex flex-col gap-5 rounded-2xl border border-neutral-800 bg-[#101314]/95 p-5 shadow-xl sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-xl font-bold text-emerald-400">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                                Account Profile
                            </span>
                            <h2 className="mt-1 truncate text-xl font-bold text-white sm:text-2xl">
                                {user.name}
                            </h2>
                            <p className="mt-1 break-all text-sm text-neutral-400">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 self-start rounded-xl border border-neutral-700 bg-[#080a0b] px-4 py-3 sm:self-center">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
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
                                    d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3z"
                                />
                            </svg>
                        </span>

                        <div>
                            <p className="text-xs text-neutral-500">
                                Membership
                            </p>
                            <p className="mt-0.5 text-sm font-bold text-emerald-400">
                                {user.membership || "Standard"}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

                    {/* Main Booking */}
                    <div className="space-y-6 lg:col-span-2">

                        {/* Confirmation Banner */}
                        <section className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#101614] p-6 text-center sm:p-8">
                            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

                            <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.12)]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            <span className="relative inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Payment Successful
                            </span>

                            <h2 className="relative mt-4 text-2xl font-bold sm:text-3xl">
                                Booking Confirmed!
                            </h2>

                            <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-400">
                                Your booking summary is ready. Keep your ticket
                                details available for your upcoming movie.
                            </p>
                        </section>

                        {/* Ticket Details */}
                        <section className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#101314]/95 shadow-xl">

                            <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-5 sm:px-7">
                                <div>
                                    <h3 className="text-lg font-bold">
                                        Booking Details
                                    </h3>
                                    <p className="mt-1 text-xs text-neutral-500">
                                        Your current movie reservation
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.7}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 3v4m8-4v4M4 11h16"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-6 p-5 sm:p-7">

                                {/* Movie Name */}
                                <div className="rounded-xl border border-neutral-800 bg-[#080a0b] p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                        Movie
                                    </p>
                                    <h3 className="mt-2 break-words text-2xl font-bold text-emerald-400 sm:text-3xl">
                                        {bookingData.movieName}
                                    </h3>
                                    <p className="mt-2 text-sm text-neutral-400">
                                        Show ID:{" "}
                                        <span className="font-medium text-neutral-200">
                                            {bookingData.showId}
                                        </span>
                                    </p>
                                </div>

                                {/* Seats */}
                                <div>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                        Selected Seats
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {bookingData.selectedSeats.map((seat) => (
                                            <span
                                                key={seat}
                                                className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300"
                                            >
                                                {seat}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Booking Stats */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    <div className="rounded-xl border border-neutral-800 bg-[#080a0b] p-4">
                                        <p className="text-xs text-neutral-500">
                                            Tickets
                                        </p>
                                        <p className="mt-2 text-xl font-bold text-white">
                                            {bookingData.ticketCount}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-neutral-800 bg-[#080a0b] p-4">
                                        <p className="text-xs text-neutral-500">
                                            Price Per Ticket
                                        </p>
                                        <p className="mt-2 text-xl font-bold text-white">
                                            LKR {bookingData.ticketPrice.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                                        <p className="text-xs text-neutral-400">
                                            Payment Status
                                        </p>
                                        <p className="mt-2 break-words text-sm font-bold text-emerald-400">
                                            {bookingData.paymentStatus}
                                        </p>
                                    </div>
                                </div>

                                {/* Total Amount */}
                                <div className="flex flex-col gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-300">
                                            Total Amount Paid
                                        </p>
                                        <p className="mt-1 text-xs text-neutral-500">
                                            For {bookingData.ticketCount} ticket(s)
                                        </p>
                                    </div>

                                    <p className="text-3xl font-bold text-emerald-400">
                                        LKR {bookingData.totalAmount.toFixed(2)}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-3 border-t border-neutral-800 pt-6 sm:flex-row">
                                    <button
                                        onClick={() => navigate("/movies")}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-emerald-300"
                                    >
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
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        Book More Movies
                                    </button>

                                    <button
                                        onClick={handleCancelBooking}
                                        disabled={isCancelling}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-5 py-3.5 text-sm font-semibold text-red-400 transition hover:border-red-500 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isCancelling ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400" />
                                                Processing Cancellation...
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={1.8}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                                Cancel This Booking
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Other Bookings Sidebar */}
                    <aside className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#101314]/95 shadow-xl">

                        <div className="border-b border-neutral-800 px-5 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.7}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 4h16v16H4zM8 4v4m8-4v4M4 10h16"
                                        />
                                    </svg>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="font-bold">
                                        Other Bookings
                                    </h3>
                                    <p className="mt-1 text-xs text-neutral-500">
                                        Your movie history
                                    </p>
                                </div>

                                <span className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-2 text-sm font-bold text-emerald-400">
                                    {otherBookings.length}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 p-4">
                            {otherBookings.length === 0 ? (
                                <div className="py-8 text-center">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 text-neutral-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.7}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-neutral-400">
                                        No other upcoming movie bookings.
                                    </p>
                                </div>
                            ) : (
                                otherBookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="rounded-xl border border-neutral-800 bg-[#080a0b] p-4 transition hover:border-emerald-400/30"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <h4 className="min-w-0 break-words text-sm font-bold text-white">
                                                {booking.movieName}
                                            </h4>

                                            <span className="shrink-0 rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1 text-[10px] font-semibold text-neutral-400">
                                                {booking.id}
                                            </span>
                                        </div>

                                        <div className="mt-4 space-y-3 border-t border-neutral-800 pt-3">
                                            <div>
                                                <p className="text-xs text-neutral-500">
                                                    Seats
                                                </p>
                                                <div className="mt-2 flex flex-wrap gap-1.5">
                                                    {booking.seats.map((seat) => (
                                                        <span
                                                            key={seat}
                                                            className="rounded-md bg-neutral-800 px-2 py-1 text-xs font-semibold text-neutral-300"
                                                        >
                                                            {seat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-2">
                                                <div>
                                                    <p className="text-xs text-neutral-500">
                                                        Booking Date
                                                    </p>
                                                    <p className="mt-1 text-xs font-medium text-neutral-300">
                                                        {booking.date}
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-xs text-neutral-500">
                                                        Amount
                                                    </p>
                                                    <p className="mt-1 text-sm font-bold text-emerald-400">
                                                        LKR {booking.amount.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="border-t border-neutral-800 px-5 py-4">
                            <p className="text-xs leading-5 text-neutral-500">
                                Your previous booking records are displayed here.
                            </p>
                        </div>
                    </aside>
                </div>

                {/* Footer */}
                <footer className="border-t border-neutral-800 pt-5 text-center">
                    <p className="text-xs text-neutral-600">
                        MySeat · Your movie experience, made simple.
                    </p>
                </footer>
            </div>
        </div>
    );
};