import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import React from "react";
import { useGenre } from "@/api/hooks/useGenre";
import Genre from "@/components/genre/Genre";
import { useParamsHook } from "@/hooks/useParamsHook";
import { ChevronLeft, ChevronRight, Film, Loader2 } from "lucide-react";

const Movies = () => {
  const { getMovies } = useMovie();
  const { getGenres } = useGenre();
  const { getParam, setParam } = useParamsHook();

  const genre = getParam("genre");
  const page = Number(getParam("page")) || 1;

  const handlePagination = (value: number) => {
    setParam("page", value.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { data: genreData } = getGenres();
  const { data, isPending, isError } = getMovies({
    page,
    with_genres: genre,
    without_genres: "18,36,27,10749",
  });

  const totalPages = Math.min(Math.ceil((data?.total_results || 0) / 20), 500);
  const maxVisiblePages = 5;

  const getVisiblePages = () => {
    const start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    const adjustedStart = Math.max(1, end - maxVisiblePages + 1);
    return Array.from({ length: end - adjustedStart + 1 }, (_, i) => adjustedStart + i);
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-950 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Film className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400">Failed to load movies. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Film className="w-5 h-5 mr-2 text-red-500" />
              Genres
            </h2>
            <Genre data={genreData?.genres} />
          </div>
        </div>
        {isPending && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-400">Loading movies...</p>
            </div>
          </div>
        )}
        {!isPending && data?.results && (
          <>
          

            <MovieView data={data.results} />
            {totalPages > 1 && (
              <div className="mt-12 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handlePagination(page - 1)}
                      disabled={page === 1}
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </button>
                    {getVisiblePages()[0] > 1 && (
                      <>
                        <button
                          onClick={() => handlePagination(1)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                        >
                          1
                        </button>
                        {getVisiblePages()[0] > 2 && (
                          <span className="px-2 py-2 text-gray-500 dark:text-gray-400">...</span>
                        )}
                      </>
                    )}
                    {getVisiblePages().map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePagination(pageNum)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          pageNum === page
                            ? "bg-red-500 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
                      <>
                        {getVisiblePages()[getVisiblePages().length - 1] < totalPages - 1 && (
                          <span className="px-2 py-2 text-gray-500 dark:text-gray-400">...</span>
                        )}
                        <button
                          onClick={() => handlePagination(totalPages)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handlePagination(page + 1)}
                      disabled={page === totalPages}
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Go to page:</span>
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={page}
                      onChange={(e) => {
                        const newPage = parseInt(e.target.value);
                        if (newPage >= 1 && newPage <= totalPages) {
                          handlePagination(newPage);
                        }
                      }}
                      className="w-20 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">of {totalPages}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Movies);
