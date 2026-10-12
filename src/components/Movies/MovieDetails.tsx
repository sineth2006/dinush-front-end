import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieService from "../../service/MovieService";
import { Movie } from "../../models/Movie";
import { Show } from "../../models/Show";
import ShowService from "../../service/ShowService";

export const MovieDetails = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();

    const [allShows, setAllShows] = useState<Show[]>([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ticketCount, setTicketCount] = useState(1);
    const [selectedShow, setSelectedShow] = useState<Show | null>(null);

    const userRole = localStorage.getItem("USER_ROLE");

    const todayStr = (() => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;
        return new Date(now.getTime() - offset)
            .toISOString()
            .split("T")[0];
    })();

    useEffect(() => {
        const loadMovieAndShows = async () => {
            try {
                setLoading(true);
                setError("");

                const movieResponse =
                    await MovieService.getMovieById(movieId!);

                setMovie(movieResponse.data);

                try {
                    const showsResponse =
                        await ShowService.getShowsByMovieId(movieId!);

                    const targetedShows: Show[] = showsResponse.data;
                    setAllShows(targetedShows);

                    const upcomingDates = Array.from(
                        new Set(
                            targetedShows
                                .map((show) => show.showDate)
                                .filter((date) => date >= todayStr)
                        )
                    ).sort();

                    if (upcomingDates.length > 0) {
                        setSelectedDate(upcomingDates[0]);
                    } else {
                        setSelectedDate("");
                    }
                } catch (showError) {
                    console.error("Failed to load shows:", showError);
                    setAllShows([]);
                    setSelectedDate("");
                }
            } catch (error) {
                console.error("Failed to load movie:", error);
                setError("Failed to load movie information.");
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            loadMovieAndShows();
        }
    }, [movieId]);

    const uniqueDates = Array.from(
        new Set(
            allShows
                .filter((show) => show.showDate >= todayStr)
                .map((show) => show.showDate)
        )
    ).sort();

    const showsForSelectedDate = allShows.filter(
        (show) =>
            show.showDate === selectedDate &&
            show.showDate >= todayStr
    );

    const groupedByTheatre = showsForSelectedDate.reduce(
        (acc, currentShow) => {
            const key =
                currentShow.theatreName ||
                currentShow.theatreId ||
                "Unknown Theatre";

            if (!acc[key]) {
                acc[key] = {
                    theatreName:
                        currentShow.theatreName ||
                        `Theatre (${currentShow.theatreId})`,
                    location:
                        currentShow.location || "Location unavailable",
                    times: [] as Show[],
                };
            }

            acc[key].times.push(currentShow);
            return acc;
        },
        {} as Record<
            string,
            {
                theatreName: string;
                location: string;
                times: Show[];
            }
        >
    );

    const handleDelete = async () => {
        if (!movie) return;

        const confirmed = window.confirm(
            `Are you sure you want to delete "${movie.title}"?`
        );

        if (!confirmed) return;

        try {
            await MovieService.deleteMovie(movie.movieId);
            alert("Movie deleted successfully!");
            navigate("/movies");
        } catch (error) {
            console.error("Failed to delete movie:", error);
            alert("Failed to delete movie.");
        }
    };

    const handleUpdate = () => {
        if (movieId) {
            navigate(`/movies/edit/${movieId}`);
        }
    };

    const handleAddShow = () => {
        if (movieId) {
            navigate(`/shows/add?movieId=${movieId}`);
        }
    };

    const handleConfirmTickets = () => {
        if (!selectedShow || !movie) return;

        setIsModalOpen(false);

        navigate(
            `/seats/${selectedShow.showId}?count=${ticketCount}&price=${selectedShow.ticketPrice}&movieName=${encodeURIComponent(movie.title)}`
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#080a0b] text-white flex flex-col items-center justify-center gap-5">
                <div className="h-12 w-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                    Loading cinematic experience
                </p>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-[#080a0b] text-white flex items-center justify-center px-5">
                <div className="text-center rounded-3xl border border-white/10 bg-white/[0.03] p-10 max-w-md w-full">
                    <div className="text-4xl mb-4">🎬</div>
                    <h2 className="text-2xl font-bold mb-3">
                        Movie unavailable
                    </h2>
                    <p className="text-sm text-neutral-400 mb-6">
                        {error || "We couldn't find this movie."}
                    </p>
                    <button
                        onClick={() => navigate("/movies")}
                        className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-emerald-300"
                    >
                        Back to Movies
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080a0b] text-white selection:bg-emerald-500/30">

            {/* Navigation */}
            <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#080a0b]/90 backdrop-blur-2xl">
                <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
                    <button
                        onClick={() => navigate("/movies")}
                        className="group flex items-center gap-3 text-sm font-medium text-neutral-400 transition hover:text-white"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg transition group-hover:border-emerald-400/40 group-hover:text-emerald-400">
                            ←
                        </span>
                        <span className="hidden sm:inline">Back to Movies</span>
                        <span className="sm:hidden">Back</span>
                    </button>

                    <div className="text-right">
                        <h1 className="text-sm font-bold tracking-wide">
                            My<span className="text-emerald-400">Seat</span>
                        </h1>
                        <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                            Movie Details
                        </p>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-12">

                {/* Movie Hero */}
                <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#151b19] via-[#101313] to-[#0b0d0e]">
                    <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-emerald-500/[0.09] blur-3xl" />

                    <div className="relative flex flex-col md:flex-row">
                        {/* Movie Poster */}
                        <div className="relative mx-auto w-full max-w-[340px] shrink-0 p-5 sm:p-7 md:mx-0 md:w-[36%] md:max-w-none">
                            <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#1b1f20] shadow-2xl shadow-black/50">
                                <img
                                    src={movie.image_url}
                                    alt={movie.title}
                                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                                />
                            </div>

                            <div className="absolute left-8 top-8 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md md:left-10 md:top-10">
                                {movie.status?.replace(/_/g, " ")}
                            </div>
                        </div>

                        {/* Movie Information */}
                        <div className="relative flex flex-1 flex-col justify-center p-6 pt-2 sm:p-9 md:p-12">
                            <div className="mb-5 flex items-center gap-2">
                                <span className="h-px w-8 bg-emerald-400" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                                    Featured Movie
                                </span>
                            </div>

                            <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                                {movie.title}
                            </h2>

                            <div className="mt-5 flex flex-wrap items-center gap-2">
                                <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-neutral-300">
                                    {movie.language}
                                </span>
                                <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-neutral-300">
                                    {movie.genre}
                                </span>
                                <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-neutral-300">
                                    {movie.duration}
                                </span>
                            </div>

                            <div className="mt-8 max-w-2xl">
                                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                                    About this movie
                                </h3>
                                <p className="text-sm leading-7 text-neutral-300 sm:text-base">
                                    {movie.description || "No description available for this movie."}
                                </p>
                            </div>

                            {/* Actions */}
                            {userRole !== "ROLE_CUSTOMER" && (
                                <div className="mt-8 flex flex-wrap gap-3">
                                    <button
                                        onClick={handleUpdate}
                                        className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-400/30 hover:bg-white/10"
                                    >
                                        ✎ Update Movie
                                    </button>

                                    <button
                                        onClick={handleDelete}
                                        className="rounded-xl border border-red-500/20 bg-red-500/[0.06] px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/15"
                                    >
                                        Delete Movie
                                    </button>

                                    <button
                                        onClick={handleAddShow}
                                        className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20"
                                    >
                                        + Add Show
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Screening Section */}
                <section className="mt-10">
                    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                                Find your session
                            </p>
                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                Available Shows
                            </h2>
                            <p className="mt-2 text-sm text-neutral-500">
                                Choose a date, theatre, and showtime.
                            </p>
                        </div>

                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-neutral-400">
                            {showsForSelectedDate.length} sessions
                        </span>
                    </div>

                    {/* Date Selector */}
                    <div className="mb-8 flex gap-3 overflow-x-auto pb-3">
                        {uniqueDates.map((dateStr) => {
                            // Parse YYYY-MM-DD locally to avoid UTC date shifts.
                            const [year, month, day] = dateStr
                                .split("-")
                                .map(Number);

                            const dateObj = new Date(year, month - 1, day);

                            const dayName = dateObj.toLocaleDateString(
                                "en-US",
                                { weekday: "short" }
                            );

                            const displayDate = dateObj.toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                            );

                            const active = selectedDate === dateStr;

                            return (
                                <button
                                    key={dateStr}
                                    onClick={() => setSelectedDate(dateStr)}
                                    className={`flex min-w-[100px] shrink-0 flex-col items-center rounded-2xl border px-5 py-4 transition-all duration-200 ${
                                        active
                                            ? "border-emerald-400 bg-emerald-400 text-black shadow-lg shadow-emerald-500/10"
                                            : "border-white/[0.08] bg-white/[0.025] text-neutral-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                                    }`}
                                >
                                    <span className="text-xs font-medium">
                                        {dayName}
                                    </span>
                                    <span className="mt-1 text-lg font-bold">
                                        {displayDate}
                                    </span>
                                    {active && (
                                        <span className="mt-1 text-[9px] font-bold uppercase tracking-wider">
                                            Selected
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Theatre Cards */}
                    {uniqueDates.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
                            <div className="mb-4 text-4xl">🎬</div>
                            <h3 className="text-lg font-semibold">
                                No upcoming shows
                            </h3>
                            <p className="mt-2 text-sm text-neutral-500">
                                There are no upcoming screenings scheduled for this movie yet.
                            </p>
                        </div>
                    ) : showsForSelectedDate.length === 0 ? (
                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-12 text-center text-sm text-neutral-500">
                            No screenings available for this date.
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {Object.values(groupedByTheatre).map(
                                (theatre, index) => (
                                    <article
                                        key={`${theatre.theatreName}-${index}`}
                                        className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#131617] to-[#0d0f10] p-5 transition-colors hover:border-white/[0.13] sm:p-7"
                                    >
                                        <div className="mb-6 flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.07] text-xl">
                                                🎬
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-lg font-bold text-white">
                                                    {theatre.theatreName}
                                                </h3>
                                                <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500">
                                                    <span>📍</span>
                                                    {theatre.location}
                                                </p>
                                            </div>

                                            <span className="hidden rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-neutral-500 sm:block">
                                                {theatre.times.length} SHOWS
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                            {theatre.times.map((show) => (
                                                <button
                                                    key={show.showId}
                                                    onClick={() => {
                                                        setSelectedShow(show);
                                                        setTicketCount(1);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="group rounded-xl border border-white/10 bg-white/[0.025] p-4 text-left transition-all duration-200 hover:border-emerald-400/50 hover:bg-emerald-400/[0.06]"
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="text-sm font-bold text-white transition group-hover:text-emerald-300">
                                                            {show.showTime}
                                                        </span>
                                                        <span className="text-emerald-400 transition group-hover:translate-x-0.5">
                                                            →
                                                        </span>
                                                    </div>

                                                    <div className="mt-3 border-t border-white/[0.07] pt-3">
                                                        <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                                                            Ticket price
                                                        </span>
                                                        <p className="mt-1 text-sm font-semibold text-emerald-400">
                                                            LKR {Number(show.ticketPrice).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </article>
                                )
                            )}
                        </div>
                    )}
                </section>
            </main>

            {/* Ticket Selection Modal */}
            {isModalOpen && selectedShow && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsModalOpen(false);
                        }
                    }}
                >
                    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#111516] shadow-2xl shadow-black/60">
                        <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-emerald-300 to-emerald-600" />

                        <div className="p-6 sm:p-8">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Close ticket selection"
                                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-neutral-400 transition hover:bg-white/10 hover:text-white"
                            >
                                ✕
                            </button>

                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                                Reserve your seats
                            </p>

                            <h3 className="pr-8 text-2xl font-bold">
                                Select Tickets
                            </h3>

                            <p className="mt-2 text-sm text-neutral-400">
                                {movie.title}
                            </p>

                            <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs text-neutral-500">
                                            Selected showtime
                                        </p>
                                        <p className="mt-1 font-semibold text-white">
                                            {selectedShow.showTime}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-neutral-500">
                                            Price per ticket
                                        </p>
                                        <p className="mt-1 font-semibold text-emerald-400">
                                            LKR {Number(selectedShow.ticketPrice).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-7 flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-white">
                                        Number of tickets
                                    </p>
                                    <p className="mt-1 text-xs text-neutral-500">
                                        Maximum 10 tickets
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() =>
                                            setTicketCount((prev) =>
                                                Math.max(1, prev - 1)
                                            )
                                        }
                                        disabled={ticketCount <= 1}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-xl text-white transition hover:border-emerald-400/40 hover:bg-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        −
                                    </button>

                                    <span className="min-w-[24px] text-center text-xl font-bold">
                                        {ticketCount}
                                    </span>

                                    <button
                                        onClick={() =>
                                            setTicketCount((prev) =>
                                                Math.min(10, prev + 1)
                                            )
                                        }
                                        disabled={ticketCount >= 10}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-xl text-white transition hover:border-emerald-400/40 hover:bg-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="mt-7 border-t border-white/[0.08] pt-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-neutral-400">
                                        Total price
                                    </span>
                                    <span className="text-2xl font-black text-emerald-400">
                                        LKR{" "}
                                        {(
                                            Number(selectedShow.ticketPrice) *
                                            ticketCount
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirmTickets}
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-4 text-sm font-bold text-black transition-all hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.99]"
                            >
                                SELECT SEATS
                                <span>→</span>
                            </button>

                            <p className="mt-4 text-center text-[10px] text-neutral-600">
                                Your cinema experience starts here.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="mt-16 border-t border-white/[0.07] bg-[#060708]">
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