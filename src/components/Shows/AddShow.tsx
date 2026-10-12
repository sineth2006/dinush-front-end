import { ChangeEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ShowService from "../../service/ShowService";

export const AddShow = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const movieIdFromUrl = searchParams.get("movieId");

    const [show, setShow] = useState({
        showId: "",
        movieId: movieIdFromUrl || "",
        theatreId: "",
        showDate: "",
        showTime: "",
        ticketPrice: "",
        status: "SCHEDULED",
    });

    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setShow((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setShow({
            showId: "",
            movieId: movieIdFromUrl || "",
            theatreId: "",
            showDate: "",
            showTime: "",
            ticketPrice: "",
            status: "SCHEDULED",
        });
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await ShowService.addShow(show);

            alert("Show added successfully!");

            navigate("/movies");
        } catch (error: any) {
            console.error("Error adding show:", error);

            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Response:", error.response.data);
            }

            alert("Failed to add show!");
        }
    };

    const inputClass =
        "mt-2 block w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition duration-200 focus:border-emerald-400/60 focus:bg-emerald-400/[0.04] focus:ring-2 focus:ring-emerald-400/10";

    const labelClass =
        "block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400";

    return (
        <div className="min-h-screen bg-[#080a0b] text-white selection:bg-emerald-500/30">

            {/* Navigation */}
            <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#080a0b]/90 backdrop-blur-2xl">
                <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8">

                    <button
                        type="button"
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
                            Cine<span className="text-emerald-400">Snap</span>
                        </h1>

                        <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                            Screening Management
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative mx-auto max-w-[1000px] overflow-hidden px-5 py-10 sm:px-8 sm:py-14">

                {/* Background Glow */}
                <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-emerald-500/[0.08] blur-3xl" />

                <div className="relative">

                    {/* Page Heading */}
                    <div className="mb-8">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-px w-8 bg-emerald-400" />

                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                                Cinema Administration
                            </span>
                        </div>

                        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                            Add New <span className="text-emerald-400">Show</span>
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400">
                            Create a new screening schedule, set ticket
                            prices, and manage your cinema showtimes.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#151b19] via-[#101313] to-[#0b0d0e] shadow-2xl shadow-black/30">

                        {/* Card Header */}
                        <div className="border-b border-white/[0.07] px-6 py-6 sm:px-9">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] text-2xl">
                                    🎬
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold">
                                        Screening Details
                                    </h3>

                                    <p className="mt-1 text-xs text-neutral-500">
                                        Enter the information below
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleOnSubmit}>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-6 p-6 sm:grid-cols-2 sm:p-9">

                                {/* Show ID */}
                                <div>
                                    <label htmlFor="showId" className={labelClass}>
                                        Show ID *
                                    </label>

                                    <input
                                        id="showId"
                                        name="showId"
                                        type="text"
                                        value={show.showId}
                                        onChange={handleOnChange}
                                        placeholder="e.g. S009"
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                {/* Movie ID */}
                                <div>
                                    <label htmlFor="movieId" className={labelClass}>
                                        Movie ID *
                                    </label>

                                    <input
                                        id="movieId"
                                        name="movieId"
                                        type="text"
                                        value={show.movieId}
                                        onChange={handleOnChange}
                                        placeholder="e.g. M016"
                                        required
                                        className={inputClass}
                                    />

                                    <p className="mt-2 text-[11px] text-neutral-600">
                                        Movie associated with this screening
                                    </p>
                                </div>

                                {/* Theatre ID */}
                                <div>
                                    <label htmlFor="theatreId" className={labelClass}>
                                        Theatre ID *
                                    </label>

                                    <input
                                        id="theatreId"
                                        name="theatreId"
                                        type="text"
                                        value={show.theatreId}
                                        onChange={handleOnChange}
                                        placeholder="e.g. T001"
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                {/* Ticket Price */}
                                <div>
                                    <label htmlFor="ticketPrice" className={labelClass}>
                                        Ticket Price (LKR) *
                                    </label>

                                    <div className="relative">
                                        <span className="absolute left-4 top-[22px] -translate-y-1/2 text-xs font-semibold text-emerald-400">
                                            LKR
                                        </span>

                                        <input
                                            id="ticketPrice"
                                            name="ticketPrice"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={show.ticketPrice}
                                            onChange={handleOnChange}
                                            placeholder="1500.00"
                                            required
                                            className={`${inputClass} pl-14`}
                                        />
                                    </div>
                                </div>

                                {/* Show Date */}
                                <div>
                                    <label htmlFor="showDate" className={labelClass}>
                                        Screening Date *
                                    </label>

                                    <input
                                        id="showDate"
                                        name="showDate"
                                        type="date"
                                        value={show.showDate}
                                        onChange={handleOnChange}
                                        required
                                        className={`${inputClass} [color-scheme:dark]`}
                                    />
                                </div>

                                {/* Show Time */}
                                <div>
                                    <label htmlFor="showTime" className={labelClass}>
                                        Screening Time *
                                    </label>

                                    <input
                                        id="showTime"
                                        name="showTime"
                                        type="text"
                                        value={show.showTime}
                                        onChange={handleOnChange}
                                        placeholder="e.g. 10:30 a.m"
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                {/* Status */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="status" className={labelClass}>
                                        Screening Status
                                    </label>

                                    <select
                                        id="status"
                                        name="status"
                                        value={show.status}
                                        onChange={handleOnChange}
                                        className={`${inputClass} [color-scheme:dark]`}
                                    >
                                        <option value="SCHEDULED">
                                            SCHEDULED
                                        </option>

                                        <option value="CANCELLED">
                                            CANCELLED
                                        </option>

                                        <option value="COMPLETED">
                                            COMPLETED
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] bg-black/10 px-6 py-6 sm:flex-row sm:justify-end sm:px-9">

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                                >
                                    Reset Form
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-emerald-400 px-7 py-3 text-sm font-bold text-black transition hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.99]"
                                >
                                    + Create Show
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Information */}
                    <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                        <span className="text-lg">ⓘ</span>

                        <p className="text-xs leading-6 text-neutral-500">
                            Make sure the Movie ID and Theatre ID match
                            existing records in your database before creating
                            the screening.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-8 border-t border-white/[0.07] bg-[#060708]">
                <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-5 py-7 sm:flex-row sm:px-8">
                    <p className="text-sm font-bold">
                        Cine<span className="text-emerald-400">Snap</span>
                    </p>

                    <p className="text-center text-[11px] text-neutral-600">
                        © 2026 MySeat. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default AddShow;