import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import './style.css'

import { useMovie } from '@/api/hooks/useMovie'
import MovieView from '@/components/movie-view/MovieView'
import { IMAGE_URL } from '@/const'
import type { IMovie } from '@/types'
import type { Swiper as SwiperType } from 'swiper'
import { Film } from 'lucide-react'

const Home = () => {
  const { getMovies } = useMovie()
  const { data, isLoading, error } = getMovies({
    page: 1,
    without_genres: '18,36,27,10749',
  })

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  if (isLoading) return <div>Loading...</div>

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Film className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Failed to load movies. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="max-w-[1360px] w-full h-[640px] mx-auto mt-[50px] rounded-[12px]">
        <Swiper
          style={{ borderRadius: 12 }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {data?.results?.map((movie: IMovie) => (
            <SwiperSlide key={movie.id}>
              <img
                className="bg-center"
                src={IMAGE_URL + movie.backdrop_path}
                alt={movie.title || 'Movie poster'}
                
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper max-w-[800px]"
        >
          {data?.results?.map((movie: IMovie) => (
            <SwiperSlide key={movie.id + '_thumb'} className='cursor-pointer '>
              <img
                className="object-cover bg-center"
                src={IMAGE_URL + movie.backdrop_path}
                alt={movie.title || 'Movie poster'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <br />
      <br />
      <br />

      <MovieView data={data?.results?.slice(0, 8) || []} />
    </div>
  )
}

export default React.memo(Home)
