import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Movie } from "../../models/Movie";
import MovieService from "../../service/MovieService";

export const MovieUpdate = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();
    const [updateFormData, setUpdateFormData] = useState<Movie | null>(null);

    useEffect(() => {
        if (movieId) {
            MovieService.getMovieById(movieId)
                .then((res) => setUpdateFormData(res.data))
                .catch((err) => console.error("Error fetching movie", err));
        }
    }, [movieId]);

    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        if (!updateFormData) return;

        const { name, value } = e.target;

        setUpdateFormData((prev) => ({
            ...prev!,
            [name]: value
        }));
    };

    const handleOnSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!updateFormData || !movieId) return;

        try {
            const cleanMoviePayload = {
                movieId: updateFormData.movieId,
                title: updateFormData.title,
                description: updateFormData.description,
                duration: updateFormData.duration,
                language: updateFormData.language,
                genre: updateFormData.genre,
                releaseDate: updateFormData.releaseDate,
                status: updateFormData.status,
                image_url: updateFormData.image_url
            };

            const response = await MovieService.updateMovie(
                movieId,
                cleanMoviePayload as any
            );

            if (response.status === 200 || response.status === 204) {
                alert("Movie Details Updated Successfully");
                navigate("/movies");
            } else {
                alert("Movie Details Update Failed");
            }
        } catch (error: any) {
            console.error("Movie update error:", error);
            alert("Movie Details Update Failed");
        }
    };

    if (!updateFormData) {
        return (
            <div className="min-h-screen bg-[#080a0b] flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-neutral-700 border-t-emerald-400" />
                    <p className="text-lg font-medium text-white">
                        Loading movie details...
                    </p>
                    <p className="mt-2 text-sm text-neutral-500">
                        Please wait while CineSnap loads your movie.
                    </p>
                </div>
            </div>
        );
    }

    const inputClass =
        "w-full rounded-xl border border-neutral-700 bg-[#111416] px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20";

    const labelClass =
        "mb-2 block text-sm font-medium text-neutral-300";

    return (
        <div className="min-h-screen bg-[#080a0b] px-4 py-10 text-white sm:px-6 lg:px-8">

            {/* Background decoration */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-700/10 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-4xl">

                {/* Page Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                                CineSnap Movie Management
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Edit <span className="text-emerald-400">Movie</span>
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">
                            Update your movie details, information, and
                            availability.
                        </p>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center self-start rounded-2xl border border-emerald-400/20 bg-emerald-400/10 sm:self-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-emerald-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.7}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.651-1.651a2.121 2.121 0 013 3l-9.193 9.193a4 4 0 01-1.697 1.01L7 17l.96-3.623a4 4 0 011.01-1.697l7.892-7.193z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h4"
                            />
                        </svg>
                    </div>
                </div>

                {/* Form Card */}
                <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#101314]/95 shadow-2xl shadow-black/30">

                    {/* Card Header */}
                    <div className="border-b border-neutral-800 bg-white/[0.02] px-5 py-5 sm:px-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
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
                                        d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 3v4m8-4v4M4 11h16"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h2 className="font-semibold text-white">
                                    Movie Information
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Fields marked as required must be completed.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleOnSubmit}
                        className="space-y-6 p-5 sm:p-8"
                    >
                        {/* Movie ID */}
                        <div>
                            <label className={labelClass}>
                                Movie ID
                            </label>
                            <input
                                type="text"
                                name="movieId"
                                value={updateFormData.movieId}
                                readOnly
                                className="w-full cursor-not-allowed rounded-xl border border-neutral-800 bg-[#0b0d0e] px-4 py-3 text-sm text-neutral-500 outline-none"
                            />
                            <p className="mt-2 text-xs text-neutral-600">
                                The movie ID cannot be changed.
                            </p>
                        </div>

                        {/* Movie Title */}
                        <div>
                            <label className={labelClass}>
                                Movie Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={updateFormData.title}
                                onChange={handleOnChange}
                                placeholder="Enter movie title"
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className={labelClass}>
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={updateFormData.description}
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
                                <label className={labelClass}>
                                    Duration
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={updateFormData.duration}
                                    onChange={handleOnChange}
                                    placeholder="Example: 104 minutes"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Language
                                </label>
                                <input
                                    type="text"
                                    name="language"
                                    value={updateFormData.language}
                                    onChange={handleOnChange}
                                    placeholder="Example: English"
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Genre */}
                        <div>
                            <label className={labelClass}>
                                Genre
                            </label>
                            <input
                                type="text"
                                name="genre"
                                value={updateFormData.genre}
                                onChange={handleOnChange}
                                placeholder="Example: Fantasy, Adventure, Action"
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Release Date and Status */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className={labelClass}>
                                    Release Date
                                </label>
                                <input
                                    type="text"
                                    name="releaseDate"
                                    value={updateFormData.releaseDate}
                                    onChange={handleOnChange}
                                    placeholder="Example: 10/04/2026"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={updateFormData.status}
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
                            <label className={labelClass}>
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="image_url"
                                value={updateFormData.image_url}
                                onChange={handleOnChange}
                                placeholder="Enter movie poster image URL"
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col-reverse gap-3 border-t border-neutral-800 pt-6 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => navigate(`/movies/${movieId}`)}
                                className="rounded-xl border border-neutral-700 bg-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#101314]"
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
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Note */}
                <p className="mt-6 text-center text-xs text-neutral-600">
                    MySeat · Movie Management
                </p>
            </div>
        </div>
    );
};