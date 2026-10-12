import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const SeatSelection = () => {
    const { showId } = useParams<{ showId: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get ticket count and price from MovieDetails
    const ticketCount = Math.min(
        10,
        Math.max(1, Number(searchParams.get("count")) || 1)
    );

    const ticketPrice = Math.max(
        0,
        Number(searchParams.get("price")) || 0
    );

    const movieName = searchParams.get("movieName") || "Movie";

    // Cinema layout
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const seatsPerRow = 10;

    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const bookedSeats = useMemo(() => {
        if (!showId) return ["A3"];

        const stored = localStorage.getItem(`booked_seats_${showId}`);
        const savedSeats = stored ? JSON.parse(stored) : [];

        return Array.from(new Set(["A3", ...savedSeats]));
    }, [showId]);

    const totalAmount = selectedSeats.length * ticketPrice;

    const handleSeatClick = (seatId: string) => {
        if (bookedSeats.includes(seatId)) return;

        setSelectedSeats((previousSeats) => {
            if (previousSeats.includes(seatId)) {
                return previousSeats.filter((seat) => seat !== seatId);
            }

            if (previousSeats.length >= ticketCount) {
                return previousSeats;
            }

            return [...previousSeats, seatId];
        });
    };

    const handleContinue = () => {
        if (!showId) {
            alert("Show ID is missing.");
            return;
        }

        if (selectedSeats.length !== ticketCount) {
            alert(`Please select exactly ${ticketCount} seat(s).`);
            return;
        }

        const updatedBookedSeats = [...bookedSeats, ...selectedSeats];

        localStorage.setItem(
            `booked_seats_${showId}`,
            JSON.stringify(updatedBookedSeats)
        );

        navigate("/payment", {
            state: {
                showId,
                movieName,
                selectedSeats,
                ticketCount,
                ticketPrice,
                totalAmount,
            },
        });
    };

    const getSeatClass = (seatId: string) => {
        if (bookedSeats.includes(seatId)) {
            return "border-red-500/60 bg-red-500/20 text-red-400 cursor-not-allowed opacity-70";
        }

        if (selectedSeats.includes(seatId)) {
            return "border-emerald-300 bg-emerald-400 text-black shadow-lg shadow-emerald-500/30 scale-105";
        }

        return "border-white/10 bg-white/[0.04] text-neutral-400 hover:border-emerald-400/60 hover:bg-emerald-400/15 hover:text-emerald-300";
    };

    return (
        <div className="min-h-screen bg-[#080a0b] text-white selection:bg-emerald-500/30">

            {/* Navigation */}
            <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#080a0b]/90 backdrop-blur-2xl">
                <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-3 px-5 sm:px-8">

                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-3 text-sm font-medium text-neutral-400 transition hover:text-white"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg transition group-hover:border-emerald-400/40 group-hover:text-emerald-400">
                            ←
                        </span>

                        <span className="hidden sm:inline">
                            Back
                        </span>
                    </button>

                    <div className="text-right">
                        <h1 className="text-sm font-bold tracking-wide">
                            My<span className="text-emerald-400">Seat</span>
                        </h1>

                        <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                            Seat Selection
                        </p>
                    </div>
                </div>
            </header>

            <main className="relative mx-auto max-w-[1400px] overflow-hidden px-4 py-8 sm:px-8 sm:py-12">

                {/* Background glow */}
                <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-emerald-500/[0.07] blur-3xl" />

                <div className="relative">

                    {/* Page heading */}
                    <section className="mb-8">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-px w-8 bg-emerald-400" />

                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                                Your Cinema Experience
                            </span>
                        </div>

                        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                            <div>
                                <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                                    Select Your <span className="text-emerald-400">Seats</span>
                                </h2>

                                <p className="mt-3 text-sm text-neutral-400">
                                    {movieName}
                                </p>
                            </div>

                            <div className="inline-flex w-fit items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10 text-lg">
                                    🎬
                                </span>

                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                                        Screening ID
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-emerald-400">
                                        {showId || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Ticket summary */}
                    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#151b19] to-[#0d0f10] p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-medium text-neutral-400">
                                    Total Tickets
                                </p>

                                <span className="text-lg">🎟️</span>
                            </div>

                            <p className="mt-4 text-3xl font-black">
                                {ticketCount}
                            </p>

                            <p className="mt-2 text-[11px] text-neutral-500">
                                Maximum 10 seats per booking
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#151b19] to-[#0d0f10] p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-medium text-neutral-400">
                                    Price Per Seat
                                </p>

                                <span className="text-lg">💳</span>
                            </div>

                            <p className="mt-4 text-2xl font-black text-emerald-400">
                                LKR {ticketPrice.toLocaleString()}
                            </p>

                            <p className="mt-2 text-[11px] text-neutral-500">
                                Price for one ticket
                            </p>
                        </div>

                        <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/[0.10] to-[#0d0f10] p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-medium text-neutral-400">
                                    Selected Seats
                                </p>

                                <span className="text-lg">✓</span>
                            </div>

                            <p className="mt-4 text-3xl font-black text-emerald-400">
                                {selectedSeats.length}
                                <span className="text-lg text-neutral-500">
                                    {" "}/ {ticketCount}
                                </span>
                            </p>

                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                                <div
                                    className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                                    style={{
                                        width: `${(selectedSeats.length / ticketCount) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Cinema layout */}
                    <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#131617] to-[#0b0d0e] shadow-2xl shadow-black/20">

                        {/* Cinema heading */}
                        <div className="border-b border-white/[0.07] px-5 py-6 sm:px-8">
                            <h3 className="text-lg font-bold">
                                Cinema Hall
                            </h3>

                            <p className="mt-1 text-xs text-neutral-500">
                                Choose your preferred seats from the layout below.
                            </p>
                        </div>

                        <div className="p-4 sm:p-8 lg:p-10">

                            {/* Screen */}
                            <div className="mx-auto mb-12 max-w-3xl">
                                <div className="relative px-4">
                                    <div className="h-1.5 rounded-full bg-gradient-to-r from-transparent via-emerald-300 to-transparent shadow-[0_5px_25px_rgba(52,211,153,0.35)]" />

                                    <div className="mx-auto h-8 w-[85%] rounded-b-[50%] bg-gradient-to-b from-emerald-400/[0.08] to-transparent" />
                                </div>

                                <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.6em] text-neutral-500">
                                    Cinema Screen
                                </p>
                            </div>

                            {/* Seat legend */}
                            <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">

                                <div className="flex items-center gap-2.5">
                                    <span className="h-4 w-4 rounded-md border border-white/15 bg-white/[0.06]" />

                                    <span className="text-xs text-neutral-400">
                                        Available
                                    </span>
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <span className="h-4 w-4 rounded-md border border-emerald-300 bg-emerald-400" />

                                    <span className="text-xs text-neutral-400">
                                        Selected
                                    </span>
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <span className="h-4 w-4 rounded-md border border-red-500/60 bg-red-500/30" />

                                    <span className="text-xs text-neutral-400">
                                        Booked
                                    </span>
                                </div>
                            </div>

                            {/* Seat map */}
                            <div className="overflow-x-auto pb-5">
                                <div className="mx-auto min-w-[340px] max-w-3xl space-y-3">

                                    {rows.map((row, rowIndex) => (
                                        <div
                                            key={row}
                                            className="flex items-center justify-center gap-1.5 sm:gap-3"
                                        >
                                            <span className="w-5 shrink-0 text-center text-xs font-bold text-emerald-400 sm:w-6">
                                                {row}
                                            </span>

                                            {Array.from(
                                                { length: seatsPerRow },
                                                (_, index) => {
                                                    const seatId = `${row}${index + 1}`;
                                                    const isBooked = bookedSeats.includes(seatId);

                                                    return (
                                                        <button
                                                            key={seatId}
                                                            type="button"
                                                            title={
                                                                isBooked
                                                                    ? `${seatId} - Booked`
                                                                    : `${seatId} - Select seat`
                                                            }
                                                            disabled={isBooked}
                                                            onClick={() => handleSeatClick(seatId)}
                                                            className={`relative h-7 min-w-0 flex-1 max-w-10 rounded-t-lg rounded-b-sm border text-[9px] font-bold transition-all duration-200 sm:h-9 sm:text-xs ${getSeatClass(seatId)}`}
                                                        >
                                                            {index + 1}
                                                        </button>
                                                    );
                                                }
                                            )}

                                            <span className="w-5 shrink-0 text-center text-xs font-bold text-emerald-400 sm:w-6">
                                                {row}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p className="mt-3 text-center text-[10px] text-neutral-600">
                                FRONT ROW A · BACK ROW J
                            </p>

                            {/* Selected seat details */}
                            <div className="mt-10 rounded-2xl border border-white/[0.07] bg-black/20 p-5 sm:p-6">

                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                    <div>
                                        <h3 className="text-sm font-bold">
                                            Your Selected Seats
                                        </h3>

                                        <p className="mt-1 text-xs text-neutral-500">
                                            {selectedSeats.length} of {ticketCount} seats selected
                                        </p>
                                    </div>

                                    <span className={`w-fit rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                                        selectedSeats.length === ticketCount
                                            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                                            : "border-white/10 bg-white/[0.03] text-neutral-400"
                                    }`}>
                                        {selectedSeats.length === ticketCount
                                            ? "Selection Complete"
                                            : "Selection Pending"}
                                    </span>
                                </div>

                                <div className="mt-5 min-h-12">
                                    {selectedSeats.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {selectedSeats.map((seat) => (
                                                <span
                                                    key={seat}
                                                    className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-300"
                                                >
                                                    {seat}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-neutral-600">
                                            No seats selected yet. Choose seats from the cinema layout.
                                        </p>
                                    )}
                                </div>

                                {selectedSeats.length < ticketCount && (
                                    <p className="mt-4 text-xs text-amber-400">
                                        Select {ticketCount - selectedSeats.length} more seat(s) to continue.
                                    </p>
                                )}
                            </div>

                            {/* Booking total */}
                            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#151b19] to-[#0d0f10] p-5 sm:p-7">

                                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                                    <div>
                                        <p className="text-xs text-neutral-500">
                                            Total Booking Amount
                                        </p>

                                        <p className="mt-2 text-3xl font-black tracking-tight text-emerald-400">
                                            LKR {totalAmount.toLocaleString()}
                                        </p>

                                        <p className="mt-2 text-[11px] text-neutral-500">
                                            {selectedSeats.length} selected × LKR {ticketPrice.toLocaleString()}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleContinue}
                                        disabled={selectedSeats.length !== ticketCount}
                                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-400 px-7 py-4 text-sm font-bold text-black transition-all hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-neutral-600 disabled:shadow-none sm:w-auto"
                                    >
                                        Continue to Payment
                                        <span className="text-lg">→</span>
                                    </button>
                                </div>
                            </div>

                            <p className="mt-5 text-center text-[10px] text-neutral-600">
                                MySeat · Your cinema experience starts here.
                            </p>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-8 border-t border-white/[0.07] bg-[#060708]">
                <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-5 py-7 sm:flex-row sm:px-8">
                    <p className="text-sm font-bold">
                        My<span className="text-emerald-400">Seat</span>
                    </p>

                    <p className="text-center text-[11px] text-neutral-600">
                        © 2026 MySeat. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default SeatSelection;