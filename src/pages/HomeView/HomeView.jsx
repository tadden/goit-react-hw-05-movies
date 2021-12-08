import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import  {fetchTrendingMovies} from '../../components/API/movie-api'
import PageHeading from '../../components/PageHeading/PageHeading';

export default function HomeView() {

  const [movies, setMovies] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  },[])
  return (
    <>
      <PageHeading text="Trending today" />

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location, label: 'Go to Home' }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
