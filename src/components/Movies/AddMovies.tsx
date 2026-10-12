import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieService from "../../service/MovieService";
import logo from "../libs/Logo-RM.png";

export const AddMovie = () => {
    const navigate = useNavigate();

    const [movie, setMovie] = useState({
        movieId: "",
        title: "",
        description: "",
        duration: "",
        language: "",
        genre: "",
        releaseDate: "",
        status: "NOW_SHOWING",
        image_url: "",
    });

    // Catch Input values
    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setMovie((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Reset form
    const handleReset = () => {
        setMovie({
            movieId: "",
            title: "",
            description: "",
            duration: "",
            language: "",
            genre: "",
            releaseDate: "",
            status: "NOW_SHOWING",
            image_url: "",
        });
    };

    // Submit movie
    const handleOnSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            await MovieService.addMovie(movie);

            alert("Movie added successfully!");

            handleReset();

            navigate("/movies");
        } catch (error: any) {
            console.error("Error adding movie:", error);

            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Response:", error.response.data);
            }

            alert("Failed to add movie!");
        }
    };

    const inputClass =
        "block w-full rounded-xl border border-neutral-700 bg-[#111416] px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20";

    const labelClass =
        "mb-2 block text-sm font-medium text-neutral-300";

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#080a0b] px-4 py-10 text-white sm:px-6 lg:px-8">

            {/* Background Effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-700/10 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-4xl">

                {/* Page Heading */}
                <div className="mb-8 flex flex-col items-center text-center">

                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                            MySeat Movie Management
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Add Movie to{" "}
                        <span className="text-emerald-400">MySeat</span>
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">
                        Add a new movie to your collection by entering its
                        details below.
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#101314]/95 shadow-2xl shadow-black/30">

                    {/* Card Header */}
                    <div className="border-b border-neutral-800 bg-white/[0.02] px-5 py-5 sm:px-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h2 className="font-semibold text-white">
                                    Movie Information
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Enter the required movie details
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        className="space-y-6 p-5 sm:p-8"
                        onSubmit={handleOnSubmit}
                    >

                        {/* Movie ID and Title */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="movieId" className={labelClass}>
                                    Movie ID
                                </label>
                                <input
                                    id="movieId"
                                    name="movieId"
                                    type="text"
                                    value={movie.movieId}
                                    onChange={handleOnChange}
                                    placeholder="Example: M001"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="title" className={labelClass}>
                                    Movie Title
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={movie.title}
                                    onChange={handleOnChange}
                                    placeholder="Example: Jumanji"
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className={labelClass}>
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={movie.description}
                                onChange={handleOnChange}
                                placeholder="Enter movie description"
                                rows={4}
                                required
                                className={`${inputClass} resize-y`}
                            />
                        </div>

                        {/* Duration and Language */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="duration" className={labelClass}>
                                    Duration
                                </label>
                                <input
                                    id="duration"
                                    name="duration"
                                    type="text"
                                    value={movie.duration}
                                    onChange={handleOnChange}
                                    placeholder="Example: 104 minutes"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="language" className={labelClass}>
                                    Language
                                </label>
                                <input
                                    id="language"
                                    name="language"
                                    type="text"
                                    value={movie.language}
                                    onChange={handleOnChange}
                                    placeholder="Example: English"
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Genre */}
                        <div>
                            <label htmlFor="genre" className={labelClass}>
                                Genre
                            </label>
                            <input
                                id="genre"
                                name="genre"
                                type="text"
                                value={movie.genre}
                                onChange={handleOnChange}
                                placeholder="Example: Fantasy, Adventure, Action"
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Release Date and Status */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="releaseDate"
                                    className={labelClass}
                                >
                                    Release Date
                                </label>
                                <input
                                    id="releaseDate"
                                    name="releaseDate"
                                    type="text"
                                    value={movie.releaseDate}
                                    onChange={handleOnChange}
                                    placeholder="Example: 10/04/2026"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="status" className={labelClass}>
                                    Movie Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={movie.status}
                                    onChange={handleOnChange}
                                    className={`${inputClass} cursor-pointer`}
                                >
                                    <option value="NOW_SHOWING">
                                        NOW SHOWING
                                    </option>
                                    <option value="UPCOMMING">
                                        UPCOMMING
                                    </option>
                                    <option value="ENDED">
                                        ENDED
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label htmlFor="image_url" className={labelClass}>
                                Movie Poster Image URL
                            </label>
                            <input
                                id="image_url"
                                name="image_url"
                                type="text"
                                value={movie.image_url}
                                onChange={handleOnChange}
                                placeholder="Enter movie poster image URL"
                                required
                                className={inputClass}
                            />
                            <p className="mt-2 text-xs text-neutral-500">
                                Provide the URL of the movie poster image.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3 border-t border-neutral-800 pt-6 sm:flex-row">
                            <button
                                type="submit"
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#101314]"
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
                                Add Movie
                            </button>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-5 py-3 text-sm font-semibold text-neutral-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/40 sm:flex-none"
                            >
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
                                        d="M4 7h16M10 11v6m4-6v6M5 7l1 13h12l1-13M9 7V4h6v3"
                                    />
                                </svg>
                                Reset Form
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/movies")}
                                className="flex flex-1 items-center justify-center rounded-xl border border-neutral-700 px-5 py-3 text-sm font-semibold text-neutral-400 transition hover:bg-neutral-800 hover:text-white sm:flex-none"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-neutral-600">
                    MySeat · Movie Management
                </p>
            </div>
        </div>
    );
};