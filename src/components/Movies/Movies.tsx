import { useEffect, useState, useRef } from "react";
import MovieService from "../../service/MovieService";
import { Movie } from "../../models/Movie";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

export const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const genresList = [
        "Action", "Comedy", "Drama", "Horror",
        "Sci-Fi", "Romance", "Thriller", "Animation"
    ];
    const [isGenresOpen, setIsGenresOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const urlQuery = searchParams.get("q") || "";
    const { genreName } = useParams();
    const userRole = localStorage.getItem("USER_ROLE");

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                setLoading(true);

                if (genreName) {
                    setSearchQuery("");
                    const response = await MovieService.getMoviesByGenre(genreName);
                    setMovies(response.data);
                } else if (urlQuery.trim()) {
                    setSearchQuery(urlQuery);
                    const response = await MovieService.searchMovies(urlQuery);
                    setMovies(response.data);
                } else {
                    setSearchQuery("");
                    const response = await MovieService.getMovies();
                    setMovies(response.data);
                }

                setError("");
            } catch (error) {
                console.error("Failed to load movies:", error);
                setError("Failed to load movies");
            } finally {
                setLoading(false);
            }
        };

        handleFetchData();
    }, [urlQuery, genreName]);

    const handleSearchSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate("/movies");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#080a0b] text-white flex flex-col items-center justify-center gap-5">
                <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
                <p className="text-sm tracking-[0.3em] uppercase text-neutral-400">
                    Preparing your cinema
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#080a0b] text-white flex flex-col items-center justify-center gap-4">
                <div className="text-4xl">!</div>
                <p className="text-red-400">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="rounded-full border border-white/10 px-5 py-2 text-sm hover:bg-white/10"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080a0b] text-white selection:bg-emerald-500/30">

            {/* Premium Navbar */}
            <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#080a0b]/90 backdrop-blur-2xl">
                <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="min-h-[82px] flex items-center justify-between gap-6">



                        <form
                            onSubmit={handleSearchSubmit}
                            className="hidden md:block flex-1 max-w-md relative"
                        >
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="11" cy="11" r="7" strokeWidth="1.7" />
                                <path d="m16 16 4 4" strokeWidth="1.7" strokeLinecap="round" />
                            </svg>

                            <input
                                type="text"
                                placeholder="Discover your next favorite movie..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-full bg-white/[0.045] border border-white/10 pl-12 pr-5 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-all focus:border-emerald-500/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-emerald-500/[0.07]"
                            />
                        </form>

                        <nav className="hidden md:flex items-center gap-7 text-sm">
                            <a
                                href="/movies"
                                className="text-emerald-400 font-semibold"
                            >
                                Movies
                            </a>

                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsGenresOpen(!isGenresOpen)}
                                    className={`flex items-center gap-2 transition-colors ${
                                        isGenresOpen
                                            ? "text-emerald-400"
                                            : "text-neutral-300 hover:text-white"
                                    }`}
                                >
                                    Genres
                                    <svg
                                        className={`w-4 h-4 transition-transform ${isGenresOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="m6 9 6 6 6-6"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                {isGenresOpen && (
                                    <div className="absolute right-0 top-full mt-5 w-56 rounded-2xl border border-white/10 bg-[#141719] p-2 shadow-2xl shadow-black/60">
                                        {genresList.map((genre) => (
                                            <a
                                                key={genre}
                                                href={`/genres/${genre.toLowerCase()}`}
                                                onClick={() => setIsGenresOpen(false)}
                                                className="block rounded-xl px-4 py-3 text-sm text-neutral-300 transition-all hover:bg-emerald-500/10 hover:text-emerald-400"
                                            >
                                                {genre}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {userRole !== "ROLE_CUSTOMER" && (
                                <button
                                    onClick={() => navigate("/add-movie")}
                                    className="rounded-full bg-emerald-400 px-5 py-2.5 font-bold text-black transition-all hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20"
                                >
                                    + Add Movie
                                </button>
                            )}
                        </nav>

                        <button
                            onClick={() => setIsGenresOpen(!isGenresOpen)}
                            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 text-neutral-300"
                            aria-label="Toggle genres"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M4 6h16M4 12h16M4 18h16"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile navigation */}
                    {isGenresOpen && (
                        <div className="md:hidden pb-5 space-y-2">
                            <form onSubmit={handleSearchSubmit} className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Search movies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                                />
                            </form>

                            <a
                                href="/movies"
                                className="block rounded-lg px-4 py-3 text-sm text-emerald-400"
                            >
                                All Movies
                            </a>

                            {genresList.map((genre) => (
                                <a
                                    key={genre}
                                    href={`/genres/${genre.toLowerCase()}`}
                                    className="block rounded-lg px-4 py-3 text-sm text-neutral-300 hover:bg-white/5"
                                >
                                    {genre}
                                </a>
                            ))}

                            {userRole !== "ROLE_CUSTOMER" && (
                                <button
                                    onClick={() => navigate("/add-movie")}
                                    className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-black"
                                >
                                    + Add Movie
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 py-10 md:py-14">

                {/* Hero heading */}
                <section className="relative mb-12 overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-[#151e1b] via-[#101513] to-[#0b0d0e] px-7 py-10 sm:px-12 sm:py-14">
                    <div className="absolute -right-20 -top-36 h-80 w-80 rounded-full bg-emerald-500/[0.09] blur-3xl" />
                    <div className="absolute right-24 -bottom-40 h-64 w-64 rounded-full bg-amber-500/[0.05] blur-3xl" />

                    <div className="relative z-10 max-w-2xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                                The MySeat Movie Collection
                            </span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
                            Every story
                            <br />
                            deserves the{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                                big screen.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-lg text-sm sm:text-base leading-7 text-neutral-400">
                            Discover unforgettable stories, explore new worlds,
                            and find your next cinematic experience.
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <a
                                href="#movie-collection"
                                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-black transition-all hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20"
                            >
                                Explore Movies
                                <span>→</span>
                            </a>

                            <span className="rounded-full border border-white/10 px-4 py-3 text-xs text-neutral-400">
                                {movies.length} {movies.length === 1 ? "movie" : "movies"} found
                            </span>
                        </div>
                    </div>
                </section>

                {/* Collection heading */}
                <section id="movie-collection">
                    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                                Curated for you
                            </p>

                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                {genreName
                                    ? `${genreName.charAt(0).toUpperCase()}${genreName.slice(1)} Movies`
                                    : urlQuery.trim()
                                    ? "Search Results"
                                    : "Explore Movies"}
                            </h2>

                            <p className="mt-2 text-sm text-neutral-500">
                                Your next favorite movie is waiting.
                            </p>
                        </div>

                        <span className="text-xs font-medium tracking-wide text-neutral-500">
                            {movies.length} TITLES
                        </span>
                    </div>

                    {movies.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-24 text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-3xl">
                                🎬
                            </div>
                            <h3 className="text-lg font-semibold text-white">
                                No movies found
                            </h3>
                            <p className="mt-2 text-sm text-neutral-500">
                                Try another search or explore a different genre.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    navigate("/movies");
                                }}
                                className="mt-6 rounded-full border border-emerald-500/30 px-5 py-2.5 text-sm text-emerald-400 transition hover:bg-emerald-500/10"
                            >
                                Browse all movies
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-6">

                            {/* Add Movie Card */}
                            {userRole !== "ROLE_CUSTOMER" && (
                                <button
                                    onClick={() => navigate("/add-movie")}
                                    className="group flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-gradient-to-br from-white/[0.035] to-transparent p-5 transition-all duration-300 hover:border-emerald-400/60 hover:bg-emerald-400/[0.04]"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl text-neutral-400 transition-all duration-300 group-hover:rotate-90 group-hover:border-emerald-400/40 group-hover:text-emerald-400">
                                        +
                                    </div>
                                    <span className="mt-4 text-sm font-bold text-neutral-300 group-hover:text-emerald-400">
                                        Add Movie
                                    </span>
                                    <span className="mt-1 text-center text-[11px] text-neutral-600">
                                        Expand your collection
                                    </span>
                                </button>
                            )}

                            {movies.map((movie) => (
                                <article
                                    key={movie.movieId}
                                    className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111415] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/30 hover:shadow-xl hover:shadow-black/40"
                                >
                                    {/* Poster */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-[#1b1f20]">
                                        <img
                                            src={movie.image_url}
                                            alt={movie.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/10 opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

                                        {/* Status */}
                                        <span className="absolute left-3 top-3 max-w-[calc(100%-24px)] truncate rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                                            {movie.status?.replace(/_/g, " ")}
                                        </span>

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                                            <button
                                                onClick={() => navigate(`/movies/${movie.movieId}`)}
                                                className="flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2.5 text-xs font-bold text-black shadow-xl transition-transform duration-300 hover:scale-105 hover:bg-emerald-300"
                                            >
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                                View Details
                                            </button>
                                        </div>

                                        {/* Movie title on poster */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                                            <h3 className="line-clamp-2 text-sm sm:text-base font-bold leading-snug text-white">
                                                {movie.title}
                                            </h3>
                                            <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                                                {movie.language}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card details */}
                                    <div className="p-3 sm:p-4">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="truncate text-[11px] text-neutral-400">
                                                {movie.genre}
                                            </span>
                                            <span className="shrink-0 text-[10px] font-semibold text-emerald-400">
                                                {movie.duration}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/movies/${movie.movieId}`)}
                                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] py-2.5 text-xs font-semibold text-neutral-300 transition-all hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
                                        >
                                            Discover Movie
                                            <span className="transition-transform group-hover:translate-x-1">
                                                →
                                            </span>
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* Premium Footer */}
            <footer className="mt-16 border-t border-white/[0.07] bg-[#060708]">
                <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row sm:px-8 lg:px-12">
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg font-black tracking-tight">
                            My<span className="text-emerald-400">Seat</span>
                        </h3>
                        <p className="mt-1 text-xs text-neutral-600">
                            Your story. Your screen. Your cinema.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-xs text-neutral-500">
                        <a href="#" className="transition hover:text-emerald-400">
                            Terms
                        </a>
                        <a href="#" className="transition hover:text-emerald-400">
                            Privacy
                        </a>
                        <a href="#" className="transition hover:text-emerald-400">
                            Help
                        </a>
                    </div>

                    <p className="text-center text-[11px] text-neutral-600">
                        © 2026 My Seat. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};