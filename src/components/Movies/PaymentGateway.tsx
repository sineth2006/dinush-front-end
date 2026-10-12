import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PaymentState {
    showId: string;
    movieName: string;
    selectedSeats: string[];
    ticketCount: number;
    ticketPrice: number;
    totalAmount: number;
}

export const PaymentGateway = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const paymentData = location.state as PaymentState | undefined;

    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [processing, setProcessing] = useState(false);

    if (!paymentData) {
        return (
            <div className="min-h-screen bg-[#080a0b] text-white flex items-center justify-center px-5">
                <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#151b19] to-[#0b0d0e] p-10 text-center shadow-2xl">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/[0.08] text-3xl">
                        !
                    </div>

                    <h2 className="mb-3 text-2xl font-black">
                        Payment Information Missing
                    </h2>

                    <p className="mb-7 text-sm leading-6 text-neutral-400">
                        Your booking information could not be found. Please
                        select your movie and seats again.
                    </p>

                    <button
                        onClick={() => navigate("/movies")}
                        className="rounded-xl bg-emerald-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-emerald-300"
                    >
                        Back to Movies
                    </button>
                </div>
            </div>
        );
    }

    const handleCardNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 16) {
            value = value.substring(0, 16);
        }

        value = value.replace(/(.{4})/g, "$1 ").trim();

        setCardNumber(value);
    };

    const handleExpiryChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 4) {
            value = value.substring(0, 4);
        }

        if (value.length >= 3) {
            value = value.substring(0, 2) + "/" + value.substring(2);
        }

        setExpiryDate(value);
    };

    const handleCvvChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 3) {
            setCvv(value);
        }
    };

    const handlePayment = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (cardNumber.replace(/\s/g, "").length !== 16) {
            alert("Please enter a valid 16-digit card number.");
            return;
        }

        if (!cardName.trim()) {
            alert("Please enter the card holder name.");
            return;
        }

        if (expiryDate.length !== 5) {
            alert("Please enter a valid expiry date.");
            return;
        }

        if (cvv.length !== 3) {
            alert("Please enter a valid CVV.");
            return;
        }

        try {
            setProcessing(true);

            /*
             * Payment API will be connected here.
             *
             * await PaymentService.createPayment({
             *     amount: paymentData.totalAmount,
             *     showId: paymentData.showId,
             *     seats: paymentData.selectedSeats
             * });
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 1500)
            );

            alert("Payment successful!");

            navigate("/booking-confirmation", {
                state: {
                    ...paymentData,
                    paymentStatus: "COMPLETED"
                }
            });
        } catch (error) {
            console.error("Payment failed:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-emerald-400/60 focus:bg-emerald-400/[0.04] focus:ring-2 focus:ring-emerald-400/10";

    const labelClass =
        "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400";

    return (
        <div className="min-h-screen bg-[#080a0b] text-white selection:bg-emerald-500/30">

            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#080a0b]/90 backdrop-blur-2xl">
                <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8">

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
                            My<span className="text-emerald-400">Sheat</span>
                        </h1>

                        <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                            Secure Checkout
                        </p>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="relative mx-auto max-w-[1200px] overflow-hidden px-5 py-8 sm:px-8 sm:py-12">

                {/* Background glow */}
                <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-emerald-500/[0.07] blur-3xl" />

                <div className="relative">

                    {/* Page heading */}
                    <section className="mb-9">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-px w-8 bg-emerald-400" />

                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                                Almost There
                            </span>
                        </div>

                        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                            Complete Your{" "}
                            <span className="text-emerald-400">
                                Payment
                            </span>
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400">
                            Review your booking details and complete the
                            checkout process for your next cinema experience.
                        </p>
                    </section>

                    {/* Checkout layout */}
                    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">

                        {/* Payment Form */}
                        <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#151b19] via-[#101313] to-[#0b0d0e] shadow-2xl shadow-black/20">

                            <div className="border-b border-white/[0.07] px-6 py-6 sm:px-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] text-2xl">
                                        💳
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold">
                                            Payment Details
                                        </h3>

                                        <p className="mt-1 text-xs text-neutral-500">
                                            Enter your card information
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8">

                                {/* Decorative Card */}
                                <div className="relative mb-8 overflow-hidden rounded-2xl border border-emerald-300/20 bg-gradient-to-br from-[#174c3c] via-[#10352c] to-[#091a17] p-6 shadow-lg shadow-emerald-950/30">
                                    <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border border-white/[0.06]" />

                                    <div className="absolute -right-4 -top-8 h-40 w-40 rounded-full border border-white/[0.06]" />

                                    <div className="relative flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-100/80">
                                            MySeat Pay
                                        </span>

                                        <span className="text-2xl">▤</span>
                                    </div>

                                    <div className="relative mt-8">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-100/50">
                                            Card Number
                                        </p>

                                        <p className="mt-3 break-all text-lg font-semibold tracking-[0.12em] text-white sm:text-xl">
                                            {cardNumber || "•••• •••• •••• ••••"}
                                        </p>
                                    </div>

                                    <div className="relative mt-7 flex items-end justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-100/50">
                                                Card Holder
                                            </p>

                                            <p className="mt-1 truncate text-xs font-semibold uppercase tracking-wider text-white">
                                                {cardName || "YOUR NAME"}
                                            </p>
                                        </div>

                                        <div className="shrink-0 text-right">
                                            <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-100/50">
                                                Expires
                                            </p>

                                            <p className="mt-1 text-xs font-semibold text-white">
                                                {expiryDate || "MM/YY"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <form
                                    onSubmit={handlePayment}
                                    className="space-y-5"
                                >

                                    {/* Card Number */}
                                    <div>
                                        <label className={labelClass}>
                                            Card Number
                                        </label>

                                        <input
                                            type="text"
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            placeholder="1234 5678 9012 3456"
                                            className={inputClass}
                                            maxLength={19}
                                        />
                                    </div>

                                    {/* Card Holder */}
                                    <div>
                                        <label className={labelClass}>
                                            Card Holder Name
                                        </label>

                                        <input
                                            type="text"
                                            value={cardName}
                                            onChange={(e) =>
                                                setCardName(e.target.value)
                                            }
                                            placeholder="Name on card"
                                            className={inputClass}
                                        />
                                    </div>

                                    {/* Expiry and CVV */}
                                    <div className="grid grid-cols-2 gap-4">

                                        <div>
                                            <label className={labelClass}>
                                                Expiry Date
                                            </label>

                                            <input
                                                type="text"
                                                value={expiryDate}
                                                onChange={handleExpiryChange}
                                                placeholder="MM/YY"
                                                className={inputClass}
                                                maxLength={5}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass}>
                                                CVV
                                            </label>

                                            <input
                                                type="password"
                                                value={cvv}
                                                onChange={handleCvvChange}
                                                placeholder="•••"
                                                className={inputClass}
                                                maxLength={3}
                                            />
                                        </div>
                                    </div>

                                    {/* Security information */}
                                    <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                                        <span className="text-emerald-400">
                                            🔒
                                        </span>

                                        <p className="text-[11px] leading-5 text-neutral-500">
                                            Payment gateway integration is
                                            not yet connected. This form
                                            currently simulates a payment.
                                        </p>
                                    </div>

                                    {/* Pay Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-400 px-6 py-4 text-sm font-bold text-black transition-all hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-neutral-500 disabled:shadow-none"
                                    >
                                        {processing ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-500/30 border-t-neutral-400" />
                                                Processing Payment...
                                            </>
                                        ) : (
                                            <>
                                                Pay LKR{" "}
                                                {paymentData.totalAmount.toLocaleString()}

                                                <span className="text-lg">
                                                    →
                                                </span>
                                            </>
                                        )}
                                    </button>

                                    <p className="text-center text-[10px] text-neutral-600">
                                        Complete your booking with CineSnap
                                    </p>
                                </form>
                            </div>
                        </section>

                        {/* Booking Summary */}
                        <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#151b19] via-[#101313] to-[#0b0d0e]">

                            <div className="border-b border-white/[0.07] px-6 py-6 sm:px-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] text-2xl">
                                        🎬
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold">
                                            Booking Summary
                                        </h3>

                                        <p className="mt-1 text-xs text-neutral-500">
                                            Review your selected tickets
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8">

                                {/* Movie */}
                                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                                        Your Movie
                                    </p>

                                    <h4 className="mt-3 text-xl font-black leading-snug">
                                        {paymentData.movieName}
                                    </h4>

                                    <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                                        <span>🎟️</span>

                                        <span>
                                            {paymentData.ticketCount}{" "}
                                            {paymentData.ticketCount === 1
                                                ? "ticket"
                                                : "tickets"}
                                        </span>
                                    </div>
                                </div>

                                {/* Show information */}
                                <div className="mt-6 space-y-5">

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-sm text-neutral-500">
                                            Show ID
                                        </span>

                                        <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-neutral-200">
                                            {paymentData.showId}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-sm text-neutral-500">
                                            Number of Tickets
                                        </span>

                                        <span className="text-sm font-semibold">
                                            {paymentData.ticketCount}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="mb-3 text-sm text-neutral-500">
                                            Selected Seats
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {paymentData.selectedSeats.map(
                                                (seat) => (
                                                    <span
                                                        key={seat}
                                                        className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-300"
                                                    >
                                                        {seat}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Price breakdown */}
                                <div className="mt-7 space-y-4 border-t border-white/[0.07] pt-6">

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-sm text-neutral-500">
                                            Price per ticket
                                        </span>

                                        <span className="text-sm font-semibold">
                                            LKR{" "}
                                            {paymentData.ticketPrice.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-sm text-neutral-500">
                                            Tickets subtotal
                                        </span>

                                        <span className="text-sm font-semibold">
                                            LKR{" "}
                                            {(
                                                paymentData.ticketPrice *
                                                paymentData.ticketCount
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="mt-7 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-xs text-neutral-400">
                                                Total Amount
                                            </p>

                                            <p className="mt-1 text-[10px] text-neutral-600">
                                                Payable total
                                            </p>
                                        </div>

                                        <p className="text-xl font-black text-emerald-400 sm:text-2xl">
                                            LKR{" "}
                                            {paymentData.totalAmount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Footer note */}
                                <div className="mt-6 flex items-start gap-3">
                                    <span className="text-emerald-400">
                                        ✓
                                    </span>

                                    <p className="text-[11px] leading-5 text-neutral-500">
                                        Please verify your movie, show ID,
                                        selected seats, and total before
                                        proceeding.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
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

export default PaymentGateway;