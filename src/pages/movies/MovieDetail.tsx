import { useMovie } from "@/api/hooks/useMovie";
import { IMAGE_URL } from "@/const";
import { useNavigate, useParams } from "react-router-dom";
import MovieView from "@/components/movie-view/MovieView";

const MovieDetail = () => {
  const { id } = useParams();
  const { getMovieSingle, getMovieDetail } = useMovie();
  const navigate = useNavigate();

  const { data } = getMovieSingle(id || "");
  const { data: similarData } = getMovieDetail(id || "", "similar");
  const { data: imagesData } = getMovieDetail(id || "", "images");
  const { data: creditsData } = getMovieDetail(id || "", "credits");

  return (
    <div className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100 transition-colors duration-300">
      <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden">
        <img
          src={IMAGE_URL + data?.backdrop_path}
          alt={data?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end px-6 md:px-12 pb-10">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{data?.title}</h1>
            {data?.tagline && <p className="text-lg italic opacity-80">{data?.tagline}</p>}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-6 space-y-10 -mt-20 z-10 relative bg-white dark:bg-zinc-800 rounded-t-3xl shadow-lg transition">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 shrink-0">
            <img
              src={IMAGE_URL + data?.poster_path}
              alt={data?.title}
              className="w-full rounded-xl shadow-md"
            />
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-gray-700 dark:text-gray-200 text-lg">{data?.overview}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold">Release Date:</span>
                <p>{data?.release_date}</p>
              </div>
              <div>
                <span className="font-semibold">Runtime:</span>
                <p>{data?.runtime} min</p>
              </div>
              <div>
                <span className="font-semibold">Language:</span>
                <p>{data?.original_language?.toUpperCase()}</p>
              </div>
              <div>
                <span className="font-semibold">Genres:</span>
                <p>{data?.genres?.map((g: any) => g.name).join(", ")}</p>
              </div>
              <div>
                <span className="font-semibold">Budget:</span>
                <p>{data?.budget?.toLocaleString()} USD</p>
              </div>
              <div>
                <span className="font-semibold">Revenue:</span>
                <p>{data?.revenue?.toLocaleString()} USD</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {creditsData?.cast?.slice(0, 10).map((person: any) => (
              <div
                key={person?.id}
                 onClick={() => navigate(`/person/${person.id}`)}
                className="bg-gray-50 dark:bg-zinc-700 rounded-lg shadow hover:shadow-lg transition p-2 text-center"
              >
                <img
                  src={
                    person?.profile_path
                      ? IMAGE_URL + person.profile_path
                      : "https://via.placeholder.com/150x225?text=No+Image"
                  }
                  alt={person?.original_name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-sm font-semibold">{person?.original_name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-300">{person?.character}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {imagesData?.backdrops?.slice(0, 10).map((item: any, idx: number) => (
              <img
                key={idx}
                src={IMAGE_URL + item.file_path}
                className="w-full h-32 object-cover rounded-md shadow"
                alt={`scene-${idx}`}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
          <MovieView data={similarData?.results?.slice(0, 4)} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
